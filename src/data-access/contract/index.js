const path = require('path')
const mongoose = require('mongoose')
const makeModel = require(path.join(__dirname, '../model'))
const makeItemDb = require(path.join(__dirname, './items-db'))
const makeClientDb = require(path.join(__dirname, './client-db'))
require(path.join(__dirname, '../index'))

//Set items schema and call makeItemDb function into itemDb
const itemsCreditedSchema = mongoose.Schema({
    serial: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }, 
    clientId: {
        type: String,
        required: true,
        ref: 'Client'
    }
}, {
    timestamps: true
})

const ProductModel = makeModel('ItemsCredited', itemsCreditedSchema)

const productDb = makeItemDb({ProductModel})

//Set client schema and call makeClientDb function into clientDb
const clientSchema = mongoose.Schema({
    clientId: {
        type: String,
        required: true,
        unique: true
    },
    cName: {
        type: String,
        trim: true,
        required: true,
    },
    cGender: {
        type: String,
        trim: true,
        required: true
    },
    cImage: {
        type: Buffer
    },
    cNumber: {
        type: Number,
        required: true
    },
    cResidence: {
        type: String,
        trim: true,
        required: true
    },
    cLandmark: {
        type: String,
        trim: true,
        required: true
    },
    cLocation: {
        type: String,
        trim: true,
        required: true
    },
    idType: {
        type: String,
        trim: true
    },
    idImage: {
        type: Buffer
    },
    wName: {
        type: String,
        trim: true,
        required: true
    },
    wGender: {
        type: String,
        trim: true,
        required: true
    },
    wNumber: {
        type: Number,
        required: true
    },
    wImage: {
        type: Buffer
    },
    signedOn: {
        type: Date
    },
    status: {
        type: String,
        trim: true,
        required: true
    }
},{
    timestamps: true
})

clientSchema.virtual('itemsPurchased',{
    ref: 'ItemsCredited',
    localField: 'clientId',
    foreignField: 'clientId'
})

clientSchema.virtual('monthlyPayment', {
    ref: 'Payments',
    localField: 'clientId',
    foreignField: 'clientId'
})

const ClientModel = makeModel('Client', clientSchema)
const ClientDb = makeClientDb({ClientModel})


module.exports.ClientDb  = ClientDb
module.exports.productDb = productDb