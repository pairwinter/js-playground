(function(view){
	view.settings.broadcast = function(){};
	view.settings.broadcast.conferenceBridge = function(){};
	view.settings.broadcast.conferenceBridge.initConferenceBridgePage = function() {
		EB_Common.validation.validate("addConferenceBridgeForm",{
			rules: {
				name:{remote: EB_Common.Ajax.wrapperUrl("/setting/broadcast/conferenceBridge/checkConferenceBridgeName")}
			},
			messages: {
				name:{remote:i18n['setting.error.conferenceBridge.duplicatedName']}
    		},
    		submitHandler:function(){
    			if(adding)
    				return;
    			adding = true;
    			var option = $("#code option[value='"
    					+ $("#code").val() + "']");
    			EB_Common.Ajax.post(
    				"/setting/broadcast/conferenceBridge",
    				{
    					countryCode : $("#code").val(),
    					countryName : option.text(),
    					name : $("#name").val(),
    					number : $("#number").val(),
    					accessPath : $("#wizard").attr('path')
    				},
    				function(data) {
    					//EB_Common.logger.log(data);
    					var str = '<tr id = "'+ data.conferenceBridge.id +'"><td>'
    							+ '</td><td id="'+data.conferenceBridge.countryCode+'">'
    							+ data.conferenceBridge.countryName
    							+ '</td><td>'
    							+ data.conferenceBridge.number
    							+ '</td><td path="'+data.conferenceBridge.accessPath+'">'
    							+ data.conferenceBridge.accessCode
    							+ '</td><td>'
    							+ data.userName
    							+ '</td><td>'
    							+ data.lastModifyDate
    							+ '</td><td><a class="icn_edit_16" href="javascript:void(0);" title="'+i18n['button.edit']+'" onclick="EB_View.settings.broadcast.conferenceBridge.update(this);"></a>'
    							+ '<a class="icn_trash_16" href="javascript:void(0);" title="'+i18n['button.delete']+'" onclick="EB_View.settings.broadcast.conferenceBridge.deleteType(this);"></a></td></tr>';
    					$("#conferenceBridgeBody").append(str);
    					$('#' + data.conferenceBridge.id +' td:eq(0)').text(data.conferenceBridge.name);
    					$("#name").val("");
    					$("#code").val("");
    					$("#number").val("");
    					clearDialog();						
    					var wizard = '<a id="dialog_link" href="javascript:void(0);" onclick="EB_View.settings.broadcast.conferenceBridge.setCode(this);">'+i18n['setting.broadcast.conferenceBridges.wizard']+'</a>';
    					$("#wizard").text("");
    					$("#wizard").append($(wizard));
    					$("#name").removeData("previousValue");
    					adding = false;
    				});
    		}
		});
		
		EB_Common.validation.validate("updateConferenceBridgeForm",{
    		submitHandler:function(){
    			var tr = $("#newName").closest('tr');
    			var td1 = tr.find("td").eq(0);
    			var td2 = tr.find("td").eq(1);
    			var td3 = tr.find("td").eq(2);
    			var td4 = tr.find("td").eq(3);
    			
    			var newName = $("#newName").val();
    			var newNumber = $("#newNumber").val();
    			EB_Common.Ajax.put(
    							"/setting/broadcast/conferenceBridge",
    							{
    								id : tr.attr("id"),
    								name : newName,
    								number : newNumber,
    								accessPath : td4.attr('path'),
    								countryCode : td2.attr("id"),
    								countryName : td2.text()
    							},
    							function(data) {
    								if (data == '-1') {
    									EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
    									return;
    								}
    								td1.text(newName);
    								td3.text(newNumber);
    								td4.text(data.conferenceBridge.accessCode);
    								td4.attr('path',data.conferenceBridge.accessPath)
    								td4.attr("id","");
    								tr.find("td").eq(4).text(data.userName);
    								tr.find("td").eq(5).text((data.lastModifyDate));
    								var td5 = tr.find("td").eq(6);
    								td5.text("");
    								td5.append($('<a class="icn_edit_16" href="javascript:void(0);" title="'+i18n['button.edit']+'" onclick="EB_View.settings.broadcast.conferenceBridge.update(this);"></a>'));
    								td5.append($('<a class="icn_trash_16" href="javascript:void(0);" title="'+i18n['button.delete']+'" onclick="EB_View.settings.broadcast.conferenceBridge.deleteType(this);"></a>'));
    								flag = true;
    							});
    		}
		});
		
		$("#addConferenceBridgeRow").click(function(){
			return false;
		});
		
		init_select();
		setIndex(0,0);
		var settings = {width:450,height:260,autoOpen:false,resizable: false, close:function() {
			clearDialog();
		}};
		EB_Common.dialog.dialog("dialog",settings,function() { 
			$('#codestr option').attr("selected", "selected");
			var codestr = $('#codestr').val();
			//EB_Common.logger.log(codestr);
			if (codestr!=null){
				codestr = codestr.toString().replace(/,/g,";");
				
				if(codestr.indexOf("W") != 0){
					EB_Common.dialog.alert("Access code string starts with a Wait (W) code followed by the number of seconds from 1 to 30.");
					return;
				}
				if(codestr.indexOf("A") == -1){
					EB_Common.dialog.alert(" Access code string must include a Access(A) code followed by numbers up to 20.");
					return;
				}
				//var code = getCode(codestr);
				var changeCode = '<a href="javascript:void(0);" onclick="EB_View.settings.broadcast.conferenceBridge.changeCode(this,\''+codestr+'\')">'+getCode(codestr)+'</a>';
				
			}else{
				var changeCode = '<a href="javascript:void(0);" onclick="EB_View.settings.broadcast.conferenceBridge.setCode(this)">'+i18n['setting.broadcast.conferenceBridges.wizard']+'</a>';
			}
			
			if($("#updateCode").attr("id") != undefined){
				$("#updateCode").text("");
				$("#updateCode").attr("path",codestr);
				$("#updateCode").append($(changeCode));
			}else{
				$("#wizard").text("");
				$("#wizard").attr("path",codestr);
				$("#wizard").append($(changeCode));
			}
			clearDialog();
			$(this).dialog("close"); 
		});
		
		// Access Code (A) input keyup
		$("#accesscodestr").keyup(function(e) {
			var accesscode = $(this).val();
			if (!isDigits(accesscode)){
				EB_Common.dialog.alert("it must be number!");
				//accesscode = accesscode.substr(0,accesscode.length-1);
				accesscode = accesscode.replace(/[^0-9]/g,'');
				$(this).val(accesscode);
				$(this).focus();
			}else if(accesscode.length > 20){
			    accesscode = accesscode.substr(0,accesscode.length-1);
			    $(this).val(accesscode);
				EB_Common.dialog.alert("Access code string must include a Access(A) code followed by numbers up to 20!");
			}
		});
		
		$("input[name^='add']").click(function() {
		    //  This field max length is up to 50
		    var options = $('#codestr option');
		    var codestr = '';
			for (var i = 0, len = options.length; i < len; i++) {
				codestr += $(options[i]).val() + ';';
			}
			codestr += 'A' + $(this).prev().val();
			//console.log(codestr);
			
			if(codestr.length > 50){
			    EB_Common.dialog.alert("This field of access Code max length is up to 50!");
				return;
			}
			
		    var index = getIndex(),
		    	i = index.i,
		    	j = index.j;
			
			var id = $(this).attr('id').split('_');
			if (id[1] == 'seconds') {
				var sec= $('#sel_seconds').val();
				i = i+1;
			    $('#codestr').append("<option value='W"+sec+"'>"+i+". wait for "+sec+" second(s)</option>");	
					
			} else if(id[1] == 'dial'){
				var dial= $('#sel_dial').val();
				i = i+1;
				$('#codestr').append("<option value='D"+dial+"'>"+i+". Dial "+dial+" </option>");	
					
			} else {
				var access= $('#accesscodestr').val();
				if (access==''){
					EB_Common.dialog.alert("Access code can not be empty!");
					return false;
				}
				if(!isDigits(access)){
					EB_Common.dialog.alert(" Access code string should be numeric.");
					access = access.replace(/[^0-9]/g,'');
					$('#accesscodestr').val(access);
					return false;
				}
				
				if (j>=1){
					EB_Common.dialog.alert("This access code string may contain only 1 access code!");
					return false;
				}
				j++;
				i++;
				$('#codestr').append("<option value='A"+access+"''>"+i+". Dial acess code "+access+" </option>");	
				
			}
			
			setIndex(i, j);
			return false;
		});
		
		$("#remove").click(function() {
		    var index = getIndex(),
		    	i = index.i,
		    	j = index.j;
			var codestr = $('#codestr').val();
			
			if(codestr){
				if (codestr.toString().indexOf("A") != -1){
					//EB_Common.logger.log(codestr.toString().indexOf("A"));
					j--;
				}
				$('#codestr option:selected').remove();
				//EB_Common.logger.log($('#codestr option').length);
				var index = 0;
				//sort
				$('#codestr option').each(function(){
					index = index + 1;
					var text = $(this).text();
					var values = text.split(".");
					$(this).text(index+"."+values[1]);
					
				});
				i = index;
				setIndex(i, j);
			}
		});
		
		$('a[id^="move"]').click(function(){
	        var $op = $('#codestr option:selected'),
	            $this = $(this);
	        if($op.length){
	            ($this.attr('id') == 'moveUp') ? 
	                $op.first().prev().before($op) : 
	                $op.last().next().after($op);
	        }
	      //sort
	        var index = 0;
			$('#codestr option').each(function(){
				index = index + 1;
				var text = $(this).text();
				var values = text.split(".");
				$(this).text(index+"."+values[1]);
				
			});
	    });
		
		/*$('#formBut0').click(function() {
            var queryString = $('#conferenceBridgePermissionForm').formSerialize(); 
            EB_Common.Ajax.put("/setting/broadcast/conferenceBridge/permission?"+queryString,{},
        		function(data){ 
            		EB_Common.ToolPrompt.show('formBut0',i18n['glocal.savesuccess']);
            		//reset Leave Page State
                	EB_Common.LeavePage.resetState();
        		}
            );
		}); */
			
		$("#addConferenceBridge").click(function() {
			$('#addConferenceBridgeForm').submit();
		});
	};
	
	var flag = true;
	var adding = false;
	var oldName;
	
	view.settings.broadcast.conferenceBridge.updateName = function(obj) {
		$('#updateConferenceBridgeForm').submit();
	};

	view.settings.broadcast.conferenceBridge.cancleUpdate = function(obj, oldNumber, oldAccessCode) {
		var tr = $(obj).closest('tr');
		var td1 = tr.find("td").eq(0);
		var td3 = tr.find("td").eq(2);
		var td4 = tr.find("td").eq(3);
		td1.text(oldName);
		td3.text(oldNumber);
		td4.text(getCode(oldAccessCode));
		td4.attr("id","");
		td4.attr("path",oldAccessCode);
		var td5 = tr.find("td").eq(6);
		td5.text("");
		td5.append($('<a class="icn_edit_16" href="javascript:void(0);" title="'+i18n['button.edit']+'" onclick="EB_View.settings.broadcast.conferenceBridge.update(this);"></a>'));
		td5.append($('<a class="icn_trash_16" href="javascript:void(0);" title="'+i18n['button.delete']+'" onclick="EB_View.settings.broadcast.conferenceBridge.deleteType(this);"></a>'));
		flag = true;
	};

	view.settings.broadcast.conferenceBridge.update = function(obj) {
		if (flag == false)
			return;
		var tr = $(obj).closest('tr');
		var td1 = tr.find("td").eq(0);
		var td2 = tr.find("td").eq(1);
		var td3 = tr.find("td").eq(2);
		var td4 = tr.find("td").eq(3);
		var countryCode = td2.attr("id");
		oldName = td1.text();
		var oldNumber = td3.text();
		var oldAccessCode = td4.attr('path');
		td1.text("");
		td1.append($('<input type="text" class="width_percent94 {required:true}" maxlength="30" name="name" id="newName" pos="bottom">'));
		$("#newName").val(oldName);

		td3.text("");
		td3.append($('<input type="text" class="width_percent94 {required:true,digits:true,phone_length:[\'#'+countryCode+'\',\''+countryCode+'\']}" maxlength="20" name="newNumber" id="newNumber" pos="bottom">'));
		$("#newNumber").val(oldNumber);
		var changeCode;
		if(oldAccessCode == ''){
			changeCode = '<a href="javascript:void(0);" onclick="EB_View.settings.broadcast.conferenceBridge.setCode(this)">'+i18n['setting.broadcast.conferenceBridges.wizard']+'</a>';
		}else{
			changeCode = '<a href="javascript:void(0);" onclick="EB_View.settings.broadcast.conferenceBridge.changeCode(this,\''+oldAccessCode+'\')">'+getCode(oldAccessCode)+'</a>';
		}
		 
		td4.text("");
		td4.append(changeCode);
		td4.attr("id","updateCode");
		
		var td5 = tr.find("td").eq(6);
		td5.text("");
		td5.append($('<a href="javascript:void(0);" class="icn_save_16" title="'+i18n['button.save']+'" onclick="EB_View.settings.broadcast.conferenceBridge.updateName(this);"></a>'));
		td5.append($('<a href="javascript:void(0);" class="icn_cancel_16" title="'+i18n['button.cancel']+'" onclick="EB_View.settings.broadcast.conferenceBridge.cancleUpdate(this,\''
						 + oldNumber + '\',\'' + oldAccessCode + '\');"></a>'));
		
		$("#newName").rules("remove","remote");
    	$("#newName").rules("add", {
    		remote: {
    			url:EB_Common.Ajax.wrapperUrl("/setting/broadcast/conferenceBridge/checkConferenceBridgeName"),
    			data:{
    				id: function() {
    		            return tr.attr("id");
    				}
    			}
    		},
    		messages: {
    			remote:i18n['setting.error.conferenceBridge.duplicatedName']
    		 }
    	});
		flag = false;
	};

	view.settings.broadcast.conferenceBridge.deleteType = function(obj) {
		var tr = $(obj).closest('tr');
		var id = tr.attr("id");
		//EB_Common.logger.log(id);
		EB_Common.dialog.confirm(i18n['setting.delete.conferenceBridge'], i18n['global.dialog.title.confirm'], function() {
			$(this).dialog("close");
			EB_Common.Ajax.remove("/setting/broadcast/conferenceBridge", {
				id : id
			}, function(data) {
				if (data == '-1') {
					EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
					return;
				}
				if(data == '-2'){
					EB_Common.dialog.alert(i18n['setting.error.conferenceBridge.inUse'],
							i18n['dialog.title.warning']);
					return;
				}
				tr.remove();
			});
		}, function() {
			return;
		});
	};
	
	// winzard update
	view.settings.broadcast.conferenceBridge.changeCode = function(obj,accessPath){
		var optionValues = accessPath.split(";");
		var falg_i = 0;
		var falg_j = 0;
		for(var i=0;i<optionValues.length;i++){
			var index = i + 1;
			var optionValue = optionValues[i];
			var type = optionValue.substring(0,1);
			var value = optionValue.substring(1);
			//EB_Common.logger.log(type);
			//EB_Common.logger.log(value);
			if( type == "W" ){
				falg_i++;
				$('#codestr').append("<option value='W"+value+"'>"+index+". wait for "+value+" second(s)</option>");	
			}
			if( type == "D" ){
				falg_i++;
				$('#codestr').append("<option value='D"+value+"'>"+index+". Dial "+value+" </option>");
			}
			if( type == "A" ){
			    falg_i++;
				falg_j++;
				$('#codestr').append("<option value='A"+value+"''>"+index+". Dial acess code "+value+" </option>");	
			}
		}
		setIndex(falg_i,falg_j);
		$('#dialog').dialog('open');
	};
	
	//wizard open
	view.settings.broadcast.conferenceBridge.setCode = function(obj){
		clearDialog();
		setIndex();
		$('#dialog').dialog('open');
	};
	
	function clearDialog(){
		$('#codestr option').remove();
		$("#sel_seconds").val("1");
		$("#sel_dial").val("#");
		$("#accesscodestr").val("");
		setIndex();
	}
	
	function init_select(){
		for (var i=1;i<=30;i++){
			$('#sel_seconds').append("<option value='"+i+"'>"+i+"</option>");	
		}
		
		$('#sel_dial').append("<option value='#'>#</option>");
		for (var i=0;i<=9;i++){
			$('#sel_dial').append("<option value='"+i+"'>"+i+"</option>");	
		}
	}
	
	function setIndex(i, j) {
		i = i || 0;
		j = j || 0;
		view.settings.broadcast.conferenceBridge.i = i;
		view.settings.broadcast.conferenceBridge.j = j;
	}

	function getIndex() {
		return {
			i : view.settings.broadcast.conferenceBridge.i,
			j : view.settings.broadcast.conferenceBridge.j
		}
	}
	
	function getCode(accessPath){
		if(accessPath == '')
			return '';
		var codes =  accessPath.split(';');
		var code;
		for(var i=0;i<codes.length;i++){
			if(codes[i].indexOf("A") != -1){
				code = codes[i].substring(1);
			}
		}
		return code;
	}
	
	function isDigits(fData){
	    var reg = new RegExp('^[0-9]+$');
	    return (reg.test(fData));
	}


})(EB_View);