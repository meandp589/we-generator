#!/usr/bin/env node
const path = require('path')
const fs = require('fs-extra')
const shell = require('shelljs')
const basicFunction = require('./services/basicFunction')
const validate = require('./validate')

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

    case 'v':
    case 'version':
        let version = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'))).version
        console.log(`We-generator Version : ${version}`)
        break;

    case 'g':
    case 'generate':

        let type = args[1];
        if(!type || (type !== 'modules' && type !== 'postman')) {
            console.log(' ')
            console.log('usage: we generate <schematic> [options].')
            console.log(' ')
            console.log('Available Schematics:')
            console.log(' modules')
            console.log(' postman')
            console.log(' ')
            break;
        }
            
        if(type === 'postman') {
            let inputPath = args[2]
            let outputPath = args[3]
            if(!inputPath || !outputPath) {
                console.log('usage: we generate postman <input path> <output path>')
                break;
            }
            inputPath = path.join(process.cwd(), inputPath)
            outputPath = path.join(process.cwd(), outputPath)
            let isDirectory = false
            try {
                isDirectory = fs.lstatSync(inputPath).isDirectory()
                if(!isDirectory) {
                    console.log('Please enter your directory path.')
                    break;
                }
            } catch (error) {
                console.log('Please enter your directory path.')
                break;
            }
            
            let files = fs.readdirSync(inputPath).filter( d => d !== 'env.json')
            if(files.length === 0) {
                console.log('Please create file schema for generate postman file.')
                break;
            }

            let env = ''
            try {
                env = fs.readFileSync(path.join(inputPath, 'env.json'),{ encoding:'utf8' })
                try {
                    env = JSON.parse(env)
                } catch(e) {
                    console.log('Please check JSON format (env.json).')
                    break;
                }
                const validateError = validate.envSchema(env)
                if (validateError) {
                    console.log('Please check env format.')
                    console.log('Error Message : '+ validateError)
                    break;
                }
            } catch (error) {
                console.log('Please create file env.json for generate postman file.')
                console.log('Error Message : '+ error)
                break;
            }

            //Format Validation
            let isValidateFail = false
            for (const fileName of files) {
                let data = fs.readFileSync(path.join(inputPath, fileName),{ encoding:'utf8' });
                try {
                    data = JSON.parse(data)
                } catch(e) {
                    if(!isValidateFail) isValidateFail = !isValidateFail;
                    console.log('Please check JSON format.')
                    break;
                }
                const validateError = validate.postmanSchema(data)
                if (validateError) {
                    console.log('Please check schema format.')
                    console.log('Error Message : '+ validateError)
                    if(!isValidateFail) isValidateFail = !isValidateFail;
                    break;
                }
            }
            if(isValidateFail) break;

            if (!fs.existsSync(outputPath)){
                fs.mkdirSync(outputPath);
            }

            let postmanData = basicFunction.generatePostmanFile({ env, inputPath, fileNames: files })
            fs.writeFileSync(path.join(outputPath, `collection_${env.projectName.toLowerCase()}_${new Date().toISOString()}.json`), postmanData);
        }

        if(type === 'modules') {
            console.log('coming soon.')
        }

        break;
    default:
        console.log(' ')
        console.log('usage: we generate <schematic> [options].')
        console.log(' ')
        console.log('Available Schematics:')
        console.log(' modules')
        console.log(' postman')
        console.log(' ')
        break;
}