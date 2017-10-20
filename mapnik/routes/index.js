var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/utf_json_source', function (req, res, next) {
    var json = {
        "attribution": "",
        "bounds": [
            -180,
            -85.05112877980659,
            180,
            85.05112877980659
        ],
        "center": [
            0,
            0,
            4
        ],
        "created": 1322764050886,
        "description": "One of the example maps that comes with TileMill - a bright & colorful world map that blends retro and high-tech with its folded paper texture and interactive flag tooltips. ",
        "filesize": 134727680,
        "grids": [
            "http://localhost:3520/basemap_json/{z}/{x}/{y}.json"
        ],
        "id": "basemap_json",
        "legend": "",
        "mapbox_logo": true,
        "maxzoom": 8,
        "minzoom": 0,
        "name": "Base Map JSON",
        "private": false,
        "scheme": "xyz",
        "template": "",
        "tilejson": "2.2.0",
        "tiles": [
            "https://b.tiles.mapbox.com/v4/mapbox.geography-class/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiRk1kMWZaSSJ9.E5BkluenyWQMsBLsuByrmg"
        ],
        "version": "1.0.0"
    };

    res.json(json);
});

module.exports = router;
