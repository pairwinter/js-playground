(function(view){
    view.universe= view.universe || {};
    view.universe.loadMapData=function(data){
        var layers = [];
        var defaultLayer = null;
        var layer_obj = data.defaultLayer;
        if (layer_obj.type == ("GMAP")) {
            if (layer_obj.provider && layer_obj.provider.parameters && layer_obj.provider.parameters.type) {
                var type = null;
                switch (layer_obj.provider.parameters.type) {
                    case "street" : type = window.google.maps.MapTypeId.ROADMAP;break;
                    case "terrain" :type = window.google.maps.MapTypeId.TERRAIN; break;
                    case "hybrid" :type = window.google.maps.MapTypeId.HYBRID;break;
                    case "satellite" :type = window.google.maps.MapTypeId.SATELLITE;
                }
                if (type) {
                    defaultLayer = new OpenLayers.Layer.Google(layer_obj.description, {
                        'type': type, 'isBaseLayer': layer_obj.baseLayer, 'buffer': 1, 'visibility': layer_obj.visible, 'animationEnabled' : false
                    });
                }
            }
        } else if (layer_obj.type == "OSM") {
            defaultLayer = new OpenLayers.Layer.OSM(null, null, {'visibility': layer_obj.visible});
        } else if (layer_obj.type == "ESRI") {
            var center = layer_obj.bounds.center;
            if (layer_obj.provider && layer_obj.provider.parameters && layer_obj.provider.parameters.url) {
                defaultLayer =new OpenLayers.Layer.XYZ(layer_obj.description, layer_obj.provider.parameters.url,{'sphericalMercator':true, 'buffer': 1, 'isBaseLayer': layer_obj.baseLayer, 'visibility': layer_obj.visible});
            }
        } else if (layer_obj.type == "BING") {
            if (layer_obj.provider && layer_obj.provider.parameters && layer_obj.provider.parameters.key) {
                defaultLayer = new OpenLayers.Layer.Bing({'isBaseLayer': layer_obj.baseLayer, 'key': layer_obj.provider.parameters.key, 'visibility': layer_obj.visible});
            }
        } else if (layer_obj.type === "XYZ") {
            defaultLayer = new OpenLayers.Layer.XYZ(layer_obj.description, layer_obj.url,{'sphericalMercator':true, 'buffer': 1, 'isBaseLayer': layer_obj.baseLayer, 'visibility': layer_obj.visible});
            defaultLayer.serverResolutions = default_server_resolutions;
            if (layer_obj.provider.name === 'mapnik') {
                // If this layer contains a UTF layer, make sure it gets added as an overlay
                if (layer_obj.utflayer) {
                    var utf_url = layer_obj.utflayer.url;
                    var utf_layer = new OpenLayers.Layer.UTFGrid({
                        url: utf_url,
                        utfgridResolution: 4,
                        displayInLayerSwitcher: false,
                        useJSONP: true
                    });
                    utf_layer.serverResolutions = default_server_resolutions;
                    layers.push(utf_layer);
                    utf_added = true;
                }
            }
        }
        var eb_zoom_level_to_real = {
            0: 3,
            1: 6,
            2: 9,
            3: 12,
            4: 15
        };
        var mapOption={
            div: "map",
            theme:"",
            allOverlays: false,
            controls:[],
            layers: layers,
            numZoomLevels:19,
            zoom: eb_zoom_level_to_real[defaultZoomLevel+""],
            projection: spherical_mercator_proj
        };
        map = new OpenLayers.Map(mapOption);
        layers.push(defaultLayer);
        var selectStyle = new OpenLayers.Style({
            fillColor:"blue",fillOpacity: 0.3
        });
        var colors = ["#EEA41E", "RED"];
        var context = {
            getColor: function(feature) {
                if(feature.isInclude)
                    return colors[0];
                else
                    return colors[1];
            }
        };
        var template = {
            fillColor: "${getColor}",// using context.getColor(feature)
            fillOpacity: 0.3,
            pointRadius:3,
            strokeWidth: 1,
            strokeColor:"${getColor}"
        };
        var style = new OpenLayers.Style(template, {context: context});
        var polygonStyleOptions = new OpenLayers.StyleMap({"Point": {pointRadius: 5},'select': selectStyle});
        var polygonsLayer = new OpenLayers.Layer.Vector("PolygonsLayer",{styleMap:new OpenLayers.StyleMap(style)});
        layers.push(polygonsLayer);
        map.addLayers(layers);
        map.setBaseLayer(defaultLayer);
        map.addControls([new OpenLayers.Control.Navigation(),new OpenLayers.Control.Zoom()]);
        map.setCenter(new OpenLayers.LonLat(defaultCenterLon, defaultCenterLat).transform(
            new OpenLayers.Projection("EPSG:4326"),
            map.getProjectionObject()
        ));

        map.features = [];
        if(!data.searchShapes)
            return;
        for (var i=0; i<data.searchShapes.length; i++) {
            var shape = data.searchShapes[i].shape;
            var points = shape.points;
            var shape_points=[];
            for (var j=0; j<points.length; j++) {
                var point = new OpenLayers.Geometry.Point(points[j].x, points[j].y);
                point.transform(latlon_proj, map.getProjectionObject());
                shape_points.push(point);
                if (j == 0) {
                    zoom_to_point = new OpenLayers.LonLat(points[j].x, points[j].y).transform(latlon_proj,map.getProjectionObject());
                }
            }
            var linear_ring = new OpenLayers.Geometry.LinearRing(shape_points);
            var polygon = new OpenLayers.Geometry.Polygon([linear_ring]);
            var polygon_feature = new OpenLayers.Feature.Vector(polygon);
            polygon_feature.isInclude = shape.isInclude;
            map.features.push(polygon_feature);
        }
        polygonsLayer.addFeatures(map.features);
        map.setCenter(zoom_to_point);
        EB_Common.logger.log(map.getZoom());
    };
})(EB_View);