/*
    GET     /categories         Kategóriák lekérése
    GET     /categories/:id     Egy kategória lekérése

    POST    /categories         Kategória létrehozása

    PATCH   /categories/:id     Egy kategória módosítása
    PUT     /categories/:id     Egy kategória módosítása

    DELETE  /categories         Minden kategória törlése
    DELETE  /categories/:id     Egy kategória törlése
*/

const { User, Category, Post } = require('./models');
const { readFileSync } = require('fs')

const fastify = require("fastify")({
    logger: true,
});

fastify.register(require('@fastify/jwt'), {
    secret: 'secret'
})

fastify.register(require('mercurius'), {
    schema: readFileSync('./graphql/shema.gql').toString(),
    resolvers: require('./graphql/resolvers'),
    graphiql: true,
    context: (request) => {
        return {
            request
        }
    }
})

fastify.decorate("authenticate", async function (request, reply) {
    try {
        await request.jwtVerify()
    } catch (err) {
        reply.send(err)
    }
})

fastify.post("/login", {
    schema: {
        body: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: { type: "string" },
                password: { type: "string" }
            }
        }
    }
}, async (request, reply) => {
    const { email, password } = request.body;

    const user = await User.findOne({
        where: {
            email, // ugyanaz, mint az email: email
        }
    });

    if (!user) {
        return reply.status(404).send({
            message: "User not found"
        })
    }

    if (!user.comparePassword(password)) {
        return reply.status(401).send({
            message: "Wrong password"
        })
    }

    const token = fastify.jwt.sign({ 
        payload: user.toJSON(),
    })

    reply.send({ token })
});

fastify.get("/who", {
    onRequest: [fastify.authenticate]
}, async (request, reply) => {
    reply.send(request.user);
});

// fastify.get("/", (request, reply) => {
//     reply.send({ hello: "world 3" });
// });

// fastify.get("/:id", (request, reply) => {
//     reply.send(request.params);
// });

fastify.get("/categories", async (request, reply) => {
    const categories = await Category.findAll();

    reply.send(categories);
});

fastify.get("/categories/:id", {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: "number" }
            }
        }
    }
}, async (request, reply) => {
    const { id } = request.params;

    const category = await Category.findByPk(id);
    if (!category) {
        return reply.status(404).send({ message: "Category not found" });
    }

    reply.send(category);
});

fastify.post("/categories", {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'color'],
            properties: {
                name: { type: "string" },
                color: { type: "string", pattern: "^#[0-9a-fA-F]{6}$" }
            }
        }
    }
}, async (request, reply) => {
    const { name, color } = request.body;

    const category = await Category.create({ name, color });
    
    reply.send(category);
});

fastify.put("/categories/:id", {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: "number" }
            }
        },
        body: {
            type: 'object',
            // put
            required: ['name', 'color'],
            properties: {
                name: { type: "string" },
                color: { type: "string", pattern: "^#[0-9a-fA-F]{6}$" }
            }
        }
    }
}, async (request, reply) => {
    const { id } = request.params;

    const category = await Category.findByPk(id);
    if (!category) {
        return reply.status(404).send({ message: "Category not found" });
    }

    const { name, color } = request.body;

    await category.update({ name, color });
    
    reply.send(category);
});

fastify.patch("/categories/:id", {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: "number" }
            }
        },
        body: {
            type: 'object',
            properties: {
                name: { type: "string" },
                color: { type: "string", pattern: "^#[0-9a-fA-F]{6}$" }
            }
        }
    }
}, async (request, reply) => {
    const { id } = request.params;

    const category = await Category.findByPk(id);
    if (!category) {
        return reply.status(404).send({ message: "Category not found" });
    }

    const { name, color } = request.body;

    await category.update({ name, color });
    
    reply.send(category);
});

fastify.delete("/categories", async (request, reply) => {
    await Category.destroy({
        where: {},
    });

    // No content
    reply.send(204);
});

fastify.delete("/categories/:id", {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: "number" }
            }
        }
    }
}, async (request, reply) => {
    const { id } = request.params;

    const category = await Category.findByPk(id);
    if (!category) {
        return reply.status(404).send({ message: "Category not found" });
    }

    await category.destroy();

    reply.status(204);
});

fastify.get("/posts", async (request, reply) => {
    const posts = (
        await Post.findAll({
            include: [
                {
                    model: Category,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    }
                }
            ],
        })
    )
    .map(post => {
        post = post.toJSON();
        post.Categories = post.Categories.map(({ name }) => name)
        return post;
    });

    reply.send(posts);
});

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err;
    // Server is now listening on ${address}
});
