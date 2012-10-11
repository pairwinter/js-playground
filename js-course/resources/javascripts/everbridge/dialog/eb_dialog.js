//provide a graceful firebug console wrapper to avoid error
(function(common){
	var Dialog={},
		dialogCache = [];
	Dialog.alert=function(content,title,callback){
        var alert = $('<div title="'+(title?title:i18n['global.dialog.title.alert'])+'">'+content+'</div>');
        alert.dialog({
					modal : true,
					zIndex : 2300,
					resizable : false
				});
		alert.dialog("option", "buttons", {
				Ok : {
					click : function() {
						$(this).dialog("close");
						if (callback && typeof callback == "function") {
							callback.call($(this));
						}
                        $(this).dialog("destroy");
                        $(this).remove();
					},
					'class' : 'orange',
					text : i18n['global.dialog.button.ok']
				}
			});
		dialogCache.push(alert);
	};
	
	Dialog.confirm=function(content,title,callback1,callback2){
	    if(jQuery.isFunction(arguments[0])){
	    	callback1 = arguments[0];
	    	callback2 = arguments[1];
	    }
		var confirm = $('<div title="'
				+ (title && typeof title == 'string' ? title : i18n['global.dialog.title.confirm']) + '">'
				+ (content && typeof content == 'string' ? content : i18n['global.dialog.content.confirm'])
				+ '</div>').dialog({
			modal: true,
			zIndex:2300,
			resizable : false,
			buttons: {
				Ok : {
					click : function() {
						if(callback1 && typeof callback1=="function"){
							callback1.call(this);
						}
					},
					'class' : 'orange',
					text : i18n['global.dialog.button.yes']
				},
				Cancel : {
					click : function() {
						$(this).dialog("close");
						if (callback2 && typeof callback2 == "function") {
							callback2.call(this);
						};
					},
					'class' : 'gray',
					text : i18n['global.dialog.button.no']
				}
			}
		});
		
		dialogCache.push(confirm);
	};
	
	// When leaving the page call it.
	Dialog.leavePage=function(title,content,callback1,callback2){
	    if(jQuery.isFunction(arguments[0])){
	    	callback1 = arguments[0];
	    	callback2 = arguments[1];
	    }
		var confirm = $('<div title="'
				+ (title && typeof title == 'string' ? title : i18n['global.dialog.title.leavePage']) + '">'
				+ (content && typeof content == 'string' ? content : i18n['global.dialog.content.leavePage'])
				+ '</div>').dialog({
			modal: true,
			zIndex:2300,
			resizable : false,
			buttons: {
				Ok : {
					click : function() {
						if(callback1 && typeof callback1=="function"){
							callback1.call(this);
						}
						$(this).dialog("close");
					},
					'class' : 'orange',
					text : i18n['global.dialog.button.yes']
				},
				Cancel : {
					click : function() {
						$(this).dialog("close");
						if (callback2 && typeof callback2 == "function") {
							callback2.call(this);
						};
					},
					'class' : 'gray',
					text : i18n['global.dialog.button.no']
				}
			}
		});
		
		dialogCache.push(confirm);
	};
	
	Dialog.dialog=function(domId,settings,callback){
	    var $dom=$("#"+domId);
		Dialog.content=$dom.html();
		if(typeof arguments[1] == 'function'){
			callback = settings;
		}
	    settings = settings || {};
	    var dialogConf = {
	        zIndex:2300,
			modal : true,
			width : 500,
			height : 400,
			resizable : false,
			buttons : {
				Ok : {
					click : function() {
						if (callback && typeof callback == "function") {
							callback.call(this);
						}
					},
					'class' : 'orange',
					text : i18n['global.dialog.button.ok']
				},
				Cancel : {
					click : function() {
						$(this).dialog("close");
					},
					'class' : 'gray',
					text : i18n['global.dialog.button.cancel']
				}
			}
//			,
//			close : function() {
//				$(this).dialog('destroy');
//				$("#" + domId).html(Dialog.content);
//			}
		}
		$.extend(dialogConf,settings);
		
		$dom.dialog(dialogConf);
		dialogCache.push($dom);
	};
	
	Dialog.destroyAll = function(){
		jQuery.each( dialogCache, function( i, v ) {
			v.dialog('destroy');
			v.remove();
		});
		dialogCache = [];
	}
	common.dialog=Dialog;
})(EB_Common);