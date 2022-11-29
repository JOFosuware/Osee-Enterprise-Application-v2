module.exports = function makeProductDb({Model}) {
    const Product = Model()
    return Object.freeze({
        find,
        findAll,
        insert,
        update,
        remove
    })

    async function insert(data) {
        const product = await Product.create(data)

        if(!product)
            return 0

        return product
    }

    async function find(serial, clientId = "") {
        let product = await Product.find({$and: [{serial}, {clientId}]})

        if(!product.length) {
            product = await Product.findOne({serial})
        }

        return product
    }

    async function findAll() {
        const product = await Product.find({})
        if(!product)
            return 0

        return product
    }

    async function update(data, serial, clientId = "") {
        const updates = Object.keys(data)
        const allowedUpdates = ['serial', 'description', 'price', 'quantity']
        const isValidOperation = updates.every(update => allowedUpdates.includes(update))

        if(!isValidOperation)
            return false

        const product = await find(serial, clientId)
        if(!product)
            return false

        /**
         * This does not work the same for Add Client's Items as adding products.
         * The item's quantity does not add up as intended and as it happen for product's 
         * quantity. Any help from any developer.
         */
        if(!data.serial) {
            product.quantity += parseInt(data.quantity)
            product.price = parseInt(data.price)
        }else {
            updates.forEach(update => product[update] = data[update])
        }
        await product.save()

        return product
    }

    async function remove(serial) {
        let product = await Product.findOne({serial})

        if(!product)
            return 0

        product = await product.remove()
        return product
    }
}