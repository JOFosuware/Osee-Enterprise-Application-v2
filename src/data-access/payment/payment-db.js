module.exports = function makePaymentDb({Model}) {
    const Payment = Model()
    return Object.freeze({
        insert,
        update,
        find
    })

    async function find(clientId, ...fields) {
        if(fields.length === 0)
            fields = ''

        const payments = await Payment.findOne({clientId}, fields).exec()

        if(!payments)
            return 0

        return payments
    }

    async function insert(data) {
        const payment = await Payment.create(data)

        if(!payment)
            return 0

        return payment
    }

    async function update(data, clientId, month, year) {
        const updates = Object.keys(data)
        const allowedUpdates = ['clientId', 'month', 'year', 'amountPaid']
        const isValidOperation = updates.every(update => allowedUpdates.includes(update))

        if(!isValidOperation)
            return false

        const payment = await Payment.findOne({clientId, month, year})
        if(!payment)
            return false
        updates.forEach(update => payment[update] = data[update])
        payment.save()

        return payment
    }
}