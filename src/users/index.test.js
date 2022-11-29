const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require(path.join(__dirname, './index'))
const input = {bcrypt, jwt}

describe('User module', () => {
    test('It must be hashed', async () => {
        const user = new User(input)
        const password = 'Science@1992'
        let compareTo
        const hashedPassword = await user.hash(password)
        compareTo = await bcrypt.compare(password, hashedPassword)
        expect(compareTo).toBeTruthy()
    })

    test('It must throw error', () => {
        const user = new User(input)
        user.username = null
        user.password = null
        user.picture  = null
        expect(user.error).toBeTruthy()
    })

    test('It must not throw error', () => {
        const user = new User(input)
        user.username = 'jofosuware'
        user.password = 'Science@1992'
        user.picture  = Buffer.from('test')
        expect(user.error).toBeFalsy()
    })

    test('The token must contain username', () => {
        const user = new User(input)
        user.username = 'jofosuware'
        const token = user.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        expect(decoded.username).toBe(user.username)
    })
})