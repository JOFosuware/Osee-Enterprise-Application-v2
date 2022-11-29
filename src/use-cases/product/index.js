const path          = require('path')

const productDb     = require(path.join(__dirname, '../../data-access/product'))
const addProduct    = require(path.join(__dirname, './product')).makeAddProduct({productDb})
const updateProduct = require(path.join(__dirname, './product')).makeUpdateProduct({productDb})
const fetchProduct  = require(path.join(__dirname, './product')).makeFetchProduct({productDb})
const fetchProducts = require(path.join(__dirname, './product')).makeFetchProducts({productDb})
const removeProduct = require(path.join(__dirname, './product')).makeRemoveProduct({productDb})

module.exports.addProduct    = addProduct
module.exports.updateProduct = updateProduct
module.exports.fetchProduct  = fetchProduct
module.exports.fetchProducts = fetchProducts
module.exports.removeProduct = removeProduct