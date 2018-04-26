var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleware");

/////////////////////
// Comments Routes //
/////////////////////

// NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
  // Lookup Campground using ID
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      // Create New Comment
      Comment.create(req.body.comment, function(err, comment){
        if (err) {
          req.flash("error", "Something went wrong...");
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
          req.flash("success", "Successfully added comment.");
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// EDIT - Show form to edit a comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
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

// DESTROY - Delete specified comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted.");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

/////////////////////////
module.exports = router;