const { faker } = require('@faker-js/faker');
const { User, Category, Post } = require('../models');

;(async () => {
    console.log(
        (await User.findByPk(1)).comparePassword("password"),
        (await User.findByPk(1)).comparePassword("passw0rd")
    );

    console.log((await User.findByPk(1)).toJSON());
})()