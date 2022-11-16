/*

    C R U D

    GET     /categories         lekéri az összes kategóriát
    GET     /categories/:id     egy adott kategóriát kér le

    POST    /categories         létrehoz egy kategóriát

    PUT     /categories/:id     módosít egy kategóriát (teljes csere)
    PATCH   /categories/:id     módosít egy kategóriát (részleges csere)

    DELETE  /categories         töröl minden kategóriát
    DELETE  /categories/:id     töröl egy kategóriát
*/

const { Category, Post } = require('./models');

const fastify = require('fastify')({
    logger: true
})

// Declare a route
// fastify.get('/', (request, reply) => {
//     reply.send({ hello: 'world 3' })
// })

fastify.get('/categories', async (request, reply) => {
    const categories = await Category.findAll();

    reply.send(categories)
});

fastify.get('/categories/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                }
            }
        }
    }
}, async (request, reply) => {
    // console.log(request.params)

    const { id } = request.params;

    const category = await Category.findByPk(id);
    if (!category) {
        return reply.status(404).send({ message: "Category not found!" })
    }

    reply.send(category)
});

fastify.post('/categories', {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'color'],
            properties: {
                name: {
                    type: 'string',
                },
                color: {
                    type: 'string',
                    pattern: '^#[0-9a-fA-F]{6}$'
                }
            }
        }
    }
}, async (request, reply) => {
    reply.send(await Category.create(request.body))
});

fastify.put('/categories/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                }
            }
        },
        body: {
            type: 'object',
            required: ['name', 'color'],
            properties: {
                name: {
                    type: 'string',
                },
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
        return reply.status(404).send({ message: "Category not found!" })
    }

    await category.update(request.body); 

    reply.send(category);
});

fastify.patch('/categories/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                }
            }
        },
        body: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },
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
        return reply.status(404).send({ message: "Category not found!" })
    }

    await category.update(request.body); 

    reply.send(category);
});

fastify.delete('/categories', async (request, reply) => {
    await Category.destroy({
        where: {},
    });

    reply.status(200).send({ message: "Everything deleted" })
});

fastify.delete('/categories/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                }
            }
        }
    }
}, async (request, reply) => {
    // console.log(request.params)

    const { id } = request.params;

    const category = await Category.findByPk(id);
    if (!category) {
        return reply.status(404).send({ message: "Category not found!" })
    }

    await category.destroy();

    reply.status(200).send({ message: "Category deleted" })
});

fastify.get('/posts', async (request, reply) => {
    reply.send(await Post.findAll({
        include: [
            {
                model: Category,
                attributes: ['name', 'color'],
                through: {
                    attributes: [],
                }
            }
        ]
    }))
});

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err
    // Server is now listening on ${address}
})
