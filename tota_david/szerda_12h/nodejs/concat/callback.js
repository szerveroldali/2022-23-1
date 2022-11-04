const { readdir, readFile, writeFile } = require('fs');
const { join } = require('path');

readdir('./inputs', (error, files) => {
    if (error) throw error;

    // console.log(files);

    const contents = [];

    for (const file of files) {
        readFile(join('./inputs', file), 'utf-8', (error, content) => {
            if (error) throw error;

            // console.log(content.toString());
            // console.log(content);

            contents.push(content);

            if (contents.length == files.length) {
                // console.log(contents);
                // console.log(contents.join('\n'));

                const output = contents.join('\n');

                writeFile('./outputs/callback.txt', output, (error) => {
                    if (error) throw error;

                    console.log("Vege");
                })
            }
        });
    }
    
});

// console.log("Vege");
