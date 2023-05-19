const express = require("express");
const bodyParser = require("body-parser");
const UsersControllers = require("../controllers/users-controller");

const router = express.Router();
router.get("/", UsersControllers.getUser);

router.post("/signup", UsersControllers.signup);
router.post("/login", UsersControllers.login);

module.exports = router;
