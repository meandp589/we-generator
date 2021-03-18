const loadConfig = require("./src/service/loadConfig").init()
const mongodb = require("./src/models/mongodb");
const fs = require("fs");
const http = require("http");
const https = require("https");
const expressConf = require("./src/config/express");
const app = expressConf();
const logHandler = require("./src/utils/logHandler");

if(env.log.console == false) {
  console = {
    log: (data) => {
      logHandler.appLogs().debug(data)
    },
    warn: (data) => {
      logHandler.appLogs().warn(data)
    },
    error: (data) => {
      logHandler.appLogs().error(data)
    }
  }
}

console.log("################# All Routing #################")
for (const key in require('./conf/config.json').routing) {
  let [ route ] = require('./conf/config.json').routing[key]
  console.log(route)
}
console.log("###############################################")
/* ------------- [START INITIAL APPLICATION] ------------ */

let server = {}
if (env.useHttps == true) {
  const privateKey = fs.readFileSync(env.key);
  const certificate = fs.readFileSync(env.cert);
  const options = { 
    key: privateKey, 
    cert: certificate,
    rejectUnauthorized: false
  };
  server = https.createServer(options, app)
} else {
  server = http.createServer(app)
}

server.listen(process.env.appPort);
/* ------------- [END INITIAL APPLICATION] ------------ */
process.on('warning', (warning) => {
  console.log(warning.stack);
});

module.exports = app;
