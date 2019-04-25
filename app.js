var express = require('express')
var app = express()
var port = 3000
const Model= require('./models')
const User= Model.Users
const customerRoute= require('./routes/customerRoute')
const session = require('express-session')
const loginRoutes = require('./routes/adminRoutes')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.set('view engine', 'ejs')

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   }))
var sess = {
    secret : 'otobuy',
    cookcie: {},
    islogin: false,
    items: []
}

app.use(session(sess))


app.use("/otobuy", loginRoutes)

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
    // console.log(req.body.firstName) 
    User.create(user)
    .then(success=>{
        req.session.isLogin = true
        req.session.items = []
        req.session.id = user.id
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
