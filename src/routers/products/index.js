// const path = require('path')
// const express = require('express')
// const {auth} = require(path.join(__dirname, '../../middleware'))
// const makeCallback = require(path.join(__dirname, '../../express-callback'))
// const {
//     postProduct,
//     patchProduct,
//     getProduct,
//     getProducts,
//     deleteProduct
// } = require(path.join(__dirname, '../../controllers/product'))

// const router = new express.Router()

// //Product creation route
// //The route receives an array of object
// router.post('/admin/me/product/create', auth, makeCallback(postProduct))
// //Updating product route
// router.patch('/admin/me/product/update', auth, makeCallback(patchProduct))
// //Fetching a product route
// router.get('/admin/me/product/fetch', auth, makeCallback(getProduct))
// //Fetching all product route
// router.get('/admin/me/product/fetchall', auth, makeCallback(getProducts))
// //Deleting a product route
// router.delete('/admin/me/product/remove', auth, makeCallback(deleteProduct))

// module.exports = router