const path = require('path')
const makeGetClient = require(path.join(__dirname, './get-client'))
const makeGetClients = require(path.join(__dirname, './get-clients'))
const makePatchClient = require(path.join(__dirname, './patch-client'))
const makePostClient = require(path.join(__dirname, './post-client'))
const makePostClientPicture = require(path.join(__dirname, './post-clientPic'))
const makePostIdPicture = require(path.join(__dirname, './post-idPic'))
const makePostWitnessPicture = require(path.join(__dirname, './post-witnessPic'))
const makePostItem = require(path.join(__dirname, './post-item'))
const makePatchItem = require(path.join(__dirname, './patch-item'))
const {
    addClient,
    fetchClient,
    fetchClients,
    updateClient,
    clientPicture,
    idPicture,
    witnessPicture
} = require(path.join(__dirname, '../../use-cases/contract'))
const {addProduct, updateProduct} = require(path.join(__dirname, '../../use-cases/contract'))

const getClient = makeGetClient({fetchClient})
const getClients = makeGetClients({fetchClients})
const postClient = makePostClient({addClient})
const patchClient = makePatchClient({updateClient})
const postClientPicture = makePostClientPicture({clientPicture})
const postIdPicture = makePostIdPicture({idPicture})
const postWitnessPicture = makePostWitnessPicture({witnessPicture})
const postItem = makePostItem({addProduct})
const patchItem = makePatchItem({updateProduct})

module.exports = {
    getClient,
    getClients,
    postClient,
    patchClient,
    postClientPicture,
    postIdPicture,
    postWitnessPicture,
    postItem,
    patchItem
}