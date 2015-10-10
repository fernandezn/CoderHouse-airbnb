'use strict';

var passport 		 = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose		 = require('mongoose');
var User 			 = mongoose.model('User');

// // Estrategia para Autenticación con Facebook
// passport.use(new FacebookStrategy({
//     clientID	  : '159955497680570',
//     clientSecret  : '54281742bd3f55a2b8fa2961ae2fa898',
//     callbackURL   : "http://localhost:3041/auth/facebook/callback",
//     scope 		  : ['email'],
//     profileFields : ['email','picture'],
//     session 	  : false
//   },
//   function(accessToken, refreshToken, profile, done) {
//   	var query = { email : profile.emails[0].value }
//   	User.findOne(query,function(err,user){
//   		(user) ? done(null,user) : done({error:'not found'});
//   	});
  	
//   }
// ));
