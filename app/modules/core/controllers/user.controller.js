var mongoose = require('mongoose');
var User	 = mongoose.model('User');

exports.signUp = function(req,res){
	var user = new User(req.body);
	user.save(function(error){
		if (error) return res.status(400).send(error);
		res.json(user);
	});
}