const express = require("express")
const app = express()
const mustache = require("mustache-express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
mongoose.Promise = require("bluebird")
app.engine("mustache", mustache())
app.set("view engine", "mustache")
app.use(bodyParser.urlencoded({extended: false}))

const url = "mongodb://127.0.0.1:27017/vacations"
mongoose.connect(url)
const vacation = require("./models/vacay")
const travelRoutes = require("./routes/travel")

app.use(travelRoutes)


app.listen(3000, function(){
  console.log("The robots are listening!")
})
