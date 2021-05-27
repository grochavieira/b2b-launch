(function () {
    var laApp = angular.module('laApp', ['ngRoute', 'ngLocationUpdate']);

    laApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        var resource = window.resource.HTML;
        $routeProvider
            .when('/', {
                templateUrl: resource['home'],
                controller: 'HomeCtrl'
            })
            .when('/carrinho', {
                templateUrl: resource['cart'],
                controller: 'CartCtrl'
            })
            .when('/404', {
                templateUrl: resource['404'],
                controller: '404Ctrl'
            })
            .otherwise({
                redirectTo: '/404'
            })
    }]);

    laApp.controller('MainCtrl', MainController);
    laApp.controller('HomeCtrl', HomeController);
    laApp.controller('CartCtrl', CartController);
    laApp.controller('404Ctrl', c404Controller);
})();