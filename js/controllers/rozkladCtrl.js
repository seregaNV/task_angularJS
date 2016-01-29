(function() {
    'use strict';
    function rozkladCtrl($scope) {
        $scope.name = 'rrr';
    }
    angular.module('phonecatApp').controller('RozkladCtrl', ['$scope', rozkladCtrl]);
})();