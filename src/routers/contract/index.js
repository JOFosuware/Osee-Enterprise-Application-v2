// const path = require('path')
// const express = require('express')
// const {auth, upload} = require(path.join(__dirname, '../../middleware'))
// const makeCallback = require(path.join(__dirname, '../../express-callback'))
// const {
//     getClient,
//     getClients,
//     postClient,
//     patchClient,
//     postClientPicture,
//     postIdPicture,
//     postWitnessPicture,
//     postItem,
//     patchItem
// } = require(path.join(__dirname, '../../controllers/contract'))

// const router = new express.Router()
// //Add new contract
// router.post('/client/create', auth, makeCallback(postClient))
// //Fetch a single Client
// router.get('/client/one', auth, makeCallback(getClient))
// //Fetch all clients
// router.get('/client/all', auth, makeCallback(getClients))
// //Update a client info
// router.patch('/client/update', auth, makeCallback(patchClient))
// //Upload client picture
// router.post('/client/image', auth, upload.single('upload'), makeCallback(postClientPicture))
// //Upload client id card picture
// router.post('/client/id', auth, upload.single('upload'), makeCallback(postIdPicture))
// //Upload witness picture
// router.post('/witness/image', auth, upload.single('upload'), makeCallback(postWitnessPicture))
// //Add items purchased by client
// router.post('/client/items', auth, makeCallback(postItem))
// //Update items purchased by client
// router.patch('/client/item/update', auth, makeCallback(patchItem))

// module.exports = router