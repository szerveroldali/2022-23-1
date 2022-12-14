'use strict';

const { faker } = require('@faker-js/faker');
const { Category, Post, User } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [];
    for (let i = 0; i < 5; i++) {
      users.push(await User.create({
        email: `user${i + 1}@szerveroldali.hu`,
        password: 'password'
      }));
    }

    const posts = [];
    for (let i = 0; i < 10; i++) {
      let user = faker.helpers.arrayElement(users);
      posts.push(await user.createPost({
        title: faker.lorem.sentence(faker.datatype.number({ min: 3, max: 5 })),
        text: faker.lorem.paragraphs(faker.datatype.number({ min: 2, max: 6 }))
      }));
      /*posts.push(await Post.create({
        title: faker.lorem.sentence(faker.datatype.number({ min: 3, max: 5 })),
        text: faker.lorem.paragraphs(faker.datatype.number({ min: 2, max: 6 }))
      }));*/
    }

    const categories = [];
    for (let i = 0; i < 6; i++) {
      categories.push(await Category.create({
        name: faker.lorem.word(),
        color: faker.color.rgb()
      }));
    }

    for (let post of posts) {
      await post.setCategories(
        faker.helpers.arrayElements(
          categories,
          faker.datatype.number({ min: 1, max: categories.length }))
      );
    }
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
