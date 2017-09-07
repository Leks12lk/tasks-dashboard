'use strict';
app.controller('loginCtrl', ['$scope', '$location', 'authFactory', '$rootScope', function ($scope, $location, authFactory, $rootScope) {
    
    $scope.loginData = {
        email: "",
        password: ""
    };

    $scope.message = "";

    $scope.login = function () {
        authFactory.login($scope.loginData).then(function (response) {
            $location.path('/');
            $rootScope.isAuthorize = true;
        },
         function (err) {
             $scope.message = err.error_description;
         });
    };

}]);