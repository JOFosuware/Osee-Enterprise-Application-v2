class User{
     constructor({bcrypt, jwt} = {}){
        this.bcrypt = bcrypt
        this.jwt = jwt
    }

    async hash(password){
        return await this.bcrypt.hash(password, 8)
    }

    get username(){
        return this._username
    }

    set username(name){
        if(!name){
            this._error = 'Username must be provided'
        }else if(parseInt(name)){
            this._error = 'Username cannot begin or be numbers'
        }else{
            this._username = name.toLowerCase()
        }
    }

    get password(){
        return this._password
    }

    set password(pass){
        if(!pass){
            this._error = 'Password must be provided'
        }else if(pass.length < 2){
            this._error = 'Password must be more than 2 characters'
        }else if(pass.toLowerCase().includes('password')){
            this._error = 'Password must not include the word "password"'
        }else{
            this._password = pass
        }
    }

    get picture(){
        return this._picture
    }

    set picture(photo){
        if(!Buffer.isBuffer(photo)){
            this._error = 'Upload an image of type jpg or png or jpeg'
        }else{
            this._picture = photo
        }
        
    }

    get createdOn(){
        return this._createdOn = Date.now()
    }

    get modifiedOn(){
        return this._modifiedOn = Date.now()
    }

    get error(){
        return this._error
    }

    get token(){
        if(!this._username || !process.env.JWT_SECRET) {
            this._error = 'Username or token secret not set'
        }
        return this.jwt.sign({username: this._username}, process.env.JWT_SECRET)
    }
}

module.exports = User