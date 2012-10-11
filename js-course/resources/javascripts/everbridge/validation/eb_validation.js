(function(common){
	$.validator.setDefaults({
		onfocusout : function(e) {
			$(e).valid();
		},
	    ignore : ':hidden, :button',
	    validatorGen : 0,
	    showErrors : function(errorMap, errorList) {
			for (var i = 0; this.errorList[i]; i++) {
				var error = this.errorList[i];
				this.settings.highlight
						&& this.settings.highlight.call(this, error.element,
								this.settings.errorClass, this.settings.validClass);
				showLabel.call(this, error.element, error.message);
			}
			//if(this.errorList.length > 0){
				//this.errorList[0].element.focus();
			//}
			if (this.errorList.length) {
				this.toShow = this.toShow.add(this.containers);
			}
			if (this.settings.success) {
				for (var i = 0; this.successList[i]; i++) {
					showLabel.call(this, this.successList[i]);
				}
			}
			if (this.settings.unhighlight) {
				for (var i = 0, elements = this.validElements(); elements[i]; i++) {
					this.settings.unhighlight.call(this, elements[i],
							this.settings.errorClass, this.settings.validClass);
				}
			}
			this.toHide = this.toHide.not(this.toShow);
			this.hideErrors();
			this.addWrapper(this.toShow).show();
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
		},
		"less_equal": {
			message:$.validator.format(common.message.validation.less_equal),
			fun:function(value, element, param) {
				var target = $(param[0]).unbind(".validate-less_equal").bind("blur.validate-less_equal", function() {
					$(element).valid();
				});
				return parseInt(value) <= parseInt(target.val());
			}
		},
        "password_strategy":{
            message:"Invalid Password.",
            fun:function(value,element,param){
                var patter=/(^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[\d])[a-zA-Z\d!@#$%^&*()]*$)|(^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]*$)|(^(?=.*?[A-Z])(?=.*?[\d])(?=.*?[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]*$)|(^(?=.*?[a-z])(?=.*?[\d])(?=.*?[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]*$)/;
                if(!patter.test(value)){
                    return false;
                }
                var firstName = param[0];
                var lastName = param[1];
                var userName = $("#"+param[2]).val();
//                var all = firstName+lastName+userName;
//                for(var i=0;i<all.length;i++)
//                {
//                    var c=all.charAt(i);
//                    if(value.indexOf(c)!=-1){
//                        return false;
//                    }
//                }
//                return true;
                if(value.indexOf(firstName)==-1 && value.indexOf(lastName)==-1 && value.indexOf(userName)==-1){
                     return true;
                }
                return false;

            }
        },
		"phone_length": {
			message:"",
			fun:function(value, element, param) {
				var target = $(param[0]).unbind(".validate-phone_length").bind("blur.validate-phone_length", function() {
					$(element).valid();
				});
				var nanp = ['US','AS','AI','AG','BS','BB','BM','VG','CA','KY','DM','DO','GD','GU','JM','MS','MP','PR','KN','LC','VC','TT','TC','VI'];
				var targetValue;
				if(param[1] != undefined){
					targetValue = param[1];
				}else{
					targetValue = target.val();
				}
				var flag = false;
				for ( var i = 0; i < nanp.length; i++) {
					if(targetValue == nanp[i]){
						flag = true;
						break;
					}
				}
				
				if(flag){
					$.validator.messages["phone_length"]=common.message.validation.phone_length_nanp;
					return value.length == 10 && value.match(common.validation.REGEXPS.PHONE_US_EXP);
				}else{
					$.validator.messages["phone_length"]=common.message.validation.phone_length_other;
					var regex = /^\+?\d{4,20}$/;
					return value.match(regex);
//					return value.length >= 4 && value.length <= 20;
				}
				return true;
			}
		}
	};
	//add method to jquery.validator
	for(var c in common.validation.custom){
		var method=common.validation.custom[c];
		$.validator.addMethod(c,method.fun,method.message);
	}
	
	/**
      * reconstruction the method of "showing label"
	  * Linder Wang
    **/
	function showLabel(element, message) {
		var me = this,
		    label = this.errorsFor(element);
		if (label.length) {
			// refresh error/success class
			label.removeClass(this.settings.validClass)
					.addClass(this.settings.errorClass);
			
			//label.attr("generated") && this.errorToolTip.children('span').html(message || '');
		} else {
		    var gen = (this.currentForm.id || this.currentForm.name) + '-' +this.idOrName(element) + '-' + (this.settings.validatorGen++);
		    $(element).parent().css({
						textOverflow : ' clip',
						whiteSpace : 'nowrap'
					});
		    $(element).attr('validatorgen',gen);
			// create label
			label = $("<" + this.settings.errorElement + "/>").attr({
						"for" : gen,
						generated : true
					}).addClass(this.settings.errorClass).hide();
			if(!this.errorToolTip){
			    if($('div.error-tooltip').length > 0){
			    	this.errorToolTip = $('div.error-tooltip');
			    }else{
			    	this.errorToolTip = $('<div class="error-tooltip"><b></b><span></span></div>').appendTo('body');
			    }
			}
			var tip = this.errorToolTip;
			label.hover(function() {
			    //validation info
			    var rules = $(element).rules(),
			        rule,
			        message;
			    for (var method in rules ) {
					rule = { method: method, parameters: rules[method] };
					try {
						var result = $.validator.methods[method].call( me, element.value.replace(/\r/g, ""), element, rule.parameters );
						if ( result == "dependency-mismatch" ) {
							continue;
						}
	
						if( !result ) {
						    message = me.defaultMessage(element, rule.method);
						    var theregex = /\$?\{(\d+)\}/g;
						    if ( typeof message == "function" ) {
								message = message.call(me, rule.parameters, element);
							} else if (theregex.test(message)) {
								message = jQuery.format(message.replace(theregex, '{$1}'), rule.parameters);
							}
							break;
						}
					} catch(e) {
						throw e;
					}
				}
			
			    tip.children('span').html(message || '');
			    
				var labelOffset = $(this).offset(),
					labelW = $(this).width(),
					labelOuterW = $(this).outerWidth(true),
					labelH = $(this).height(),
					docW = getViewportWidth(),
					elementW = $(element).outerWidth(true),
					elementL = $(element).offset().left,
					tipW,
					distanceR;
				tip.css({
						left : '',
						right : ''
					});
				tipW = tip.outerWidth(true);
				distanceR = docW - 15 - elementL - elementW - labelOuterW;
				if(distanceR < tipW){
					//tip.removeClass('error-tooltip-right').addClass('error-tooltip-bottom').css({
					//		top : labelOffset.top + labelH + 10,
					//		right : 10
					//	}).show();
					//tip.find('b').css('right', function(index, value) {
								//return distanceR - 10 + labelW / 2 - $(this).width() / 2
							//});
					//tip.find('b').css('left', 30);
					
					tip.removeClass('error-tooltip-right').addClass('error-tooltip-left').css({
							top : labelOffset.top - 5,
							left : labelOffset.left - tipW - labelW
						}).show();
				}else{
					tip.removeClass('error-tooltip-left').addClass('error-tooltip-right').css({
							top : labelOffset.top - 5,
							left : labelOffset.left + labelOuterW + 5
						}).show();
				}
			}, function() {
				tip.hide();
			});
			if (this.settings.wrapper) {
				// make sure the element is visible, even in IE
				// actually showing the wrapped element is handled elsewhere
				label = label.hide().show().wrap("<" + this.settings.wrapper
						+ "/>").parent();
			}
			if (!this.labelContainer.append(label).length)
				this.settings.errorPlacement ? this.settings.errorPlacement(
						label, $(element)) : label.insertAfter(element);
		}
		// adjust inputs and label's width To adapt to the layout
		var inputCt = $(element).parent(),
		    inputCtW = inputCt.width(),
		    inputW = $(element).outerWidth(true),
		    inputMarginW = inputW - $(element).width(),
		    labelW = label.outerWidth(true);
		if(inputCtW - inputW < labelW){
			$(element).width(inputCtW - labelW - inputMarginW);
		}
		   
		if (!message && this.settings.success) {
			typeof this.settings.success == "string" ? label
					.addClass(this.settings.success) : this.settings
					.success(label);
		}
		this.toShow = this.toShow.add(label);
		label.css('display','inline-block');
	}
	
	/**
      return the page viewport width
    **/
	function getViewportWidth(){
	    var check = function(r) {
				return r.test(navigator.userAgent.toLowerCase());
			},
			doc = document,
			isOpera = check(/opera/),
			isIE = !isOpera && check(/msie/), 
			isStrict = doc.compatMode == 'CSS1Compat';
		return !isStrict && !isOpera ? doc.body.clientWidth :
	        	   isIE ? doc.documentElement.clientWidth : self.innerWidth;
	}
	
    common.validation.validate=function(form,setting){
        var $form=null,validator;
        if((typeof form) === "string"){
            $form=$("#"+form);
        }
        else if((typeof form) === "object"){
            $form=form;
        }
        else{
            EB_Common.logger.log("paramter error!");
            return;
        }
    	if(!!setting)
    		validator = $form.validate(setting);
    	else
    		validator = $form.validate();
    	
    	return validator;
    }
})(EB_Common);