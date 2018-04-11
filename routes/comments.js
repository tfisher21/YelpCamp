var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

/////////////////////
// Comments Routes //
/////////////////////

// NEW - Show form to create new comment
router.get("/new", isLoggedIn, function(req, res){
  // Find Campground by id
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

// CREATE - Add new comment to database
router.post("/", function(req, res){
  // Lookup Campground using ID
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      // Create New Comment
      Comment.create(req.body.comment, function(err, comment){
        if (err) {
          console.log(err);
        } else {
          // Connect new comment to campground
          campground.comments.push(comment);
          campground.save();
          
          // Redirect back to campgruond show page
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

////////////////
// Middleware //
////////////////

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect("/login");
}

module.exports = router;