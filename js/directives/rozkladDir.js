(function() {
    'use strict';
    function rozkladDir() {
        return {
            link: function(scope, element, attributes){
            //var map;
            //(function() {
            //    map = new google.maps.Map(document.getElementById('map'), {
            //        center: {lat: -34.397, lng: 150.644},
            //        zoom: 8
            //    });
            //})();

                var map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: -34.397, lng: 150.644},
                    zoom: 8
                });
                return map;
        }
    }}
    angular.module('phonecatApp').directive('rozkladDir', rozkladDir);
})();