const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sharp = require('sharp')

const usersDb = require(path.join(__dirname, '../../data-access/user'))
const input = {bcrypt, jwt, usersDb}
const addUser   = require(path.join(__dirname, './user')).makeAddUser(input)
const loginUser = require(path.join(__dirname, './user')).makeLoginUser(input)
const editUser = require(path.join(__dirname, './user')).makeEditUser(input)
const removeUser = require(path.join(__dirname, './user')).makeRemoveUser(input)
const fetchUser = require(path.join(__dirname, './user')).makeFetchUser(input)
const fetchUsers = require(path.join(__dirname, './user')).makeFetchUsers(input)
const uploadPicture = require(path.join(__dirname, './user')).makeUploadPicture({...input, sharp})
const fetchPicture = require(path.join(__dirname, './user')).makeFetchPicture(input)

module.exports.addUser = addUser
module.exports.loginUser = loginUser
module.exports.editUser  = editUser
module.exports.removeUser = removeUser
module.exports.fetchUser  = fetchUser
module.exports.fetchUsers = fetchUsers
module.exports.uploadPicture = uploadPicture
module.exports.fetchPicture  = fetchPicture