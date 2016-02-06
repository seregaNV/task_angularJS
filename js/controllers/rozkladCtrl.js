(function() {
    'use strict';
    function rozkladCtrl($scope, $http) {
    //function rozkladCtrl($scope, DirectionFactory) {
        $scope.choiceView = 'list';
        $scope.choiceDetail = 'map';
        //$scope.route = function(query) {
        //    var urlQuery = 'http://localhost:3001/' + query;
        //    console.log(query);
        //    //$scope.query = query;
        //    $http.get(urlQuery)
        //        .success(function(data) {
        //            //console.log(stations);
        //            $scope.stations = data;
        //            $scope.$broadcast('isLoad', {});
        //            $scope.$watch('choiceDetail', function(oldValue, newValue) {
        //                $scope.$broadcast('isLoad', {});
        //            });
        //        })
        //        .error(function(err) {
        //            console.error('error: ', err);
        //        });
        //};
        //$http.get('http://localhost:3001/transports')
        //    .success(function(data) {
        //        //console.log(data);
        //        $scope.data = data;
        //        $scope.trams = [];
        //        $scope.trolleybuses = [];
        //        $scope.buses = [];
        //        for (var i = 0; i < data.length; i++) {
        //            if (data[i].type == 'tram') {
        //                $scope.trams.push(data[i]);
        //            } else if (data[i].type == 'trolleybus') {
        //                $scope.trolleybuses.push(data[i]);
        //            } else if (data[i].type == 'bus') {
        //                $scope.buses.push(data[i]);
        //            }
        //        }
        //    })
        //    .error(function(err) {
        //        console.error('error: ', err);
        //    });


        //DirectionFactory.query({file: 'transports'}, function(data) {
        //    $scope.data = data;
        //    $scope.trams = [];
        //    $scope.trolleybuses = [];
        //    $scope.buses = [];
        //    for (var i = 0; i < data.length; i++) {
        //        if (data[i].type == 'tram') {
        //            $scope.trams.push(data[i]);
        //        } else if (data[i].type == 'trolleybus') {
        //            $scope.trolleybuses.push(data[i]);
        //        } else if (data[i].type == 'bus') {
        //            $scope.buses.push(data[i]);
        //        }
        //    }
        //});
        //DirectionFactory.query({file: 'tr'}, function(stations) {
        //    $scope.stations = stations;
        //    $scope.$broadcast('isLoad', {});
        //    $scope.$watch('choiceDetail', function(oldValue, newValue) {
        //        $scope.$broadcast('isLoad', {});
        //    });
        //});
        //console.log($scope);
    }
    function rozkladGetTransportsCtrl($scope, $http) {

        $scope.tramsShow = true;
        $scope.trolleybusesShow = false;
        $scope.busesShow = false;

        $scope.showTrams = function () {
            $scope.tramsShow = !$scope.tramsShow;
            $scope.trolleybusesShow = false;
            $scope.busesShow = false;
        };
        $scope.showTrolleybuses = function () {
            $scope.tramsShow = false;
            $scope.trolleybusesShow = !$scope.trolleybusesShow;
            $scope.busesShow = false;
        };
        $scope.showBuses = function () {
            $scope.tramsShow = false;
            $scope.trolleybusesShow = false;
            $scope.busesShow = !$scope.busesShow;
        };
        $scope.trams = [];
        $scope.trolleybuses = [];
        $scope.buses = [];
        $http.get('http://localhost:3001/transports')
            .success(function(data) {
                $scope.data = data;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].type == 'tram') {
                        $scope.trams.push(data[i]);
                    } else if (data[i].type == 'trolleybus') {
                        $scope.trolleybuses.push(data[i]);
                    } else if (data[i].type == 'bus') {
                        $scope.buses.push(data[i]);
                    }
                }
            })
            .error(function(err) {
                console.error('error: ', err);
            });
    }
    function rozkladGetRouteCtrl($scope, $http, $rootScope) {
        $scope.route = function(query) {
            console.log(query);
            var urlQuery = 'http://localhost:3001/' + query;
            $http.get(urlQuery)
                .success(function(data) {
                    //$rootScope.$broadcast('isLoad', {stations: data});
                    $scope.$watch('choiceDetail', function(oldValue, newValue) {
                        console.log('choiceDetail');
                        $rootScope.$broadcast('isLoad', {stations: data});
                    });
                })
                .error(function(err) {
                    console.error('error: ', err);
                });
        };
    }
    function rozkladGetStopsCtrl($scope, $http, $rootScope) {
        $scope.$on('isLoad', function(event, args) {
            console.log('isLoad');
            $scope.stations = args.stations;
        })
    }
    angular.module('phonecatApp')
        .controller('RozkladCtrl', ['$scope', '$http', rozkladCtrl])
        .controller('RozkladGetTransportsCtrl', ['$scope', '$http', rozkladGetTransportsCtrl])
        .controller('RozkladGetRouteCtrl', ['$scope', '$http', '$rootScope', rozkladGetRouteCtrl])
        .controller('RozkladGetStopsCtrl', ['$scope', '$http', '$rootScope', rozkladGetStopsCtrl])
    //angular.module('phonecatApp').controller('RozkladCtrl', ['$scope', 'DirectionFactory', rozkladCtrl]);
})();