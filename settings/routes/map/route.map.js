var routes = {
    "gisDefault":{
        path:"/settings/gis/default",
        method:"get",
        callback:function(req,res){
            var gisDefault = {};
            res.json(gisDefault);
        }
    },
    "region":{
        path:"/settings/gis/region",
        method:"get",
        callback:function(req,res){
            var regions = {};
            res.json(regions);
        }
    },
    "layer":{
        path:"/settings/gis/layer",
        method:"get",
        callback:function(req,res){
            var layers = {};
            res.json(layers);
        }
    }
}
exports.route = function(app){
    for(var routeName in routes){
        var route = routes[routeName];
        app[route.method](route.path,route.callback);
    }
};