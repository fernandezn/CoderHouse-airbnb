'use strict';

var mongoose = require('mongoose');
var chalk	 = require('chalk');
var glob	 = require('glob');
var path	 = require('path');

module.exports.loadModels = function(){
	glob('./app/modules/**/models/*.js', function(error, files){
		files.forEach(function(modelPath){
			require(path.resolve(modelPath));
		});
	});
}

module.exports.connect = function(callback){

	var db = mongoose.connect('mongodb://admin:admin@ds043210.mongolab.com:43210/airbnb', function(error){

		if (error){
			console.error(chalk.red('No se pudo realizar la conexion con la base de datos'));
			console.log(error);
		} else{
			if (callback) callback();
		}

	});

}

module.exports.disconnect = function(callback){

	mongoose.disconnect(function(error){
		console.info(chalk.yellow('Desconexion de base de datos'));
		callback(error);
	});

}