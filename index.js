///require package 
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
app.set('view engine', 'ejs')

//rotes
app.get('/', (req,res) => {
    res.render('home.ejs')
})
//// listen
app.listen(PORT,()=>{

    console.log('authenticating users on port ${PORT}')
})