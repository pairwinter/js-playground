var indexRoutes = require('./index/route.index');
var organizationRoutes = require('./organization/route.organization');
var mapRoutes = require('./map/route.map');
function route(expressApp){
    indexRoutes.route(expressApp);
    organizationRoutes.route(expressApp);
    mapRoutes.route(expressApp);
}
exports.route = route;