'use strict';

var mongoose   = require('mongoose');
var geocoder   = require('geocoder');
var _ 		   = require('lodash');
var cloudinary = require('cloudinary');
var Apart	   = mongoose.model('Apartment');
var User 	   = mongoose.model('User');
var Reserv 	   = mongoose.model('Reservation');

// --- Borrar ----
process.env.CLOUD_NAME = process.env.CLOUD_NAME || "dn9brnjwz";
process.env.API_KEY    = process.env.API_KEY || "996718474815657";
process.env.SECRET_KEY = process.env.SECRET_KEY || "AXoQCO2rM9zOC_hK25p2WERToTs";

// Seteo la configuracion para trabajar con cloudinary
cloudinary.config({
	cloud_name : process.env.CLOUD_NAME,
	api_key    : process.env.API_KEY,
	api_secret : process.env.SECRET_KEY
});

// Funcion para Obtener Coordenadas, Localidad y Ciudad en base a Dirección
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

// Funcion para Subir Archivos a Cloudinary
var uploadFiles = function(files,callback){
	
	var filesCount = Object.keys(files).length;
	var fileIndex  = 0;
	var pictures   = [];

	// Recorro cada archivo y lo envio a cloudinary
	_.forEach(files,function(file){				
		cloudinary.uploader.upload(file.path,function(result){
			fileIndex++;
			var picture = { idCloudPic : result.public_id, url : result.secure_url };
			pictures.push(picture);
			if (fileIndex == filesCount && typeof callback === 'function') callback(pictures);
		});
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

// Obtiene departamentos por Ciudad
exports.getApartments = function(req,res){
	getAddressData(req.query.city, function(addressData){
		Apart.find({ 'address.locality' : addressData.locality.toUpperCase() }, function(error,apartments){
			if (error || !apartments.length) return res.status(400).json({ error : "No Se Encontraron Departamentos"});
			res.status(200).json(apartments);
		});
	});	
}

// Detalle del Departamento
exports.getApart = function(req,res){
	Apart.findOne({ _id : req.params.id }, function(error,apart){
		if (error || !apart) return res.status(400).json({ error : "El Departamento no existe"});
		Reserv.populate(apart, { 
			path : 'reservations', 
			select : 'startDate endDate',
			match : { active : true } 
		}, function(error,apart){
			res.status(200).json(apart);
		});		
	});	
}

// Actualizacion del Departamento
exports.updateApart = function(req,res){
	Apart.findOne({ _id : req.params.id }, function(error,apart){
		if (error || !apart) return res.status(400).json({ error : "El Departamento no existe"});

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
		if (error || !apart) return res.status(400).json({ mensaje : "Error al obtener datos del Departamento" });

		apart.active = false;
		apart.save(function(error){
			if (error) return res.status(400).json({ mensaje : "Error al Intentar Borrar el Departamento" });
			res.status(200).json({ mensaje : "Departamento Borrado Corrrectamente" });
		});		
		
	});	
};

// Imagenes para el Departamento
exports.uploadsApart = function(req,res){	
	Apart.findOne({ _id : req.params.id }, function(error,apart){
		if (error || !apart) return res.status(400).json({ mensaje : "Error al obtener datos del Departamento" });

		// Subo las imagenes a Cloudinary
		uploadFiles(req.files, function(pictures){			
			Apart.update({ _id : req.params.id }, { $push : { pictures : { $each : pictures } } }, function(error){
				if (error) return res.status(400).json({ error : error});
				res.status(200).json({ mensaje : "Imagenes Cargadas Correctamente" });
			});
		});

	});
}
