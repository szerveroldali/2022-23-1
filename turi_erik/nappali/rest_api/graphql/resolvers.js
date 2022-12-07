const models = require('./../models')
const auth = require('./auth')
const { User, Post, Category } = models

module.exports = {
    Query: {
      hello: async (_, { name }) => `hello ${name || 'world'}`,
      add: async(_, {x, y}) => x + y,
      categories: async () => await Category.findAll(),
      posts: async () => await Post.findAll(),
      users: async () => await User.findAll(),
      post: async(_, { id }) => await Post.findByPk(id),
      who: auth(async(parent, params, context) => await context.user.email)
    },
    Post: {
      categories: async(p) => await p.getCategories(),
      user: async(p) => await p.getUser()
    },
    Category: {
      posts: async(c) => await c.getPosts()
    },
    Mutation: {
      createPost: auth(async(_, { data }, context) => {
        data.UserId = context.user.id
        const p = await Post.create(data)

        const invalidCategories = []
        const addedCategories = []
        for (const cn of data.categoryNames){
          const c = await Category.findOne({ where: {name: cn} })
          if (!c)
            invalidCategories.push(cn)
          else {
            addedCategories.push(c)
          }
        }
        await p.addCategories(addedCategories)

        return {
          post: p,
          invalidCategories,
          addedCategories: addedCategories.map(c => c.name)
        }
      })
    }
  }