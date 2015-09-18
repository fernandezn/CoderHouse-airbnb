var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
	email	 : 'string',
	name 	 : 'string',
	lastName : 'string',
	age		 : 'number',	
	password : 'string',
	token 	 : 'string'
});

mongoose.model('User', UserSchema);