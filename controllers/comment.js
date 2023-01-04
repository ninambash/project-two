// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios')


//GET localhost:8000/cocktails/comments
router.get('/comments', (req, res)=> {
    res.render('food/comments.ejs')
})

module.exports = router