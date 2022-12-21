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

router.get('/login', (req, res) =>{
    res.render('users/login.ejs'),{
        message: req.query.message ? req.querry.message : null

    }
})
router.post('/login', async (req, res) =>{
    try{
        const user = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        const badCredentialMessage = 'username or password incorrect'
        if(!user){
            res.redirect('/users/login?message=' + badCredentialMessage)

        }else if (user.password !== req.BODY.password) {
            res.redirect('/users/login=' + badCredentialMessage)

        }else{
            console.log('loggin user in')
            res.cookie('userId', user.id)
            res.redirect('/')
        }
        

    }catch(err) {
        console.log(err)
        res.status(500).send('server error')

    }
    
})



router.get('/logout', (req, res) =>{
    res.clearCookie('userId')
    res.redirect('/')
    
})

//export the router
module.exports = router