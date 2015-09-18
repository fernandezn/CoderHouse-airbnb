var app = angular.module('airbnb',['ui.router']);

app.config(['$stateProvider','$urlRouterProvider',function($stateProvicer,$urlRouterProvider) {
	
	$stateProvicer.state('home',{
		url : '/home',
		templateUrl : 'templates/home.html',
		controller : 'SearchCtrl'
	})
	.state('resultado', {
		url : '/resultado/:query',
		templateUrl : 'templates/resultado.html',
		controller : 'ResultCtrl'
	});

	$urlRouterProvider.otherwise("/home");

}]);