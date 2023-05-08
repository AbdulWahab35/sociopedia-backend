const HttpError = require("../models/http-error");
const uuid = require("uuid");

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

const getUser = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find(user => user.email === email);
  if(hasUser){
    throw new HttpError("User Already Exsists.", 422)
  }
  const createdUser = {
    name,
    email,
    password,
  };
  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
  console.log("DUMMY_USERS: ", DUMMY_USERS);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const indentifiedUser = DUMMY_USERS.find((user) => user.email === email);
  if (!indentifiedUser || indentifiedUser.password !== password) {
    throw new HttpError("Could not indentify user. Credentials are wrong", 401);
  }
  res.json({ message: "Logged in. Thankyou" });
};

exports.getUser = getUser;
exports.createUser = createUser;
exports.login = login;
