require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const { route } = require("./users");
const db = require("../models");
const router = express.Router();

//ROUTES

router.get("/search", (req, res) => {
  res.render("food/search.ejs", {
    user: res.locals.user,
  });
});
router.get("/:id", async (req, res) => {
  try {
    const search = req.params.id;
    console.log(req.params);
    const baseUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${search}&pageSize=1&api_key=Z480AVCBPxFVycBJYXnn6rLc1KOrzMc2Dr4qw6MD`;

    const response = await axios.get(baseUrl);

    console.log(response.data);
    res.render("food/details.ejs", { food: response.data.foods[0] });
  } catch (error) {
    console.log("🔥", error);
  }
});
//POST route to search for food////
router.post("/search", async (req, res) => {
  try {
    const search = req.body.search;
    console.log(search);
    const baseUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${search}&pageSize=2&api_key=Z480AVCBPxFVycBJYXnn6rLc1KOrzMc2Dr4qw6MD`;

    const response = await axios.get(baseUrl);

    let result = await response.data;
    result = await result.foods;
    console.log(result);
    res.render("food/results.ejs", { results: result });

    // res.send(response.data)
  } catch (error) {
    console.log("🔥", error);
  }
});

router.get("users/Recipes", (req, res) => {
  console.log(res.locals.user);

  res.render("/Recipes.ejs", {
    user: res.locals.user,
  });
});
//////////////////Posting on fave route///////////////
// POST localhost:8000/cocktails/favorites POST favorited cocktail by user into db
router.get("/fave", async (req, res) => {
  try {
    const user = await db.user.findByPk(res.locals.user.id);
    const favorite = await db.food.findOrCreate({
      where: {
        name: req.body.name
        
        
      }
    });
    res.redirect(req.get("referer"));
  } catch (err) {
    console.log(err);
  }
});

// GET localhost:8000/cocktails/favorites see all favorited cocktails
router.post("/fave", async (req, res) => {
  try {
    const favorites = await db.food.findAll({
      include: [
        {
          model: db.comment,
          as: "comments",
        },
      ],
    });
     console.log(favorites[0].comments[0].dataValues.comment);
    console.log("\n" + favorites[0].dataValues.ingredients + "\n");
    

    // console.log(ingredients.split(","));
    res.render("food/fave.ejs", { favorites });
  } catch (err) {
    console.log(err);
  }
});
// router.post("/fave", async (req, res) => {
//   try {
//     console.log("fave", req.body);
//     // find or create
//     const [food] = await db.food.findOrCreate({
//       where: {
//         description: req.body.description,
//       },
//     });
//     // associate food  with user favorites
//     // pub.addUser(req.locals.user)
//     await res.locals.user.addfood();
//     //await db.food.addfood(food)
//     // console.log("fav 2 test")
//     res.render("food/fave.ejs", { food: response.data.foods[0] });
//     //res.redirect("/food/fave.ejs")
//   } catch (error) {
//     console.log(error);
//     res.send("server error");
//   }
// });
// // router.post("/comment", async (req, res) => {
//   // TODO: Get form data and add a new record to DB
//   try {
//     // create a new fave in the db
//     await db.comment.findOrCreate({
//       where: {
//         name: req.body.name,
//         content: req.body.content,
//       },
//     });
//     // redirect to /faves to show the user their faves
//   } catch (err) {
//     console.log(err);
//   }
//   res.redirect("/comment");
// });

///update
// PUT /comment/:id -- UPDATE a food
// router.put('/:id', async (req, res) => {
//     try {
//         // assume that the req.body has name, mass and type
//         // update(what to update, { where: { what to search for }})
//         await db.planet.update(req.body, {
//             where: {
//                 id: req.params.id
//             }
//         })
//         //redirect to show this specifc planet
//         res.redirect(`/planets/${req.params.id}`)
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({
//             message: 'Server Error '
//         })
//     }
// })
// // DELETE /comment/:id -- DESTROY food
// router.delete('/:id', async (req, res) => {
//     try {
//         await db.comment.destroy({
//             where: {
//                 id: req.params.id
//             }
//         })
//         console.log('hello')
//         res.redirect('/planets')
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({
//             message: 'Server Error //////'
//         })
//     }
// })

///
// -------------------WORKS---------------------------
// DELETE FROM FAVORITES
// router.delete('/:pubId', (req,res)=>{
//   db.pub.destroy({
//     where: {id: req.params.pubId}
//   })
//   .then( ()=>{
//     res.redirect("/users/favs")
//   })
// })

module.exports = router;
