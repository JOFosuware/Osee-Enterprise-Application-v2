const path      = require('path')
const oneTimeDb = require(path.join(__dirname, '../../data-access/one-time'))

const addPurchase    = require(path.join(__dirname, './purchase')).makeAddPurchase({oneTimeDb})
const updatePurchase = require(path.join(__dirname, './purchase')).makeUpdatePurchase({oneTimeDb})
const fetchPurchase  = require(path.join(__dirname, './purchase')).makeFetchPurchase({oneTimeDb})
const fetchPurchases = require(path.join(__dirname, './purchase')).makeFetchPurchases({oneTimeDb})
const searchClient   = require(path.join(__dirname, './purchase')).makeSearchClient({oneTimeDb})


module.exports.addPurchase    = addPurchase
module.exports.updatePurchase = updatePurchase
module.exports.fetchPurchase  = fetchPurchase
module.exports.fetchPurchases = fetchPurchases
module.exports.searchClient   = searchClient