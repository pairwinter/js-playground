(function(view){
	view.settings.organization = function(){};
	view.settings.organization.initLoginMsgPage = function() {
		textAreaLimit("loginMsg","loginMsgLength");
		EB_Common.validation.validate("loginMsgForm",{});
		
		$("#loginMsgLength").text(2500 - $("#loginMsg").val().length);
		
		if($("#showMessage").is(":checked")){
			$("#loginMsg").rules("add", {
				required:true
	    	});
		}
		
		$("#showMessage").change(function(){
			if($("#showMessage").is(":checked")){
				$("#loginMsg").rules("add", {
					required:true
		    	});
			}else{
				$("#loginMsg").rules("remove","required");
				$("#loginMsg").removeClass();
				$(".error-right").remove();
			}
			$("#loginMsg").removeData("previousValue").valid();
		});
		
		$('#formBut0').click(function() {
			var showMessage = $("#showMessage").is(":checked");
			
			if ( showMessage && $("#loginMsg").valid() == false){
				return;
			}
            EB_Common.Ajax.put("/setting/organization",{loginMessage:$("#loginMsg").val(),showMessage:showMessage},function(data){
                $("#lastModifiedDate").text(data.lastModifyDate);
                $("#lastModifiedBy").text(data.userName);
                EB_Common.ToolPrompt.show('formBut0',i18n['glocal.savesuccess']);
                
                //reset Leave Page State
                EB_Common.LeavePage.resetState();
            });
			
		}); 
	};
	
	function textAreaLimit(textAreaName,textCount){
		var checkInter=null;
		$("#"+textAreaName).focus(function(){
			var ta=$(this);
			var tc=$("#"+textCount);
			checkInter=setInterval(function(){
			var value=ta.val();
			var curLength=value.length;	
			if(curLength > 2500){
						value = value.substring(0,2500);
						ta.val(value);
						tc.text("0");
					}else{
						tc.text(2500-value.length);
					}	
		},1);
		}).blur(function(){
			if(checkInter!=null)
			clearInterval(checkInter);
		});
	}
	
})(EB_View);