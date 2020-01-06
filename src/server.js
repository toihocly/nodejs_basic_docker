const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// Middlewares
app.use(bodyParser.json());
app.use(morgan("dev"));

// Import Routes
const authRoute = require("./routes/auth");

// Connect to MongoDB:
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("connected to DB");
  }
);

// Route Middlewares
app.get("/api", (request, response) => {
  response.send("Hello to API");
});
app.use("/api/auth", authRoute);

app.listen(3030, () => {
  console.log("Web server is listening on port 3000.");
});

// Test
