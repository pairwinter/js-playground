(function(common){
	$.validator.setDefaults({
	    focusInvalid: false,
	    onkeyup:false,
	    highlight: function(element, errorClass, validClass){
	    	element=$(element);
	        element.addClass(errorClass).removeClass(validClass);
	        element.siblings(".valid-status").removeClass(validClass).addClass("hide");
	    },
	    unhighlight:function(element, errorClass, validClass){
	    	element=$(element);
	        element.addClass(validClass).removeClass(errorClass);
	        element.siblings(".valid-status").addClass(validClass).removeClass("hide");
	    },
	    errorPlacement: function(error, element) {
	    	error=postion(element,error);
	        error.appendTo(element.parent());
	    }
	});
	common.validation={};
	common.validation.REGEXPS = {
	    DOMAIN_NAME_EXP: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,
	    IPV4_EXP: /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/i,
	    IPV6_EXP: /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
	    HOST_EXP: /^[0-9a-zA-Z\u4E00-\u9FA5]+[\.a-z\u4E00-\u9FA5-]*$/,
	    EMAIL_EXP: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
	    PHONE_US_EXP: /^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/
	};
	common.validation.custom={};
	common.validation.custom={
		"ipv4":{
			message:common.message.validation.ip,
				fun:function(value,element){
						return common.validation.REGEXPS.IPV4_EXP.test(value);
					}
		},
		"ipv6":{
			message:common.message.validation.ip,
				fun:function(value,element){
						return common.validation.REGEXPS.IPV6_EXP.test(value);
					}
		},
		"domain":{
			message:common.message.validation.domain,
				fun:function(value,element){
						return common.validation.REGEXPS.DOMAIN_NAME_EXP.test(value);
					}
		},
		"host":{
			message:common.message.validation.host,
				fun:function(value,element){
					return $.trim(value) == "" || common.validation.REGEXPS.HOST_EXP.test(value);
				}
		},
		"ip_or_domain":{
			message:common.message.validation.ip_or_domain,
				fun:function(value,element){
					return $.trim(value) == "" || common.validation.REGEXPS.DOMAIN_NAME_EXP.test(value) || CF_Common.REGEXPS.IPV4_EXP.test(value);
				}
		},
		"multi-emails":{
			message:common.message.validation.multi_emails,
				fun:function(emails,element){
					emails = emails.split("\n");
				    var valid = true;
				    for(var i in emails) {
				        //skip empty
				        var email = emails[i];
				        if(email) {
				            if(!common.validation.REGEXPS.IPV4_EXP.test(emails[i])) {
				                valid = false;
				                break;
				            }
				        }
				    }
				    return  valid;
				}
		},
		"phoneUS":{
			message:common.message.validation.phoneUS,
			fun:function(phone_number, element) {
				    phone_number = phone_number.replace(/\s+/g, "");
					return this.optional(element) || phone_number.length > 9 && phone_number.match(common.validation.REGEXPS.PHONE_US_EXP);
				}
		},
		"multi-phoneUS":{
			message:common.message.validation.multi_phoneUS,
				fun:function(phones,element){
						phones = value.split("\n");
					    var valid = true;
					    for(var i in phones) {
					        var phone_number = phones[i];
					        if(phone_number) {
					            if(!common.validation.REGEXPS.PHONE_US_EXP.test(phone_number)) {
					                valid = false;
					                break;
					            }
					        }
					    }
					    return  valid;
					}
		},
		"pattern":{
			message:common.message.validation.pattern,
			fun: function(value, element, param) {
				    return this.optional(element) || param.test(value);
				}
		}
	};
	//add method to jquery.validator
	for(var c in common.validation.custom)
	{
		var method=common.validation.custom[c];
		$.validator.addMethod(c,method.fun,method.message);
	}
	
	function postion(element,tip){
		var pos=element.attr("pos");
		var e_top,e_left,tip_height;
		if(pos=="left" || pos=="down" || pos=="down-absolute")
		{
			var tipClone=tip.clone();
			$("body").append(tipClone);
			tipClone.show();
			tip.width(tipClone.outerWidth());
			tip_height=tipClone.outerHeight();
			tipClone.remove();
			//element.parent().css({"position":"relative"});
			e_top=element.position().top;
			e_left=element.position().left;
		}
		switch (pos) {
			case "left":
				var top=(e_top+1+(element.outerHeight()-tip_height)/2);
				top=Math.max(top,0);
				tip.css({"position":"absolute","left":((element.outerWidth()+e_left+2)+"px"),"top":top+"px"});
				break;
			case "down-absolute":
				tip.css({"position":"absolute","left":e_left+"px","top":((element.outerHeight()+e_top+1)+"px")});
				break;
			case "down":
				tip.css({"display":"block","clear":"both"});
				break;
			default:
				break;
		}
		return tip;
	}
	
    function onfocus(element) {
    	var tip=element.attr("tip");
    	if(tip)
    	{
    		tip=common.message.tip[tip]?common.message.tip[tip]:tip
    		element.removeClass("error").siblings(".valid-status").addClass("hide").siblings("label").hide();
    		if(element.siblings(".tip").length==0){
    			var tip=$('<label class="tip">'+tip+'</label>');
				element.parent().append(postion(element,tip));		
    		}
    	}
    }

    function onblur(element, fieldClass, backgroundClass) {
    	element.siblings(".tip").remove();
    	element.siblings(".valid-status").removeClass("hide");
    	if(!element.hasClass("error"))
    		element.parent().css({"position":"static"});
    }
    
    $(function(){
//    	 $(".form .field .form_field").focus(function(){
//        onfocus($(this), "field", "field_background");
//	    })
//	    $(".form .field .form_field").blur(function(){
//	        onblur($(this), "field", "field_background");
//	    })
//	    
//	    $(".form .area_field .form_field").focus(function(){
//	        onfocus($(this), "area_field", "area_field_background");
//	    })
//	    $(".form .area_field .form_field").blur(function(){
//	        onblur($(this), "area_field", "area_field_background");
//	    })
	    $(".validate_field").focus(function(){onfocus($(this));}).blur(function(){onblur($(this));});
    });
})(EB_Common);