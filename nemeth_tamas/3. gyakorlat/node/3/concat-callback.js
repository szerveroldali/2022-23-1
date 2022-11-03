const fs = require('fs');

fs.readdir('./inputs', (err, filenames) => {
    if (err) throw err;
    console.log(filenames);
    const contents = [];
    filenames.forEach(filename => {
        fs.readFile(`./inputs/${filename}`, (err, content) => {
            if (err) throw err;
            console.log(content.toString());
            contents.push(content);
            if (contents.length === filenames.length) {
                fs.writeFile('./output.txt', contents.join('\n'), err => {
                    if (err) throw err;
                    console.log('Vége');
                });
            }
        });
    });
});
