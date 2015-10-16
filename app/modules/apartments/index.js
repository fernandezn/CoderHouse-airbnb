'use strict';

var express  = require('express');
var router   = express.Router();
var geocoder = require('geocoder');

// Controllers
var ApartCtrl = require('./controllers/apartment.controller.js');
var UserCtrl  = require('../users/controllers/user.controller.js');

// Defino las rutas y controllers del modulo users
module.exports = function(app){

	// Rutas para la administracion del Departamento
	router.route("/apartments/:id").all(UserCtrl.checkUser)
		.get(ApartCtrl.getApart)        // Obtengo datos del Departamento
		.put(ApartCtrl.updateApart)     // Actualiza un Departamento
		.delete(ApartCtrl.deleteApart); // Borro un Departamento

	// Crea un departamento y lo asocia al usuario
	router.post("/apartments", UserCtrl.checkUser, ApartCtrl.createApart);

	// Asigno el prefijo /api a las rutas de los departamentos
	app.use('/api',router);
};