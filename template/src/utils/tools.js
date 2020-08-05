const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const configApp = typeof process.env.app == 'string' ? JSON.parse(process.env.app) : process.env.app

module.exports.bcryptPassword = async password => {
    let hash = await bcrypt.hash(password, 10);
    return hash;
}

module.exports.bcryptCompare = async (password, hash) => {
    let flag = await bcrypt.compare(password, hash);
    return flag;
}

module.exports.jwtSign = ({data, expiresIn, secretKey}) => {
    return jwt.sign(data, secretKey, { expiresIn: expiresIn });
}

module.exports.random = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
module.exports.jwtVerify = (token) => {
    try {
        return jwt.verify(token, configApp.token.secretKey);
    } catch (err) {
        return null
    }
}

