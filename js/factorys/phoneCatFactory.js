(function() {
    'use strict';
    function phoneFactory($resource) {
        return $resource('phones/:phoneId.:format', {
            phoneId: 'phones',
            format: 'json'
        }, {
            update: {method: 'PUT', params: {phoneId: 'phone'}, isArray: true} // {phoneId: '@phone'}
        });
    }
    angular.module('phonecatApp').factory('PhoneFactory', ['$resource', phoneFactory]);
})();