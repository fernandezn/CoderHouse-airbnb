'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ApartmentSchema = new Schema({
	owner	 	 : { type: Schema.Types.ObjectId, ref: 'User' },
	title	 	 : 'String',
	description  : 'String',
	address	 	 : {
		fullAddress : 'String',
		locality	: { type : 'String', uppercase : true},
		city		: 'String',
		cord: {
			type : { type : 'String', default : 'Point' },
			coordinates: [Number]
		}
	},	
	pictures 	 : [{
		idCloudPic : 'String',
		url 	   : 'String', 
	}],
	reservations : [Schema.Types.ObjectId],
	active		 : 'Boolean' 
});

mongoose.model('Apartment', ApartmentSchema);