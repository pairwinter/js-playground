/**
 * Created with JetBrains WebStorm.
 * User: pairwinter
 * Date: 14-3-27
 * Time: 下午7:21
 * To change this template use File | Settings | File Templates.
 */
var WorldImageryLayerInfo ={
    "spatialReference" : {
        "wkid" : 102100
    },
    "singleFusedMapCache" : true,
        "tileInfo" : {
        "rows" : 256,
            "cols" : 256,
            "dpi" : 96,
            "format" : "JPEG",
            "compressionQuality" : 90,
            "origin" : {
            "x" : -20037508.342787,
                "y" : 20037508.342787
        },
        "spatialReference" : {
            "wkid" : 102100
        },
        "lods" : [
            {"level" : 0, "resolution" : 156543.033928, "scale" : 591657527.591555},
            {"level" : 1, "resolution" : 78271.5169639999, "scale" : 295828763.795777},
            {"level" : 2, "resolution" : 39135.7584820001, "scale" : 147914381.897889},
            {"level" : 3, "resolution" : 19567.8792409999, "scale" : 73957190.948944},
            {"level" : 4, "resolution" : 9783.93962049996, "scale" : 36978595.474472},
            {"level" : 5, "resolution" : 4891.96981024998, "scale" : 18489297.737236},
            {"level" : 6, "resolution" : 2445.98490512499, "scale" : 9244648.868618},
            {"level" : 7, "resolution" : 1222.99245256249, "scale" : 4622324.434309},
            {"level" : 8, "resolution" : 611.49622628138, "scale" : 2311162.217155},
            {"level" : 9, "resolution" : 305.748113140558, "scale" : 1155581.108577},
            {"level" : 10, "resolution" : 152.874056570411, "scale" : 577790.554289},
            {"level" : 11, "resolution" : 76.4370282850732, "scale" : 288895.277144},
            {"level" : 12, "resolution" : 38.2185141425366, "scale" : 144447.638572},
            {"level" : 13, "resolution" : 19.1092570712683, "scale" : 72223.819286},
            {"level" : 14, "resolution" : 9.55462853563415, "scale" : 36111.909643},
            {"level" : 15, "resolution" : 4.77731426794937, "scale" : 18055.954822},
            {"level" : 16, "resolution" : 2.38865713397468, "scale" : 9027.977411},
            {"level" : 17, "resolution" : 1.19432856685505, "scale" : 4513.988705}
        ]
    },
    "initialExtent" : {
        "xmin" : -20037507.0671618,
            "ymin" : -20037507.0671618,
            "xmax" : 20037507.0671618,
            "ymax" : 20037507.0671619,
            "spatialReference" : {
            "wkid" : 102100
        }
    },
    "fullExtent" : {
        "xmin" : -20037507.0671618,
            "ymin" : -19971868.8804086,
            "xmax" : 20037507.0671618,
            "ymax" : 19971868.8804086,
            "spatialReference" : {
            "wkid" : 102100
        }
    },
    "units" : "esriMeters",
        "supportedImageFormatTypes" : "PNG24,PNG,JPG,DIB,TIFF,EMF,PS,PDF,GIF,SVG,SVGZ,AI,BMP",
        "documentInfo" : {
        "Title" : "World Street Map",
            "Author" : "ESRI",
            "Comments" : "",
            "Subject" : "streets, highways, major roads, railways, water features, administrative boundaries, cities, parks, protected areas, landmarks ",
            "Category" : "transportation(Transportation Networks) ",
            "Keywords" : "World, Global, 2009, Japan, UNEP-WCMC",
            "Credits" : ""
    },
    "capabilities" : "Map"
};
var Terrain_Base_tiled_LayerOptions = {
    "serviceDescription" : "",
    "mapName" : "Layers",
    "description" : "",
    "copyrightText" : "",
    "layers" : [
        {
            "id" : 0,
            "name" : "1:80000",
            "parentLayerId" : -1,
            "defaultVisibility" : true,
            "subLayerIds" : [1, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            "id" : 1,
            "name" : "Neighborhoods",
            "parentLayerId" : 0,
            "defaultVisibility" : true,
            "subLayerIds" : [2]
        },
        {
            "id" : 2,
            "name" : "Default",
            "parentLayerId" : 1,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 3,
            "name" : "Shaded Relief",
            "parentLayerId" : 0,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 4,
            "name" : "Neighborhoods",
            "parentLayerId" : 0,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 5,
            "name" : "Bridges",
            "parentLayerId" : 0,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 6,
            "name" : "Airport",
            "parentLayerId" : 0,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 7,
            "name" : "Water",
            "parentLayerId" : 0,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 8,
            "name" : "Open Space",
            "parentLayerId" : 0,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 9,
            "name" : "Boston Land",
            "parentLayerId" : 0,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 10,
            "name" : "Metro Towns",
            "parentLayerId" : 0,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 11,
            "name" : "1:40000",
            "parentLayerId" : -1,
            "defaultVisibility" : true,
            "subLayerIds" : [12, 14, 15, 16, 17, 18, 19, 20, 21]
        },
        {
            "id" : 12,
            "name" : "Neighborhoods",
            "parentLayerId" : 11,
            "defaultVisibility" : true,
            "subLayerIds" : [13]
        },
        {
            "id" : 13,
            "name" : "Default",
            "parentLayerId" : 12,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 14,
            "name" : "Shaded Relief",
            "parentLayerId" : 11,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 15,
            "name" : "Bridges",
            "parentLayerId" : 11,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 16,
            "name" : "Airport",
            "parentLayerId" : 11,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 17,
            "name" : "Water",
            "parentLayerId" : 11,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 18,
            "name" : "Open Space",
            "parentLayerId" : 11,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 19,
            "name" : "City Blocks",
            "parentLayerId" : 11,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 20,
            "name" : "Boston Land",
            "parentLayerId" : 11,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 21,
            "name" : "Metro Towns",
            "parentLayerId" : 11,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 22,
            "name" : "1:20000",
            "parentLayerId" : -1,
            "defaultVisibility" : true,
            "subLayerIds" : [23, 25, 27, 28, 29, 30, 31, 32, 33, 34]
        },
        {
            "id" : 23,
            "name" : "Street Names",
            "parentLayerId" : 22,
            "defaultVisibility" : true,
            "subLayerIds" : [24]
        },
        {
            "id" : 24,
            "name" : "Default",
            "parentLayerId" : 23,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 25,
            "name" : "Neighborhoods",
            "parentLayerId" : 22,
            "defaultVisibility" : true,
            "subLayerIds" : [26]
        },
        {
            "id" : 26,
            "name" : "Default",
            "parentLayerId" : 25,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 27,
            "name" : "Shaded Relief",
            "parentLayerId" : 22,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 28,
            "name" : "Bridges",
            "parentLayerId" : 22,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 29,
            "name" : "Airport",
            "parentLayerId" : 22,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 30,
            "name" : "Water",
            "parentLayerId" : 22,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 31,
            "name" : "Open Space",
            "parentLayerId" : 22,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 32,
            "name" : "City Blocks",
            "parentLayerId" : 22,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 33,
            "name" : "Boston Land",
            "parentLayerId" : 22,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 34,
            "name" : "Metro Towns",
            "parentLayerId" : 22,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 35,
            "name" : "1:10000",
            "parentLayerId" : -1,
            "defaultVisibility" : true,
            "subLayerIds" : [36, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]
        },
        {
            "id" : 36,
            "name" : "Street Names",
            "parentLayerId" : 35,
            "defaultVisibility" : true,
            "subLayerIds" : [37]
        },
        {
            "id" : 37,
            "name" : "Default",
            "parentLayerId" : 36,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 38,
            "name" : "Buildings",
            "parentLayerId" : 35,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 39,
            "name" : "Buildings Shadow",
            "parentLayerId" : 35,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 40,
            "name" : "Shaded Relief",
            "parentLayerId" : 35,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 41,
            "name" : "Bridges",
            "parentLayerId" : 35,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 42,
            "name" : "Airport",
            "parentLayerId" : 35,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 43,
            "name" : "Water",
            "parentLayerId" : 35,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 44,
            "name" : "Open Space",
            "parentLayerId" : 35,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 45,
            "name" : "City Blocks",
            "parentLayerId" : 35,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 46,
            "name" : "Boston Land",
            "parentLayerId" : 35,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 47,
            "name" : "Metro Towns",
            "parentLayerId" : 35,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 48,
            "name" : "1:5000",
            "parentLayerId" : -1,
            "defaultVisibility" : true,
            "subLayerIds" : [49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61]
        },
        {
            "id" : 49,
            "name" : "Street Names",
            "parentLayerId" : 48,
            "defaultVisibility" : true,
            "subLayerIds" : [50]
        },
        {
            "id" : 50,
            "name" : "Default",
            "parentLayerId" : 49,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 51,
            "name" : "Buildings",
            "parentLayerId" : 48,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 52,
            "name" : "Buildings Shadow",
            "parentLayerId" : 48,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 53,
            "name" : "Shaded Relief",
            "parentLayerId" : 48,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 54,
            "name" : "Bridges",
            "parentLayerId" : 48,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 55,
            "name" : "Airport",
            "parentLayerId" : 48,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 56,
            "name" : "Water",
            "parentLayerId" : 48,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 57,
            "name" : "Open Space Paths",
            "parentLayerId" : 48,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 58,
            "name" : "Open Space",
            "parentLayerId" : 48,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 59,
            "name" : "City Blocks",
            "parentLayerId" : 48,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 60,
            "name" : "Boston Land",
            "parentLayerId" : 48,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 61,
            "name" : "Metro Towns",
            "parentLayerId" : 48,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 62,
            "name" : "1:2500",
            "parentLayerId" : -1,
            "defaultVisibility" : true,
            "subLayerIds" : [63, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75]
        },
        {
            "id" : 63,
            "name" : "Streets Names",
            "parentLayerId" : 62,
            "defaultVisibility" : true,
            "subLayerIds" : [64]
        },
        {
            "id" : 64,
            "name" : "Default",
            "parentLayerId" : 63,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 65,
            "name" : "Buildings",
            "parentLayerId" : 62,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 66,
            "name" : "Buildings Shadow",
            "parentLayerId" : 62,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 67,
            "name" : "Shaded Relief",
            "parentLayerId" : 62,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 68,
            "name" : "Bridges",
            "parentLayerId" : 62,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 69,
            "name" : "Airport",
            "parentLayerId" : 62,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 70,
            "name" : "Water",
            "parentLayerId" : 62,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 71,
            "name" : "Open Space Paths",
            "parentLayerId" : 62,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 72,
            "name" : "Open Space",
            "parentLayerId" : 62,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 73,
            "name" : "City Blocks",
            "parentLayerId" : 62,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 74,
            "name" : "Boston Land",
            "parentLayerId" : 62,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 75,
            "name" : "Metro Towns",
            "parentLayerId" : 62,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 76,
            "name" : "1:1250",
            "parentLayerId" : -1,
            "defaultVisibility" : true,
            "subLayerIds" : [77, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91]
        },
        {
            "id" : 77,
            "name" : "Street Names",
            "parentLayerId" : 76,
            "defaultVisibility" : true,
            "subLayerIds" : [78]
        },
        {
            "id" : 78,
            "name" : "Default",
            "parentLayerId" : 77,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 79,
            "name" : "Street Numbers",
            "parentLayerId" : 76,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 80,
            "name" : "Buildings",
            "parentLayerId" : 76,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 81,
            "name" : "Buildings Shadow",
            "parentLayerId" : 76,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 82,
            "name" : "Parcels",
            "parentLayerId" : 76,
            "defaultVisibility" : false,
            "subLayerIds" : null
        },
        {
            "id" : 83,
            "name" : "Shaded Relief",
            "parentLayerId" : 76,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 84,
            "name" : "Bridges",
            "parentLayerId" : 76,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 85,
            "name" : "Airport",
            "parentLayerId" : 76,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 86,
            "name" : "Water",
            "parentLayerId" : 76,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 87,
            "name" : "Open Space Paths",
            "parentLayerId" : 76,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 88,
            "name" : "Open Space",
            "parentLayerId" : 76,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 89,
            "name" : "City Blocks",
            "parentLayerId" : 76,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 90,
            "name" : "Boston Land",
            "parentLayerId" : 76,
            "defaultVisibility" : true,
            "subLayerIds" : null
        },
        {
            "id" : 91,
            "name" : "Metro Towns",
            "parentLayerId" : 76,
            "defaultVisibility" : true,
            "subLayerIds" : null
        }
    ],
    "spatialReference" : {
        "wkid" : 2249
    },
    "singleFusedMapCache" : true,
    "tileInfo" : {
        "rows" : 512,
        "cols" : 512,
        "dpi" : 96,
        "format" : "PNG24",
        "compressionQuality" : 0,
        "origin" : {
            "x" : -119851500,
            "y" : 146517200
        },
        "spatialReference" : {
            "wkid" : 2249
        },
        "lods" : [
            {"level" : 0, "resolution" : 104.166666666667, "scale" : 120000},
            {"level" : 1, "resolution" : 69.4444444444444, "scale" : 80000},
            {"level" : 2, "resolution" : 34.7222222222222, "scale" : 40000},
            {"level" : 3, "resolution" : 17.3611111111111, "scale" : 20000},
            {"level" : 4, "resolution" : 8.68055555555556, "scale" : 10000},
            {"level" : 5, "resolution" : 4.34027777777778, "scale" : 5000},
            {"level" : 6, "resolution" : 2.17013888888889, "scale" : 2500},
            {"level" : 7, "resolution" : 1.08506944444444, "scale" : 1250},
            {"level" : 8, "resolution" : 0.542534722222222, "scale" : 625}
        ]
    },
    "initialExtent" : {
        "xmin" : 729129.38958275,
        "ymin" : 2910346.78543791,
        "xmax" : 796976.611804972,
        "ymax" : 2965971.78543791,
        "spatialReference" : {
            "wkid" : 2249
        }
    },
    "fullExtent" : {
        "xmin" : 673086.947001328,
        "ymin" : 2861445.35134159,
        "xmax" : 881022.678613744,
        "ymax" : 3031305.32870194,
        "spatialReference" : {
            "wkid" : 2249
        }
    },
    "units" : "esriFeet",
    "documentInfo" : {
        "Title" : "Copy_of_Bos_Simple_Base_92",
        "Author" : "gregk",
        "Comments" : "",
        "Subject" : "",
        "Category" : "",
        "Keywords" : ""
    }
};
var LETAMapsLayerOpentions = {
    "currentVersion": 10.05,
    "serviceDescription": "Larimer Emergency Telephone Assoc - New",
    "mapName": "Layers",
    "description": "",
    "copyrightText": "",
    "layers": [
        {
            "id": 0,
            "name": "Road Centerlines",
            "parentLayerId": -1,
            "defaultVisibility": true,
            "subLayerIds": [1, 2, 3, 4, 5, 6, 7],
            "minScale": 0,
            "maxScale": 0
        },
        {
            "id": 1,
            "name": "Road Centerlines",
            "parentLayerId": 0,
            "defaultVisibility": true,
            "subLayerIds": null,
            "minScale": 2256,
            "maxScale": 0
        },
        {
            "id": 2,
            "name": "Road Centerlines",
            "parentLayerId": 0,
            "defaultVisibility": true,
            "subLayerIds": null,
            "minScale": 13540,
            "maxScale": 2257
        },
        {
            "id": 3,
            "name": "Road Centerlines",
            "parentLayerId": 0,
            "defaultVisibility": true,
            "subLayerIds": null,
            "minScale": 72223,
            "maxScale": 13541
        },
        {
            "id": 4,
            "name": "Road Centerlines",
            "parentLayerId": 0,
            "defaultVisibility": true,
            "subLayerIds": null,
            "minScale": 144447,
            "maxScale": 72224
        },
        {
            "id": 5,
            "name": "Road Centerlines",
            "parentLayerId": 0,
            "defaultVisibility": true,
            "subLayerIds": null,
            "minScale": 577790,
            "maxScale": 144448
        },
        {
            "id": 6,
            "name": "Road Centerlines",
            "parentLayerId": 0,
            "defaultVisibility": true,
            "subLayerIds": null,
            "minScale": 0,
            "maxScale": 577791
        },
        {
            "id": 7,
            "name": "Misc Roads",
            "parentLayerId": 0,
            "defaultVisibility": true,
            "subLayerIds": null,
            "minScale": 0,
            "maxScale": 0
        },
        {
            "id": 8,
            "name": "Zipcode",
            "parentLayerId": -1,
            "defaultVisibility": true,
            "subLayerIds": null,
            "minScale": 0,
            "maxScale": 0
        },
        {
            "id": 9,
            "name": "ESN",
            "parentLayerId": -1,
            "defaultVisibility": true,
            "subLayerIds": null,
            "minScale": 0,
            "maxScale": 0
        },
        {
            "id": 10,
            "name": "City",
            "parentLayerId": -1,
            "defaultVisibility": true,
            "subLayerIds": null,
            "minScale": 0,
            "maxScale": 0
        },
        {
            "id": 11,
            "name": "EMS",
            "parentLayerId": -1,
            "defaultVisibility": true,
            "subLayerIds": null,
            "minScale": 0,
            "maxScale": 0
        },
        {
            "id": 12,
            "name": "Fire",
            "parentLayerId": -1,
            "defaultVisibility": true,
            "subLayerIds": null,
            "minScale": 0,
            "maxScale": 0
        },
        {
            "id": 13,
            "name": "Law",
            "parentLayerId": -1,
            "defaultVisibility": true,
            "subLayerIds": null,
            "minScale": 0,
            "maxScale": 0
        },
        {
            "id": 14,
            "name": "Map Index",
            "parentLayerId": -1,
            "defaultVisibility": true,
            "subLayerIds": null,
            "minScale": 0,
            "maxScale": 0
        }
    ],
    "tables": [

    ],
    "spatialReference": {
        "wkid": 2231
    },
    "singleFusedMapCache": false,
    "initialExtent": {
        "xmin": 2788513.13968764,
        "ymin": 1269247.72312155,
        "xmax": 3217136.69485617,
        "ymax": 1650150.90253912,
        "spatialReference": {
            "wkid": 2231
        }
    },
    "fullExtent": {
        "xmin": 2783201.20361031,
        "ymin": 1263749.29394311,
        "xmax": 3271707.62271462,
        "ymax": 1627205.87889978,
        "spatialReference": {
            "wkid": 2231
        }
    },
    "units": "esriFeet",
    "supportedImageFormatTypes": "PNG24,PNG,JPG,DIB,TIFF,EMF,PS,PDF,GIF,SVG,SVGZ,AI,BMP",
    "documentInfo": {
        "Title": "Leta",
        "Author": "Administrator",
        "Comments": "",
        "Subject": "",
        "Category": "",
        "Keywords": "",
        "Credits": ""
    },
    "capabilities": "Map,Query,Data"
};
