/**
 * @ignore  =====================================================================================
 * @file    index
 * @version 1.0.0
 * @author  Damon Liu(damon.liudong@gmail.com)
 * @date    Created at 3:24 PM 20/09/2017
 * @ignore  =====================================================================================
 */
require('./index.css');
// require('leaflet/dist/leaflet.css');
// import {map} from 'leaflet/src/Leaflet';
var L = require('leaflet');
var $ = require('jquery');

var geoJson = require('./geojson.json');
// var geoJson = require('./geojson/1.json');
$(function () {
    var map = L.map('map', {
        center: [10.1, 125.6
            ],
        zoom: 9,
        renderer: L.canvas(),
    });
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    L.geoJSON(geoJson, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).bindPopup(function (layer) {
        return layer.feature.properties.name;
    }).addTo(map);

});