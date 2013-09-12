'use strict';
angular.module('sspApp').directive('sspLoginValidator', function(){
  return {
    restict: 'A',
    link: function(scope, element){
      $(element[0]).validate({
        rules: {
          'userName': {
            required : true,
            maxlength : 80,
            minlength : 4
          },
          'password': {
            required : true,
            maxlength : 80,
            minlength : 4
          }
        },
        messages: {
          userName: {
            required: "user name required",
            maxlength: "80",
            minlength: "4"
          },
          password :{
            required: "password required",
            maxlength: "80",
            minlength: "4"
          }
        },
        submitHandler:function(){
          scope.$apply(function(){
            scope.submit();
          });
        }
      });
    }
  };
});
