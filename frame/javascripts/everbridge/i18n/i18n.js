(function(common){
	if(!common.message)
		common.message={}
	common.message.load=function(l){
		common.message.type=l;
		$.ajax({
			url:"/javascripts/everbridge/i18n/l."+l+".js",
			dataType:"script",
			async:false,
			success:function(){
				$.extend($.validator.messages, common.message.validation.jqueryValidate);
			}
		});
	};
	common.message.load("cn");
})(EB_Common);