const { User, Post, Category } = require('../models');
const { faker } = require('@faker-js/faker');

// IIFE
;(async () => {
    // console.log(await User.findAll());

    // console.log(await User.findByPk(1));

    // console.log(await User.findByPk(11111));

    // console.log(await (await User.findByPk(1)).getPosts())

    // console.log(await (await User.findByPk(1)).countPosts())

    // Post kategóriái
    // console.log(await (await Post.findByPk(1)).getCategories())

    // console.log(await Post.findByPk(1, { 
    //     include: [
    //         {
    //             model: Category,
    //         }
    //     ]
    // }))

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

    // console.log(
    //     (await User.findByPk(1)).comparePassword("password"),
    //     (await User.findByPk(1)).comparePassword("passw0rd")
    // );

    console.log(
        await User.findByPk(1)
    );

    console.log(
        (await User.findByPk(1)).toJSON()
    );

})();
