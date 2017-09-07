'use strict';
app.factory('authFactory', ['$http', '$q', 'localStorageService','registerUrl', 'baseUrl', function ($http, $q, localStorageService, registerUrl, baseUrl) {

    var serviceBase = baseUrl;
    var registrationUrl = registerUrl;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        email : ""
    };

    var _saveRegistration = function (registration) {
        _logOut();
        return $http.post(registrationUrl, registration).then(function (response) {
            return response;
        });

    };

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.email + "&password=" + loginData.password;

        var deferred = $q.defer();
        
        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
            
            localStorageService.set('authorizationData', { token: response.data.access_token, email: loginData.email });

            _authentication.isAuth = true;
            _authentication.email = loginData.email;

            deferred.resolve(response);

        }).catch(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.email = "";

    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData)
        {
            _authentication.isAuth = true;
            _authentication.email = authData.email;
        }

    }

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
}]);