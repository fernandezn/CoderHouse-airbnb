app.controller('SearchCtrl', ['$scope','$state', function($scope,$state){
	
	// Funcion para realizar la busqueda sobre la API de ML y llamar a la vista de resultado
	$scope.buscarQuery = function(){
		$state.go('resultado',{ query : $scope.query });
	}

}]);