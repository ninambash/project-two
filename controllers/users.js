// create an instance of express routers
const express = require("express");
const db = require("../models");
const router = express.Router();
const crypto = require("crypto-js");
const bcrypt = require("bcrypt");
const axios = require("axios");

// ********** ROUTE GET /users/new -- serves a form to create a new user*****************************
router.get("/new", (req, res) => {
  res.render("users/new.ejs", {
    user: res.locals.user,
  });
});
// ********** ROUTE POST /users--create a new user from the form @ /users/new*****************************
router.post("/", async (req, res) => {
  try {
    // based on the info in the req.body, find or create user
    const [newUser, created] = await db.user.findOrCreate({
      where: {
        email: req.body.email,
      },
    });
    // if the user is found, redirect user to login
    if (!created) {
      console.log("user exists!");
      res.redirect("/users/login?message=Please log in to continue.");
    } else {
      // here we know its a new user
      // hash the supplied password
      const hashedPassword = bcrypt.hashSync(req.body.password, 12);
      // save the user with the new password
      newUser.password = hashedPassword;
      await newUser.save(); // actually save the new password in th db
      // ecrypt the new user's id and convert it to a string
      const encryptedId = crypto.AES.encrypt(
        String(newUser.id),
        process.env.SECRET
      );
      const encryptedIdString = encryptedId.toString();
      // place the encrypted id in a cookie
      res.cookie("userId", encryptedIdString);
      // redirect to user's profile
      res.redirect("/users/profile");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});
// ********** ROUTE GET /users/login -- render a login form that POSTS to /users/login*****************************
router.get("/login", (req, res) => {
  res.render("users/login.ejs", {
    message: req.query.message ? req.query.message : null,
    user: res.locals.user,
  });
});
// ********** ROUTE POST /users/login -- ingest data from form rendered @ GET /users/login*****************************
router.post("/login", async (req, res) => {
  try {
    // look up the user based on their email
    const user = await db.user.findOne({
      where: {
        email: req.body.email,
      },
    });
    console.log(user);
    // boilerplate message if login fails
    const badCredentialMessage = "username or password incorrect";
    if (!user) {
      // if the user isn't found in the db
      res.redirect("/users/login?message=" + badCredentialMessage);
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
      // if the user's supplied password is incorrect
      res.redirect("/users/login?message=" + badCredentialMessage);
    } else {
      // if the user is found and their password matches log them in
      console.log("loggin user in!");
      // ecrypt the new user's id and convert it to a string
      const encryptedId = crypto.AES.encrypt(
        String(user.id),
        process.env.SECRET
      );
      const encryptedIdString = encryptedId.toString();
      // place the encrypted id in a cookie
      res.cookie("userId", encryptedIdString);
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});
// ********** ROUTE GET /users/logout -- clear any cookies and redirect to the homepage*****************************
router.get("/logout", (req, res) => {
  // log the user out by removing the cookie
  // make a get req to /
  res.clearCookie("userId");
  res.redirect("/");
});

// ********** ROUTE GET/ faves READS all favorited foods and displays to the user*****************************
router.get("/faves", async (req, res) => {
  try {
    const faves = await db.fave.findAll({
      where: {
        userId: res.locals.user.id,
      },
      include: [db.comment],
    });
    //console.log('These are the faves', faves)
    res.render("food/faves.ejs", { faves });
  } catch (err) {
    console.log(err);
  }
});
// ********** ROUTE DELETE /food/fave/:id delete a fave food by user if logged in*****************************
router.delete("/faves/:id", async (req, res) => {
  try {
    console.log(db.user.id);
    console.log(req.query.id);
    const favorite = await db.fave.destroy({
      where: {
        foodId: req.params.id,
      },
    });
    //console.log(deletefavorite);

    res.redirect(req.get("referer"));
    // if (food.length > 0) {
    // } else {
    //   res.redirect('/users/faves')
    // }
  } catch (err) {
    console.log(err);
  }
});

// ********** ROUTE PUT /users/ --user to update their profile/password if logged in*****************************
router.put("/:id", async (req, res) => {
  try {
    const changePassword = await db.user.update(
      { password: bcrypt.hashSync(req.body.password, 12) },
      {
        where: {
          email: req.body.email,
        },
      }
    );
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error on UPDATE path 📺");
  }
});
// ********** ROUTE GET /users/profile -- show the user their profile page if logged in*****************************
router.get("/profile", (req, res) => {
  // if the user is not logged in -- they are not allowed to be here
  if (!res.locals.user) {
    res.redirect(
      "/users/login?message=You must authenticate before you are authorized to view this resource!"
    );
  } else {
    res.render("users/profile.ejs", {
      user: res.locals.user,
    });
  }
});

// ********** ROUTE Get /users/workouts --show user workouts if logged in*****************************
router.get("/workout", (req, res) => {
  // if the user is not logged in -- they are not allowed to be here
  if (!res.locals.user) {
    res.redirect(
      "/users/login?message=You must authenticate before you are authorized to view this resource!"
    );
  } else {
    res.render("users/workout.ejs", {
      user: res.locals.user,
    });
  }
});
// ********** ROUTE Get /users/recepes --show user recipes if logged in*****************************
router.get("/recipes", (req, res) => {
  // if the user is not logged in -- they are not allowed to be here
  if (!res.locals.user) {
    res.redirect(
      "/users/login?message=You must authenticate before you are authorized to view this resource!"
    );
  } else {
    res.render("users/recipes.ejs", {
      user: res.locals.user,
    });
  }
});
// ********** ROUTE Get /users/about --show user about section if logged in*****************************
router.get("/about", (req, res) => {
  // if the user is not logged in -- they are not allowed to be here
  if (!res.locals.user) {
    res.redirect(
      "/users/login?message=You must authenticate before you are authorized to view this resource!"
    );
  } else {
    res.render("users/about.ejs", {
      user: res.locals.user,
    });
  }
});
// ********** ROUTE Get /users/settings --show user settings if logged in*****************************
router.get("/settings", (req, res) => {
  // if the user is not logged in -- they are not allowed to be here
  if (!res.locals.user) {
    res.redirect(
      "/users/login?message=You must authenticate before you are authorized to view this resource!"
    );
  } else {
    res.render("users/settings.ejs", {
      user: res.locals.user,
    });
  }
});

// export the router
module.exports = router;
