class Client {
    constructor() {

    }

    get id() {
        return this._id
    }

    set id(id) {
        if(!id) {
            this._error = 'Client ID must be provided'
        }else {
            this._id = id
        }
    }

    get name() {
        return this._name
    }

    set name(name) {
        if(!name) {
            this._error = '"Client name must be provided'
        }else{
            this._name = name
        }
    }

    get gender() {
        return this._gender
    }

    set gender(type) {
        if(!type) {
            this._error = "Client's gender must be provided"
        }else {
            this._gender = type
        }
    }

    get image() {
        return this._image
    }

    set image(photo) {
        if(!Buffer.isBuffer(photo)) {
            this._error = 'Upload a photo'
        }else {
            this._image = photo
        }
    }

    get number() {
        return this._number
    }

    set number(tel) {
        if(!tel) {
            this._error = 'Client phone number must be provided'
        }else {
            tel = typeof tel === 'string' ? parseInt(tel) : tel
            if(!tel) {
                this._error = 'Enter a digit not letters'
            }else {
                this._number = tel
            }
        }
    }

    get residence() {
        return this._residence
    }

    set residence(place) {
        if(!place) {
            this._error = 'Client residence must be provided'
        }else {
            this._residence = place
        }
    }

    get landmark() {
        return this._landmark
    }

    set landmark(amark) {
        if(!amark) {
            this._error = 'Client landmark must be provided'
        }else {
            this._landmark = amark
        }
    }

    get location() {
        return this._location
    }

    set location(area) {
        if(!area) {
            this._error = 'Client location must be provided'
        }else {
            this._location = area
        }
    }

    get idtype() {
        return this._idtype 
    }

    set idtype(type) {
        if(!type) {
            this._error = 'Client id type must be provided'
        }else {
            this._idtype = type
        }
    }

    get error() {
        return this._error
    }
}

class Contract extends Client {
    constructor() {
        super()
    }

    //Takes an object
    extract(data) {
        let dataMap = {
            clientId: 'id',
            cName: 'name',
            cGender: 'gender',
            cNumber: 'number',
            cResidence: 'residence',
            cLandmark: 'landmark',
            cLocation: 'location',
            wName: 'name',
            wGender: 'gender',
            wNumber: 'number'
        }
    
        let dataKeys = Object.keys(data)
        const output = {}
        for(let i = 0; i < dataKeys.length; i++) {
            this[dataMap[dataKeys[i]]] = data[dataKeys[i]]
            if(this.error)
                return 0
            output[dataKeys[i]] = this[dataMap[dataKeys[i]]]
        }
        return output
    }

    get total() {
        return this._total
    }

    set total(amount) {
        if(!amount) {
            this._error = 'The total price of product purchased must be provided'
        }else {
            amount = typeof amount === 'string' ? parseFloat(amount) : amount
            if(!amount) {
                this._error = 'Enter a digit not letters'
            }else {
                this._total = amount
            }
        }
    }

    get deposit() {
        return this._deposit
    }

    set deposit(amount) {
        if(!amount) {
            this._error = 'The amount of money deposited must be provided'
        }else {
            amount = typeof amount === 'string' ? parseFloat(amount) : amount
            if(!amount) {
                this._error = 'Enter a digit not letters'
            }else {
                this._total = amount
            }
        }
    }

    get balance() {
        return this._balance
    }

    set balance(amount) {
        if(!amount) {
            this._error = 'The amount of money deposited must be provided'
        }else {
            amount = typeof amount === 'string' ? parseFloat(amount) : amount
            if(!amount) {
                this._error = 'Enter a digit not letters'
            }else {
                this._balance = amount
            }
        }
    }

    get date() {
        return this._date
    }

    set date(datetime) {
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

    get status() {
        return this._status
    }

    set status(stat) {
        if(!stat) {
            this._error = 'Contract status is required'
        }else {
            this._status = stat
        }
    }

    get condition() {
        return this._condition 
    }

    set condition(statement) {
        if(!statement) {
            this._error = 'Statement of termination must be provided'
        }else {
            this._condition = statement
        }
    }
}

module.exports = Contract