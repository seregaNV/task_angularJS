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
    angular.module('phonecatApp').factory('Phone', ['$resource', phoneFactory]);
})();