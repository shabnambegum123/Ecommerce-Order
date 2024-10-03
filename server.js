const express = require("express");
let app = express();
const bodyparser = require("body-parser")
app.use(bodyparser.json())
const router = require("./Router/index");
app.use(router);
const dotenv = require("dotenv");
dotenv.config();

const { mongoose } = require("mongoose");

const url = process.env.mongoDb;
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

let PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is looking for ${PORT}`);
});
