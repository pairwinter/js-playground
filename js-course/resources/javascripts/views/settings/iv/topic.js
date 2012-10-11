(function(view) {
	topicNameSpace = {};

	// private method
	function init() {
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

		$('#addBtn').click(
				function() {
					var formPanel = $('#formPanel'), title = formPanel
							.find('.b-panel-title .title');
					formPanel.show();
					if (formPanel.hasClass("edit")) {
						title.text('Add New');
					}
				}).click(
				function() {
					var value = topicNameSpace.topicIdText.val();
					if (value.length != 0) {
						EB_Common.dialog.confirm('would you cancel edit data?',
								'alert', function() {
									$(this).dialog("close");
									cleanEditPanel();
								});
					}
				});

		topicNameSpace.topicGrid = $('#topicTable');
		topicNameSpace.topicGrid.find('tbody tr td b.b-grid-status').click(
				function() {
					var status = $(this);
					if (status.hasClass('off')) {
						status.removeClass('off');
					} else {
						status.addClass('off');
					}
				});

		topicNameSpace.topicGrid.find('tbody tr td a.icon_edit').click(
				function() {
					var formPanel = $('#formPanel'), title = formPanel
							.find('.b-panel-title .title');
					formPanel.show();
					formPanel.addClass("edit");
					title.text('Edit Threshold');
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

	}

	function initTable() {
		topicNameSpace.topicGrid
				.jqGrid({
					url : EB_Common.Ajax.wrapperUrl('/topic/listTopics'),
					height : "auto",
					datatype : 'json',
					emptyDataCaption : 'global.grid.emptyDataCaption',
					autowidth : true,
					colNames : [ '', 'Title', 'mandatory', 'Subscribeable',
							'Category', 'Status', '' ],
					colModel : [
							{
								width : 5
							},
							{
								name : 'title',
								index : 'title'
							},
							{
								name : 'mandatory',
								index : 'mandatory',
								editable : false,
								formatter : "checkbox",
								formatoptions : {
									disabled : true
								}
							},
							{
								name : 'subscribeable',
								index : 'subscribeable',
								editable : false,
								formatter : "checkbox",
								formatoptions : {
									disabled : true
								}
							},
							{
								name : 'category',
								index : 'category'
							},
							{
								name : 'topicStatus',
								index : 'topicStatus',
								sortable : false,
								formatter : topicNameSpace.statusRender
							},
							{
								name : 'id',
								index : 'id',
								sortable : false,
								formatter : function(value, rec) {
									return '<span class="icn_edit_16" onclick="topicNameSpace.editTopic('
											+ value
											+ ');">&nbsp;</span><span class="icn_trash_16" onclick="return topicNameSpace.removeTopic('
											+ value + ');">&nbsp;</span>';
								}
							}

					],
					jsonReader : {
						root : "data",
						page : "currentPageNo",
						total : "totalPageCount",
						records : "totalCount",
						repeatitems : false
					}
				});
	}

	function initCacheElement() {
		topicNameSpace.topicTitle = $('#topicTitle');
		topicNameSpace.topicIdText = $('#topicId');
		topicNameSpace.weatherTypeCheckBoxs = $('input[type=checkbox][id^=weatherTypeCheckBox]');
		topicNameSpace.saveTopicButton = $('#saveTopic');
		topicNameSpace.topicCategory = $('#topicCategory');
		topicNameSpace.saveTopicButton.bind('click', saveTopic);
	}

	topicNameSpace.statusRender = function(value, rec) {
		var startDiv = '';
		if (value == "Active") {
			startDiv += '<b class="b-grid-status" onclick="topicNameSpace.formatUnit(this,'
					+ rec.rowId + ');"></b>';
		} else {
			startDiv += '<b class="b-grid-status off" onclick="topicNameSpace.formatUnit(this,'
					+ rec.rowId + ');"></b>';
		}
		return startDiv;
	};

	topicNameSpace.formatUnit = function(element, id) {
		var me = $(element);
		if (me.hasClass('off')) {
			$(element).removeClass('off');

		} else {
			$(element).addClass('off');
		}

		EB_Common.Ajax.post("/topic/modifyStatus", {
			topicId : id
		}, function(data) {
			if (data.status == "yes") {
				cleanEditPanel();
			} else {
				EB_Common.dialog.alert(data.status);
			}
		}, "json");
	};

	function saveTopic() {
		topic = {};
		topic.title = $.trim(topicNameSpace.topicTitle.val());
		if (topic.title.length == 0) {
			EB_Common.dialog.alert('please input topic title');
			topicNameSpace.topicTitle.focus();
			return;
		}
		topic.id = topicNameSpace.topicIdText.val();
		weatherServices = [];

		topic.mandatory = true;
		topic.subscribeable = true;
		topicNameSpace.weatherTypeCheckBoxs.each(function(index) {
			var checked = $(this).attr('checked');
			if (checked == 'checked') {
				weatherService = {};
				var id = $(this).attr('id');
				id = id.split('_');
				weatherService.id = id[1];
				weatherServices.push(weatherService);
			}
		});

		topic.topicCategory = {};
		topic.topicCategory.id = topicNameSpace.topicCategory.val();
		topic.weatherServices = weatherServices;
		EB_Common.Ajax.get('/topic/exists', {
			title : topic.title,
			topicId : topic.id
		}, function(data) {
			if (data.status != "yes") {
				EB_Common.dialog.alert(data.status);
			} else {
				var exists = data.exists;
				if (exists) {
					EB_Common.dialog.alert("the '" + topic.title
							+ "'is exists,please rename topic title");
					return;
				} else {
					sendSave(topic);
				}
			}
		});

	}

	function sendSave(topic) {
		EB_Common.Ajax.post("/topic/saveTopic", {
			topic : EB_Common.json.stringify(topic)
		}, function(data) {
			if (data.status != "yes") {
				EB_Common.dialog.alert(data.status);
			} else {
				EB_Common.dialog.alert('save success', 'save', function() {
					topicNameSpace.topicGrid.jqGrid("setGridParam", {
						url : EB_Common.Ajax.wrapperUrl("/topic/listTopics"),
						datatype : "json",
						mtype : 'get',
						loadError : function() {
							EB_Common.dialog.alert('load data error');
						}
					}).trigger("reloadGrid");
					cleanEditPanel();
				});
			}
		}, "json");
	}

	function cleanEditPanel() {
		topicNameSpace.topicTitle.val('').attr('disabled', false);
		topicNameSpace.topicIdText.val('');
		topicNameSpace.weatherTypeCheckBoxs.each(function() {
			$(this).attr('checked', false);
		});
		initTopicCategory();
	}

	topicNameSpace.editTopic = function(value) {
		EB_Common.Ajax.get("/topic/getTopic", {
			topicId : value
		}, function(data) {
			if (data.status == "yes") {
				var topic = data.topic;
				repaintEditPanel(topic);
			} else {
				EB_Common.dialog.alert(data.status);
			}
		}, "json");
	};

	topicNameSpace.removeTopic = function(value) {
		EB_Common.dialog.confirm('global.threshold.deletemessage',
				'global.threshold.delete.comfirmtitle', function() {
					$(this).dialog("close");
					var selectRowId = topicNameSpace.topicGrid.jqGrid(
							'getGridParam', 'selrow');
					EB_Common.Ajax.post("/topic/removeTopic", {
						topicId : value
					}, function(data) {
						if (data.status != "yes") {
							EB_Common.dialog.alert(data.status);
						} else {
							topicNameSpace.topicGrid.jqGrid('delRowData',
									selectRowId);
							cleanEditPanel();
						}
					}, "json");
				});
	};

	function initTopicCategory(callback1) {
		EB_Common.Ajax
				.get(
						"/topic/listTopicCategory",
						{},
						function(data) {
							if (data.status == "yes") {
								var topicCategories = data.topicCategories;
								topicNameSpace.topicCategory.empty();
								topicNameSpace.topicCategory.listTopicCategory = topicCategories;
								for ( var count = 0; count < topicCategories.length; count++) {
									var option = '<option value='
											+ topicCategories[count].id + '>'
											+ topicCategories[count].name
											+ '</option>';
									topicNameSpace.topicCategory.append(option);
								}
								if (callback1 && typeof callback1 == "function") {
									callback1.call(this);
								}
							} else {
								EB_Common.dialog.alert(data.status);
							}
						}, "json");
	}
	;

	function repaintEditPanel(topic) {
		topicNameSpace.topicTitle.val(topic.title).attr('disabled', false);
		topicNameSpace.topicIdText.val(topic.id);

		var weatherServices = topic.weatherServices;
		topicNameSpace.weatherTypeCheckBoxs.each(function() {
			var id = $(this).attr('id');
			id = id.split("_");
			for ( var count = 0; count < weatherServices.length; count++) {
				if (weatherServices[count].id == id[1]) {
					$(this).attr('checked', true);
					break;
				}
			}
		});
		initTopicCategory(function() {
			topicNameSpace.topicCategory.attr('value', topic.topicCategory.id);
		});
	}

	topicNameSpace.initPage = function() {
		init();
		initTable();
		initCacheElement();
		initTopicCategory();
	};

	view.topic = topicNameSpace;

})(EB_View);
