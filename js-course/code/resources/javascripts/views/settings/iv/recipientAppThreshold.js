(function(view) {
	recipientAppThreshold = {};

	recipientAppThreshold.initPage = function() {
		cacheUIElement();
		addListeners();
		initTable();
		$('.b-panel-bwrap .b-panel-title').click(
				function() {
					var me = $(this), container = me.next(),
					    icon = me.find('.icon_tabpanel_expand');                             
					if (icon.hasClass('collapsed')) {
						icon.removeClass('collapsed');
						container.show();
					} else {
						icon.addClass('collapsed');
						container.hide();
					}
				});
		//Linder Wang add 
		//2012-8-9
		$('#select_map dt').click(function(){
		    var me = $(this),
		        next = me.next(),
		        offset = me.offset(),
		        docH = $(document).height(),
		        dtH = me.outerHeight(true),
		        ddH = next.outerHeight(true);
		    //console.debug(docH);
		    //console.debug(dtH);
		    //console.debug(ddH);
		    if((docH - offset.top - dtH) < ddH){
		    	next.offset({
					top : offset.top - ddH
				});
		    }
		    
			$(this).next().toggle();
		});
		    
		
		$('#select_map dd a').click(function(){
		    var me = $(this),
			    cls = me.attr('class');
			if(!$('#select_map dt a').hasClass(cls)){
				$('#select_map dt a').removeClass();
				$('#select_map dt a').addClass('left ' + cls);
				$('#select_map dt a').attr('clazz',cls);
			}
			me.parent().hide();
		});
//		console.info($('#contentPanel').children());
		$('#contentPanel').children().click(function(event){
		    var children = $('#select_map').find('*'),
		        flag = false;
//		    console.info(children);
		    children.each(function(index,el){
		    	if(this == event.target){
		    		flag = true;
		    		return false;
		    	}
		    });
		    if(!flag){
		    	$('#select_map dd').hide();
		    }
		});
		
		$('#panelCollapse').click(function() {
			var collapse = $(this), gridPanel = $('#gridPanel');
			if (collapse.hasClass('extend')) {
				gridPanel.hide();
				collapse.removeClass('extend');
			} else {
				gridPanel.show();
				collapse.addClass('extend');
			}

		});
		//end
	};

	function initTable() {
		recipientAppThreshold.unsolicitedCategoryGrid
				.jqGrid({
					autoencode:true,
					url : EB_Common.Ajax
							.wrapperUrl('/recipientAppThreshold/listUnsolicitedCategorys'),
					height : 245,
					datatype : 'json',
					emptyDataCaption : i18n['global.grid.emptyDataCaption'],
					autowidth : true,
					colNames : [ i18n['recipientAppThreshold.field.category'],'icon', '' ],
					colModel : [
							{
								name : 'title',
								index : 'title',
								align : "left"
							},
							{
								name : 'icon',
								index : 'icon',
								formatter : function(value, rec) {
									switch(value){
										case "univmap_ra_red-tri.png":
											return '<a class="b-univmap-ra-red" href="javascript:void(0)"></a>';
										case "univmap_ra_purp-sq.png":
											return '<a class="b-univmap-ra-purp" href="javascript:void(0)"></a>';
										case "univmap_ra_orng-circ.png":
											return '<a class="b-univmap-ra-orng" href="javascript:void(0)"></a>';
										case "univmap_ra_grn-diam.png":
											return '<a class="b-univmap-ra-grn" href="javascript:void(0)"></a>';
										case "univmap_ra_blu-star.png":
											return '<a class="b-univmap-ra-blu" href="javascript:void(0)"></a>';
									}
								}
							},
							{
								name : 'id',
								index : 'id',
								align : "left",
								sortable : false,
								formatter : function(value, rec) {
									return '<a class="icn_edit_16" title="Edit" onclick="recipientAppThreshold.editUnsolicitedCategory('
											+ value
											+ ',this);" href="javascript:void(0);"></a>&nbsp;<a class="icn_trash_16" title="Delete" onclick="return recipientAppThreshold.removeUnsolicitedCategory('
											+ value
											+ ');" href="javascript:void(0);"></a>';
								}
							}
					],
					jsonReader : {
						root : "data",
						page : "currentPageNo",
						total : "totalPageCount",
						records : "totalCount",
						repeatitems : false
					},
					hidegrid : false,
					sortname : 'id',
					sortorder : 'asc',
					viewrecords : true,
//					pager : "#unsolicitedCategoryGridPager",
					prmNames : {
						page : "pageNo",
						totalrows : "totalrows"
					}
				});
	}

	recipientAppThreshold.editUnsolicitedCategory = function(value,obj) {
		if($('#ra_tabpanel_expand_add').hasClass('collapsed')){
			$('#ra_tabpanel_expand_add').click();
		}
		$('#unsolicitedCategoryId').val(value);
		var categoryText = $(obj).parent().prev().prev().text();
		$('#unsolicitedCategoryText').val(categoryText);
		var cls = $(obj).parent().prev().find('a').eq(0).attr('class');
		$('#addCategoryHead').text("Edit "+categoryText);
		if(!$('#select_map dt a').hasClass(cls)){
			$('#select_map dt a').removeClass();
			$('#select_map dt a').addClass('left ' + cls);
			$('#select_map dt a').attr('clazz',cls);
		};
		$('#unsolicitedCategoryText').removeClass('error');
		$('#addUnsolicitedCategoryForm').find('.error-bottom').remove();
		$('#addUnsolicitedCategoryButton').show();
	};

	recipientAppThreshold.removeUnsolicitedCategory = function(value) {
		EB_Common.dialog
				.confirm(
						i18n['recipientthreshold.text.unsolicitedcategory.deletemessage'],
						i18n['global.threshold.delete.comfirmtitle'],
						function() {
							$(this).dialog("close");
							EB_Common.Ajax
									.post(
											"/recipientAppThreshold/removeUnsolicitedCategory",
											{
												unsolicitedCategoryId : value
											},
											function(data) {
												if (data.status != "yes") {
													EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
												} else {
													recipientAppThreshold.unsolicitedCategoryGrid.jqGrid(
															"setGridParam",
															{
																loadComplete:function(){
																	recipientAppThreshold.clearUnsolicitedCategory();
																}
															}).trigger("reloadGrid");
												}
											}, "json");
						});
	};

	cacheUIElement = function() {
		recipientAppThreshold.unsolicitedCategoryGrid = $('#unsolicitedCategoryTable');
		recipientAppThreshold.saveUnsolicitedCategory = $('#saveUnsolicitedCategory');
		recipientAppThreshold.unsolicitedCategoryText = $('#unsolicitedCategoryText');
	};

	addListeners = function() {

		recipientAppThreshold.saveUnsolicitedCategory.click(saveUnsolicitedCategory);
		
		$('#addUnsolicitedCategoryButton').click(function(){
			var value = $('#unsolicitedCategoryId').val();
			if (value != '0') {
				EB_Common.dialog.confirm(
						i18n['weatherthreshold.dialog.canceleditdata'], i18n['global.dialog.title.confirm'],
						function() {
							$(this).dialog("close");
							recipientAppThreshold.clearUnsolicitedCategory();
						});
			}
		});
		$('#addUnsolicitedCategoryForm').validate({
			rules : {'unsolicitedCategoryTextName' : {
							required:true,
							maxlength:120,
							remote:{
						          url:'recipientAppThreshold/existsUnsolicitedCategory',   
						          type: "POST",
						          data: {                   
						        	  title: function() {
						   		            return $.trim($("#unsolicitedCategoryText").val());
						              },
						              id:function(){
						            	  return $('#unsolicitedCategoryId').val();
						              }
				                  }
			                  }
						}
			},
			messages:{
				'unsolicitedCategoryTextName':{ remote: i18n['unsolicitedcategory.error.name.duplicate']}
			},
			submitHandler:function(form){
				var unsolicitedCategoryText = recipientAppThreshold.unsolicitedCategoryText.val();
				recipientAppThreshold.sendsaveUnsolicitedCategory(unsolicitedCategoryText);
			}
		});	
	};

	saveUnsolicitedCategory = function() {
		$('#addUnsolicitedCategoryForm').submit();
		
		//reset Leave Page State
        EB_Common.LeavePage.resetState();
	};

	recipientAppThreshold.sendsaveUnsolicitedCategory = function(
			unsolicitedCategoryText) {
		var UnsolicitedCategory = {};
		UnsolicitedCategory.title =$.trim(unsolicitedCategoryText);
		UnsolicitedCategory.id = $('#unsolicitedCategoryId').val();
		UnsolicitedCategory.description = "";
		
		var clazz = $('#select_map dt a').attr('clazz');
		switch(clazz){
			case "b-univmap-ra-purp":
				UnsolicitedCategory.icon='univmap_ra_purp-sq.png';
				break;
			case "b-univmap-ra-orng":
				UnsolicitedCategory.icon='univmap_ra_orng-circ.png';
				break;
			case "b-univmap-ra-grn":
				UnsolicitedCategory.icon='univmap_ra_grn-diam.png';
				break;
			case "b-univmap-ra-blu":
				UnsolicitedCategory.icon='univmap_ra_blu-star.png';
				break;
			default:
				UnsolicitedCategory.icon='univmap_ra_red-tri.png';
		}

		EB_Common.Ajax.post('/recipientAppThreshold/saveUnsolicitedCategory', {
			unsolicitedCategory : EB_Common.json.stringify(UnsolicitedCategory)
		}, function(data) {
			if (data.status != "yes") {
				EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
			} else {
				recipientAppThreshold.unsolicitedCategoryGrid.jqGrid("setGridParam",
																	{
																		loadComplete:function(){
																			EB_Common.ToolPrompt.show('saveUnsolicitedCategory','Save successfully');
																			recipientAppThreshold.clearUnsolicitedCategory();
																		}
																	}).trigger("reloadGrid");
			}
		}, "json");
	};

	recipientAppThreshold.clearUnsolicitedCategory = function(){
		//removeData method will reomve all the attr of the input,so it will be valiadted again.
		recipientAppThreshold.unsolicitedCategoryText.val('').removeData();
		$('#unsolicitedCategoryText').removeClass('error');
		$('#addUnsolicitedCategoryForm').find('.error-bottom').remove();
		$('#select_map dt a').removeClass();
		$('#select_map dt a').addClass('left b-univmap-ra-red');
		$('#select_map dt a').attr('clazz','b-univmap-ra-red');
		$('#unsolicitedCategoryId').val('0');
		$('#addCategoryHead').html("Add Category");
		$('#addUnsolicitedCategoryButton').hide();
	}
	recipientAppThreshold.modifyShareMessageSetting = function(id){
		var me = $('#'+id);
		var status;
		var column;
		if(id =='allowShareMessage'){
			column = "allowShareMessage";
			if(me.attr('checked')){
				status = true;
			}else{
				status = false;
			}
		}else if(id =='allowSendMessage'){
			column = 'allowSendMessage';
			if(me.attr('checked')){
				status = true;
			}else{
				status = false;
			}
			
		}else if(id =='shareMessageStatus'){
			column = 'shareMessageStatus';
			if (me.hasClass('off')) {
			    if(!$('#allowShareMessage').attr('checked')){
			        return;
			    }
				me.removeClass('off');
				status = true;
			} else {
				me.addClass('off');
				status = false;
			}
		}
		EB_Common.Ajax.post("/setting/organization/modifyMessageAllowSetting", {
			column : column,
			status:status
		}, function(data) {
		    if(column=='allowShareMessage' && !status){
		        $('#shareMessageStatus').addClass('off');
		    }
			if (data.status != "yes") {
				EB_Common.dialog.alert(i18n['dialog.title.warning'],i18n["'" + data.status + "'"]);
			}
		}, "json");
	}

	view.recipientAppThreshold = recipientAppThreshold;
})(EB_View);