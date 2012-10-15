(function(view){
	view.settings.broadcast = function(){};
	view.settings.broadcast.greetingLib = function(){};
	view.settings.broadcast.greetingLib.initPage = function() {
		$('#remove_existed_standard_voice').click(function(){
			$('#existedStandardVoiceDiv').hide();
			$("#viaType").removeAttr("disabled","");
			var p1=$("#viaType").children('option:selected').val();
			 if(p1 == 'UPLOAD'){
				 $("#upload").show();
			 }else{
				 $("#record").show();
			 }
		});
		
		$('#remove_existed_emergency_voice').click(function(){
			$('#existedEmergencyVoiceDiv').hide();
			$("#emViaType").removeAttr("disabled","");
			var p1=$("#emViaType").children('option:selected').val();
			 if(p1 == 'UPLOAD'){
				 $("#emUpload").show();
			 }else{
				 $("#emRecord").show();
			 }
		});
		
		
		$('input[name="recordType"]').change(function(){
			 var standardAudioKey = $('#standardAudioKey').val();
			 
			 if($(this).val() == 'default'){
				 $("#viaType").attr("disabled","disabled");
				 $("#upload").hide();
				 $("#record").hide();
				 $("#existedStandardVoiceDiv").hide();
			 }else{
				 if(standardAudioKey == ''){
					 $("#viaType").removeAttr("disabled","");
					 
					 var p1=$("#viaType").children('option:selected').val();
					 if(p1 == 'UPLOAD'){
						 $("#record").hide();
						 $("#upload").show();
					 }else{
						 $("#upload").hide();
						 $("#record").show();
					 }
				 }else{
					 $("#existedStandardVoiceDiv").show();
				 }
			 }
		 }); 
		 
		 $("#viaType").change(function(){ 
			 if($('#existedStandardVoiceDiv').css('display') != 'none')
				 return;
			 var p1=$(this).children('option:selected').val();
			 if(p1 == 'UPLOAD'){
				 $("#record").hide();
				 $("#upload").show();
			 }else{
				 $("#upload").hide();
				 $("#record").show();
			 }
		 }) ;
		 
		 
		 $('input[name="emRecordType"]').change(function(){
			 var emergencyAudioKey = $('#emergencyAudioKey').val();
			 if($(this).val() == 'default'){
				 $("#emViaType").attr("disabled","disabled");
				 $("#emUpload").hide();
				 $("#emRecord").hide();
				 $("#existedEmergencyVoiceDiv").hide();
			 }else{
				 if(emergencyAudioKey == ''){
					 $("#emViaType").removeAttr("disabled","");
					 
					 var p1=$("#emViaType").children('option:selected').val();
					 if(p1 == 'UPLOAD'){
						 $("#emRecord").hide();
						 $("#emUpload").show();
					 }else{
						 $("#emUpload").hide();
						 $("#emRecord").show();
					 }
				 }else{
					 $("#existedEmergencyVoiceDiv").show();
				 }
			 }
		 }); 
		 
		 $("#emViaType").change(function(){ 
			 if($('#existedEmergencyVoiceDiv').css('display') != 'none')
				 return;
			 var p1=$(this).children('option:selected').val();
			 //console.log(p1);
			 if(p1 == 'UPLOAD'){
				 $("#emRecord").hide();
				 $("#emUpload").show();
			 }else{
				 $("#emUpload").hide();
				 $("#emRecord").show();
			 }
		 }) ;
		 
		 $('#save').click(function() {
			 var viaType = getRecordType('viaType');
			 var emViaType = getRecordType('emViaType');
			 var standardVoice='';
			 var emergencyVoice='';
			 if(viaType == 'UPLOAD'){
				 standardVoice=$("input[name='standardUploadedVoice']").val();
			 }else if(viaType == 'APPLET'){
				 standardVoice=$("input[name='recordedVoice']").val();
			 }
			 
			 if(emViaType == 'UPLOAD'){
				 emergencyVoice=$("input[name='emergencyUploadedVoice']").val();
			 }else if(emViaType == 'APPLET'){
				 emergencyVoice=$("input[name='emRecordedVoice']").val();
			 }
			 
			 var standardAudioKey = $('#standardAudioKey').val();
			 var emergencyAudioKey = $('#emergencyAudioKey').val();
			 EB_Common.logger.log(viaType);
			 EB_Common.logger.log(emViaType);
			 
			 if(standardAudioKey == '' && !checkVoice(viaType,standardVoice)){
				 EB_Common.dialog.alert(i18n['setting.error.greeting.standard.nofile'],i18n['dialog.title.error']);
				 return;
			 }
			 
			 if(emergencyAudioKey == '' && !checkVoice(emViaType,emergencyVoice)){
				 EB_Common.dialog.alert(i18n['setting.error.greeting.emergency.nofile'],i18n['dialog.title.error']);
				 return;
			 }
			 
			 EB_Common.Ajax.post("/setting/broadcast/greetingLib",{viaType:viaType,emViaType:emViaType,standardVoice:standardVoice,emergencyVoice:emergencyVoice},function(data){
				 if(viaType == 'DEFAULT'){
					 $('#standardAudioKey').val(""); 
				 }	
				 if(emViaType == 'DEFAULT'){
					 $('#emergencyAudioKey').val(""); 
				 }
				 var standardAudio = data.standardAudio;
				 if(standardAudio != null){
					$('#standardAudioKey').val(standardAudio.id);
					var div = '<div id="standardAudioInfo"><a href="javascript:void(0)">'+EB_Common.escapeHTML(standardAudio.name)+'</a>('+EB_Common.escapeHTML(standardAudio.createdName)+','+
							standardAudio.formattedCreatedDate+','+
							standardAudio.length+'KB)<a href="javascript:void(0)" class="icn_trash_16" id="remove_existed_standard_voice"></a>(remove existed voice to add new)</div>';
					
					$('#standardAudioInfo').remove();
					$('#existedStandardVoiceDiv').append(div);
					$('#existedStandardVoiceDiv').show();
					$("#upload").hide();
					$("#record").hide();
					$("#viaType").attr("disabled","disabled");
					$('#remove_existed_standard_voice').click(function(){
						$('#existedStandardVoiceDiv').hide();
						$("#viaType").removeAttr("disabled","");
						var p1=$("#viaType").children('option:selected').val();
						 if(p1 == 'UPLOAD'){
							 $("#upload").show();
						 }else{
							 $("#record").show();
						 }
					});
				 }
				 
				 var emergencyAudio = data.emergencyAudio;
				 if(emergencyAudio != null){
					$('#emergencyAudioKey').val(emergencyAudio.id);
					var div = '<div id="emergencyAudioInfo"><a href="javascript:void(0)">'+EB_Common.escapeHTML(emergencyAudio.name)+'</a>('+EB_Common.escapeHTML(emergencyAudio.createdName)+','+
					emergencyAudio.formattedCreatedDate+','+
					emergencyAudio.length+'KB)<a href="javascript:void(0)" class="icn_trash_16" id="remove_existed_emergency_voice"></a>(remove existed voice to add new)</div>';
					
					$('#emergencyAudioInfo').remove();
					$('#existedEmergencyVoiceDiv').append(div);
					$('#existedEmergencyVoiceDiv').show();
					$("#emUpload").hide();
					$("#emRecord").hide();
					$("#emViaType").attr("disabled","disabled");
					$('#remove_existed_emergency_voice').click(function(){
						$('#existedEmergencyVoiceDiv').hide();
						$("#emViaType").removeAttr("disabled","");
						var p1=$("#emViaType").children('option:selected').val();
						 if(p1 == 'UPLOAD'){
							 $("#emUpload").show();
						 }else{
							 $("#emRecord").show();
						 }
					});
				 }
				 
				 
	        		EB_Common.ToolPrompt.show('save',i18n['glocal.savesuccess']);
	        		
	        		//reset Leave Page State
                	EB_Common.LeavePage.resetState();
	         });
		 });
	};
	function checkVoice(type,voice){
		if(type != 'DEFAULT'){
			if(typeof voice == 'undefined' || voice == '')
				return false;
		}
		return true;
	}
	
	function getRecordType(selectId){
		var select = $('#'+selectId);
		var attr = select.attr('disabled');
		if(attr == 'disabled' && !select.prev().is(':checked')){
			return 'DEFAULT';
		}else{
			return select.children('option:selected').val();
		}
	}
	
})(EB_View);
