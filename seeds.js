var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

var data = [
  {
    name: "Restful Cabin",
    image: "https://images.unsplash.com/photo-1502304104451-b61947b321ca?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fae527b4fdd0c5e6ec4511065f8d7f34&auto=format&fit=crop&w=967&q=80",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Twilight Lake",
    image: "https://images.unsplash.com/photo-1468956398224-6d6f66e22c35?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5d2e4d45d037053be722233b79bd0510&auto=format&fit=crop&w=1055&q=80",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Babbling Brook",
    image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d1c8cc988efddbda8746281871c0c8bf&auto=format&fit=crop&w=959&q=80",
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