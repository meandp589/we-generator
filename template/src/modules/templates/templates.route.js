const conf = require("../../../conf/config.json");
const verifyId = require('../../service/verify-id')
const doc = require('../../utils/enum/doc')

module.exports = app => {
  //Routing
  let templatesByIdRouting = conf.routing.templatesById;
  let templatesRouting = conf.routing.templates;

  //Ctrl
  let ctrl = app.modules.templates;

  app.param('templateId', verifyId.verify(doc.TEMPLATES))

  app.get(templatesRouting, ctrl.getTemplatesCtrl.templatesFunc);
  app.get(templatesByIdRouting, ctrl.getTemplatesCtrl.templatesByIdFunc);

  //PATCH
  app.patch(templatesByIdRouting, ctrl.patchTemplatesCtrl.templatesFunc);

  //PUT
  app.put(templatesByIdRouting, ctrl.putTemplatesCtrl.templatesFunc);

  //POST
  app.post(templatesRouting, ctrl.postTemplatesCtrl.templatesFunc);

  //DELETE
  app.delete(templatesByIdRouting, ctrl.deleteTemplatesCtrl.templatesFunc);
};
``