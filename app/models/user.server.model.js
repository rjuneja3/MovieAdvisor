// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a new 'UserSchema'
const UserSchema = new Schema({
	email: {
		type: String,
		// Set an email index
		index: true,
        unique: true,
		// Validate the email format
		match: /.+\@.+\..+/
	},
	username: {
		type: String,
		// Trim the 'username' field
		trim: true,
		// Set a unique 'username' index
		unique: true,
		// Validate 'username' value existance
		required: true,
		max: 40
	},
	password: {
		type: String,
		required: true,
		min: 6,
		// Validate the 'password' value length
		validate: [
			(password) => password.length >= 6,
			'Password Should Be Longer'
		]
	},
	accountType: {
		type: String
	}
});

// Set the 'fullname' virtual property
UserSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	var splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

// Create the 'findOneByUsername' static method
UserSchema.statics.findOneByUsername = function(username, callback) {
	// Use the 'findOne' method to retrieve a user document
	this.findOne({
		username: new RegExp(username, 'i')
	}, callback);
};

// Create the 'authenticate' instance method
UserSchema.methods.authenticate = function(password) {
	return this.password === password;
};

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('User', UserSchema);