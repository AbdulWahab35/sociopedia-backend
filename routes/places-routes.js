const express = require("express");
// const { check } = require("express-validator");
const bodyParser = require("body-parser");
const PlacesControllers = require("../controllers/places-controller");

const router = express.Router();

router.get("/", PlacesControllers.createPlace);
router.get("/:pid", PlacesControllers.getPalceById);
router.get("/user/:uid", PlacesControllers.getPlacesByUserId);

router.post(
  "/",
//   [check("title").not().isEmpty()],
  PlacesControllers.createPlace
);

// router.post(
//   "/",
 //   [check("title").not().isEmpty()],
//   PlacesControllers.createAccount
// );

router.patch("/:pid", PlacesControllers.updatePlace);

router.delete("/:pid", PlacesControllers.deletePlace);

module.exports = router;
