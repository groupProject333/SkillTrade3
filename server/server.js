const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database') 
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const app = express()
const path = require('path')
const PORT = process.env.PORT || 8000;
if(process.env.NODE_ENV === "production") {
	console.log(__dirname)
	app.use(express.static(path.join(__dirname, "./build")));
}
// Route requires
const user = require('./routes/api/users')
const message = require("./routes/api/message")
const listing = require('./routes/api/listing')
const Routes = require('./routes');
// const routes = ("./routes")
// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json());



// Sessions
app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// Routes
app.use('/user', user);
app.use("/message", message);
app.use('/listing', listing);
app.use(Routes);
// app.unsubsscribe(routes)
// Starting Server 
app.listen(PORT, (err) => {
	if(err){
		console.log(err);
	}
	else{
		console.log(`App listening on PORT: ${PORT}`)
	}
})