'use strict';

var express = require('express');
var router  = express.Router();

// Controllers
var ApartCtrl = require('./controllers/apartment.controller.js');
var UserCtrl  = require('../users/controllers/user.controller.js');

// Defino las rutas y controllers del modulo users
module.exports = function(app){

	// Rutas para la administracion del Departamento
	router.route("/apartments").all(UserCtrl.checkUser)
		.post(ApartCtrl.createApart) // Crea un departamento y lo asocia al usuario
		.put(ApartCtrl.updateApart); // Actualiza un Departamento

	// Asigno el prefijo /api a las rutas de los departamentos
	app.use('/api',router);
};