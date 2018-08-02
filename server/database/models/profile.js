var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ProfileSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  // `title` is required and of type String
  firstName: {
    type: String,
    required: false
  },
  // `link` is required and of type String
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  imageLink: {
    type: String,
    required: false
  },
  birthdate: {
    type: Date,
    required: false
  },
  dateJoined: {
    type: Date,
    required: true
  },
  lastUpdated: {
    type: Date,
    required: false
  },
  location: {
		type: String,
		required: false
	},
	skills: {
		type: String,
		required: false
	},
  karmaChips: {
    type: Number,
    required: true
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  listings: [{
    type: Schema.Types.ObjectId,
    ref: "Listing"
  }],
  reviews: {
    type : Schema.Types.ObjectId,
    ref: "Review"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Profile = mongoose.model("Profile", ProfileSchema);

// Export the Article model
module.exports = Profile;
