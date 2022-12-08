const auth = require('./auth');
const models = require('../models');
const { sequelize, User, Ticket, Comment } = models;

module.exports = {
    Query: {
        hello: async () => 'Hello there!',
        helloName: async (parent, params, context, info) => `Hello ${params.name}`,
        add: async (parent, { x, y }, context, info) => x + y,

        who: auth(async (parent, params, context) => `Hello ${context.user.name}!`),

        users: async () => User.findAll(),
        user: async (_, { id }) => User.findByPk(id),

        tickets: async () => Ticket.findAll(),
        ticket: async (_, { id }) => Ticket.findByPk(id),

        comments: async () => Comment.findAll(),
        comment: async (_, { id }) => Comment.findByPk(id),

        stats: async () => {
            const stats = await Ticket.findAll({
                attributes: [
                    'priority',
                    [sequelize.fn('COUNT', sequelize.col('ticket.id')), 'ticketsNum'],
                    [sequelize.fn('COUNT', sequelize.col('Comments.id')), 'commentsNum'],
                ],
                include: [
                    {
                        model: Comment,
                        as: 'Comments',
                        attributes: []
                    }
                ],
                group: ['ticket.priority']
            });
            return stats.map(s => s.toJSON());
        }
    },
    User: {
        comments: async user => user.getComments(),
        tickets: async user => user.getTickets(),
    },
    Ticket: {
        comments: async ticket => ticket.getComments(),
        users: async ticket => ticket.getUsers(),
    },
    Comment: {
        user: async comment => comment.getUser(),
        ticket: async comment => comment.getTicket(),
    },
    Mutation: {
        createTicket: auth(async (_, { title, priority, text }, context) => {
            if (![0, 1, 2, 3].includes(priority)) {
                throw new Error('Wrong priority!');
            }

            const ticket = await Ticket.create({
                title,
                priority,
            });
            await ticket.addUser(context.user.id);
            await ticket.createComment({
                text,
                UserId: context.user.id,
            });
            await ticket.reload();
            return ticket;
        }),
        deleteTicket: auth(async (_, { id }) => {
            const ticket = await Ticket.findByPk(id);
            if (!ticket) {
                throw new Error('Ticket not found!');
            }
            await ticket.destroy();
            return true;
        }),
    },
};
