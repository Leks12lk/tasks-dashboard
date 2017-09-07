'use strict';
app.controller('mainCtrl', ['$scope', '$location', 'authFactory', '$rootScope', 'localStorageService', function ($scope, $location, authFactory, $rootScope, localStorageService) {
	this.isAuthorize = localStorageService.get("authorizationData") == null ? false : true;
	$rootScope.isAuthorize = this.isAuthorize;

	this.logOut = function () {
		authFactory.logOut();
		$rootScope.isAuthorize = false;
		$location.path('/login');
	}
}]);