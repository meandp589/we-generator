const status = require("../../utils/enum/status");
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
  try {
    res.set(resHeaders);
    let template = await Templates.findOneAndUpdate({ _id: params.templateId  }, { deletedAt:new Date() });
    if(!template) {
      resMessage = {
        resultCode: status.DATA_NOT_FOUND.RESULT_CODE,
        developerMessage: status.DATA_NOT_FOUND.DEVELOPER_MESSAGE,
      };
      return res.status(404).json(resMessage);
    }
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
