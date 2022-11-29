const path = require('path')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const makeUsersDb = require(path.join(__dirname, './users-db'))
const makeModel = require(path.join(__dirname, '../model'))
require(path.join(__dirname, '../index'))

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minlength: 8,
        required: true
    },
    picture: {
        type: Buffer
    },
    tokens: [{
        token: {
            type: String
        }
    }],
},
{ timestamps: true })

const Model = makeModel('Users', userSchema)

const usersDb = makeUsersDb({Model, bcrypt})

module.exports = usersDb