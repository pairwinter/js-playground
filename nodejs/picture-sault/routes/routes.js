var indexRoutes = require('./index/route.index');
var userRoutes = require('./user/route.user');
function route(expressApp){
    indexRoutes.route(expressApp);
    userRoutes.route(expressApp);
}
exports.route = route;