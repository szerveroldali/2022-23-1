'use strict';

const { User } = require('../models');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let users = [];
    for (let i = 0; i < 10; i++) {
      users.push(await User.create({
        name: faker.name.fullName(),
        email: `user${i + 1}@szerveroldali.hu`,
        password: 'password'
      }));
    }

    for (let i = 0; i < 20; i++) {
      let user = faker.helpers.arrayElement(users);
      await user.createPost({
        title: faker.lorem.sentence(3),
        text: faker.lorem.paragraphs(2)
      });
    }
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
