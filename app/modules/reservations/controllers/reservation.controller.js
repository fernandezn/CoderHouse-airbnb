'use strict';

var mongoose   = require('mongoose');
var geocoder   = require('geocoder');
var _ 		   = require('lodash');
var cloudinary = require('cloudinary');
var Reserv	   = mongoose.model('Reservation');
var Apart 	   = mongoose.model('Apartment');
var User 	   = mongoose.model('User');


// Creacion del Departamento
exports.createReservation = function(req,res){	

	var reservData = {};
	reservData.userId      = req.userToken._id;
	reservData.apartmentId = req.query.apart;
	reservData.startDate   = req.body.startDate;
	reservData.endDate	   = req.body.endDate;
	reservData.active	   = true;

	// Creo la Reserva para el Departamento
	var reservation = new Reserv(reservData);
	reservation.save(function(error){
		if (error) return res.status(400).json({ error : error});		
		Apart.update({ _id : req.query.apart }, { $push : { reservations : reservation._id } }, function(error){});
		User.update({ _id : req.userToken._id }, { $push : { reservations : reservation._id } }, function(error){});
		res.status(200).json(reservation);					
	});		

};

// Modificacion de una Reserva
exports.updateReservation = function(req,res){
	Reserv.findOne({ _id : req.params.id }, function(error,reservation){
		if (error || !reservation) return res.status(400).json({ mensaje : "Error al obtener datos de la Reserva" });

		reservation.startDate = req.body.startDate;
		reservation.endDate	  = req.body.endDate;
		reservation.save(function(error){
			if (error) return res.status(400).json({ mensaje : "Error al Modificar la Reserva" });
			res.status(200).json({ mensaje : "Reserva Modificada" });
		});		
		
	});
}

// Cancelacion de una Reserva
exports.cancelReservation = function(req,res){
	Reserv.findOne({ _id : req.params.id }, function(error,reservation){
		if (error || !reservation) return res.status(400).json({ mensaje : "Error al obtener datos de la Reserva" });

		reservation.active = false;
		reservation.save(function(error){
			if (error) return res.status(400).json({ mensaje : "Error al Cancelar la Reserva" });
			res.status(200).json({ mensaje : "Reserva Cancelada" });
		});		
	});	
}