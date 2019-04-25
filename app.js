var express = require('express')
var app = express()
var port = 3000
var session = require('express-session')

const Model= require('./models')
const User= Model.Users
const customerRoute= require('./routes/customerRoute')
const session = require('express-session')
const loginRoutes = require('./routes/adminRoutes')

app.use(express.urlencoded({extended:false}))
var sess = {
    secret: 'otobuy',
    cookie: {}, 
    islogin: false,
    userId:0,
    saveUninitialized: true,
    resave: true
  }
app.use(session(sess))

app.use((req, res, next)=>{
    console.log('debug session');
    console.log(req.session)
    next()
})
app.use(express.json())
app.set('view engine','ejs')

app.get('/register',(req,res)=>{
       res.render("register.ejs",{
        error: req.query.errorMsg || null
    })
})

app.post('/register',(req,res) => {
    let user={
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        role: 'customer'
    }
    
    User.create(user)
    .then(user=>{
         req.session.islogin= true
         req.session.userId= user.id
        
         res.redirect('otobuy/customer/home')
    })
    .catch(err=>{
        res.send(err.message)        
    })
 })

 app.use('/otobuy/customer', customerRoute)
 app.use("/otobuy",loginRoutes)

app.listen(port, ()=>{console.log(`Running in port ${port}...... `)})
