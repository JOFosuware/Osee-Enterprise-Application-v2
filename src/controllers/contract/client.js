const path    = require('path')
const express = require('express')
const {auth, upload} = require(path.join(__dirname, '../../middleware'))
const addClient      = require(path.join(__dirname, "../../use-cases/contract")).addClient
const updateClient   = require(path.join(__dirname, "../../use-cases/contract")).updateClient
const fetchClient    = require(path.join(__dirname, "../../use-cases/contract")).fetchClient
const fetchClients   = require(path.join(__dirname, "../../use-cases/contract")).fetchClients
const clientPicture  = require(path.join(__dirname, "../../use-cases/contract")).clientPicture
const idPicture      = require(path.join(__dirname, "../../use-cases/contract")).idPicture
const witnessPicture = require(path.join(__dirname, "../../use-cases/contract")).witnessPicture
const addProduct     = require(path.join(__dirname, "../../use-cases/contract")).addProduct
const updateProduct  = require(path.join(__dirname, "../../use-cases/contract")).updateProduct

const router = new express.Router()

//Add new contract
router.post('/add', auth, async (req, res) => {
    try {
        //The data should be solely an object
        const client = await addClient(req.body)

        if(!client) 
            throw new Error('Bad request')

        res.status(201).json({
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

//Fetch a single Client
router.get('/fetchone', auth, async (req, res) => {
    try {
        const clientId = req.query.clientId
        const client = await fetchClient(clientId)

        if(!client) 
            throw new Error('Bad request')

        res.json({
            success: true,
            asset: client
        })
    } catch(e) {
        //TODO: error logining
        console.log(e)

        res.status(400).json({
            success: false,
            error: e.message
        })
    }
})

//Fetch all clients
router.get('/fetchall', auth, async (req, res) => {
    try {
        const client = await fetchClients()
        if(!client)
            throw new Error('Bad request')

        res.json({
            success: true,
            asset: client
        })
    } catch (e) {
        
        res.status(400).json({
            success: false,
            error: e.message
        })
    }
})

//Update a client info
router.patch('/update', auth, async (req, res) => {
    try {
        const clientId = req.query.clientId
        const data = req.body
        const client = await updateClient(clientId, data)
        if(!client)
            throw new Error('Bad request')

        res.status(201).json({
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

//Upload client picture
router.post('/image', auth, upload.single('upload'), 
async (req, res) => {
    try {
        const clientId = req.query.clientId ? req.query.clientId : undefined
        const buffer   = req.file ? req.file.buffer : null

        if(!clientId)
            throw new Error('Provide Client ID')

        const image = await clientPicture(clientId, buffer)

        if(!image)
            throw new Error('Bad request')

        res.json({
            success: true,
            asset: image
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

//Upload client id card picture
router.post('/idimage', auth, upload.single('upload'), async (req, res) => {
    try {
        const clientId = req.query.clientId ? req.query.clientId : undefined
        const buffer   = req.file ? req.file.buffer : null

        if(!clientId)
            throw new Error('Client Id must be provided')

        const image    = await idPicture(clientId, buffer)

        if(!image)
            throw new Error('Bad request')

        res.status(201).json({
            success: true,
            asset: image
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

//Upload witness picture
router.post('/witness/image', auth, upload.single('upload'), async (req, res) => {
    try {
        const clientId = req.query.clientId ? req.query.clientId : undefined
        const buffer   = req.file ? req.file.buffer : null

        const image = await witnessPicture(clientId, buffer)
        if(!image)
            throw new Error('Bad request')

        res.json({
            success: true,
            asset: image
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

//Add items purchased by client
router.post('/add-items', auth, async (req, res) => {
    try {
        const clientId = req.query.clientId ? req.query.clientId : undefined
        const data = req.body

        //The data is an array of object
        for(let i = 0; i < data.length; i++) {
            data[i]['clientId'] = clientId
        }
        
        /**
         * addProduct function group the input products or items into saved and unsaved by verifying
         * from the database which products is already stored and update its quantity. This function is used
         * for adding products into stock and adding items purchased by clients into database.
         * One problem is it doesn't work for adding items to client database as intended. Any help from any
         * any develop finding difficult to fix.
         */
        const item = await addProduct(data)
        if(!item)
            throw new Error('Bad request')

        res.json({
            success: true,
            asset: item
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

//Update items purchased by client
router.patch('/item/update', auth, async (req, res) => {
    try {
        //Incoming data must be an array of object
        const data = req.body
        const item = await updateProduct(req.query.serial, data)
        if(!item)
            throw new Error('Bad request')

        res.json({
            success: true,
            asset: item
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