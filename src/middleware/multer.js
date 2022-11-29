const multer = require('multer')
//Upload profile picture
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|)$/)){
            return cb(new Error('Upload a picture of jpg or jpeg or png extentsion'))
        }

        cb(undefined, true)
    }
})

module.exports = upload
