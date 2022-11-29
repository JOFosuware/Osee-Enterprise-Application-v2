const path = require('path')
const auth = require(path.join(__dirname, './auth'))
const upload = require(path.join(__dirname, './multer'))


module.exports = {
    auth,
    upload
}