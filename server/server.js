const express = require('express')
const app = express()
const authroutes = require('./routes/routes')
require("./database/connection")


app.use(express.json())
app.use('/',authroutes)
app.get('/', (req, res) => {
    res.send('Home page')
})

app.listen(3000, () => {
    console.log("Server running on 3000");
})