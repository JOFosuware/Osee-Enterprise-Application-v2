const path = require('path')
const Payments = require(path.join(__dirname, '../../payment'))
module.exports.makeAddPayment = function makeAddPayment({paymentDb, ClientDb}) {
    return async function addPayment(data) {
        let payment = new Payments()
        //The data coming should be an object
        data = payment.validate(data)

        if(!data)
            throw new Error(payment.error)

        
        const client = await ClientDb.find(data.clientId, 'status')
        
        if(client && client.status === 'completed')
            return {status: client.status}

        payment = await paymentDb.insert(data)

        if(!payment)
            throw new Error('An error occurred saving')

        return payment
    }
}

module.exports.makeUpdatePayment = function makeUpdatePayment({paymentDb}) {
    return async function updatePayment(data, clientId, month, year) {
        let payment = new Payments()
        //Incoming data must be an object.
        data = payment.validate(data)

        if(!data)
            throw new Error(payment.error)

        payment = await paymentDb.update(data, clientId, month, year)
        
        if(!payment)
            throw new Error('Bad request')

        return payment
    }
}