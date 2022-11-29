const path          = require('path')
const paymentDb     = require(path.join(__dirname, '../../data-access/payment')).paymentDb
const ClientDb      = require(path.join(__dirname, '../../data-access/contract')).ClientDb
const addPayment    = require(path.join(__dirname, './payment')).makeAddPayment({paymentDb, ClientDb})
const updatePayment = require(path.join(__dirname, './payment')).makeUpdatePayment({paymentDb})


module.exports.addPayment    = addPayment
module.exports.updatePayment = updatePayment