const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  } else {
    res
      .status(error.code || 500)
      .json({ message: error.message || "An Unknown error occured" });
  }
});

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    app.listen(5000);
    console.log("mongodb connected.");
  })
  .catch((error) => {
    console.log("Database not connected.", error);
  });

// app.listen(5000);
