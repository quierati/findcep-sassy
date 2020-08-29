//contact google map
(function($)
{ 
    if($("#googleMap").length > 0)
    {
        var map;
        var lat = $(".mapHolder").attr('data-lat');
        var lon = $(".mapHolder").attr('data-lon');
        var mark = $(".mapHolder").attr('data-marker');
        
        var myCenter = new google.maps.LatLng(
            lat, lon 
        );
        var marker = new google.maps.Marker({
            position: myCenter,
            icon: mark
        });
        map = new google.maps.Map(document.getElementById('googleMap'), 
        {
            center: myCenter,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{
                    "featureType": "all",
                    "stylers": [
                        {"saturation": -100}
                    ]
                }]
        });
        marker.setMap(map); 
    }
})(jQuery);