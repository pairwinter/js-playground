//provide a graceful firebug console wrapper to avoid error
(function(common){
	common.include(["/javascripts/everbridge/ajax/ajax.css"]);
	common.Ajax = {
	    ajax: function(url,type,dataType,success) {
	    	$.ajax({
	    		url:url,
	    		type:type,
	    		dataType:dataType,
	    		success:success
	    	});
	    },
	    ajaxStart:function(){
	    	if(!common.Ajax.$ajaxDom)
	    	{
	    		var ajaxDoms=[];
	    		ajaxDoms.push('<div id="ajax_bg" class="ajax-bg"></div>');
				ajaxDoms.push('<div id="ajax_loading" class="ajax-loading"></div>');
				$("body").append(ajaxDoms.join(""));
				common.Ajax.$ajaxDom={ajax_bg:$("#ajax_bg"),ajax_loading:$("#ajax_loading")};
	    	}
	    	var $dom=$(window);
	    	var l=($dom.width()-common.Ajax.$ajaxDom.ajax_loading.width())/2;
	    	var t=($dom.height()-common.Ajax.$ajaxDom.ajax_loading.height())/2;
	    	common.Ajax.$ajaxDom.ajax_bg.css({"visibility":"visible"});
	    	common.Ajax.$ajaxDom.ajax_loading.css({"visibility":"visible","left":l+"px","top":t+"px"});
	    	try{
	    		common.Ajax.$ajaxDom.ajax_bg.bgIframe();
	    	}catch(e){}
	    	
	    },
	    ajaxStop:function(){
	    	if(!!common.Ajax.$ajaxDom)
	    	{
	    		common.Ajax.$ajaxDom.ajax_bg.css({"visibility":"hidden"});
	    		common.Ajax.$ajaxDom.ajax_loading.css({"visibility":"hidden"});
	    	}
	    },
	    ajaxError:function(event,XmlHttpRequest,ajaxOptions,thrownError){
	    	switch (XmlHttpRequest.status+"") {
	    		case "0"  :common.dialog.alert(common.message.common.error0);break;
	    		case "200": 
	    			if(thrownError){
	    				var error=false;
	    				if((thrownError.type && thrownError.type.toLowerCase()=="unexpected_token")
	    					||(thrownError.message && thrownError.message.toLowerCase()=="json.parse")
	    					||((thrownError+"").toLowerCase().indexOf("syntaxerror")>-1)
	    					)
	    					common.dialog.alert("程序错误！JSON数据格式不正确！");
	    			};
	    			break;
	    		case "404":common.dialog.alert(common.message.common.error404);break;
	    		case "500":common.dialog.alert(common.message.common.error500);break;
	    		case "10000":common.dialog.alert(common.message.common.error10000);break;
	    		case "10001":common.dialog.alert(common.message.common.error10001);break;
	    		default:
	    			break;
	    	}
	    	common.logger.log(XmlHttpRequest);
	    },
	    ajaxResize:function(){
	    	if(!!common.Ajax.$ajaxDom)
	    	{
	    		var $dom=$(document);
	    		var l=($dom.width()-common.Ajax.$ajaxDom.ajax_loading.width())/2;
	    		var t=($dom.height()-common.Ajax.$ajaxDom.ajax_loading.height())/2;
	    		common.Ajax.$ajaxDom.ajax_loading.css({"left":l+"px","top":t+"px"});
	    	}
	    }
	};
	$(window).resize(function(){
		if(!!common.Ajax.$ajaxDom)
		{
			common.Ajax.ajaxResize();
		}
	});
	$(function(){
		$("body").ajaxStart(common.Ajax.ajaxStart).ajaxStop(common.Ajax.ajaxStop).ajaxError(common.Ajax.ajaxError);
	});
})(EB_Common);