'use strict';
angular.module('sspApp').directive('sspSignupValidator', function(){
  return {
    restict: 'A',
    link: function(scope, element){
      $(element[0]).validate({
        rules: {
          'userName': {required : true,maxlength : 80,minlength : 4},
          'firstname': {required : true,maxlength : 40},
          'lastname': {required : true,maxlength : 40},
          'password': { required: true, maxlength: 80, minlength: 4 },
          'confirmPassword': { equalTo: "#password" },
          'securityQuestion': { required: true },
          'securityAnswer': { required: true },
          'email': { required: true, email: true }
        },
        messages: {
          'userName': {
            required : "Please input userName",
            maxlength : 80,
            minlength : 4
          },
          'firstname': {
            required : "Please input firstUserName",
            maxlength : 40
          },
          'lastname': {
            required : 'Please input firstUserName',
            maxlength : 40
          },
          'password': {
            required : "Please input firstUserName",
            maxlength : 80,
            minlength : 4
          },
          'confirmPassword': {
            equalTo: "password not equal"
          },
          'securityQuestion': {
            required : "Please input securityQuestion"
          },
          'securityAnswer': {
            required : "Please input securityAnswer"
          },
          'email': {
            required : "Please input email",
            email : true
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
