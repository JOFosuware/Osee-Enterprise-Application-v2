const path = require('path')
const usersDb = require(path.join(__dirname, './'))

const {
    findByCredentials,
    findUser,
    findAll,
    insert,
    remove,
    update
} = usersDb
const userData = {
    username: 'jofosuware',
    password: 'Science@1992'
}

describe('Users database', () => {
    beforeAll(async () => {
        await usersDb.remove(userData.username)
    })

    test('Must return user after inserting', async () => {
        const user = await insert(userData)
        expect(user.username).toBe(userData.username)
    })

    test('Must return a user', async () => {
        const user = await findByCredentials(userData.username, userData.password)
        expect(user.username).toBe(userData.username)
    })

    test('Must find a user', async () => {
        const user = await findUser(userData.username)
        expect(user.username).toBe(userData.username)
    })
})

