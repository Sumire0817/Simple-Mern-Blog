const express = require("express");
const mongoose = require("mongoose");
// Require Env file
require("dotenv").config();
const blogRoutes = require("./routes/blogRoutes"); // ✅ FIXED Import Path

const app = express();
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
app.use("/api/blog", blogRoutes); // ✅ FIXED Correct Route Usage

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
