var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

////////////
// ROUTES //
////////////

var campgroundRoutes  = require("./routes/campgrounds"),
    commentsRoutes    = require("./routes/comments"),
    indexRoutes       = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// seedDB();  // Seed the Database

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

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);
app.use("/campgrounds", campgroundRoutes);

//////////////////////////////
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});
