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

// mongoose
//   .connect("mongodb+srv://AbdulWahab:ABDULWAHAB123@sociopediadb.ex2unl7.mongodb.net/?retryWrites=true&w=majority")
//   .then(() => {
//     app.listen(5000);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

app.listen(5000);
