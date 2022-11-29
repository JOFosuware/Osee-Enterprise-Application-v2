module.exports = function makeUsersDb({Model, bcrypt}){
    return Object.freeze({
        findByCredentials,
        findUser,
        findAll,
        insert,
        remove,
        update

    })

    async function findByCredentials(username, password){
        const User = Model()
        const user = await User.findOne({username})

        if(!user)
            return []

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch)
            return null

        return user
    }

    async function findUser(username){
        const User = Model()
        const user = await User.findOne({username})

        if(!user)
            return false

        return user
    }

    async function findAll(){
        const User = Model()
        const user = await User.find({})

        if(!user)
            return false

        return user
    }

    async function insert(userData){
        const User = Model()
        const user = await new User(userData)
        await user.save()

        return user
    }

    async function remove(username){
        const User = Model()
        let user = await User.findOne({username})

        if(!user)
            return false

        user = await user.remove()
        return user
    }

    async function update(username, userData){
        const updates = Object.keys(userData)
        const allowedUpdates = ['username', 'password', 'profilePic', 'tokens', 'createdOn', 'modifiedOn']
        const isValidOperation = updates.every(update => allowedUpdates.includes(update))

        if(!isValidOperation)
            return false
        const User = Model()
        const user = await User.findOne({username})
        if(!user)
            return false
        updates.forEach(update => user[update] = userData[update])
        await user.save()

        return user

    }
}