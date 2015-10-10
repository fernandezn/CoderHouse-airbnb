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

	// Rutas para el Registro del Usuario
	router.post("/users", UserCtrl.signUp); // Registro de Usuario	

	// Rutas para el Login del Usuario con Mail y Password
	router.post("/auth/users/token", UserCtrl.signIn);

	// // Rutas para el Login del Usuario con Facebook
	// router.get("/users/auth/facebook", passport.authenticate('facebook'));
	// router.get("/users/auth/facebook/callback", passport.authenticate('facebook'), function(req,res){
	// 	res.json({ mensaje : "Usuario Autentificado" });
	// });

	// Asigno el prefijo /api a las rutas del usuario
	app.use('/api',router);
};