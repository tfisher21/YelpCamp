var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("landing");
});

app.get("/campgrounds", function(req, res){
   var campgrounds = [
       {name: "Salmon Creek", image: "https://pixabay.com/get/e830b50c2bf5023ed1584d05fb1d4e97e07ee3d21cac104497f2c971a0efb1b0_340.jpg"},
       {name: "Granite Hill", image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144397f8c87eaeefbd_340.jpg"},
       {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104497f2c971a0efb6bf_340.jpg"}
       ];
    
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});
