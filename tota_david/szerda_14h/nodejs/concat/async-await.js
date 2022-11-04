const { 
    readdir: pReadDir, 
    readFile: pReadFile, 
    writeFile: pWriteFile 
} = require('fs/promises');
const { join } = require('path');

// IIFE
;(async () => {
    const files = await pReadDir('./inputs')

    console.log("Fajlnevek:", files);

    const contents = await Promise.all(
        files.map(file => pReadFile(
            join('./inputs', file),
            'utf-8'
        ))
    );

    console.log("Tartalmak:", contents);
    await pWriteFile('./outputs/async-await.txt', contents.join('\n'))

    console.log("Vege");
})()

// const main = async () => {
//     const files = await pReadDir('./inputs')

//     console.log("Fajlnevek:", files);

//     const contents = await Promise.all(
//         files.map(file => pReadFile(
//             join('./inputs', file),
//             'utf-8'
//         ))
//     );

//     console.log("Tartalmak:", contents);
//     await pWriteFile('./outputs/async-await.txt', contents.join('\n'))

//     console.log("Vege");
// }

// main()

// pReadDir('./inputs')
//     .then(files => {
//         console.log("Fajlnevek:", files);
//         return Promise.all(
//             files.map(file => pReadFile(
//                 join('./inputs', file),
//                 'utf-8'
//             ))
//         );
//     })
//     .then((contents) => {
//         console.log("Tartalmak:", contents);
//         return pWriteFile('./outputs/promise.txt', contents.join('\n'))
//     })
//     .then(() => {
//         console.log("Vege");
//     })
//     .catch((error) => {
//         throw error;
//     });
