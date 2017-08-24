const express = require("express")
const router = express.Router()
const Vacation = require("../models/vacay")

router.get("/", function(req, res) {
  Vacation.find().then(function(vacations) {
    res.render("index", {
      vacations: vacations
    })
  })
})

router.get("/vacations/new", function(req, res){
  res.render("new")
})

router.post("/vacations", function(req, res){
  const location = req.body.location
  const days = req.body.days
  const travelMethod = req.body.travelMethod
  const vacation = new Vacation()
  vacation.location = location
  vacation.days = days
  vacation.travelMethod = travelMethod
  vacation.save().then(function(city) {
    res.redirect("/")
  })
  .catch(function(error){
    console.log("error", error)
    res.render("new", {
      vacation: vacation,
      errors: error.errors
    })
  })
})

router.post("/vacations/:id", function(req, res){
  Vacation.findOne({_id: req.params.id}).then(function(vacation){
    const location = req.body.location
    const days = req.body.days
    const method = req.body.travelMethod
    vacation.location = location
    vacation.days = days
    vacation.method = method
    vacation.save().then(function(vacation){
      res.redirect("/")
    })
    .catch(function(error){
      res.render("edit", {
        vacation: vacation,
        errors: error.errors
      })
    })
  })
})

router.get("/vacations/:id", function(req,res){
  Vacation.findOne({_id: req.params.id}).then(function(vacation){
    res.render("detail", {
      vacation: vacation
    })
  })
})

router.get("/vacations/:id/edit", function(req,res){
  Vacation.findOne({_id:req.params.id}).then(function(vacation){
    res.render("edit", {
      vacation: vacation
    })
  })
})

router.get("/vacations/:id/delete", function(req, res){
  Vacation.deleteOne({_id: req.params.id}).then(function(){
    res.redirect("/")
  })
})

module.exports = router
