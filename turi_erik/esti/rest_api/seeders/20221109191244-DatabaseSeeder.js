'use strict';
const db = require('./../models')
const { User, Post, Category } = db
const { faker } = require('@faker-js/faker');
const { ForeignKeyConstraintError } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const userCount = faker.datatype.number({ min: 5, max: 10})
    const users = []
    for (let i = 0; i < userCount; i++){
      users.push(await User.create({
        name: faker.name.fullName(),
        email: `user${i+1}@szerveroldali.hu`,
        password: 'asd',
        isAdmin: false
      }))
    }

    const categoryCount = faker.datatype.number({ min: 5, max: 10})
    const categories = []
    for (let i = 0; i < categoryCount; i++){
      categories.push(await Category.create({
        name: faker.helpers.unique(faker.lorem.word),
        hidden: faker.datatype.boolean()
      }))
    }

    const postCount = faker.datatype.number({ min: 15, max: 30})
    for (let i = 0; i < postCount; i++){
      let p = (await Post.create({
        title: faker.lorem.words(),
        content: faker.lorem.paragraph(),
        UserId: faker.helpers.arrayElement(users).id
      }))
      p.setCategories(faker.helpers.arrayElements(categories))
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
