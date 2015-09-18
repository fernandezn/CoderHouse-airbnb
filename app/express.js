'use strict';

var express    	   = require('express');
var bodyParser 	   = require('body-parser');
var methodOverride = require('method-override');
var glob		   = require('glob');
var path 		   = require('path');

module.exports.initMiddleware = function(app){
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(methodOverride());
}

module.exports.initModules = function(app){
	glob('./app/modules/**/index.js', function(error,files){
		files.forEach(function(modulePath){			
			require(path.resolve(modulePath))(app);
		});
	});
}

module.exports.init = function(){

	var app = express();
	this.initMiddleware(app);
	this.initModules(app);

	return app;

}