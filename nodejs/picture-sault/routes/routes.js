var baseRoutes = require('./base/base')
function route(expressApp){
    baseRoutes.route(expressApp);
}
exports.route = route;