(function() {
    'use strict';
    var map;
    function rozkladDir() {
        return {
            link: function (scope, element, attributes) {
                map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: 49.229, lng: 28.473},
                    zoom: 13,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,

                    mapTypeControl: true,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                        position: google.maps.ControlPosition.LEFT_TOP
                    },
                    zoomControl: true,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.LEFT_CENTER
                    },
                    scaleControl: true,
                    streetViewControl: true,
                    streetViewControlOptions: {
                        position: google.maps.ControlPosition.LEFT_CENTER
                    }
                });
                scope.$emit('mapIsLoad', {
                    map: map
                });
            }
        }
    }
    function centrationDir() {
        return {
            link: function (scope, element, attributes) {

                var controlIcon = angular.element('<i>');
                var controlUI = angular.element('<div>');
                controlIcon.addClass('fa fa-crosshairs fa-2x rozklad-Icon');
                controlUI
                    .attr({title: 'Click to recenter the map'})
                    .attr({id: 'rozklad-controlUI'})
                    .addClass('rozklad-UI')
                    .append(controlIcon);
                element.find('#map').append(controlUI);
                controlUI.on('click', function() {
                    map.setCenter({lat: 49.229, lng: 28.473});
                    map.setZoom(13);
                });
                //controlUI.index = 1;
                //map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlUI);

            }
        }
    }
    function geoDir() {
        return {
            link: function (scope, element, attributes) {
                var geoExist = false;
                var pos;
                var marker;
                var geoIcon = angular.element('<i>');
                var geoUI = angular.element('<div>');
                geoIcon.addClass('fa fa-street-view fa-2x rozklad-Icon');
                geoUI
                    .attr({title: 'Click to find your location'})
                    .attr({id: 'rozklad-geoUI'})
                    .addClass('rozklad-UI')
                    .append(geoIcon);

                element.find('#map').append(geoUI);
                geoUI.on('click', function() {

                    if (!geoExist) {
                        var infoWindow = new google.maps.InfoWindow({content: 'Your location'});
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                pos = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude
                                };

                                marker = new google.maps.Marker({
                                    map: map,
                                    //icon: {
                                    //    path: google.maps.SymbolPath.CIRCLE,
                                    //    scale: 7,
                                    //    strokeColor: 'red'
                                    //},
                                    place: {
                                        location: pos,
                                        query: 'Google, Vinnica, Ukraine'
                                    }
                                });
                                //marker.setAnimation(google.maps.Animation.DROP);
                                marker.setAnimation(google.maps.Animation.BOUNCE);
                                marker.addListener('click', function() {
                                    infoWindow.open(map, marker);
                                });
                                //infoWindow.setPosition(pos);
                                map.setCenter(pos);
                                geoExist = infoWindow.getContent();
                            }, function () {
                                handleLocationError(true, infoWindow, map.getCenter());
                            });
                        } else {
                            // Browser doesn't support Geolocation
                            handleLocationError(false, infoWindow, map.getCenter());
                        }
                    } else {
                        marker.setMap(null);
                        geoExist = null;
                    }
                    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                        infoWindow.setPosition(pos);
                        infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
                    }
                    map.setCenter(pos);
                });
            }
        }
    }

    function getPositionDir() {
        return {
            link: function (scope, element, attributes) {
                map.addListener('click', function(e) {
                    placeMarkerAndPanTo(e.latLng, map);
                });

                function placeMarkerAndPanTo(latLng, map) {
                    var marker = new google.maps.Marker({
                        position: latLng,
                        draggable: true,
                        map: map
                    });
                    map.panTo(latLng);
                    var infowindow = new google.maps.InfoWindow({
                        content: '<p>Marker Location:' + marker.getPosition() + '</p>'
                    });
                    marker.addListener('click', function(e) {
                        console.log('lat - ', e.latLng.lat());
                        console.log('lng - ', e.latLng.lng());
                        infowindow.open(map, marker);
                    });
                }
            }
        }
    }
    function travelModesDir() {
        return {
            link: function (scope, element, attributes) {

                scope.$on('mapIsLoad', function(event, args) {
                    //event.stopPropagation();
                    var directionsDisplay = new google.maps.DirectionsRenderer;
                    var directionsService = new google.maps.DirectionsService;
                    directionsDisplay.setMap(map);
                    calculateAndDisplayRoute(directionsService, directionsDisplay);
                    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
                        directionsService.route({
                            origin: {lat: 49.2228688, lng: 28.456587499999998},
                            destination: {lat: 49.23842033794661, lng: 28.408777713775635   },
                            travelMode: google.maps.TravelMode['DRIVING']
                        }, function(response, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                directionsDisplay.setDirections(response);
                            } else {
                                window.alert('Directions request failed due to ' + status);
                            }
                        });
                    }
                });
            }
        }
    }
    function searchBoxDir() {
        return {
            link: function (scope, element, attributes) {

                var mapElement = document.getElementById('map');
                var inputElement = angular.element('<input>');
                element.append(inputElement);
                inputElement.attr({id: 'rozklad-sb-input'})
                    .addClass('rozklad-sb-controls')
                    .attr({type: 'text'})
                    .attr({placeholder: 'Search Box'});

                inputElement.insertBefore(mapElement);
                scope.$on('mapIsLoad', function(event, args) {

                    var input = document.getElementById('rozklad-sb-input');

                    var searchBox = new google.maps.places.SearchBox(input);
                    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

                    // Bias the SearchBox results towards current map's viewport.
                    map.addListener('bounds_changed', function() {
                        searchBox.setBounds(map.getBounds());
                    });

                    var markers = [];
                    // [START region_getplaces]
                    // Listen for the event fired when the user selects a prediction and retrieve
                    // more details for that place.
                    searchBox.addListener('places_changed', function() {
                        var places = searchBox.getPlaces();

                        if (places.length == 0) {
                            return;
                        }

                        // Clear out the old markers.
                        markers.forEach(function(marker) {
                            marker.setMap(null);
                        });
                        markers = [];

                        // For each place, get the icon, name and location.
                        var bounds = new google.maps.LatLngBounds();
                        places.forEach(function(place) {
                            var icon = {
                                url: place.icon,
                                size: new google.maps.Size(71, 71),
                                origin: new google.maps.Point(0, 0),
                                anchor: new google.maps.Point(17, 34),
                                scaledSize: new google.maps.Size(25, 25)
                            };

                            // Create a marker for each place.
                            markers.push(new google.maps.Marker({
                                map: map,
                                icon: icon,
                                title: place.name,
                                position: place.geometry.location
                            }));

                            if (place.geometry.viewport) {
                                // Only geocodes have viewport.
                                bounds.union(place.geometry.viewport);
                            } else {
                                bounds.extend(place.geometry.location);
                            }
                        });
                        map.fitBounds(bounds);
                    });
                });
            }
        }
    }
    function travelStationsDir() {
        return {
            link: function (scope, element, attributes) {
                scope.$on('isLoad', function(event, args) {
                    //event.stopPropagation();
                    var color = 'red';
                    var direct = scope.stations;
                    var pathCoordinates = [];
                    var marker;
                    for (var i = 0; i < direct.length; i++) {
                        var pos = {lat: direct[i].lat, lng: direct[i].lng};
                        marker = new google.maps.Marker({
                            position: pos,
                            icon: {
                                path: google.maps.SymbolPath.CIRCLE,
                                scale: 5,
                                strokeColor: color
                            },
                            map: map
                        });
                        pathCoordinates.push(pos)
                    }
                    var flightPath = new google.maps.Polyline({
                        path: pathCoordinates,
                        geodesic: true,
                        strokeColor: color,
                        strokeOpacity: 1.0,
                        strokeWeight: 2
                    });
                    flightPath.setMap(map);
                });

            }
        }
    }
    angular.module('phonecatApp')
        .directive('rozkladDir', rozkladDir)
        .directive('centrationDir', centrationDir)
        .directive('geoDir', geoDir)
        .directive('getPositionDir', getPositionDir)
        .directive('travelModesDir', travelModesDir)
        .directive('searchBoxDir', searchBoxDir)
        .directive('travelStationsDir', travelStationsDir)
})();