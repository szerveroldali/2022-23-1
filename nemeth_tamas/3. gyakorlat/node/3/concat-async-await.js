const fs = require('fs');
const { promisify } = require('util');

// const promisify2 = fn => {
//     return (...args) => {
//         return new Promise((resolve, reject) => {
//             const callbackFn = (err, res) => {
//                 if (err) reject(err);
//                 else resolve(res);
//             };

//             args.push(callbackFn);

//             fn(...args);
//         });
//     };
// };

const pReaddir = promisify(fs.readdir);
const pReadFile = promisify(fs.readFile);
const pWriteFile = promisify(fs.writeFile);

(async () => {
    const filenames = await pReaddir('./inputs');
    console.log(filenames);
    let contents = [];
    for (const filename of filenames) {
        contents.push(await pReadFile(`./inputs/${filename}`));
    }
    contents = contents.map(content => content.toString());
    await pWriteFile('./output.txt', contents.join('\n'));
})();

// pReaddir('./inputs')
//     .then(filenames => {
//         console.log(filenames);
//         const promises = filenames.map(filename => pReadFile(`./inputs/${filename}`));
//         return Promise.all(promises);
//     })
//     .then(contents => {
//         contents = contents.map(content => content.toString());
//         console.log(contents);
//         return contents.join('\n');
//     })
//     .then(output => pWriteFile('./output.txt', output))
//     .then(() => console.log('Vége'))
//     .catch(err => {throw err})
