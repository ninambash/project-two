// required packages
const ejs = require("ejs");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./models");
const crypto = require("crypto-js");
const axios = require("axios");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");

app.engine("ejs", require("ejs").__express);
const PORT = process.env.PORT || 8000;
// parse request bodies from html forms
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// tell express to parse incoming cookies
app.use(cookieParser());



//app.use(methodOverride("_method"))
app.use(express.static("public")); ////////////////works
//app.use(methodOverride("_method"))
app.use(methodOverride("_method"));

// custom auth middleware that checks the cookies for a user id
// and it finds one, look up the user in the db
// tell all downstream routes about this user
app.use(async (req, res, next) => {
  try {
    if (req.cookies.userId) {
      // decrypt the user id and turn it into a string
      const decryptedId = crypto.AES.decrypt(
        req.cookies.userId,
        process.env.SECRET
      );
      const decryptedString = decryptedId.toString(crypto.enc.Utf8);
      // the user is logged in, lets find them in the db
      const user = await db.user.findByPk(decryptedString);
      // mount the logged in user on the res.locals
      res.locals.user = user;
    } else {
      // set the logged in user to be null for conditional rendering
      res.locals.user = null;
    }
    // move on the the next middleware/route
    next();
  } catch (err) {
    console.log("error in auth middleware: 🔥🔥🔥🔥", err);
    // explicity set user to null if there is an error
    res.locals.user = null;
    next(); // go to the next thing
  }
});
//********* GET profile **************************
app.get("/profile", (req, res) => {
  console.log(res.locals.user);

  res.render("profile", {
    user: res.locals.user,
  });
});

 



// //********* GET Home **************************
app.get("/", (req, res) => {
  console.log(res.locals.user);
  res.render("home.ejs", {
    user: res.locals.user,
  });
});

// example custom middleware (incoming request logger)
app.use((req, res, next) => {
  // our code goes here
  // console.log('hello from inside of the middleware!')
  console.log(`incoming request: ${req.method} - ${req.url}`);
  // res.locals are a place that we can put data to share with 'downstream routes'
  // res.locals.myData = 'hello I am data'
  // invoke next to tell express to go to the next route or middle
  next();
});
//********* controllers **************************
app.use("/users", require("./controllers/users"));
app.use("/food", require("./controllers/food"));
app.use("/comments", require("./controllers/comments"));

//********* PORT **************************
app.listen(PORT, () => {
  console.log(`authenticating users on PORT ${PORT} 🔐`);
});
