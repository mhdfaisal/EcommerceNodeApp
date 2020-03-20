const HttpError = require("../models/http-error.js");
const dummy_places = [
  {
    placeId: "p1",
    name: "",
    description: "",
    location: {
      latitude: 40.12345,
      longitude: -127.2259
    },
    creator: "u1"
  }
];

const createPlace = (req, res, next) => {
  const { placeId, name, description, location, creator } = req.body;
  const place = { placeId, name, description, location, creator };
  dummy_places.push({ ...place });
  res.status(201).json({ message: "Place added successfully", place });
};

const getPlaceByID = (req, res, next) => {
  const { pid } = req.params;
  const placeIndex = dummy_places.findIndex(p => pid === p.placeId);
  if (placeIndex !== -1) {
    res.status(200).json({
      message: "place found successfully",
      place: dummy_places.find(p => pid === p.placeId)
    });
  } else {
    return next(
      new HttpError(
        "The requested resource was not found against the provided placeId",
        404
      )
    );
  }
};

const getPlacesByUser = (req, res, next) => {
  const { uid } = req.params;
  const places = dummy_places.filter(place => {
    return uid === place.creator;
  });
  if (places && places.length > 0) {
    res.status(200).json({ message: "Places found successfully", places });
  } else {
    return next(new HttpError("Resource not found for this user ID", 404));
  }
};

const updatePlace = (req, res, next) => {};

const deletePlace = (req, res, next) => {};

module.exports.placesController = {
  createPlace,
  getPlaceByID,
  getPlacesByUser,
  updatePlace,
  deletePlace
};
