var express =require("express")
var router=express.Router();


//INDEX ROUTE 

router.get("/campgrounds", function(req,res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
             res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }   
        });
    
  });
  
  
   
  //create new campground and add to database
  
    router.post("/campgrounds", function (req, res){
      // get data from form and add to campgrounds array
      var name= req.body.name;
      var image = req.body.image;
      var desc = req.body.description;
      var newCampground = {name: name, image: image, description: desc};
     
      //create a new campground and save to db
     Campground.create(newCampground, (err,campground) => {
         if (err) {
           console.log("error" );
         } else {
           // redirect back to campgrounds page
           console.log("sucessful add")
           res.redirect("/campgrounds"); //
         }
       });
  });
  
  
    router.get("/campgrounds/new",function(req,res){
      res.render("campgrounds/new.ejs")
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
    module.export=router;