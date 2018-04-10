var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

///////////////////////////
// Passport Configuration//
///////////////////////////
app.use(require("express-session")({
  secret: "Kluber is a Cy Young Winner",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//////////////////////////////

app.get("/", function(req, res){
   res.render("landing");
});

////////////////////////
// Campgrounds Routes //
////////////////////////

// INDEX - Show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
      if(err){
        console.log(err);
      } else {
        res.render("campgrounds/index", {campgrounds: allCampgrounds});
      }
    });
});

// CREATE - Add new campground to database
app.post("/campgrounds", function(req, res){
  // Get all data from form
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if (err) {
      console.log(err)
    } else {
      // Redirect to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

// NEW - Show form to create new campground
app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - Show specified campground
app.get("/campgrounds/:id", function(req, res){
  // Find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      // Render the show template with that campground
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

/////////////////////
// Comments Routes //
/////////////////////

// NEW - Show form to create new comment
app.get("/campgrounds/:id/comments/new", function(req, res){
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
app.post("/campgrounds/:id/comments", function(req, res){
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

///////////////////////////
// Authentication Routes //
///////////////////////////

// NEW - Show form to register new user
app.get("/register", function(req, res){
  res.render("register");
});

//CREATE - Add new user
app.post("/register", function(req, res){
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
app.get("/login", function(req, res){
  res.render("login");
});

// Handle Login Logic
app.post("/login", passport.authenticate("local", 
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res){
});


//////////////////////////////
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});
