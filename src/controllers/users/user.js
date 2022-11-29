const path           = require('path')
const express        = require('express')
const {auth, upload} = require(path.join(__dirname, '../../middleware'))

//Load User use case module and strip off the functions
const addUser       = require(path.join(__dirname, '../../use-cases/user')).addUser
const loginUser     = require(path.join(__dirname, '../../use-cases/user')).loginUser
const editUser      = require(path.join(__dirname, '../../use-cases/user')).editUser
const removeUser    = require(path.join(__dirname, '../../use-cases/user')).removeUser
const fetchUser     = require(path.join(__dirname, '../../use-cases/user')).fetchUser
const fetchUsers    = require(path.join(__dirname, '../../use-cases/user')).fetchUsers
const uploadPicture = require(path.join(__dirname, '../../use-cases/user')).uploadPicture
const fetchPicture  = require(path.join(__dirname, '../../use-cases/user')).fetchPicture


const router = new express.Router()

//Handling a user creation request
router.post('/create', auth, async (req, res) => {
    try {
        const data = req.body
        const user = await addUser(data)

        if(!user)
            throw new Error()

        res.status(201).json({
            success: true,
            message: `Account for ${user.username} has been created`
        })
    } catch (e) {
        //TODO: Error logging
        console.log(e)

        res.status(400).json({
            success: false,
            error: e.message
        })
    }
})

router.post('/developer/create', async (req, res) => {
    try {
        const data = req.body
        const user = await addUser(data)

        if(!user)
            throw new Error()

        res.status(201).json({
            body: `Account for ${user.username} has been created`
        })
    } catch (e) {
        //TODO: Error logging
        console.log(e)

        res.status(400).json({
            error: e.message
        })
    }
})
//Upload user's picture
router.post('/picture', auth, 
upload.single('upload'), 
async (req, res) => {
    try {
        const buffer = req.file ? req.file.buffer : null
        const username = req.query.username

        if(!buffer)
            throw new Error('Upload a photo')
        const picture = await uploadPicture(username, buffer)

        if(!picture)
            throw new Error()

        res.status(201).json({
            success: true,
            asset: picture
        })
    } catch (e) {
        //TODO: Error logging
        console.log(e)

        res.status(400).json({
            success: false,
            error: e.message
        })
    }
})

//Loging a user into the system
router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await loginUser(username, password)
        if(!user)
            throw new Error('Bad request')

        res.status(201)
        .cookie('token', 'Bearer ' + user.token, 
        {expires: new Date(Date.now() + 8760 * 3600000)},
        {path: 'https://localhost:3050/'})
        .json({success: true, message: 'logged in'})
    } catch (e) {
        //TODO: Error logging
        console.log(e)

        res.status(400).json({
            success: false,
            error: e.message
        })
    }
})

//Handling user update request
router.patch('/update', auth, async (req, res) => {
    try {
        const data = req.body
        const username = req.query.username
        const user = await editUser(username, {
            username: data.username,
            password: data.password
        })
        if(!user)
            throw new Error('Bad request')

        res.json({
            success: true,
            asset: user
        })
    } catch (e) {
        //TODO: Error logging
        console.log(e)

        res.status(400).json({
            success: false,
            error: e.message
        })
    }
})

//Removing admin
router.delete('/delete', auth, async (req, res) => {
    try {
        const username = req.query.username
        const user = await removeUser(username)
        if(!user)
            throw new Error('Bad request')

        res.json({
            success: true,
            message: `${user.username}'s account is deleted`
        })
    } catch (e) {
        //TODO: Error logging
        console.log(e)

        res.status(400).json({
            success: false,
            error: e.message
        })
    }
})

//Fetch a user
router.get('/fetch/one', auth, async (req, res) => {
    try {
        const username = req.query.username
        const user = await fetchUser(username)

        res.json({
            success: true,
            asset: user
        })
    } catch (e) {
        //TODO: Error logging
        console.log(e)

        res.status(400).json({
                success: false,
                error: e.message
        })
    }
})

//Fetch users
router.get('/fetch/all', auth, async (req, res) => {
    try {
        const user = await fetchUsers()

        res.json({
            success: true,
            asset: user
        })
    } catch (e) {
        //TODO: Error logging
        console.log(e)

        res.status(400).json({
                success: false,
                error: e.message
        })
    }
})

//Fetch user's picture
/*router.get('/fetch/picture', auth, async (req, res) => {
    try {
        const username = req.query.username
        const picture = await fetchPicture(username)

        res.status(200).json({
            body: picture
        })
    } catch (e) {
        //TODO: Error logging
        console.log(e)

        res.status(400).json({
                error: e.message
        })
    }
})*/

router.get('/photo', auth, async (req, res) => {
    try {
        const picture = await fetchPicture(req.query.username)
        if(!picture)
            throw new Error('Picture not found')
        res.set('Content-Type', 'image/png')
        res.json({
            success: true,
            asset: picture
        })
    } catch (e) {
        //TODO logging
        console.log(e)
        res.status(400).json({
            success: false,
            error: e.message
        })
    }
})

//Single device logout
router.get('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.clearCookie("token", {path: "/"}).send({
            success: true,
            message: `${req.user.username} is logout`
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            error: e.message
        })
    }
})

/*//Multiple device logout
router.get('/admin/me/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []

        await req.user.save()
        res.render('index',{
            layout: './layouts/app',
            appName
        })
    } catch (e) {
        res.status(500).send()
    }
})*/


module.exports = router