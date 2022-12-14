require('dotenv').config();
const fastify = require('fastify')({ logger: true });

fastify.register(require('@fastify/jwt'), { secret: 'kiscicaNAGYMACSKA' });

fastify.decorate('authenticate', async function (request, reply) {
    try {
        await request.jwtVerify();
    } catch (error) {
        reply.send(error);
    }
});

const { Category, Post, User } = require('./models');

fastify.get('/categories', async (request, reply) => {
    reply.send(await Category.findAll());
});

fastify.get('/categories/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' }
            }
        }
    }
}, async (request, reply) => {
    console.log(request);
    const { id } = request.params;
    const category = await Category.findByPk(id);
    if (!category) {
        return reply.status(404).send({ message: 'Category was not found.' });
    }
    reply.send(category);
});

fastify.post('/categories', {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'color'],
            properties: {
                name: { type: 'string' },
                color: {
                    type: 'string',
                    pattern: '^#[0-9a-fA-F]{6}$'
                }
            }
        }
    }
}, async (request, reply) => {
    reply.send(await Category.create(request.body));
});

fastify.put('/categories/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' }
            }
        },
        body: {
            type: 'object',
            required: ['name', 'color'],
            properties: {
                name: { type: 'string' },
                color: {
                    type: 'string',
                    pattern: '^#[0-9a-fA-F]{6}$'
                }
            }
        }
    }
}, async (request, reply) => {
    const { id } = request.params;
    const category = await Category.findByPk(id);
    if (!category) {
        return reply.status(404).send({ message: 'Category was not found. ' });
    }
    reply.send(await category.update(request.body));
});

fastify.patch('/categories/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' }
            }
        },
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                color: {
                    type: 'string',
                    pattern: '^#[0-9a-fA-F]{6}$'
                }
            }
        }
    }
}, async (request, reply) => {
    const { id } = request.params;
    const category = await Category.findByPk(id);
    if (!category) {
        return reply.status(404).send({ message: 'Category was not found. ' });
    }
    reply.send(await category.update(request.body));
});

fastify.delete('/categories/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' }
            }
        }
    }
}, async (request, reply) => {
    const { id } = request.params;
    const category = await Category.findByPk(id);
    if (!category) {
        return reply.status(404).send({ message: 'Category was not found.' });
    }
    await category.destroy();
    reply.send({ message: 'Category successfully deleted.' });
});

fastify.get('/posts', async (request, reply) => {
    reply.send(await Post.findAll({
        include: [
            {
                model: Category,
                attributes: ['name', 'color'],
                through: { attributes: [] }
            }
        ]
    }));
});

fastify.get('/posts/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' }
            }
        }
    }
}, async (request, reply) => {
    console.log(request);
    const { id } = request.params;
    const post = await Post.findByPk(id, {
        include: [
            {
                model: Category,
                attributes: ['name', 'color'],
                through: { attributes: [] }
            }
        ]
    });
    if (!post) {
        return reply.status(404).send({ message: 'Post was not found.' });
    }
    reply.send(post);
});

fastify.post('/login', {
    schema: {
        body: {
            type: 'object',
            required: [ 'email', 'password' ],
            properties: {
                email: { type: 'string' },
                password: { type: 'string' }
            }
        }
    }
}, async (request, reply) => {
    const { email, password } = request.body;

    const user = await User.findOne({
        where: {
            email,
            password
        }
    });
    
    if (!user) {
        return reply.status(404).send({ message: 'User was not found.' });
    }

    const token = fastify.jwt.sign({ email: user.email });
    reply.send({ token });
});

fastify.get('/whois', {
    onRequest: [ fastify.authenticate ]
}, async (request, reply) => {
    reply.send(request.user);
});

fastify.listen({ port: process.env.PORT }, (error, address) => {
    if (error) {
        fastify.log.error(error);
        return;
    }
});