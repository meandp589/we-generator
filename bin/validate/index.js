const Ajv = require("ajv").default;
const ajv = new Ajv({ allErrors: true, useDefaults: true });

exports.envSchema = ( data ) => {
    let schema = {
        type: "object",
        required: [],
        additionalProperties: false,
        properties: {
          projectName: { type: "string" },
          baseURL: { type: "string" },
          headers: { 
            type: "array",
            items: {
                type: "object",
                additionalProperties: false,
                properties: {
                    key: { type: "string" },
                    type: { type: "string" },
                    format: { type: "string" },
                    value: { type: "string" }
                }
            }
          }
        }
    };
    let validateBody = ajv.validate(schema, data);
    if (!validateBody) {
        return validateError;
    }
}

exports.postmanSchema = ( data ) => {
    let schema = {
        type: "object",
        required: [],
        properties: {
            "[\S+]": { 
                type: "object",
                additionalProperties: false,
                properties: {
                    type: { type: "string" },
                    default: { type: "string" },
                    enum: { type: "array" }
                }
            }
        }
    };
    let validateBody = ajv.validate(schema, data);
    if (!validateBody) {
        let validateError = ajv.errorsText();
        return validateError;
    }
}