'use strict';
angular.module('sspApp').directive('sspLocationValidator', function(){
    return {
        restict: 'A',
        link: function(scope, element){
            var validator = $(element[0]).validate({
                rules: {
                    'locationName': {required : true,maxlength : 40},
                    'country': {required : true},
                    'address': {required : true,maxlength : 100}
                },
                messages: {
                    'locationName': {
                        required : "Please input locationName",
                        maxlength : 40,
                        minlength : 4
                    },
                    'country': {
                        required : "Please input country"
                    },
                    'address': {
                        required : 'Please input address',
                        maxlength : 100
                    }
                },
                submitHandler:function(){
                    scope.$apply(function(){
                        scope.submit();
                    });
                }
            });
            scope.$watch('address.id',function(){
                validator.resetForm();
            })
        }
    };
});
