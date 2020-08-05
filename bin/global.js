#!/usr/bin/env node
const path = require('path')
const fs = require('fs-extra')
// let funcNew = require('../lib/new.js');

// Displays the text in the console

let args = process.argv.splice(process.execArgv.length + 2);
let cmd = args[0];

// myLibrary.say(name+'Jack, get back, come on before we crack Lose your blues, everybody cut footloose');

switch(cmd) {
    case 'new':
        let name = args[1];
        if(!name) {
            console.log('Plaese enter your project name.')
            break;
        }
        let pathTemplate = path.join(__dirname, '..', 'template')
        let pathProject = path.join(process.cwd(), name)
        fs.copy(pathTemplate, pathProject)
            .then(() => {
                fs.writeFileSync(path.join(pathProject, 'package.json'), JSON.stringify(require(path.join(pathProject, 'package.json')), null, 4).replace(/template/g, name), function (err) {
                    if (err) return console.log(err);
                });
                fs.writeFileSync(path.join(pathProject, 'pm2-dev.json'), JSON.stringify(require(path.join(pathProject, 'pm2-dev.json')), null, 4).replace(/template/g, name), function (err) {
                    if (err) return console.log(err);
                });
            })
            .catch(err => console.error(err))
      break;
    default:
      // code block
}