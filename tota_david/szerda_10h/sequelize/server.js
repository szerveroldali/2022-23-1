const { User, Post, Category } = require('./models');
const fastify = require('fastify')({
    logger: true
})

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
    Kategóriák:

    GET /categories             - lekéri az összeset
    GET /categories/:id         - lekér egyet

    POST /categories            - létrehoz egyet
    PATCH /categories/:id       - módosít egyet

    DELETE /categories          - törli mindet
    DELETE /categories/:id      - töröl egyet
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
            // URL paraméterek validációja
            params: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                }
            },

            // Request body validációja
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
            // URL paraméterek validációja
            params: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                }
            },

            // Request body validációja
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