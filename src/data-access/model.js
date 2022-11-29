const mongoose = require('mongoose')

function makeModel(collection, schema){
    return function model(){
        return mongoose.model(collection, schema)
    }
}

module.exports = makeModel