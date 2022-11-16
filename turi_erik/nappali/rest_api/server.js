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
    const category = await Category.findByPk(id, { attributes: ['id', 'name', 'hidden'] })
    if (!category)
        return reply.status(404).send({ message: 'Category not found' })
    reply.send(category)
})


fastify.post('/categories', {
    schema:{
        body: {
            type: 'object',
            required: ['name', 'hidden'],
            properties: {
                name: {type: 'string'},
                hidden: {type: 'boolean'}
            }
        }
    }
}, async (request, reply) => {
    const category = await Category.create(request.body)
    reply.status(201).send(category)
})

fastify.put('/categories/:id', {
    schema:{
        params: {
            type: 'object',
            required: ['id'],
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
}, async (request, reply) => {
    const { id } = request.params
    const category = await Category.findByPk(id)
    if (!category)
        return reply.status(404).send({ message: 'Category not found' })
    category.update(request.body)
    reply.status(200).send(category)
})

fastify.patch('/categories/:id', {
    schema:{
        params: {
            type: 'object',
            required: ['id'],
            properties: {
                id: {type: 'integer'}
            }
        },
        body: {
            type: 'object',
            // required: ['name', 'hidden'],
            properties: {
                name: {type: 'string'},
                hidden: {type: 'boolean'}
            }
        }
    }
}, async (request, reply) => {
    const { id } = request.params
    const category = await Category.findByPk(id)
    if (!category)
        return reply.status(404).send({ message: 'Category not found' })
    category.update(request.body)
    reply.status(200).send(category)
})

fastify.delete('/categories', async (request, reply) => {
    await Category.destroy({ truncate: true })
    reply.status(200).send({ message: 'Destroyed EVERYTHING.'})
})

fastify.delete('/categories/:id', {
    schema:{
        params: {
            type: 'object',
            required: ['id'],
            properties: {
                id: {type: 'integer'}
            }
        }
    }
}, async (request, reply) => {
    const { id } = request.params
    const category = await Category.findByPk(id)
    if (!category)
        return reply.status(404).send({ message: 'Category not found' })
    category.destroy()
    reply.status(200).send({ message: `Destroyed category ID ${id}.`})
})

// GET /post variációk :)

// 1. alap -> adatok + UserId
fastify.get('/posts', async (request, reply) => {
    const posts = await Post.findAll()
    reply.send(posts)
})

// 2. szűrt -> csak id, title, content
fastify.get('/posts-filtered', async (request, reply) => {
    const posts = await Post.findAll( { attributes: ['id', 'title', 'content'] } )
    reply.send(posts)
})

// 3. exclude -> minden MINUSZ időbélyegek
fastify.get('/posts-exclude', async (request, reply) => {
    const posts = await Post.findAll( { attributes: {exclude: ['createdAt', 'updatedAt']} } )
    reply.send(posts)
})

// 4. felhasználóval -> adatok + User model!
fastify.get('/posts-with-user', async (request, reply) => {
    const posts = await Post.findAll( { include: [ {model: User} ] } )
    reply.send(posts)
})

// 5. felhasználó adatai, de UserId csak ott legyen
fastify.get('/posts-with-user-no-id', async (request, reply) => {
    const posts = await Post.findAll( { attributes: {exclude: ['UserId']}, include: [ {model: User} ] } )
    reply.send(posts)
})

// 6. poszt kategóriáival együtt (kapcsolótábla ronda)
fastify.get('/posts-with-categories', async (request, reply) => {
    const posts = await Post.findAll( { include: [ {model: Category }]  } )
    reply.send(posts)
})

// 7. poszt kategóriáival együtt (kapcsolótábla nélkül = SZÉP!)
fastify.get('/posts-with-categories-nice', async (request, reply) => {
    const posts = await Post.findAll( { include: [ {model: Category, through: {attributes: []} }]  } )
    reply.send(posts)
})

// 8. összeépítés: user model, UserId nélkül, nice kapcsolótáblával
fastify.get('/posts-with-everything', async (request, reply) => {
    const posts = await Post.findAll( { attributes: {exclude: ['UserId']},
                                        include: [ {model: User}, {model: Category, through: {attributes: []} }]  } )
    reply.send(posts)
})

// +1. csak title tömb
fastify.get('/posts-title', async (request, reply) => {
    const posts = await Post.findAll({ attributes: ['title'] })
    reply.send(posts.map(p => p.title))
})

fastify.listen({ port: 4000 }, (err, address) => {
    if (err) throw err
})