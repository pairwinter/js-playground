(function(view){
	view.settings.broadcast = function(){};
	view.settings.broadcast.emailTemplate = function(){};
	view.settings.broadcast.emailTemplate.initEmailTemplatePage = function(id) {
		$('#formBut0').click(function() {
			$('#emailTemplateForm').validate({
				submitHandler:function(){
		            EB_Common.Ajax.put("/setting/broadcast/emailTemplate",{id:id,defaultHeader:$("#defaultHeader").val(),defaultFooter:$("#defaultFooter").val()},function(data){
		            	EB_Common.ToolPrompt.show('formBut0',i18n['glocal.savesuccess']);
		            	
		            	//reset Leave Page State
                		EB_Common.LeavePage.resetState();
		            });
				}
			});
		}); 
		
		textAreaLimit("defaultHeader","defaultHeaderLength");
		textAreaLimit("defaultFooter","defaultFooterLength");
		
		
		$("#defaultHeaderLength").text(300 - $("#defaultHeader").val().length);
		$("#defaultFooterLength").text(300 - $("#defaultFooter").val().length);
	};
	
	function textAreaLimit(textAreaName,textCount){
		var checkInter=null;
		$("#"+textAreaName).focus(function(){
			var ta=$(this);
			var tc=$("#"+textCount);
			checkInter=setInterval(function(){
			var value=ta.val();
			var curLength=value.length;	
			if(curLength > 300){
						value = value.substring(0,300);
						ta.val(value);
						tc.text("0");
					}else{
						tc.text(300-value.length);
					}	
		},1);
		}).blur(function(){
			if(checkInter!=null)
			clearInterval(checkInter);
		});
	}
		
})(EB_View);