const mongoose = require('mongoose');
const uri = 'mongodb+srv://deepesh01:deepeshrathod@cluster0.iua8e.mongodb.net/test?retryWrites=true&w=majority'
const connectDB = async () =>{
    await mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
    console.log("Connected....")
}
module.exports = connectDB;