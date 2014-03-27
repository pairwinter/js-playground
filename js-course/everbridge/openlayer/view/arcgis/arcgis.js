/**
 * Created with JetBrains WebStorm.
 * User: pairwinter
 * Date: 14-3-27
 * Time: 下午7:21
 * To change this template use File | Settings | File Templates.
 */
var Terrain_Base_tiled_LayerOptions = {
  "serviceDescription" : "",
  "mapName" : "Tax Sheet Production",
  "description" : "",
  "copyrightText" : "",
  "layers" : [
    {
      "id" : 0,
      "name" : "Right of Way",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 1,
      "name" : "Parcels",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 2,
      "name" : "Borough Boundary",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 3,
      "name" : "Address",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : [4]
    },
    {
      "id" : 4,
      "name" : "Default",
      "parentLayerId" : 3,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 5,
      "name" : "Buildings",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 6,
      "name" : "town_line",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 7,
      "name" : "railroad",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 8,
      "name" : "Planimetric Lines",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 9,
      "name" : "Planimetric Areas",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 10,
      "name" : "Roads",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 11,
      "name" : "Hydro_Names",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : [12]
    },
    {
      "id" : 12,
      "name" : "Annotation Class 1",
      "parentLayerId" : 11,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 13,
      "name" : "Water Features - line",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 14,
      "name" : "Water Features - poly",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 15,
      "name" : "Fire_Station_Poly",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 16,
      "name" : "Golf_Courses_Poly",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 17,
      "name" : "Mystic_Aquarium",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 18,
      "name" : "mystic_seaport",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 19,
      "name" : "olde_mystic_village",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 20,
      "name" : "pequotsepos_nature_center",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 21,
      "name" : "Police_Dept_Poly",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 22,
      "name" : "Schools_poly",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 23,
      "name" : "Barn_Island_Poly",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    },
    {
      "id" : 24,
      "name" : "Town_Hall_poly",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null
    }
  ],
  "spatialReference" : {
    "wkid" : 2234
  },
  "singleFusedMapCache" : true,
  "tileInfo" : {
    "rows" : 256,
    "cols" : 256,
    "dpi" : 96,
    "format" : "JPEG",
    "compressionQuality" : 75,
    "origin" : {
      "x" : -119756300,
      "y" : 145170100
    },
    "spatialReference" : {
      "wkid" : 2234
    },
    "lods" : [
      {"level" : 0, "resolution" : 78.125, "scale" : 90000},
      {"level" : 1, "resolution" : 31.25, "scale" : 36000},
      {"level" : 2, "resolution" : 20.8333333333333, "scale" : 24000},
      {"level" : 3, "resolution" : 15.625, "scale" : 18000},
      {"level" : 4, "resolution" : 10.4166666666667, "scale" : 12000},
      {"level" : 5, "resolution" : 8.33333333333333, "scale" : 9600},
      {"level" : 6, "resolution" : 5.20833333333333, "scale" : 6000},
      {"level" : 7, "resolution" : 4.16666666666667, "scale" : 4800},
      {"level" : 8, "resolution" : 3.125, "scale" : 3600},
      {"level" : 9, "resolution" : 2.08333333333333, "scale" : 2400},
      {"level" : 10, "resolution" : 1.5625, "scale" : 1800},
      {"level" : 11, "resolution" : 1.04166666666667, "scale" : 1200},
      {"level" : 12, "resolution" : 0.78125, "scale" : 900},
      {"level" : 13, "resolution" : 0.520833333333333, "scale" : 600},
      {"level" : 14, "resolution" : 0.416666666666667, "scale" : 480},
      {"level" : 15, "resolution" : 0.208333333333333, "scale" : 240}
    ]
  },
  "initialExtent" : {
    "xmin" : 1072415.02423319,
    "ymin" : 591886.111041711,
    "xmax" : 1386672.3349461,
    "ymax" : 834973.38374023,
    "spatialReference" : {
      "wkid" : 2234
    }
  },
  "fullExtent" : {
    "xmin" : 1208754.33338469,
    "ymin" : 670941.277425002,
    "xmax" : 1255525.98410345,
    "ymax" : 722338.938829664,
    "spatialReference" : {
      "wkid" : 2234
    }
  },
  "units" : "esriFeet",
  "supportedImageFormatTypes" : "PNG24,PNG,JPG,DIB,TIFF,EMF,PS,PDF,GIF,SVG,SVGZ,AI",
  "documentInfo" : {
    "Title" : "Basemap",
    "Author" : "negeo",
    "Comments" : "",
    "Subject" : "",
    "Category" : "",
    "Keywords" : ""
  }
};
var LETAMapsLayerOpentions = {
  "currentVersion" : 10.05,
  "serviceDescription" : "Larimer Emergency Telephone Assoc - New",
  "mapName" : "Layers",
  "description" : "",
  "copyrightText" : "",
  "layers" : [
    {
      "id" : 0,
      "name" : "Road Centerlines",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : [1, 2, 3, 4, 5, 6, 7],
      "minScale" : 0,
      "maxScale" : 0
    },
    {
      "id" : 1,
      "name" : "Road Centerlines",
      "parentLayerId" : 0,
      "defaultVisibility" : true,
      "subLayerIds" : null,
      "minScale" : 2256,
      "maxScale" : 0
    },
    {
      "id" : 2,
      "name" : "Road Centerlines",
      "parentLayerId" : 0,
      "defaultVisibility" : true,
      "subLayerIds" : null,
      "minScale" : 13540,
      "maxScale" : 2257
    },
    {
      "id" : 3,
      "name" : "Road Centerlines",
      "parentLayerId" : 0,
      "defaultVisibility" : true,
      "subLayerIds" : null,
      "minScale" : 72223,
      "maxScale" : 13541
    },
    {
      "id" : 4,
      "name" : "Road Centerlines",
      "parentLayerId" : 0,
      "defaultVisibility" : true,
      "subLayerIds" : null,
      "minScale" : 144447,
      "maxScale" : 72224
    },
    {
      "id" : 5,
      "name" : "Road Centerlines",
      "parentLayerId" : 0,
      "defaultVisibility" : true,
      "subLayerIds" : null,
      "minScale" : 577790,
      "maxScale" : 144448
    },
    {
      "id" : 6,
      "name" : "Road Centerlines",
      "parentLayerId" : 0,
      "defaultVisibility" : true,
      "subLayerIds" : null,
      "minScale" : 0,
      "maxScale" : 577791
    },
    {
      "id" : 7,
      "name" : "Misc Roads",
      "parentLayerId" : 0,
      "defaultVisibility" : true,
      "subLayerIds" : null,
      "minScale" : 0,
      "maxScale" : 0
    },
    {
      "id" : 8,
      "name" : "Zipcode",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null,
      "minScale" : 0,
      "maxScale" : 0
    },
    {
      "id" : 9,
      "name" : "ESN",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null,
      "minScale" : 0,
      "maxScale" : 0
    },
    {
      "id" : 10,
      "name" : "City",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null,
      "minScale" : 0,
      "maxScale" : 0
    },
    {
      "id" : 11,
      "name" : "EMS",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null,
      "minScale" : 0,
      "maxScale" : 0
    },
    {
      "id" : 12,
      "name" : "Fire",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null,
      "minScale" : 0,
      "maxScale" : 0
    },
    {
      "id" : 13,
      "name" : "Law",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null,
      "minScale" : 0,
      "maxScale" : 0
    },
    {
      "id" : 14,
      "name" : "Map Index",
      "parentLayerId" : -1,
      "defaultVisibility" : true,
      "subLayerIds" : null,
      "minScale" : 0,
      "maxScale" : 0
    }
  ],
  "tables" : [

  ],
  "spatialReference" : {
    "wkid" : 2231
  },
  "singleFusedMapCache" : false,
  "initialExtent" : {
    "xmin" : 2788513.13968764,
    "ymin" : 1269247.72312155,
    "xmax" : 3217136.69485617,
    "ymax" : 1650150.90253912,
    "spatialReference" : {
      "wkid" : 2231
    }
  },
  "fullExtent" : {
    "xmin" : 2783201.20361031,
    "ymin" : 1263749.29394311,
    "xmax" : 3271707.62271462,
    "ymax" : 1627205.87889978,
    "spatialReference" : {
      "wkid" : 2231
    }
  },
  "units" : "esriFeet",
  "supportedImageFormatTypes" : "PNG24,PNG,JPG,DIB,TIFF,EMF,PS,PDF,GIF,SVG,SVGZ,AI,BMP",
  "documentInfo" : {
    "Title" : "Leta",
    "Author" : "Administrator",
    "Comments" : "",
    "Subject" : "",
    "Category" : "",
    "Keywords" : "",
    "Credits" : ""
  },
  "capabilities" : "Map,Query,Data"
};
