module.exports = class Product{
    constructor(){
        
    }

    property(data, prop, index) {
        if(!Array.isArray(data) || data.length < 1)
            return 0
        return data[index][prop]
    }

    extract(data){
        const prop = ['serial', 'description', 'price', 'quantity']
        const products = []
        let propData = {}

        for(let i = 0; i < data.length; i++){
            if(data[i]['clientId']){
                propData['clientId'] = data[i]['clientId']
                prop.unshift('clientId')
            }
            for(let j = 0; j < prop.length; j++){    
                this[prop[j]] = data[i][prop[j]]
                propData[prop[j]] = data[i][prop[j]]

                if(this.error)
                    return 0
            }

            products.push(propData)
            propData = {}
        }

        return products
    }

    get serial(){
        return this._serial
    }

    set serial(serial){
        if(!serial){
            this._error = 'Product serial number must be provided'
        }else{
            this._serial = serial
        }
    }

    get description(){
        return this._description
    }

    set description(desc){
        if(!desc){
            this._error = 'Product description must be provided'
        }else if(parseInt(desc)){
            this._error = 'Product description cannot begin or be a number'
        }else{
            this._description = desc
        }
    }

    get price(){
        return this._price
    }

    set price(amount){
        if(!amount){
            this._error = 'Product price must be provided'
        }else{
            amount = typeof amount === 'string' ? parseFloat(amount) : amount
            this._price = amount
        }
    }

    get quantity(){
        return this._quantity
    }

    set quantity(number){
        if(!number){
            this._error = 'The quantity of product must be provided'
        }else{
            number = typeof number === 'string' ? parseInt(number) : number
            this._quantity = number
        }
    }

    get error(){
        return this._error
    }
}