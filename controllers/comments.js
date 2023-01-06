// create an instance of express routers
require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const { route } = require("./users");
const db = require("../models");
const router = express.Router();

// ********** ROUTES  TO ADD AND EDIT COMMENTS*****************************

router.get("/comments", async(req,res) => {
  try {
    const comments = await db.comments.findAll({
      
      where:{
            
            userId:res.locals.user.id
      }
    })
    console.log('These are the comments', comments)
    res.render("comments/comments.ejs", { comment });
  } catch (err) {
    console.log(err);
  }
});



//     res.render("comments/comments.ejs", {
//       user: res.locals.user,

//     })

// })

// // ----------------------WORKS-------------------------------
// // POST /comments -> creates a new comment
router.post ("/comments", async (req, res) =>{
    try{
        // creates a new comment
        const newComment = await db.comments.create
        ({
            
            name: req.body.name,
            content: req.body.content,
            userId: res.locals.user.id,
            foodId: req.body.foodId
            
        })
        // associate comment with user 
      // user.a(req.locals.user)
      //await res.locals.user.addFood(food.id)
        console.log(req.body)
        res.redirect("/food/comments")
    }catch(error){
        console.log(error)
        res.send("Oops... you forgot to enter your comments")
    }
})

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
