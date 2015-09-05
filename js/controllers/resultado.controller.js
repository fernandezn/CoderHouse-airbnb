app.controller('ResultCtrl', ['$scope','$stateParams','QueryFac', function($scope,$stateParams,QueryFac){
	
	QueryFac.searchQuery($stateParams.query).then(function(response){
		$scope.resultados = response.data.results;
	}, function(error){
		console.log(error);
	});

}]);