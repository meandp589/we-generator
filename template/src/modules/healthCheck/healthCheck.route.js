const conf = require("../../../conf/config.json");
const validate = require('../../service/validate')


module.exports = app => {
    let { healthCheck } = conf.routing;
    let ctrl = app.modules.healthCheck;

    app.get(healthCheck, ctrl.getCtrl.healthCheckFunc);
};