const { StatusCodes } = require('http-status-codes');
const { Sequelize, sequelize, Ticket, Comment } = require('../models');
const { ValidationError, DatabaseError, Op } = Sequelize;

/**
 * CRUD
 *
 *
 * GET    /tickets       Összes ticket lekérése
 * GET    /tickets/:id   Megadott ID-jú ticket lekérése
 *
 * POST   /tickets       Új ticket létrehozása
 *
 * PUT    /tickets/:id   Ticket módosítása
 *
 * DELETE /tickets/:id   Ticket törlése
 */

module.exports = function (fastify, opts, next) {
    // http://127.0.0.1:4000/
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
                return reply.status(StatusCodes.NOT_FOUND).send({ message: 'Ticket not found!' });
            }
            reply.send(tickets);
        }
    );

    fastify.post(
        '/tickets',
        {
            schema: {
                body: {
                    type: 'object',
                    required: ['title', 'priority', 'text'],
                    properties: {
                        title: { type: 'string' },
                        priority: { type: 'number', pattern: '(0|1|2|3)' },
                        text: { type: 'string' },
                    },
                },
            },
        },
        async (request, reply) => {
            const { title, priority, text } = request.body;

            const ticket = await Ticket.create({ title, priority });

            // TODO: user, authentikáció

            const comment = await Comment.create({ text, UserId: 1, TicketId: ticket.id });

            reply.status(StatusCodes.CREATED).send(ticket);
        }
    );

    // http://127.0.0.1:4000/auth-protected
    fastify.get('/auth-protected', { onRequest: [fastify.auth] }, async (request, reply) => {
        reply.send({ user: request.user });
    });

    next();
};

module.exports.autoPrefix = '/';
