'use strict';

var passport = require('passport');
var express  = require('express');
var router   = express.Router();

// require('./controllers/passport.controller.js');

// Controllers
var UserCtrl = require('./controllers/user.controller.js');

// Defino las rutas y controllers del modulo users
module.exports = function(app){

	// Rutas para la administracion del Usuario
	router.route("/users/:id").all(UserCtrl.checkUser)
		.get(UserCtrl.getUser)        // Detalle del Usuario
		.put(UserCtrl.updateUser)	  // Actualizacion del Usuario
		.delete(UserCtrl.updateUser); // Desactivacion del Usuario

	// Ruta para el Registro del Usuario
	router.post("/users", UserCtrl.signUp); // Registro de Usuario	

	// Ruta para el Login del Usuario con Mail y Password
	router.post("/users/auth/token", UserCtrl.signIn);

	// Ruta para obtener las reservas de un usuario
	router.get("/users/:id/reservations", UserCtrl.checkUser, UserCtrl.getReservationsUser);

	// Ruta para obtener los departamentos de un usuario
	router.get("/users/:id/apartments", UserCtrl.checkUser, UserCtrl.gerAparmentsUser);

	// // Rutas para el Login del Usuario con Facebook
	// router.get("/users/auth/facebook", passport.authenticate('facebook'));
	// router.get("/users/auth/facebook/callback", passport.authenticate('facebook'), function(req,res){
	// 	res.json({ mensaje : "Usuario Autentificado" });
	// });

	// Asigno el prefijo /api a las rutas del usuario
	app.use('/api',router);
};