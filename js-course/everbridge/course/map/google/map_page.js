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
        var styles = [
            {
                featureType : 'all',
                stylers : [
                    {saturation : 0}
                ]
            },{
                featureType : 'road.arterial',
                elementType : 'geometry',
                stylers : [
                    {hue : "#FF0000"},
                    {saturation : 50}
                ]
            }
            ,{
                featureType : "poi.business",
                elementType : "labels",
                stylers : [
                    {visibility : "off"}
                ]
            }

        ];
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
                style : google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                mapTypeIds : [google.maps.MapTypeId.ROADMAP,'styled_map']
            },
            overviewMapControl : true,
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            styles : styles
        };
        var mapCanvas = document.getElementById(canvasId);
        detectBrowser(mapCanvas,width,height);
        return new google.maps.Map(mapCanvas,options);
    };
    jc.placeMarker = function placeMarker(map,location) {
        if(!jc.markers){
            jc.markers = [];
        }
        var marker = new google.maps.Marker({
            map : map,
            position:location
        });
        google.maps.event.addListener(marker,'click', function () {
            marker.setMap(null);
        });
        jc.markers.push(marker);
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
            map.setZoom(16);
        });
        this.homeControlDom = homeControlJQDom[0];

    };
    jc.OverLayerControl = function OverLayerControl(map,position) {
        var control = this;
        var overLayerControlJQDom = $('#overLayerControlTemplate').clone().show();
        overLayerControlJQDom.find('button').click(function (e) {
            var j_button = $(e.target);
            if(j_button.hasClass('hide_overlayer')){
                if(jc.markers){
                    $.each(jc.markers,function(i,marker){
                        marker.setMap(null);
                    });
                }
            }else if(j_button.hasClass('show_overlayer')){
                if(jc.markers){
                    $.each(jc.markers,function(i,marker){
                        marker.setMap(map);
                    });
                }
            }else if(j_button.hasClass('remove_overlayer')){
                if(jc.markers){
                    $.each(jc.markers,function(i,marker){
                        marker.setMap(null);
                    });
                }
                jc.markers.length = 0;
            };
        });
        this.overLayerControlDom = overLayerControlJQDom[0];
        map.controls[google.maps.ControlPosition[position]].push(this.overLayerControlDom);
    };
    jc.createHomeControl.prototype.getHome = function () {
        return this.home;
    };
    jc.createHomeControl.prototype.getControlDom = function () {
        return this.homeControlDom;
    }

    jc.createStyledMapType = function (map) {
        var styles = [
            {
                stylers : [
                    {hue : '#00ffe6'},
                    {saturation : -20}
                ]
            },
            {
                featureType : 'road',
                elementType : 'geometry',
                stylers : [
                    {lightness : 100},
                    {visibility : 'simplified'}
                ]
            },
            {
                featureType : 'road',
                elementType : 'labels',
                stylers : [
                    {visibility : 'off'}
                ]
            }
        ];
        var styledMapType = new google.maps.StyledMapType(styles,{name : 'Styled map'});
        map.mapTypes.set('styled_map',styledMapType);
    }



})(js_course);