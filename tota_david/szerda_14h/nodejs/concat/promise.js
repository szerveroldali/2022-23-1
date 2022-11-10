const { readdir, readFile, writeFile } = require('fs');
const { join } = require('path');
const { promisify } = require('util');

// const promisify = (fn) => {
//     return (...wrapperedArgs) => {
//         return new Promise((resolve, reject) => {
//             fn(...wrapperedArgs, (error, ...callbackArgs) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(...callbackArgs);
//                 }
//             })
//         });
//     }
// }

const pReadDir = promisify(readdir);
const pReadFile = promisify(readFile);
const pWriteFile = promisify(writeFile);

pReadDir('./inputs')
    .then(files => {
        console.log("Fajlnevek:", files);
        return Promise.all(
            files.map(file => pReadFile(
                join('./inputs', file),
                'utf-8'
            ))
        );
    })
    .then((contents) => {
        console.log("Tartalmak:", contents);
        return pWriteFile('./outputs/promise.txt', contents.join('\n'))
    })
    .then(() => {
        console.log("Vege");
    })
    .catch((error) => {
        throw error;
    });

