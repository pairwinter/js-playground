(function(view){
	view.settings.contact = function(){};
	view.settings.contact.recordType = function(){};
	view.settings.contact.recordType.initRecordTypePage = function() {
		var adding = false;
		var addValidater = EB_Common.validation.validate("addRecordTypeForm",{
			rules: {
				name:{
					remote: {
							url : EB_Common.Ajax.wrapperUrl("/setting/contact/checkRecordTypeName")
						}
					}
			},
			messages: {
				name:{remote:i18n['setting.error.recordType.duplicatedName']}
    		},
    		submitHandler:function(){
    			if(adding)
    				return;
    			adding = true;
    			EB_Common.Ajax.post("/setting/contact/recordType",
					{
						name : $("#name").val()
					},
					function(data) {
						var str = '<tr><td id = "'+ data.id +'">'
								+ '</td><td><a class="icn_edit_16" href="javascript:void(0);" title="'+i18n['button.edit']+'" onclick="EB_View.settings.contact.recordType.update(this);"></a>'
								+ '<a class="icn_trash_16" href="javascript:void(0);" title="'+i18n['button.delete']+'" onclick="EB_View.settings.contact.recordType.deleteType(this);"></a></td></tr>';
						$("#typeBody").append(str);
						$('#'+data.id).text(data.name);
						$("#name").val("");
						$("#name").removeData("previousValue");
						adding = false;
					}
				);
			}
		});
		
		EB_Common.validation.validate("updateRecordTypeForm",{
    		submitHandler:function(form){
    			var newName = $("#newName").val();
    			var tr = $("#newName").closest('tr');
    			var td1 = tr.find("td").eq(0);
    			EB_Common.Ajax.put("/setting/contact/recordType",
    				{
    					id : td1.attr("id"),
    					name : newName
    				},
    				function(data) {
    					if (data == '-1') {
							EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
							return;
						}
    					
						td1.text(newName);
						var td2 = tr.find("td").eq(1);
						td2.text("");
						td2.append($('<a class="icn_edit_16" href="javascript:void(0);" title="'+i18n['button.edit']+'" onclick="EB_View.settings.contact.recordType.update(this);"></a>'));
						if(amount == 2)
							td2.append($('<a class="icn_trash_16" href="javascript:void(0);" title="'+i18n['button.delete']+'" onclick="EB_View.settings.contact.recordType.deleteType(this);"></a>'));
						flag = true;
    				});
			}
		});
		
		$("#addRow").click(function(){
			return false;
		});
		
		$("#add").click(function() {
			$('#addRecordTypeForm').submit();
		});
	};
	
	var amount;
	var flag = true;
	var oldName;
	view.settings.contact.recordType.updateName = function(obj) {
		$('#updateRecordTypeForm').submit();
	};

	view.settings.contact.recordType.cancleUpdate = function(obj) {
		var tr = $(obj).closest('tr');
		var td1 = tr.find("td").eq(0);
		td1.text(oldName);
		var td2 = tr.find("td").eq(1);
		td2.text("");
		td2.append($('<a class="icn_edit_16" href="javascript:void(0);" title="'+i18n['button.edit']+'" onclick="EB_View.settings.contact.recordType.update(this);"></a>'));
		if(amount == 2)
			td2.append($('<a class="icn_trash_16" href="javascript:void(0);" title="'+i18n['button.delete']+'" onclick="EB_View.settings.contact.recordType.deleteType(this);"></a>'));
		flag = true;
	};

	view.settings.contact.recordType.update = function(obj) {
		if (flag == false)
			return;
		var tr = $(obj).closest('tr');
		var td1 = tr.find("td").eq(0);
		oldName = td1.text();
		td1.text("");
		td1.append($('<input type="text" class="width_percent94 {required:true}" maxlength="50" name="name" id="newName" pos="bottom">'));
		$("#newName").val(oldName);
		var td2 = tr.find("td").eq(1);
		amount = td2.find('a').length;
		td2.text("");
		td2.append($('<a href="javascript:void(0);" class="icn_save_16" title="'+i18n['button.save']+'" onclick="EB_View.settings.contact.recordType.updateName(this);"></a>'));
		td2.append($('<a href="javascript:void(0);" class="icn_cancel_16" title="'+i18n['button.cancel']+'" onclick="EB_View.settings.contact.recordType.cancleUpdate(this);"></a>'));
		$("#newName").rules("remove","remote");
    	$("#newName").rules("add", {
    		remote: {
    			url:EB_Common.Ajax.wrapperUrl("/setting/contact/checkRecordTypeName"),
    			data:{
    				id: function() {
    		            return td1.attr("id");
    				}
    			}
    		},
    		messages: {
    			remote:i18n['setting.error.recordType.duplicatedName']
    		}
    	});

		flag = false;
	};

	view.settings.contact.recordType.deleteType = function(obj) {
		var tr = $(obj).closest('tr');
		var id = tr.find("td").eq(0).attr("id");
		EB_Common.dialog.confirm(i18n['setting.delete.recordType'], i18n['global.dialog.title.confirm'], function() {
			$(this).dialog("close");
			EB_Common.Ajax.remove("/setting/contact/recordType", {
				id : id
			}, function(data) {
				if (data == '-1') {
					EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
					return;
				}
				if(data == '-2'){
					EB_Common.dialog.alert(i18n['setting.error.recordType.inUse'],i18n['dialog.title.warning']);
					return;
				}
				tr.remove();
			});
		}, function() {
			return;
		});
	};

})(EB_View);