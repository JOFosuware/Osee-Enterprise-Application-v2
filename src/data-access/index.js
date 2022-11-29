const mongoose = require('mongoose')
const mongodbUri = process.env.MONGO_URI

mongoose.connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(e => console.log(e.message))