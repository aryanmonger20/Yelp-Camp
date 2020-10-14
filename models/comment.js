var mongoose =require("mongoose")
// schema setup

var commentSchema =new mongoose.Schema({
    text : String,
    author : String
    
  
  })
  
  module.exports = mongoose.model("Comment",commentSchema);