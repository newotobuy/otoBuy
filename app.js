var express = require('express')
var app = express()
var port = 3000
const Model= require('./models')
const User= Model.Users
const customerRoute= require('./routes/customerRoute')

app.use(express.urlencoded({extended:false}))


app.get('/register',(req,res)=>{
    res.render("register.ejs")
})

app.post('/register',(req,res) => {
    let user={
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        role: 'customer'
    }
    console.log(req.body.firstName) 
    User.create(user)
    .then(success=>{
        res.redirect('/customer/home')
    })
    .catch(err=>{
        let error= err.error
        res.redirect(`/register?errorMsg=${error}`)
        //res.send(err.message) 
    })
 })

 app.use('/customer', customerRoute)


app.listen(port, ()=>{console.log(`Running in port ${port}...... `)})