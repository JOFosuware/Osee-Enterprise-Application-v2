// const path = require('path')
// const express = require('express')
// const {auth} = require(path.join(__dirname, '../../middleware'))
// const makeCallback = require(path.join(__dirname, '../../express-callback'))
// const {
//     postPurchase,
//     patchPurchase,
//     getPurchase,
//     getPurchases
// } = require(path.join(__dirname, '../../controllers/one-time'))

// const router = new express.Router()

// //Payment of client product purchase
// router.post('/client/onetime/purchase', auth, makeCallback(postPurchase))
// //Update payment of client purhase
// router.patch('/client/onetime/update', auth, makeCallback(patchPurchase))
// //Fetching a client's purhase history
// router.get('/client/onetime/fetchone', auth, makeCallback(getPurchase))
// //Fetching all clients purchase history
// router.get('/client/onetime/fetchall', auth, makeCallback(getPurchases))

// module.exports = router