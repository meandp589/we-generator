const status = require("../../utils/enum/status");
const validate = require("../../service/validate/templates");
const doc = require('../../utils/enum/doc')
const Templates = require('../../utils/dbHandler').db('mongodb').model(doc.TEMPLATES)

exports.templateFunc = async (req, res) => {
  try {
    let query = req.query
    let validateQuery = validate.queryTemplateSchema(query);
    if (validateQuery) {
      return res.status(400).send({ ...status.MISSING_OR_INVALID_PARAMETER, errorMessage: validateQuery });
    }
    let templateDocs = await Templates.find({...query, deletedAt: null})
    let rowCount = await Templates.countDocuments({...query, deletedAt: null})
    return res.status(200).json({ ...status.SUCCESS, resultData: templateDocs, rowCount });

  } catch (error) {
    appLog.error(error);
    return res.status(500).send(status.SYSTEM_ERROR);
  }
};

exports.templateByIdFunc = async (req, res) => {
  try {

    let params = req.params
    let templateDoc = await Templates.findOne({ _id:params.templateID, deletedAt: null });
    return res.status(200).json({ ...status.SUCCESS, resultData:templateDoc });

  } catch (error) {
    appLog.error(error);
    return res.status(500).send(status.SYSTEM_ERROR);
  }
};
