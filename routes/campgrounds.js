var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    middleware  = require("../middleware");

////////////////////////
// Campgrounds Routes //
////////////////////////

// INDEX - Show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
      if(err){
        console.log(err);
      } else {
        res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
      }
    });
});

// CREATE - Add new campground to database
router.post("/", middleware.isLoggedIn, function(req, res){
  // Get all data from form
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var price = req.body.price;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {name: name, image: image, description: desc, price: price, author: author};
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if (err) {
      console.log(err);
    } else {
      // Redirect to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

// NEW - Show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - Show specified campground
router.get("/:id", function(req, res){
  // Find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if (err) {
      console.log(err);
    } else {
      // Render the show template with that campground
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// EDIT - Show edit form for specified campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/edit", {campground: foundCampground});
    }
  });
});

// UPDATE - Update specified campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  // find and update campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY - Delete specified campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//////////////////////////////

module.exports = router;