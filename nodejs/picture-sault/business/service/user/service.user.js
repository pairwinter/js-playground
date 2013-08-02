var util = require('util');
var _ = require('underscore');
var userDAO = require('../../database/user/db.user').userDAO;
var userService = {
    addUser:function(user,success,error){
        user.createdTime = new Date();
        user.lastModifiedTime = new Date();
        userDAO.addUser(user,success,error);
    }
}
exports.userService = userService;