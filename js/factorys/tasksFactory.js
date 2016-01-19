(function() {
    'use strict';
    function simpleFactory() {
        return {
            arr: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap', 'NodeJS', 'ExpressJS']
        };
    }
    angular.module('phonecatApp').factory('SimpleFactory', simpleFactory);
})();