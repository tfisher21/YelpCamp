var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

var data = [
  {
    name: "Restful Cabin",
    image: "https://pixabay.com/get/eb3db30a29fd063ed1584d05fb1d4e97e07ee3d21cac104497f3c378a4e5bcb1_340.jpg",
    description: "Rest and relax at this isolated cabin"
  },
  {
    name: "Twilight Lake",
    image: "https://pixabay.com/get/e83db80d2cfd053ed1584d05fb1d4e97e07ee3d21cac104497f3c378a4e5bcb1_340.jpg",
    description: "Enjoy a beautiful view with a rare view of stars"
  },
  {
    name: "Babbling Brook",
    image: "https://pixabay.com/get/eb30b00d21f0053ed1584d05fb1d4e97e07ee3d21cac104497f3c378a4e5bcb1_340.jpg",
    description: "The consistant babbling of the nearby brook creates a tranquil campsite"
  }
];

function seedDB(){
  // Remove all campgrounds
  Campground.remove({}, function(err){
    if (err) {
      console.log(err);
    }
    console.log("Removed all campgrounds!");
    Comment.remove({}, function(err){
      if (err) {
        console.log(err);
      } else {
        data.forEach(function(seed){
          // Add a few campgrounds
          Campground.create(seed, function(err, campground){
            if (err) {
              console.log(err);
            } else {
              console.log("Added a campground!");
              // Create a comment
              Comment.create(
                {
                  text: "This place is great, but I wish there was internet.",
                  author: "Homer"
                }, function(err, comment) {
                  if (err) {
                    console.log(err);
                  } else {
                    campground.comments.push(comment);
                    campground.save();
                    console.log("Created new comment.");
                  }
              });
            }
          });
        });
      }
    })
  });
  
  // Add a few comments
  
}

module.exports = seedDB;