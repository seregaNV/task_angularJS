(function() {
    'use strict';
    function phonebookCtrl($scope, PhonebookFactory) {
        $scope.companys = PhonebookFactory.query();
        $scope.view = 'list';
    }
    angular.module('phonecatApp').controller('PhonebookCtrl', ['$scope', 'PhonebookFactory', phonebookCtrl]);
})();