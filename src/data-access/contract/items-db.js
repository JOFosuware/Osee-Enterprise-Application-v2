module.exports = function makeProductDb({ProductModel}) {
    const Product = ProductModel()
    return Object.freeze({
        find,
        findAll,
        insert,
        update
    })

    async function insert(data) {
        const product = await Product.create(data)

        if(!product)
            return 0

        return product
    }

    async function find(serial) {
        const product = await Product.findOne({serial})
        if(!product)
            return 0

        return product
    }

    async function findAll() {
        const product = await Product.find({})
        if(!product)
            return 0

        return product
    }

    async function update(data, serial) {
        const updates = Object.keys(data)
        const allowedUpdates = ['serial', 'description', 'price', 'quantity']
        const isValidOperation = updates.every(update => allowedUpdates.includes(update))

        if(!isValidOperation)
            return false

        const product = await Product.findOne({serial})
        if(!product)
            return false
        updates.forEach(update => product[update] = data[update])
        await product.save()

        return product
    }
}