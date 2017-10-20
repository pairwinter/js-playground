/**
 * @ignore  =====================================================================================
 * @file    index
 * @version 1.0.0
 * @author  Damon Liu(damon.liudong@gmail.com)
 * @date    Created at 3:24 PM 20/09/2017
 * @ignore  =====================================================================================
 */
require('./index.css');
import "ol/ol.css";
import Map from "ol/map";
import Tile from "ol/layer/tile";
import View from "ol/view";
import proj from "ol/proj";
import OSM from "ol/source/osm";
import XYZ from "ol/source/xyz";
import TileUTFGrid from "ol/source/tileutfgrid";
// import TileGrid from 'ol/tilegrid/tilegrid';
var $ = require('jquery');
$(function () {
    var mapElement = document.getElementById('map');
    var gridSource = new TileUTFGrid({
        url: 'http://localhost:3520/json_config/utf_json_source.json'
    });
    var view = new View({
        center: proj.fromLonLat([37.41, 8.82]),
        zoom: 4
    });
    var map = new Map({
        target: mapElement,
        layers: [
            new Tile({
                source: new OSM()
            }),
            new Tile({
                source: new XYZ({
                    url: 'http://localhost:3520/basemap/{z}/{x}/{y}.png'
                })
            }),
            new Tile({
                source: gridSource
            }),
            // new VectorLayer({
            //     source: new VectorTile({
            //         attributions: '',
            //         format: new MVT(),
            //         url: 'http://localhost:3520/vector/' + '{z}/{x}/{y}.vector.pbf'
            //     })
            // })

        ],
        view: view
    });
    var displayCountryInfo = function (coordinate) {
        var viewResolution = /** @type {number} */ (view.getResolution());
        gridSource.forDataAtCoordinateAndResolution(coordinate, viewResolution,
            function (data) {
                console.log(data);
                mapElement.style.cursor = data ? 'pointer' : '';
            });
    };

    map.on('pointermove', function (evt) {
        if (evt.dragging) {
            return;
        }
        var coordinate = map.getEventCoordinate(evt.originalEvent);
        displayCountryInfo(coordinate);
    });
});