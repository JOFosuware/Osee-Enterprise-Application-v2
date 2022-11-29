const path = require('path')
const Product = require(path.join(__dirname, '../../product'))
module.exports.makeAddProduct = function makeAddProduct({productDb}){
    return async function addProduct(data) {
        let product = new Product()
        let saved = []
        let updated = []
        //the data params take array of objects
        const products = product.extract(data)

        if(!products)
            throw new Error(product.error)
            
        //Separate unsaved products from saved
        product = await filterProduct(products, productDb)

        if(product.unsaved.length) {
            saved = await productDb.insert(product.unsaved)
        }

        /**
         * It doesn't work for adding items into client's database.
         */
        if(product.saved.length) {
            for(let item of product.saved) {
                updated.push(await productDb.update({
                    quantity: item.quantity,
                    price: item.price
                }, item.serial))
            } 
        }

        
        if(!product)
            throw new Error('Product not created')

        return {
            saved,
            updated
        }
    }
}

module.exports.makeFetchProduct = function makeFetchProduct({productDb}) {
    return async function fetchProduct(serial) {
        let product = new Product()
        product.serial = serial
        
        if(product.error)
            throw new Error(product.error)
        product = await productDb.find(product.serial)

        if(!product)
            throw new Error('Product does not exist')
        return product
    }
}

module.exports.makeFetchProducts = function makeFetchProducts({productDb}) {
    return async function fetchProducts() {
        const products = await productDb.findAll()
        return products
    }
}

module.exports.makeRemoveProduct = function makeRemoveProduct({productDb}) {
    return async function removeProduct(serial) {
        let product = new Product()
        product.serial = serial
        if(product.error)
            throw new Error(product.error)
        product = await productDb.remove(product.serial)
        return product        
    }
}

module.exports.makeUpdateProduct = function makeUpdateProduct({productDb}) {
    return async function updateProduct(serial, data) {
        let product = new Product()
        product.serial = serial
        if(product.error)
            throw new Error(product.error)

        product = product.extract(data)
        if(!product)
            throw new Error(product.error)

        if(product.length > 1)
            throw new Error('Only one product can be updated at a time')

        product = {
            serial: product[0].serial,
            description: product[0].description,
            price: product[0].price,
            quantity: product[0].quantity
        }

        product = await productDb.update(product, product.serial)
        
        if(!product)
            throw new Error('Bad request')
        
        return product
    }
}


 async function filterProduct(products, productDb) {
    let saved = []
    let unsaved = []
    for(let i = 0; i < products.length; i++) {
        const clientId = products[i].clientId === undefined ? null : products[i].clientId
        const result  = await productDb.find(products[i].serial, clientId)
        if(result)
            saved = saved.concat(result)
    }

    products = filterOutSaved(products, saved)

    return products
}

function filterOutSaved(products, saved) {
    let unsaved = products.slice()
    let product = []
    for(let i = 0; i < unsaved.length; i++) {
        for(let j = 0; j < saved.length; j++) {
            if(unsaved[i].serial === saved[j].serial) {
               product = product.concat(unsaved.splice(i, 1))
            }
        }
    }

    return {
        saved: product,
        unsaved
    }
}