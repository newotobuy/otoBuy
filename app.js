const express = require('express')
const app = express()
const port = 3000
const Admin = require('./routes/adminRoutes')
const session = require('express-session')

app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended: false }));

app.use("/otobuy", Admin)

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
// app.get('/', function(req, res) {
//     res.send('test')
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))