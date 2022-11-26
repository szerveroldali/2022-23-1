"use strict";

// Faker dokumentáció, API referencia: https://fakerjs.dev/guide/#node-js
const { faker } = require("@faker-js/faker");
const chalk = require("chalk");
const { Track, Playlist, User } = require("../models");
const slug = require('slug');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            // Ide dolgozd ki a seeder tartalmát:

            const tracks = [];
            const tracksCount = faker.datatype.number({
                min: 20,
                max: 30,
            });

            for (let i = 0; i < tracksCount; i++) {
                // title: string (zeneszám címe)
                // length: integer (zeneszám hossza másodpercekben)
                // author: string, nullable (zeneszám szerzője)
                // genres: string, nullable (zeneszám műfajai, egyszerűen szövegként)
                // album: string, nullable (melyik albumba tartozik a szám - csak szövegként)
                // url: string (zeneszámra mutató hivatkozás, pl. Spotify link, stb)
                const title = faker.music.songName();

                tracks.push(
                    await Track.create({
                        title, // ugyanaz, mint a title: title
                        length: faker.datatype.number({
                            min: 60,
                            max: 360,
                        }),
                        author: faker.name.fullName(),
                        // genres: faker.music.genre(),
                        genres: new Array(
                            faker.datatype.number({
                                min: 1,
                                max: 3,
                            })
                        ).fill(1).map(e => faker.music.genre()).join(', '),
                        album: faker.lorem.word(),
                        url: `https://szerveroldali-webprog-zenetar.com/${faker.datatype.number({
                            min: 1000,
                            max: 9999,
                        })}-${slug(title)}`
                    })
                );
            }

            const usersCount = faker.datatype.number({
                min: 5,
                max: 10,
            });

            for (let i = 0; i < usersCount; i++) {
                const user = await User.create({
                    // vagy: https://fakerjs.dev/api/helpers.html#unique
                    email: `user${i+1}@szerveroldali.hu`,
                });

                // Minden userhez generálunk playlisteket
                const playlistsCount = faker.datatype.number({
                    min: 0,
                    max: 4,
                });

                for (let j = 0; j < playlistsCount; j++) {
                    const playlist = await user.createPlaylist({
                        title: faker.lorem.word(),
                        private: Math.random() < 0.3
                    });

                    await playlist.setTracks(
                        faker.helpers.arrayElements(tracks)
                    );
                }

            }

            console.log(chalk.green("A DatabaseSeeder lefutott"));
        } catch (e) {
            // Ha a seederben valamilyen hiba van, akkor alapértelmezés szerint elég szegényesen írja
            // ki azokat a rendszer a seeder futtatásakor. Ezért ez Neked egy segítség, hogy láthasd a
            // hiba részletes kiírását.
            // Így ha valamit elrontasz a seederben, azt könnyebben tudod debug-olni.
            console.log(chalk.red("A DatabaseSeeder nem futott le teljesen, mivel az alábbi hiba történt:"));
            console.log(chalk.gray(e));
        }
    },

    // Erre alapvetően nincs szükséged, mivel a parancsok úgy vannak felépítve,
    // hogy tiszta adatbázist generálnak, vagyis a korábbi adatok enélkül is elvesznek
    down: async (queryInterface, Sequelize) => {},
};
