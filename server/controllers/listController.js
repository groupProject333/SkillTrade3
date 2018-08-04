const Listing = require('../database/models/listing');

module.exports = {
	findAll: function(req, res) {
		Listing.find(req.query)
			.sort({ date: -1 })
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	create: function(req, res) {
		console.log('hit controller');
		Listing.create(req.body).then((dbModel) => res.json(dbModel)).catch((err) => res.status(422).json(err));
	},
	findById: function(req, res) {
		console.log('hit id controller');
		Listing.findById(req.params.id)
			//.then(dbModel => console.log(dbModel))
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	}
};
