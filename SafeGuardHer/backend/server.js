const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const port = 8080;
const cors = require("cors");

// Routes
const authRoutes = require("./routes/auth.routes");
const friendRoutes = require("./routes/friend.routes");

app.use(morgan("dev"));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://22cs042:iiu3vedYCRb7UZht@mentorship.eoi0nsf.mongodb.net/safeguardher"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);h
  });

// Use routes
app.use("/auth", authRoutes);
app.use("/friend", friendRoutes);

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
