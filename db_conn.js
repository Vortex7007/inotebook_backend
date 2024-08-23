const mongoose = require("mongoose");

const mongourl = "mongodb://127.0.0.1:27017/crud";

mongoose.connect(mongourl)
.then( ()=>{console.log("Mongo Db connection successful")})
.catch((err) =>{console.log(err)});