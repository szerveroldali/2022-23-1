const auth = require('./auth');
const models = require('../models');
const { User, Ticket, Comment } = models;

module.exports = {
    Query: {
        hello: async () => 'Hello there!',
        helloName: async (parent, params, context, info) => `Hello ${params.name}`,
        add: async (_, { x, y }) => x + y,

        who: auth((parent, params, context) => {
            return `Hello ${context.user.name}`;
        }),

        users: async () => await User.findAll(),
        user: async (_, { id }) => await User.findByPk(id),

        tickets: async () => await Ticket.findAll(),
        ticket: async (_, { id }) => await Ticket.findByPk(id),

        comments: async () => await Comment.findAll(),
        comment: async (_, { id }) => await Comment.findByPk(id),
    },
    Mutation: {
        createTicket: auth(async (_, { title, priority, text }, context) => {
            if (![0, 1, 2, 3].includes(priority)) {
                throw Error('Wrong priority!');
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
        deleteTicket: auth(async (_, { id }, context) => {
            const ticket = await Ticket.findByPk(id);
            if (!ticket) {
                throw new Error('Ticket not found!');
            }
            await ticket.destroy();
            return true;
        }),
    },
    User: {
        comments: async user => await user.getComments(),
        tickets: async user => await user.getTickets(),
    },
    Ticket: {
        comments: async ticket => await ticket.getComments(),
        users: async ticket => await ticket.getUsers(),
    },
    Comment: {
        user: async comment => await comment.getUser(),
        ticket: async comment => await comment.getTicket(),
    },
};
