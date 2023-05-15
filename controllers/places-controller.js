const HttpError = require("../models/http-error");
const validator = require("validator");
const Place = require("../models/Place");
// const Account = require('../models/Place')

// const createAccount = async (req, res)=>{
//   console.log(req.body)
//   const {createAccount, amount} = req.body;
//   const account = new Account({createAccount, amount})
//   await account.save();
//   res.json('Account created');
// }

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description:
      "This is the building. One of the top sky scrapper building in the world",
    imageUrl:
      "https://s39023.pcdn.co/wp-content/uploads/2022/10/Where-Are-Those-Morgans-Empire-State-Building-728x546.jpg.webp",
    address:
      "Iconic, art deco office tower from 1931 with exhibits & observatories on the 86th & 102nd floors.",
    location: {
      lat: 40.7484445,
      lng: -73.9878531,
    },
    creator: "c1",
  },
  {
    id: "p2",
    title: "Hiran Minar",
    description:
      "This is the building. One of the top sky scrapper building in the world",
    imageUrl:
      "https://s39023.pcdn.co/wp-content/uploads/2022/10/Where-Are-Those-Morgans-Empire-State-Building-728x546.jpg.webp",
    address:
      "Iconic, art deco office tower from 1931 with exhibits & observatories on the 86th & 102nd floors.",
    location: {
      lat: 40.7484445,
      lng: -73.9878531,
    },
    creator: "c1",
  },
];

// getting place by placeId from the DB
const getPalceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Something went wrong.", 500);
    return next(error);
  }
  if (!place) {
    throw new HttpError("Could not find the place by this id.", 404);
  }
  res.json({ place: place.toObject({ getter: true }) });
};

// getting place by userId from the DB
const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (error) {
    error = new HttpError("Something went wrong.", 500);
    next(error);
  }
  if (!places) {
    return next(
      new HttpError("Could not find the place by this user id.", 404)
    );
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

// creating place in the DB
const createPlace = async (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  console.log("data", req.body);
  if (!validator.isEmpty(title)) {
    if (validator.isLength(description, { min: 5 })) {
      const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image:
          "https://thumbs.dreamstime.com/b/roadway-to-random-place-interesting-explore-164151133.jpg",
        creator,
      });

      // Save Places to Mongodb
      try {
        await createdPlace.save();
      } catch (err) {
        const error = new HttpError("Cannot Create Place.", 500);
        next(error);
      }
      res.status(201).json({ place: createPlace });
    } else {
      res.json({
        description: "Description is invalid",
      });
    }
  } else {
    res.json({ title: "Title is not comeplete" });
  }
};

// Update Place in DB
const updatePlace = async (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not update the place",
      500
    );
    next(error);
  }
  (place.title = title), (place.description = description);

  try {
    place = await place.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not update the place",
      500
    );
    next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

// Deleting place from the DB
const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  // let place;
  try {
    (await Place.findByIdAndRemove({ _id: placeId }))
      ? res.status(200).json({ message: "Place Deleted." })
      : res.status(200).json({ message: "Place does not exist." });
  } catch (err) {
    const error = new HttpError("Something went wrong.", 500);
    return next(error);
  }
  // console.log("Deleted Place: ", place);
};

exports.getPalceById = getPalceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
