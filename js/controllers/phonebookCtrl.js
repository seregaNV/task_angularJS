(function() {
    'use strict';
    function phonebookCtrl($scope, Company) {
        $scope.companys = Company.query();
        $scope.view = 'list';
    }
    angular.module('phonecatApp').controller('PhonebookCtrl', ['$scope', 'Company', phonebookCtrl]);
})();