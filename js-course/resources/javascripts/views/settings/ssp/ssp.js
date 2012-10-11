(function(view) {
	sspNameSpace = {};
	
	//select value's checkbox when name's checkbox selected
	function ckClicked(e) {
		var title = $(this).parent().parent().find('td').eq(1).attr('title');
		var indexOfMandatory=getColumnIndexByName('mandatory');
		var mandatoryChecckboxes = $("tbody > tr.jqgrow > td:nth-child("+(indexOfMandatory+1)+") > input");
		var indexOfExpose=getColumnIndexByName('expose');
        var exposeChecckboxes = $("tbody > tr.jqgrow > td:nth-child("+(indexOfExpose+1)+") > input");
        
		var trimTitle = $.trim(title);
		var tr = $(this).parent().parent();
		var Clickedtr = $(this).parent().parent();
		var titleIndex=1;
		var checkBoxIndex=3;
		if($(this).parent().attr('aria-describedby')=='subscriptionsTable_mandatory'){
		    checkBoxIndex=6;
		}
		if(title!=trimTitle){
			//value checked
			if($(this).attr("checked")){
				do{
					title = tr.prev().find('td').eq(titleIndex).attr('title');
					trimTitle = $.trim(title);
    				tr = tr.prev();
                    if(!tr.is('tr')){
                           break;
                    }
				}while(title!=trimTitle)
					
				var ck = tr.find('td').eq(checkBoxIndex).find(':checkbox'); 
				if(ck.attr('disabled')!='disabled'){
					ck.attr('checked','checked');
				}
				
				var exposeCheckbox = tr.find('td').eq(checkBoxIndex).find(':checkbox');
				var rowIndex = exposeChecckboxes.index(exposeCheckbox);
				if(rowIndex!=-1){
					var mandatoryCheckBox = mandatoryChecckboxes.get(rowIndex);
					$(mandatoryCheckBox).attr('disabled',false);
				}
			}else{
			  //value unchecked . unchecked its parent if none of the children is checked.
			  var noneChecked = true;
			  //find out the parent row.
			  do{
                  title = tr.prev().find('td').eq(titleIndex).attr('title');
                  trimTitle = $.trim(title);
                  tr = tr.prev();
                  if(!tr.is('tr')){
                      break;
                  }
              }while(title!=trimTitle)
              //parentTr is the parent row
              var parentTr = tr;    
			  var checked = parentTr.find('td').eq(checkBoxIndex).find(':checkbox').attr('checked');
			  if(checked){
			      //check if any child of the parent is checked.
			      do{
			          tr = tr.next();
			          title = tr.find('td').eq(titleIndex).attr('title');
                      trimTitle = $.trim(title);
                      if(!tr.is('tr') || title==trimTitle&&noneChecked){
                          break;
                      }
	                  if(tr.find('td').eq(checkBoxIndex).find(':checkbox').attr('checked')=='checked'){
	                      noneChecked = false;
	                      break;
	                  }
	                 
	              }while(title!=trimTitle&&noneChecked)
			  }
			  //if none of the children is checked,unchecked the parent.
			  if(noneChecked){
			      parentTr.find('td').eq(checkBoxIndex).find(':checkbox').removeAttr('checked');
			  }
			}
		}else{
			//name clicked
			if($(this).attr("checked")){
				//name checked
				do{
				    
					title = tr.next().find('td').eq(titleIndex).attr('title');
					trimTitle = $.trim(title);
					
					var ck = tr.find('td').eq(checkBoxIndex).find(':checkbox'); 
					if(ck.attr('disabled')!='disabled'){
						ck.attr('checked','checked');
					}
					tr = tr.next();
                    if(!tr.is('tr')){
                        break;
                    }
					var exposeCheckbox = tr.find('td').eq(checkBoxIndex).find(':checkbox');
					var rowIndex = exposeChecckboxes.index(exposeCheckbox);
					if(rowIndex!=-1){
						var mandatoryCheckBox = mandatoryChecckboxes.get(rowIndex);
						$(mandatoryCheckBox).attr('disabled',false).attr('checked',false);
					}
					
				}while(title!=trimTitle)
			}else{
				//name unchecked
				do{
					title = tr.next().find('td').eq(titleIndex).attr('title');
					trimTitle = $.trim(title);
					tr.find('td').eq(checkBoxIndex).find(':checkbox').removeAttr('checked');
					var exposeCheckbox = tr.find('td').eq(checkBoxIndex).find(':checkbox');
					var rowIndex = exposeChecckboxes.index(exposeCheckbox);
					if(rowIndex!=-1){
						var mandatoryCheckBox = mandatoryChecckboxes.get(rowIndex);
						$(mandatoryCheckBox).attr('disabled',true).attr('checked',false);
					}
					tr = tr.next();
                    if(!tr.is('tr')){
                        break;
                    }
					
				}while(title!=trimTitle)
			}
		}
		e.stopPropagation();
	}
	
	//toggle value when name clicked
	function trClicked() {
		
		var title = $(this).find('td').eq(1).attr('title');
		var trimTitle = $.trim(title);
		var tr = $(this);
		if(title==trimTitle){
			if(tr.next().is(":hidden")){
				$(this).find('td').prev().find('span').removeClass('collapsed');
				do{
					title = tr.next().find('td').eq(1).attr('title');
					trimTitle = $.trim(title);
					
					tr = tr.next();
					
					if(!tr.is('tr') || title==trimTitle){
						break;
					}

					tr.show();
					
				}while(title!=trimTitle)
			}else{
				$(this).find('td').prev().find('span').addClass('collapsed');
				do{
					title = tr.next().find('td').eq(1).attr('title');
					trimTitle = $.trim(title);
					tr = tr.next();
					
					if(!tr.is('tr') || title==trimTitle){
						break;
					}
					tr.attr('style','display:none;');
				}while(title!=trimTitle)
			}
		}

	}
	
	
	
	sspNameSpace.handleCheckboxClick =function(tableName) {
		$("#"+ tableName).delegate(":checkbox", "click", ckClicked);
	};
	sspNameSpace.handleNameClick =function(tableName) {
		$("#"+ tableName).delegate("tr", "click", trClicked);
	};
	sspNameSpace.init = function(tableName, sspType, saveButton, columnProperty) {
		sspNameSpace.tableName = tableName;
		sspNameSpace.sspType = sspType;
		sspNameSpace.saveButton = saveButton;

		initTable(columnProperty);
		
		$("#" + sspNameSpace.saveButton).bind('click', {buttonId:saveButton},bindSave);
		
	};

	function initTable(columnProperty) {
		sspNameSpace.sspTable = $("#" + sspNameSpace.tableName);
		sspNameSpace.sspTable.jqGrid({
			autoencode:true,
			url : EB_Common.Ajax.wrapperUrl('/sspconfig/listSspOptions?type='
					+ sspNameSpace.sspType),
			datatype : "json",
			emptyDataCaption : i18n['global.grid.emptyDataCaption'],
			height : "auto",
			autowidth:true,
			title:true,
			colNames : ['', i18n['sspconfig.field.name'],
					i18n['sspconfig.field.expose'],
					i18n['sspconfig.field.editable'],
					i18n['sspconfig.field.enabled'],
					i18n['sspconfig.field.mandatory'],
					i18n['sspconfig.field.externalobject'] ],
			colModel : [ 
			             {
				name : 'itemName',
				index : 'expandIcon',
				hidden : columnProperty.expandIcon,
				width : 10,
				align : "left",
				sortable : false,
				formatter : function(value, rec) {
					if(sspNameSpace.tableName=='subscriptionsTable' && value==$.trim(value))
						return '<span class="icon_tabpanel_expand"></span>';
					else return '';
				}
			},{
				name : 'itemName',
				index : 'itemName',
				width : 400,
				align : "left",
				sortable : false,
				formatter : function(value, rec) {
					value = $.jgrid.htmlEncode(value);
					if(sspNameSpace.tableName=='subscriptionsTable' && value==$.trim(value))
						return '</span><b>' + value + '</b>';
					else return value;
				}
			}, {
				name : 'expose',
				index : 'expose',
				hidden : columnProperty.expose,
				width : 100,
				align : "left",
				editable : true,
				edittype : 'checkbox',
				sortable : false,
				editoptions : {
					value : "true:false"
				},
				formatter : "checkbox",
				formatoptions : {
					disabled : false
				}
			}, {
				name : 'editable',
				index : 'editable',
				hidden : columnProperty.editable,
				width : 100,
				align : "left",
				editable : true,
				edittype : 'checkbox',
				sortable : false,
				editoptions : {
					value : "true:false"
				},
				formatter : "checkbox",
				formatoptions : {
					disabled : false
				}
			}, {
				name : 'enabled',
				index : 'enabled',
				hidden : columnProperty.enabled,
				width : 100,
				align : "left",
				editable : true,
				edittype : 'checkbox',
				sortable : false,
				editoptions : {
					value : "true:false"
				},
				formatter : "checkbox",
				formatoptions : {
					disabled : false
				}
			}, {
				name : 'mandatory',
				index : 'mandatory',
				hidden : columnProperty.mandatory,
				width : 100,
				align : "left",
				editable : true,
				edittype : 'checkbox',
				sortable : false,
				editoptions : {
					value : "true:false"
				},
				formatter : "checkbox",
				formatoptions : {
					disabled : false
				}
			},{
				name : 'externalObject',
				index : 'externalObject',
				hidden : true,
				width : 100,
				hidden : true,
				sortable : false
			} ],
			rowNum:"totalCount",
			jsonReader : {
				root : "data",
				page : "currentPageNo",
				total : "totalPageCount",
				records : "totalCount",
				repeatitems : false
			},
			
			loadComplete: function() {
				if(sspNameSpace.sspType=='Subscriptions'){
					var i=getColumnIndexByName('expose');
	                var exposeChecckboxes = $("tbody > tr.jqgrow > td:nth-child("+(i+1)+") > input");
	                
	                var indexOfMandatory=getColumnIndexByName('mandatory');
	                var mandatoryChecckboxes = $("tbody > tr.jqgrow > td:nth-child("+(indexOfMandatory+1)+") > input");
	                
	                $(mandatoryChecckboxes).each(function(index,item){
	                	var rowIndex =mandatoryChecckboxes.index(item);
	                	var exposeCheckbox = exposeChecckboxes.get(rowIndex);
	                	var checked = $(exposeCheckbox).attr('checked');
	                	if(checked!='checked'){
	                		$(item).attr('disabled',true);
	                	}else{
	                		$(item).attr('disabled',false);
	                	}
	                });
	                $(exposeChecckboxes,this).click(function(e) {
	                	var rowIndex = exposeChecckboxes.index(this);
	                	var mandatoryCheckbox = mandatoryChecckboxes.get(rowIndex);
	                	var checked = $(this).is(':checked');
	                	if(checked==false){
	                		$(mandatoryCheckbox).attr('disabled',true).attr('checked',false);
	                	}else{
	                		$(mandatoryCheckbox).attr('disabled',false).attr('checked',false);
	                	}
	                });
					return ;
				}
                var i=getColumnIndexByName('expose');
                var exposeChecckboxes = $("tbody > tr.jqgrow > td:nth-child("+(i+1)+") > input");
                var indexOfEditable=getColumnIndexByName('editable');
                var editableChecckboxes = $("tbody > tr.jqgrow > td:nth-child("+(indexOfEditable+1)+") > input");
                $(editableChecckboxes).each(function(index,item){
                	var rowIndex =editableChecckboxes.index(item);
                	var exposeCheckbox = exposeChecckboxes.get(rowIndex);
                	var checked = $(exposeCheckbox).attr('checked');
                	if(checked!='checked'){
                		$(item).attr('disabled',true);
                	}else{
                		$(item).attr('disabled',false);
                	}
                });
                
                
                var indexOfMandatory=getColumnIndexByName('mandatory');
                var mandatoryChecckboxes = $("tbody > tr.jqgrow > td:nth-child("+(indexOfMandatory+1)+") > input");
                $(mandatoryChecckboxes).each(function(index,item){
                	var rowIndex =mandatoryChecckboxes.index(item);
                	var editableCheckbox = editableChecckboxes.get(rowIndex);
                	var checked = $(editableCheckbox).attr('checked');
                	if(checked!='checked'){
                		$(item).attr('disabled',true);
                	}else{
                		$(item).attr('disabled',false);
                	}
                });
                
                $(exposeChecckboxes,this).click(function(e) {
                	var rowIndex = exposeChecckboxes.index(this);
                	var editabledCheckbox = editableChecckboxes.get(rowIndex);
                	var mandatoryCheckbox = mandatoryChecckboxes.get(rowIndex);
                	var checked = $(this).is(':checked');
                	if(checked==false){
                		$(editabledCheckbox).attr('disabled',true).attr('checked',false);
                		$(mandatoryCheckbox).attr('disabled',true).attr('checked',false);
                	}else{
                		$(editabledCheckbox).attr('disabled',false).attr('checked',false);
                	}
                	
                });
                
                $(editableChecckboxes,this).click(function(e) {
                	var rowIndex = editableChecckboxes.index(this);
                	var mandatoryCheckbox = mandatoryChecckboxes.get(rowIndex);
                	var checked = $(this).is(':checked');
                	if(checked==false){
                		$(mandatoryCheckbox).attr('disabled',true).attr('checked',false);
                	}else{
                		$(mandatoryCheckbox).attr('disabled',false).attr('checked',false);
                	}
                });
            }
		});
	}

	changeModifyFlag=function(){
		window.ssp.changed=true;
	};
	getColumnIndexByName = function(columnName) {
        var cm = sspNameSpace.sspTable.jqGrid('getGridParam','colModel'),i=0,l=cm.length;
        for (; i<l; i++) {
            if (cm[i].name===columnName) {
                return i;
            }
        }
        return -1;
    };
    
    disableIfChecked = function(elem){
        if ($(elem).is(':checked')) {
            $(elem).attr('disabled',true);
        }
    };
    
    
	function bindSave(button) {
		var rows = sspNameSpace.sspTable.getGridParam("reccount");
		var rowDatas = [];
		for ( var count = 1; count < rows + 1; count++) {
			var sspConfigItem = {};
			rowdata = sspNameSpace.sspTable.jqGrid('getRowData', count);
			sspConfigItem.itemName = rowdata["itemName"];
			sspConfigItem.expose = rowdata["expose"];
			sspConfigItem.mandatory = rowdata["mandatory"];
			sspConfigItem.enabled = rowdata["enabled"];
			sspConfigItem.editable = rowdata["editable"];
			sspConfigItem.externalObject = rowdata["externalObject"];
			rowDatas[count - 1] = sspConfigItem;
		}
		if (rowDatas.length == 0) {
			return;
		}

		var json = EB_Common.json.stringify(rowDatas);
		EB_Common.Ajax.post("/sspconfig/saveSSPOptions", {
			rs : json,
			type : sspNameSpace.sspType,
			time:new Date()
		}, function(data) {
			if (data.status != "yes") {
				EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
			} else {
				EB_Common.ToolPrompt.show(button.data.buttonId,'Save successfully');
				sspNameSpace.sspTable.trigger("reloadGrid");
				EB_Common.LeavePage.resetState();
			}
		}, "json");
	}

	sspNameSpace.fileupload = function() {
		
		var valid = $('#uploadImgForm').valid();
		if(!valid){
			return;
		}
		$.ajaxFileUpload({
			url : EB_Common.Ajax.wrapperUrl("/sspconfig/uploadBannerFile"),
			secureuri : false,
			fileElementId : 'file',
			dataType : 'json',
			success : function(data) {
				if (data.state == 'success') {
					EB_Common.ToolPrompt.show('fileLoad','Save successfully');
					d = new Date();
					var src = $("#bannerImg").attr("src");
					$("#bannerImg").attr("src", src+"?t="+d.getTime());
					$('#showImgDiv').show();
					EB_Common.LeavePage.resetState();
				} else {
					EB_Common.dialog.alert(i18n['sspconfig.alert.banner.upload.error'],i18n['dialog.title.warning']);
				}

			},
			error : function(data, status, e) {
				EB_Common.dialog.alert(i18n['sspconfig.alert.banner.upload.error'],i18n['dialog.title.warning']);
			}
		});
	};
	
	sspNameSpace.deleteImg = function() {
		EB_Common.Ajax.get(
				"/sspconfig/deleteBannerFile/",{time:new Date()},
				function(data) {
					if (data.status != "yes") {
						EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
					} else {
						d = new Date();
						var src = $("#bannerImg").attr("src");
						$("#bannerImg").attr("src", src+"?t="+d.getTime());
						$('#showImgDiv').hide();
					}
				}, "json");
	};
	
	view.ssp = sspNameSpace;
})(EB_View);