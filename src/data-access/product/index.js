const path = require('path')
const mongoose = require('mongoose')
const makeProductDb = require(path.join(__dirname, './product-db'))
const makeModel = require(path.join(__dirname, '../model'))
require(path.join(__dirname, '../index'))

const productSchema = mongoose.Schema({
    serial: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    quantity: {
        type: Number,
        trim: true,
        required: true
    }
})


const Model = makeModel('Products', productSchema)

const productDb = makeProductDb({Model})

module.exports = productDb