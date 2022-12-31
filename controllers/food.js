
require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')
const router = express.Router()



//ROUTES
router.get('/search',(req,res) =>{
    res.render('food/search.ejs',{
        user:res.locals.user
    })
})
router.post('/search', async (req,res) => {
    const search = req.body.search
    const baseUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${search}&pageSize=2&api_key=Z480AVCBPxFVycBJYXnn6rLc1KOrzMc2Dr4qw6MD`
    try {
        const response = await axios.get(baseUrl)
            
        let result = await response.data
        res.render('food/results.ejs', { results: result })
      
        // res.send(response.data)      

    } catch (error) {
        console.log('🔥', error)
    }
   

    })






module.exports = router