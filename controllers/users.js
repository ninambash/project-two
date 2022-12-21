////create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()

///mount our routes on the router


router.get('/new', (req,res)=>{
    res.render('/user/new.ejs')
})

router.post('/post', async (req, res) =>{
    try{
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                email: req.body.email
            },
            defaults: {
                password: req.body.password
            }
        })
        res.cookie('userId', newUser.id)
        res.redirect('/')

    }catch(err){
        console.log(err)
        res.status(500).send('server error')

    }
})
//export the router
module.exports = router