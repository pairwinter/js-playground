'use strict';
angular.module('sspApp').directive('sspMyprofileField', function () {
    var template = [
        '<div class="form-group">',
        '    <label for="{{ profile.fieldName }}" class="col-sm-3 control-label"><i class="red">*</i>{{ profile.name }}</label>',
        '    <div class="col-sm-6">',
        '        <input type="text" class="form-control" id="{{ profile.fieldName }}" name="field'+Math.random()+'" ng-model="profile.value" maxlength="40" tabindex=""/>',
        '    </div>',
        '</div>'
    ]
    return {
        restict: 'EA',
        template: template.join(''),
        replace:true,
        link: function (scope, element) {
            var profile = scope.profile, rules = {},messages={};
            switch(profile.fieldName){
                case "firstName":
                    rules={maxlength:40};
                    messages = {maxlength:"40"};
                    if(profile.editable&&profile.mandatory){
                        rules.required = true;
                        messages.required = 'first name required';
                    }
                    break;
                case "lastName":
                    rules ={maxlength:40};
                    messages = {maxlength:"40"};
                    if(profile.editable&&profile.mandatory){
                        rules.required = true;
                        messages.required = 'last name required!';
                    }
                    break;
                case "externalID":
                    rules ={maxlength:50};
                    messages = {maxlength:"50"};
                    if(profile.editable&&profile.mandatory){
                        rules.required = true;
                        messages.required = 'externalId requried';
                    }
                    break;
                case "middleInitials":
                    rules ={maxlength:1};
                    messages = {maxlength:"1"};
                    if(profile.editable&&profile.mandatory){
                        rules.required = true;
                        messages.required = 'middleInitials required';
                    }
                    break;
                case "suffix":
                    rules ={maxlength:10};
                    messages = {maxlength:10};
                    if(profile.editable&&profile.mandatory){
                        rules.required = true;
                        messages.required = 'suffix required';
                    }
                    break;
                case "email":
                    rules ={required:true, email:true, minlength:6,maxlength:80};
                    messages = {
                        required : 'input email',
                        email : 'email format error',
                        maxlength : 80,
                        minlength : 6
                    };
                    break;
                default:
                    break;
            }
            rules.messages = messages;
            $('input',element[0]).attr('name',profile.fieldName).rules('add',rules);
        }
    };
});
