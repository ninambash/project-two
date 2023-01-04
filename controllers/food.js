
require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')
const { route } = require('./users')
const router = express.Router()



//ROUTES

router.get('/search',(req,res) =>{
    res.render('food/search.ejs',{
        user:res.locals.user
    })
})
router.get('/:id', async(req,res) =>{
    try {
        const search = req.query.id
        console.log(search)
        const baseUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${search}&pageSize=2&api_key=Z480AVCBPxFVycBJYXnn6rLc1KOrzMc2Dr4qw6MD`
  
        const response = await axios.get(baseUrl)
            
        let food = await response.data
        food = await food.foods
        console.log(food);
        res.render('food/details.ejs', { food: food })
        
    } catch (error) {
        console.log('🔥', error)
        
    }
   
})
//
router.post('/search', async (req,res) => {
    
    try {
        const search = req.body.search
        console.log(search)
        const baseUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${search}&pageSize=2&api_key=Z480AVCBPxFVycBJYXnn6rLc1KOrzMc2Dr4qw6MD`
  
        const response = await axios.get(baseUrl)
            
        let result = await response.data
        result = await result.foods
        console.log(result);
        res.render('food/results.ejs', { results: result })
      
        // res.send(response.data)      

    } catch (error) {
        console.log('🔥', error)
    }
   

    })
    

    router.get("/comment", (req, res) => {
        res.render("food/comments.ejs", {
          user: res.locals.user,
        });
      });




module.exports = router