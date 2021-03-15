const conf = require("../../../conf/config.json");

module.exports = app => {
    let { templates, templateByID } = conf.routing;
    let { getCtrl, patchCtrl, postCtrl, deleteCtrl, putCtrl } = app.modules.templates;

    app.get(templateByID, getCtrl.templateByIdFunc);
    app.get(templates, getCtrl.templateFunc);
    
    app.put(templateByID, putCtrl.templateFunc);

    app.patch(templateByID, patchCtrl.templateFunc);

    app.post(templates, postCtrl.templateFunc);

    app.delete(templateByID, deleteCtrl.templateFunc);
};