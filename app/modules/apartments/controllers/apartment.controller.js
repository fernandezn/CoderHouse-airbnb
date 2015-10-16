'use strict';

var mongoose = require('mongoose');
var geocoder = require('geocoder');
var _ 		 = require('lodash');
var Apart	 = mongoose.model('Apartment');
var User 	 = mongoose.model('User');

// Funcion para Obtener Coordenadas, Localidad y Cuidad en base a Dirección
var getAddressData = function(address, callback){

	var addressData = {};
	addressData.fullAddress = address;

	geocoder.geocode(address, function(error,data){
		if (!error){

			// Obtengo la localidad y la cuidad
			var address_components = data.results[0].address_components;
			var geometry		   = data.results[0].geometry;

			_.forEach(address_components, function(address){
				switch (address.types[0]){
					case 'locality':
						addressData.locality = address.short_name;
						break;
					case 'administrative_area_level_1':
						addressData.city = address.short_name;
						break;
				}
			});

			// Obtengo la latitud y longitud
			addressData.cord 			   = {};
			addressData.cord.coordinates = [];
			addressData.cord.coordinates.push(geometry.location.lat);
			addressData.cord.coordinates.push(geometry.location.lng);

			if (typeof callback === 'function'){ callback(addressData) };
		}
	});

}

// Creacion del Departamento
exports.createApart = function(req,res){	
	var apartData    	  = {};
	apartData.owner  	  = req.userToken._id;
	apartData.active 	  = true;
	apartData.title  	  = req.body.title;
	apartData.description = req.body.description;

	// Busco en base a la direccion, la ciudad y coordenadas de geolocalizacion
	getAddressData(req.body.address, function(addressData){

		// Guardo los datos de direccion
		apartData.address = addressData;

		// Creo el Departamento
		var apart = new Apart(apartData);
		apart.save(function(error){
			if (error) return res.status(400).json({ error : error});
			User.update({ _id : req.userToken._id }, { $push : { apartments : apart._id } }, function(error){
				if (error) return res.status(400).json({ error : error});
				res.status(200).json(apart);
			});	
		});		

	});	
};

// Detalle del Departamento
exports.getApart = function(req,res){
	Apart.findOne({ _id : req.params.id }, function(error,apart){
		if (error) return res.status(400).json({ error : "El Departamento no existe"});
		res.status(200).json(apart);
	});	
}

// Actualizacion del Departamento
exports.updateApart = function(req,res){
	Apart.findOne({ _id : req.params.id }, function(error,apart){
		if (error) return res.status(400).json({ error : "El Departamento no existe"});

		// Paso los nuevo valores
		if (req.body.title) apart.title = req.body.title;
		if (req.body.description) apart.description = req.body.description;

		// Si se ingreso una nueva direccion, busco los datos de la misma
		// caso contrario, guarda las modificaciones del departamento
		if (req.body.address && req.body.address != apart.address.fullAddress){
			getAddressData(req.body.address, function(addressData){
				apart.address = addressData;
				apart.save(function(error){
					if (error) return res.status(400).json({ mensaje : "Error al Intentar Actualizar el Departamento" });
					res.status(200).json({ mensaje : "Departamento Actualizado Corrrectamente" });
				});					
			});			
		} else{
			apart.save(function(error){
				if (error) return res.status(400).json({ mensaje : "Error al Intentar Actualizar el Departamento" });
				res.status(200).json({ mensaje : "Departamento Actualizado Corrrectamente" });
			});
		}

	});
}

// Desactivacion del Departamento
exports.deleteApart = function(req,res){
	Apart.findOne({ _id : req.params.id }, function(error,apart){
		if (error) return res.status(400).json({ mensaje : "Error al obtener datos del Departamento" });

		apart.active = false;
		apart.save(function(error){
			if (error) return res.status(400).json({ mensaje : "Error al Intentar Borrar el Departamento" });
			res.status(200).json({ mensaje : "Departamento Borrado Corrrectamente" });
		});		
		
	});	
};