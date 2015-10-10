'use strict';

var express = require('express');
var router  = express.Router();

// // Controllers
// var UserCtrl = require('./controllers/user.controller.js');
// var RegCtrl  = require('./controllers/register.controller.js');

// Defino las rutas y controllers del modulo users
module.exports = function(app){

	// // Rutas para la administracion del Usuario	
	// router.get("/users/:id", UserCtrl.getUser);       // Obtiene los datos de un usuario
	// router.put("/users/:id", UserCtrl.updateUser); 	  // Actualiza los datos de un usuario
	// router.delete("/users/:id", UserCtrl.deleteUser); // Inactiva un usuario

	// // Rutas para el Registro/Login del Usuario
	// router.post("/users", UserCtrl.signUp); // Registro de Usuario

	// app.use('/api',router); // Asigno el prefijo /api a las rutas del usuario
};