const doc = require('../../utils/enum/doc')
const status = require("../../utils/enum/status");
const Templates = require('../../utils/dbHandler').db('mongodb').model(doc.TEMPLATES)

exports.templateFunc = async (req, res) => {
  try {
    
    let params = req.params
    let templateDocs = await Templates.findOne({_id: params.templateID, deletedAt: null})
    if(!templateDocs) {
      return res.status(404).json(status.DATA_NOT_FOUND);
    }
    templateDocs.deletedAt = new Date()
    await templateDocs.save()
    return res.status(200).json({ ...status.SUCCESS, resultData: templateDocs });
    
  } catch (error) {
    appLog.error(error);
    return res.status(500).send(status.SYSTEM_ERROR);
  }
};
