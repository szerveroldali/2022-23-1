const { readFileSync } = require('fs')
const { join } = require('path')

module.exports = (fastify) => {
    fastify.register(require('mercurius'), {
        schema: readFileSync(
            join(__dirname, 'graphql/schema.gql')
        ).toString(),
        resolvers: require('./graphql/resolvers'),
        graphiql: true,
        context: (request) => {
            return {
                request,
            };
        }
    })    
}
