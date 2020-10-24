var express =require("express")
var router=express.Router();
var Campground=require("../models/campgrounds")


//INDEX ROUTE 

router.get("/campgrounds", function(req,res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
             res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
        }   
        });
    
  });
  
  
   
  //create new campground and add to database
  
    router.post("/campgrounds",isLoggedIn, function (req, res){
      // get data from form and add to campgrounds array
      var name= req.body.name;
      var image = req.body.image;
      var desc = req.body.description;
      var author={
        id: req.user_id,
        username:req.user.username 
      }
      var newCampground = {name: name, image: image, description: desc,author:author};
      console.log(req.user);
      
      //create a new campground and save to db
     Campground.create(newCampground,function (err,newlycampground) {
         if (err) {
           console.log(err );
         } else {
           // redirect back to campgrounds page
           console.log(newlycampground)
           res.redirect("/campgrounds"); //
         }
       });
  });
  
  //New: show form to create new campground
    router.get("/campgrounds/new",isLoggedIn,function(req,res){
      res.render("campgrounds/new")
    })
  
    //show page
    router.get("/campgrounds/:id",function(req,res){
      
      Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
     if(err){
       console.log(err)
      }
       else{
         console.log(foundCampground)
        res.render("campgrounds/show",{campground:foundCampground})
       }
     
     
      })
      
      
    })
//edit campground route
router.get("/campgrounds/:id/edit",function(req,res)
{
  Campground.findById(req.params.id,function(err,foundCampground){
    if(err){
      res.redirect("/campgrounds")
    }
    else{
      res.render("campgrounds/edit",{campground:foundCampground})    }
  })
  
})
    
 function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
}
    module.exports = router;