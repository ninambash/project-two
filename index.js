// required packages
// required packages
const ejs = require('ejs')
require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const db = require('./models')
const crypto = require('crypto-js')
const axios = require('axios')

// app config
const app = express()


app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express)
const PORT = process.env.PORT || 8000
// parse request bodies from html forms
app.use(express.urlencoded({ extended: false }))
// tell express to parse incoming cookies
app.use(cookieParser())
//app.use(methodOverride("_method"))
app.use(express.static("public"))

// custom auth middleware that checks the cookies for a user id
// and it finds one, look up the user in the db
// tell all downstream routes about this user
app.use(async (req, res, next) => {
    try {
        if (req.cookies.userId) {
            // decrypt the user id and turn it into a string
            const decryptedId = crypto.AES.decrypt(req.cookies.userId, process.env.SECRET)
            const decryptedString = decryptedId.toString(crypto.enc.Utf8)
            // the user is logged in, lets find them in the db
            const user = await db.user.findByPk(decryptedString)
            // mount the logged in user on the res.locals
            res.locals.user = user
        } else {
            // set the logged in user to be null for conditional rendering
            res.locals.user = null
        }

        // move on the the next middleware/route
        next()
    } catch (err) {
        console.log('error in auth middleware: 🔥🔥🔥🔥', err)
        // explicity set user to null if there is an error
        res.locals.user = null
        next() // go to the next thing
    }
})
// Get localhost 8000 /home

//Get recepe page
//exercise page

// async function fetchData() {
//     try {
//         const options = {
//             headers: {
//                 Authorization: `Bearer ${apikey}`
//             }
//         }

//         const response = await axios.get('https://api.nutritionix.com/v1_1/search', options)
//         console.log(response.data)
//     } catch (err) {
//         console.log(err)
//     }
// }

// fetchData()

// example custom middleware (incoming request logger)
app.use((req, res, next) => {
    // our code goes here
    // console.log('hello from inside of the middleware!')
    console.log(`incoming request: ${req.method} - ${req.url}`)
    // res.locals are a place that we can put data to share with 'downstream routes'
    // res.locals.myData = 'hello I am data'
    // invoke next to tell express to go to the next route or middle
    next()
})

// routes and controllers
app.get('/', (req, res) => {
    console.log(res.locals.user)
   
    res.render('home.ejs', {
        user: res.locals.user
    })
})
app.get('/profile', (req, res) => {
   console.log(res.locals.user)
   
    res.render('profile', {
        user: res.locals.user
    })
})
//app.post('/exerciselog', (req, res) => {
//console.log(res.locals.user)
   
    //res.render('exerciselog/create.ejs', {
       // user: res.locals.user
    //})
//})
//app.update('/exerciselog', (req, res) => {
//console.log(res.locals.user)
   
    //res.render('exerciselog/create.ejs', {
       // user: res.locals.user
    //})
//})
//app.post('/foodloglog', (req, res) => {
//console.log(res.locals.user)
   
    //res.render('foodloglog/create.ejs', {
       // user: res.locals.user
    //})
//})
//app.update('/foodlog', (req, res) => {
//console.log(res.locals.user)
   
    //res.render('exerciselog/create.ejs', {
       // user: res.locals.user
    //})
//})
app.get('/Recipes', (req, res) => {
console.log(res.locals.user)
   
    res.render('/Recipes.ejs', {
        user: res.locals.user
    })
})


app.use('/users', require('./controllers/users'))
app.use("/calories", require ("./controllers/calories"))
//app.use("/user_notes", require ("./controllers/user_notes"))

// listen on a port
app.listen(PORT, () => {
    console.log(`authenticating users on PORT ${PORT} 🔐`)
})