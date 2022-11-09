const { User, Post, Category } = require('../models');
const { faker } = require('@faker-js/faker');

// IIFE
(async () => {
    // console.log(await User.findAll());

    // console.log(await User.findByPk(2));

    // console.log(await User.findByPk(2222));

    // console.log(await User.count());

    // console.log(await (await User.findByPk(2)).getPosts());

    // console.log(await (await User.findByPk(2)).countPosts());

    // console.log(
    //     (await (await Post.findByPk(1)).getCategories())
    //         .map(category => [category.name, category.color])
    // );

    // console.log(
    //     await (await Post.findByPk(1)).getCategories(
    //         { attributes: ["name"], raw: true }
    //     )
    // );

    // console.log(
    //     JSON.stringify(
    //         await Post.findAll({
    //             // A bejegyzésből csak az id, title és text mezők jelenjenek meg
    //             attributes: ["id", "title", "text"],
    //             // És a bejegyzés tartalmazza még...
    //             include: [
    //                 {
    //                     // ... a kategória modelt ...
    //                     model: Category,
    //                     // ... mint "Categories" alias ...
    //                     as: "Categories",
    //                     // ... és ezeket a mezőit kérje le:
    //                     attributes: ["id", "name"],

    //                     // Ez pedig azért kell, hogy a kapcsolótáblát ne szemetelje bele,
    //                     // a legjobb ha kikommentezed az alábbi sort és megnézed, mi változik
    //                     through: { attributes: [] },
    //                 },
    //             ],
    //         }),
    //         // JSON.stringify testreszabása
    //         null,
    //         4
    //     )
    // );

    const user = await User.create({
        name: "Valaki",
        email: faker.internet.email(),
        password: "password",
    });

    console.log(
        user.checkPassword("password"),
        user.checkPassword("passw0rd")
    );

    console.log(user.toJSON());
})()