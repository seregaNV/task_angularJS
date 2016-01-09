(function() {
    'use strict';
    function PhoneRoute($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $routeProvider
            .when('/', {
                templateUrl: 'template/home.html',
                controller: 'PhoneListCtrl'
            })
            .when('/about', {
                templateUrl: 'template/about.html',
                controller: 'AboutCtrl'
            })
            .when('/contact', {
                templateUrl: 'template/contact.html',
                controller: 'ContactCtrl'
            })
            .when('/phones/:phoneId', {
                templateUrl: 'template/phone-detail.html',
                controller: 'PhoneDetailCtrl'
            })
            .when('/simple-angular', {
                templateUrl: 'template/simple-angular.html',
                controller: 'SimpleAngularCtrl'
            })
            .otherwise({
                redirectTo: '/'
            })
    }
    angular.module('phonecatApp').config(['$routeProvider', '$locationProvider', PhoneRoute]);
})();