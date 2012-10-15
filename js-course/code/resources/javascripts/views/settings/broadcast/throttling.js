(function(view){
	view.settings.broadcast = function(){};
	view.settings.broadcast.throttling = function(){};
	view.settings.broadcast.throttling.initPage = function() {
		EB_Common.validation.validate("addThrottlingForm",{
			rules: {
				name:{remote: EB_Common.Ajax.wrapperUrl("/setting/broadcast/throttling/checkThrottleRuleName")}
			},
			messages: {
				name:{remote:i18n['setting.error.throttleRule.duplicatedName']}
    		},
    		submitHandler:function(form){
    			if(adding)
    				return;
    			adding = true;
    			var option = $("#code option[value='"
    					+ $("#code").val() + "']");
    					//console.log(option);
    					
    			EB_Common.Ajax.post("/setting/broadcast/throttling",
    				{
    					countryCode : $("#code").val(),
    					countryName : option.text(),
    					name : $("#name").val(),
    					rule : $("#rule").val(),
    					amount : $("#amount").val()
    				},
    				function(data) {
    					var str = '<tr id = "'+ data.id +'"><td></td><td id="'+data.countryCode+'">'
    							+ data.countryName
    							+ '</td><td>'
    							+ data.rule
    							+ '</td><td>'
    							+ data.amount
    							+ '</td><td class="nowrap"><a class="icn_edit_16" href="javascript:void(0);" title="'+i18n['button.edit']+'" onclick="EB_View.settings.broadcast.throttling.update(this);"></a>'
    							+ '<a class="icn_trash_16" href="javascript:void(0);" title="'+i18n['button.delete']+'" onclick="EB_View.settings.broadcast.throttling.deleteType(this);"></a></td></tr>';
    							
    					$("#throttlingBody").append(str);
    					$('#' + data.id +' td:eq(0)').text(data.name);
    					$("#name").val("");
    					$("#code").val("");
    					$("#rule").val("");
    					$("#amount").val("");
    					$("#name").removeData("previousValue");
    					adding = false;
    				});
    		}
		});
		
		EB_Common.validation.validate("updateThrottlingForm",{
    		submitHandler:function(form){
    			var tr = $("#newName").closest('tr');
    			var td1 = tr.find("td").eq(0);
    			var td2 = tr.find("td").eq(1);
    			var td3 = tr.find("td").eq(2);
    			var td4 = tr.find("td").eq(3);
    			
    			var option = $("#updateCode option[value='"
    					+ $("#updateCode").val() + "']");
    			var newName = $("#newName").val();
    			var newRule = $("#newRule").val();
    			var newAmount = $("#newAmount").val();
    			EB_Common.Ajax.put("/setting/broadcast/throttling",
    				{
    					id : tr.attr("id"),
    					name : newName,
    					rule:  newRule,
    					amount:newAmount, 
    					countryCode : $('#updateCode').val(),
    					countryName : option.text()
    				},
    				function(data) {
    					if (data == '-1') {
    						EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
    						return;
    					}
    					td1.text(newName);
    					td2.attr("id",$('#updateCode').val());
    					td2.text(option.text());
    					td3.text(newRule);
    					td4.text(newAmount);
    					
    					var td5 = tr.find("td").eq(4);
    					td5.text("");
    					td5.append($('<a class="icn_edit_16" href="javascript:void(0);" title="'+i18n['button.edit']+'" onclick="EB_View.settings.broadcast.throttling.update(this);"></a>'));
    					td5.append($('<a class="icn_trash_16" href="javascript:void(0);" title="'+i18n['button.delete']+'" onclick="EB_View.settings.broadcast.throttling.deleteType(this);"></a>'));
    					flag = true;
    				}
    			);
    		}
		});
		
		EB_Common.validation.validate("amountForm",{});
		
		$('#throttlingBody').on('change', 'select.select', addRule);
		
		$('#formBut0').click(function() {
            var queryString = $('#throttlingForm').formSerialize(); 
            EB_Common.Ajax.put("/setting/broadcast/throttling/flag?"+queryString,{},
        		function(data){ 
            		EB_Common.ToolPrompt.show('formBut0',i18n['glocal.savesuccess']);
            		
            		//reset Leave Page State
                	EB_Common.LeavePage.resetState();
        		});
		}); 
		
		$("#applyByFlag").click(function(){
			if($(this).attr("checked")){
				$("#enforceAllFlag").removeAttr("disabled","");
			}else{
				$("#enforceAllFlag").attr("disabled","disabled");
				$("#enforceAllFlag").removeAttr("checked","");
			}

		});
		
		$("#code").change(function(){
			$("#rule").rules("remove","remote");
			$("#rule").rules("add", {
				remote: {
	    			url:EB_Common.Ajax.wrapperUrl("/setting/broadcast/throttling/checkThrottleRuleRule"),
	    			data:{
	    				countryCode:function(){
	    					return $("#code").val();
	    				}
	    			}
	    		},
	    		messages: {
	    			remote:i18n['setting.error.throttleRule.duplicatedPattern']
	    		 }
	    	});
			$("#rule").removeData("previousValue").valid();
		});
		
		$("#addThrottling").click(function() {
			$("#rule").rules("remove","remote");
	    	$("#rule").rules("add", {
	    		remote: {
	    			url:EB_Common.Ajax.wrapperUrl("/setting/broadcast/throttling/checkThrottleRuleRule"),
	    			data:{
	    				countryCode:function(){
	    					return $("#code").val();
	    				}
	    			}
	    		},
	    		messages: {
	    			remote:i18n['setting.error.throttleRule.duplicatedPattern']
	    		 }
	    	});
			
	    	$('#addThrottlingForm').submit();
			
		});
	};
	
	var adding = false;
	
	function addRule(e){
		var tr = $("#newRule").closest('tr');
		$("#newRule").rules("remove","remote");
		$("#newRule").rules("add", {
    		remote: {
    			url:EB_Common.Ajax.wrapperUrl("/setting/broadcast/throttling/checkThrottleRuleRule"),
    			data:{
    				countryCode:function(){
    					return $("#updateCode").val();
    				},
    				id:function(){
    					return tr.attr("id");
    				}
    			}
    		},
    		messages: {
    			remote:i18n['setting.error.throttleRule.duplicatedPattern']
    		 }
    	});
		$("#newRule").removeData("previousValue").valid();
	}
	
	var flag = true;
	var oldName;
	var oldCountryName;
	view.settings.broadcast.throttling.updateName = function(obj) {
		$('#updateThrottlingForm').submit();
	};

	view.settings.broadcast.throttling.cancleUpdate = function(obj, oldRule, oldAmount) {
		var tr = $(obj).closest('tr');
		var td1= tr.find("td").eq(0);
		var td2= tr.find("td").eq(1);
		var td3 = tr.find("td").eq(2);
		var td4 = tr.find("td").eq(3);
		td1.text(oldName);
		td2.text(oldCountryName);
		td3.text(oldRule);
		td4.text(oldAmount);
		var td5 = tr.find("td").eq(4);
		td5.text("");
		td5.append($('<a class="icn_edit_16" href="javascript:void(0);" title="'+i18n['button.edit']+'" onclick="EB_View.settings.broadcast.throttling.update(this);"></a>'));
		td5.append($('<a class="icn_trash_16" href="javascript:void(0);" title="'+i18n['button.delete']+'" onclick="EB_View.settings.broadcast.throttling.deleteType(this);"></a>'));
		flag = true;
	};

	view.settings.broadcast.throttling.update = function(obj) {
		if (flag == false)
			return;
		var tr = $(obj).closest('tr');
		var td1= tr.find("td").eq(0);
		var td2= tr.find("td").eq(1);
		var td3 = tr.find("td").eq(2);
		var td4 = tr.find("td").eq(3);
		oldName = td1.text();
		var oldRule = td3.text();
		var oldAmount = td4.text();
		td1.text("");
		td1.append($('<input type="text" class="width_percent94 {required:true}" maxlength="30" name="name" id="newName" pos="bottom">'));
		$("#newName").val(oldName);
		
		var updateCode = $('#code').clone();
		oldCountryName = td2.text()
		updateCode.attr("id","updateCode");
		updateCode.find('option[value=""]').remove();
		updateCode.val(td2.attr("id"));
		td2.text("");
		td2.append(updateCode);
		
		td3.text("");
		td3.append($('<input type="text" class="width_percent94 {required:true,digits:true,minlength:3}" maxlength="20" name="rule" id="newRule" pos="bottom">'));
		$("#newRule").val(oldRule);
		
		td4.text("");
		td4.append($('<input type="text" class="width_percent94 {required:true,range:[1,9999]}" maxlength="4" name="newAmount" id="newAmount" pos="bottom">'));
		$("#newAmount").val(oldAmount);
		
		var td5 = tr.find("td").eq(4);
		td5.text("");
		td5.append($('<a href="javascript:void(0);" class="icn_save_16 margin5-R" title="'+i18n['button.save']+'" onclick="EB_View.settings.broadcast.throttling.updateName(this);"></a>'));
		td5.append($('<a href="javascript:void(0);" class="icn_cancel_16" title="'+i18n['button.cancel']+'" onclick="EB_View.settings.broadcast.throttling.cancleUpdate(this,\''
						+ oldRule + '\',\''+ oldAmount +'\');"></a>'));
		
		$("#newRule").rules("add", {
    		remote: {
    			url:EB_Common.Ajax.wrapperUrl("/setting/broadcast/throttling/checkThrottleRuleRule"),
    			data:{
    				countryCode:function(){
    					return $("#updateCode").val();
    				},
    				id:function(){
    					return tr.attr("id");
    				}
    			}
    		},
    		messages: {
    			remote:i18n['setting.error.throttleRule.duplicatedPattern']
    		 }
    	});
	
    	$("#newName").rules("add", {
    		remote: {
    			url:EB_Common.Ajax.wrapperUrl("/setting/broadcast/throttling/checkThrottleRuleName"),
    			data:{
    				id:function(){
    					return tr.attr("id");
    				}
    			}
    		},
    		messages: {
    			remote:i18n['setting.error.throttleRule.duplicatedName']
    		 }
    	});
		flag = false;
	};

	view.settings.broadcast.throttling.deleteType = function(obj) {
		var tr = $(obj).closest('tr');
		var id = tr.attr("id");
		EB_Common.dialog.confirm(i18n['setting.delete.throttling'], i18n['global.dialog.title.confirm'], function() {
			$(this).dialog("close");
			EB_Common.Ajax.remove("/setting/broadcast/throttling", 
			{
				id : id
			}, function(data) {
				if (data == '-1') {
					EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
					return;
				}
				tr.remove();
			});
		}, function() {
			return;
		});
	};

	view.settings.broadcast.throttling.editAmount = function(obj) {
		var span = $(obj).prev();
		var amount = $.trim(span.text());
		
		span.after($('<input type="text" class="input_width40 margin5-R {required:true,range:[1,9999]}" maxlength="4" name="newAmount" id="newAmount" >'));
		if(amount == i18n['setting.broadcast.throttling.maxCall.noLimit']){
			$("#newAmount").val("");
		}else{
			$("#newAmount").val(amount);
		}
		
		span.text("");
		span.attr("class","");

		$("#editAmount").attr("onclick", "EB_View.settings.broadcast.throttling.saveUpdate(this)");
		$("#editAmount").text(i18n['button.save']);
		$("#editAmount").after($('<a id="cancleEdit" style="padding-left: 5px" href="javascript:void(0);" onclick="EB_View.settings.broadcast.throttling.cancleEdit(this,\''
								+ amount + '\');">'+i18n['button.cancel']+'</a>'));
	};

	view.settings.broadcast.throttling.saveUpdate = function(obj) {
		var amount = $("#newAmount").val();
		if ($("#newAmount").valid() == false){
			return;
		}
		EB_Common.Ajax.put("/setting/broadcast/throttling/defaultAmount", {
			amount : amount
		}, function(data) {
			//var span = $("#editAmount").prev().prev();
			$("#amountForm").find("label.error").remove();
			var span = $("#editAmount").prevUntil('span').prev();
			span.text(amount);
			span.attr("class","graybg");
			$("#editAmount").attr("onclick", "EB_View.settings.broadcast.throttling.editAmount(this)");
			$("#editAmount").text(i18n['button.edit']);
			$("#cancleEdit").text("");
			$("#cancleEdit").remove();
			$("#editAmount").prev().remove();
		});

	};

	view.settings.broadcast.throttling.cancleEdit = function(obj, amount) {
		$("#amountForm").find("label.error").remove();
		var span = $("#editAmount").prevUntil('span').prev();
		console.log(span);
		console.log(amount);
		span.text(amount);
		span.attr("class","graybg");
		$("#editAmount").attr("onclick", "EB_View.settings.broadcast.throttling.editAmount(this)");
		$("#editAmount").text(i18n['button.edit']);
		$("#cancleEdit").text("");
		$("#cancleEdit").remove();
		$("#newAmount").remove();
	};
})(EB_View);