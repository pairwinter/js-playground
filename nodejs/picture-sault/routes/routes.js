var baseRoutes = require('./base/base');
var userRoutes = require('./user/route.user');
function route(expressApp){
    baseRoutes.route(expressApp);
    userRoutes.route(expressApp);
}
exports.route = route;