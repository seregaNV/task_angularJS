$(document).ready(function() {
    setTimeout(function(){
        var map;
        if (document.getElementById('map')) {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
            });

        }
        //function initMap() {
        //}
    }, 500)
});