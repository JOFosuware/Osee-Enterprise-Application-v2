const path = require('path')
const jwt = require('jsonwebtoken')
const usersDb = require(path.join(__dirname, '../data-access/user'))

const auth = async (req, res, next) => {
    try {
        if(!req.cookies.token)
            throw new Error('User must be authenticated')

        
        const token = req.cookies.token.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await usersDb.findUser(decoded.username)

        if(!user){
            throw new Error("User not found or Administrator's account must be updated recently")
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        console.log(e)
        res.status(400).send({
            success: false,
            error: e.message
        })
        //res.status(400).render('error')
    }
}

module.exports = auth