const mongoose = require("mongoose");

const mongourl = "mongodb+srv://anshukrmandal7007:0Yzzhj1LHB7W5vws@cluster0.ncvpicf.mongodb.net/";

mongoose.connect(mongourl)
.then( ()=>{console.log("Mongo Db connection successful")})
.catch((err) =>{console.log(err)});