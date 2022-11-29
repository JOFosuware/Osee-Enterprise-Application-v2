module.exports = class Payments {
    constructor() {

    }

    validate(data) {
        //Data is an object
        const keys = Object.keys(data)
        for(let i = 0; i < keys.length; i++) {
            this[keys[i]] = data[keys[i]]
            if(this.error)
                return 0
        }

        return data
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

    get month() {
        return this._month
    }

    set month(month) {
        if(!month) {
            this._error = 'The month of payment must be provided'
        }else {
            this._month = month
        }
    }

    get paymentDate() {
        return this._date
    }

    set paymentDate(datetime) {
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

    get amountPaid() {
        return this._amountPaid
    }

    set amountPaid(amount) {
        if(!amount){
            this._error = 'Product price must be provided'
        }else{
            amount = typeof amount === 'string' ? parseFloat(amount) : amount
            this._amountPaid = amount
        }
    }

    get clientId() {
        return this._clientId
    }

    set clientId(id) {
        if(!id) {
            this._error = 'Client id must be provided'
        }else {
            this._clientId = id
        }
    }

    get error() {
        return this._error
    }
}