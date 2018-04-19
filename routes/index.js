var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// ROUTE route
router.get("/", function(req, res){
   res.render("landing");
});

///////////////////////////
// Authentication Routes //
///////////////////////////

// NEW - Show form to register new user
router.get("/register", function(req, res){
  res.render("register");
});

//CREATE - Add new user
router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  
  User.register(newUser, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds");
    });
  });
});

// Show Login Form
router.get("/login", function(req, res){
  res.render("login");
});

// Handle Login Logic
router.post("/login", passport.authenticate("local", 
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res){
});

// Logout Route
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged you out.");
   res.redirect("/campgrounds");
});

//////////////////////////////

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect("/login");
}

module.exports = router;