// create an instance of express routers
require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const { route } = require("./users");
const db = require("../models");
const router = express.Router();

// ********** ROUTES  TO ADD AND EDIT COMMENTS*****************************
router.post("/food/:id", async (req, res) => {
  try {
    await res.locals.user.createComment({
      faveId: req.params.id,
      content: req.body.content,
    });
    res.redirect(`/users/faves`);
  } catch (err) {
    console.log(err);
  }
});
//********* ROUTES GET --lets user add comment to the fave food**************************
router.get("/comments", async (req, res) => {
  try {
    const comments = await db.comment.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    console.log("These are the comments", comments);
    res.render("food/comments.ejs", { comments });
  } catch (err) {
    console.log(err);
  }
});



module.exports = router;
