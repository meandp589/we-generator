
const mongoose = require("mongoose")
module.exports = {
    db: (dbName) => {
        return { 
            model: (docName) => {
                if(dbName == 'mongodb') { 
                    return mongoose.model(docName)
                }
            }
        }
    }
}