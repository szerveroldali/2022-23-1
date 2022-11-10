const { 
    readdir: pReadDir, 
    readFile: pReadFile, 
    writeFile: pWriteFile 
} = require('fs/promises');

const { join } = require('path');

// IIFE
;(async () => {
    const files = await pReadDir('./inputs');
    console.log("Fajlok:", files)

    const contents = await Promise.all(
        files.map(file => pReadFile(join('./inputs', file), 'utf-8'))
    );

    console.log("Tartalom:", contents);
    const output = contents.join('\n');
    await pWriteFile('./outputs/async-await.txt', output);
})();

// const main = async () => {
//     const files = await pReadDir('./inputs');
//     console.log("Fajlok:", files)

//     const contents = await Promise.all(
//         files.map(file => pReadFile(join('./inputs', file), 'utf-8'))
//     );

//     console.log("Tartalom:", contents);
//     const output = contents.join('\n');
//     await pWriteFile('./outputs/async-await.txt', output);
// }

// main();

// pReadDir('./inputs')
//     .then(files => {
//         console.log("Fajlok:", files)
//         return Promise.all(
//             files.map(file => pReadFile(join('./inputs', file), 'utf-8'))
//         );
//     })
//     .then((contents) => {
//         console.log("Tartalom:", contents);
//         const output = contents.join('\n');
//         return pWriteFile('./outputs/promise.txt', output);
//     })
//     .then(() => {
//         console.log("Vege");
//     })
//     .catch((error) => {
//         throw error;
//     });