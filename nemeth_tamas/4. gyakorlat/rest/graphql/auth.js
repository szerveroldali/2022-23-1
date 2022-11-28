module.exports = (fn) => async (parent, params, context, info) => {
    const { payload } = await context.request.jwtVerify();

    context.user = payload;

    return fn(parent, params, context, info);
}