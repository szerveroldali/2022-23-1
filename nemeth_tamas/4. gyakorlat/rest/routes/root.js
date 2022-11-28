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
                tickets = await Ticket.findAll({ include: [{ model: Comment }] });
            } else {
                tickets = await Ticket.findByPk(id, { include: [{ model: Comment }] });
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
            onRequest: [fastify.auth],
        },
        async (request, reply) => {
            const { title, priority, text } = request.body;

            let ticket = await Ticket.create({ title, priority });

            const comment = await Comment.create({
                text,
                UserId: request.user.payload.id,
                TicketId: ticket.id,
            });

            ticket = await Ticket.findByPk(ticket.id, { include: [{ model: Comment }] });

            reply.status(StatusCodes.CREATED).send(ticket);
        }
    );

    fastify.put(
        '/tickets/:id',
        {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                    },
                },
                body: {
                    type: 'object',
                    required: ['title', 'priority', 'done'],
                    properties: {
                        title: { type: 'string' },
                        priority: { type: 'number' },
                        done: { type: 'boolean' },
                    },
                },
            },
        },
        async (request, reply) => {
            const { id } = request.params;

            const ticket = await Ticket.findByPk(id);
            if (!ticket) {
                return reply.status(StatusCodes.NOT_FOUND).send({ message: 'Ticket not found' });
            }

            const { title, priority, done } = request.body;

            await ticket.update({ title, priority, done });

            reply.send(ticket);
        }
    );

    fastify.delete('/tickets', { onRequest: [fastify.auth] }, async (request, reply) => {
        await Ticket.destroy({ where: {} });

        reply.status(204);
    });

    fastify.delete(
        '/tickets/:id',
        {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                    },
                }
            },
            onRequest: [fastify.auth],
        },
        async (request, reply) => {
            const { id } = request.params;

            const ticket = await Ticket.findByPk(id);
            if (!ticket) {
                return reply.status(StatusCodes.NOT_FOUND).send({ message: 'Ticket not found' });
            }
            await ticket.destroy();

            reply.status(204);
        }
    );

    next();
};

module.exports.autoPrefix = '/';
