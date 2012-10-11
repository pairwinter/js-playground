(function(view) {
	var sspNameSpace = {};
	sspNameSpace.init = function(tableName, sspType, saveButton, columnProperty) {
		sspNameSpace.tableName = tableName;
		sspNameSpace.sspType = sspType;
		sspNameSpace.saveButton = saveButton;
		initTable(columnProperty);
		$('#ssplink').hide();
		$("#" + sspNameSpace.saveButton).bind('click', bindSave);
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
			autowidth : true,
			colNames : [ i18n['sspconfig.field.name'],
					i18n['sspconfig.field.expose'],
					i18n['sspconfig.field.mandatory'],
					i18n['sspconfig.field.enabled'],
					i18n['sspconfig.field.editable'],
					i18n['sspconfig.field.externalobject'] ],
			colModel : [ {
				name : 'itemName',
				index : 'itemName',
				align : "left",
				sortable : false
			}, {
				name : 'expose',
				index : 'expose',
				hidden : columnProperty.expose,
				align : "center",
				editable : true,
				sortable : false,
				edittype : 'checkbox',
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
				align : "left",
				sortable : false,
				editable : true,
				edittype : 'checkbox',
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
				align : "left",
				sortable : false,
				editable : true,
				edittype : 'custom',
				formatter : renderRadio
			}, {
				name : 'editable',
				index : 'editable',
				hidden : columnProperty.editable,
				align : "left",
				editable : true,
				sortable : false,
				edittype : 'checkbox',
				editoptions : {
					value : "true:false"
				},
				formatter : "checkbox",
				formatoptions : {
					disabled : false
				}
			}, {
				name : 'externalObject',
				index : 'externalObject',
				hidden : true,
				hidden : true,
				sortable : false
			} ],
			jsonReader : {
				root : "data",
				page : "currentPageNo",
				total : "totalPageCount",
				records : "totalCount",
				repeatitems : false
			},
			loadComplete : function() {
				var i = getColumnIndexByName('enabled');
				var enalbed = $("tbody > tr.jqgrow > td:nth-child(" + (i + 1)
						+ ") > input");
				$(enalbed, this).click(function(e) {
					$.each(enalbed, function() {
						$(this).removeAttr('checked');
					});
					$(this).attr('checked', true);
					setSSPLinkVisible(this);
				});
			}
		});
	}

	function renderRadio(value, options, rowObject) {
		var radio = '<input type="radio" name="enable" ssp="'
				+ rowObject.itemName + '"';
		if (value == true) {
			radio += 'checked="checked" ';
			if (rowObject.itemName == 'Public Notifications Portal') {
				$('#ssplink').show();
			} else {
				$('#ssplink').hide();
			}
		}
		radio += '/>';
		return radio;

	}

	function getColumnIndexByName(columnName) {
		var cm = sspNameSpace.sspTable.jqGrid('getGridParam', 'colModel');
		var i = 0;
		var l = cm.length;
		for (; i < l; i++) {
			if (cm[i].name === columnName) {
				return i;
			}
		}
		return -1;
	}

	function setSSPLinkVisible(elem) {
		var name = $(elem).attr('ssp');
		if (name != 'Public Notifications Portal') {
			$('#ssplink').hide();
			return;
		}

		if ($(elem).is(':checked')) {
			$('#ssplink').show();
		} else {
			$('#ssplink').hide();
		}
	}

	function bindSave() {
		var rows = sspNameSpace.sspTable.getGridParam("reccount");
		var rowDatas = [];
		for ( var count = 1; count < rows + 1; count++) {
			var sspConfigItem = {};
			rowdata = sspNameSpace.sspTable.jqGrid('getRowData', count);
			sspConfigItem.itemName = rowdata["itemName"];
			var selected = $(rowdata["enabled"]).attr('checked');
			sspConfigItem.enabled = selected == 'checked' ? true : false;
			sspConfigItem.mandatory = rowdata["mandatory"];
			sspConfigItem.expose = rowdata["expose"];
			sspConfigItem.editable = rowdata["editable"];
			sspConfigItem.externalObject = rowdata["externalObject"];
			rowDatas[count - 1] = sspConfigItem;
		}
		if (rowDatas.length == 0) {
			return;
		}
		var selected = false;
		$.each(rowDatas, function(index, sspConfigItem) {
			selected = sspConfigItem.enabled;
			if (selected) {
				return false;
			}

		});
		if (!selected) {
			EB_Common.dialog.alert(i18n['sspconfig.alert.sspoptions.selected']);
			return;
		}
		var json = EB_Common.json.stringify(rowDatas);
		EB_Common.Ajax.post("/sspconfig/saveSSPOptions", {
			rs : json,
			type : sspNameSpace.sspType
		}, function(data) {
			if (data.status != "yes") {
				EB_Common.dialog.alert(i18n["'" + data.status + "'"]);
			} else {
				EB_Common.dialog.alert(i18n['glocal.savesuccess'],
						i18n['glocal.dialog.success']);
				sspNameSpace.sspTable.trigger("reloadGrid");
			}
		}, "json");
	}

    // ssp options function Linder Wang
    sspNameSpace.initSspOptions = function() {
		var loadedContactR = false,
		    loadContactRData = function(optionValue) {
		     	if(loadedContactR === true){
		     		return;
		     	}
				EB_Common.Ajax.get('/sspconfig/listContactRecord', {
						type : 'Notifications Portal Options',
						time :new Date()
					}, function(data) {
						loadedContactR = true;
						if(!data || data.length == 0){
							return;
						}
						var newRecord = $('#newRecord');
						for(var i = 0,len = data.length;i<len;i++){
							newRecord.append('<option value="'+ data[i][0] +'">' +  $.jgrid.htmlEncode(data[i][1])  + '</option>');
						}
						if(optionValue){
							newRecord.val(optionValue);
						}
					}, 'json');
            };
      
      //init data
      EB_Common.Ajax.get('/sspconfig/listSspOptions', {
			type : 'Notifications Portal Options',
			time : new Date()
		}, function(remoteData) {
			if(!remoteData || !remoteData.data) return;
			var data = remoteData.data,
				radioValue,shecked,
				newRecord;
			if (data.length > 0) {
				shecked = true;
			}else{
				return;
			}
			for (var i = 0, len = data.length; i < len; i++) {
				if(data[i].enabled == true){
					radioValue = data[i].itemName;
					newRecord = data[i].externalObject;
					break;
				}
			}
			if(shecked){
				$('#ssplink').show();
			}
			if(radioValue == 'Public Notifications Portal'){
				$('#publicType').show();
				loadContactRData(newRecord);
			}else{
				$('#publicType').hide();
			} 
			$('input[name="optionType"]').attr('checked', function(i,val){
				return $(this).val() == radioValue;
			});
		}, 'json');
      
			
      $('input[name="optionType"]').click(function(){
        var me = this;
        if($(me).val() == 'Public Notifications Portal'){
        	loadContactRData();
        	$('#publicType').show();
        }else{
        	$('#publicType').hide();
        }
        $('#ssplink').show();
      });
      
      $('#SSPOptionsSaveBtn').click(function(){
		var rowDatas = [],selected;
		$('input[name="optionType"]').each(function(index,element){
			var sspConfigItem = {};
			sspConfigItem.itemName = $(this).val();
			sspConfigItem.enabled = $(this).prop('checked');
			if($('#publicType')[0].style.display != 'none' && $(this).val() == 'Public Notifications Portal'){
				sspConfigItem.externalObject = $('#newRecord').val();
			}else{
			    sspConfigItem.externalObject = '';
			}
			rowDatas.push(sspConfigItem);
			if(!selected){
				selected = $(this).prop('checked');
			}
			});
		
		if (!selected) {
			EB_Common.dialog.alert(i18n['sspconfig.alert.sspoptions.selected']);
			return;
		}
		var json = EB_Common.json.stringify(rowDatas);
		EB_Common.Ajax.post("/sspconfig/saveSSPOptions", {
			rs : json,
			type : 'Notifications Portal Options'
		}, function(data) {
			if (data.status != "yes") {
				EB_Common.ToolPrompt.show('SSPOptionsSaveBtn',i18n["'" + data.status + "'"]);
			} else {
				EB_Common.ToolPrompt.show('SSPOptionsSaveBtn','Save successfully');
				EB_Common.LeavePage.resetState();
			}
		}, "json");
	
      });
      
    };
    
	view.ssp = sspNameSpace;

})(EB_View);