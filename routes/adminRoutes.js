const Models = require('../models')
// const Teachers = Models.Teacher
const Admin = Models.User
const express = require('express')
const router = express.Router()

router.get("/login", (req, res) => {
    //cari yang rolenya admin
    //cocokin paswordnya apakah sama atau tidak\
    Admin.findOne({where : {
        role : "admin"
    }})
    .then(theAdmin => {
        res.render("login.ejs", {
            dataAdmin : theAdmin
        })
    })
    .catch(err => {
        res.send(err)
    })
})



module.exports = router