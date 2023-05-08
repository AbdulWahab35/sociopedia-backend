const HttpError = require("../models/http-error");
const validator = require("validator");

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

const getPalceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((place) => place.id === placeId);
  if (!place) {
    throw new HttpError("Could not find the place by this id.", 404);
  }
  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.find((place) => place.creator === userId);
  if (!places) {
    return next(
      new HttpError("Could not find the place by this user id.", 404)
    );
  }
  res.json({ places });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  if (!validator.isEmpty(title)) {
    if (validator.isLength(description, { min: 5 })) {
      const createdPlace = {
        title,
        description,
        location: coordinates,
        address,
        creator,
      };
      DUMMY_PLACES.push(createdPlace);
      res.status(201).json({ place: createPlace });
      console.log("Dummy Places: ", DUMMY_PLACES);
    } else {
      res.json({
        description: "Description is invalid",
      });
    }
  } else {
    res.json({ title: "Title is not comeplete" });
  }
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const updatedPlace = {
    ...DUMMY_PLACES.find((place) => place.id === placeId),
  };
  const placeIndex = DUMMY_PLACES.findIndex((place) => place.id === placeId);
  (updatedPlace.title = title), (updatedPlace.description = description);
  DUMMY_PLACES[placeIndex] = updatedPlace;
  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.id !== placeId);
  res.status(200).json({ message: "Place Deleted." });
};

exports.getPalceById = getPalceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
