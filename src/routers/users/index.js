const path = require('path')
const express = require('express')
const {auth, upload} = require(path.join(__dirname, '../../middleware'))
const makeCallback = require(path.join(__dirname, '../../express-callback'))
// const {
//     postUser, 
//     postLogin, 
//     patchUser, 
//     deleteUser,
//     getUser,
//     getUsers,
//     postPicture,
//     getPicture
// } = require(path.join(__dirname, '../../controllers/users'))

const postUser = require(path.join(__dirname, '../../controllers/users')).postUser
const postLogin = require(path.join(__dirname, '../../controllers/users')).postLogin
const patchUser = require(path.join(__dirname, '../../controllers/users')).patchUser
const deleteUser = require(path.join(__dirname, '../../controllers/users')).deleteUser
const getUser    = require(path.join(__dirname, '../../controllers/users')).getUser
const getUsers   = require(path.join(__dirname, '../../controllers/users')).getUsers
const postPicture = require(path.join(__dirname, '../../controllers/users')).postPicture
const getPicture  = require(path.join(__dirname, '../../controllers/users')).getPicture

// const {
//     loginUser,
//     fetchPicture
// } = require(path.join(__dirname, '../../use-cases/user'))

const loginUser = require(path.join(__dirname, '../../use-cases/user')).loginUser
const fetchPicture = require(path.join(__dirname, '../../use-cases/user')).fetchPicture

const appName = 'Osee Enterprise Application'

const router = new express.Router()

router.get('/', (req, res) => {
    res.render('index',{
        layout: './layouts/app',
        appName
    })
})

router.get('/admin/me', auth, (req, res) => {
    res.render('panel', {
        layout: './layouts/main',
        appName,
        username: req.user.username
    })
})

router.get('/admin/me/photo/:username', async (req, res) => {
    try {
        const picture = await fetchPicture(req.params.username)
        if(!picture)
            throw new Error('Picture not found')
        res.set('Content-Type', 'image/png')
        res.send(picture)
    } catch (e) {
        //TODO logging
        console.log(e)
        res.status(400).send({
            message: e.message
        })
    }
})

//Single device logout
router.get('/admin/me/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send({
            success: true 
        })
    } catch (e) {
        res.status(500).send({
            success: false,
            message: e.message
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

//Handling a user creation request
router.post('/admin/user/create', makeCallback(postUser))
//Loging a user into the system
router.post('/admin/user/login', makeCallback(postLogin))
//Handling user update request
router.patch('/admin/user/update', auth, makeCallback(patchUser))
//Removing admin
router.delete('/admin/user/delete', auth, makeCallback(deleteUser))
//Fetch a user
router.get('/admin/user/one', auth, makeCallback(getUser))
//Fetch users
router.get('/admin/user/all', auth, makeCallback(getUsers))
//Upload user's picture
router.post('/admin/user/upload', auth, upload.single('upload'), makeCallback(postPicture))
//Fetch user's picture
router.get('/admin/user/picture', auth, makeCallback(getPicture))


module.exports = router