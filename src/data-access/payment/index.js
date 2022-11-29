const path = require('path')
const mongoose = require('mongoose')
const makePaymentDb = require(path.join(__dirname, './payment-db'))
const makeModel = require(path.join(__dirname, '../model'))
require(path.join(__dirname, '../index'))

const paymentSchema = mongoose.Schema({
    clientId: {
        type: String,
        trim: true,
        required: true
    },
    month: {
        type: String,
        trim: true,
        required: true
    },
    year: {
        type: Number,
        trim: true,
        required: true
    },
    paymentDate: {
        type: Date,
        trim: true,
        default: Date.now(),
        required: true
    },
    amountPaid: {
        type: Number,
        trim: true,
        required: true
    }
})


const Model = makeModel('Payments', paymentSchema)

const paymentDb = makePaymentDb({Model})

module.exports.paymentDb = paymentDb
module.exports.paymentSchema = Model