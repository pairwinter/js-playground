(function(view){
	view.settings.broadcast = function(){};
	view.settings.broadcast.senderInfo = function(){};
	view.settings.broadcast.senderInfo.initPage = function() {
		$('#formBut0').click(function() {
            var queryString = $('#senderInfoForm').formSerialize(); 
            //console.log(queryString);
            EB_Common.Ajax.put("/setting/broadcast/senderInfo/permission?"+queryString,{},
            		function(data){ 
            		EB_Common.ToolPrompt.show('formBut0',i18n['glocal.savesuccess']);
            		
            		//reset Leave Page State
                	EB_Common.LeavePage.resetState();
            	});
		}); 
		
		$('#senderInfoBody input[name="isDefault"]').bind('click', setDefault);
		
		$("#addSenderInfo").click(function() {
			if(adding)
				return;
			if ($("#code,#callerId").valid() == false){
				return;
			}
			adding = true;
			var code = $("#code").val();
			var option = $("#code option[value='"+ code +"']");
			EB_Common.Ajax.post("/setting/broadcast/senderInfo",
				{
					countryCode : code,
					countryName : option.text(),
					callerId : $("#callerId").val()
				},
				function(data) {
					if (data == '-1') {
						EB_Common.dialog.alert(i18n['setting.error.senderInfo.exists'],i18n['dialog.title.warning']);
						return;
					}
					var defaultValue = '</td><td class="text-center">';
					if (data.isDefault == true) {
						defaultValue += '<input type="radio" name="isDefault" checked="checked" />';
					} else {
						defaultValue += '<input type="radio" name="isDefault" />';
					}
					var str = '<tr id = "'+ data.id +'"><td id="'+data.countryCode+'">'
							+ data.countryName
							+ '</td><td class="text-right">'
							+ data.callerId
							+ defaultValue
							+ '</td><td class="text-center"><a class="icn_edit_16" href="javascript:void(0);" title="'+i18n['button.edit']+'" onclick="EB_View.settings.broadcast.senderInfo.update(this);"></a>'
							+ '<a class="icn_trash_16" href="javascript:void(0);" title="'+i18n['button.delete']+'" onclick="EB_View.settings.broadcast.senderInfo.deleteType(this);"></a>'
							+ '</td></tr>';
					$("#addSenderInfoRow").before(str);
					$("#" + data.id +' input[name="isDefault"]').bind("click",setDefault);
					$("#callerId").val("");
					$("#code").val("");
					option.remove();
					adding = false;
				});
		});
	};
	
	var adding = false;
		
	function setDefault(e){
		var radio = $(this);
		var tr = radio.closest('tr');
		
		EB_Common.Ajax.put("/setting/broadcast/senderInfo/default", {
			id : tr.attr("id")
		}, function(data) {
			if (data == '-1') {
				EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
				return;
			}
		});
	}
	
	var flag = true;
	view.settings.broadcast.senderInfo.updateName = function(obj) {
		var tr = $(obj).closest('tr');
		var td1 = tr.find("td").eq(1);
		
		if ($("#newName").valid() == false){
			return;
		}
		var newName = $("#newName").val();
		
		EB_Common.Ajax.put(
			"/setting/broadcast/senderInfo",
			{
				id : tr.attr("id"),
				callerId : newName
			},
			function(data) {
				if (data == '-1') {
					EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
					return;
				}
				td1.text(newName);
				var td2 = tr.find("td").eq(3);
				td2.text("");
				td2.append($('<a class="icn_edit_16" href="javascript:void(0);" title="'+i18n['button.edit']+'" onclick="EB_View.settings.broadcast.senderInfo.update(this);"></a>'));
				td2.append($('<a class="icn_trash_16" href="javascript:void(0);" title="'+i18n['button.delete']+'" onclick="EB_View.settings.broadcast.senderInfo.deleteType(this);"></a>'));
				flag = true;
			});
	};

	view.settings.broadcast.senderInfo.cancleUpdate = function (obj, oldName) {
		var tr = $(obj).closest('tr');
		var td1 = tr.find("td").eq(1);
		td1.text(oldName);
		var td2 = tr.find("td").eq(3);
		td2.text("");
		td2.append($('<a class="icn_edit_16" href="javascript:void(0);" title="'+i18n['button.edit']+'" onclick="EB_View.settings.broadcast.senderInfo.update(this);"></a>'));
		td2.append($('<a class="icn_trash_16" href="javascript:void(0);" title="'+i18n['button.delete']+'" onclick="EB_View.settings.broadcast.senderInfo.deleteType(this);"></a>'));
		flag = true;
	};

	view.settings.broadcast.senderInfo.update = function(obj) {
		if (flag == false)
			return;
		var tr = $(obj).closest('tr');
		var td2 = tr.find("td").eq(0);
		var td3 = tr.find("td").eq(1);
		var countryCode = td2.attr("id");
		var oldName = $(td3).text();
		td3.text("");
		td3.append($('<input type="text" class="width_percent94 {required:true,phone_length:[\'#'+countryCode+'\',\''+countryCode+'\']}" maxlength="21" name="newName" id="newName" pos="bottom">'));
		$("#newName").val(oldName);
		var td4 = tr.find("td").eq(3);
		td4.text("");
		td4.append($('<a href="javascript:void(0);" class="icn_save_16" title="'+i18n['button.save']+'" onclick="EB_View.settings.broadcast.senderInfo.updateName(this);"></a>'));
		td4.append($('<a href="javascript:void(0);" class="icn_cancel_16" title="'+i18n['button.cancel']+'" onclick="EB_View.settings.broadcast.senderInfo.cancleUpdate(this,\''
						+ oldName + '\');"></a>'));
		flag = false;
	};

	view.settings.broadcast.senderInfo.deleteType = function(obj) {
		var tr = $(obj).closest('tr');
		var id = tr.attr("id");
		EB_Common.dialog.confirm(i18n['setting.delete.senderInfo'], i18n['global.dialog.title.confirm'], function() {
			$(this).dialog("close");
			EB_Common.Ajax.remove("/setting/broadcast/senderInfo", {
				id : id
			}, function(data) {
				if (data == '-1') {
					EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
					return;
				}
				if(data == '-2'){
					EB_Common.dialog.alert(i18n['setting.error.senderInfo.default'],i18n['dialog.title.warning']);
					return;
				}
				
				var country = tr.find("td").eq(0).text();
				var code = tr.find("td").eq(0).attr("id");
				//$("#code").append('<option value="'+code+'">'+country+'</option>');
				$("#code option[value!='']").remove();
				var length = data.length;
				for(var i=0; i < length; i++){
					var country = data[i];
					$("#code").append('<option value="'+country.code+'">'+country.value+'</option>');
				}
				tr.remove();
			});
		}, function() {
			return;
		});
	};

	var email;
	view.settings.broadcast.senderInfo.editEmail = function(obj) {
		var span = $(obj).prev();
		email = span.text();
		span.after($('<input type="text" class="input_long required email margin5_R" name="newEmail" maxlength="80" id="newEmail" >'));
		$("#newEmail").val(email);
		span.text("");

		$("#editEmail").attr("onclick", "EB_View.settings.broadcast.senderInfo.saveUpdate(this)");
		$("#editEmail").text(i18n['button.save']);
		$("#editEmail").after($('<a id="cancleEdit" style="padding-left: 5px" href="javascript:void(0);" onclick="EB_View.settings.broadcast.senderInfo.cancleEdit(this);">'+i18n['button.cancel']+'</a>'));
	};

	view.settings.broadcast.senderInfo.saveUpdate = function(obj) {
		if ($("#newEmail").valid() == false){
			return;
		}
		var email = $("#newEmail").val();
		EB_Common.Ajax.put("/setting/broadcast/senderInfo/email", {
			email : email
		}, function(data) {
			//var span = $("#editEmail").prev().prev();
			$("#editEmail").closest('td').find("label.error").remove();
			var span = $("#editEmail").prevUntil('span').prev();
			$(span).text(email);
			$("#editEmail").attr("onclick", "EB_View.settings.broadcast.senderInfo.editEmail(this)");
			$("#editEmail").text(i18n['button.edit']);
			$("#cancleEdit").text("");
			$("#cancleEdit").remove();
			$("#editEmail").prev().remove();
		});
	};

	view.settings.broadcast.senderInfo.cancleEdit = function(obj) {
		$("#editEmail").closest('td').find("label.error").remove();
		var span = $("#editEmail").prevUntil('span').prev();
		span.text(email);
		$("#editEmail").attr("onclick", "EB_View.settings.broadcast.senderInfo.editEmail(this)");
		$("#editEmail").text(i18n['button.edit']);
		$("#cancleEdit").text("");
		$("#cancleEdit").remove();
		$("#editEmail").prev().remove();

	};

})(EB_View);