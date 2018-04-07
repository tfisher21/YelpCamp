var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Granite Hill",
//     image: "https://pixabay.com/get/e831b20628f2003ed1584d05fb1d4e97e07ee3d21cac104497f3c07bafedb3b9_340.jpg"
//   }, function(err, campground){
//     if (err) {
//       console.log(err);
//     } else
//       console.log("New Campground Created!");
//       console.log(campground);
//   });

app.get("/", function(req, res){
   res.render("landing");
});

app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
      if(err){
        console.log(err);
      } else {
        res.render("campgrounds", {campgrounds: allCampgrounds});
      }
    });
});

app.post("/campgrounds", function(req, res){
  // Get all data from form
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
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

app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});
