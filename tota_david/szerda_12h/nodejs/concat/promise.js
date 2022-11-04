const { readdir, readFile, writeFile } = require('fs');
const { join } = require('path');
const { promisify } = require('util');

// const promisify = (fn) => {
//     return (...wrapperedArgs) => {
//         return new Promise((resolve, reject) => {
//             const callback = (error, ...callbackArgs) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(...callbackArgs);
//                 }
//             }

//             fn(...wrapperedArgs, callback);
//         });
//     }
// }

const pReadDir = promisify(readdir);
const pReadFile = promisify(readFile);
const pWriteFile = promisify(writeFile);

pReadDir('./inputs')
    .then(files => {
        console.log("Fajlok:", files)
        return Promise.all(
            files.map(file => pReadFile(join('./inputs', file), 'utf-8'))
        );
    })
    .then((contents) => {
        console.log("Tartalom:", contents);
        const output = contents.join('\n');
        return pWriteFile('./outputs/promise.txt', output);
    })
    .then(() => {
        console.log("Vege");
    })
    .catch((error) => {
        throw error;
    });
