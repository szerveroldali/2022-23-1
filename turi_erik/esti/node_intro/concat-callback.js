const fs = require('fs')

fs.readdir('./inputs', (err, filenames) => {
    if (err) throw err
    console.log(filenames)
    let lines = []
    let done = 0
    filenames.forEach((filename, i) => {
        fs.readFile(`./inputs/${filename}`, (err, data) => {
            if (err) throw err
            lines[i] = data.toString()
            done++
            if (done === filenames.length){
                fs.writeFile('./concat-output.txt', lines.join('\n'), (err) => {
                    if (err) throw err
                    console.log('Vége.')
                    // THE END IS IN "CALLBACK HELL"
                })
            }
        })
    })
})

