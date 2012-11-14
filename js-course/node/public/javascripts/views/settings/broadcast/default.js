(function(view){
	view.settings.broadcast = function(){};
	view.settings.broadcast.defaultMsg = function(){};
	view.settings.broadcast.defaultMsg.initDefaultPage = function() {
	    EB_Common.validation.validate('broadcastDefaultForm',{
			rules :{
				defaultCycles:{
			      required: true,
			      digits: true,
			      min: 1,
			      less_equal: ['#maxCycles',i18n['setting.broadcast.cycles.default'],i18n['setting.broadcast.cycles.maximum']]
			    }
			},
			submitHandler:function(){
	            var queryString = $('#broadcastDefaultForm').formSerialize(); 
	            EB_Common.Ajax.put("/setting/broadcast/default?"+queryString,{},
	            		function(data){ 
	            		EB_Common.ToolPrompt.show('formBut0',i18n['glocal.savesuccess']);
	            		
	            		//reset Leave Page State
                		EB_Common.LeavePage.resetState();
	            	});
			}
		});
			
	};
	
})(EB_View);