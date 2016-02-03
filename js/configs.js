(function() {
    'use strict';
    function mainRoute($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: 'template/home-page.html'
            })
            .state('phone-catalog', {
                url: '/phone-catalog',
                templateUrl: 'template/phone-catalog.html',
                controller: 'PhoneListCtrl'
            })
            .state('phone-book', {
                url: '/phone-book',
                templateUrl: 'template/phone-book.html',
                controller: 'PhonebookCtrl'
            })
            .state('trello', {
                url: '/trello',
                templateUrl: 'template/trello.html',
                controller: 'ListsCtrl'
            })
            .state('phones', {
                url: '/phones/:phoneId',
                templateUrl: 'template/phone-detail.html',
                controller: 'PhoneDetailCtrl'
            })
            .state('simple-angular', {
                url: '/simple-angular',
                templateUrl: 'template/simple-angular.html',
                controller: 'SimpleAngularCtrl'
            })
            .state('rozklad', {
                url: '/rozklad',
                templateUrl: 'template/rozklad.html',
                controller: 'RozkladCtrl'
            })
    }
    angular.module('phonecatApp').config(['$stateProvider', '$urlRouterProvider', mainRoute]);
})();











//(function() {
//    'use strict';
//    function PhoneRoute($routeProvider) {
//        $routeProvider
//            .when('/', {
//                templateUrl: 'template/home-page.html'
//            })
//            .when('/phone-catalog', {
//                templateUrl: 'template/phone-catalog.html',
//                controller: 'PhoneListCtrl'
//            })
//            .when('/phone-book', {
//                templateUrl: 'template/phone-book.html',
//                controller: 'PhonebookCtrl'
//            })
//            .when('/trello', {
//                templateUrl: 'template/trello.html',
//                controller: 'ListsCtrl'
//            })
//            .when('/contact', {
//                templateUrl: 'template/contact.html',
//                controller: 'ContactCtrl'
//            })
//            .when('/phones/:phoneId', {
//                templateUrl: 'template/phone-detail.html',
//                controller: 'PhoneDetailCtrl'
//            })
//            .when('/simple-angular', {
//                templateUrl: 'template/simple-angular.html',
//                controller: 'SimpleAngularCtrl'
//            })
//            .otherwise({
//                redirectTo: '/'
//            })
//    }
//    angular.module('phonecatApp').config(['$routeProvider', PhoneRoute]);
//})();