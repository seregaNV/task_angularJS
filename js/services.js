(function() {
    'use strict';
    function phoneFactory($resource) {
        return $resource('phones/:phoneId.:format', {
            phoneId: 'phones',
            format: 'json',
            apiKey: 'someKeyThis'
        }, {
            update: {method: 'PUT', params: {phoneId: 'phone'}, isArray: true} // {phoneId: '@phone'}
        });
    }
    function phonebookFactory($resource) {
        return $resource('data/:companyId.:format', {
            companyId: 'companys',
            format: 'json'
        }, {
            update: {method: 'PUT', params: {phoneId: 'phone'}, isArray: true} // {phoneId: '@phone'}
        });
    }
    function eF() {
        return {
            arr: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap', 'NodeJS', 'ExpressJS']
        };
    }
    angular.module('phonecatApp').factory('Phone', ['$resource', phoneFactory]);
    angular.module('phonecatApp').factory('Company', ['$resource', phonebookFactory]);
    angular.module('phonecatApp').factory('simpleFactory', eF);
})();