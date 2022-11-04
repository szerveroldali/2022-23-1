const { readdir, readFile, writeFile } = require('fs');
const { join } = require('path');
const { promisify } = require('util');

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

// async function main() {
//     const files = await pReadDir('./inputs');
//     const contents = await Promise.all(files.map(file => pReadFile(join('./inputs', file), 'utf-8')));
//     await pWriteFile('concat-async.txt', contents.join('\n'));
//     console.log("Vege");
// }

// main()
