const Models = require('../models')
// const Teachers = Models.Teacher
const User = Models.Users
const Item = Models.Items
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

router.get("/", (req, res) => {
    res.render("login.ejs")
})

/*  ==================================tampilan login============================= */
router.post("/", (req, res) => {
    User.findOne({where : {
        username: req.body.email
    }})
    .then(user => {
        // req.session.isLogin = true
        // req.session.items = []
        // req.session.id = user.id
        if(user){ 
            bcrypt.compare(req.body.password, user.password, function(err, loginOK) {
                if(loginOK === true){
                    if(user.role === 'admin'){
                        res.redirect("/otobuy/admin")
                    }else{
                        res.redirect("/otobuy/customer")
                    }
                }else{
                    res.send('salah masuk')
                }
            })
        }
    })
    .catch(err => {
        res.send(err)
    })
})

/* ==============================list item (Admin) =============================== */

router.get("/admin", (req, res) => {
    Item.findAll()
    .then(theList => {
        res.render("listBarang.ejs", {
            dataList : theList
        })
    })
    .catch(err => {
        res.send(err)
    })
})

/* ================================update=================================== */

router.get("/update/:id", (req, res) => {
    let id = req.params.id
    Item.findByPk(id)
    .then(foundData => {
        res.render("update.ejs", {
            foundToUpdate : foundData
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post("/update/:id", (req, res) => {
    let itemUpdate = {
        item_name : req.body.item_name,
        price : req.body.item_price,
        stock : req.body.item_stock
    }
    let id = req.params.id

    Item.update(itemUpdate, {
        where : {id : id}
    })
    .then(updated => {
        res.redirect("/otobuy/admin")
    })
    .catch(err => {
        res.send(err)
    })
})

/* ================================delete===================================== */

router.get("/delete/:id", (req, res) => {
    let id = req.params.id
    Item.destroy({
        where : {
            id : id
        }
    })
    .then(deleted => {
        res.redirect("/otobuy/admin")
    })
    .catch(err => {
        res.send(err)
    })
})

/* =====================================add===================================== */
router.get("/add", (req, res) => {
    res.render("addBarang.ejs")
})

router.post ("/add", (req, res) => {
    let input = {
        item_name : req.body.item_name,
        price : req.body.item_price,
        stock : req.body.item_stock
    }

    Item.create(input)
    .then(insertItem => {
        res.redirect("/otobuy/admin")
    })
})


module.exports = router