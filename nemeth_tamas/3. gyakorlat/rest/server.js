// CommonJs
const fastify = require('fastify')({
    logger: true,
});

const autoload = require('@fastify/autoload');
const { join } = require('path');
const { StatusCodes } = require('http-status-codes');
const { Sequelize, sequelize, User } = require('./models');
const { readFileSync } = require('fs');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const graphQLScalars = require("graphql-scalars");

const secret = 'secret';

// Hitelesítés
fastify.register(require('@fastify/jwt'), {
    secret,
});

const schema = makeExecutableSchema({
    typeDefs: [graphQLScalars.typeDefs, readFileSync('./graphql/schema.gql').toString()],
    resolvers: [graphQLScalars.resolvers, require('./graphql/resolvers')]
})

fastify.register(require('mercurius'), {
    schema,
    graphiql: true,
    context: request => {
        return {
            request,
        };
    },
});

fastify.decorate('auth', async function (request, reply) {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
});

fastify.post(
    '/login',
    {
        schema: {
            body: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                },
            },
        },
    },
    async (request, reply) => {
        const { email, password } = request.body;

        const user = await User.findOne({
            where: {
                email, // == email: email
            },
        });

        if (!user) {
            return reply.status(StatusCodes.NOT_FOUND).send({
                message: 'User not found.',
            });
        }

        if (!user.comparePassword(password)) {
            return reply.status(StatusCodes.FORBIDDEN).send({
                message: 'Wrong password.',
            });
        }

        const token = fastify.jwt.sign({
            payload: user.toJSON(),
        });

        reply.send({ token });
    }
);

fastify.get(
    '/who',
    {
        onRequest: [fastify.auth],
    },
    async (request, reply) => {
        reply.send(request.user);
    }
);

// Route-ok automatikus betöltése
fastify.register(autoload, {
    dir: join(__dirname, 'routes'),
});

/**
 * Run the server!
 */
const start = async () => {
    try {
        await fastify.listen({ port: 4000 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
