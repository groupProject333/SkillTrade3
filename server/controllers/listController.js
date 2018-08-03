// const Listing = require('../database/models/listing');
const db = require("../database/models");

module.exports = {
	findAll: function(req, res) {
		db.Listing
			.find(req.query)
			.sort({ date: -1 })
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	create: function(req, res) {
		console.log('hit controller');
		console.log(req.body)
	    db.Listing
	      .create(req.body)
	      .then(dbModel => {
			  console.log(".then listController")
			  console.log(dbModel)
			  db.User.findOneAndUpdate({ username: dbModel.owner}, {$push: {listing: dbModel._id}}, {new: true})
			  .then(dbUser => {
				  console.log(dbUser)
			  })
		  })
	      .catch(err => res.status(422).json(err));
	},
	findByTags: function(req, res) {
		console.log("here controller")
		console.log(req.body.searchTags)
		db.Listing.find( { hashtags: { $all: req.body.searchTags } } )
		.then(function(dbListing) { res.json(dbListing)
	})
}

	// create: function(req, res) {
	// 	console.log('!!!!HERE:CONTROLLERS' + req.body.receiver);
	// 	db.Listing
	// 		.create(req.body)
	// 		.then(function(dbModel) {
	// 			console.log(dbMessage);
	// 			res.json(dbModel)
	// 		})
	// 		.catch(function(err) {
	// 			res.json(err);
	// 		});
	// }
};
