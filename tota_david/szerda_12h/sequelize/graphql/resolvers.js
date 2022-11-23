const { User, Post, Category } = require('../models');
const auth = require('./auth');

module.exports = {
    Query: {
        add: async (_, { x, y }) => x + y,
        hello: () => "Hello",
        // who: (parent, params, context) => {
        //     console.log(Object.keys(context));
        //     return null;
        // },
        who: auth(
            (parent, params, context) => {
                return `Hello ${context.user.email}`
            }
        ),
        categories: async () => await Category.findAll(),
        posts: async () => await Post.findAll(),
    },
    Category: {
        posts: async (category) => await category.getPosts() 
    },
    Post: {
        categories: async (post) => await post.getCategories(),
        author: async (post) => await post.getUser() 
    },
    Mutation: {
        createPost: auth(
            async (_, { post }, context) => {
                return (
                    await Post.create({
                        ...post,
                        UserId: context.user.id,
                    })
                );
            }
        ),
    }
}

// mutation {
//     createPost(post: {
//         title: "valami",
//         text: "aaaaa"
//     }) {
//         id
//         title
//       author {
//             email
//         }
//     }
// }
