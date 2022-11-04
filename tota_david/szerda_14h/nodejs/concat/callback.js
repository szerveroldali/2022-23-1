const { readdir, readFile, writeFile } = require('fs');
const { join } = require('path');

readdir('./inputs', (error, files) => {
    if (error) throw error;

    // console.log(files);

    const contents = [];

    for (const file of files) {
        const filePath = join('./inputs', file);
        readFile(filePath, 'utf-8', (error, content) => {
            if (error) throw error;

            // console.log(content);
            // console.log(content.toString());

            contents.push(content);

            if (contents.length == files.length) {
                // console.log(contents.join('\n'));

                writeFile('./outputs/callback.txt', contents.join('\n'), (error) => {
                    if (error) throw error;

                    console.log("Vege");
                })
            }
        })
    }
    
});

// console.log("Vege");
