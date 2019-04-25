const Models = require('../models')
// const Teachers = Models.Teacher
const Transaction = Models.Transactions
const User = Models.Users
const Item = Models.Items
const Category = Models.Categories
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
        req.session.isLogin = true
        req.session.items = []
        req.session.id = user.id
        if(user){ 
            bcrypt.compare(req.body.password, user.password, function(err, loginOK) {
                if(loginOK === true){
                    if(user.role === 'admin'){
                        res.redirect("/otobuy/admin")
                    }else{
                        res.redirect("/otobuy/customer/home")
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

// router.get("/admin", (req, res) => {
//     Item.findAll({
//         include : [Uuse]
//     })
// })

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

/* ============================= chart =========================== */
//belom bisa 

// router.get("/chart" , (req, res) => {
//     Transaction.findAll({
//         include : [{
//             model : Item, 
//             include : [{
//                 model : Category
//             }]
//         }]
//     })
//     .then(itemwithCategory => {
//         res.send(itemwithCategory)
//     })
//     .catch(err => {
//         res.send(err)
//     })
// })

// router.get("/chart", (req, res) => {
//     Item.findAll({
//         include : Category
//     })
//     .then(ygDibeli => {
//         res.send(ygDibeli)
//     })
//     .catch(err => {
//         res.send(err)
//     })
// })

/* =============================log out =========================== */

// router.get("/logout", (res, req) => {
//     req.session.isLogin = false
//     req.session.items = []
//     req.session.id = user.id
//     .then(logoutOK => {
//         res.redirect("/")
//     })  
//     .catch(err => {
//         res.send(err)
//     })
// })

// router.get("/logout", (res, req) => {
//     res.redirect("/")
// })
router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/otobuy")
    
})

module.exports = router