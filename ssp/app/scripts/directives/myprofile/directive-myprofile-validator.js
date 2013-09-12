'use strict';
angular.module('sspApp').directive('sspMyprofileValidator', function () {
    return {
        restict: 'A',
        link: function (scope, element) {
            $(element[0]).validate({submitHandler: function () {
                    scope.submit();
                }
            });
        }
    };
});
