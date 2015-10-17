'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ReservationSchema = new Schema({
	userId	 	 : Schema.Types.ObjectId,
	apartmentId	 : Schema.Types.ObjectId,
	startDate  	 : 'Date',
	endDate 	 : 'Date',
	active		 : 'Boolean'
});

mongoose.model('Reservation', ReservationSchema);