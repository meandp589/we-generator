const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
const mongoose = require("mongoose")

ajv.addKeyword('emptyChecker', {
  modifying: true,
  schema: false, // keywords value is not used, can be true
  validate: function(data, dataPath, parentData, parentDataProperty){
    return parentData[parentDataProperty] != "" && parentData[parentDataProperty] != null
  }
});

ajv.addKeyword('emptyArrayChecker', {
  modifying: true,
  schema: false, // keywords value is not used, can be true
  validate: function(data, dataPath, parentData, parentDataProperty){
    return parentData[parentDataProperty] != null && parentData[parentDataProperty].length > 0 && 
      parentData[parentDataProperty].filter( d => d.trim() == "").length == 0
  }
});

ajv.addKeyword('arrayChecker', {
  modifying: true,
  schema: false, // keywords value is not used, can be true
  validate: function(data, dataPath, parentData, parentDataProperty){
    return parentData[parentDataProperty] != null && parentData[parentDataProperty].length > 0
  }
});

ajv.addKeyword('objectIDChecker', {
  modifying: true,
  schema: false, // keywords value is not used, can be true
  validate: function(data, dataPath, parentData, parentDataProperty){
    if(parentData[parentDataProperty] != "" && parentData[parentDataProperty] != null){
      return mongoose.Types.ObjectId.isValid(parentData[parentDataProperty]);
    } else {
      if(parentData[parentDataProperty] == '') {
        return false
      }
      return true
    }
    // return parentData[parentDataProperty] != "" && parentData[parentDataProperty] != null && mongoose.Types.ObjectId.isValid(parentData[parentDataProperty])
  }
});

ajv.addKeyword('formatOrderBy', {
  modifying: true,
  schema: false, // keywords value is not used, can be true
  validate: function(data, dataPath, parentData, parentDataProperty){
   let value = parentData[parentDataProperty]
   var patt = new RegExp(/^(\w+):(asc|desc|1|-1)(,(\w+):(asc|desc|1|-1))*$/g);
   return value ? patt.test(value) : true;
  }
});

exports.queryTemplateSchema = body => {
  let schema = {
    type: "object",
    required: [],
    additionalProperties: false,
    properties: {
      fields: { type: "string" },
      limit: { 
        type: "string",
        pattern: "^[0-9]+$"
      },
      offset: { 
        type: "string",
        pattern: "^[0-9]+$"
      },
      orderBy: { 
        type: "string",
        formatOrderBy: true
      }
    }
  };
  let validateBody = ajv.validate(schema, body);
  if (validateBody) {
    appLog.debug("VALIDATE SUCCESS");
  } else {
    let validateError = ajv.errorsText();
   appLog.error({errorMessage: validateError});
    return validateError;
  }
};

exports.templateSchema = ({ body, requiredFeild }) => {
  let schema = {
    type: "object",
    required: requiredFeild,
    additionalProperties: false,
    properties: {
      name: {
        type: "string"
      },
    }
  };
  let validateBody = ajv.validate(schema, body);
  if (validateBody) {
    appLog.debug("VALIDATE SUCCESS");
  } else {
    let validateError = ajv.errorsText();
    appLog.error({err: validateError});
    return validateError;
  }
};