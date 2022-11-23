const models = require('./../models')
const { User, Post, Category } = models

module.exports = {
    Query: {
      hello: async (_, { name }) => `hello ${name || 'world'}`,
      add: async(_, {x, y}) => x + y,
      categories: async () => await Category.findAll()
    }
  }