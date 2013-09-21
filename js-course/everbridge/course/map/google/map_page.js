(function(jc){
    function detectBrowser(mapDiv,width,height) {
        var useragent = navigator.userAgent;
        if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
            mapDiv.style.width = '100%';
            mapDiv.style.height = '100%';
        }else{
             mapDiv.style.width = (/%$/.test(width))?width:(width + 'px');
             mapDiv.style.height = (/%$/.test(height))?height:(height + 'px');
        }

    }
    jc.createMap = function(canvasId,width,height){
        var options = {
            center : new google.maps.LatLng(-34.0,150),
            zoom : 8,
//            disableDefaultUI:true,//hidden the ui of map control , not disable the function of mouse event and key event
            panControl : false,
            zoomControl : true,
            zoomControlOptions: {
                style : google.maps.ZoomControlStyle.SMALL,
                position : google.maps.ControlPosition.TOP_RIGHT
            },
            mapTypeControlOptions : {
                style : google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            overviewMapControl : true,

            mapTypeId : google.maps.MapTypeId.ROADMAP
        };
        var mapCanvas = document.getElementById(canvasId);
        detectBrowser(mapCanvas,width,height);
        return new google.maps.Map(mapCanvas,options);
    }
    jc.createMarker = function createMarker(map,position) {
        var marker = new google.maps.Marker({
            map : map,
            position : map.getCenter(),
            title : 'click to zoom'
        });
        google.maps.event.addListener(marker,'click', function () {
            this.map.setZoom(8);
            map.setCenter(this.getPosition());
        });
    };
    jc.placeMarker = function placeMarker(map,location) {
        var marker = new google.maps.Marker({
            map : map,
            position:location
        });
        return marker;
    };
    jc.attachMarkerMessage = function attachMakerMessage(marker, msg) {
        var infowindow = new google.maps.InfoWindow({
            content : msg,
            size : new google.maps.Size(50,50)
        });
        google.maps.event.addListener(marker,'mouseover', function () {
            infowindow.open(this.map,marker);
        });
        google.maps.event.addListener(marker,'mouseout',function(){
            infowindow.close();
        })
    };
    jc.placeMultMarker = function placeMultMarker(map,markersCount) {
        var southWest = new google.maps.LatLng(-31,125);
        var northEast = new google.maps.LatLng(-25,131);
        var bounds = new google.maps.LatLngBounds(southWest,northEast);
        map.fitBounds(bounds);
        var lngSpan = southWest.lng() - northEast.lng();
        var latSpan = southWest.lat() - northEast.lat();
        for (var i = 0; i < markersCount; i++) {
            var location = new google.maps.LatLng(southWest.lat()+latSpan * Math.random(),northEast.lng()+lngSpan * Math.random());
            var marker = jc.placeMarker(map,location);
            var title = (i+1)+'';
            jc.attachMarkerMessage(marker,title);
        }
    };
    jc.createHomeControl = function createHomeControl(map,homeLatLng) {
        this.home = homeLatLng;
        var control = this;
        var homeControlJQDom = $('#homeControlTemplate').clone().show();
        homeControlJQDom.find('button').click(function () {
            map.panTo(control.getHome());
            map.setZoom(5);
        });
        this.homeControlDom = homeControlJQDom[0];

    };
    jc.createHomeControl.prototype.getHome = function () {
        return this.home;
    };
    jc.createHomeControl.prototype.getControlDom = function () {
        return this.homeControlDom;
    }

})(js_course);