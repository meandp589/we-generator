#!/usr/bin/env node
const path = require('path')
const fs = require('fs-extra')
const shell = require('shelljs')
const basicFunction = require('./services/basicFunction')

let pathTemplate = path.join(__dirname, '..', 'template')
let args = process.argv.splice(process.execArgv.length + 2);
let [ cmd ] = args;

switch(cmd) {
    
    case 'new':
        let name = args[1];
        if(!name) {
            console.log('usage: we new <project_name>.')
            break;
        }

        if(/A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z/g.test(name)) {
            console.log('The new project command requires to be snake case format.')
            break;
        }

        let pathProject = path.join(process.cwd(), name)
        fs.copy(pathTemplate, pathProject)
            .then(() => {
                fs.writeFileSync(path.join(pathProject, 'package.json'), JSON.stringify(require(path.join(pathProject, 'package.json')), null, 4)
                    .replace(/template/g, name)
                    .replace(/Template/g, basicFunction.capitalizeFirstLetter(name)), function (err) {
                        if (err) return console.log(err);
                });
                
                fs.writeFileSync(path.join(pathProject, 'pm2-dev.json'), JSON.stringify(require(path.join(pathProject, 'pm2-dev.json')), null, 4)
                    .replace(/template/g, name)
                    .replace(/Template/g, basicFunction.capitalizeFirstLetter(name)), function (err) {
                    if (err) return console.log(err);
                });
            }).then(() => {
                shell.exec(`cd ${path.join(process.cwd(), name)} && npm i body-parser mongoose morgan cors express express-load ajv express-winston winston winston-daily-rotate-file -s`)
            })
            .catch(err => console.error(err))
        break;

    case 'g':
    case 'generate':

        let type = args[1];
        if(!type || (type !== 'modules' && type !== 'postman')) {
            console.log('usage: we generate <schematic> [options].')
            console.log(' ')
            console.log('Available Schematics:')
            console.log(' modules')
            console.log(' postman')
            break;
        }
            
        

        break;
    default:
}