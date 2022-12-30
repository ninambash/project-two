
require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')
const router = require('./users')



//ROUTES

router.get('/test', async (req,res) => {
    const baseUrl = `https://api.nutritionix.com/v1_1/search`
    try {
        const response = await axios.get(baseUrl)
        res.render(response.data)
        console.log(baseUrl)
        // res.send(response.data)      

    } catch (error) {
        console.log('🔥', error)
    }

    })






module.exports = router