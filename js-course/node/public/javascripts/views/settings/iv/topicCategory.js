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
					url : EB_Common.Ajax
							.wrapperUrl('/topicCategory/listTopicCategorys'),
					height : "auto",
					datatype : 'json',
					emptyDataCaption : 'global.grid.emptyDataCaption',
					autowidth : true,
					colNames : [ '', 'name', 'type', '' ],
					colModel : [
							{
								width : 5
							},
							{
								name : 'name',
								index : 'name'
							},
							{
								name : 'type',
								index : 'type'
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
		topicNameSpace.topicGrid = $('#topicTable');
		topicNameSpace.topicTitle = $('#topicTitle');
		topicNameSpace.topicIdText = $('#topicId');
		topicNameSpace.saveTopicButton = $('#saveTopic');
		topicNameSpace.topicCategory = $('#topicCategory');
		topicNameSpace.saveTopicButton.bind('click', saveTopicCategory);
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

	function saveTopicCategory() {
		topicCategory = {};
		topicCategory.name = $.trim(topicNameSpace.topicTitle.val());
		if (topicCategory.name.length == 0) {
			EB_Common.dialog.alert('please input topic title');
			topicNameSpace.topicTitle.focus();
			return;
		}
		topicCategory.id = topicNameSpace.topicIdText.val();
		topicCategory.type= topicNameSpace.topicCategory.val();
		EB_Common.Ajax.get('/topicCategory/exists', {
			name : topicCategory.name,
			topicCategoryId : topicCategory.id
		}, function(data) {
			if (data.status != "yes") {
				EB_Common.dialog.alert(data.status);
			} else {
				var exists = data.exists;
				if (exists) {
					EB_Common.dialog.alert("the '" + topicCategory.name
							+ "'is exists,please rename topic title");
					return;
				} else {
					sendSave(topicCategory);
				}
			}
		});

	}

	function sendSave(topicCategory) {
		EB_Common.Ajax.post("/topicCategory/saveTopicCategory", {
			topicCategory : EB_Common.json.stringify(topicCategory)
		}, function(data) {
			if (data.status != "yes") {
				EB_Common.dialog.alert(data.status);
			} else {
				EB_Common.dialog.alert('save success', 'save', function() {
					topicNameSpace.topicGrid.jqGrid("setGridParam", {
						url : EB_Common.Ajax.wrapperUrl("/topicCategory/listTopicCategorys"),
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
	}

	topicNameSpace.editTopic = function(value) {
		EB_Common.Ajax.get("/topicCategory/getTopicCategory", {
			topicCategoryId : value
		}, function(data) {
			if (data.status == "yes") {
				var topicCategory = data.topicCategory;
				repaintEditPanel(topicCategory);
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
					EB_Common.Ajax.post("/topicCategory/removeTopicCategory", {
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

	

	function repaintEditPanel(topic) {
		topicNameSpace.topicTitle.val(topic.name).attr('disabled', false);
		topicNameSpace.topicIdText.val(topic.id);
		topicNameSpace.topicCategory.attr('value', topic.type);
	}

	topicNameSpace.initPage = function() {
		initCacheElement();
		init();
		initTable();
	};

	view.topic = topicNameSpace;

})(EB_View);
