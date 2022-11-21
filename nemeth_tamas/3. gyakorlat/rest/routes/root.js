const { StatusCodes } = require('http-status-codes');
const { Sequelize, sequelize, Ticket } = require('../models');
const { ValidationError, DatabaseError, Op } = Sequelize;

/**
 * CRUD Ticket
 *
 * GET    '/tickets/'     összes ticket
 * GET    '/tickets/:id'  id-jú ticket
 * POST   '/tickets/'     ticket létrehozása
 * PUT    '/tickets/'     ticket módosítása
 * DELETE '/tickets/'     ticket törlése
 *
 */

module.exports = function (fastify, opts, next) {
    // http://127.0.0.1:4000/
    fastify.get('/', async (request, reply) => {
        reply.send({ message: 'Gyökér végpont' });
        // * A send alapból 200 OK állapotkódot küld, vagyis az előző sor ugyanaz, mint a következő:
        // reply.status(StatusCodes.OK).send({ message: "Gyökér végpont" });
    });

    // http://127.0.0.1:4000/auth-protected
    fastify.get('/auth-protected', { onRequest: [fastify.auth] }, async (request, reply) => {
        reply.send({ user: request.user });
    });

    fastify.get(
        '/tickets/:id?',
        {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                    },
                },
            },
        },
        async (request, reply) => {
            const { id } = request.params;
            let tickets = null;
            if (!id) {
                tickets = await Ticket.findAll();
            } else {
                tickets = await Ticket.findByPk(id);
            }
            if (!tickets) {
                return reply.status(StatusCodes.NOT_FOUND).send({ message: 'Ticket not found.' });
            }
            reply.send(tickets);
        }
    );

    next();
};

module.exports.autoPrefix = '/';
