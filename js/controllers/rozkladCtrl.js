(function() {
    'use strict';
    function rozkladCtrl($scope, DirectionFactory) {
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

        DirectionFactory.query({file: 'transports'}, function(data) {
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
        });
        DirectionFactory.query({file: 'tr'}, function(stations) {
            $scope.stations = stations;
            $scope.$broadcast('isLoad', {});
            $scope.$watch('choiceDetail', function(oldValue, newValue) {
                $scope.$broadcast('isLoad', {});
            });
        });
    }
    angular.module('phonecatApp').controller('RozkladCtrl', ['$scope', 'DirectionFactory', rozkladCtrl]);
})();