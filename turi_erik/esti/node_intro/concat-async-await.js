const fs = require('fs')
const { promisify } = require('util')

const pReaddir = promisify(fs.readdir)
const pReadFile = promisify(fs.readFile)
const pWriteFile = promisify(fs.writeFile)

// self-invoked async function
;(async () => {
    filenames = await pReaddir('./inputs')
    let lines = []
    for (const filename of filenames)
        lines.push(await pReadFile(`./inputs/${filename}`))
    // lines = await Promise.all(filenames.map(async filename => await pReadFile(`./inputs/${filename}`)))
    
    await pWriteFile('./concat-output.txt', lines.map(line => line.toString()).join('\n'))
    console.log('Vége.')
})()
