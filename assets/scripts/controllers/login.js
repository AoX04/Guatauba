'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function($scope, $location,$http,$auth) {
	
	$scope.user = {};
	
	$scope.submit = function() {
		
		$auth.submitLogin($scope.user)
			.then(function(resp) { 
				console.log(resp);// handle success response
				$location.path('/dashboard');
			})
			.catch(function(resp) { 
			  // handle error response
				console.log(resp);
			});
			
		/*$http.post('/user/login', $scope.user).then(
		function(response){
			
			if(response.status == 200)
				$location.path('/dashboard');
		
			console.log(response)
		},function(response){
			console.log(response.status);
			console.log(response)
		});*/
		
		return false;
	}

});

