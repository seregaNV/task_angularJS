(function() {
    'use strict';
    function rozkladCtrl($scope, $http, $rootScope) {
    //function rozkladCtrl($scope, DirectionFactory) {

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

        $scope.choiceDetail = 'list';

        $scope.getRoute = function(query) {
            $scope.route = query;
            var urlQuery = 'http://localhost:3001/' + query.file;
            if ($scope.routeCheck == query.file) {
                console.log('Data already loaded.');
            } else {
                console.log('Loading.');
                $http.get(urlQuery)
                    .success(function(data) {
                        $scope.$watch('choiceDetail', function(newValue, oldValue) {
                            if (newValue === 'map') {
                                $scope.$broadcast('isLoadToDir', {stations: data});
                            } else if (newValue === 'list') {
                                $scope.$broadcast('isLoadToCtr', {stations: data});
                            }
                        });
                        //$scope.routeName = data.name;
                        //$scope.routeNumber = data.number;
                    })
                    .error(function(error) {
                        console.error('error: ', error);
                    });
            }
            $scope.routeCheck = query.file;
        };

    }
    function rozkladGetTransportsCtrl($scope, $http) {
        $scope.choiceView = 'list';

        $scope.tramsShow = true;
        $scope.trolleybusesShow = false;
        $scope.busesShow = false;

        $scope.showTransports = function (transport) {
            switch (transport) {
                case 'tram':
                    $scope.tramsShow = !$scope.tramsShow;
                    $scope.trolleybusesShow = false;
                    $scope.busesShow = false;
                    break;
                case 'trolleybus':
                    $scope.tramsShow = false;
                    $scope.trolleybusesShow = !$scope.trolleybusesShow;
                    $scope.busesShow = false;
                    break;
                case 'bus':
                    $scope.tramsShow = false;
                    $scope.trolleybusesShow = false;
                    $scope.busesShow = !$scope.busesShow;
                    break;
                default:
                    console.error(transport + ' is not find.');
            }
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
                        //console.log($scope.trams[i].number);
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
        $scope.$on('isLoadToCtr', function(event, args) {
            $scope.checkNumber = $scope.route.number;
            $scope.checkType = $scope.route.type;
        });
    }
    //function rozkladGetRouteCtrl($scope, $http, $rootScope) {
    //    $scope.route = function(query) {
    //        console.log(query);
    //        var urlQuery = 'http://localhost:3001/' + query;
    //        $http.get(urlQuery)
    //            .success(function(data) {
    //                $rootScope.stations = data;
    //                $rootScope.$broadcast('isLoad', {stations: data});
    //            })
    //            .error(function(err) {
    //                console.error('error: ', err);
    //            });
    //    };
    //}
    //function rozkladGetStopsCtrl($scope, $rootScope) {
    //    $scope.choiceDetail = 'map';
    //    $scope.$watch('choiceDetail', function(newValue, oldValue) {
    //        //console.log($scope.$parent.$parent);
    //        var checkValue = newValue;
    //        if (checkValue === 'map') {
    //            console.log('choiceDetail');
    //            var data = $rootScope.stations;
    //            $rootScope.$broadcast('isLoad', {stations: data});
    //        }
    //    });
    //}
    function rozkladStationsCtrl($scope) {
        $scope.$on('isLoadToCtr', function(event, args) {
            var data = args.stations;
            $scope.routeName = $scope.route.name;
            $scope.routeNumber = $scope.route.number;
            $scope.checkType = $scope.route.type;
            $scope.start = 0;
            $scope.addRoutList = function(index) {
                var time = 0;
                var stations = [];
                for (var i = 0; i < data.length; i++) {
                    var station = {};
                    if (index < i){
                        time += data[i].toStation;
                        station.toStation = time + "'";
                    } else if (index > i) {
                        station.toStation = '';
                    } else if (index == i) {
                        station.toStation = 0;
                        setDepot(data[i]);
                    }
                    station.name = data[i].name;
                    stations.push(station);
                }
                $scope.stations = stations;

            };
            $scope.addRoutList(0);
        });
        //$scope.$on('$destroy', function() {
        //listen();
        //});
        var setDepot = function(data) {
            $scope.weekdays = data.weekdays;
            $scope.weekend = data.weekend;
        };
    }
    angular.module('phonecatApp')
        .controller('RozkladCtrl', ['$scope', '$http', '$rootScope', rozkladCtrl])
        .controller('RozkladGetTransportsCtrl', ['$scope', '$http', rozkladGetTransportsCtrl])
        .controller('RozkladStationsCtrl', ['$scope', rozkladStationsCtrl])
        //.controller('RozkladGetRouteCtrl', ['$scope', '$http', '$rootScope', rozkladGetRouteCtrl])
        //.controller('RozkladGetStopsCtrl', ['$scope', '$rootScope', rozkladGetStopsCtrl])
        //angular.module('phonecatApp').controller('RozkladCtrl', ['$scope', 'DirectionFactory', rozkladCtrl]);
})();