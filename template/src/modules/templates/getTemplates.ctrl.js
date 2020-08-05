const status = require("../../utils/enum/status");
const validate = require("../../service/validate/templates");
const basicFunction = require("../../service/basicFunction");
const mongoose = require("mongoose")
const doc = require('../../utils/enum/doc')
const Templates = mongoose.model(doc.TEMPLATES)

exports.templatesFunc = async (req, res) => {
  let resMessage = {
    resultCode: status.SUCCESS.RESULT_CODE,
    developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
  }
  let resHeaders = { "Content-Type": "application/json" };
  let params = req.params
  let query = req.query
  try {
    res.set(resHeaders);
    let validateQuery = validate.queryTemplateSchema(query);
    if (validateQuery) {
      resMessage = {
        resultCode: status.MISSING_OR_INVALID_PARAMETER.RESULT_CODE,
        developerMessage: status.MISSING_OR_INVALID_PARAMETER.DEVELOPER_MESSAGE,
        errorMessage: validateQuery
      };
      return res.status(400).send(resMessage);
    }
    let search = basicFunction.buildQuery([], query)
    let template = await Templates.find({ ...search.query  })
      .skip(search.offset).limit(search.limit).select(search.fields).sort(search.orderBy)
    let rowCount = await Templates.countDocuments({ ...search.query })
    resMessage = {...resMessage, resultData:template, rowCount}
    res.body = resMessage;
    return res.json(resMessage);

  } catch (error) {
    appLog.error(error);
    resMessage = {
      resultCode: status.SYSTEM_ERROR.RESULT_CODE,
      developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE
    };
    return res.status(500).send(resMessage);
  }
};

exports.templatesByIdFunc = async (req, res) => {
  let resMessage = {
    resultCode: status.SUCCESS.RESULT_CODE,
    developerMessage: status.SUCCESS.DEVELOPER_MESSAGE,
  }
  let resHeaders = { "Content-Type": "application/json" };
  let params = req.params
  try {
    res.set(resHeaders);
    let template = await Templates.findOne({ _id:params.templateId });
    resMessage = {...resMessage, resultData:template}
    res.body = resMessage;
    return res.json(resMessage);

  } catch (error) {
    appLog.error(error);
    resMessage = {
      resultCode: status.SYSTEM_ERROR.RESULT_CODE,
      developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE
    };
    return res.status(500).send(resMessage);
  }
};
