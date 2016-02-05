(function() {
    'use strict';
    function rozkladCtrl($scope, $http) {
        //console.log('rozkladCtrl - ', $scope);
        //console.log(this);
        //console.log($scope);
    //function rozkladCtrl($scope, DirectionFactory) {
        $scope.choiceView = 'list';
        $scope.choiceDetail = 'map';

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
        $http.get('http://localhost:3001/transports')
            .success(function(data) {
                //console.log(data);
                $scope.data = data;
                $scope.trams = [];
                $scope.trolleybuses = [];
                $scope.buses = [];
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
    function rozkladGetRouteCtrl($scope, $http, $rootScope) {
        //console.log('rozkladGetRouteCtrl - ', $scope);
        $scope.route = function(query) {
            var urlQuery = 'http://localhost:3001/' + query;
            console.log(query);
            //console.log($scope.$parent);
            //$scope.query = query;
            $http.get(urlQuery)
                .success(function(data) {
                    //console.log(stations);
                    //$scope.stations = data;
                    $rootScope.$broadcast('isLoad', {stations: data});
                    $scope.$parent.$watch('choiceDetail', function(oldValue, newValue) {
                        $rootScope.$broadcast('isLoad', {stations: data});
                    });
                })
                .error(function(err) {
                    console.error('error: ', err);
                });
        };
    }
    angular.module('phonecatApp')
        .controller('RozkladCtrl', ['$scope', '$http', rozkladCtrl])
        .controller('RozkladGetRouteCtrl', ['$scope', '$http', '$rootScope', rozkladGetRouteCtrl]);
    //angular.module('phonecatApp').controller('RozkladCtrl', ['$scope', 'DirectionFactory', rozkladCtrl]);
})();