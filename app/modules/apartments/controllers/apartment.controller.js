'use strict';

var mongoose = require('mongoose');
var Apart	 = mongoose.model('Apartment');
var User 	 = mongoose.model('User');

// Creacion del Departamento
exports.createApart = function(req,res){	
	var apart = new Apart(req.body);
	apart.owner = req.userToken._id;
	apart.save(function(error){
		if (error) return res.status(400).json({ error : error});
		User.update({ _id : req.userToken._id }, { $push : { apartments : apart._id } }, function(error){
			if (error) return res.status(400).json({ error : error});
			res.status(200).json(apart);
		});	
	});
};

// Detalle del Departamento
exports.getApart = function(req,res){
	Apart.findeOne({ _id : req.params.idApart }, function(error,apart){
		if (error) return res.status(400).json({ error : "El Departamento no existe"});
		res.status(200).json(apart);
	});
}

// Actualizacion del Departamento
exports.updateApart = function(req,res){
	Apart.findeOne({ _id : req.params.idApart }, function(error,apart){
		if (error) return res.status(400).json({ error : "El Departamento no existe"});

		// Paso los nuevo valores
		if (req.body.title) apart.title = req.body.title;
		if (req.body.description) apart.description = req.body.description;
		if (req.body.address) apart.address = req.body.address;

		apart.save(function(error){
			if (error) return res.status(400).json({ mensaje : "Error al Intentar Actualizar el Departamento" });
			res.status(200).json({ mensaje : "Departamento Actualizado Corrrectamente" });
		});

	});
}