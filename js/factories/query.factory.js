app.factory('QueryFac', ['$http','$q',function($http,$q){

	var searchQuery = function(query){

		var deferred = $q.defer();

		$http.get('https://api.mercadolibre.com/sites/MLA/search',{ 
			params : { q : query, limit : 10 }
		}).then(function(response){
			deferred.resolve(response);
		}, function(error){
			deferred.reject(error);
		});

		return deferred.promise;

	}

	return{
		searchQuery : searchQuery
	};

}]);