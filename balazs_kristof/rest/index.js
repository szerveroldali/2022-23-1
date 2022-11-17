require('dotenv').config();
const fastify = require('fastify')({ logger: true });

fastify.listen({ port: process.env.PORT }, (error, address) => {
    if (error) {
        fastify.log.error(error);
        return;
    }
});