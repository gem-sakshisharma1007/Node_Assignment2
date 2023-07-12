//import required package
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')//a middleware to solve cross origin resource sharing
const bodyParser = require('body-parser')
const app = express()
 
//import routes
const routes = require('./routes/appRoutes') 
 
//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/record', routes)
 
//connect to mongodb
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("server is running on port number ", process.env.PORT)
        })
        console.log("MongoDB connected")
    })
    .catch(err => {
        console.log(err)
    })