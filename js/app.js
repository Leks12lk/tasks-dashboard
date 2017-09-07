
var app = angular.module("app", ['LocalStorageModule', 'ngRoute']);
// difene constant with baseUrl value
app.constant('baseUrl', '//tasks-dashboard.gear.host/');
app.constant('registerUrl', '//tasks-dashboard.gear.host/api/account/register');
app.constant('listsUrl', '//tasks-dashboard.gear.host/api/taskslist');
app.constant('cardsUrl', '//tasks-dashboard.gear.host/api/card');

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/lists.html",
            controller: "listsCtrl"
        })
 
       .when("/login", {
            templateUrl: "views/login.html",
             controller: "loginCtrl"
        })
 
       .when("/signup", {
            templateUrl: "views/signup.html",
            controller: "signupCtrl"
        })
        .when("/london", {
            templateUrl : "login.html"
        })
    
        .otherwise({ redirectTo: "/" });
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorFactory');
});
 
app.run(['authFactory', function (authFactory) {
    authFactory.fillAuthData();
}]);


/*app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);*/