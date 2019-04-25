const router= require('express').Router()
const Model= require('../models')
const getFormatDate= require('../helpers/getFormatDate')
const getFormatRupiah= require('../helpers/getFormatRupiah')
const User= Model.Users
const Items= Model.Items
const Transaction= Model.Transactions
const Categories= Model.Categories

router.get('/home',(req, res)=>{
    console.log(req.body,'====')
    Items.findAll({
        include: [Categories],
        // where:{
        //     item_price :{
        //         $Between:[Number(req.body.minPrice), Number(req.body.maxPrice)]
        //     }
        // }
    })
    .then(items=>{
        
        res.render("./customer/home.ejs",{
            items:items,
            categories: items.Category,
            getFormatRupiah:getFormatRupiah
        })
    })
    .catch(err=>{
        res.send(err.message)
    })
    
})

router.post('/home',(req, res)=>{
    let itemId = req.body['item_id[]']
    let itemPrice= req.body['item_price[]']
    let itemCategoryId= req.body['item_categories[]']
    let amount= req.body['amount[]']
    let currentUserId= req.session.userId
    let validate= itemId.length
      
    if(validate==0){
        res.send(`You haven't input any item `)
    }else{
        for(let i=0; i<validate; i++){
            let newTransaction={
                amount: Number(amount[i]),
                total_price: (Number(amount[i]) * itemPrice[i]),
                user_id: currentUserId,
                item_id: itemId[i]
            }
            Items.findByPk(itemId[i])
            .then(items=>{
                if(items.stock < Number(amount[i])){
                    res.send(`Insufficient stock of item ${items.item_name}`)
                }else{
                    Transaction.create(newTransaction)
                    .then(success=>{
                        res.render("./customer/successTransaction.ejs")
                    })
                    .catch(err=>{
                        res.send(err.message)
                    })
                }
            })
            .catch(err=>{
                res.send(err.message)
            })            
        }
    }    
})

router.get('/history',(req, res)=>{
    let currentUser= req.session.userId
    if(currentUser== undefined){
        res.send('No Session Anymore')
    }else{
        User.findByPk(currentUser,{
            include: {
                model: Transaction
            }
        })
        .then(data=>{
            res.render("./customer/history.ejs",{
                transactions: data.Transactions,
                getFormatDate: getFormatDate,
                getFormatRupiah:getFormatRupiah
            })
        })
        .catch(err=>{
            res.send(err)
        })    }    
})




module.exports= router