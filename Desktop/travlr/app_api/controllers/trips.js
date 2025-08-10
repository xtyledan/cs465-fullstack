const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripList = async(req, res) => {
  const q = await Model
    .find({}) // No filter, return all records
    .exec();
  // Uncomment the following line to show results of query
  // on the console
  // console.log(q);

  if(!q) {
    // Database returned no data
    return res
      .status(404)
      .json({'err': err});
  } else { // Return resulting trip list
    return res
      .status(200)
      .json(q);
  }
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
  try {
    const trip = await Model
      .findOne({ code: req.params.tripCode })
      .exec();
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    return res.status(200).json(trip);
  } catch (err) {
    return res.status(400).json({ err });
  }
};

// POST: /trips - add a new trip
const tripsAddTrip = async (req, res) => {
  try {
    const newTrip = await Model.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });
    return res.status(201).json(newTrip);
  } catch (err) {
    return res.status(400).json({ err });
  }
};

// PUT: /trips/:tripCode - update an existing trip by code
const tripsUpdateTrip = async (req, res) => {
  try {
    const updated = await Model.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        $set: {
          name: req.body.name,
          length: req.body.length,
          start: req.body.start,
          resort: req.body.resort,
          perPerson: req.body.perPerson,
          image: req.body.image,
          description: req.body.description
        }
      },
      { new: true }
    ).exec();
    if (!updated) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(400).json({ err });
  }
};

module.exports = {
  tripList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};