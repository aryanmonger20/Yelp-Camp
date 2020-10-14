
var express = require("express");
var app =express();
var mongoose =require("mongoose");
var bodyParser= require("body-parser");
var passport =require("passport")
var LocalStrategy=require("passport-local")

var User =require("./models/user")
var Campground=require("./models/campgrounds");
var seedDB = require("./seeds");
var Comment=require("./models/comment")
 var commentRoutes=require("./routes/comments")
 var campgroundRoutes=require("./routes/campgrounds ")
 seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: true})

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
const port = 3000

//Passport Configuration

app.use(require("express-session")({
  secret:"watch me burn it down",
  resave :false,
  saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  res.locals.currentUser=req.user;
  next();
})

app.listen(port, () => {
    console.log(`Server has started at:${port}`)
  })