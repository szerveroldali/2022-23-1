const { User, Post, Category } = require('./models');

const fastify = require('fastify')({
    logger: true
})

fastify.register(require('@fastify/jwt'), {
    secret: 'secret'
});

fastify.decorate("authenticate", async function (request, reply) {
    try {
        await request.jwtVerify()
    } catch (err) {
        reply.send(err)
    }
});

require('./graphql')(fastify);

// const schema = `
//   type Query {
//         add(x: Int, y: Int): Int
//   }
// `

// const resolvers = {
//     Query: {
//         add: async (_, { x, y }) => x + y
//     }
// }

// fastify.register(require('mercurius'), {
//     schema,
//     resolvers,
//     graphiql: true
// })

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
                }
            }
        }
    }, 

    async (request, reply) => {
        const { email, password } = request.body;
        
        const user = await User.findOne({
            where: {
                // email: request.body.email,
                email
            }
        });

        if (!user) {
            return reply.status(404).send({
                message: "User not found"
            })
        }

        if (!user.checkPassword(password)) {
            return reply.status(401).send({
                message: "Wrong password"
            })
        }

        const token = fastify.jwt.sign({ 
            payload: user.toJSON(),
        })

        reply.send({ token })
    }
)

fastify.get(
    '/who', 
    {
        onRequest: [fastify.authenticate]
    },
    async (request, reply) => {
        reply.send(request.user)
    }
)

fastify.get(
    '/users/:id', 

    {
        schema: {
            params: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                }
            }
        }
    }, 
    
    async (request, reply) => {
        console.log(request.params);

        const { id } = request.params;

        const user = await User.findByPk(id);
        if (!user) {
            return reply.status(404).send({
                message: "Not found",
            })
        }

        reply.send(user)
    }
)

/*
    Kateg??ri??k:

    GET /categories             - lek??ri az ??sszeset
    GET /categories/:id         - lek??r egyet

    POST /categories            - l??trehoz egyet
    PATCH /categories/:id       - m??dos??t egyet

    DELETE /categories          - t??rli mindet
    DELETE /categories/:id      - t??r??l egyet
*/

fastify.get('/categories', async (request, reply) => {
    const categories = await Category.findAll();

    reply.send(categories)
})

fastify.get(
    '/categories/:id', 
    {
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                }
            }
        }
    },
    async (request, reply) => {
        const { id } = request.params;

        const category = await Category.findByPk(id);
        if (!category) {
            return reply.status(404).send({
                message: "Not found",
            })
        }

        reply.send(category)
    }
)

fastify.post(
    '/categories', 
    {
        schema: {
            body: {
                type: 'object',
                required: ['name', 'color'],
                properties: {
                    name: { type: 'string' },
                    color: { type: 'string', pattern: '^#[0-9a-fA-F]{6}$' },
                }
            }
        }
    },
    async (request, reply) => {
        const { name, color } = request.body;

        const category = await Category.create({ name, color });

        reply.status(201).send(category)
    }
)

fastify.patch(
    '/categories/:id', 
    {
        schema: {
            // URL param??terek valid??ci??ja
            params: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                }
            },

            // Request body valid??ci??ja
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    color: { type: 'string', pattern: '^#[0-9a-fA-F]{6}$' },
                }
            }
        }
    },
    async (request, reply) => {
        const { id } = request.params;
        const { name, color } = request.body;

        const category = await Category.findByPk(id);
        if (!category) {
            return reply.status(404).send({
                message: "Not found",
            })
        }

        await category.update({ name, color });

        reply.send(category)
    }
)

fastify.put(
    '/categories/:id', 
    {
        schema: {
            // URL param??terek valid??ci??ja
            params: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                }
            },

            // Request body valid??ci??ja
            body: {
                type: 'object',
                required: ['name', 'color'],
                properties: {
                    name: { type: 'string' },
                    color: { type: 'string', pattern: '^#[0-9a-fA-F]{6}$' },
                }
            }
        }
    },
    async (request, reply) => {
        const { id } = request.params;
        const { name, color } = request.body;

        const category = await Category.findByPk(id);
        if (!category) {
            return reply.status(404).send({
                message: "Not found",
            })
        }

        await category.update({ name, color });

        reply.send(category)
    }
)

fastify.delete('/categories', async (request, reply) => {
    // const categories = await Category.findAll();

    // for (const category of categories) {
    //     await category.destroy();
    // }

    await Category.destroy({
        where: {},
    });

    reply.status(204).send({ message: "No content, everything deleted" });
})

fastify.delete(
    '/categories/:id', 
    {
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                }
            }
        }
    },
    async (request, reply) => {
        const { id } = request.params;

        const category = await Category.findByPk(id);
        if (!category) {
            return reply.status(404).send({
                message: "Not found",
            })
        }

        await category.destroy();

        reply.status(204).send({ message: "Category deleted" });
    }
)

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err
    // Server is now listening on ${address}
})