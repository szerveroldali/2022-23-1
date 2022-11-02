const fs = require('fs')
const { promisify } = require('util')

const pReaddir = promisify(fs.readdir)
const pReadFile = promisify(fs.readFile)
const pWriteFile = promisify(fs.writeFile)

;(async () => {
    filenames = await pReaddir('./inputs')
    let lines = []
    for (const filename of filenames) lines.push(await pReadFile(`./inputs/${filename}`))
    await pWriteFile('./concat-output.txt', lines.map(line => line.toString()).join('\n'))
    console.log('Vége.')
})()