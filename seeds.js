var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

var data = [
  {
    name: "Restful Cabin",
    image: "https://pixabay.com/get/eb3db30a29fd063ed1584d05fb1d4e97e07ee3d21cac104497f3c378a4e5bcb1_340.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Twilight Lake",
    image: "https://pixabay.com/get/e83db80d2cfd053ed1584d05fb1d4e97e07ee3d21cac104497f3c378a4e5bcb1_340.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Babbling Brook",
    image: "https://pixabay.com/get/eb30b00d21f0053ed1584d05fb1d4e97e07ee3d21cac104497f3c378a4e5bcb1_340.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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