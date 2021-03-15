const status = require("../../utils/enum/status");
const validate = require("../../service/validate/templates");
const doc = require('../../utils/enum/doc')
const Templates = require('../../utils/dbHandler').db('mongodb').model(doc.TEMPLATES)

exports.templateFunc = async (req, res) => {
  try {
    let body = req.body
    let params = req.params
    let validateBody = validate.templateSchema({ body });
    if (validateBody) {
      return res.status(400).send({ ...status.MISSING_OR_INVALID_PARAMETER, errorMessage: validateBody });
    }

    let templateDocs = await Templates.findOne({_id: params.templateID, deletedAt: null})
    if(!templateDocs) {
      return res.status(404).json(status.DATA_NOT_FOUND);
    }
    for (const key in body) {
      templateDocs[key] = body[key]
    }
    await templateDocs.save()
    return res.status(200).json({ ...status.SUCCESS, resultData: templateDocs });

  } catch (error) {
    appLog.error(error);
    return res.status(500).send(status.SYSTEM_ERROR);
  }
};
