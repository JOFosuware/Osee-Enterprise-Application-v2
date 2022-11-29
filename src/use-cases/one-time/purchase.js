const path = require('path')
const Buy = require(path.join(__dirname, '../../one-time'))
module.exports.makeAddPurchase = function makeAddPurchase({oneTimeDb}) {
    return async function addPurchase(data) {
        let purchase = new Buy()
        //data is an array of object with product property been an array of object
        purchase = purchase.extract(data)

        if(purchase.error) throw new Error(purchase.error)

        purchase = await oneTimeDb.insert(purchase)

        if(!purchase) throw new Error('Bad request')

        return purchase
    }
}

module.exports.makeFetchPurchase = function makeFetchPurchase({oneTimeDb}) {
    return async function fetchPurchase(searchTerm) {
        let purchase = new Buy()

        purchase.phone = searchTerm
        if(purchase.error) throw new Error(purchase.error)

        purchase = await oneTimeDb.find({phone: purchase.phone})
        
        if(!purchase)
            throw new Error('Check your search term')

        return purchase
    }
}

module.exports.makeFetchPurchases = function makeFetchPurchases({oneTimeDb}) {
    return async function fetchPurchases() {
        const purchases = await oneTimeDb.findAll()
        if(!purchases)
            throw new Error('Server error, try again latter')

        return purchases
    }
}

module.exports.makeUpdatePurchase = function makeUpdatePurchase({oneTimeDb}) {
    return async function updatePurchase(data, phone) {
        let purchase = new Buy()
        
        purchase.phone = phone

        if(purchase.error) throw new Error(purchase.error)

        purchase = purchase.extract(data)
    
        if(!purchase) throw new Error(purchase.error)

        //console.log('PurchaseData', purchase)
        purchase = await oneTimeDb.update(purchase, phone)

        if(!purchase)
            throw new Error('Bad request')

        return purchase
    }
}

module.exports.makeSearchClient = function makeSearchClient({oneTimeDb}) {
    return async function searchClient(phone) {
        let search = new Buy()

        search.phone = phone
        if(search.error)
            throw new Error(search.error)

        search = await oneTimeDb.find({phone: search.phone})

        if(!search)
            throw new Error('Client was not found')

        return search
    }
}