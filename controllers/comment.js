// create an instance of express routers
const express = require("express");
const db = require("../models");
const router = express.Router();
const axios = require("axios");

//GET localhost:8000/food/comments
//router.get('/:id/comment', (req, res)=> {
// POST /articles/:id/comment -- CREATES a new comment in the database
router.post("/:id/comment", async (req, res) => {
  console.log(req.body);
  try {
    // look up the article in the database from the :id in the url
    const comment = await db.comment.findOrCreate({
      where: {
        name: req.body.name,
        content: req.body.content,
        userId: res.locals.user.id
      },
    });
    console.log(comment);
    // (optional) make sure the artivle being CRUDED on actually exists
    if (!comment) {
      throw Error(`comment id: ${req.params.id} not found`);
    }

    // redirect to this article's details page again
    res.redirect(`/food/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.status(400).render("main/404");
  }
});
router.get("/comment", async (req, res) => {
  try {
    const comment = await db.comment.findAll({
      include: [db.comments],
    });

    console.log(comment);
    res.render("comment/comment.ejs");
  } catch (error) {
    console.log("🔥", error);
  }
});

module.exports = router;
