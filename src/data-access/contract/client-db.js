module.exports = function makeClientDb({ClientModel}) {
    const Client = ClientModel()
    return Object.freeze({
        find,
        findAll,
        insert,
        update
    })

    async function insert(data) {
        const client = await Client.create(data)

        if(!client)
            return 0

        return client
    }

    async function find(clientId, ...fields) {
        if(fields.length === 0)
            fields = ''
        const client = await Client.findOne({clientId}, fields)
        if(!client)
            return 0

        return client
    }


    async function findAll() {
        const client = await Client.find({})
        if(!client)
            return 0

        return client
    }

    async function update(data, clientId) {
        const updates = Object.keys(data)
        const allowedUpdates = ['clientId', 'description', 'price', 'quantity']
        const isValclientIdOperation = updates.every(update => allowedUpdates.includes(update))

        if(!isValclientIdOperation)
            return false

        const client = await Client.findOne({clientId})
        if(!client)
            return false
        updates.forEach(update => client[update] = data[update])
        await client.save()

        return client
    }
}