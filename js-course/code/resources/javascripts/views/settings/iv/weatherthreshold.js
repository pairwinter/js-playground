(function(view) {
    weatherThreshold = {};

    weatherThreshold.init = function() {
        weatherThreshold.initPage();
        weatherThreshold.initAddThresholdButton();
        weatherThreshold.initWeatherWarningTypes();
        weatherThreshold.initConditions();
        weatherThreshold.bindWarningTypeComboEvent();
        weatherThreshold.getUsedAndRemainingThresholds();
        weatherThreshold.getActiveAndInActiveThresholds();
        weatherThreshold.initValidationRules();
        $('#thresholdsTable')
                .jqGrid(
                        {
                            autoencode : true,
                            url : EB_Common.Ajax.wrapperUrl('/weatherThreshold/listThresholds'),
                            height : 175,
                            datatype : 'json',
                            emptyDataCaption : i18n['global.grid.emptyDataCaption'],
                            autowidth : true,
                            colNames : [ '', i18n['weatherthreshold.field.thresholdname'],
                                    i18n['weatherthreshold.field.category'], i18n['weatherthreshold.field.condition'],
                                    i18n['weatherthreshold.field.notification'], i18n['global.status'], '' ],
                            colModel : [
                                    {
                                        width : 5
                                    },
                                    {
                                        name : 'name',
                                        index : 'name'
                                    },
                                    {
                                        name : 'weatherServiceId',
                                        index : 'weatherServiceId',
                                        width : 100,
                                        formatter : weatherThreshold.renderWarningType
                                    },
                                    {
                                        name : 'actions',
                                        index : 'actions',
                                        sortable : false,
                                        formatter : weatherThreshold.renderConditions
                                    },
                                    {
                                        name : 'notificationTitleContent',
                                        index : 'notificationTitleContent',
                                        sortable : false
                                    },
                                    {
                                        name : 'thresholdStatus',
                                        index : 'thresholdStatus',
                                        editable : true,
                                        formatter : weatherThreshold.statusRender
                                    },
                                    {
                                        name : 'id',
                                        index : 'id',
                                        sortable : false,
                                        width : 60,
                                        formatter : function(value, rec) {
                                            return '<a class="icn_edit_16" title="Edit" onclick="weatherThreshold.bindCurrentThresholdTableEditEvent('
                                                    + value
                                                    + ',this);" href="javascript:void(0);"></a>&nbsp;<a class="icn_trash_16" title="Delete" onclick="return weatherThreshold.bindCurrentThresholdTableRemoveEvent('
                                                    + value + ');" href="javascript:void(0);"></a>';
                                        }
                                    }

                            ],
                            rowNum : "totalCount",
                            jsonReader : {
                                root : "data",
                                page : "currentPageNo",
                                total : "totalPageCount",
                                records : "totalCount",
                                repeatitems : false
                            },
                            gridComplete : function() {
                                var recs = $("#thresholdsTable").getGridParam("records");
                                if (recs == 0) {
                                    var me = $('#gridPanel').find('.icon_tabpanel_expand');
                                    var container = me.parent().next();
                                    me.addClass('collapsed');
                                    container.hide();
                                } else {
                                    var me2 = $('#gridPanel').find('.icon_tabpanel_expand');
                                    var container2 = me2.parent().next();
                                    me2.removeClass('collapsed');
                                    container2.show();
                                }
                            }
                        });
        $('#thresholdSaveButton').bind('click', weatherThreshold.bindSaveThreshold);
        $('#launchBroadcast').bind('click', weatherThreshold.checklaunchBroadcast);

        Array.prototype.in_array = function(e) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == e)
                    return true;
            }
            return false;
        };
    };
    
    
    function initTable(){ $('#thresholdsTable')
        .jqGrid(
                {
                    autoencode : true,
                    url : EB_Common.Ajax.wrapperUrl('/weatherThreshold/listThresholds'),
                    height : 175,
                    datatype : 'json',
                    emptyDataCaption : i18n['global.grid.emptyDataCaption'],
                    autowidth : true,
                    colNames : [ '', i18n['weatherthreshold.field.thresholdname'],
                            i18n['weatherthreshold.field.category'], i18n['weatherthreshold.field.condition'],
                            i18n['weatherthreshold.field.notification'], i18n['global.status'], '' ],
                    colModel : [
                            {
                                width : 5
                            },
                            {
                                name : 'name',
                                index : 'name'
                            },
                            {
                                name : 'weatherServiceId',
                                index : 'weatherServiceId',
                                width : 100,
                                formatter : weatherThreshold.renderWarningType
                            },
                            {
                                name : 'actions',
                                index : 'actions',
                                sortable : false,
                                formatter : weatherThreshold.renderConditions
                            },
                            {
                                name : 'notificationTitleContent',
                                index : 'notificationTitleContent',
                                sortable : false
                            },
                            {
                                name : 'thresholdStatus',
                                index : 'thresholdStatus',
                                editable : true,
                                formatter : weatherThreshold.statusRender
                            },
                            {
                                name : 'id',
                                index : 'id',
                                sortable : false,
                                width : 60,
                                formatter : function(value, rec) {
                                    return '<a class="icn_edit_16" title="Edit" onclick="weatherThreshold.bindCurrentThresholdTableEditEvent('
                                            + value
                                            + ',this);" href="javascript:void(0);"></a>&nbsp;<a class="icn_trash_16" title="Delete" onclick="return weatherThreshold.bindCurrentThresholdTableRemoveEvent('
                                            + value + ');" href="javascript:void(0);"></a>';
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
                        var recs = $("#thresholdsTable").getGridParam("records");
                        if (recs == 0) {
                            var me = $('#gridPanel').find('.icon_tabpanel_expand');
                            var container = me.parent().next();
                            me.addClass('collapsed');
                            container.hide();
                        } else {
                            var me2 = $('#gridPanel').find('.icon_tabpanel_expand');
                            var container2 = me2.parent().next();
                            me2.removeClass('collapsed');
                            container2.show();
                        }
                    }
                });
    $('#thresholdSaveButton').bind('click', weatherThreshold.bindSaveThreshold);
    $('#launchBroadcast').bind('click', weatherThreshold.checklaunchBroadcast);
    
    };

    weatherThreshold.initValidationRules = function() {
        $.validator.addMethod('atLeastOneBroadCastTemplete', function(value, ele) {
            return $('#broadcatTemplates2').find("li").length >= 1;
        }, i18n['twitterthreshold.customer.validatemessage.selectbroadcasttemplate']);

        $.validator.addMethod('atLeastOneCondition', function(value, ele) {
            return $('#condition').find("input:checked").length >= 1;
        }, i18n['weatherthreshold.customer.validatemessage.selectcondition']);

        var pattern = /^[0-9]{5}((-)?[0-9]{4})?$/;
        $.validator.addMethod('postalcode', function(value, ele) {
            if (value == '')
                return true;
            return pattern.test(value);
        }, i18n['weatherthreshold.customer.validatemessage.postalcode']);
        
        $.validator.addMethod('searchForGeoAddress',function(value,element){
            return !(/[\[\]\!\@\$\%\^\&\*\?\<\>\\\:]/.test(value));
        },i18n['global.valid.text.addressInfo']);

    };

    weatherThreshold.initAddThresholdButton = function() {
        $('#addBtn').click(
                function() {
                    var value = $('#thresholdId').val();
                    if (value.length != 0) {
                        EB_Common.dialog.confirm(i18n['weatherthreshold.dialog.canceleditdata'],
                                i18n['global.dialog.title.confirm'], function() {
                                    $(this).dialog("close");
                                    weatherThreshold.cleanEditPanel();
                                });
                    }

                });
    };

    weatherThreshold.bindStatrtEvent = function() {
        var checked = $("#statrtEvent").attr('checked');
        if (checked == 'checked') {
            $('#statrtEventText').removeAttr('disabled');
            $('#statrtEventText').rules("add", {
                required : true
            });
        } else {
            $('#statrtEventText').attr('disabled', true).val('');
            $('#statrtEventText').val('').removeData().rules("remove");
            $('#statrtEventText').valid();
        }
    };

    weatherThreshold.initPage = function() {

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
                    var formPanel = $('#formPanel'), title = formPanel.find('.b-panel-title .title');
                    formPanel.show();
                    if (formPanel.hasClass("edit")) {
                        title.text('Add New');
                    }
                });

        var weatherGrid = $('#thresholdsTable');
        weatherGrid.find('tbody tr td b.b-grid-status').click(function() {
            var status = $(this);
            if (status.hasClass('off')) {
                status.removeClass('off');
            } else {
                status.addClass('off');
            }
        });

        weatherGrid.find('tbody tr td a.icon_edit').click(
                function() {
                    var formPanel = $('#formPanel'), title = formPanel.find('.b-panel-title .title'), form = formPanel
                            .find('form');
                    formPanel.show();
                    form[0].reset();
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

        $('#searchBroadCastTempleteButton').click(function(e) {
            e.preventDefault();
            weatherThreshold.initBroadcastTemplate();
        });

        $('#statrtEvent').bind('click', weatherThreshold.bindStatrtEvent);

        $('#addWeatherThresholdForm').validate({
            rules : {
                'thresholdTemplateName' : {
                    required : true,
                    maxlength : 120,
                    remote : {
                        url : 'weatherThreshold/exists',
                        type : "POST",
                        data : {
                            thresholdName : function() {
                                return $.trim($("#thresholdTemplateName").val());
                            },
                            thresholdId : function() {
                                return $('#thresholdId').val();
                            }
                        }
                    }
                }
            },
            messages : {
                'thresholdTemplateName' : {
                    remote : i18n['weatherthreshold.error.name.duplicate']
                }
            },
            submitHandler : function(form) {
                weatherThreshold.saveThreshold();
            }
        });

    };

    weatherThreshold.initBroadcastTemplate = function(e) {

        var title = $.trim($('#searchBroadCastTempleteText').val());
        if (title.length == 0)
            return;

        EB_Common.Ajax
                .get(
                        "/weatherThreshold/searchBroadCastList",
                        {
                            title : title
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
                                                    if(item!=null && item.message!=null) {
                                                        broadCastTemplateContent += "<li><a href='javascript:void(0);' title='Add' class='icn_addLink_12' onclick='weatherThreshold.searchedCheckboxClicked(this);' id='"
                                                                + item.id + "'></a>" + item.message.title + "</li>";
                                                    }

                                                });
                                $('#broadcatTemplates').html(broadCastTemplateContent);
                            }
                        }, "json");

    };

    weatherThreshold.renderCountry = function(value, rec) {
        var text = 'Albania';
        return text;
    };

    weatherThreshold.renderWarningType = function(value, rec, rowObject) {
        var text = '';
        $('select[name="weatherWarningType"] option').each(function() {
            if ($(this).val() == value) {
                text = $(this).text();
                return false;
            }
        });
        return text;
    };

    weatherThreshold.renderConditions = function(value, rec) {
        var conditionsContent = '';
        var arr = new Array();
        for ( var count = 0; count < value.length; count++) {
            var conditionName = i18n[("weatherthreshold.condition." + value[count])];
            if (!arr.in_array(conditionName)) {
                arr.push(conditionName);
                conditionsContent += conditionName + "/";
            }
        }
        return conditionsContent.substring(0, conditionsContent.length - 1);
    };

    weatherThreshold.statusRender = function(value, rec) {
        var startDiv = '';
        if (value == "Active") {
            startDiv += '<b class="b-grid-status" onclick="weatherThreshold.formatUnit(this,' + rec.rowId + ');"></b>';
        } else {
            startDiv += '<b class="b-grid-status off" onclick="weatherThreshold.formatUnit(this,' + rec.rowId
                    + ');"></b>';
        }
        return startDiv;
    };

    weatherThreshold.formatUnit = function(element, id) {
        var me = $(element);

        EB_Common.Ajax.post("/weatherThreshold/modifyStatus", {
            thresholdId : id
        }, function(data) {
            if (data.status == "yes") {
                if (me.hasClass('off')) {
                    $(element).removeClass('off');

                } else {
                    $(element).addClass('off');
                }
                weatherThreshold.cleanEditPanel();
                weatherThreshold.getActiveAndInActiveThresholds();
            } else {
                EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
            }
        }, "json");

    };

    getColumnIndexByName = function(columnName) {
        var cm = $('#thresholdsTable').jqGrid('getGridParam', 'colModel'), i = 0, l = cm.length;
        for (; i < l; i++) {
            if (cm[i].name === columnName) {
                return i;
            }
        }
        return -1;
    };

    weatherThreshold.bindCurrentThresholdTableEditEvent = function(value, elem) {
        EB_Common.Ajax.post("/weatherThreshold/changeThresholdStatusToInactive", {
            thresholdId : value
        }, function(data) {
            if (data.status == "yes") {
                var indexOfStatus = getColumnIndexByName('thresholdStatus');
                var indexOfId = getColumnIndexByName('id');
                var idComponents = $("tbody > tr.jqgrow > td:nth-child(" + (indexOfId + 1) + ") > a.icn_edit_16");
                var statusComponents = $("tbody > tr.jqgrow > td:nth-child(" + (indexOfStatus + 1)
                        + ") > b.b-grid-status");
                var rowIndex = idComponents.index(elem);
                var statusComponent = statusComponents.get(rowIndex);
                EB_Common.Ajax.post("/weatherThreshold/getThreshold", {
                    thresholdId : value
                }, function(data) {
                    if (data.status == "yes") {
                        $(statusComponent).addClass('off');
                        var threshold = data.threshold;
                        weatherThreshold.repaintEditPanel(threshold);
                        weatherThreshold.getActiveAndInActiveThresholds();
                        if ($('#wt_tabpanel_expand_add').hasClass('collapsed')) {
                            $('#wt_tabpanel_expand_add').click();
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

    weatherThreshold.cleanEditPanel = function() {
        $('#thresholdTemplateName').val('').removeData().attr('disabled', false);

        $('#thresholdId').val('');
        $('select[name="weatherWarningType"]').get(0).selectedIndex = 0;
        $('#condition').html('');
        weatherThreshold.initConditions();
        $('#statrtEventText').attr('disabled', true).val('');
        $('#statrtEventText').val('').removeData().rules("remove");
        $('#statrtEventText').valid();
        $('#statrtEvent').removeAttr('checked');
        $('#launchBroadcast').removeAttr('checked');
        $('#broadcatTemplates').html('');
        $('#broadcatTemplates2').html('');
        $('#searchBroadCastTempleteText').val('');
        $(".toggleHidden").attr("style", "display:none");
        $('#addNewTab').html(i18n['weatherthreshold.text.addweatherthreshold']);
        $("#address_div").html('');

        $("#addNewAddress").click();
        $('#addBtn').hide();

    };

    weatherThreshold.repaintEditPanel = function(threshold) {

        
        $('#addBtn').show();
        $('#addNewTab').text('Edit ' + threshold.name);
        $('#thresholdTemplateName').val(threshold.name).attr('disabled', false);
        $('#thresholdId').val(threshold.id);
        $('select[name="weatherWarningType"]').attr("value", threshold.weatherServiceId).attr('disabled', false);
        var conditions = threshold.actions;
        $('#condition').find('input[type=checkbox]').each(function() {
            var text = $(this).attr("name");
            $(this).attr("checked", false).attr('disabled', false);
            for ( var count = 0; count < conditions.length; count++) {
                if (text == conditions[count]) {
                    $(this).attr("checked", true);
                    break;
                }
            }
        });
        $('#sendDashboardAlert').attr('checked', threshold.alertTriggered);
        var selectBroadcastIds = threshold.broadcastTemplateIds;
        $("#broadcatTemplates").html('');
        weatherThreshold.clearlaunchBroadcast();
        if (threshold.sendingBroadcastEnabled) {
            if (threshold.event !== null && threshold.event.length != 0) {
                $('#statrtEvent').attr('checked', true);
                $('#statrtEventText').removeAttr('disabled');
                $('#statrtEventText').rules("add", {
                    required : true
                });
                $('#statrtEventText').attr('value', threshold.event);
            } else {
                $('#statrtEventText').attr('disabled', true).val('');
                $('#statrtEventText').val('').removeData().rules("remove");
                $('#statrtEventText').valid();
            }
            $('#launchBroadcast').attr('checked', true);
            $(".toggleHidden").removeAttr("style");
        } else {
            $('#launchBroadcast').attr('checked', false);
        }

        thresholdAddresses = threshold.thresholdAddresses;

        if (thresholdAddresses.length != 0) {
            $("#address_div").html('');
            $.each(thresholdAddresses, function(index, item) {
                var newTable = $("#clone_tb div:first").clone(true, true);
                $(newTable).find('input[name="address[x].locationName"]').val(item.locationName);
                $(newTable).find('input[name="address[x].streetAddress"]').val(item.streetAddress);
                $(newTable).find('input[name="address[x].suite"]').val(item.suite);
                $(newTable).find('input[name="address[x].city"]').val(item.city);
                $(newTable).find('input[name="address[x].state"]').val(item.state);
                $(newTable).find('input[name="address[x].postalCode"]').val(item.postalCode);
                $(newTable).find('select[name="address[x].country"]').attr("value", item.country);

                $(newTable).find('input[name="address[x].gisLocation.lon"]').val(item.gisLocation.lon);
                $(newTable).find('input[name="address[x].gisLocation.lat"]').val(item.gisLocation.lat);
                var select = newTable.find("select[name='address[x].country']");
                var options = $("#selectCountries_select > option").clone();
                select.append(options);
                $("#address_div").append(newTable);
                if (index > 0) {
                    $('<strong class="orAddress">or the address</strong>').insertBefore(newTable);
                }
                $(newTable).find(".tr_geo_location").show();

            });
            if (thresholdAddresses.length < 5) {
                $("#add_adress_btn").show();
            } else {
                $("#add_adress_btn").hide();
            }
        }

        if (selectBroadcastIds.length == 0)
            return;
        EB_Common.Ajax
                .post(
                        "/weatherThreshold/searchSelectedBroadCastList",
                        {
                            ids : selectBroadcastIds
                        },
                        function(data) {
                            if (data.status != "yes") {
                                EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
                            } else {
                                var broadcastTemplates = data.broadcastTemplate;
                                var broadCastTemplateContent = '';
                                $.each(broadcastTemplates,
                                        function(index, item) {
                                                if(item!=null && item.message!=null){
                                                broadCastTemplateContent += "<li><a href='javascript:void(0);' title='Remove' class='icn_trash_16' onclick='weatherThreshold.removeBroadCastTemplate(this);' id='"
                                                    + item.id + "'/>" + item.message.title + "</li>";
                                            }
                                        });
                                $('#broadcatTemplates2').html(broadCastTemplateContent);
                                $('#broadcatTemplates2 :checkbox').each(function() {
                                    var id = $(this).attr("id");
                                    $(this).attr("checked", false).attr('disabled', false);
                                    for ( var count = 0; count < selectBroadcastIds.length; count++) {
                                        if (id == selectBroadcastIds[count]) {
                                            $(this).attr("checked", true);
                                            break;
                                        }
                                    }
                                });
                            }
                        }, "json");
    };

    weatherThreshold.bindCurrentThresholdTableRemoveEvent = function(value) {
        EB_Common.dialog.confirm(i18n['global.threshold.deletemessage'], i18n['global.threshold.delete.comfirmtitle'],
                function() {
                    $(this).dialog("close");
                    EB_Common.Ajax.post("/weatherThreshold/removeThresholds", {
                        thresholdId : value
                    }, function(data) {
                        if (data.status != "yes") {
                            EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
                        } else {
                            $("#thresholdsTable").jqGrid("setGridParam", {
                                loadComplete : function() {
                                    weatherThreshold.getActiveAndInActiveThresholds();
                                    weatherThreshold.cleanEditPanel();
                                }
                            }).trigger("reloadGrid");
                        }
                    }, "json");
                });
    };

    weatherThreshold.setSelectText = function(el, text) {
        var count = $(el).find('option').length;
        for ( var i = 0; i < count; i++) {
            if ($(el).get(0).options[i].text == text) {
                $(el).get(0).options[i].selected = true;
                $(el).attr('disabled', false);
                break;
            }
        }
    };

    weatherThreshold.bindSelectBoradcastTemplateTableRemoveEvent = function() {
        var selectBroadcastTemplateTable = $('#selectBroadcastTemplate');
        var selectRowId = selectBroadcastTemplateTable.jqGrid('getGridParam', 'selrow');
        if (selectRowId == null)
            return null;
        var rowData = selectBroadcastTemplateTable.jqGrid('getRowData', selectRowId);
        var broadcastTemplateTable = $('#broadcatTemplates');
        broadcastTemplateTable.jqGrid('addRowData', rowData.id, {
            id : rowData.id,
            category : rowData.category
        });
        selectBroadcastTemplateTable.jqGrid('delRowData', selectRowId);
    };

    weatherThreshold.bindBoradcastTemplateTableDoubleClick = function(rowid, iRow, iCol, e) {
        var broadcastTemplateTable = $('#broadcatTemplates');
        var rowData = broadcastTemplateTable.jqGrid('getRowData', rowid);
        var selectBroadcastTemplateTable = $('#selectBroadcastTemplate');
        var rowDatas = selectBroadcastTemplateTable.jqGrid('getRowData');
        if (rowDatas.length == 0) {
            broadcastTemplateTable.jqGrid('delRowData', rowid);
            $('#selectBroadcastTemplate').jqGrid('addRowData', rowData.id, rowData);
            return;
        }
        for ( var count = 0; count < rowDatas.length; count++) {
            if (rowDatas[count].id == rowData.id) {
                broadcastTemplateTable.jqGrid('delRowData', rowid);
                break;
            } else {
                broadcastTemplateTable.jqGrid('delRowData', rowid);
                $('#selectBroadcastTemplate').jqGrid('addRowData', rowData.id, rowData);
                break;
            }
        }

    };

    weatherThreshold.bindWarningTypeComboEvent = function() {
        $('select[name="weatherWarningType"]').change(function() {
            var value = $(this).children('option:selected').val();
            if (value == 'none') {
                $("#condition :checkbox").each(function() {
                    $(this).attr('disabled', true).attr('checked', false);
                });
            } else {
                $("#condition :checkbox").each(function() {
                    $(this).attr('disabled', false);
                });
            }
        });
    };

    weatherThreshold.getUsedAndRemainingThresholds = function() {
        EB_Common.Ajax.post("/weatherThreshold/getUsedAndRemainingThresholdNumber", function(data) {
            if (data.status != "yes") {
                EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
            } else {
                $('#usedAndRemainingLabel').text(
                        data.usedThresholdNumber + ' Used / ' + data.remainingThresholdNumber + ' Remaining');
            }
        }, "json");
    };

    weatherThreshold.getActiveAndInActiveThresholds = function() {
        EB_Common.Ajax.post("/weatherThreshold/getActiveAndInActiveThresholdNumber", function(data) {
            if (data.status != "yes") {
                EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
            } else {
                if (data.activeThresholdNumber == 0 && data.inactiveThresholdNumber == 0) {
                    $('#currentThresholdDiv').html('').append('<label>you do not any current thresholds</label>');
                }
                $('#activeAndInActiveLabel').text(
                        data.activeThresholdNumber + ' ' + i18n["weatherthreshold.text.active"] + ' / '
                                + data.inactiveThresholdNumber + ' ' + i18n["weatherthreshold.text.inactive"]);
            }
        }, "json");
    };

    weatherThreshold.initWeatherWarningTypes = function() {
        EB_Common.Ajax.post("/weatherThreshold/listWeatherWarningTypes", function(data) {
            if (data.status != "yes") {
                EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
            } else {
                var weatherWarningTypeCombo = $('select[name="weatherWarningType"]');
                var weatherServices = data.weatherServices;
                for ( var count = 0; count < weatherServices.length; count++) {
                    var warningType = weatherServices[count].weatherType;
                    if (warningType == null || warningType == undefined) {
                        continue;
                    }
                    $("<option value='" + weatherServices[count].id + "'>" + warningType.name + "</option>").appendTo(
                            weatherWarningTypeCombo);
                }
            }
        }, "json");
    };
    weatherThreshold.checkboxClicked = function(obj) {
        $('#conditions').valid();
//        if ($(obj).attr('checked')) {
//            $('#condition').parent().find('span.error-right').hide();
//        } else if ($('#condition').find("input:checked").length == 0) {
//            $('#condition').parent().find('span.error-right').removeAttr('style');
//        }

    };
    weatherThreshold.removeBroadCastTemplate = function(obj) {
        $(obj).parent().remove();
        if ($('#broadcatTemplates2').find("li").length == 0) {
            $('#broadCastTempletes').valid();
        }

    };
    weatherThreshold.searchedCheckboxClicked = function(obj) {
        //$('#broadcatTemplates2').parent().find('span.error-right').hide();
        var id = $(obj).attr('id');
        var name = $(obj).parent().text();
        var selectBroadcastTemplateIds = new Array();
        $('#broadcatTemplates2 a').each(function() {
            var id = $(this).attr("id");
            selectBroadcastTemplateIds.push(id);
        });
        if (!selectBroadcastTemplateIds.in_array(id)) {
            var conditionContent = $('#broadcatTemplates2').html()
                    + "<li><a href='javascript:void(0);' title='Remove' class='icn_trash_16' onclick='weatherThreshold.removeBroadCastTemplate(this);' id='"
                    + id + "'></a>" + name + "</li>";
            $('#broadcatTemplates2').html(conditionContent);
        }
        $('#broadCastTempletes').valid();
    };
    weatherThreshold.initConditions = function() {
        EB_Common.Ajax
                .get(
                        "/weatherThreshold/searchEventAction",
                        function(data) {
                            if (data.status != "yes") {
                                EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
                            } else {
                                var eventActions = data.eventActions;
                                var conditionContent = '';
                                var arr = new Array();
                                for ( var count = 0; count < eventActions.length; count++) {
                                    var option = eventActions[count];
                                    var optionName = i18n["weatherthreshold.condition." + option.id];
                                    if (!arr.in_array(optionName)) {
                                        arr.push(optionName);
                                        conditionContent += "<li><input type='checkbox' disabled='true' onclick='weatherThreshold.checkboxClicked(this);' name="
                                                + option.id + ">" + optionName + "</input></li>";
                                    }
                                }
                                $('#condition').html(conditionContent);
                            }
                        }, "json");
    };

    weatherThreshold.checklaunchBroadcast = function(event) {
        var checked = $(this).attr('checked');
        if (checked == 'checked') {
            $('#broadcatTemplates :checkbox').each(function() {
                $(this).attr('disabled', false);
            });
            $('#statrtEventText').attr('disabled', false);
            $('#statrtEventText').rules("add", {
                required : true
            });
            $('#statrtEvent').attr('checked', true);
            $(".toggleHidden").removeAttr("style");

        } else {
            $('#broadcatTemplates :checkbox').each(function() {
                $(this).attr('disabled', true);
            });
            $("#searchBroadCastTempleteText").val('');
            $('#statrtEventText').attr('disabled', true);
            $('#statrtEventText').removeData().rules("remove");
            $('#statrtEventText').valid();
            $('#statrtEvent').removeAttr('checked');
            $(".toggleHidden").attr("style", "display:none");

        }
    };

    weatherThreshold.clearlaunchBroadcast = function(event) {
        $('#broadcatTemplates :checkbox').each(function() {
            $(this).attr('disabled', true);
        });
        $("#searchBroadCastTempleteText").val('');
        $('#statrtEventText').attr('disabled', true).val('');
        $('#statrtEventText').val('').removeData().rules("remove");
        $('#statrtEventText').valid();
        $('#statrtEvent').removeAttr('checked');
        $(".toggleHidden").attr("style", "display:none");

    };

    weatherThreshold.bindSaveThreshold = function() {
        $('#addWeatherThresholdForm').submit();

        // reset Leave Page State
        EB_Common.LeavePage.resetState();
    };

    weatherThreshold.saveThreshold = function() {
        var thresholdName = $('#thresholdTemplateName').val();
        var selectConditions = new Array();
        $("#condition li :checked").each(function() {
            var text = $(this).attr("name");
            selectConditions.push(text);
        });
        var threshold = {};
        var selectBroadcastTemplateIds = new Array();
        $('#broadcatTemplates2 a').each(function() {
            var id = $(this).attr("id");
            selectBroadcastTemplateIds.push(id);
        });
        threshold.weatherServiceId = $('select[name="weatherWarningType"]').find("option:selected").val();

        threshold.name = thresholdName;
        if ($("#launchBroadcast").attr('checked')) {
            threshold.sendingBroadcastEnabled = true;
            if ($("#statrtEvent").attr('checked')) {
                threshold.event = $('#statrtEventText').val();
            } else {
                threshold.event = "";

            }
            threshold.broadcastTemplateIds = selectBroadcastTemplateIds;

        } else {
            threshold.sendingBroadcastEnabled = false;
            threshold.event = "";
            threshold.broadcastTemplateIds = [];
        }

        var sendDashboardAlert = $('#sendDashboardAlert').attr('checked');

        if (sendDashboardAlert == undefined) {
            threshold.alertTriggered = false;
        } else {
            threshold.alertTriggered = true;
        }

        threshold.actions = selectConditions;
        thresholdAddresses = [];
        $('#address_div .subdiv_graybox .table_infor').each(function(item) {
            thresholdAddress = {};
            thresholdAddress.locationName = $(this).find('input[name="address[x].locationName"]').val();
            thresholdAddress.streetAddress = $(this).find('input[name="address[x].streetAddress"]').val();
            thresholdAddress.suite = $(this).find('input[name="address[x].suite"]').val();
            thresholdAddress.city = $(this).find('input[name="address[x].city"]').val();
            thresholdAddress.state = $(this).find('input[name="address[x].state"]').val();
            thresholdAddress.postalCode = $(this).find('input[name="address[x].postalCode"]').val();
            thresholdAddress.country = "United States";
            thresholdAddress.gisLocation = {};
            thresholdAddress.gisLocation.lon = $(this).find('input[name="address[x].gisLocation.lon"]').val();
            thresholdAddress.gisLocation.lat = $(this).find('input[name="address[x].gisLocation.lat"]').val();

            thresholdAddresses.push(thresholdAddress);
        });
        threshold.thresholdAddresses = thresholdAddresses;
        threshold.id = $('#thresholdId').val();
        weatherThreshold.sendSave(threshold);
    };

    weatherThreshold.sendSave = function(threshold) {
        EB_Common.Ajax.post('/weatherThreshold/saveThresholds', {
            threshold : EB_Common.json.stringify(threshold)
        }, function(data) {
            if (data.status != "yes") {
                EB_Common.dialog.alert(i18n[data.status],i18n['dialog.title.warning']);
            } else {
                $('#thresholdId').val('');
                $('#thresholdsTable').jqGrid("setGridParam", {
                    url : EB_Common.Ajax.wrapperUrl("/weatherThreshold/listThresholds"),
                    datatype : "json",
                    emptyDataCaption : i18n['global.grid.emptyDataCaption'],
                    mtype : 'get',
                    loadError : function() {
                        EB_Common.dialog.alert(i18n['dialog.title.warning'], 'load data error');
                    },
                    loadComplete : function() {
                        weatherThreshold.cleanEditPanel();
                        EB_Common.ToolPrompt.show('thresholdSaveButton', 'Save successfully');
                        weatherThreshold.getActiveAndInActiveThresholds();
                    }
                }).trigger("reloadGrid");

            }
        }, "json");
    };

    view.weatherThreshold = weatherThreshold;
})(EB_View);