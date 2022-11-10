'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('TicketUser', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            UserId: {
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                type: Sequelize.INTEGER,
            },
            TicketId: {
                allowNull: false,
                references: {
                  model: 'Tickets',
                  key: 'id'
                },
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
        await queryInterface.addConstraint('TicketUser', {
            fields: ['UserId', 'TicketId'],
            type: 'unique',
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
