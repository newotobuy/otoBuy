const router= require('express').Router()
const Model= require('../models')
const Users= Model.Users

router.get('/home',(req, res)=>{
    res.render("./customer/home.ejs")
})



module.exports= router