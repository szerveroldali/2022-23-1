const { StatusCodes } = require('http-status-codes');
const { Sequelize, sequelize, Ticket, Comment } = require('../models');
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
                tickets = await Ticket.findAll({
                    include: [
                        {
                            model: Comment,
                        },
                    ],
                });
            } else {
                tickets = await Ticket.findByPk(id, {
                    include: [
                        {
                            model: Comment,
                        },
                    ],
                });
            }
            if (!tickets) {
                return reply.status(StatusCodes.NOT_FOUND).send({ message: 'Ticket not found.' });
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
                        priority: { type: 'number' },
                        text: { type: 'string' },
                    },
                },
            },
            onRequest: [fastify.auth],
        },
        async (request, reply) => {
            const { title, priority, text } = request.body;
            let ticket = await Ticket.create({ title, priority });
            await Comment.create({ text, UserId: request.user.payload.id, TicketId: ticket.id });

            ticket = await Ticket.findByPk(ticket.id, {
                include: [
                    {
                        model: Comment,
                    },
                ],
            });

            return reply.send(ticket);
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
                    required: ['title', 'done', 'priority'],
                    properties: {
                        title: { type: 'string' },
                        done: { type: 'boolean' },
                        priority: { type: 'number' },
                    },
                },
            },
            onRequest: [fastify.auth],
        },
        async (request, reply) => {
            const { id } = request.params;

            const ticket = await Ticket.findByPk(id);
            if (!ticket) {
                return reply.status(StatusCodes.NOT_FOUND).send({ message: 'Ticket not found.' });
            }

            const { title, done, priority } = request.body;

            await ticket.update({ title, done, priority });

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
                },
            },
            onRequest: [fastify.auth],
        },
        async (request, reply) => {
            const { id } = request.params;

            const ticket = await Ticket.findByPk(id);
            if (!ticket) {
                return reply.status(StatusCodes.NOT_FOUND).send({ message: 'Ticket not found.' });
            }

            await ticket.destroy();

            reply.status(204);
        }
    );

    next();
};

module.exports.autoPrefix = '/';
