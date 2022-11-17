const { User, Post } = require('./models');

async function demo() {
    //const users = await User.findAll();
    //console.log(users);

    const post = await Post.findByPk(1);
    const postOwner = await post.getUser();
    console.log(postOwner);

    /*const johnDoe = await User.findByPk(1);
    console.log(johnDoe);*/
}

demo();