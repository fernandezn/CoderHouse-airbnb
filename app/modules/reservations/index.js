'use strict';

var express = require('express');
var router  = express.Router();

// Controllers
var UserCtrl   = require('../users/controllers/user.controller.js');
var ReservCtrl = require('./controllers/reservation.controller.js');

// Defino las rutas y controllers del modulo reservations
module.exports = function(app){

	// Rutas para la administracion de las Reservas	
	router.route("/reservations/:id").all(UserCtrl.checkUser)
		.put(ReservCtrl.updateReservation)     // Actualizacion de una Reserva
		.delete(ReservCtrl.cancelReservation); // Cancelacion de una Reserva

	// Ruta para la Reserva de un Departamento
	router.post("/reservations", UserCtrl.checkUser, ReservCtrl.createReservation);

	app.use('/api',router); // Asigno el prefijo /api a las rutas del usuario
};