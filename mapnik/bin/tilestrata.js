var tilestrata = require('tilestrata');
var disk = require('tilestrata-disk');
var sharp = require('tilestrata-sharp');
var mapnik = require('tilestrata-mapnik');
var dependency = require('tilestrata-dependency');

var vtile = require('tilestrata-vtile');
var vtileraster = require('tilestrata-vtile-raster');

var strataServer = tilestrata();
var cachePath = '/Users/damon/Documents/TestData/tiles-cache/basemap';
// define layers
strataServer.layer('basemap')
    .route('*@2x.png')
    .use(disk.cache({dir: cachePath}))
    .use(mapnik({
        pathname: './src/stylesheets/gisResources.1.37m.xml',
        tileSize: 512,
        scale: 2
    }))
    .route('*.png')
    .use(disk.cache({dir: cachePath}))
    .use(dependency('basemap', '*@2x.png'))
    .use(sharp(function (image, sharp) {
        return image.resize(256);
    }));
// define layers
strataServer.layer('basemap_json')
    .route('tile.json')
    .use(mapnik({
        pathname: './src/stylesheets/gisResources.1.37m.xml',
        scale: 1,
        tileSize: 256,
        interactivity: true
    }));

// strata.layer('vector')
//     .route('vector.pbf').use(vtile({
//     xml: './src/stylesheets/gisResources.1.37m.xml',
//     tileSize: 256,
//     metatile: 1,
//     bufferSize: 128
// }));

// start accepting requests
strataServer.listen(8080);