'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ApartmentSchema = new Schema({
	owner	 	 : { type: Schema.Types.ObjectId, ref: 'User' },
	title	 	 : 'String',
	description  : 'String',
	address	 	 : {
		fullAddress : 'String',
		cord: {
			type : { type : 'String', default : 'Point' },
			coordinates: [Number]
		}
	},	
	pictures 	 : ['String'],
	reservations : [Schema.Types.ObjectId]
});

mongoose.model('Apartment', ApartmentSchema);