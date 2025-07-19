var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

/* GET travel view */
const travel = (req, res) => {
    res.render('travel', {
        title: 'travlr Getaways',
        trips: trips.trips  // Pass trips data to the view
    });
};

module.exports = {
  travel
};
