const User = require('../database/models/user')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {
		console.log(username)
		console.log(password)
		User.findOne({ username: username }, (err, user) => {
			if (err) {
				console.log("Bad")
				return done(err)
			}
			if (!user) {
				console.log("Username Bad")
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.checkPassword(password)) {
				console.log("Password Bad")
				return done(null, false, { message: 'Incorrect password' })
			}
			console.log("Good")
			return done(null, user)
		})
	}
)

module.exports = strategy
