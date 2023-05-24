const HttpError = require("../models/http-error");
const uuid = require("uuid");
const User = require("../models/user");

const DUMMY_USERS = [
  {
    name: "ALi",
    email: "ali@google.com",
    password: "ali123",
  },
  {
    name: "Amir",
    email: "amir@google.com",
    password: "amir123",
  },
];

const getUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError("Fetching users failed. try again later.", 500);
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signing up failed. Sign up later", 500);
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError("User exist already.", 422);
    return next(error);
  }
  const createdUser = new User({
    name,
    email,
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
    password,
    places: []
  });
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed. Try again later", 500);
    next(error);
  }
  res.status(201).json({ user: createdUser });
  console.log("DUMMY_USERS: ", DUMMY_USERS);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Logged in failed.");
    return next(error);
  }
  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "Invalid email or password. Could not logged in.",
      401
    );
    return next(error);
  }
  res.json({ message: "Logged in. Thankyou" });
};

exports.getUser = getUser;
exports.signup = signup;
exports.login = login;
