/*
! nodejs
* server.js (entry point)
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config()


const app = express()

// middlewares
app.use((req, res, next) => {
    console.log(`middleware ${req.path} and ${req.method}`)
    next()
})
app.use(express.json())
app.use(cors())
app.use("/products", router)


mongoose.connect(STRING).then(() => console.log("connection established")).catch((err) => console.log(err))

app.listen(PORT, () => {
    console.log("server is listening to requests")
})
* routes folder
const router = express.Router()

router.post("/postProduct", postProduct)
or
router.route("/auth")
    .get(getUser)
    .post(addUser)

export.module = router

* controllers folder
const mongoose = require("mongoose")
const Model= require("./models/ProductModel")

const getProducts = async (req, res) => {
    try {

    }
    catch (err) {

    }
}
const postProduct
export.module = { getProducts, postProduct... }
* model
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)
* additions
- handleError.js 

- customError.js
*/

/*
! mongoose queries


* errors
*/ 


/*
! authentication
* auth.js (routes)

* authControllers.js


*/ 