module.exports = (fn) => async (parent, params, context, info) => {
    const { payload } = await context.request.jwtVerify();

    context.user = payload;

    // Eredeti resolver fv meghívása, azonban a context-ben már benne lesz a JWT payload (user adatok)
    return fn(parent, params, context, info);
};