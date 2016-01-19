(function() {
    'use strict';
    function simpleAngularCtrl($scope, simpleFactory) {
        $scope.show = false;
        $scope.data = simpleFactory.arr;
        $scope.click = function() {
            var inputQuery = $scope.name,
                index = $scope.data.indexOf(inputQuery);
            if (inputQuery && (index === -1)) {
                $scope.data.push(inputQuery);
                $scope.name = '';
                console.log('"' + inputQuery + '" is added.');
                console.log('arr: ', $scope.data);
            } else if (inputQuery) {
                console.log('"' + inputQuery + '" is already exists!');
            } else {
                console.log('Input is empty!');
            }
        };
        $scope.remove = function(item) {
            var index = $scope.data.indexOf(item);
            $scope.data.splice(index, 1);
            console.log('"' + item + '" is removed.');
            console.log('arr: ', $scope.data);
        };
    }
    angular.module('phonecatApp').controller('SimpleAngularCtrl', ['$scope', 'SimpleFactory', simpleAngularCtrl]);
})();