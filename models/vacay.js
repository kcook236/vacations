// require the stuffs
//do the stuff
//define the schema
//create a model using the schema
//export the model

const mongoose = require("mongoose");

const vacationSchema = new mongoose.Schema({
  location: {type: String, required: true, unique: true},
  days: Number,
  travelMethod: String,
})

const Vacation = mongoose.model("Vacation", vacationSchema)

module.exports = Vacation
