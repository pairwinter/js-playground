//provide a graceful firebug console wrapper to avoid error
(function(common){
	common.include(["/javascripts/everbridge/dialog/dialog.css"]);
	var Dialog={};
	Dialog.alert=function(content,title,callback){
		$('<div title="'+(title?title:"Alert")+'">'+content+'</div>').dialog({
			modal: true,
			buttons: {
				Ok: function() {
					$( this ).dialog( "close" );
					if(callback && typeof callback=="function"){
						callback();
					}
				}
			}
		});
	}
	Dialog.confirm=function(content,title,callback1,callback2){
		$('<div title="'+(title?title:"Confirm")+'">'+content+'</div>').dialog({
			modal: true,
			buttons: {
				Ok: function() {
					if(callback1 && typeof callback1=="function"){
						callback1.call(this);
					}
				},
				Cancel:function() {
					$( this ).dialog( "close" );
					if(callback2 && typeof callback2=="function"){
						callback2.call(this);
					};
				}
			},
			close:function() {
			}
		});
	};
	
	Dialog.dialog=function(domId,width,height,callback){
		var $dom=$("#"+domId);
		Dialog.content=$dom.html();
		var w=500,h=400;
		if(typeof arguments[1]!="function")
		{
			w=width;
			h=height;
		}
		$dom.dialog({
			modal: true,
			width:w,
			height:h,
			buttons: {
				Ok: function() {
					if(callback && typeof callback=="function"){
						callback.call(this);
					}
				},
				Cancel:function() {
					$( this ).dialog( "close" );
				}
			},
			close:function(){
				$(this).dialog('destroy');
				$("#"+domId).html(Dialog.content);
			}
		})
	}
	common.dialog=Dialog;
})(EB_Common);