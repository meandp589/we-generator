const fs = require('fs')
const pathLib = require('path')
const mongoose = require("mongoose");
const doc = require('../../utils/enum/doc')
const envService = JSON.parse(process.env.services);
const { connType, ip, port, path, options } = envService.mongodb;
const url_mongoDB = `${connType}://${ip}:${port}${path}`;
const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

fs.readdirSync(`${__dirname}/schema`).forEach(filename => {
  let filenameRe = filename.replace('.js','')
  let modelName = camelToSnakeCase( filenameRe ).toUpperCase()
  if(!doc[modelName] && !filename.includes(' ')) {
    let docInput = {...doc, [modelName]: filenameRe.replace(/^./, filenameRe[0].toUpperCase())}
    fs.writeFileSync(pathLib.resolve(__dirname, "../../utils/enum/doc.js"), `module.exports = Object.freeze(${JSON.stringify(docInput, null, 4)});`, function (err) {
        if (err) return console.log(err);
        console.log("Create enum doc sccess.");
        require(`./schema/${filename}`)
    });
  } else if(doc[modelName]) {
    require(`./schema/${filename}`)
  }
});

mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);

const getIndexes = async () => {
  mongoose.connection.db.listCollections().toArray(async (err, collections) => {
    console.log(' ')
    for (const collection of collections) {
      const indexes = await mongoose.connection.db.collection(collection.name).indexes()
      console.log("######### " + collection.name + " #########")
      indexes.forEach(function (index) {
          console.log(JSON.stringify(index));
      });
      console.log(' ')
    }
    console.log("MongoDB  URL: " + url_mongoDB);
    console.log("MongoDB connection success ...");
  });
};


mongoose.connect(url_mongoDB, options, async error => {
  if (error) {
    let db = mongoose.connection;
    console.error(error);
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
  } else {
    getIndexes();
  }
});

mongoose.Promise = global.Promise;