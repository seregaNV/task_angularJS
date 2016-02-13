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
                controlIcon.addClass('fa fa-crosshairs fa-2x rozklad_Icon');
                controlUI
                    .attr({title: 'Click to recenter the map'})
                    .attr({id: 'rozklad-controlUI'})
                    .addClass('rozklad_UI')
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
                geoIcon.addClass('fa fa-street-view fa-2x rozklad_Icon');
                geoUI
                    .attr({title: 'Click to find your location'})
                    .attr({id: 'rozklad-geoUI'})
                    .addClass('rozklad_UI')
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

                //scope.$on('mapIsLoad', function(event, args) {
                //    //event.stopPropagation();
                //    var directionsDisplay = new google.maps.DirectionsRenderer;
                //    var directionsService = new google.maps.DirectionsService;
                //    directionsDisplay.setMap(map);
                //    calculateAndDisplayRoute(directionsService, directionsDisplay);
                //    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
                //        directionsService.route({
                //            origin: {lat: 49.2228688, lng: 28.456587499999998},
                //            destination: {lat: 49.23842033794661, lng: 28.408777713775635   },
                //            travelMode: google.maps.TravelMode['DRIVING']
                //        }, function(response, status) {
                //            if (status == google.maps.DirectionsStatus.OK) {
                //                directionsDisplay.setDirections(response);
                //            } else {
                //                window.alert('Directions request failed due to ' + status);
                //            }
                //        });
                //    }
                //});
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
                    .addClass('rozklad_sb_controls')
                    .attr({type: 'text'})
                    .attr({placeholder: 'Search Box'});

                inputElement.insertBefore(mapElement);
                scope.$on('mapIsLoad', function(event, args) {

                    var input = document.getElementById('rozklad-sb-input');

                    var searchBox = new google.maps.places.SearchBox(input);
                    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

                    map.addListener('bounds_changed', function() {
                        searchBox.setBounds(map.getBounds());
                    });

                    var markers = [];
                    searchBox.addListener('places_changed', function() {
                        var places = searchBox.getPlaces();

                        if (places.length == 0) {
                            return;
                        }

                        markers.forEach(function(marker) {
                            marker.setMap(null);
                        });
                        markers = [];

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
                var markers = [];
                var flightPath;
                scope.$on('isLoadToDir', function(event, args) {
                    console.log('isLoadToDir');
                    //console.log('scope.id', scope.$id);
                    var color = 'red';
                    var direct = args.stations;
                    var pathCoordinates = [];
                    if (markers && flightPath) {
                        for (var i = 0; i < markers.length; i++) {
                            markers[i].setMap(null);
                        }
                        markers = [];
                        flightPath.setMap(null);
                    }
                    for (var i = 0; i < direct.length; i++) {
                        var pos = {lat: direct[i].lat, lng: direct[i].lng};
                        var marker = new google.maps.Marker({
                            position: pos,
                            icon: {
                                path: google.maps.SymbolPath.CIRCLE,
                                scale: 5,
                                strokeColor: color
                            },
                            map: map
                        });
                        markers.push(marker);
                        pathCoordinates.push(pos);

                    }
                    flightPath = new google.maps.Polyline({
                        path: pathCoordinates,
                        geodesic: true,
                        strokeColor: color,
                        strokeOpacity: 1.0,
                        strokeWeight: 5
                    });
                    flightPath.setMap(map);
                    //listen();
                    //scope.$on('$destroy', listen);
                });
            }
        }
    }
    function travelTimetableDir() {
        return {
            link: function (scope, element, attributes) {
                var weekdaysContainer, weekendContainer;
                function addMessage(place) {
                    var cont = angular.element('<h3>');
                    cont.addClass('text-center')
                        .text('Данний маршрут не використовується.')
                        .appendTo(place);
                }
                function chackAndStart() {
                    weekdaysContainer = $('#rozklad_timetable_weekdays');
                    weekendContainer = $('#rozklad_timetable_weekend');
                    var weekdays = scope.$parent.responseData.weekdays;
                    var weekend = scope.$parent.responseData.weekend;
                    $.isEmptyObject(weekdays) ? addMessage(weekdaysContainer) : timetablesConstructor(weekdays, weekdaysContainer);
                    $.isEmptyObject(weekend) ? addMessage(weekendContainer) : timetablesConstructor(weekend, weekendContainer);
                }
                function timetablesConstructor(data, place) {
                    var date = new Date();
                    scope.$parent.dateNow = date;
                    var addClassIf = false;
                    var dl_container = angular.element('<dl>');
                    dl_container.addClass('dl-horizontal rozklad_station_timetable');
                    dl_container.appendTo(place);
                    for (var key in data) {
                        var dt_container = angular.element('<dt>');
                        var chackHours = false;
                        dl_container.append(dt_container);
                        dt_container.append(key);
                        if (key < date.getHours()) {
                            dt_container.css({'color': '#777'});
                            chackHours = true;
                        }
                        var dd_container = angular.element('<dd>');

                        if (addClassIf) dd_container.css({'background-color': '#ccc'});
                        addClassIf = !addClassIf;

                        dl_container.append(dd_container);

                        for (var i = 0; i < data[key].timetable.length; i++) {
                            var span_container = angular.element('<span>');
                            var minute = data[key].timetable[i];
                            var chackIndex = data[key].depot.indexOf(minute);
                            if (chackIndex != -1) {
                                span_container.css({'background-color': '#ff7474', 'color': 'black'});
                            }
                            if (((key == date.getHours()) && (minute < date.getMinutes())) || chackHours) span_container.css({'color': '#888'});

                            span_container.append(minute);
                            dd_container.append(span_container);
                        }
                    }
                }
                scope.$watch('responseData', function(newValue, oldValue) {
                    if (weekendContainer && weekdaysContainer) {
                        weekdaysContainer.find('dl, h3').remove();
                        weekendContainer.find('dl, h3').remove();
                    }
                    chackAndStart();
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
        .directive('travelTimetableDir', travelTimetableDir)
})();