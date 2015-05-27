'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function($scope, $state, $auth) {

    $scope.$state = $state;
	$scope.validateUser = function(){
		console.log("Validation started");
		$auth.validateUser().then(function(response){
			console.log("Victory",response);
			
		},function(response){
			console.log("Defeat",response);
		});
	}

  });
