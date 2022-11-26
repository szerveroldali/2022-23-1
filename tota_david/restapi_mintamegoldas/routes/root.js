const { StatusCodes } = require("http-status-codes");
const S = require('fluent-json-schema');
const { Sequelize, sequelize, User, Playlist, Track } = require("../models");
const { ValidationError, DatabaseError, Op } = Sequelize;

module.exports = function (fastify, opts, next) {
    fastify.get("/tracks", async (request, reply) => {
        reply.send(await Track.findAll());
    });

    fastify.get("/tracks/:id", async (request, reply) => {
        const { id } = request.params;
        const track = await Track.findByPk(id);

        if (!track) {
            return reply.status(404).send();
        }

        reply.send(track);
    });

    fastify.post("/tracks", async (request, reply) => {
        const track = await Track.create(request.body);
        reply.status(201).send(track);
    });

    fastify.put("/tracks/:id", async (request, reply) => {
        const { id } = request.params;
        const track = await Track.findByPk(id);

        if (!track) {
            return reply.status(404).send();
        }

        await track.update(request.body);

        reply.send(track);
    });

    fastify.delete("/tracks/:id", async (request, reply) => {
        const { id } = request.params;
        const track = await Track.findByPk(id);

        if (!track) {
            return reply.status(404).send();
        }

        await track.destroy();

        reply.send();
    });

    fastify.post("/login", {
        schema: {
            // body: {
            //     type: 'object',
            //     required: ['email'],
            //     properties: {
            //         email: {
            //             type: 'string'
            //         }
            //     }
            // }
            body: S.object().prop('email', S.string().format(S.FORMATS.EMAIL).required())
        }
    }, async (request, reply) => {
        const { email } = request.body;

        const user = await User.findOne({
            where: {
                // ugyanaz, mint az email: email,
                email,
            }
        });

        if (!user) {
            return reply.status(404).send();
        }

        const token = fastify.jwt.sign(user.toJSON());

        reply.send({ token })
    });

    fastify.get("/my-playlists", { onRequest: [fastify.auth] }, async (request, reply) => {
        // await Playlist.findAll({
        //     where: {
        //         UserId: request.user.id,
        //     }
        // });

        const user = await User.findByPk(request.user.id);
        reply.send(await user.getPlaylists());
    });

    fastify.post("/my-playlists", { onRequest: [fastify.auth] }, async (request, reply) => {
        // await Playlist.create({
        //     ...request.body,
        //     UserId: request.user.id,
        // })

        const user = await User.findByPk(request.user.id);
        reply.status(201).send(await user.createPlaylist(request.body));
    });

    fastify.post("/my-playlists/:id/add-tracks", {
        onRequest: [fastify.auth],
        schema: {
            body: S.object().prop('tracks', S.array().required())
        }
    }, async (request, reply) => {
        const user = await User.findByPk(request.user.id);

        const playlist = await Playlist.findByPk(request.params.id);
        if (!playlist) {
            return reply.status(404).send();
        }

        // meg lehetne nézni a UserId mező stimmel-e
        // playlist.UserId == user.id
        if (!(await user.hasPlaylist(playlist))) {
            return reply.status(403).send();
        }

        const invalidTracks = [], alreadyAdded = [], addedTracks = [];

        for (const id of request.body.tracks) {
            const track = await Track.findByPk(id);

            if (!track) {
                invalidTracks.push(id);
            } else if (await playlist.hasTrack(track)) {
                alreadyAdded.push(id)
            } else {
                addedTracks.push(id);
                // await playlist.addTrack(track)
            }
        }

        await playlist.addTracks(addedTracks);

        return {
            invalidTracks,
            alreadyAdded,
            addedTracks,
            playlist: {
                ...playlist.toJSON(),
                tracks: await playlist.getTracks({
                    joinTableAttributes: [],
                })
            }
        }

    });

    fastify.post("/my-playlists/:id/remove-tracks", {
        onRequest: [fastify.auth],
        schema: {
            body: S.object().prop('tracks', S.array().required())
        }
    }, async (request, reply) => {
        const user = await User.findByPk(request.user.id);

        const playlist = await Playlist.findByPk(request.params.id);
        if (!playlist) {
            return reply.status(404).send();
        }

        if (!(await user.hasPlaylist(playlist))) {
            return reply.status(403).send();
        }

        const invalidTracks = [], skippedTracks = [], removedTracks = [];

        for (const id of request.body.tracks) {
            const track = await Track.findByPk(id);

            if (!track) {
                invalidTracks.push(id);
            } else if (!(await playlist.hasTrack(track))) {
                skippedTracks.push(id)
            } else {
                removedTracks.push(id);
                // await playlist.removeTrack(track)
            }
        }

        await playlist.removeTracks(removedTracks);

        return {
            invalidTracks,
            skippedTracks,
            removedTracks,
            playlist: {
                ...playlist.toJSON(),
                tracks: await playlist.getTracks({
                    joinTableAttributes: [],
                })
            }
        }

    });

    fastify.get("/playlists/:id/tracks", async (request, reply) => {
        // Ha sikerül a validáció, akkor berakja a request.user-be a payloadot,
        // egyébként nem
        try {
            await request.jwtVerify()
        } catch (err) { }

        const playlist = await Playlist.findByPk(request.params.id);
        if (!playlist) {
            return reply.status(404).send();
        }

        if (playlist.private && (!request.user || request.user.id != playlist.UserId)) {
            return reply.status(403).send();
        }

        // reply.send(
        //     await playlist.getTracks({
        //         attributes: {
        //             include: [
        //                 [sequelize.fn('TIME', sequelize.col('length'), "unixepoch"), 'lengthFormatted']
        //             ],
        //             exclude: ['createdAt', 'updatedAt']
        //         },
        //         order: 'shuffle' in request.query ? sequelize.random() : undefined
        //     })
        // )

        const options = {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },

            joinTableAttributes: [],
        }

        if ('shuffle' in request.query) {
            options.order = sequelize.random();
        }

        const tracks = await playlist.getTracks(options);

        reply.send(
            tracks.map(track => {
                track = track.toJSON();

                track.lengthFormatted = new Date(
                    track.length * 1000
                )
                    .toUTCString()
                    .substring(17, 17+8);

                return track;
            })
        )

    });

    fastify.addHook('onError', async (request, reply, error) => {
        // Ha valamilyen Sequelize-os validációs hiba történt, akkor rossz volt a request
        if (error instanceof ValidationError || error instanceof DatabaseError) {
            reply.status(400).send();
        }
    })



    // // http://127.0.0.1:4000/
    // fastify.get("/", async (request, reply) => {
    //     reply.send({ message: "Gyökér végpont" });
    //     // * A send alapból 200 OK állapotkódot küld, vagyis az előző sor ugyanaz, mint a következő:
    //     // reply.status(StatusCodes.OK).send({ message: "Gyökér végpont" });
    // });

    // // http://127.0.0.1:4000/auth-protected
    // fastify.get("/auth-protected", { onRequest: [fastify.auth] }, async (request, reply) => {
    //     reply.send({ user: request.user });
    // });

    next();
};

module.exports.autoPrefix = "/";
