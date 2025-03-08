//Requiring the env file
require("dotenv").config();
// Require the Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");

//add the port and url for your mongo db connection
const port = process.env.PORT;
const mongoUrl = process.env.mongoUrlKey; //last can be changed to create new databases

//Connect your database
const connectDb = () => {
  mongoose
    .connect(mongoUrl)
    .then(() => {
      console.log("Connected to MongoDatabse...");
    })
    .catch((err) => {
      console.log(err);
    });
};

//Defining the Schema
const blogPostSchema = new mongoose.Schema({});

//Calling the database
connectDb();

//Connecting the port
app.listen(port, () => {
  console.log(`Port is connected...`);
});
