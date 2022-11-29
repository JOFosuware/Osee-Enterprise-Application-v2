module.exports = function makePurchaseDb({Model}) {
    const Purchase = Model()
    return Object.freeze({
        find,
        findAll,
        insert,
        update
    })

    async function insert(data) {
        const purchase = await Purchase.create(data)

        if(!purchase)
            return 0

        return purchase
    }

    async function find(key) {

        const purchase = await Purchase.findOne(key)
        if(!purchase)
            return 0

        return purchase
    }

    async function findAll() {
        const purchase = await Purchase.find({})
        if(!purchase)
            return 0

        return purchase
    }

    async function update(data, phone) {
        const clientUpdates = Object.keys(data[0])
        const productUpdates = Object.keys(data[0].products[0])
        const allowedProductUpdates = ['serial', 'description', 'price', 'quantity', 'total', 'purchaseDate']
        const allowedClientUpdates  = ['phone', 'client', 'address', 'products']
        let isValidOperation = productUpdates.every(update => allowedProductUpdates.includes(update))

        if(isValidOperation)
            isValidOperation = clientUpdates.every(update => allowedClientUpdates.includes(update))

        if(!isValidOperation)
            return false

        const purchase = await Purchase.findOne({phone})
        if(!purchase)
            return false

        clientUpdates.forEach(update => purchase[update] = data[0][update])
        await purchase.save()

        return purchase
    }
}