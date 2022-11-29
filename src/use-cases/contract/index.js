const path  = require('path')
const sharp = require('sharp')

const {ClientDb, productDb} = require(path.join(__dirname, '../../data-access/contract'))

const addClient      = require(path.join(__dirname, './client')).makeAddClient({ClientDb})
const fetchClient    = require(path.join(__dirname, './client')).makeFetchClient({ClientDb})
const fetchClients   = require(path.join(__dirname, './client')).makeFetchClients({ClientDb})
const updateClient   = require(path.join(__dirname, './client')).makeUpdateClient({ClientDb})
const clientPicture  = require(path.join(__dirname, './client')).makeClientPicture({ClientDb, sharp})
const idPicture      = require(path.join(__dirname, './client')).makeIdPicture({ClientDb, sharp})
const witnessPicture = require(path.join(__dirname, './client')).makeWitnessPicture({ClientDb, sharp})
const addProduct     = require(path.join(__dirname, '../product/product')).makeAddProduct({productDb})
const updateProduct  = require(path.join(__dirname, '../product/product')).makeUpdateProduct({productDb})

module.exports.addClient = addClient
module.exports.fetchClient = fetchClient
module.exports.fetchClients = fetchClients
module.exports.updateClient = updateClient
module.exports.clientPicture = clientPicture
module.exports.idPicture     = idPicture
module.exports.witnessPicture = witnessPicture
module.exports.addProduct     = addProduct
module.exports.updateProduct  = updateProduct