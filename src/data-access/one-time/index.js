const path = require('path')
const mongoose = require('mongoose')
const makeOneTimeDb = require(path.join(__dirname, './one-time-db'))
const makeModel = require(path.join(__dirname, '../model'))
require(path.join(__dirname, '../index'))

const directSalesSchema = mongoose.Schema({
    phone: {
        type: Number,
        trim: true,
        unique: true,
        required: true
    },
    client: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    products: [
        {   serial: {
            type: String,
            trim: true,
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
            },
            purchaseDate: {
                type: Date,
                default: Date.now(),
                required: true
            }
        }
    ]
})


const Model = makeModel('directsales', directSalesSchema)

const oneTimeDb = makeOneTimeDb({Model})

module.exports = oneTimeDb