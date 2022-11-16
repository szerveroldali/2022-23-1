const { User, Post, Category } = require('./models')

const fastify = require('fastify')({
    logger: true
})

fastify.get('/categories', async (request, reply) => {
    const categories = await Category.findAll()
    reply.send(categories)
})

fastify.get('/categories/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {type: 'integer'}
            }
        }
    }
}, async (request, reply) => {
    const { id } = request.params
    const category = await Category.findByPk(id)
    if (!category)
        return reply.status(404).send({message: 'Category not found.'})
    reply.send(category)
})

fastify.post('/categories', {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'hidden'],
            properties: {
                name: {type: 'string'},
                hidden: {type: 'boolean'}
            }
        }
    }
},async (request, reply) => {
    const category = await Category.create(request.body)
    reply.status(201).send(category)
})

fastify.put('/categories/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {type: 'integer'}
            }
        },
        body: {
            type: 'object',
            required: ['name', 'hidden'],
            properties: {
                name: {type: 'string'},
                hidden: {type: 'boolean'}
            }
        }
    }
},async (request, reply) => {
    const { id } = request.params
    const category = await Category.findByPk(id)
    if (!category)
        return reply.status(404).send({message: 'Category not found.'})
    await category.update(request.body)
    reply.send(category)
})

fastify.patch('/categories/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {type: 'integer'}
            }
        },
        body: {
            type: 'object',
            //required: ['name', 'hidden'],
            properties: {
                name: {type: 'string'},
                hidden: {type: 'boolean'}
            }
        }
    }
},async (request, reply) => {
    const { id } = request.params
    const category = await Category.findByPk(id)
    if (!category)
        return reply.status(404).send({message: 'Category not found.'})
    await category.update(request.body)
    reply.send(category)
})

fastify.delete('/categories', async (request, reply) => {
    //await Category.destroy( { where: [] } )
    await Category.destroy( { truncate: true } )
    reply.send({message: 'Deleted EVERYTHING.'})
})

fastify.delete('/categories/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {type: 'integer'}
            }
        }
    }
}, async (request, reply) => {
    const { id } = request.params
    const category = await Category.findByPk(id)
    if (!category)
        return reply.status(404).send({message: 'Category not found.'})
    category.destroy()
    reply.send({message: `Deleted category ID ${id}.`})
})

// 1. bejegyzések listázása alap verzió
fastify.get('/posts', async (request, reply) => {
    const post = await Post.findAll()
    reply.send(post)
})

// 2. bejegyzések listázása + User model
fastify.get('/posts-with-user', async (request, reply) => {
    const post = await Post.findAll({ include: [ {model: User} ] })
    reply.send(post)
})

// 3. bejegyzések listázása + User model - UserId
fastify.get('/posts-with-user-no-id', async (request, reply) => {
    const post = await Post.findAll({ include: [ {model: User} ], 
                                    attributes: {exclude: ['UserId']} })
    reply.send(post)
})

// 4. bejegyezés kategóriákkal (kapcsolótábla ronda)
fastify.get('/posts-with-categories', async (request, reply) => {
    const post = await Post.findAll({ include: [ {model: Category} ]})
    reply.send(post)
})

// 5. bejegyezés kategóriákkal (kapcsolótábla nélkül, SZÉP)
fastify.get('/posts-with-categories-nice', async (request, reply) => {
    const post = await Post.findAll({ include: [ {model: Category,
                                                through: {attributes: []} } ]})
    reply.send(post)
})

// 6. bejegyzések, csak title-content-id
fastify.get('/posts-filtered', async (request, reply) => {
    const post = await Post.findAll( { attributes: ['id', 'title', 'content'] } )
    reply.send(post)
})

// 7. bejegyzések, időbélyeg nélkül
fastify.get('/posts-no-timestamps', async (request, reply) => {
    const post = await Post.findAll( { attributes: {exclude: ['createdAt', 'updatedAt']} } )
    reply.send(post)
})

// 8. összeépítve az előzők :)
fastify.get('/posts-with-everything', async (request, reply) => {
    const post = await Post.findAll( {
        include: [{model: User, attributes: {exclude: ['createdAt', 'updatedAt']}}, {model: Category, attributes: {exclude: ['createdAt', 'updatedAt']}, through: {attributes: []}}],
        attributes: {exclude: ['UserId', 'createdAt', 'updatedAt']}
    } )
    reply.send(post)
})

fastify.listen({ port: 4000 }, (err, address) => {
    if (err) throw err
})