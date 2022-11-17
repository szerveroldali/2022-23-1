/*const dotenv = require('dotenv');
dotenv.config();*/
require('dotenv').config();
const fastify = require('fastify')({ logger: true });

fastify.get('/', (request, reply) => {
    reply.send('Hello World!');
});

fastify.listen({ port: process.env.PORT }, function (error, address) {
    if (error) {
        fastify.log.error(error);
        return;
    }

    //console.log(`Listening on ${address}`);
});