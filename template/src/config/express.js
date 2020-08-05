const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const status = require("../utils/enum/status");
const logger = require('morgan');
const cors = require("cors");
const configLog = typeof process.env.log == 'string' ? JSON.parse(process.env.log) : process.env.log
const configAppLog = typeof process.env.app == 'string' ? JSON.parse(process.env.app) : process.env.app

/* ------------- [START IMPLEMENT] ------------ */
module.exports = () => {
  const app = express();

  const corsOptions = {
    origin: function (origin, callback) {
      if (configAppLog.whiteListReq.indexOf(origin) !== -1 || configAppLog.whiteListReq.indexOf("*") !== -1) {
        callback(null, true)
      } else {
        callback('Not allowed by CORS')
      }
    }
  }
  app.use(require('express-bunyan-logger')(configLog));
  app.use(express.json({limit: '20mb'}));
  app.use(cors(corsOptions))
  app.set("case sensitive routing", true);
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(logger('dev'));
  app.use((req, res, next) => {
    // let session = req.get("x-session-id") || "$session";
    // appLog = logHandle(req.log);
    appLog = req.log
    // log.sessionID = () => session;
    next();
  });

  
  /* ------------- [START LOAD API ROUTE] ------------ */
  // log.info("LOAD MODULES ..");
  const load = require("express-load");
  const cwdPath = path.join(__dirname, "..");
  load("modules", {
    cwd: cwdPath,
    checkext: true,
    extlist: ["service.js"]
  }).into(app);
  load("modules", {
    cwd: cwdPath,
    checkext: true,
    extlist: ["ctrl.js"]
  }).into(app);
  load("modules", {
    cwd: cwdPath,
    // verbose: true,
    checkext: true,
    extlist: ["route.js"]
  }).into(app);
  /* ------------- [END LOAD API ROUTE] ------------ */

  app.use ( (error, req, res, next) => {
    //Catch json error
    if(error.type == 'entity.parse.failed' || error.type == 'extname.failed'){
      appLog.error(error)
      let resMessage = {
        resultCode: status.MISSING_OR_INVALID_PARAMETER.RESULT_CODE,
        developerMessage: status.MISSING_OR_INVALID_PARAMETER.DEVELOPER_MESSAGE
      }
      res.body = resMessage
      return res.status(400).json(resMessage)
    } else if(error.code == 'LIMIT_FILE_SIZE') {
      let resMessage = {
        resultCode: status.PAYLOAD_TOO_LARGE.RESULT_CODE,
        developerMessage: status.PAYLOAD_TOO_LARGE.DEVELOPER_MESSAGE
      }
      res.body = resMessage
      return res.status(413).json(resMessage)
    }
    next()
  });

  /* ------------- [START NOT MATCH ROUTE - 404 ] ------------ */
  app.all("*", (req, res) => {
    // log.debug(`Unknown URL=${req.originalUrl}`);
    let resMessage = {
      resultCode: status.UNKNOWN_URL.RESULT_CODE,
      developerMessage: status.UNKNOWN_URL.DEVELOPER_MESSAGE
    };
    res.body = resMessage;
    return res.status(404).send(resMessage);
  });
  /* ------------- [END NOT MATCH ROUTE - 404 ] ------------ */
  return app;
};
/* ------------- [END IMPLEMENT] ------------ */
