const path = require('path')
const Buy  = require(path.join(__dirname, './index'))

let purchase = new Buy()

const data = [
    {
        clientId: 'just1992',
        client: 'Justice',
        address: 'A101',
        product: [
            {
                serial: 1,
                description: 'Product 1',
                price: 200,
                quantity: 2,
                total: 400,
                purchaseDate: '2021-06-23 12:27:23'
            }
        ]
    }
]

purchase = purchase.extract(data)
console.log(purchase)
console.log(purchase[0].product)