'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
	email	 	 : 'String',
	password 	 : 'String',
	fullName 	 : 'String',
	active	 	 : 'Boolean',	
	reservations : [Schema.Types.ObjectId],
	apartments 	 : [{ type: Schema.Types.ObjectId, ref: 'Apartment' }]
});

mongoose.model('User', UserSchema);