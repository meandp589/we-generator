
const bodyParser = require("body-parser");
const express = require("express");
const logger = require('morgan');
const cors = require("cors");
const path = require("path");
const status = require("../utils/enum/status");
const logHandler = require("../utils/logHandler");

module.exports = () => {
  const app = express();

  logHandler.commonLogs(app)
  
  app.use(logger('dev'));
  app.use((req, res, next) => {
    appLog = logHandler.appLogs()
    next();
  });
  const corsOptions = {
    origin: function (origin, callback) {
      if (env.app.whiteListReq.indexOf(origin) !== -1 || env.app.whiteListReq.indexOf("*") !== -1) {
        callback(null, true)
      } else {
        callback('Not allowed by CORS')
      }
    }
  }
  app.use(cors(corsOptions))
  app.use(express.json({limit: '20mb'}));
  app.set("case sensitive routing", true);
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  const load = require("express-load");
  const cwdPath = path.join(__dirname, "..");
  load("modules", {
    cwd: cwdPath,
    checkext: true,
    extlist: ["ctrl.js"]
  }).into(app);
  load("modules", {
    cwd: cwdPath,
    checkext: true,
    extlist: ["route.js"]
  }).into(app);

  app.use((error, req, res, next) => {
    if(error.type == 'entity.parse.failed' || error.type == 'extname.failed'){
      return res.status(400).json(status.MISSING_OR_INVALID_PARAMETER)
    } 
    if(error.code == 'LIMIT_FILE_SIZE') {
      return res.status(413).json(status.PAYLOAD_TOO_LARGE)
    }
    next()
  });

  app.all("*", (req, res) => {
    res.status(404).send(status.UNKNOWN_URL);
  });
  return app;
};