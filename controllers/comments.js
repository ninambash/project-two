// create an instance of express routers
require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const { route } = require("./users");
const db = require("../models");
const router = express.Router();

// ********** ROUTES  TO ADD AND EDIT COMMENTS*****************************
router.post("/food/:id", async(req,res) => {
    try {
      // const baseUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${search}&pageSize=1&api_key=Z480AVCBPxFVycBJYXnn6rLc1KOrzMc2Dr4qw6MD`;
      // const response = await axios.get(baseUrl)
      // const food = response.data.foods[0] 
     
      await res.locals.user.createComment({
        faveId:req.params.id,
        content:req.body.content,
      })
      res.redirect(`/users/faves`)
    } catch (err) {
      console.log(err);
    }
  });
//   router.get('/comments',async(req,res)=>{
//      try {
//     const comments = await db.comment.findOrCreate({
//         where:{

//                foodId:res.locals.user.foodId
//         }
//     })
//     // Send the comments as a response
//     res.send({ comments });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error retrieving comments");
//   }
//   });
router.get("/comments", async (req, res) => {
    try {
      const comments = await db.comment.findAll({
        
        where:{
              
              userId:req.params.userId
        }
      })
      console.log('These are the comments', comments)
      res.render("food/comments.ejs", { comments });
    } catch (err) {
      console.log(err);
    }
  });

// ********** ROUTE to EDIT COMMENTS*****************************
// PUT  new data into the the comments
router.put ("/comments/:id", (req, res)=>{
  db.comments.update({
    // reassigns 
    userId: res.locals.user.id,
    comments: req.body.comments
  },
  {
  where : {
    // id to find data in db
    id:req.params.id
  }
  })
  res.redirect("/users/faves")
})




























//     res.render("comments/comments.ejs", {
//       user: res.locals.user,

//     })

// })

// // ----------------------WORKS-------------------------------
// POST /comments -> creates a new comment
// router.post ("/:id/comments", async (req, res) =>{
//     try{
//         // creates a new comment
//         const newComment = await db.comments.create
        
//         ({
            
//             name: req.body.name,
//             content: req.body.content,
//             userId: res.locals.user.id,
//             foodId: req.body.foodId
            
//         })
//         // associate comment with user 
//       // user.a(req.locals.user)
//       //await res.locals.user.addFood(food.id)
//       console.log(newComment)
//         console.log(req.body)
//         res.redirect("/food/comments")
//     }catch(error){
//         console.log(error)
//         res.send("Oops... you forgot to enter your comments")
//     }
// })

// ------- WORKS--------------
// display a form to edit comments
// router.get ("/edit/:id", async (req,res)=>{
//   const food = await db.food.findOne({
//     where:{
//         description:req.body.description,
//         userId:res.locals.user.id,
//         foodId:req.body.foodId
//       }
//   })
//   res.render("comment/comment.ejs", {
//     food: food
//   })
// })

// // PUT  new data into the the comments
// router.put ("/:id", (req, res)=>{
//   db.comment.update({
//     // reassigns 
//     userId: res.locals.user.id,
//     commentId: req.params.id,
//     visitDate: req.body.visitDate,
//     food:req.body.food,
//     comments: req.body.comments,
//   },
//   {
//   where : {
//     // id to find data in db
//     id:req.params.id
//   }
//   })
//   res.redirect("/food/comment")
// })


module.exports = router;
