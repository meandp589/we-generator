const status = require('../utils/enum/status')
const mongoose = require("mongoose")

module.exports.verify = (docName) => {
    const isCheckId = async (id) => await mongoose.model(docName).countDocuments({_id:id}) > 0
    return async (req, res, next, id) => {
        if(mongoose.Types.ObjectId.isValid(id)){
            let isFlag = await isCheckId(id)
            if(isFlag){
                return next()
            } 
        } 
        let resMessage = {
            resultCode: status.MISSING_OR_INVALID_PARAMETER.RESULT_CODE,
            developerMessage: status.MISSING_OR_INVALID_PARAMETER.DEVELOPER_MESSAGE,
            errorMessage: '_id not found.'
        };
        return res.status(400).send(resMessage);
        
    }
}