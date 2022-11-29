// const path = require('path')
// const express = require('express')
// const {auth} = require(path.join(__dirname, '../../middleware'))
// const makeCallback = require(path.join(__dirname, '../../express-callback'))
// const {
//     postPayment,
//     patchPayment
// } = require(path.join(__dirname, '../../controllers/payment'))

// const router = new express.Router()

// //Client monthly payment
// router.post('/client/pay', auth, makeCallback(postPayment))
// //Client monthly payment update
// router.patch('/client/pay-update', auth, makeCallback(patchPayment))

// module.exports = router