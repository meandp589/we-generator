const status = require("../../utils/enum/status");
const validate = require("../../service/validate/templates");
const doc = require('../../utils/enum/doc')
const Templates = require('../../utils/dbHandler').db('mongodb').model(doc.TEMPLATES)

exports.templateFunc = async (req, res) => {
  try {

    let body = req.body
    let validateBody = validate.templateSchema({ body });
    if (validateBody) {
      return res.status(400).send({ ...status.MISSING_OR_INVALID_PARAMETER, errorMessage: validateBody });
    }
    
    let templateDocs = await Templates.create(body);
    return res.status(201).json({ ...status.CREATED, resultData: templateDocs });

  } catch (error) {
    appLog.error(error);
    return res.status(500).send(status.SYSTEM_ERROR);
  }
};