'use strict';

var express = require('express');
var router  = express.Router();

// Controllers
var UserCtrl = require('./controllers/user.controller.js');

// Defino las rutas y controllers del modulo Core
module.exports = function(app){
	router.post("/user/registro", UserCtrl.signUp); // Registro de Usuario
	app.use('/api',router);
};