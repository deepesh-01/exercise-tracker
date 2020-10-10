const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./connection')
// routes 
const exercisesRouter = require('./routes/exerciseRouter');
const usersRouter = require('./routes/usersRouter');
// dotenv
require('dotenv').config();
// initialization
const app = express();
const port = process.env.PORT || 5000;
//user cors
app.use(cors());
app.use(express.json());
//connect to atlas
// const uri = process.env.ATLAS_URI;
const uri = "mongodb+srv://deepesh01:deepeshrathod@cluster0.iua8e.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected...")
})
.catch(err => console.log(err))
// connectDB();
//api start
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});