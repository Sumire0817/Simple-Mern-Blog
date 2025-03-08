// Require Env file
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoutes = require("./routes/blogRoutes");

app.use(cors());
app.use(express.json());

const port = process.env.PORT;
const mongoUrl = process.env.mongoUrlKey;

const connectDb = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log("MongoDB Failed to Connect...");
    process.exit(1);
  }
};
connectDb();

// Use Routes
app.use("/api/blog", blogRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
