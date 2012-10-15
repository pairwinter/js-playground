(function(view){
	view.settings.gis = function(){};
	view.settings.gis.initDefaultPage = function() {

		EB_Common.validation.validate("gisDefaultForm",{
			rules:{
				mapCenter :{
				    remote: {
				    	url : EB_Common.Ajax.wrapperUrl("/setting/gis/default/checkMapCenter")
				    }
				},
				baseMap:{
					required: true
				}
			},
			messages:{
				mapCenter:{
					remote:i18n['setting.error.gis.fileContnet']
				}
			},
			submitHandler:function(){
	            var mapCenter=$("#mapCenter").val();
	            EB_Common.Ajax.put("/setting/gis/default",{baseMap:$(":radio[name=baseMap][checked]").val(),mapCenter:mapCenter,mapZoomLevel:$("#mapZoomLevel").val(),projection:$("#projection").val()},function(data){
	            	$("#mapCenter").val($.trim(mapCenter));
	            	EB_Common.ToolPrompt.show('formBut0',i18n['glocal.savesuccess']);
	            	
	            	//reset Leave Page State
            		EB_Common.LeavePage.resetState();
	            });
			}
		});
	};
	
	view.settings.gis.initRegionPage = function(zNodes) {	
		var setting = {
				view: {
					selectedMulti: false
				},
				edit: {
					drag: {
						isCopy: false,
		    			isMove: true,
		    			prev:	false,
		    			next:	false
					},
					enable: true,
					showRemoveBtn: true,
					showRenameBtn: true
				},
				data: {
					keep: {
						parent:true,
						leaf:false
					},
					key : {
		                checked : "checked",
		                children : "regions",
		                name : "name",
		                id:"id",
		                parentId:"parentId"
		            }
				},
				callback: {
					beforeRemove: beforeRemove,
					beforeRename: beforeRename,
					beforeDrag: beforeDrag,
					beforeDrop: beforeDrop,
					onDrop: onDrop,
					onClick: zTreeOnClick,
					afterCancel:afterCancel
				}
			};
		
		$.fn.zTree.init($("#regionTree"), setting, zNodes);
		setFolder();
		$("#addFolder").bind("click", add);
		$("#export").bind("click", download);
		
		//add import file
		var i=0;
		$("#import_btn").click(function(){
			var import_ct = $("#import_ct");
			var zTree = $.fn.zTree.getZTreeObj("regionTree");
			var nodes = zTree.getNodesByParam("fileType", "FOLDER", null);
			var template = $($("#uploadTemplate").render([{nodes:nodes}]));
			import_ct.append(template);
			template.find('.b-setting-form-del').click(function(){
				$(this).parent().remove();
				if(import_ct.children().length == 0){
					$('#upload').hide();
				}
			});
			var input = template.find('.checkRegionName').attr("name","name"+i);
			input.rules("add", {
				 duplicateName:true,
				 remote: {
					 url : EB_Common.Ajax.wrapperUrl("/setting/gis/region/checkRegionName"),
					 data:{
						 name:function(){return input.val()}
					 }
				 },
				 messages: {
				   remote: i18n['setting.error.region.duplicatedName']
				 }
			});
			if($('#upload:hidden').length > 0){
				$('#upload').show();
			}
			i++;
		});
		
		$.validator.addMethod('duplicateName', function(value, element, param) {
	    	var values = {},
	    		inputs = $(element).closest('form').find('.checkRegionName').not(element),
	    		lastRepeatValue = $(element).prop('lastRepeatValue'),
	    		repeatInputs = [];
	    	
	    	$(element).prop('lastRepeatValue', $.trim(value));
	    	inputs.each(function(index, element){
	    		values[$.trim($(this).val())] = true;
	    		if($.trim($(this).val()) == lastRepeatValue){
	    	        repeatInputs.push(element);
	    	    }
	    	});
	    	//console.info(repeatInputs);
	    	// remove validation info
	    	if(lastRepeatValue != $.trim(value) && repeatInputs.length == 1){
	    		$(repeatInputs[0]).removeClass('error').parent().children('.error-right').remove();
	    	}
		    	
	    	if(values[$.trim(value)]){
	    		return false;
	    	}else{
				return true;
	    	}
			
        }, i18n['setting.error.region.duplicatedName']);
		
		EB_Common.validation.validate("gisRegionForm",{
			messages:{
				regionFile:{
					accept:i18n['setting.error.gis.fileType']
				}
			},
			submitHandler:function(){
				var options = {
					url: EB_Common.Ajax.wrapperUrl("/setting/gis/region") ,
					type : 'POST',
					dataType : 'json',
					success : function(data) {
						//console.log(data);
						if (data == '-1') {
							EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
							return;
						}
						if(data == "-2"){
							EB_Common.dialog.alert(i18n['setting.error.input.duplicated'],i18n['setting.error']);
							return;
						}
						if(data == "-3"){
							EB_Common.dialog.alert(i18n['setting.error.gis.illegalFile'],i18n['setting.error']);
							return;
						}
						var zTree = $.fn.zTree.getZTreeObj("regionTree");
						for(i = 0; i < data.length; i++){
							var region = data[i];
							//console.log(region);
							var targetNode = zTree.getNodeByParam("id",region.parentId,null);
							treeNode = zTree.addNodes(targetNode, {id:region.id, name:region.name,fileType:region.fileType});
							//console.log(treeNode);
						}
						$("#import_ct > div.b-upload_div.margin10-T").each(function(){
							$(this).remove();
						});
						$('#upload').hide();
					}
				};
				$('#gisRegionForm').find(".checkRegionName").attr("name","name");
				$('#gisRegionForm').ajaxSubmit(options);
				//return false;
			}
		});
	};
	
	function setFolder() {
		var treeObj = $.fn.zTree.getZTreeObj("regionTree");
		var nodes = treeObj.transformToArray(treeObj.getNodes());
		for(i=0;i<nodes.length;i++){
			if(nodes[i].fileType == 'FOLDER'){
				nodes[i].isParent = true;
				treeObj.updateNode(nodes[i]);
			}
		}
	}
		
	function beforeDrag(treeId, treeNodes) {
		if(treeNodes[0].fileType == 'FOLDER'){
			return false;
		}
		return true;
	}
	
	function beforeDrop(treeId, treeNodes, targetNode, moveType) {
		if(targetNode == null){
			return true;
		}else{
			if('REGION' == targetNode.fileType){
				return false;
			}
		}
	}
	function beforeRemove(treeId, treeNode) {
		 EB_Common.Ajax.remove("/setting/gis/region",
					{id:treeNode.id,fileType:treeNode.fileType},function(data){
						if (data == '-1') {
							EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
							return;
						}
						var zTree = $.fn.zTree.getZTreeObj("regionTree");
						$("option[value='"+treeNode.id+"']").remove();
			});
	}

	function add(e) {
		var zTree = $.fn.zTree.getZTreeObj("regionTree"),
			nodes = zTree.getSelectedNodes(),
			treeNode = nodes[0];
		zTree.addFlag = true;
		treeNode = zTree.addNodes(null, {id:-1, pId:-1, isParent:true, name:"new folder"});
		zTree.editName(treeNode[0]);
	};
	function edit() {
		var zTree = $.fn.zTree.getZTreeObj("regionTree"),
		nodes = zTree.getSelectedNodes(),
		treeNode = nodes[0];
		if (nodes.length == 0) {
			EB_Common.dialog.alert(i18n['setting.error.node.empty']);
			return;
		}
		zTree.editName(treeNode);
	};
	function remove(e) {
		var zTree = $.fn.zTree.getZTreeObj("regionTree"),
		nodes = zTree.getSelectedNodes(),
		treeNode = nodes[0];
		if (nodes.length == 0) {
			EB_Common.dialog.alert(i18n['setting.error.node.empty']);
			return;
		}
	};
	
	function download(e){
	    if($(this).hasClass('export-grap')){
	    	return;
	    }
		var zTree = $.fn.zTree.getZTreeObj("regionTree"),
		nodes = zTree.getSelectedNodes(),
		treeNode = nodes[0];
		var url = EB_Common.Ajax.wrapperUrl("/setting/gis/downLoadRegion");
        window.open(url+"?id="+treeNode.id+"&name="+treeNode.name);  
	}
	
	function move(e){
		var zTree = $.fn.zTree.getZTreeObj("regionTree"),
		nodes = zTree.getSelectedNodes(),
		treeNode = nodes[0];
		if (nodes.length == 0) {
			EB_Common.dialog.alert(i18n['setting.error.node.empty']);
			return;
		}
		
		if(treeNode.fileType != 'REGION'){
			EB_Common.dialog.alert(i18n['setting.error.node.empty']);
			return ;
		}
	}
	
	function beforeRename(treeId, treeNode, newName){
	    $('#duplicationName').hide();
	    
		var zTree = $.fn.zTree.getZTreeObj("regionTree");
		var parentNode = treeNode.getParentNode();
		var parentId = (parentNode==null)?-1:parentNode.id;
		var oldName = treeNode.name;
		if($.trim(newName) == ""){
			if(treeNode.id == '-1')
				zTree.removeNode(treeNode,false);
			else
				zTree.cancelEditName();
			return false;
		}
		if(treeNode.id!=-1 && treeNode.name==newName){
		    return;
		}
		
		function filter(node) {
		    return (node.level == 0 && $.trim(node.name) == $.trim(newName) && node.fileType == 'FOLDER');
		}
		var nodes = zTree.getNodesByFilter(filter);
		console.info(i18n['setting.error.name.duplicated']);
		if(nodes.length > 0){
		    $('#duplicationName').show().find('label').text(
					function(index, value) {
						return i18n['setting.error.name.duplicated'].replace(/\{([\w-]+)\}/g, newName.length > 20 ? newName.substring(0,20) + '...' : newName);
					});
			return false;
		}
        zTree.addFlag = false;
		EB_Common.Ajax.put("/setting/gis/region",
				{id:treeNode.id,name:newName,parentId:parentId,fileType:treeNode.fileType},function(data){
					//console.log(data);
					var newName = treeNode.name;
					if (data == '-3') {
						EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
						return;
					}
					
					if(data == '-2'){
						if(treeNode.id == '-1'){
							//zTree.removeNode(treeNode,false);
							//EB_Common.dialog.alert(i18n['setting.error.name.duplicated'],i18n['setting.error']);
						}else{
							treeNode.name=oldName;
							zTree.updateNode(treeNode);
							//EB_Common.dialog.alert(i18n['setting.error.name.duplicated'],i18n['setting.error']);
						}
						
						zTree.editName(treeNode);
						$('#duplicationName').show().find('label').text(
								function(index, value) {
									return i18n['setting.error.name.duplicated'].replace(/\{([\w-]+)\}/g, newName);
								});
					}else{
						if(treeNode.id == '-1'){
							var option = $('<option value="'+data.id+'"></option>');
							option.text(newName);
							$("select[name='parentId']").append(option);
						}else{
							$("option[value='"+treeNode.id+"']").text(newName);
						}
						treeNode.id=data.id;
						treeNode.name=data.name;
						treeNode.fileType=data.fileType;
						zTree.updateNode(treeNode);
						$('#duplicationName').hide();
						zTree.addFlag = false;
					}
		}); 
	};
	
	function afterCancel(treeId, treeNode){
		$('#duplicationName').hide();
	}
	
	function onDrop(event, treeId, treeNodes, targetNode, moveType) {
		if(moveType != 'inner'){
			return false;
		};
		
	    var parentId =  null;
	   
	    if(targetNode == null){
	    	parentId = -1;
	    }else{
	    	parentId = targetNode.id;
	    }
	    
	    moveForAjax(treeNodes[0].id, parentId);
	};
	
	function moveForAjax(id,parentId){
	    EB_Common.Ajax.put("/setting/gis/moveRegion",
		        {id:id,
	        	parentId:parentId},
		        function(data){
	        		if (data == '-1') {
						EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
						return;
					}
				});
	};
	
	function zTreeOnClick(event, treeId, treeNode) {
		if(treeNode.fileType == 'REGION'){
			//export highlight
			$('#export').removeClass('export-grap');
			$('#export i').removeClass('grap');
			$('#export a').removeClass('disable');
		}else{
			$('#export').addClass('export-grap');
			$('#export i').addClass('grap');
			$('#export a').addClass('disable');
		}
	};
		
})(EB_View);