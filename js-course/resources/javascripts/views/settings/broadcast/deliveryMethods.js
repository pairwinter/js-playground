(function(view){
	view.settings.broadcast = function(){};
	view.settings.broadcast.deliveryMethods = function(){};
	view.settings.broadcast.deliveryMethods.initPage = function() {
		setMoveBtn();
		
		$('#deliveryMethodsBody input[name="isDefault"]').bind('click', setDefault);
		
		var adding = false;
		EB_Common.validation.validate("addDeliveryMethodForm",{
    		submitHandler:function(){
    			if(adding)
    				return;
    			adding = true;
    			EB_Common.Ajax.post(
    				"/setting/broadcast/deliveryMethods",
    				{
    					prompt : $("#prompt").val(),
    					pathId : $("#code").val(),
    					seq	   : $("#addDeliveryMethodsRow").find("td").eq(0).text()
    				},
    				function(data) {
    					if (data == '-1') {
    						EB_Common.dialog.alert(i18n['setting.error.deliveryMethod.exists'],i18n['dialog.title.warning']);
    						return;
    					}
    					var option = $("#code option[value='"+ data.pathId +"']");
    					var str = '<tr id = "'+ data.id +'" name="data"><td class="text-center">'+data.seq+'</td><td id="'+option.val()+'">'+option.text()+'</td><td>'
    							+ '</td><td><input type="checkbox" name="isDefault" /></td><td><a class="icn_edit_16" href="javascript:void(0);" title="'+i18n['button.edit']+'" onclick="EB_View.settings.broadcast.deliveryMethods.update(this);"></a>'
    							+ '<a class="icn_trash_16" href="javascript:void(0);" title="'+i18n['button.delete']+'" onclick="EB_View.settings.broadcast.deliveryMethods.deleteType(this);"></a></td></tr>';
    					$("#deliveryMethodsBody").append(str);
    					$('#' + data.id +' td:eq(2)').text(data.prompt);
    					$("#" + data.id +' input[name="isDefault"]').bind("click",setDefault);
    					$("#code").val("");
    					$("#prompt").val("");
    					option.remove();
    					var length = $("#code option[value!='']").length;
    					if(length == 0){
    						$("#addDeliveryMethodsRow").hide();
    					}
    					setMoveBtn();
    					setTrSeq();
    					adding = false;
    				});
    		}
		});
		
		EB_Common.validation.validate("updateDeliveryMethodForm",{
    		submitHandler:function(){
    			var tr = $("#newName").closest('tr');
    			var td1 = tr.find("td").eq(2);
    			var newName = $("#newName").val();
    			EB_Common.Ajax.put("/setting/broadcast/deliveryMethods",
    				{
    					id : tr.attr("id"),
    					prompt : newName
    				},
    				function(data) {
    					//console.log(data);
    					if (data == '-1') {
    						EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
    						return;
    					}
    					td1.text(newName);
    					var td2 = tr.find("td").eq(4);
    					td2.text("");
    					td2.append($('<a class="icn_edit_16" href="javascript:void(0);" title="'+i18n['button.edit']+'" onclick="EB_View.settings.broadcast.deliveryMethods.update(this);"></a>'));
    					td2.append($('<a class="icn_trash_16" href="javascript:void(0);" title="'+i18n['button.delete']+'" onclick="EB_View.settings.broadcast.deliveryMethods.deleteType(this);"></a>'));
    					setMoveBtn();
    					flag = true;
    					
    				});
    		}
		});
		
		$("#addDeliveryMethodsRow").click(function(){
			return false;
		});
		
		$("#addDeliveryMethods").click(function() {
			$('#addDeliveryMethodForm').submit();
		});
	};
	
	function setDefault(e){
		var checkBox = $(this);
		var tr = checkBox.closest('tr');
		EB_Common.Ajax.put("/setting/broadcast/deliveryMethods/default",
			{
				id : tr.attr("id"),
				isDefault : checkBox.is(':checked')
			},
			function(data) {
				if (data == '-1') {
					EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
					return;
				}
			});
	}
	
	var flag = true;
	var oldName;
	view.settings.broadcast.deliveryMethods.updateName = function(obj) {
		$('#updateDeliveryMethodForm').submit();
	};

	view.settings.broadcast.deliveryMethods.cancleUpdate = function(obj) {
		var tr = $(obj).closest('tr');
		var td1 = tr.find("td").eq(2);
		td1.text(oldName);
		var td2 = tr.find("td").eq(4);
		td2.text("");
		td2.append($('<a class="icn_edit_16" href="javascript:void(0);" title="'+i18n['button.edit']+'" onclick="EB_View.settings.broadcast.deliveryMethods.update(this);"></a>'));
		td2.append($('<a class="icn_trash_16" href="javascript:void(0);" title="'+i18n['button.delete']+'" onclick="EB_View.settings.broadcast.deliveryMethods.deleteType(this);"></a>'));
		setMoveBtn();
		flag = true;
	};

	view.settings.broadcast.deliveryMethods.update = function(obj) {
		if (flag == false)
			return;
		var tr = $(obj).closest('tr');
		var td3 = tr.find("td").eq(2);
		oldName = td3.text();
		td3.text("");
		td3.append($('<input type="text" class="width_percent94 {required:true}" maxlength="20" name="newName" id="newName" pos="bottom">'));
		$("#newName").val(oldName);
		var td4 = tr.find("td").eq(4);
		td4.text("");
		td4.append($('<a href="javascript:void(0);" class="icn_save_16" title="'+i18n['button.save']+'" onclick="EB_View.settings.broadcast.deliveryMethods.updateName(this);"></a>'));
		td4.append($('<a href="javascript:void(0);" class="icn_cancel_16" title="'+i18n['button.cancel']+'" onclick="EB_View.settings.broadcast.deliveryMethods.cancleUpdate(this);"></a>'));
		flag = false;
	};

	view.settings.broadcast.deliveryMethods.deleteType = function(obj) {
		var tr = $(obj).closest('tr');
		var id = tr.attr("id");
		EB_Common.dialog.confirm(i18n['setting.delete.deliveryMethod'], i18n['global.dialog.title.confirm'], function() {
			$(this).dialog("close");
			EB_Common.Ajax.remove("/setting/broadcast/deliveryMethods", {
				id : id
			}, function(data) {
				if (data == '-1') {
					EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
					return;
				}
				var pathCode = tr.find("td").eq(1).text();
				var pathId = tr.find("td").eq(1).attr("id");
				$("#code option[value!='']").remove();
				var length = data.length;
				for(var i=0; i < length; i++){
					var path = data[i];
					$("#code").append('<option value="'+path.id+'">'+path.prompt+'</option>');
				}
				$("#addDeliveryMethodsRow").show();
				tr.remove();
				setMoveBtn();
				setTrSeq();
			});
		}, function() {
			return;
		});
	};
	
	var moving = false;
	view.settings.broadcast.deliveryMethods.moveUp = function(obj){
		if(moving)
			return;
		var tr = $(obj).closest('tr');
		var prevTr = tr.prev();
		var td = tr.find("td").eq(4);
		var seq = tr.find("td").eq(0).text();
		var prevTd = prevTr.find("td").eq(4);
		var trAction = td.find("a");
		var preTrAction = $(prevTd).find("a");
		moving = true;
		//console.log(seq);
		EB_Common.Ajax.put("/setting/broadcast/deliveryMethods/move",
				{
					id : tr.attr("id"),
					seq : seq -1 ,
					targetSeq: seq,
					targetId:$(prevTr).attr("id")
				},
				function(data) {
					if (data == '-1') {
						EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
						return;
					}
					td.find("a").remove();
					prevTd.find("a").remove();
					td.append(preTrAction);
					prevTd.append(trAction);
					prevTr.before(tr);
					setTrSeq();
					moving = false;
				});
	};
	
	view.settings.broadcast.deliveryMethods.moveDown = function(obj){
		if(moving)
			return;
		var tr = $(obj).closest('tr');
		var nextTr = tr.next();
		var seq = tr.find("td").eq(0).text();
		var td = tr.find("td").eq(4);
		var nextTd = nextTr.find("td").eq(4);
		var trAction = td.find("a");
		var nextTrAction = nextTd.find("a");
		moving = true;
		EB_Common.Ajax.put("/setting/broadcast/deliveryMethods/move",
			{
				id : tr.attr("id"),
				seq : new Number(seq)+1 ,
				targetSeq: seq,
				targetId:nextTr.attr("id")
			},
			function(data) {
				//console.log(data);
				if (data == '-1') {
					EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
					return;
				}
				td.find("a").remove();
				nextTd.find("a").remove();
				td.append($(nextTrAction));
				nextTd.append($(trAction));
				nextTr.after(tr);
				setTrSeq();
				moving = false;
			});
	};

	function setTrSeq() {
		var trs = $("#deliveryMethodsBody tr");
		var rowCount = $(trs).length;
		for (var i = 0; i < rowCount; i++) {
			$(trs[i]).find("td").eq(0).text(i+1);
		}
	}
	
	function setMoveBtn(){
		$(".icn_up").remove();
		$(".icn_down").remove();
		var trs = $("#deliveryMethodsBody tr[name='data']");
		var rowCount = trs.length;
		if(rowCount > 1){
			var moveUp = '<a href="javascript:void(0);" class="icn_up" onclick="EB_View.settings.broadcast.deliveryMethods.moveUp(this);"></a>';
			var moveDown = '<a href="javascript:void(0);" class="icn_down" onclick="EB_View.settings.broadcast.deliveryMethods.moveDown(this);"></a>';
			$(trs[0]).find("td").eq(4).append($(moveDown));
			var lastTd = $(trs[rowCount-1]).find("td").eq(4);
			lastTd.append($(moveUp));
			for ( var i = 1; i < rowCount-1; i++) {
                $(trs[i]).find("td").eq(4).append($(moveDown));
				$(trs[i]).find("td").eq(4).append($(moveUp));
			}
		}
	}
		
})(EB_View);