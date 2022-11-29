const path    = require('path')
const express = require('express')
const auth  = require(path.join(__dirname, '../../middleware')).auth

const router  = new express.Router()

const addProduct    = require(path.join(__dirname, '../../use-cases/product')).addProduct
const updateProduct = require(path.join(__dirname, '../../use-cases/product')).updateProduct
const fetchProduct  = require(path.join(__dirname, '../../use-cases/product')).fetchProduct
const fetchProducts = require(path.join(__dirname, '../../use-cases/product')).fetchProducts
const removeProduct = require(path.join(__dirname, '../../use-cases/product')).removeProduct


//The route receives an array of object
router.post('/add', auth, async (req, res) => {
    try {
        const product = await addProduct(req.body)

        if(!product)
            throw new Error("An error, product couldn't be saved.")
        res.status(201).json({
            success: true,
            asset: product
        })
    } catch (e) {
        //TODO: error logging
        console.log(e)

        res.status(400).json({
            success: false,
            error: e.message
        })
    }
})

//Updating product route
router.patch('/update', auth, async (req, res) => {
    try {
        const data     = req.body
        const serial   = req.query.serial
        //The incoming data should an array of object
        const product  = await updateProduct(serial, data)

        res.status(201).json({
            success: true,
            asset: product
        })
    } catch (e) {
        //TODO: error logging
        console.log(e)

        res.status(400).json({
            success: false,
            error: e.message
        })
    }
})

//Fetching a product
router.get('/fetchone', auth, async (req, res) => {
    try {
        const serial  = req.query.serial
        const product = await fetchProduct(serial)

        res.json({
            success: true,
            asset: product
        })
    } catch (e) {
        //TODO: error logging
        console.log(e)

        res.status(400).json({
            success: false,
            error: e.message
        })
    }
})

//Fetching all product
router.get('/fetchall', auth, async (req, res) => {
    try {
        const product = await fetchProducts()

        res.json({
            success: true,
            asset: product
        })
    } catch (e) {
        //TODO: error logging
        console.log(e)

        res.status(400).json({
            success: false,
            error: e.message
        })
    }
})
//Deleting a product route
router.delete('/remove', auth, async (req, res) => {
    try {
        const serial    = req.query.serial
        const product = await removeProduct(serial)

        if(!product)
            throw new Error("Product is not available")

        res.json({
            success: true,
            message: `Product ${product.description} has been removed`
        })
    } catch (e) {
        //TODO: error logging
        console.log(e)

        res.status(400).json({
            success: false,
            error: e.message
        })
    }
})

module.exports = router