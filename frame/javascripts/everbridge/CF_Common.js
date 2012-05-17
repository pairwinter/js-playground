// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
var CF_Common = function() {
}
CF_Common.DEV_MODE = true;
CF_Common.Defaults = {
    dialogOpts: {
        width: 650,
        height: 400,
        modal:true,
        resizable: false,
        title: 'Dialog',
        dialogClass: 'customized_dialog'
    }
}

CF_Common.REGEXPS = {
    //DOMAIN_NAME_EXP: /^[0-9a-zA-Z\u4E00-\u9FA5]+[\.0-9a-zA-Z\u4E00-\u9FA5-]*\.[a-z\u4E00-\u9FA5]{2,6}$/,
    DOMAIN_NAME_EXP: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,
    IPV4_EXP: /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/i,
    IPV6_EXP: /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
    HOST_EXP: /^[0-9a-zA-Z\u4E00-\u9FA5]+[\.a-z\u4E00-\u9FA5-]*$/,
    EMAIL_EXP: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
    PHONE_EXP: /^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/
}
CF_Common.validateDomainName = function(domainName) {
    return CF_Common.REGEXPS.DOMAIN_NAME_EXP.test(domainName);
}
CF_Common.validateIp = function(ip){
    return CF_Common.REGEXPS.IPV4_EXP.test(ip);
}
CF_Common.validateHostname = function(hostname) {
    return CF_Common.REGEXPS.HOST_EXP.test(hostname);
}
CF_Common.validateEmail = function(emailAddress) {
    if(emailAddress.length>128) return false;
    return CF_Common.REGEXPS.EMAIL_EXP.test(emailAddress);
}
CF_Common.validatePhoneNumber = function(phone_number) {
    //Todo, just support US phone number, we need to extend it
    phone_number = phone_number.replace(/\s+/g, "");
    return phone_number.length > 9 && phone_number.match(CF_Common.REGEXPS.PHONE_EXP);
}

CF_Common.destroy = function(selector, url, callback, confirmMsg) {
    confirmMsg = confirmMsg ? confirmMsg : "Are you sure?";
    $(selector).each(function() {
        $(this).bind("click", function() {
            id = this.href.match(/\d+/);
            if (confirm(confirmMsg)) {
                $.ajax({
                    url: url + id,
                    type: "DELETE",
                    cache: false,
                    success: callback
                })
            }
        })
    })
}

CF_Common.show = function(selector, url, callback) {
    CF_Common.operate(selector, url, callback, 'show')
}
CF_Common.showInPage = function(selector, url) {
    CF_Common.operateInPage(selector, url, 'show')
}

CF_Common.edit = function(selector, url, callback) {
    CF_Common.operate(selector, url, callback, 'edit')
}

CF_Common.editInPage = function(selector, url) {
    CF_Common.operateInPage(selector, url, 'edit')
}

CF_Common.goToPage = function(selector, url) {
    $(selector).each(function() {
        $(this).bind("click", function() {
            CF_Common.loadInPage(url)
        })
    })
}

CF_Common.loadInPage = function(url) {
    location.href=url;
}

CF_Common.operate = function(selector, url, callback, op) {
    $(selector).each(function() {
        $(this).bind("click", function() {
            id = this.href.match(/\d+/);
            uri = op == "edit" ? url + id + "/edit" : url + id;
            $.ajax({
                url: uri,
                type: "GET",
                cache: false,
                success: callback
            })
        })
    })
}

CF_Common.operateInPage = function(selector, url, op) {
    $(selector).each(function() {
        $(this).bind("click", function() {
            var id = this.href.match(/\d+/);
            var uri = op == "edit" ? url + id + "/edit" : url + id;
            CF_Common.loadInPage(uri);
        })
    })
}

CF_Common.selectTabs = function(tabs, index) {
    tabs.data("prevent_select", true);
    tabs.tabs("select", index);
}


CF_Common.Ajax = {
    ajaxerror: function(url, data, myerror) {
        if (myerror != null && jQuery.isFunction(myerror)) {
            myerror();
        }
        else {
            //do something
            if (url != null) {
            //alert("request for url " + url.toString() + " denied.");
            }
            if (data != null) {
                if (data.alert != null) {
                    alert(data.alert.toString());
                }
                if (data.dialog != null) {
                    $("#errordiv").html(data.dialog.toString());
                    $("#errordiv").dialog({
                        draggable: false,
                        resizable: false,
                        modal: true,
                        closeOnEscape: true,
                        zIndex: 9999,
                        "width": "auto",
                        "height": "auto"
                    });
                }
                if (data.redirect_to != null) {
                    location.href = data.redirect_to.toString();
                }
            }
        }
    },

    gpopts: function(type, url, data, callback, dataType) {
        if (jQuery.isFunction(data)) {
            dataType = dataType || callback;
            callback = data;
            data = {};
        }
        return {
            type: type,
            url: url,
            data: data,
            success: callback,
            dataType: dataType
        };
    },
    geterror: function(data) {
        var errordata = {};
        if (data.substr(9, 4) == "1001") {
            errordata = {
                alert: data.substr(13)
            };
        }
        else if (data.substr(9, 4) == "1002") {
            errordata = {
                dialog: data.substr(13)
            };
        }
        else if (data.substr(9, 4) == "1003") {
            errordata = {
                redirect_to: data.substr(13)
            };
        }
        return errordata;
    },
    load: function(obj, url, data, complete, myerror) {
        var success = function(responseText, textStatus, XMLHttpRequest) {
            if (responseText != null && responseText.substr(0, 9) == 'errorhtml') {
                obj.html("");
                CF_Common.Ajax.ajaxerror(url, CF_Common.Ajax.geterror(responseText), myerror);
            }
            else {
                if (complete!=null){
                    complete(responseText, textStatus, XMLHttpRequest);
                }
            }
        }
        obj.load(url, data, success);
    },
    ajax: function(opts) {
        var sucfunc = opts.success == null ? function(data, type) {
        } : opts.success;
        var defaultoptions = {
            type: 'POST',
            dataType: 'json'
        };
        var options = $.extend({}, defaultoptions, opts);
        options.success = function(data, type) {
            if (data != null && data.toString().substr(0, 9) == 'errorhtml') {
                CF_Common.Ajax.ajaxerror(opts.url, CF_Common.Ajax.geterror(data), opts.myerror);
            }
            else if (data != null && data.errorjson == 'true') {
                CF_Common.Ajax.ajaxerror(opts.url, data, opts.myerror);
            }
            else {
                sucfunc(data, type);
            }
        };
        return $.ajax(options);
    },
    get: function(url, data, callback, type, myerror) {
        return CF_Common.Ajax.ajax($.extend(this.gpopts("GET", url, data, callback, type), {
            myerror: myerror
        }));
    },
    post: function(url, data, callback, dataType, myerror) {
        return CF_Common.Ajax.ajax($.extend(this.gpopts("POST", url, data, callback, dataType), {
            myerror: myerror
        }));
    }
};

CF_Common.initializeQuickAccess = function(){
    $('.features_link> ul li').hover(
        function() {
            $(this).addClass('ui-state-hover');
        },
        function() {
            $(this).removeClass('ui-state-hover');
        });
    $(".features_link> ul li a").click(function(){
        var features = $(".features_link> ul li");
        features.each(function(idx){
            $(features[idx]).removeClass("selected");
        })
        $(this).parent().addClass("selected");
    })
}

CF_Common.switchToLeftLink = function(index){
    var features = $(".features_link> ul li");
    features.each(function(idx){
        $(features[idx]).removeClass("selected");
    })
    $(features[index]).addClass("selected");
}

CF_Common.listenFormFields = function() {
    function onfocus(element, fieldClass, backgroundClass) {
        var curElement = element.hasClass("li_element") ? element.parent().parent() : element;
        curElement.parent().parent().removeClass(fieldClass).addClass(backgroundClass);
        if(!curElement.siblings(".success_label").hasClass("succeed")) {
            if(curElement.siblings(".message").text()) {
                curElement.siblings(".message").show();
            }
            curElement.siblings(".error_label").hide();
            element.removeClass("error_field").addClass("focus");
            if(curElement.hasClass("pos")) {
                curElement.siblings(".message").css({
                    left: curElement.position().left,
                    top: curElement.position().top + 30
                })
            }
        }
    }

    function onblur(element, fieldClass, backgroundClass) {
        var curElement = element.hasClass("li_element") ? element.parent().parent() : element;
        curElement.parent().parent().removeClass(backgroundClass).addClass(fieldClass);
        curElement.siblings(".message").hide();
        element.removeClass("focus");
    }

    $(".form .field .form_field").focus(function(){
        onfocus($(this), "field", "field_background");
    })
    $(".form .field .form_field").blur(function(){
        onblur($(this), "field", "field_background");
    })
    
    $(".form .area_field .form_field").focus(function(){
        onfocus($(this), "area_field", "area_field_background");
    })
    $(".form .area_field .form_field").blur(function(){
        onblur($(this), "area_field", "area_field_background");
    })
}
//provide a graceful firebug console wrapper to avoid error
CF_Common.Logger = {
    log: function() {
        if(window.console && CF_Common.DEV_MODE) console.log(arguments);
    },
    debug: function() {
        if(window.console && CF_Common.DEV_MODE) console.debug(arguments);
    },
    error: function() {
        if(window.console && CF_Common.DEV_MODE) console.error(arguments);
    },
    warn: function() {
        if(window.console && CF_Common.DEV_MODE) console.warn(arguments);
    },
    profile :function() {
        if(window.console && CF_Common.DEV_MODE) console.profile(arguments);
    },
    profileEnd :function() {
        if(window.console && CF_Common.DEV_MODE) console.profileEnd(arguments);
    },
    trace: function(){
        if(window.console && CF_Common.DEV_MODE) console.trace(arguments);
    },
    group: function() {
        if(window.console && CF_Common.DEV_MODE) console.group(arguments);
    },
    groupEnd: function(){
        if(window.console && CF_Common.DEV_MODE) console.groupEnd(arguments);
    },
    dir: function() {
        if(window.console && CF_Common.DEV_MODE) console.dir(arguments);
    },
    dirxml: function(){
        if(window.console && CF_Common.DEV_MODE) console.dirxml(arguments);
    }
};

CF_Common.Cookie = {
    get: function(name) {
        var values = document.cookie.match(new RegExp(name + "=([^;])"));
        return values ? values[1] : '';
    },
    /**
     * minutes, domain, path and isSecure are optional
     * minutes: time to live for this cookie
     * domain: the cookie availabe for current cookie
     * path: the affected path of this cookie
     * isSecure: encrypt the cookie or not
     */
    set: function(name, value, minutes, domain, path, isSecure) {
        document.cookie = name + '=' + escape(value)
        + (minutes ? ';expires=' + new Date(new Date().getTime() + minutes * 60 * 1000).toGMTString() : '')
        + (path ? ';path=' + path : '')
        + (domain ? ';domain=' + domain : '')
        + (isSecure ? ';secure' : '');
    }
}

$.validator.setDefaults({
    focusInvalid: false,
    highlight: function(element, errorClass, validClass){
        if($(element).hasClass("form_field")) {
            if(!$(element).siblings(".message").hasClass("pos")) {
                $(element).siblings(".success_label").removeClass("succeed").addClass("blank");
            }
            $(element).addClass("error_field").removeClass(validClass);
            $(element).siblings(".message").hide();
            $(element).siblings(".error_label").show();
        }
    },
    unhighlight:function(element, errorClass, validClass){
        if($(element).hasClass("form_field")) {
            if(!$(element).siblings(".message").hasClass("pos")) {
                $(element).siblings(".success_label").removeClass("blank").addClass("succeed");
            }
            $(element).siblings(".message").hide();
            $(element).removeClass("error_field").addClass(validClass);
            $(element).siblings(".error_label").hide();
        }
    },
    errorPlacement: function(error, element) {
        error.prependTo(element.siblings(".error_label"));
    }
})

$.validator.addMethod("ip",function(value,element){
    return  CF_Common.REGEXPS.IPV4_EXP.test(value);
},"please input a valid ip address")

$.validator.addMethod("domain",function(value,element){
    return  CF_Common.REGEXPS.DOMAIN_NAME_EXP.test(value);
},"please input a valid domain")

$.validator.addMethod("host",function(value,element){
    return $.trim(value) == "" || CF_Common.REGEXPS.HOST_EXP.test(value)
},"please input a valid host")

$.validator.addMethod("mbox",function(value,element){
    return  (CF_Common.REGEXPS.EMAIL_EXP.test(value.replace(/\./, "@")) && value.substring(value.length-1) == ".")
},"please input a valid email address, use '.' to replace '@', end by '.' ")

$.validator.addMethod("ip_or_domain",function(value,element){
    return $.trim(value) == "" || CF_Common.REGEXPS.DOMAIN_NAME_EXP.test(value) || CF_Common.REGEXPS.IPV4_EXP.test(value);
},"please input a valid ip or domain name")

$.validator.addMethod("phoneUS", function(phone_number, element) {
    return  CF_Common.validatePhoneNumber(phone_number);
}, "Please specify a valid phone number");

$.validator.addMethod("multi-emails", function(emails, element){
    emails = emails.split("\n");
    var valid = true;
    for(var i in emails) {
        //skip empty
        var email = emails[i];
        if(email) {
            if(!CF_Common.validateEmail(emails[i])) {
                valid = false;
                break;
            }
        }
    }
    return  valid;
}, "Please input valid emails, one on each line, less than 128 characters per email")

$.validator.addMethod("multi-phoneUS", function(phones, element){
    phones = phones.split("\n");
    var valid = true;
    for(var i in phones) {
        var phone_number = phones[i];
        if(phone_number) {
            if(!CF_Common.validatePhoneNumber(phone_number)) {
                valid = false;
                break;
            }
        }
    }
    return  valid;
}, "Please input valid phone numbers, on on each line");

$.validator.addMethod("dnsQueryType", function(type, element) {
    return  ($.inArray(type,  ['ANY','SOA', 'A','AAAA','CNAME','ALIAS','HINFO','MX','NS','PTR','RP','SRV','TXT']) != -1)
}, "The acceptable types: 'ANY', 'SOA', 'A', 'AAAA', 'CNAME', 'ALIAS', 'HINFO', 'MX', 'NS', 'PTR', 'RP', 'SRV', 'TXT'");

$.validator.addMethod("ttl", function(value, element) {
    return  ($.validator.methods.digits.call(this, value, element)
        && $.validator.methods.min.call(this, value, element, 60) && $.validator.methods.max.call(this, value, element, 2147483647));
}, "Please input a digit between 60~2147483647");