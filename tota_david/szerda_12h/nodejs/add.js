// function add(a,b) { return a+b; }
// const add = (a,b) => a+b;

// CommonJS:
// const math = require('./math');
const { add } = require('./math');
// ESM:
// import math from './math';

// console.log(math);
console.log(add(1,2));
// console.log(math.mul(2,2));
