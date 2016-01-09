(function() {
    'use strict';
    function phoneFactory($resource) {
        return $resource('phones/:phoneId.:format', {
            phoneId: 'phones',
            format: 'json',
            apiKey: 'someKeyThis'
            /*http://localhost:8888/phones/phones.json?apiKey=someKeyThis*/
        }, {
            /*action: {method: <?>, params: <?>, isArray: <?>, ...}*/
            update: {method: 'PUT', params: {phoneId: 'phone'}, isArray: true} // {phoneId: '@phone'}
        });
    }
    function eF() {
        return {
            arr: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap', 'NodeJS', 'ExpressJS']
        };
    }
    angular.module('phonecatApp').factory('Phone', ['$resource', phoneFactory]);
    angular.module('phonecatApp').factory('simpleFactory', eF);
})();