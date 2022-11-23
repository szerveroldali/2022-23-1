module.exports = (resolverFn) => {
    return async (parent, params, context, info) => {
        const payload = await context.request.jwtVerify()

        context.user = payload;

        return resolverFn(parent, params, context, info);
    }
}
