const path    = require('path')
const express = require('express')
const {auth}  = require(path.join(__dirname, '../../middleware'))

const router  = new express.Router()

const addPayment    = require(path.join(__dirname, '../../use-cases/payment')).addPayment
const updatePayment = require(path.join(__dirname, '../../use-cases/payment')).updatePayment

//Client monthly payment
router.post('/payment', auth, async (req, res) => {
    try {
        const data    = req.body

        //Incoming data must be an object
        const payment = await addPayment(data)

        if(!payment)
            throw new Error('bad request')

        res.status(201).json({
            success: true,
            asset: payment
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
//Client monthly payment update
router.patch('/payment-update', auth, async (req, res) => {
    try {
        const data    = req.body
        const clientId = req.query.clientId
        const month = req.query.month
        const year = req.query.year

        //Incoming data must be an object.
        const payment = await updatePayment(data, clientId, month, year)

        if(!payment)
            throw new Error('Bad request')

        res.status(201).json({
            success: true,
            asset: payment
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