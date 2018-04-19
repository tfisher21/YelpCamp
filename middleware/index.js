var Campground    = require("../models/campground"),
    Comment       = require("../models/comment"),
    middlewareObj = {};

// Checks to confirm that the correct user is trying to modify the campground
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCampground){
      if (err) {
        console.log(err);
        res.redirect("/campgrounds");
      } else {
        // Does User hold campground
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          res.send("You do not have permission to do that!");
        }
      }
    });
  } else {
    console.log("You must be logged in to do that!");
    res.redirect("back");
  }
}

// Checks to confirm that the correct user is trying to modify the comment
middlewareObj.checkCommentOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if (err) {
        console.log(err);
        res.redirect("/campgrounds");
      } else {
        // Does User hold campground
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.send("You do not have permission to do that!");
        }
      }
    });
  } else {
    console.log("You must be logged in to do that!");
    res.redirect("back");
  }
}

// Checks to confirm that a user is logged in
middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  req.flash("error", "Please Login First!");
  res.redirect("/login");
}

/////////////////////////
module.exports = middlewareObj;