var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    message: {
        type: String,
        // required: true
    },
    rating: {
        type: String,
        // required: true
    },
    reviewer: {
        type: String,
    },
    receiverId: {
        type: String
    } 

});
var Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;