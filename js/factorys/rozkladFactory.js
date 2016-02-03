(function() {
    'use strict';
    function directionFactory($resource) {
        return $resource('data/:file.json');
    }
    angular.module('phonecatApp').factory('DirectionFactory', ['$resource', directionFactory]);
})();