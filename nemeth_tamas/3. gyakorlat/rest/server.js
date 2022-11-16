// CommonJs
const fastify = require('fastify')({
    logger: true,
});

fastify.get('/', async (request, reply) => {
    return { hello: 'thereeeeee333333333' };
});

/**
 * Run the server!
 */
const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
