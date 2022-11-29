const path    = require('path')
const http    = require('http')
const https   = require('https')
const fs      = require('fs')
const express = require('express')
const helmet  = require('helmet')
const cookieParser   = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts')
const userRoute      = require(path.join(__dirname, './controllers/users/user'))
const productRoute   = require(path.join(__dirname, './controllers/product/product'))
const contractRoute  = require(path.join(__dirname, './controllers/contract/client'))
const paymentRoute   = require(path.join(__dirname, './controllers/payment/payment'))
const directSaleRoute         = require(path.join(__dirname, './controllers/one-time/purchase'))

const app      = express()
const port     = process.env.PORT
const viewPath = __dirname + '//views'

app.use(express.json())
app.use(helmet())
app.use(cookieParser())

app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', viewPath)
app.set('layout', './layouts/main')

app.use(express.static(__dirname + '//public'))

process.title = 'Osee EA'

app.get('/', (req, res) => {
    res.send("Welcome to Osee Enterprise API program")
})

app.use('/admin/user', userRoute)
app.use('/admin/product', productRoute)
app.use('/admin/client', contractRoute)
app.use('/admin/client', paymentRoute)
app.use("/admin/direct/sale", directSaleRoute)

// const httpsOptions = {
//     cert: fs.readFileSync(path.join(__dirname, '../ssl', 'certificate.crt')),
//     key: fs.readFileSync(path.join(__dirname, '../ssl', 'private.key'))
// }

//const server = https.createServer(httpsOptions, app)
const server = http.createServer(app)

server.listen(port, () => console.log(`Server is up on port ${port}`))