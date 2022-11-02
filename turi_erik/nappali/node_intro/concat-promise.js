const fs = require('fs')
//const { promisify } = require('util')

const promisify = (f) => function(...args){
    return new Promise((resolve, reject) => {
        let callbackFn = (err, data) => {
            if (err) reject(err)
            else resolve(data)
        }
        f(...args, callbackFn)
    })
}

const pReaddir = promisify(fs.readdir)
const pReadFile = promisify(fs.readFile)
const pWriteFile = promisify(fs.writeFile)

pReaddir('./inputs')
    .then(filenames => {
        console.log(filenames)
        /*let promises = []
        for (const filename of filenames){
            promises.push(pReadFile(`./inputs/${filename}`))
        }*/
        promises = filenames.map(filename => pReadFile(`./inputs/${filename}`))
        return Promise.all(promises)
    })
    .then(lines => {
        let content = lines.map(line => line.toString()).join('\n')
        return pWriteFile('./concat-output.txt', content)
    })
    .then(() =>  console.log('Vége.'))
    .catch(err => { throw err })
