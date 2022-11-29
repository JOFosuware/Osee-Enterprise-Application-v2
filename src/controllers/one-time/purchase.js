const path    = require('path')
const express = require('express')
const {auth}  = require(path.join(__dirname, '../../middleware'))

const addPurchase    = require(path.join(__dirname, '../../use-cases/one-time')).addPurchase
const updatePurchase = require(path.join(__dirname, '../../use-cases/one-time')).updatePurchase
const fetchPurchase  = require(path.join(__dirname, '../../use-cases/one-time')).fetchPurchase
const fetchPurchases = require(path.join(__dirname, '../../use-cases/one-time')).fetchPurchases
const searchClient   = require(path.join(__dirname, '../../use-cases/one-time')).searchClient

const router = new express.Router()

//Payment of client product purchase
router.post('/purchase', auth, async (req, res) => {
    try {
        const data = req.body
        //The request data is an array of objects
        const purchase = await addPurchase(data)

        if(!purchase)
            throw new Error('bad request')

        res.status(201).json({
            success: true,
            asset: purchase
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

//Search client
router.get('/search', auth, 
async (req, res) => {
    try {
        const phone = req.query.phone
        const client  = await searchClient(phone)

        if(!client)
            throw new Error('Client not found')

        res.json({
            success: true,
            asset: client
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

//Update payment of client purhase
router.patch('/update', auth, async (req, res) => {
    try {
        const data = req.body
        const phone = req.query.phone
        const purchase = await updatePurchase(data, phone)

        if(!purchase)
            throw new Error('Bad request')

        res.status(201).json({
            success: true,
            asset: purchase
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

//Fetching a client's purhase history
router.get('/fetchone', auth, async (req, res) => {
    try {
        const id = req.query.clientId
        //data must be an object
        const purchase = await fetchPurchase(id)

        res.json({
            success: true,
            asset: purchase
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

//Fetching all clients purchase history
router.get('/fetchall', auth, async (req, res) => {
    try {
        const purchases = await fetchPurchases()

        res.json({
            success: true,
            asset: purchases
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