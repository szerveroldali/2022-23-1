'use strict';

const { User, Post, Category } = require('../models');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        try {
            // User-ek
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
                        password: "password"
                    })
                );
            }

            // Post-ok
            const postsCount = faker.datatype.number({
                min: 10,
                max: 20,
            });

            const posts = [];

            for (let i = 0; i < postsCount; i++) {
                // Random user
                const user = faker.helpers.arrayElement(
                    users
                );

                // Ilyenkor a UserId-t kitölti
                posts.push(
                    await user.createPost({
                        // .slice(0, -1) ne legyen pont a végén
                        title: faker.lorem.sentence().slice(0, -1),
                        text: faker.lorem.paragraphs(
                            // Legalább 1, legfeljebb 5 paragraph legyen
                            faker.datatype.number({
                                min: 1,
                                max: 5,
                            })
                        ),
                    })
                );

                // await Post.create({
                //     // .slice(0, -1) ne legyen pont a végén
                //     title: faker.lorem.sentence().slice(0, -1),
                //     text: faker.lorem.paragraphs(
                //         // Legalább 1, legfeljebb 5 paragraph legyen
                //         faker.datatype.number({
                //             min: 1,
                //             max: 5,
                //         })
                //     ),
                //     // Random element a users tömbből, majd annak az id-ja
                //     UserId: faker.helpers.arrayElement(
                //         users
                //     ).id
                // });
            }

            // Kategóriák
            const categoriesCount = faker.datatype.number({
                min: 4,
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

            // Kategóriák hozzárendelése a Post-okhoz
            for (const post of posts) {
                // Random kategóriák hozzárendelése (lehet, h egy se, lehet, h mind)
                await post.setCategories(
                    faker.helpers.arrayElements(
                        categories,
                        faker.datatype.number({
                            min: 0,
                            max: categoriesCount,
                        })
                    )
                );
            }

        } catch (error) {
            console.log("Hiba a seedelés során:");
            console.log(error);
        }
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
