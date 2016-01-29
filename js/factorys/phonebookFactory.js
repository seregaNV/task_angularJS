(function() {
    'use strict';
    function phonebookFactory($resource) {
        return $resource('data/:companyId.:format', {
            companyId: 'companys',
            format: 'json'
        }, {
            update: {method: 'PUT', params: {phoneId: 'phone'}, isArray: true} // {phoneId: '@phone'}
        });
    }
    angular.module('phonecatApp').factory('PhonebookFactory', ['$resource', phonebookFactory]);
})();