
const ajv = require('./ajv')

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
  if (!validateBody) {
    let validateError = ajv.errorsText();
    return validateError;
  }
};

exports.templateSchema = ({ body, required }) => {
  let schema = {
    type: "object",
    required: required || ['templateName'],
    additionalProperties: false,
    properties: {
      templateName: {
        type: "string"
      },
      list: {
        type: "array"
      },
      objectList: {
        type: "array",
        items: {
          type: 'object',
          properties: {
            name: {
              type: "string"
            }
          }
        }
      }
    }
  };
  let validateBody = ajv.validate(schema, body);
  if (!validateBody) {
    let validateError = ajv.errorsText();
    return validateError;
  }
};