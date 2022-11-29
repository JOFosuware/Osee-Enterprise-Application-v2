const path = require('path')
const Contract = require(path.join(__dirname, '../../contract'))
module.exports.makeAddClient = function makeAddClient({ClientDb}) {
    return async function addClient(data) {
        let contract = new Contract()
        //Extract takes in an object
        const output = contract.extract(data)
        
        if(!output)
            throw new Error(contract.error)

        output['status'] = 'in-progess'
        const client = await ClientDb.insert(output)
        if(!client)
            throw new Error('Bad request')

        return client
    }
}

module.exports.makeUpdateClient = function makeUpdateClient({ClientDb}) {
    return async function updateClient(id, data) {
        let contract = new Contract()
        contract.id = id
        if(contract.error)
            throw new Error(contract.error)

        const output = contract.extract(data)
        if(!output)
            throw new Error(contract.error)

        client = await ClientDb.find(contract.id)

        if(!client)
            throw new Error("Client couldn't be fetched")
            
        const keys = Object.keys(output)
        for(let i = 0; i < keys.length; i++) {
            client[keys[i]] = output[keys[i]]
        }
        
        await client.save()
        return client
    }
}

module.exports.makeFetchClient = function makeFetchClient({ClientDb}) {
    return async function fetchClient(id) {
        const contract = new Contract()
        contract.id = id
        if(contract.error)
            throw new Error(contract.error)

        const client = await ClientDb.find(contract.id)
        if(!client)
            throw new Error('Bad request')

        await client.populate('itemsPurchased').execPopulate()
        await client.populate('monthlyPayment').execPopulate()

        let totalOwed = 0, totalPaid = 0
        client.itemsPurchased.forEach(item => {
            totalOwed += item.price * item.quantity
        })

        client.monthlyPayment.forEach(payment => {
            totalPaid += payment.amountPaid
        })

        const amountToPay = totalOwed / 12
        const amountLeft  = totalOwed - totalPaid

        return {
            client,
            items: client.itemsPurchased,
            payments: client.monthlyPayment,
            summary: {
                totalOwed: totalOwed.toFixed(2),
                totalPaid: totalPaid.toFixed(2),
                monthlyPay: amountToPay.toFixed(2),
                Balance: amountLeft.toFixed(2)
            }
        }
    }
}

module.exports.makeFetchClients = function makeFetchClients({ClientDb}) {
    return async function fetchClients() {
        const client = await ClientDb.findAll()
        if(!client)
            throw new Error()

        return client
    }
}

module.exports.makeClientPicture = function makeClientPicture({ClientDb, sharp}) {
    return async function clientPicture(id, buffer) {
        const contract = new Contract()
        contract.id = id
        contract.image = buffer
        if(contract.error)
            throw new Error(contract.error)

        buffer = await sharp(contract.image).resize({width: 180, height: 220}).png().toBuffer()
        const client = await ClientDb.find(contract.id)
        if(!client)
            throw new Error('User does not exist')
        
        client.cImage = buffer
        await client.save()

        return {
            image: client.cImage
        }
    }
}

module.exports.makeIdPicture = function makeIdPicture({ClientDb, sharp}) {
    return async function idPicture(id, buffer) {
        const contract = new Contract()
        contract.id = id
        contract.image = buffer
        if(contract.error)
            throw new Error(contract.error)

        buffer = await sharp(contract.image).resize({width: 180, height: 220}).png().toBuffer()
        const client = await ClientDb.find(id)
        if(!client)
            throw new Error("Client couldn't be fetched")

        client.idImage = buffer
        await client.save()
        
        return {
            image: client.idImage
        }
    }
}

module.exports.makeWitnessPicture = function makeWitnessPicture({ClientDb, sharp}) {
    return async function witnessPicture(id, buffer) {
        const contract = new Contract()
        contract.id = id
        contract.image = buffer
        if(contract.error)
            throw new Error(contract.error)

        buffer = await sharp(contract.image).resize({width: 180, height: 220}).png().toBuffer()
        const client = await ClientDb.find(contract.id)
        client.wImage = buffer
        await client.save()

        return {
            image: client.wImage
        }
    }
}