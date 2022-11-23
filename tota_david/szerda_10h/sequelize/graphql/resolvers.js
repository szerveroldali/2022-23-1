const { User, Post, Category } = require('../models');
const auth = require('./auth');

module.exports = {
    Query: {
        add: async (_, { x, y }) => x + y,
        hello: () => "Hello world",
        who: auth((parent, params, context) => {
            // console.log(Object.keys(context));
            console.log(context.user);
            return `Hello ${context.user.email}`
        }),
        categories: async () => await Category.findAll(),
        posts: async () => await Post.findAll(),
    },
    Category: {
        posts: async (category) => await category.getPosts(),
    },
    Post: {
        categories: async (post) => await post.getCategories(),
        author: async (post) => await post.getUser(),
    },
    Mutation: {
        createPost: auth(
            async (_, params, context) => {
                const post = await Post.create({
                    ...params.post,
                    UserId: context.user.id,
                })
                return post;
            }
        )
    }
}
