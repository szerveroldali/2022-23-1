const isthisanumberpleasehelpme = require('is-number');
const demo_module = require('./demo_module');
const { SUPER_SECRET_API_KEY } = require('./demo_module');
/*
setTimeout(function () { console.log('timeout') }, 10000);

console.log("Hello World");

console.log(isthisanumberpleasehelpme('abc'), isthisanumberpleasehelpme(123), isthisanumberpleasehelpme(1.23));

demo_module.say_hello();

console.log(demo_module.SUPER_SECRET_API_KEY, demo_module.API_ENDPOINT);

console.log(SUPER_SECRET_API_KEY);

console.log(require('./demo_module').API_ENDPOINT);
*/

function timeout() {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            //console.log('timeout');
            resolve("zold_kockasfulu_nyul");
            //reject();
        }, 3000);
    });
}

async function demo() {
    console.log('demo started');
    const timeout_result = await timeout();
    console.log(timeout_result);
    
    console.log("Hello World");

    console.log(isthisanumberpleasehelpme('abc'), isthisanumberpleasehelpme(123), isthisanumberpleasehelpme(1.23));

    demo_module.say_hello();

    console.log(demo_module.SUPER_SECRET_API_KEY, demo_module.API_ENDPOINT);

    console.log(SUPER_SECRET_API_KEY);

    console.log(require('./demo_module').API_ENDPOINT);
}

function demo2() {
    console.log('demo started');
    timeout().then((zold_kockasfulu_nyul) => {
        console.log(zold_kockasfulu_nyul);
        console.log("Hello World");

        console.log(isthisanumberpleasehelpme('abc'), isthisanumberpleasehelpme(123), isthisanumberpleasehelpme(1.23));

        demo_module.say_hello();

        console.log(demo_module.SUPER_SECRET_API_KEY, demo_module.API_ENDPOINT);

        console.log(SUPER_SECRET_API_KEY);

        console.log(require('./demo_module').API_ENDPOINT);
    })
    .catch(() => {
        console.error('hiba történt');
    })
    .finally(() => {
        console.log('demo2 finished');
    })
}

demo2();