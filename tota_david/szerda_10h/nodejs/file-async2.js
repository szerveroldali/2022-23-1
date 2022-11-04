const { readdir, readFile, writeFile } = require('fs');
const { join } = require('path');
// const { promisify } = require('util');

const promisify = (fn) => {
    return (...wrapperArgs) => {
        return new Promise((resolve, reject) => {
            const callback = (error, ...args) => {
                if (error) reject();
                else resolve(...args);
            }

            fn(...wrapperArgs, callback);
        })
    }
}

const pReadDir = promisify(readdir);
const pReadFile = promisify(readFile);
const pWriteFile = promisify(writeFile);

// IIFE
;(async () => {
    const files = await pReadDir('./inputs');
    const contents = await Promise.all(files.map(file => pReadFile(join('./inputs', file), 'utf-8')));
    await pWriteFile('concat-async.txt', contents.join('\n'));
    console.log("Vege");
})();
