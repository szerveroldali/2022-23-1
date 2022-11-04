const { readdir, readFile, writeFile } = require('fs');
const { join } = require('path');
const { promisify } = require('util');

const pReadDir = promisify(readdir);
const pReadFile = promisify(readFile);
const pWriteFile = promisify(writeFile);

// console.log(pReadDir('./inputs')); // pending

pReadDir('./inputs')
    .then(files => {
        //console.log(files);

        return Promise.all(files.map(file => pReadFile(join('./inputs', file), 'utf-8')));
    })
    .then(contents => {
        return pWriteFile('concat-promise.txt', contents.join('\n'))
    })
    .then(() => {
        console.log("Vege");
    })
    .catch(error => {
        throw error
    })

// console.log("Vege2");

