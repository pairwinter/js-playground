(function(view){
	view.settings.contact = function(){};
	view.settings.contact.secureFtp = function(){};
	view.settings.contact.secureFtp.initPage = function() {
		$('#downloadKey').click(function(){
			window.open(EB_Common.Ajax.wrapperUrl("/setting/contact/downloadKey"));
			return false; 
		});
	}

})(EB_View);