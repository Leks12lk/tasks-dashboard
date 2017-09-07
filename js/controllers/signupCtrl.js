'use strict';
app.controller('signupCtrl', ['$scope', '$location', '$timeout', 'authFactory', '$rootScope', function ($scope, $location, $timeout, authFactory, $rootScope) {

	$scope.savedSuccessfully = false;
	$scope.message = "";

	$scope.registration = {
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		confirmPassword: ""
	};

	$scope.signUp = function () {
		authFactory.saveRegistration($scope.registration).then(function (response) {

			$scope.savedSuccessfully = true;
			var loginData = {
				email: $scope.registration.email,
				password: $scope.registration.password
			};
			// login
			authFactory.login(loginData).then(function (response) {
				$location.path('/');
				$rootScope.isAuthorize = true;
			},
             function (err) {
             	$scope.message = err.error_description;
             });
			//$scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
			//startTimer();

		},
         function (response) {
         	var errors = [];
         	for (var key in response.data.modelState) {
         		for (var i = 0; i < response.data.modelState[key].length; i++) {
         			errors.push(response.data.modelState[key][i]);
         		}
         	}
         	$scope.message = "Failed to register user due to:" + errors.join(' ');
         });
	};

	//var startTimer = function () {
	//    var timer = $timeout(function () {
	//        $timeout.cancel(timer);
	//        $location.path('/login');
	//    }, 2000);
	//}

}]);