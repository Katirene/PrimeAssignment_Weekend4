var myApp = angular.module("myApp", ['ngRoute']);
console.log('We are in client-app.js AngularLand');

myApp.config(['$routeProvider', function($routeProvider) {
    console.log('here');
    $routeProvider
        .when('/completed', {
            templateUrl: '/views/templates/completed.html',
            controller: 'CompletedController'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);