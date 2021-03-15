const Ajv = require("ajv").default;
const ajv = new Ajv({ allErrors: true, useDefaults: true });

ajv.addKeyword({
    keyword: 'emptyChecker',
    modifying: true,
    schema: false, // keywords value is not used, can be true
    validate: function(data, dataPath, parentData, parentDataProperty) {
        return !parentData[parentDataProperty]
    }
});

ajv.addKeyword({
    keyword: 'formatOrderBy',
    modifying: true,
    schema: false, // keywords value is not used, can be true
    validate: function(data, dataPath, parentData, parentDataProperty) {
        let value = parentData[parentDataProperty]
        var patt = new RegExp(/^(\w+):(asc|desc|1|-1)(,(\w+):(asc|desc|1|-1))*$/g);
        return value ? patt.test(value) : true;
    }
});

module.exports = ajv