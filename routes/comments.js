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
          // Add username and id to comments
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // Save new comment
          comment.save();
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

// EDIT - Show form to edit a comment
router.get("/:comment_id/edit", function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }
  });
});

// UPDATE - Update comment in database
router.put("/:comment_id", function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
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