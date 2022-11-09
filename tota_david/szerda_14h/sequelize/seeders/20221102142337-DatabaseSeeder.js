'use strict';

const { User, Category, Post } = require('../models');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      // Userek
      const usersCount = faker.datatype.number({
        min: 3,
        max: 6,
      });

      const users = [];

      for (let i = 0; i < usersCount; i++) {
        users.push(
          await User.create({
            name: faker.name.fullName(),
            email: `user${i+1}@szerveroldali.hu`,
            password: "password",
          })
        );
      }

      // Postok
      const postsCount = faker.datatype.number({
        min: 10,
        max: 20,
      });

      const posts = [];

      for (let i = 0; i < postsCount; i++) {
        const user = faker.helpers.arrayElement(users);

        posts.push(
          await user.createPost({
            title: faker.lorem.sentence().slice(0,-1),
            text: faker.lorem.paragraphs(),
          })
        );

        // await Post.create({
        //   title: faker.lorem.sentence().slice(0,-1),
        //   text: faker.lorem.paragraphs(),
        //   UserId: faker.helpers.arrayElement(users).id,
        // });
      }

      // Categories
      const categoriesCount = faker.datatype.number({
        min: 5,
        max: 10,
      });

      const categories = [];

      for (let i = 0; i < categoriesCount; i++) {
        categories.push(
          await Category.create({
            name: faker.lorem.word(),
            color: faker.color.rgb(),
          })
        );
      }

      // Kategóriák hozzárendelése a Postokhoz
      for (const post of posts) {
        await post.setCategories(
          faker.helpers.arrayElements(
            categories,
            faker.datatype.number({
              min: 0,
              max: categoriesCount,
            })
          )
        )
      }
      
    }
    catch (error) {
      console.log("Seeder hiba:");
      console.log(error);
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
