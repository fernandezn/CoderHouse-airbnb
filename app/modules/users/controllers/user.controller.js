'use strict';

var jwt		 = require('jwt-simple');
var mongoose = require('mongoose');
var User	 = mongoose.model('User');
var secret   = '1A2b3C4d5E6f7G8h9I';

// Validacion del usuario
exports.checkUser = function(req,res,next){
	if (!req.headers.authorization) return res.status(401).json({ mensaje : "Falta Token" });
	try{
		req.userToken = jwt.decode(req.headers.authorization, secret);
		next();
	} catch(e){
		res.status(401).json({ mensaje : "Token Inválido" });
	}	
}

// Creacion del Usuario
exports.signUp = function(req,res){
	var user = new User(req.body);
	user.active = true;
	user.save(function(error){
		if (error) return res.status(400).send(error);
		res.json(user);
	});
};

// Login del Usuario por Mail y Password
exports.signIn = function(req,res){
	var query = { email : req.query.mail, password : req.query.password, active : true };
	User.findOne(query, function(error,user){
		if (!user) return res.status(401).json({ mensaje : "Usuario o Password Incorrecto" });
		var tokenPayload = { _id : user._id };
		res.status(200).json({ token : jwt.encode(tokenPayload,secret) });
	});
}

// Detalle del Usuario
exports.getUser = function(req,res){
	var userId = (req.params.id == 'me') ? req.userToken._id : req.params.id;
	User.findOne({ _id : userId }, function(error,user){
		if (error) return res.status(400).json({ mensaje : "Error al obtener datos del Usuario" });
		res.status(200).json(user);
	});
}

// Actualizacion del Usuario
exports.updateUser = function(req,res){
	var userId = (req.params.id == 'me') ? req.userToken._id : req.params.id;
	User.findOne({ _id : userId }, function(error,user){
		if (error) return res.status(400).json({ mensaje : "Error al obtener datos del Usuario" });

		// Paso los nuevo valores
		if (req.body.password) user.password = req.body.password;
		if (req.body.fullName) user.fullName = req.body.fullName;

		user.save(function(error){
			if (error) return res.status(400).json({ mensaje : "Error al Intentar Actualizar el Usuario" });
			res.status(200).json({ mensaje : "Usuario Actualizado Corrrectamente" });
		});

	});
};

// Desactivacion del Usuario
exports.deleteUser = function(req,res){
	var userId = (req.params.id == 'me') ? req.userToken._id : req.params.id;
	User.findOne({ _id : userId }, function(error,user){
		if (error) return res.status(400).json({ mensaje : "Error al obtener datos del Usuario" });

		user.active = false;
		user.save(function(error){
			if (error) return res.status(400).json({ mensaje : "Error al Intentar Borrar el Usuario" });
			res.status(200).json({ mensaje : "Usuario Borrado Corrrectamente" });
		});		
		
	});	
};

