require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const { route } = require("./users");
const db = require("../models");
const router = express.Router();

//********* ROUTES GET to food/search  **************************
router.get("/search", (req, res) => {
  res.render("food/search.ejs", {
    user: res.locals.user,
  });
});
//********* ROUTES GET to food/search for food **************************
router.get("/:id", async (req, res) => {
  try {
    const search = req.params.id;
    //console.log(req.params);
    const baseUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${search}&pageSize=2&api_key=Z480AVCBPxFVycBJYXnn6rLc1KOrzMc2Dr4qw6MD`;

    const response = await axios.get(baseUrl);

    //console.log(response.data);
    res.render("food/details.ejs", { food: response.data.foods[0]});
  } catch (error) {
    console.log("🔥", error);
  }
});
//********* ROUTES POST to render food/search --show results **************************
router.post("/search", async (req, res) => {
  try {
    const search = req.body.search;
    //console.log(search);
    const baseUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${search}&pageSize=4&api_key=Z480AVCBPxFVycBJYXnn6rLc1KOrzMc2Dr4qw6MD`;

    const response = await axios.get(baseUrl);

    let result = await response.data;
    result = await result.foods;
    //console.log(result);
    res.render("food/results.ejs", { results: result });

    // res.send(response.data)
  } catch (error) {
    console.log("🔥", error);
  }
});
//********* ROUTES POST to food/fave  --favorited foods by the user into db when logged in**************************
router.post ("/faves", async (req, res)=>{
  try{
    console.log("faves",req.body)
    // find or create
    const [food] = await db.fave.findOrCreate({
      where:{
        description:req.body.description,
        userId:res.locals.user.id,
        foodId:req.body.foodId
      }
    })
    // associate food  with user favorites
    // food.addUser(req.locals.user)
    await res.locals.user.addFave(food.id)
    // console.log("fav 2 test")
    res.redirect("/users/faves")
  } catch(error) {
    console.log(error)
    res.send("server error")
  }
})

//********* ROUTES GET users/recipes **************************
  router.get("users/Recipes", (req, res) => {
    //console.log(res.locals.user);
  
    res.render("/Recipes.ejs", {
      user: res.locals.user,
    });
  });

module.exports = router;
