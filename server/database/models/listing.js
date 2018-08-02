var mongoose = require("mongoose");


var Schema = mongoose.Schema;


var ListingSchema = new Schema({
  // `title` is of type String
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  datesAvailable: {
    type: String,
    required: true
  },
  hashtags: {
    type: Array,
    required: true
  }
});


var Listing = mongoose.model("Listing", ListingSchema);


module.exports = Listing;