(function() {
    'use strict';
    function pbCompanyCard() {
        return {
            restrict: 'E',
            scope: {company: '='},
            templateUrl: 'template/company-card.html'
        }
    }
    angular.module('phonecatApp').directive('pbCompanyCard', pbCompanyCard);
})();