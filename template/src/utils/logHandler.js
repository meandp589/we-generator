const path = require('path')
const morgan = require('morgan')
const basicFunction = require('../service/basicFunction')
const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const expressWinston = require('express-winston');
const winston = require('winston')

const logger = createLogger({
    level: env.log.appLog.level,
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new (winston.transports.DailyRotateFile)({
            filename: `${'logs/'}${env.log.appLog.logName}`,
            datePattern: 'YYYYMMDD',
            zippedArchive: true,
            maxSize: env.log.appLog.size,
            maxFiles: env.log.appLog.interval
        })
    ]
});

module.exports = {
    appLogs: () => {
        return module.exports = {
            debug: (data) => {
                logger.debug(data)
            },
            info: (data) => {
                logger.info(data)
            },
            warn: (data) => {
                logger.warn(data)
            },
            error: (data) => {
                logger.error(data)
            }
        }
    },
    commonLogs: (app) => {
        if(env.log.useLog == 'winston') {
            expressWinston.requestWhitelist.push('body');
            app.use(expressWinston.logger({
                transports: [
                    new transports.DailyRotateFile({
                        filename: `${'logs/'}${env.log.winston.logName}`,
                        datePattern: 'YYYY-MM-DD'
                    })
                ],
                format: winston.format.combine(
                  winston.format.colorize(),
                  winston.format.json()
                ),
                meta: true, // optional: control whether you want to log the meta data about the request (default to true)
                msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
                expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
                colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
                ignoreRoute: function (req, res) { 
                    if(req.path == '/health-check') {
                        return true
                    }
                    return false
                } // optional: allows to skip some log messages based on request and/or response
            }));
        }
    }
}