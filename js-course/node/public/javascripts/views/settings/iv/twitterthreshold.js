(function(view) {
	
	
	twitterthreshold = {};
	trGeoAddress = {};
	twitterthreshold.filterKeywords = [ 'about', 'after', 'again', 'air',
	                        			'all', 'along', 'also', 'an', 'and', 'another', 'any', 'are',
	                        			'around', 'as', 'at', 'away', 'back', 'be', 'because', 'been',
	                        			'before', 'below', 'between', 'both', 'but', 'by', 'came',

	                        			'can', 'come', 'could', 'day', 'did', 'different', 'do', 'does',
	                        			'don\'t', 'down', 'each', 'end', 'even', 'every', 'few', 'find',
	                        			'first', 'for', 'found', 'from', 'get', 'give', 'go', 'good',
	                        			'great', 'had', 'has',

	                        			'have', 'he', 'help', 'her', 'here', 'him', 'his', 'home', 'house',
	                        			'how', 'I', 'if', 'in', 'into', 'is', 'it', 'its', 'just', 'know',
	                        			'large', 'last', 'left', 'like', 'line', 'little', 'long', 'look',

	                        			'made', 'make', 'man', 'many', 'may', 'me', 'men', 'might', 'more',
	                        			'most', 'Mr.', 'must', 'my', 'name', 'never', 'new', 'next', 'no',
	                        			'not', 'now', 'number', 'of', 'off', 'old', 'on', 'one', 'only',

	                        			'or', 'other', 'our', 'out', 'over', 'own', 'part', 'people',
	                        			'place', 'put', 'read', 'right', 'said', 'same', 'saw', 'say',
	                        			'see', 'she', 'should', 'show', 'small', 'so', 'some', 'something',
	                        			'sound', 'still', 'such',

	                        			'take', 'tell', 'than', 'that', 'the', 'them', 'then', 'there',
	                        			'these', 'they', 'thing', 'think', 'this', 'those', 'thought',
	                        			'three', 'through', 'time', 'to', 'together', 'too', 'two',
	                        			'under', 'up', 'us', 'use', 'very',

	                        			'want', 'water', 'way', 'we', 'well', 'went', 'were', 'what',
	                        			'when', 'where', 'which', 'while', 'who', 'why', 'will', 'with',
	                        			'word', 'work', 'world', 'would', 'write', 'year', 'you', 'your',
	                        			'was' ];
	
	
	
	twitterthreshold.initPage = function() {
		cacheUIElement();
		addListeners();
		initTable();
		initDynamicFollowerTable();
		twitterthreshold.getActiveAndInActiveThresholds();
		twitterthreshold.getUsedAndRemainingThresholds();
		initMapAndTab();
		initGeoAddress();
		initValidationRules();
		initShowRequestTwitterUserMessage();
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
		$('#panelCollapse2').click(function() {
			var collapse = $(this), gridPanel = $('#gridPanelTw');
			if (collapse.hasClass('extend')) {
				gridPanel.hide();
				collapse.removeClass('extend');
			} else {
				gridPanel.show();
				collapse.addClass('extend');
			}

		});
		$('#panelCollapse3').click(function() {
			var collapse = $(this), gridPanel = $('#gridPanelTwDynamicFollower');
			if (collapse.hasClass('extend')) {
				gridPanel.hide();
				collapse.removeClass('extend');
			} else {
				gridPanel.show();
				collapse.addClass('extend');
			}

		});

	};
	
	
	function initShowRequestTwitterUserMessage(){
		$('#volumeRetryTwitterUser').live('click',function(){
		});
		$('#volumeTwitterUserFailMessage').hide();
		$('#volumeTwitterUserSuccessMessage').hide();
			
		$('#denominatorRetryTwitterUser').live('click',function(){
		});
		$('#denominatorTwitterUserFailMessage').hide();
		$('#denominatorTwitterUserSuccessMessage').hide();
		
		
		$('#percentageRetryTwitterUser').live('click',function(){
		});
		$('#percentageTwitterUserFailMessage').hide();
		$('#percentageTwitterUserSuccessMessage').hide();
	}

	function initDynamicFollowerTable(){
		twitterthreshold.dynamicFollowerGrid
		.jqGrid({
			autoencode:true,
			url : EB_Common.Ajax
					.wrapperUrl('/twitterThreshold/listDynamicFollowers'),
			height : 175,
			datatype : 'json',
			emptyDataCaption : i18n['global.grid.emptyDataCaption'],
			autowidth : true,
			colNames : [ i18n['twitterthreshold.field.username'],'' ],
			colModel : [
					{
						name : 'screenName',
						index : 'screenName',
						sortable : false,
						width : 200
					},
					{
						name : 'id',
						index : 'id',
						width : 100,
						sortable : false,
						align:'right',
						formatter : function(value,index,rowObject) {
							return '<a class="icn_trash_16" title="Delete" style="margin-right:32px;" onclick="return twitterthreshold.removeDynamicFollower(\''+rowObject.screenName+'\');" href="javascript:void(0);"></a>';
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
			prmNames : {
				page : "pageNo",
				totalrows : "totalrows"
			},
            gridComplete : function() {
                var recs = twitterthreshold.dynamicFollowerGrid.getGridParam("records");
                if (recs == 0) {
                    var me = $('#gridPanelTwDynamicFollower').find('.icon_tabpanel_expand');
                    var container = me.parent().next();
                    me.addClass('collapsed');
                    container.hide();
                } else {
                    var me2 = $('#gridPanelTwDynamicFollower').find('.icon_tabpanel_expand');
                    var container2 = me2.parent().next();
                    me2.removeClass('collapsed');
                    container2.show();
                }
            }
		});
	};
	
	function initTable() {
		twitterthreshold.twitterthresholdGrid
				.jqGrid({
					autoencode:true,
					url : EB_Common.Ajax
							.wrapperUrl('/twitterThreshold/listTwitterThresholds'),
					height : 175,
					datatype : 'json',
					emptyDataCaption : i18n['global.grid.emptyDataCaption'],
					autowidth : true,
					colNames : [ i18n['twitterthreshold.field.thresholdname'],
					             i18n['twitterthreshold.field.if'],
					             i18n['twitterthreshold.field.keywords'],
					             i18n['twitterthreshold.field.from'],
					             i18n['twitterthreshold.field.location'],
					             i18n['twitterthreshold.field.launchtemplates'],
					             i18n['twitterthreshold.field.startevent'],
					             i18n['global.status'], '' ],
					colModel : [
							{
								name : 'name',
								index : 'name',
								width : 200
							},
							{
								name : 'amount',
								index : 'amount',
								width : 200,
								formatter : twitterthreshold.renderIFColumn
							},
							{
								name : 'keywords',
								index : 'keywords',
								width : 200
							},
							{
								name : 'fromFollower',
								index : 'fromFollower',
								width : 200,
								formatter : twitterthreshold.renderFromColumn
							},
							{
								name : 'region',
								index : 'region',
								width : 200,
								sortable : false,
								formatter : twitterthreshold.renderRegionColumn
							},
							{
								name : 'broadcastTemplateIds',
								index : 'broadcastTemplateIds',
								width : 200,
								sortable : false,
								formatter : twitterthreshold.renderLauchTemplatesColumn
							},
							{
								name : 'event',
								index : 'event',
								width : 200,
								sortable : false
							},
							{
								name : 'thresholdStatus',
								index : 'thresholdStatus',
								width : 200,
								editable : true,
								formatter : twitterthreshold.renderStatusColumn
							},
							{
								name : 'id',
								index : 'id',
								width : 100,
								sortable : false,
								formatter : function(value) {
									return '<a class="icn_edit_16" title="Edit" onclick="twitterthreshold.editTwitterThreshold('
											+ value
											+ ',this);" href="javascript:void(0);"></a>&nbsp;<a class="icn_trash_16" title="Delete" onclick="return twitterthreshold.removeTwitterthreshold('
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
					gridComplete : function() {
		                var recs = twitterthreshold.twitterthresholdGrid.getGridParam("records");
		                if (recs == 0) {
		                    var me = $('#gridPanelTw').find('.icon_tabpanel_expand');
		                    var container = me.parent().next();
		                    me.addClass('collapsed');
		                    container.hide();
		                } else {
		                    var me2 = $('#gridPanelTw').find('.icon_tabpanel_expand');
		                    var container2 = me2.parent().next();
		                    me2.removeClass('collapsed');
		                    container2.show();
		                }
		            },
					hidegrid : false,
					sortname : 'id',
					sortorder : 'asc',
					viewrecords : true,
					prmNames : {
						page : "pageNo",
						totalrows : "totalrows"
					}
				});
	}

    // init map and init tab
    //Linder Wang add 2012-8-8
    function initMapAndTab(){
		$('#twitterTab .tab_lst a').click(function(){
		    var me = $(this);
			me.siblings().each(function(index){
				$(this).removeClass('mouse_out');
			});
			me.addClass('mouse_out');
			me.parent().nextAll().hide();
			$('#' + me.attr('tabPanel')).show();
		});

		$('#select_map dt').click(function(){
		    var me = $(this),
		        next = me.next(),
		        offset = me.offset(),
		        docH = $(document).height(),
		        dtH = me.outerHeight(true),
		        ddH = next.outerHeight(true);
		    if((docH - offset.top - dtH) < ddH){
		    	next.offset({
					top : offset.top - ddH
				});
		    }
			$(this).next().toggle();
		});

		$('#select_map dd a ').click(function(){
		    var me = $(this),
			    cls = me.attr('class');
			if(!$('#select_map dt a').hasClass(cls)){
				$('#select_map dt a').removeClass();
				$('#select_map dt a').addClass('left ' + cls);
				$('#select_map dt a').attr('clazz',cls);
			}
			me.parent().hide();
		});

		$('#contentPanel').children().click(function(event){
		    var children = $('#select_map').children().add($('#select_map').children().children()),
		        flag = false;
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
    }
    
    
    getColumnIndexByName = function(columnName) {
        var cm = twitterthreshold.twitterthresholdGrid.jqGrid('getGridParam','colModel'),i=0,l=cm.length;
        for (; i<l; i++) {
            if (cm[i].name===columnName) {
                return i;
            }
        }
        return -1;
    };
    
    

    function initValidationRules(){
    	$.validator.addMethod('prefixfollowName',function(value, element){
    		value=$.trim(value);
    		if($(element).attr('disabled')=='disabled')
    			return true;
    		if($("#volumePanel").is(":hidden")){
    			return value.indexOf('@')==0?true:false;
    		}
    		var checked = twitterthreshold.followNameCheckbox.attr('checked');
    		if(checked=='checked'){
    			return value.indexOf('@')==0?true:false;
    		}
    	},i18n['twitterthreshold.customer.validatemessage.prefixfollowname']);
    	$.validator.addMethod('prefixHashtagsText',function(value, element){
    		value=$.trim(value);
    		if($(element).attr('disabled')=='disabled')
    			return true;
    		if($("#volumePanel").is(":hidden")){
    			hashtags= value.split(',');
    			for(var count=0;count<hashtags.length;count++){
    				hashtag=hashtags[count];
    				if(!(hashtag.indexOf('#')==0)){
    					return false;
    				}
    			}
    			return true;
    		}
    		var checked = twitterthreshold.hashtagsTextCheckbox.attr('checked');
    		if(checked=='checked'){
    			hashtags= value.split(',');
    			for(var count=0;count<hashtags.length;count++){
    				hashtag=hashtags[count];
    				if(!(hashtag.indexOf('#')==0)){
    					return false;
    				}
    			}
    			return true;
    		}
    	},i18n['twitterthreshold.customer.validatemessage.prefixHashtags']);
    	
    	
    	
    	$.validator.addMethod('prefixKeywordTextLong',function(value, element){
    		value=$.trim(value);
    		if($(element).attr('disabled')=='disabled')
    			return true;
    		if($("#volumePanel").is(":hidden")){
    			var checked =  $('#keywordsTextPercentageCheckbox').attr('checked');
        		if(checked=='checked'){
        			keywords= value.split(',');
        			for(var count=0;count<keywords.length;count++){
        				keyword=keywords[count];
        				keyword=$.trim(keyword);
        				if(keyword.length<=2){
        					return false;
        				}
        			}
        		}
    			return true;
    		}
    		var checked = $('#keywordsTextCheckbox').attr('checked');
    		if(checked=='checked'){
    			keywords= value.split(',');
    			for(var count=0;count<keywords.length;count++){
    				keyword=keywords[count];
    				keyword=$.trim(keyword);
    				if(keyword.length<=2){
    					return false;
    				}
    			}
    			return true;
    		}
    	},i18n['twitterthreshold.customer.validatemessage.keywords']);
    	
    	$.validator.addMethod('prefixKeywordCommon',function(value, element){
    		value=$.trim(value);
    		if($(element).attr('disabled')=='disabled')
    			return true;
    		if($("#volumePanel").is(":hidden")){
    			var checked =  $('#keywordsTextPercentageCheckbox').attr('checked');
        		if(checked=='checked'){
        			keywords= value.split(',');
        			for(var count=0;count<keywords.length;count++){
        				keyword=keywords[count];
        				keyword=$.trim(keyword);
        				for(var cnt=0;cnt<twitterthreshold.filterKeywords.length;cnt++){
        					if(keyword==twitterthreshold.filterKeywords[cnt]){
        						return false;
        					}
        				}
        			}
        		}
    			return true;
    		}
    		var checked =  $('#keywordsTextCheckbox').attr('checked');
    		if(checked=='checked'){
    			keywords= value.split(',');
    			for(var count=0;count<keywords.length;count++){
    				keyword=keywords[count];
    				keyword=$.trim(keyword);
    				for(var cnt=0;cnt<twitterthreshold.filterKeywords.length;cnt++){
    					if(keyword==twitterthreshold.filterKeywords[cnt]){
    						return false;
    					}
    				}
    			}
    			return true;
    		}
    	},i18n['twitterthreshold.customer.validatemessage.commonkeyword']);
    	
    	
    	
    	$.validator.addMethod('atLeastOneBroadCastTemplete', function(value, ele) {
            return $('#broadcatTemplates2').find("li").length >= 1;
        }, i18n['twitterthreshold.customer.validatemessage.selectbroadcasttemplate']);
    }

    // init Geo Address autoComplete
    function initGeoAddress(){
    	var cache = {},
			lastXhr;
		$('#locationText').autocomplete({
			minLength: 2,
			delay: 500,
			source: function( request, response ) {
				var term = request.term;
				if ( term in cache ) {
					response( cache[ term ] );
					return;
				}

				lastXhr = $.getJSON(EB_Common.Ajax.wrapperUrl('/twitterThreshold/listGeoAddress'), request, function( data, status, xhr ) {
				    var autoData;
				    if(!data || !data.data){
				    	autoData = [];
				    }else{
				    	autoData = $(data.data).map(
							function(index) {
								return {
									id : this.addressLine + ','
											+ this.country,
									label : this.addressLine
											+ ','
											+ this.country,
									value : this.addressLine
											+ ','
											+ this.country,
									data:this
								};
							});
				    }
					cache[ term ] = autoData;
					if ( xhr === lastXhr ) {
						response( autoData );
						$('#locationText').removeClass('ui-autocomplete-loading');
					}
				});
			},
			select: function(event, ui){
				twitterthreshold.locationText.selectGeoAddress={};
				twitterthreshold.locationText.selectGeoAddress=ui.item.data;
			}
		});

		$('#locationTextPercentage').autocomplete({
			minLength: 2,
			delay: 500,
			source: function( request, response ) {
				var term = request.term;
				if ( term in cache ) {
					response( cache[ term ] );
					return;
				}

				lastXhr = $.getJSON(EB_Common.Ajax.wrapperUrl('/twitterThreshold/listGeoAddress'), request, function( data, status, xhr ) {
				    var autoData;
				    if(!data || !data.data){
				    	autoData = [];
				    }else{
				    	autoData = $(data.data).map(
							function(index) {
								return {
									id : this.addressLine + ','
											+ this.country,
									label : this.addressLine
											+ ','
											+ this.country,
									value : this.addressLine
											+ ','
											+ this.country,
									data:this
								};
							});
				    }
					cache[ term ] = autoData;
					if ( xhr === lastXhr ) {
						response( autoData );
						$('#locationTextPercentage').removeClass('ui-autocomplete-loading');
					}
				});
			},
			 select: function(event, ui){
				 twitterthreshold.locationTextPercentage.selectGeoAddress={};
				 twitterthreshold.locationTextPercentage.selectGeoAddress=ui.item.data;
			 }
		});

    }

	twitterthreshold.renderIFColumn = function(cellValue,options, rowObject) {
		if (cellValue == "0") {
			return '>' + (Number(rowObject.percentage) * 100) + '%';
		} else {
			return cellValue + 'Tweets';
		}
	};

	twitterthreshold.renderFromColumn = function(value, options,rowObject) {
		if(rowObject.twitterUserScreenName==null)
			return '<label></label>';
		return $.jgrid.htmlEncode(rowObject.twitterUserScreenName);
	};

	twitterthreshold.renderRegionColumn = function(value, rec) {
		if(value==null || value.address==null) return '<label></label>';
		return value.address;
	};

	twitterthreshold.renderLauchTemplatesColumn = function(value, options,rowObject) {
		var broadcastTemplateContent='';
		if(rowObject!=null){
			for ( var count = 0; count < rowObject.broadcasteTemplateTitle.length; count++) {
				broadcastTemplateContent += rowObject.broadcasteTemplateTitle[count]	
				+ "/";
			}
		}else{
			return '<label></label>';
		}
		return broadcastTemplateContent.substring(0,
				broadcastTemplateContent.length - 1);
		
	};

	twitterthreshold.renderStatusColumn = function(value, rec) {
		var startDiv = '';
		if (value == "Active") {
			startDiv += '<b class="b-grid-status" onclick="twitterthreshold.formatUnit(this,'
					+ rec.rowId + ');"></b>';
		} else {
			startDiv += '<b class="b-grid-status off" onclick="twitterthreshold.formatUnit(this,'
					+ rec.rowId + ');"></b>';
		}
		return startDiv;
	};

	twitterthreshold.formatUnit = function(element, id) {
		var me = $(element);
		EB_Common.Ajax.post("/twitterThreshold/modifyStatus", {
			twitterThresholdId : id,
			time:new Date()
			
		}, function(data) {
			if (data.status == "yes") {
			    if (me.hasClass('off')) {
		            $(element).removeClass('off');

		        } else {
		            $(element).addClass('off');

		        }
				twitterthreshold.cleanEditPanel();
				twitterthreshold.getActiveAndInActiveThresholds();
				twitterthreshold.getUsedAndRemainingThresholds();
			} else {
				EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
			}
		}, "json");
	};

	twitterthreshold.editTwitterThreshold = function(value,elem) {
		EB_Common.Ajax.post("/twitterThreshold/changeThresholdStatusToInactive", {
			twitterThresholdId : value,
			time:new Date()
		}, function(data) {
			if (data.status == "yes") {
				var indexOfStatus=getColumnIndexByName('thresholdStatus');
				var indexOfId=getColumnIndexByName('id');
				var idComponents = $("tbody > tr.jqgrow > td:nth-child("+(indexOfId+1)+") > a.icn_edit_16");
				var statusComponents = $("tbody > tr.jqgrow > td:nth-child("+(indexOfStatus+1)+") > b.b-grid-status");
				var rowIndex = idComponents.index(elem);
				var statusComponent = statusComponents.get(rowIndex);
				EB_Common.Ajax.get("/twitterThreshold/getTwitterThreshold", {
					twitterThresholdId : value,
					time:new Date()
				}, function(data) {
					if (data.status == "yes") {
					    $(statusComponent).addClass('off');
						var twitterThreshold = data.twitterThreshold;
						twitterthreshold.cleanEditPanel();
						twitterthreshold.setModel(twitterThreshold);
						twitterthreshold.getActiveAndInActiveThresholds();
						twitterthreshold.getUsedAndRemainingThresholds();
						if($('#tw_tabpanel_expand_add').hasClass('collapsed')){
							$('#tw_tabpanel_expand_add').click();
						}
					} else {
						EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
					}
				}, "json");
			} else {
				EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
			}
		}, "json");
	};

	twitterthreshold.removeTwitterthreshold = function(value) {
		EB_Common.dialog.confirm(
				i18n['global.threshold.deletemessage'],
				i18n['global.threshold.delete.comfirmtitle'], function() {
					$(this).dialog("close");
					EB_Common.Ajax.post("/twitterThreshold/removeTwitterThreshold", {
						twitterThresholdId : value,
						time:new Date()
					}, function(data) {
						if (data.status != "yes") {
							EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
						} else {
							twitterthreshold.twitterthresholdGrid.jqGrid(
									"setGridParam",
									{
										loadComplete:function(){
											twitterthreshold.getActiveAndInActiveThresholds();
											twitterthreshold.getUsedAndRemainingThresholds();
											twitterthreshold.cleanEditPanel();
										}
									}).trigger("reloadGrid");

						}
					}, "json");
				});
	};
	
	
	
	twitterthreshold.removeDynamicFollower = function(value) {
		EB_Common.dialog.confirm(
				i18n['twitterthreshold.dialog.alert.deletemessage'],
				i18n['global.threshold.delete.comfirmtitle'], function() {
					$(this).dialog("close");
					EB_Common.Ajax.post("/twitterThreshold/removeDynamicFollower", {
						screenName : value,
						time:new Date()
					}, function(data) {
						if (data.status != "yes") {
							EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
						} else {
							twitterthreshold.dynamicFollowerGrid.jqGrid(
									"setGridParam").trigger("reloadGrid");

						}
					}, "json");
				});
	};
	
	

	cacheUIElement = function() {
		twitterthreshold.twitterthresholdGrid = $('#twitterThresholdTable');
		twitterthreshold.dynamicFollowerGrid = $('#dynamicFollowerTable');
		twitterthreshold.editTwitterSteamAccount = $('#editTwitterSteamAccount');
		twitterthreshold.saveButton = $('#saveBtn');
		twitterthreshold.twitterThresholdAmountText = $('#twitterThresholdAmountText');
		twitterthreshold.twitterThresholdPercentageSelect = $('#twitterThresholdPercentageSelect');
		twitterthreshold.followName = $('#followName');
		twitterthreshold.followNamePercentage = $('#followNamePercentage');
		twitterthreshold.thresholdName = $('#thresholdName');
		twitterthreshold.keywordsText = $('#keywordsText');
		twitterthreshold.denominatorText = $('#denominatorText');
		twitterthreshold.keywordsTextPercentage = $('#keywordsTextPercentage');
		twitterthreshold.hashtagsText = $('#hashtagsText');
		twitterthreshold.hashtagsTextPercentage = $('#hashtagsTextPercentage');
		twitterthreshold.radiusText = $('#radiusText');
		twitterthreshold.radiusTextPercentage = $('#radiusTextPercentage');
		twitterthreshold.startEventCheckbox = $('#statrtEvent');
		twitterthreshold.statrtEventText = $('#statrtEventText');
		twitterthreshold.launchBroadcast = $('#launchBroadcast');
		twitterthreshold.broadcatTemplates = $('#broadcatTemplatesTw');
		twitterthreshold.sendDashboardAlert = $('#sendDashboardAlert');
		twitterthreshold.thresholdId = $('#thresholdId');
		twitterthreshold.addTwitterThresholdButton = $('#addTwitterThresholdButton');
		twitterthreshold.timeText = $('#timeText');
		twitterthreshold.timeTextPercentage = $('#timeTextPercentage');
		twitterthreshold.timeUnitSelect = $('#timeUnitSelect');
		twitterthreshold.timeUnitSelectPercentage = $('#timeUnitSelectPercentage');
		twitterthreshold.geoAddressText = $('#geoAddressText');
		twitterthreshold.geoAddressTextPercentage = $('#geoAddressTextPercentage');
		twitterthreshold.geoAddressTable = $('#geoAddressTable');
		twitterthreshold.FINALSTATICFOLLOWOPTION = '<option>select follows...</option>';
		twitterthreshold.geoAddressDiv = $('#geoAddressDiv');
		twitterthreshold.locationText = $('#locationText');
		twitterthreshold.locationTextPercentage = $('#locationTextPercentage');
		twitterthreshold.geoUnitSelect = $('#geoUnitSelect');
		twitterthreshold.geoUnitSelectPercentage = $('#geoUnitSelectPercentage');
		twitterthreshold.thresholdTitle=$('#thresholdTitle');
		twitterthreshold.searchBroadCastTempleteText=$('#searchBroadCastTempleteText');
		twitterthreshold.followNameCheckbox=$('#followNameCheckbox');
		twitterthreshold.hashtagsTextCheckbox=$('#hashtagsTextCheckbox');
	};

	addListeners = function() {
		twitterthreshold.saveButton.click(saveTwitterThresholdClicked);

		$('.toggleValidation').click(function(){
			var obj = $(this);
			if(obj.attr('checked')){
				var input = obj.parent().next().find('input').eq(0);
				input.removeAttr('disabled');
				if(obj.attr('id')=='radiusTextCheckbox'){
					$('#locationText').removeAttr('disabled');
				}else if(obj.attr('id')=='radiusTextPercentageCheckbox'){
					$('#locationTextPercentage').removeAttr('disabled');
				}

			}else{
				delete window.twitterUserAjaxStatus;
				var archElement = obj.parent().next();
				var input = archElement.find('input').eq(0);
				input.attr('disabled','disabled').val('');
				var inputs = obj.parent().next().find('input');
				for(var count=0;count<inputs.size();count++){
					$(inputs[count]).removeClass('error').next('label.error').remove();
				}
				if(obj.attr('id')=='radiusTextCheckbox'){
					$('#locationText').attr('disabled','disabled').val('').removeClass('error');
					if(twitterthreshold.locationText.selectGeoAddress!=undefined){
						delete twitterthreshold.locationText.selectGeoAddress;
					}
				}else if(obj.attr('id')=='radiusTextPercentageCheckbox'){
					$('#locationTextPercentage').attr('disabled','disabled').val('').removeClass('error');
					if(twitterthreshold.locationTextPercentage.selectGeoAddressd!=undefined){
						delete twitterthreshold.locationTextPercentage.selectGeoAddressd;
					}
				}else if(obj.attr('id')=='followNameCheckbox'){
					$('#volumeTwitterUserFailMessage').hide();
					$('#volumeTwitterUserSuccessMessage').hide();
				}else if(obj.attr('id')=='followNamePercentageCheckbox'){
					$('#percentageTwitterUserFailMessage').hide();
					$('#percentageTwitterUserSuccessMessage').hide();
				}
				//$('#twitterThresholdForm').valid();
			}
		});

		$('#denominatorSelect').change(function(){
			delete window.twitterUserAjaxStatus;
			var denominator = $(this).val();
			if(denominator=='hashtags'){
				$('#denominatorText').removeClass('prefixfollowName').removeClass('validateTwitterUser').addClass('prefixHashtagsText').val('').attr('placeholder',"#hashtag");
				$('#hashtagsTextPercentageTr').attr('style','display:none;');
				$('#followNamePercentTr').removeAttr('style');
				$('#denominatorTwitterUserFailMessage').hide();
				$('#denominatorTwitterUserSuccessMessage').hide();
			}else{
				$('#denominatorText').removeClass('prefixHashtagsText').addClass('prefixfollowName').addClass('validateTwitterUser').val('').attr('placeholder',"@username");
				$('#followNamePercentTr').attr('style','display:none;');
				$('#hashtagsTextPercentageTr').removeAttr('style');

			}
		});

		twitterthreshold.startEventCheckbox.click(function() {
			var checked = $(this).attr('checked');
			if(checked == 'checked'){
				twitterthreshold.statrtEventText.attr(
						'disabled', false);
				twitterthreshold.statrtEventText.rules("add", {
	                required : true
	            });
			}else{
				twitterthreshold.statrtEventText.attr(
						'disabled', true).val('');
				twitterthreshold.statrtEventText.removeData().rules("remove");
				var spans=twitterthreshold.statrtEventText.removeClass('error').parent().find('span');
				$.each(spans,function(index,item){
					var error = $(item).hasClass('error-right');
					if(error){
						$(item).empty();
					}
				});
			}

		});
		twitterthreshold.launchBroadcast
				.click(function() {
					var checked = $(this).attr('checked');
					if (checked == 'checked') {
						twitterthreshold.broadcatTemplates.find(':checkbox')
								.each(function() {
									$(this).attr('disabled', false);
								});
						twitterthreshold.statrtEventText
								.attr('disabled', false);
						twitterthreshold.statrtEventText.rules("add", {
			                required : true
			            });
						twitterthreshold.startEventCheckbox.attr('checked',
								true);
					} else {
						twitterthreshold.broadcatTemplates.find(':checkbox')
								.each(function() {
									$(this).attr('disabled', true);
								});
						twitterthreshold.statrtEventText.attr('disabled', true)
								.val('');
						twitterthreshold.statrtEventText.removeData().rules("remove");
						twitterthreshold.startEventCheckbox.removeAttr(
								'checked', false);
					}
				});

		twitterthreshold.addTwitterThresholdButton.click(function() {
			twitterthreshold.cancelEditingTwitterThreshold(twitterthreshold.cleanEditPanel);
		});
		$('#launchBroadcastTwitter').click(function(){
			var checked = $(this).attr('checked');

			if (checked == 'checked') {
				$(".toggleHidden").removeAttr("style");
				twitterthreshold.startEventCheckbox.attr(
						'checked', true);
				twitterthreshold.statrtEventText.attr('disabled', false);
			} else {
				$(".toggleHidden").attr("style", "display:none");
				var spans=$('#statrtEventText').removeClass('error').parent().find('span');
				$.each(spans,function(index,item){
					var error = $(item).hasClass('error-right');
					if(error){
						$(item).empty();
					}
				});
			}
		});


		$('#searchTwBroadCastTempleteButton').click(function(e) {
			e.preventDefault();
			twitterthreshold.initBroadcastTemplate();
		});

		$("#twitterThresholdForm").validate({
			
			rules : {'thresholdName' : {
				remote:{
			          url:EB_Common.Ajax.wrapperUrl('/twitterThreshold/existsTwitterThreshold'),
			          type: "POST",
			          data: {
			        	  title: function() {
			   		            return $.trim($("#thresholdName").val());
			              },
			              id:function(){
			            	  var idValue=$('#thresholdId').val();
			            	  if(idValue.length==0){
			            		  return '0';
			            	  }
			            	  return idValue;
			              }
	                  }
                  }
			}
			},
			messages:{
				'thresholdName':{ remote: i18n['twitterthreshold.error.name.duplicate']}
			},
			submitHandler:function(form){
				saveTwitterThreshold();
			}
		});

        $('#followName').blur(function(){
            twitterthreshold.validateTwitterUser($('#followName').val(),function(value){
            	if(value=='nodata'){
            		$('#volumeTwitterUserFailMessage').show().html('').html(' Username doesn\'t exist; check the spelling or enter another.<span id="volumeRetryTwitterUser" href="javascript:void(0)"></span>');
            		$('#volumeTwitterUserSuccessMessage').hide();
            		window.twitterUserAjaxStatus=false;
            		
            	}else if(value=='limit'){
            		$('#volumeTwitterUserFailMessage').show().html('').html(' Twitter server is not available right now, <span id="volumeRetryTwitterUser" href="javascript:void(0)">please try again later</span>');
            		$('#volumeTwitterUserSuccessMessage').hide();
            		window.twitterUserAjaxStatus=false;
            	}else if(value='success'){
            		$('#volumeTwitterUserFailMessage').hide();
            		$('#volumeTwitterUserSuccessMessage').show();
            		window.twitterUserAjaxStatus=true;
            	}
            	
            });
        });
        $('#followNamePercentage').blur(function(){
            twitterthreshold.validateTwitterUser($('#followNamePercentage').val(),function(value){
            	if(value=='nodata'){
            		$('#percentageTwitterUserFailMessage').show().html('').html(' Username doesn\'t exist; check the spelling or enter another. <span id="percentageRetryTwitterUser" href="javascript:void(0)"></span>');
            		$('#percentageTwitterUserSuccessMessage').hide();
            		window.twitterUserAjaxStatus=false; 
            	}else if(value=='limit'){
            		$('#percentageTwitterUserFailMessage').show().html('').html(' Twitter server is not available right now,<span id="percentageRetryTwitterUser" href="javascript:void(0)">please try again later</span>');
            		$('#percentageTwitterUserSuccessMessage').hide();
            		window.twitterUserAjaxStatus=false;
            	}else if(value='success'){
            		$('#percentageTwitterUserFailMessage').hide();
            		$('#percentageTwitterUserSuccessMessage').show();
            		window.twitterUserAjaxStatus=true;
            	}
            });
        });
        $('#denominatorText').blur(function(){
            var twitterUser=$('#denominatorText').hasClass('prefixfollowName');
            if(twitterUser==true){
                twitterthreshold.validateTwitterUser($('#denominatorText').val(),function(value){
                	if(value=='nodata'){
                		$('#denominatorTwitterUserFailMessage').show().html('').html(' Username doesn\'t exist; check the spelling or enter another. <span id="denominatorRetryTwitterUser" href="javascript:void(0)"></span>');
                		$('#denominatorTwitterUserSuccessMessage').hide();
                		window.twitterUserAjaxStatus=false;
                		
                	}else if(value=='limit'){
                		$('#denominatorTwitterUserFailMessage').show().html('').html(' Twitter server is not available right now,<span id="denominatorRetryTwitterUser" href="javascript:void(0)">please try again later</span>');
                		$('#denominatorTwitterUserSuccessMessage').hide();
                		window.twitterUserAjaxStatus=false;
                	}else if(value='success'){
                		$('#denominatorTwitterUserFailMessage').hide();
                		$('#denominatorTwitterUserSuccessMessage').show();
                		window.twitterUserAjaxStatus=true;
                	}
                });
            }
        });
	};


    twitterthreshold.validateTwitterUser=function(value,callback){
        var twitterUserscreenName=$.trim(value);
        if(twitterUserscreenName.length==0)
            return;
        if(twitterUserscreenName.indexOf('@')==-1){
        	return;
        }
        if(twitterUserscreenName.length<2){
        	return;
        }
        twitterUserscreenName = twitterUserscreenName.substring(1,twitterUserscreenName.length);
        $.ajax({
            beforeSend: function(data) {
	            window.twitterUserAjaxStatus=false;
            },
            url:EB_Common.Ajax.wrapperUrl('/twitterThreshold/getTwitterUser'),
            dataType: 'json',
            cache : false,
            data: {screen_name : twitterUserscreenName},
            success:function(data){
                if(data!=null&&data!=undefined){
                	if(data.nodata!=undefined){
                		twitterthreshold.followName.fromFollower=0;
                        twitterthreshold.followName.twitterUserScreenName='';
                        if(callback!=null&&callback!=undefined){
                        	callback('nodata');
                        }
						return;
					}
					if(data.limit!=undefined){
						twitterthreshold.followName.fromFollower=0;
		                twitterthreshold.followName.twitterUserScreenName='';
		                if(callback!=null&&callback!=undefined){
                        	callback('limit');
                        }
						return;
					}
					if(data.twitterUserWrapper!=undefined){
						twitterthreshold.followName.fromFollower=data.twitterUserWrapper.id;
		                twitterthreshold.followName.twitterUserScreenName=data.twitterUserWrapper.screen_name;
		                if(callback!=null&&callback!=undefined){
                        	callback('success');
                        }
						return;
					}
                }
                twitterthreshold.followName.fromFollower=0;
                twitterthreshold.followName.twitterUserScreenName='';
            },
            error:function(exception){
                twitterthreshold.followName.fromFollower=0;
                twitterthreshold.followName.twitterUserScreenName='';
            }
        });
    };
	
	twitterthreshold.cancelEditingTwitterThreshold=function(callback){
		var value = twitterthreshold.thresholdId.val();
		if (value.length != 0) {
			EB_Common.dialog.confirm(
					i18n['weatherthreshold.dialog.canceleditdata'], i18n['global.dialog.title.confirm'],
					function() {
						$(this).dialog("close");
						$('#addTwitterThresholdButton').hide();
						if(callback && typeof callback=="function"){
							callback.call(this);
						}
					});
		}
	};

	
	twitterthreshold.getActiveAndInActiveThresholds = function() {
		EB_Common.Ajax
				.post(
						"/twitterThreshold/getActiveAndInActiveThresholdNumber",{
							time:new Date()
						},
						function(data) {
							if (data.status != "yes") {
								EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
							} else {
								if (data.activeThresholdNumber == 0
										&& data.inactiveThresholdNumber == 0) {
									$('#currentThresholdDiv').html('')
											.append('<label>you do not any current thresholds</label>');
								}
								$('#activeAndInActiveLabel').text(
										data.activeThresholdNumber + ' '+ i18n["weatherthreshold.text.active"] +' / '
												+ data.inactiveThresholdNumber
												+ ' '+ i18n["weatherthreshold.text.inactive"]);
							}
						}, "json");
	};
	
	
	twitterthreshold.getUsedAndRemainingThresholds = function() {
        EB_Common.Ajax.post("/twitterThreshold/getUsedAndRemainingThresholdNumber", function(data) {
            if (data.status != "yes") {
                EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
            } else {
                if (data.usedThresholdNumber == 0 && data.remainingThresholdNumber == 0) {
                    $('#currentThresholdDiv').html('').append('<label>you do not any current thresholds</label>');
                }else{
                	 $('#usedAndRemainingLabel').text(
                             data.usedThresholdNumber + ' ' + i18n['weatherthreshold.text.used'] + ' / '
                                     + data.remainingThresholdNumber + ' ' + i18n['weatherthreshold.text.remaining']);
                }
               
            }
        }, "json");
    };
	
	
	twitterthreshold.addressSelected = function(obj,tab){
		tr = $(obj);
		trGeoAddress.country=tr.attr('country');
		trGeoAddress.adminDistrict=tr.attr('adminDistrict');
		trGeoAddress.adminDistrict2=tr.attr('adminDistrict2');
		trGeoAddress.locality=tr.attr('locality');
		trGeoAddress.includeNeighborhood=tr.attr('includeNeighborhood');
		trGeoAddress.latitude=tr.attr('latitude');
		trGeoAddress.longitude=tr.attr('longitude');
		trGeoAddress.addressLine=tr.attr('addressLine');
		trGeoAddress.geoSearch=tr.attr('geoSearch');
		
		if(tab=='percentage'){
			$('#addressBodyPercentage').html('');
			$('#locationTextPercentage').val(trGeoAddress.addressLine+","+trGeoAddress.country);
		}else{
			$('#addressBody').html('');
			$('#locationText').val(trGeoAddress.addressLine+","+trGeoAddress.country);
		}
		
	};
	
	reloadPage = function(url) {
		var container = $('#contentPanel');
		container.children().remove();
		container.load(EB_Common.Ajax.wrapperUrl(url), function() {
		});
	};
	
	saveTwitterThresholdClicked = function() {
		$('#twitterThresholdForm').submit();
	};
	
	saveTwitterThreshold = function() {
		if( window.twitterUserAjaxStatus!=undefined){
            if(window.twitterUserAjaxStatus==false){
            	EB_Common.dialog
				.alert('invalid twitter user. please entry again',i18n['dialog.title.warning']);
                return;
            }
        }
		var twitterThreshold = {};
		var thresholdName = $.trim(twitterthreshold.thresholdName.val());
		if (thresholdName.length == 0) {
			EB_Common.dialog
					.alert(i18n['twitterthreshold.dialog.alert.thresholdname'],i18n['dialog.title.warning']);
			twitterthreshold.thresholdName.focus();
			return;
		}
		twitterThreshold.name = thresholdName;
		
		var keywordArray = [];
		var hashtagArray = [];
		var keywordText = '';
		var hashtagsText = '';
		var geoAddressRegion = {};
		var radiusText;
		if($("#volumePanel").is(":hidden")){
			//percentage
			var a= $('#keywordsTextPercentageCheckbox').attr('checked');
			var b= $('#hashtagsTextPercentageCheckbox').attr('checked');
			var c= $('#followNamePercentageCheckbox').attr('checked');
			var d= $('#radiusTextPercentageCheckbox').attr('checked');
			if(!(a||b||c||d)){
				EB_Common.dialog
				.alert(i18n['twitterthreshold.dialog.alert.selectone.message'],i18n['dialog.title.warning']);
				return;
			}
			
			
			twitterThreshold.duration = $.trim(twitterthreshold.timeTextPercentage.val());
			twitterThreshold.percentage = $.trim(twitterthreshold.twitterThresholdPercentageSelect.val());
			if(a){
				keywordText = $.trim(twitterthreshold.keywordsTextPercentage.val());
				if (keywordText.length != 0) {
					var keywords = keywordText.split(',');
					$.each(keywords, function(index, item) {
						keywordArray.push($.trim(item));
					});
				}
				twitterThreshold.keywords=keywordArray;
			}
			if(b){
				hashtagsText = $.trim(twitterthreshold.hashtagsTextPercentage.val());
				if (hashtagsText.length != 0) {
					var hashtags = hashtagsText.split(',');
					$.each(hashtags, function(index, item) {
						hashtagArray.push($.trim(item));
					});
				}
				twitterThreshold.hashtags=hashtagArray;
			}else{
				twitterThreshold.hashtags=[];
			}
			
			if(c){
				twitterThreshold.fromUser = $.trim(twitterthreshold.followNamePercentage.val());
				twitterThreshold.fromFollower =twitterthreshold.followName.fromFollower;
				twitterThreshold.twitterUserScreenName =twitterthreshold.followName.twitterUserScreenName;
			}else{
				twitterThreshold.fromUser = '';
				twitterThreshold.fromFollower =0;
				twitterThreshold.twitterUserScreenName ='';
			}
			
			if(d){
				if(twitterthreshold.locationTextPercentage.selectGeoAddress==undefined){
					EB_Common.dialog.alert(i18n['twitterthreshold.dialog.alert.selectedGeoAddress'],i18n['dialog.title.warning']);
					return;
				}
				radiusText = $.trim(twitterthreshold.radiusTextPercentage.val());
				geoAddressRegion.address = $.trim(twitterthreshold.locationTextPercentage.val());
				geoAddressRegion.radius = radiusText;
				geoAddressRegion.geoAddress = twitterthreshold.locationTextPercentage.selectGeoAddress;
				geoAddressRegion.distanceUnit = $.trim(twitterthreshold.geoUnitSelectPercentage.val());
			}else{
				geoAddressRegion.address='';
				geoAddressRegion.radius =0;
			}
			twitterThreshold.unit = $.trim(twitterthreshold.timeUnitSelectPercentage.val());
			twitterThreshold.denominatorField = $.trim($('#denominatorSelect').val());
			if(twitterThreshold.denominatorField=='fromFollower'){
				twitterThreshold.fromUser= $.trim($('#denominatorText').val());
				twitterThreshold.fromFollower =  twitterthreshold.followName.fromFollower;
				twitterThreshold.twitterUserScreenName = twitterthreshold.followName.twitterUserScreenName;
			}
			else{
				hashtags =$.trim($('#denominatorText').val()).split(',');
				hashtagArray=[];
				$.each(hashtags, function(index, item) {
					hashtagArray.push($.trim(item));
				});
				twitterThreshold.hashtags=hashtagArray;
			}
			twitterThreshold.amount=0;
		}else{
			//volume
			var a= $('#keywordsTextCheckbox').attr('checked');
			var b= $('#hashtagsTextCheckbox').attr('checked');
			var c= $('#followNameCheckbox').attr('checked');
			var d= $('#radiusTextCheckbox').attr('checked');
			if(!(a||b||c||d)){
				EB_Common.dialog
				.alert(i18n['twitterthreshold.dialog.alert.selectone.message'],i18n['dialog.title.warning']);
				return;
			}
			twitterThreshold.percentage = 0;
			var amount = $.trim(twitterthreshold.twitterThresholdAmountText.val());
			twitterThreshold.percentage=0;
			twitterThreshold.duration = $.trim(twitterthreshold.timeText.val());
			if (amount.length != 0) {
				twitterThreshold.amount = amount;
			}
			if(a){
				keywordText = $.trim(twitterthreshold.keywordsText.val());
				if (keywordText.length != 0) {
					var keywords = keywordText.split(',');
					$.each(keywords, function(index, item) {
						keywordArray.push($.trim(item));
					});
				}
				twitterThreshold.keywords=keywordArray;
			}
			if(b){
				hashtagsText = $.trim(twitterthreshold.hashtagsText.val());
				if (hashtagsText.length != 0) {
					var hashtags = hashtagsText.split(',');
					$.each(hashtags, function(index, item) {
						hashtagArray.push($.trim(item));
					});
				}
				twitterThreshold.hashtags=hashtagArray;
			}
			
			if(c){
				twitterThreshold.fromUser = $.trim(twitterthreshold.followName.val());
				twitterThreshold.fromFollower =twitterthreshold.followName.fromFollower;
				twitterThreshold.twitterUserScreenName =twitterthreshold.followName.twitterUserScreenName;
			}else{
				twitterThreshold.fromUser = $.trim(twitterthreshold.followName.val());
				twitterThreshold.fromFollower =0;
				twitterThreshold.twitterUserScreenName ='';
			}
			
			
			if(d){
				
				if(twitterthreshold.locationText.selectGeoAddress==undefined){
					EB_Common.dialog.alert(i18n['twitterthreshold.dialog.alert.selectedGeoAddress'],i18n['dialog.title.warning']);
					return;
				}
				radiusText = $.trim(twitterthreshold.radiusText.val());
				geoAddressRegion.address =  $.trim(twitterthreshold.locationText.val());
				geoAddressRegion.radius = radiusText;
				geoAddressRegion.geoAddress = twitterthreshold.locationText.selectGeoAddress;
				geoAddressRegion.distanceUnit = $.trim(twitterthreshold.geoUnitSelect.val());
				
			}else{
				geoAddressRegion.address='';
				geoAddressRegion.radius =0;
			}
			twitterThreshold.unit = $.trim(twitterthreshold.timeUnitSelect.val());
		}
		
		
		
		var checked = $('#launchBroadcastTwitter').attr('checked');
		if (checked == 'checked'){
			twitterThreshold.sendingBroadcastEnabled = true;
			var selectBroadcastTemplateIds = new Array();
			$('#broadcatTemplates2 a').each(function() {
				var id = $(this).attr("id");
				selectBroadcastTemplateIds.push(id);
			});
			twitterThreshold.broadcastTemplateIds = selectBroadcastTemplateIds;
			twitterThreshold.event = $.trim(twitterthreshold.statrtEventText.val());
		}else{
			twitterThreshold.sendingBroadcastEnabled = false;
			twitterThreshold.broadcastTemplateIds=[];
			twitterThreshold.event = '';
		}
		
		
		
		var alertTriggered = twitterthreshold.sendDashboardAlert
				.attr('checked');
		alertTriggered = alertTriggered == 'checked' ? true : false;
		twitterThreshold.alertTriggered = alertTriggered;
		twitterThreshold.thresholdStatus = 'Active';
		twitterThreshold.id = $.trim(twitterthreshold.thresholdId.val());
		
		var clazz = $('#select_map dt a').attr('clazz');
		switch(clazz){
			case "b-univmap-tw-purp":
				twitterThreshold.icon='univmap_tw_purp-tri.png';
				break;
			case "b-univmap-tw-orng":
				twitterThreshold.icon='univmap_tw_orng-star.png';
				break;
			case "b-univmap-tw-grn":
				twitterThreshold.icon='univmap_tw_grn-circ.png';
				break;
			case "b-univmap-tw-blu":
				twitterThreshold.icon='univmap_tw_blu-dia.png';
				break;
			default:
				twitterThreshold.icon='univmap_tw_red-sq.png';
		}
		
		twitterthreshold.sendSave(twitterThreshold,geoAddressRegion);

	};

	twitterthreshold.sendSave = function(threshold, region) {
		var fromUser= threshold.fromUser;
		delete threshold.fromUser;
		EB_Common.Ajax
				.post(
						'/twitterThreshold/saveTwitterThreshold',
						{
							
							twitterThreshold : EB_Common.json
									.stringify(threshold),
							geoAddressRegion : EB_Common.json.stringify(region),
							fromUser:fromUser==undefined?'':fromUser,
							time:new Date()
						},
						function(data) {
							if (data.status != "yes") {
								if(data.status=='error.business.twitterthreshold.2'){
									EB_Common.dialog.alert(i18n[data.status].replace(/\{([\w-]+)\}/g, twitterthreshold.twitterthresholdGrid.getGridParam("reccount")),i18n['dialog.title.warning']);
									return ;
								}
								EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
							} else {
								twitterthreshold.thresholdId.val('');
								twitterthreshold.twitterthresholdGrid
										.jqGrid(
												"setGridParam",
												{
													url : EB_Common.Ajax
															.wrapperUrl("/twitterThreshold/listTwitterThresholds"),
													datatype : "json",
													emptyDataCaption : i18n['global.grid.emptyDataCaption'],
													mtype : 'get',
													loadError : function() {
														EB_Common.dialog
																.alert('load data error',i18n['dialog.title.warning']);
													},
													loadComplete:function(){
														twitterthreshold.cleanEditPanel();
														EB_Common.ToolPrompt.show('saveBtn','Save successfully');
														twitterthreshold.getActiveAndInActiveThresholds();
														twitterthreshold.getUsedAndRemainingThresholds();
														//reset Leave Page State
        												EB_Common.LeavePage.resetState();
													}
												}).trigger("reloadGrid");
								
								$('#addTwitterThresholdButton').hide();
							}
						}, "json");
	};

	twitterthreshold.cleanEditPanel = function() {
		twitterthreshold.thresholdName.val('').attr('disabled', false).removeData();
		twitterthreshold.thresholdId.val('');
		twitterthreshold.keywordsText.val('');
		twitterthreshold.keywordsTextPercentage.val('');
		twitterthreshold.denominatorText.val('');
		twitterthreshold.hashtagsText.val('');
		twitterthreshold.hashtagsTextPercentage.val('');
		twitterthreshold.followName.val('');
		twitterthreshold.followNamePercentage.val('');
		twitterthreshold.radiusText.val('');
		twitterthreshold.radiusTextPercentage.val('');
		twitterthreshold.geoUnitSelect.get(0).selectedIndex = 0;
		twitterthreshold.geoUnitSelectPercentage.get(0).selectedIndex = 0;
		twitterthreshold.locationText.val('');
		twitterthreshold.locationTextPercentage.val('');
		twitterthreshold.timeText.val('');
		twitterthreshold.timeTextPercentage.val('');
		twitterthreshold.timeUnitSelect.get(0).selectedIndex = 1;
		twitterthreshold.timeUnitSelectPercentage.get(0).selectedIndex = 1;
		twitterthreshold.geoAddressText.val('');
		twitterthreshold.geoAddressTextPercentage.val('');
		twitterthreshold.twitterThresholdAmountText.val('');
		twitterthreshold.statrtEventText.val('');
		twitterthreshold.startEventCheckbox.attr('checked', false);
		twitterthreshold.launchBroadcast.attr('checked', false);
		twitterthreshold.broadcatTemplates.html();
		trGeoAddress = {};
		twitterthreshold.thresholdTitle.html(i18n['weatherthreshold.text.addweatherthreshold']);
		twitterthreshold.searchBroadCastTempleteText.val('');
		$('#broadcatTemplatesTw').html('');
		$('#broadcatTemplates2').html('');
		$('#keywordsTextCheckbox').removeAttr('checked');
		$('#hashtagsTextCheckbox').removeAttr('checked');
		$('#followNameCheckbox').removeAttr('checked');
		$('#radiusTextCheckbox').removeAttr('checked');
		$('#keywordsTextPercentageCheckbox').removeAttr('checked');
		$('#hashtagsTextPercentageCheckbox').removeAttr('checked');
		$('#followNamePercentageCheckbox').removeAttr('checked');
		$('#radiusTextPercentageCheckbox').removeAttr('checked');
		$('#select_map dt a').removeClass();
		$('#select_map dt a').addClass('left b-univmap-tw-red');
		$('#select_map dt a').attr('clazz','b-univmap-tw-red');
		$('.initDisabled').attr('disabled','disabled');
		$('#twitterThresholdPercentageSelect').get(0).selectedIndex = 0;
		$('#denominatorSelect').get(0).selectedIndex =0;
		$('#denominatorSelect').trigger('change');
		$('#volumeTwitterUserFailMessage').hide();
		$('#volumeTwitterUserSuccessMessage').hide();
		$('#denominatorTwitterUserSuccessMessage').hide();
		$('#denominatorTwitterUserFailMessage').hide();
		$('#percentageTwitterUserFailMessage').hide();
		$('#percentageTwitterUserSuccessMessage').hide();
		twitterthreshold.followName.fromFollower=0;
        twitterthreshold.followName.twitterUserScreenName='';
        $('#launchBroadcastTwitter').removeAttr('checked').trigger('click').removeAttr('checked');
        $('#addTwitterThresholdButton').hide();
	};

	twitterthreshold.setModel = function(threshold) {
		$('#volumeTwitterUserFailMessage').hide();
		$('#volumeTwitterUserSuccessMessage').hide();
		$('#denominatorTwitterUserSuccessMessage').hide();
		$('#denominatorTwitterUserFailMessage').hide();
		$('#percentageTwitterUserFailMessage').hide();
		$('#percentageTwitterUserSuccessMessage').hide();
		 twitterthreshold.followName.fromFollower=threshold.fromFollower;
         twitterthreshold.followName.twitterUserScreenName=threshold.twitterUserScreenName;
		twitterthreshold.thresholdId.val(threshold.id);
		twitterthreshold.thresholdName.val(threshold.name).attr('disabled',false);
		
		var pic = threshold.icon;
		
		var cls;
		switch(pic){
			case "univmap_tw_purp-tri.png":
				cls = 'b-univmap-tw-purp';
				break;
			case "univmap_tw_orng-star.png":
				cls = 'b-univmap-tw-orng';
				break;
			case "univmap_tw_grn-circ.png":
				cls='b-univmap-tw-grn';
				break;
			case "univmap_tw_blu-dia.png":
				cls='b-univmap-tw-blu';
				break;
			default:
				cls='b-univmap-tw-red';
		}
		
		if(!$('#select_map dt a').hasClass(cls)){
			$('#select_map dt a').removeClass();
			$('#select_map dt a').addClass('left ' + cls);
			$('#select_map dt a').attr('clazz',cls);
		}
	
		var keywords = '';
		if(threshold.keywords){
			$.each(threshold.keywords, function(index, item) {
				keywords += item + ',';
			});
			keywords = keywords.substring(0, keywords.length - 1);
			
			
		}
		var hashtags = '';
		if(threshold.hashtags){
			$.each(threshold.hashtags, function(index, item) {
				hashtags += item + ',';
			});
			hashtags = hashtags.substring(0, hashtags.length - 1);
			
		}
		
		if(threshold.denominatorField==null){
			$("#volumePanel").attr('style','display:block;');
			$("#percentagePanel").attr('style','display:none;');
			$("#twitterTab").find('a').eq(0).addClass('mouse_out');
			$("#twitterTab").find('a').eq(1).removeClass('mouse_out');
			if(keywords!=''){
				twitterthreshold.keywordsText.val(keywords);
				twitterthreshold.keywordsText.removeAttr('disabled');
				
				$('#keywordsTextCheckbox').attr('checked','checked');
				$('#keywordsText').rules("add", { required: true});
			}
			
			if(threshold.fromFollower!=0){
				twitterthreshold.followName.val('@'+threshold.twitterUserScreenName);
				twitterthreshold.followName.removeAttr('disabled');
				$('#followNameCheckbox').attr('checked','checked');
			}
			twitterthreshold.twitterThresholdAmountText.val(threshold.amount);
			if(hashtags!=''){
				twitterthreshold.hashtagsText.val(hashtags);
				twitterthreshold.hashtagsText.removeAttr('disabled');
				$('#hashtagsTextCheckbox').attr('checked','checked');
			}
			
			if(threshold.region!=null && threshold.region.geoAddress){
				$('#radiusTextCheckbox').attr('checked','checked');
				twitterthreshold.radiusText.val(threshold.region.radius);
				twitterthreshold.radiusText.removeAttr('disabled');
				twitterthreshold.geoUnitSelect.attr('value',
						threshold.region.distanceUnit);
				twitterthreshold.locationText.val(threshold.region.geoAddress.addressLine+","+threshold.region.geoAddress.country);
				twitterthreshold.locationText.removeAttr('disabled');
				twitterthreshold.locationText.selectGeoAddress=threshold.region.geoAddress;
				twitterthreshold.geoAddressText.val(threshold.region.geoAddress.adminDistrict+" "+threshold.region.geoAddress.adminDistrict2+" "+threshold.region.geoAddress.country);
			}
			
			
			twitterthreshold.timeText.val(threshold.duration);
			twitterthreshold.timeUnitSelect.attr('value', threshold.unit);
			
			
		}else{
			$("#volumePanel").attr('style','display:none;');
			$("#percentagePanel").attr('style','display:block;');
			$('#denominatorSelect').val(threshold.denominatorField);
			twitterthreshold.twitterThresholdPercentageSelect.val(threshold.percentage);
			if(threshold.denominatorField=='hashtags'){
				//denominator is hashtag
				$('#denominatorText').val(hashtags).addClass('prefixHashtagsText').removeClass('prefixfollowName').removeClass('validateTwitterUser');
				$('#hashtagsTextPercentageTr').attr('style','display:none;');
				$('#followNamePercentTr').removeAttr('style');
				
				$('#followNamePercentage').removeAttr('disabled');
				if(threshold.twitterUserScreenName.length>0){
					$('#followNamePercentageCheckbox').attr('checked','checked');
					twitterthreshold.followNamePercentage.attr('disabled',false);
				}
				else{
					twitterthreshold.followNamePercentage.attr('disabled',true);
				}
				twitterthreshold.followNamePercentage.val(threshold.twitterUserScreenName.length==0?'':'@'+threshold.twitterUserScreenName).addClass('prefixfollowName').addClass('validateTwitterUser').removeClass('prefixHashtagsText');
			}else{
				//denominator is user
				$('#denominatorText').val('@'+threshold.twitterUserScreenName).addClass('prefixfollowName').addClass('validateTwitterUser').removeClass('prefixHashtagsText');
				$('#followNamePercentTr').attr('style','display:none;');
				if(hashtags.length!=0){
					$('#hashtagsTextPercentageTr').removeAttr('style');
					$('#hashtagsTextPercentageCheckbox').attr('checked','checked');
					$('#hashtagsTextPercentage').removeAttr('disabled'); 
				}
				twitterthreshold.hashtagsTextPercentage.val(hashtags).addClass('prefixHashtagsText').removeClass('prefixfollowName').removeClass('validateTwitterUser');
			}
			
			$("#twitterTab").find('a').eq(1).addClass('mouse_out');
			$("#twitterTab").find('a').eq(0).removeClass('mouse_out');
			if(keywords!=''){
				twitterthreshold.keywordsTextPercentage.val(keywords);
				twitterthreshold.keywordsTextPercentage.removeAttr('disabled');
				$('#keywordsTextPercentageCheckbox').attr('checked','checked');
			}
			
			twitterthreshold.timeTextPercentage.val(threshold.duration);
			twitterthreshold.timeUnitSelectPercentage.attr('value', threshold.unit);
			
			if(threshold.region && threshold.region.geoAddress){
				$('#radiusTextPercentageCheckbox').attr('checked','checked');
				twitterthreshold.locationTextPercentage.val(threshold.region.geoAddress.addressLine+","+threshold.region.geoAddress.country);
				twitterthreshold.locationTextPercentage.removeAttr('disabled');
				twitterthreshold.locationTextPercentage.selectGeoAddress=threshold.region.geoAddress;
				twitterthreshold.geoAddressTextPercentage.val(threshold.region.geoAddress.adminDistrict+" "+threshold.region.geoAddress.adminDistrict2+" "+threshold.region.geoAddress.country);
				twitterthreshold.geoUnitSelectPercentage.attr('value',threshold.region.distanceUnit);
				twitterthreshold.radiusTextPercentage.val(threshold.region.radius);
				twitterthreshold.radiusTextPercentage.removeAttr('disabled');
			}
			
		}
		
		$('#addTwitterThresholdButton').show();
		twitterthreshold.thresholdTitle.text('Edit ' + threshold.name);
		if (threshold.event !== null && threshold.event.length != 0) {
			twitterthreshold.startEventCheckbox.attr('checked', true).attr(
					'disabled', false);
			twitterthreshold.statrtEventText.attr('value', threshold.event).attr(
					'disabled', false);
			twitterthreshold.statrtEventText.rules("add", {
                required : true
            });
		}else{
			twitterthreshold.startEventCheckbox.attr('checked', false);
			twitterthreshold.statrtEventText.attr('value', '').attr(
					'disabled', true);
			twitterthreshold.statrtEventText.removeData().rules("remove");
			
		}
		
		if(threshold.sendingBroadcastEnabled){
			
			var selectBroadcastIds = threshold.broadcastTemplateIds;
			if (selectBroadcastIds.length != 0){
				EB_Common.Ajax.post(
						"/twitterThreshold/searchSelectedBroadCastList",
						{
							ids : selectBroadcastIds,
							time:new Date()
						},
						function(data) {
							if (data.status != "yes") {
								EB_Common.ToolPrompt.show(button.data.buttonId,i18n[data.status]);
							} else {
								var broadcastTemplates = data.broadcastTemplate;
								var broadCastTemplateContent = '';
								$.each( broadcastTemplates,
    										function(index, item) {
    											if(item!=null && item.message!=null){
    												broadCastTemplateContent += "<li><a href='javascript:void(0);' title='Remove' class='icn_trash_16' onclick='twitterthreshold.removeBroadCastTemplate(this);' id='"
    													+ item.id
    													+ "'/>"
    													+ item.message.title
    													+ "</li>";
    											}
    											
    										});
								$('#broadcatTemplates2').html(
										broadCastTemplateContent);
								$('#broadcatTemplates2 :checkbox')
										.each(
												function() {
													var id = $(this).attr("id");
													$(this).attr("checked",
															false).attr(
															'disabled', false);
													for ( var count = 0; count < selectBroadcastIds.length; count++) {
														if (id == selectBroadcastIds[count]) {
															$(this).attr(
																	"checked",
																	true);
															break;
														}
													}
												});
							}
						}, "json");
			}
			
			$("#launchBroadcastTwitter").attr('checked','checked');
			$(".toggleHidden").removeAttr("style");
		}else{
			$("#launchBroadcastTwitter").removeAttr('checked');
			$(".toggleHidden").attr("style","display:none;");
			var spans=$('#statrtEventText').removeClass('error').parent().find('span');
			$.each(spans,function(index,item){
				var error = $(item).hasClass('error-right');
				if(error){
					$(item).empty();
				}
			});
		}
		
		
	};
	
	
	twitterthreshold.removeBroadCastTemplate = function(obj) {
		
		$(obj).parent().remove();
		if($('#broadcatTemplates2').find("li").length == 0){
			//$('#broadcatTemplates2').parent().find('span.error-right').removeAttr('style');
			$('#broadCastTempletes').valid();
		}
		
	};
	
	
	twitterthreshold.searchedCheckboxClicked = function(obj) {
		//$('#broadcatTemplates2').parent().find('span.error-right').hide();
		
		var id = $(obj).attr('id');
		var name = $(obj).parent().text();
		var selectBroadcastTemplateIds = new Array();
		$('#broadcatTemplates2 a').each(function() {
			var bcid = $(this).attr("id");
			selectBroadcastTemplateIds.push(bcid);
		});
		if($.inArray(id,selectBroadcastTemplateIds)==-1){
			var conditionContent = $('#broadcatTemplates2').html()+"<li><a href='javascript:void(0);' title='Remove' class='icn_trash_16' onclick='twitterthreshold.removeBroadCastTemplate(this);' id='"
				+ id
				+ "'></a>"
				+ name
				+ "</li>";
			$('#broadcatTemplates2').html(conditionContent);
		}
		$('#broadCastTempletes').valid();
	};
	

	twitterthreshold.initBroadcastTemplate = function(e) {

		var title = $.trim($('#searchBroadCastTempleteText').val());
		if (title.length == 0)
			return;
		EB_Common.Ajax.get(
						"/twitterThreshold/searchBroadCastList",
						{
							title : title,
							time:new Date()
						},
						function(data) {
							if (data.status != "yes") {
								EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
							} else {
								var broadcastTemplates = data.broadcastTemplate;
								var broadCastTemplateContent = '';
								$
										.each(
												broadcastTemplates,
												function(index, item) {
												    if(item!=null && item.message!=null){
														broadCastTemplateContent += "<li><a href='javascript:void(0);' title='Add' class='icn_addLink_12' onclick='twitterthreshold.searchedCheckboxClicked(this);' id='"
															+ item.id
															+ "'></a>"
															+ item.message.title
															+ "</li>";
													}
													
												});
								$('#broadcatTemplatesTw').html(broadCastTemplateContent);
							}
						}, "json");

	};

	view.twitterthreshold = twitterthreshold;
})(EB_View);