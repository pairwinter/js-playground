//provide a graceful firebug console wrapper to avoid error
(function(common) {
    //setting global ajax cache
    jQuery.ajaxSettings.cache = false;
    var ctx = "/";
    $("script").each(function() {
        var src = $(this).attr("src");
        if (src && src.indexOf("eb_ajax.js") != -1) {
            var ret = src.match(/(ctx)=(.*)/);
            if (ret) {
                ctx = ret[2];
                
            }
        }
    })
    function wrapperUrl(url) {
        if (url.substring(0, ctx.length) === ctx) {
            return url
        }
        return ctx + url;
    }
    common.Ajax = {
    	wrapperUrl:wrapperUrl,
    	ctx  : ctx,
        ajax : function(settings) {
            settings.cache = settings.cache || false;
            $.ajax(wrapperUrl(settings.url),settings);
        },
        post : function(url, data, success, dataType) {
            $.post(wrapperUrl(url), data, success, dataType);
        },
        get : function(url, data, success, dataType) {
            $.get(wrapperUrl(url), data, success, dataType);
        },
        put : function(url,data,success,type,dataType){
        	 $.ajax({
                url : wrapperUrl(url),
                data:$.extend({"_method":"PUT"},data||{}),
                type : type||"post",
                dataType : dataType||"json",
                success : success
            });
        },
        remove : function(url,data,success,type,dataType){
        	 $.ajax({
                url : wrapperUrl(url),
                data:$.extend({"_method":"DELETE"},data||{}),
                type : type||"post",
                dataType : dataType||"json",
                success : success
            });
        },
        load : function(jdom,url,data,success){
        	jdom.load(wrapperUrl(url),data,success);
        },
        ajaxStart : function() {
            if (!common.Ajax.$ajaxDom) {
                var ajaxDoms = [];
                $("body").append(ajaxDoms.join(""));
                common.Ajax.$ajaxDom = {
                    ajax_bg : $("#ajax_bg"),
                    ajax_loading : $("#ajax_loading")
                };
            }
            var $dom = $(window);
            var l = ($dom.width() - common.Ajax.$ajaxDom.ajax_loading.width()) / 2;
            var t = ($dom.height() - common.Ajax.$ajaxDom.ajax_loading.height()) / 2;
            common.Ajax.$ajaxDom.ajax_loading.css({
                "visibility" : "visible",
                "left" : l + "px",
                "top" : t + "px"
            });
        },
        ajaxStop : function() {
            if (!!common.Ajax.$ajaxDom) {
                common.Ajax.$ajaxDom.ajax_loading.css({
                    "visibility" : "hidden"
                });
            }
        },
        ajaxError : function(event, XmlHttpRequest, ajaxOptions, thrownError) {
            switch (XmlHttpRequest.status + "") {
            case "0":
                //steven - comment out this line, cause sometime when ajax is interupted, this one will be triggered.
                //common.dialog.alert(common.message.common.error0);
                break;
            case "200":
                if (thrownError) {
                    var error = false;
                    if ((thrownError.type && thrownError.type.toLowerCase() == "unexpected_token")
                            || (thrownError.message && thrownError.message.toLowerCase() == "json.parse")
                            || ((thrownError + "").toLowerCase().indexOf("syntaxerror") > -1))
                        common.dialog.alert("Json format error");
                }
                ;
                break;
            case "404":
                common.dialog.alert(common.message.common.error404);
                break;
            case "500":
                common.dialog.alert(common.message.common.error500);
                break;
            case "10000":
                window.location=wrapperUrl('/logout');
                break;
            case "10001":
                common.dialog.alert(common.message.common.error10001);
                break;
            case "10002":  //baseexception
                common.dialog.alert(XmlHttpRequest.responseText);
                break;
            default:
                break;
            }
            common.logger.log(XmlHttpRequest);
        },
        ajaxResize : function() {
            if (!!common.Ajax.$ajaxDom) {
                var $dom = $(document);
                var l = ($dom.width() - common.Ajax.$ajaxDom.ajax_loading.width()) / 2;
                var t = ($dom.height() - common.Ajax.$ajaxDom.ajax_loading.height()) / 2;
                common.Ajax.$ajaxDom.ajax_loading.css({
                    "left" : l + "px",
                    "top" : t + "px"
                });
            }
        }
    };
    $(window).resize(function() {
        if (!!common.Ajax.$ajaxDom) {
            common.Ajax.ajaxResize();
        }
    });
    $(function() {
        $("body").ajaxStart(common.Ajax.ajaxStart).ajaxStop(common.Ajax.ajaxStop).ajaxError(common.Ajax.ajaxError);
        $.ajaxPrefilter( "script", function( options, originalOptions, jqXHR ) {
            options.cache = true;
        });
    });
})(EB_Common);