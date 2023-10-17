var express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	session = require("express-session"),
	LocalStrategy = require("passport-local").Strategy,
	passportLocalMongoose =
		require("passport-local-mongoose")

var app = express();
const { setDefaultAutoSelectFamilyAttemptTimeout } = require("net");
const User = require("./models/user") // import user model

// Set up default mongoose connection
mongoose.connect('mongodb://localhost:27017/eyesOnHealth', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
	console.log('Conneted to mongodb');
});

// Configure middleware for request parsing (body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure Session management
app.use(session({
	secret : "eyes on health",
	resave : false,
	saveUninitialized : false
}));

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Cretaing user-schema for storing user information
const userSchema = new mongoose.Schema({
	email: String,
	password: String
});
userSchema.plugin(passportLocalMongoose);

passport.use(
	new LocalStrategy(
			function (email, password, done) {
				User.findOne({ email: email }, function (err, user) {
					if (err) {
						return done(err);
					}
					if (!user) {
						return done(null, false, {
							message: "Incorrect email."
						});
					}
					if (!user.validPassword(password)) {
						return done(null, false, {
							message: "Incorrect password."
						});
					}
					return done(null, user);
				});
			}
		)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

// Creating a new user
app.post("/register", function (req, res) {
	User.register(
		{ username: req.body.email },
		req.body.password,
		function (err, user) {
			if (err) {
				console.log(err);
				return res.render("register");
			}
			passport.authenticate("local")(
				req,
				res,
				function () {
					res.redirect("/secret");
				}
			);
		}
	);
});

// Login route
app.post("/login", function (req, res) {
	const user = new User({
		email: req.body.email,
		password: req.body.password
	});
	req.login(user, function (err) {
		if (err) {
			console.log(err);
		} else {
			passport.authenticate("local")(
				req,
				res,
				function () {
					res.redirect("/secret");
				}
			);
		}
	});
});

// Logout route
app.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/");
});

// Secret route
app.get("/secret", function (req, res) {
	if (req.isAuthenticated()) {
		res.send("You are authenticated");
	} else {
		res.redirect("/");
	}
});

// Home route
app.get("/", function (req, res) {
	res.send("Welcome to Eyes on Health");
});

// Define routes for user and caretaker
// app.use("/user", require("./routes/user"));
// app.use("/caretaker", require("./routes/caretaker"));

// Starting the server
app.listen(3000, function () {
	console.log("Server started on port 3000");
});