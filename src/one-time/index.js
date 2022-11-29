module.exports = class Buy {
    constructor() {

    }
    //The extract receives an array of objects
    extract(data){
        const purchase = []
        let propData = {}
        for(let i = 0; i < data.length; i++){
            const prop = Object.keys(data[i])
            for(let j = 0; j < prop.length; j++){  
                if(prop[j] === 'products') {
                    const purch = this.extract(data[i][prop[j]])
                    propData[prop[j]] = purch
                    continue
                }
                this[prop[j]] = data[i][prop[j]]
                propData[prop[j]] = data[i][prop[j]]

                if(this.error)
                    return 0
            }

            purchase.push(propData)
            propData = {}
        }

        return purchase
    }

    get phone() {
        return this._phone
    }

    set phone(phone) {
        if(!phone) {
            this._error = 'Client ID must be provided'
        }else {
            if(parseInt(phone) === NaN) this._error = 'Client ID must be numbers only'
            else this._phone = parseInt(phone) 
        }
    }

    get client() {
        return this._client
    }

    set client(name) {
        if(!name) {
            this._error = 'Client name must be provided'
        }else {
            this._client = name
        }
    }

    get serial() {
        return this._serial
    }

    set serial(serial) {
        if(!serial){
            this._error = 'Product serial number must be provided'
        }else{
            serial = typeof serial === "string" ? parseInt(serial, 10) : serial
            this._serial = serial
        }
    }

    get description() {
        return this._description
    }

    set description(item) {
        if(!item){
            this._error = 'The product to be purchased must be provided'
        }else {
            this._description = item
        }
    }

    get quantity() {
        return this._quantity
    }

    set quantity(number) {
        if(!number){
            this._error = 'Product price must be provided'
        }else{
            number = typeof number === 'string' ? parseFloat(number) : number
            this._quantity = number
        }
    }

    get price() {
        return this._price
    }

    set price(amount) {
        if(!amount){
            this._error = 'Product price must be provided'
        }else{
            amount = typeof amount === 'string' ? parseFloat(amount) : amount
            this._price = amount
        }
    }

    get total() {
        return this._total
    }

    set total(amount) {
        if(!amount){
            this._error = 'Product price must be provided'
        }else{
            amount = typeof amount === 'string' ? parseFloat(amount) : amount
            this._total = amount
        }
    }

    get purchaseDate() {
        return this._date
    }

    set purchaseDate(datetime) {
        var d = new Date(datetime)
          
        if (Object.prototype.toString.call(d)
                                === "[object Date]")
        {
            if (isNaN(d.getTime())) { 
                this._error = "Invalid Date."
            }
            else {
                this._date = datetime
            }
        }
    }

    get error() {
        return this._error
    }
}