const express = require('express')
const app = express()
const port = 3000
const Admin = require('./routes/adminRoutes')
app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended: false }));

app.use("/otobuy", Admin)

// app.get('/', function(req, res) {
//     res.send('test')
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))