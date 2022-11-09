const { User, Post, Category } = require('../models');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [];
    const usersCount = faker.datatype.number({ min: 3, max: 6 });

    for (let i = 0; i < usersCount; i++) {
      users.push(
        await User.create({
          name: faker.name.firstName(),
          // email: faker.internet.email(),
          email: `user${i}@szerveroldali.hu`,
          password: "password",
        })
      );
    }

    const posts = [];
    const postsCount = faker.datatype.number({ min: 10, max: 18 });

    for (let i = 0; i < postsCount; i++) {
      const user = faker.helpers.arrayElement(users);

      posts.push(
        await user.createPost({
          title: faker.lorem.sentence().slice(0, -1),
            text: faker.lorem.paragraphs(
              faker.datatype.number({ min: 1, max: 5 })
            ),
        })
      );

      // posts.push(
      //   await Post.create({
      //     title: faker.lorem.sentence().slice(0, -1),
      //     text: faker.lorem.paragraphs(
      //       faker.datatype.number({ min: 1, max: 5 })
      //     ),
      //     UserId: faker.helpers.arrayElement(users).id,
      //   })
      // );
    }
    
    const categories = [];
    const categoriesCount = faker.datatype.number({ min: 5, max: 10 });

    for (let i = 0; i < categoriesCount; i++) {
      categories.push(
        await Category.create({
          name: faker.lorem.word(),
          color: faker.internet.color(),
        })
      );
    }

    // Kategóriák összekötése a postokkal
    for (const post of posts) {
      // Random kategóriák hozzárendelése az éppen iterált posthoz
      await post.setCategories(
        faker.helpers.arrayElements(
          categories,
          faker.datatype.number({ min: 0, max: categoriesCount })
        )
      )
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
