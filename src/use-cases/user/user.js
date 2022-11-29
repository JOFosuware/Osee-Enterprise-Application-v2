const path = require('path')
const User = require(path.join(__dirname, '../../users'))
module.exports.makeAddUser = function makeAddUser({bcrypt, jwt, usersDb}){
    return async function addUser(userData){
        const user = new User({bcrypt, jwt})
        const {username, password} = userData
        //Set attributes
        user.username = username
        user.password = password

        if(user.error)
            throw new Error(user.error)

        const exists = await usersDb.findUser(user.username)

        if(exists)
            throw new Error('Username is already used, try different one')

        return await usersDb.insert({
            username: user.username,
            password: await user.hash(user.password),
            picture: user.picture,
            createdOn: user.createdOn,
            modifiedOn: user.modifiedOn
        })
    }
}

module.exports.makeEditUser = function makeEditUser({bcrypt, jwt, usersDb}) {
    return async function editUser(current, userData) {
        let user = new User({bcrypt, jwt})
        let {username, password} = userData
        //Set attributes
        user.username = username
        user.password = password
        if(!current)
            throw new Error('Provide the name of the user to be updated ')

        if(user.error)
            throw new Error(user.error)
        password = await user.hash(user.password)
        user = await usersDb.update(current, {
            username: user.username,
            password
        })
        if(!user)
            throw new Error('Bad request')
        return user
    }
}

module.exports.makeFetchPicture = function makeFetchPicture({bcrypt, jwt, usersDb}){
    return async function fetchPicture(username){
        let user = new User({bcrypt, jwt})
        //Set the name attribute
        user.username = username
        if(user.error)
            throw new Error(user.error)

        user = await usersDb.findUser(user.username)
        if(!user)
            throw new Error('User does not exist')

        return user.picture
    }
}

module.exports.makeFetchUser = function makeFetchUser({bcrypt, jwt, usersDb}) {
    return async function fetchUser(username) {
        let user = new User({bcrypt, jwt})
        //Set attributes
        user.username = username
        if(user.error)
            throw new Error(user.error)
        user = await usersDb.findUser(user.username)
        if(!user)
            throw new Error('Bad request')
        return user
    }
}

module.exports.makeFetchUsers = function makeFetchUsers({usersDb}) {
    return async function fetchUsers(){
        const users = await usersDb.findAll()
        if(!users)
            throw new Error('Bad request')
        return users
    } 
}

module.exports.makeLoginUser = function makeLoginUser({jwt, usersDb}) {
    return async function loginUser(username, password){
        //Sanitize and validate user input
        let user = new User({jwt})
        //Set attributes
        user.username = username
        user.password = password
        if(user.error)
            throw new Error(user.error)

        //Grab the token
        const token = user.token

        //Authenticate user
        user = await usersDb.findByCredentials(user.username, user.password)

        if(user === null)
            throw new Error('Password is incorrect')

        if(user.length === 0)
            throw new Error('Bad request, user not found')

        user.tokens = user.tokens.concat({token})
        user.modifiedOn = Date.now()
        await user.save()

        return {
            user,
            token
        }
    }
}

module.exports.makeRemoveUser = function makeRemoveUser({bcrypt, jwt, usersDb}) {
    return async function removeUser(username) {
        let user = new User({bcrypt, jwt})
        //Set attributes
        user.username = username
        if(user.error)
            throw new Error(user.error)

        user = await usersDb.remove(user.username)

        if(!user)
            throw new Error('Bad request')

        return user
    }
}

module.exports.makeUploadPicture = function makeUploadPicture({bcrypt, jwt, sharp, usersDb}){
    return async function uploadPicture(username, buffer){
        let user = new User({bcrypt, jwt})
        user.username = username
        user.picture = buffer
        if(user.error)
            throw new Error(user.error)
        buffer = await sharp(user.picture).resize({width: 180, height: 220}).png().toBuffer()
        user = await usersDb.findUser(user.username)
        if(!user)
            throw new Error('User does not exist')
        user.picture = buffer
        await user.save()

        return {
            picture: user.picture
        }
    }
}