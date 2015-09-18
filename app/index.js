'use strict';

var mongoose = require('./mongoose');
var express  = require('./express');
var chalk	 = require('chalk');

module.exports.init = function(callback){
	mongoose.connect(function(){
		mongoose.loadModels();
		var app = express.init();
		if (callback) callback(app);
	});
}

module.exports.start = function(){
	this.init(function(app){

		app.listen(3000, function(){
			console.log('--------------------------------------------------');
			console.log(chalk.green('Proyecto: airbnb'));			
			console.log(chalk.green('Servidor Iniciado'));
			console.log(chalk.green('Conexión realizada con la Base de Datos'));
			console.log(chalk.green('Escuchando en Puerto: 3000'));
			console.log('--------------------------------------------------');
		});	

	});
}