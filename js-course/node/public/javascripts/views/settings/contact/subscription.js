(function(view) {
    topicNameSpace = {};
    var load = false;

    var addItems = function(e) {
        var id = $(e.target)[0].id;
        var containerId = '#itemsContainer_add';
        if (!$(containerId).is(':visible')) {
            $(containerId).show();
        }
        var htmlStr = '<input type="text" name="topicTitle" maxlength="40" class="input_long {required:true,maxlength:40}"/>'
                + '<input type="hidden" name="topicId" value="0" class="input_long"/>'
                + '<a class="icn_trash_16" href="javascript:void(0);" title="Delete"></a>'
        var action = $('<li class="liAdded"/>').html(htmlStr).appendTo(containerId);

        $('#itemsContainer_add').find('a.icn_trash_16').show();

        action.find('a').click(function() {
            if ($('#itemsContainer_add').find('a.icn_trash_16').size() <= 2) {
                $('#itemsContainer_add').find('a.icn_trash_16').hide();
            }
            $(this).closest('li').remove();
            if ($(containerId).children().length == 0) {
                $(containerId).hide();
            }

        });
    };

    var addItemsUpdate = function(e) {
        var id = $(e.target)[0].id;
        var containerId = '#itemsContainer';
        var htmlStr = '<input type="text" name="topicTitleUpdate" maxlength="40" class="input_long {required:true,maxlength:40}"/>'
                + '<input type="hidden" name="topicIdUpdate" value="0" class="input_long"/>'
                + '<a class="icn_trash_16" href="javascript:void(0);" title="Delete"></a>'
        var action = $('<li/>').html(htmlStr).appendTo(containerId);
        action.find('a').click(function() {
            if ($('#itemsContainer').find('a.icn_trash_16').size() <= 2) {
                $('#itemsContainer').find('a.icn_trash_16').hide();
            }
            $(this).closest('li').remove();
        });

        $('#itemsContainer').find('a.icn_trash_16').show();

    };

    var topicCategoryTypeChange = function(e) {
        $("#form_add_subscription .error-right").hide();
        $("#topicCategoryTitle").removeClass("error");
        if ($("#topicCategoryType").val() == "Weather") {
            $(".weatherService").show();
            $("#addItems_add_subscription").hide();
            $("#form_add_subscription .liAdded").remove();

        } else {
            $(".weatherService").hide();
            $('#itemsContainer_add')
                    .show()
                    .append(
                            '<li class="liAdded"><input type="text" name="topicTitle" maxlength="40" class="input_long {required:true,maxlength:40}"/>'
                                    + '<input type="hidden" name="topicId" value="0" class="input_long"/><a class="icn_trash_16" href="javascript:void(0);" style="display:none;" title="Delete"></a></li>');
            $("#addItems_add_subscription").show();
            $('#itemsContainer_add').find('a').click(function() {
                if ($('#itemsContainer_add').find('a.icn_trash_16').size() <= 2) {
                    $('#itemsContainer_add').find('a.icn_trash_16').hide();
                }
                $(this).closest('li').remove();
            });
        }
    };
    
    function init() {
        $('#addItems_add_subscription').die();
        $('#addItems_add_subscription').bind('click', addItems);
        $('#addItems_subscription').die();
        $('#addItems_subscription').live('click', addItemsUpdate);
        $("#topicCategoryType").die();
        $("#topicCategoryType").live('change', topicCategoryTypeChange);

        $('#addSubscription')
                .click(
                        function() {
                            var form_add_subscription = $('#form_add_subscription');
                            if (form_add_subscription.attr("style") != 'undefined') {
                                $('#form_add_subscription').removeAttr("style");
                                $("#topicCategoryType").val('');
                                $("#topicCategoryTitle").val('');
                                $(".weatherService").hide();
                                $('.liAdded').remove();
                                $('.error-right').hide();
                                $("#topicCategoryTitle").removeClass("error");
                                $('#itemsContainer_add')
                                        .show()
                                        .append(
                                                '<li class="liAdded"><input type="text" name="topicTitle" maxlength="40" class="input_long {required:true,maxlength:40}"/>'
                                                        + '<input type="hidden" name="topicId" value="0" class="input_long"/><a class="icn_trash_16" href="javascript:void(0);" style="display:none;" title="Delete"></a></li>');
                                $('#itemsContainer_add').find('a').click(function() {
                                    if ($('#itemsContainer_add').find('a.icn_trash_16').size() <= 2) {
                                        $('#itemsContainer_add').find('a.icn_trash_16').hide();
                                    }
                                    $(this).closest('li').remove();
                                });
                            }

                            $('#form_add_subscription').validate({
                                rules : {
                                    'topicCategoryTitle' : {
                                        required : true,
                                        maxlength : 40,
                                        remote : {
                                            url : 'topicCategory/exists',
                                            type : "POST",
                                            data : {
                                                name : function() {
                                                    return $.trim($("#topicCategoryTitle").val());
                                                },
                                                topicCategoryId : function() {
                                                    return $('#topicCategoryId').val();
                                                }
                                            }
                                        }
                                    },
                                    'topicTitle':{
                                        required : true,
                                        maxlength : 40,
                                        itemsduplicate:true
                                    }
                                },
                                messages : {
                                    'topicCategoryTitle' : {
                                        remote : i18n['setting.contact.subscriptionFields.name.duplicate']
                                    }
                                },
                                submitHandler : function(form) {
                                    saveTopicCategory();
                                }
                            });

                            $("#insertRow").remove();
                        });
        $('#cancel').click(function() {
            $('#form_add_subscription').attr("style", "display:none");
            $("#itemsContainer_add").remove;
        });
        $('.b-panel-bwrap .b-panel-title .icon_tabpanel_expand').click(function() {
            var me = $(this), container = me.parent().next();
            if (me.hasClass('collapsed')) {
                me.removeClass('collapsed');
                container.show();
            } else {
                me.addClass('collapsed');
                container.hide();
            }
        });

        $('#addBtn').click(function() {
            var formPanel = $('#formPanel'), title = formPanel.find('.b-panel-title .title');
            formPanel.show();
            if (formPanel.hasClass("edit")) {
                title.text('Add New');
            }
        }).click(function() {
            var value = topicNameSpace.topicCategoryIdText.val();
            if (value.length != 0) {
                EB_Common.dialog.confirm('would you cancel edit data?', 'alert', function() {
                    $(this).dialog("close");
                    cleanEditPanel();
                });
            }
        });

        topicNameSpace.topicGrid = $('#topicTable');
        topicNameSpace.topicGrid.find('tbody tr td b.b-grid-status').click(function() {
            var status = $(this);
            if (status.hasClass('off')) {
                status.removeClass('off');
            } else {
                status.addClass('off');
            }
        });

        topicNameSpace.topicGrid.find('tbody tr td a.icon_edit').click(function() {
            var formPanel = $('#formPanel'), title = formPanel.find('.b-panel-title .title');
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
                    autoencode : true,
                    url : EB_Common.Ajax.wrapperUrl('/topicCategory/listTopicCategorys'),
                    height : "auto",
                    datatype : 'json',
                    emptyDataCaption : i18n['global.grid.emptyDataCaption'],
                    autowidth : true,
                    colNames : [ i18n['setting.contact.subscriptionFields.name'],
                            i18n['setting.contact.subscriptionFields.topicCategoryType'], '' ],
                    colModel : [
                            {
                                name : 'name',
                                index : 'name',
                                sortable : false
                            },
                            {
                                name : 'type',
                                index : 'type',
                                sortable : false
                            },

                            {
                                name : 'id',
                                index : 'id',
                                sortable : false,
                                formatter : function(value, rec) {
                                    return '<span class="icn_trash_16" title="Delete" onclick="return topicNameSpace.removeTopicCategory(this,'
                                            + value + ',event);">&nbsp;</span>';
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
                    onSelectRow : function(id) {
                        $('#form_add_subscription').attr("style", "display:none");
                        var row = $("#" + id);

                        var updateForm;
                        if (row.next().attr('name') == 'insertRow') {
                            updateForm = row.next().remove();
                            return;
                        } else {
                            $("#insertRow").remove();
                            if (!load) {
                                load = true;
                                window.editGrid = $('#editGrid').clone(true);
                                $("#editGrid").remove();

                            }

                            var eg = window.editGrid;
                            var tr = $("<tr name='insertRow' id='insertRow' style='background:#FAECDF'><td colspan=4 style='border-bottom:1px solid #DDDDDD'></td></tr>");
                            tr.find("td").append(eg);
                            updateForm = tr.insertAfter(row);
                            $(eg).show();
                            initCacheElement();
                            $('#insertRow').find('span.error-right').hide();
                            $("#topicCategoryTitleUpdate").removeClass("error");
                            $('#updateForm').validate({
                                rules : {
                                    'name' : {
                                        required : true,
                                        maxlength : 40,
                                        remote : {
                                            url : 'topicCategory/exists',
                                            type : "POST",
                                            data : {
                                                name : function() {
                                                    return $.trim($("#topicCategoryTitleUpdate").val());
                                                },
                                                topicCategoryId : function() {
                                                    return $('#topicCategoryIdUpdate').val();
                                                }
                                            }
                                        }
                                    },
                                    'topicTitleUpdate':{
                                        required : true,
                                        maxlength : 40,
                                        itemsduplicate:true
                                    }
                                },
                                messages : {
                                    'name' : {
                                        remote : i18n['setting.contact.subscriptionFields.name.duplicate']
                                    }
                                },
                                submitHandler : function(form) {
                                    updateTopicCategory();
                                }
                            });

                        }
                        var name = row.find('td:eq(1)').text(), type = row.find('td:eq(2)').html();
                        updateForm.find('input[name="name"]').val(name);
                        updateForm.find('div tr:eq(1) td:eq(1)').html(type);
                        updateForm.find("#topicCategoryIdUpdate").val(id);
                        updateForm.find("#topicCategory").val(type);
                        // add this param to avoid explorer cache in microsoft ie
                        var d = new Date();
                        EB_Common.Ajax
                                .get(
                                        "/topicCategory/getTopicCategory",
                                        {
                                            topicCategoryId : id,
                                            time : d.getTime()
                                        },
                                        function(data) {
                                            if (data.status == "yes") {
                                                var topicCategory = data.topicCategory;
                                                var topics = topicCategory.topics;
                                                $('#itemsContainer').html('');
                                                if (type == "Weather") {
                                                    for ( var i = 0; i < topics.length; i++) {
                                                        var htmlStr = topics[i].title
                                                                + '<input type="hidden" class="input_long" value="'
                                                                + topics[i].title
                                                                + '"/>'
                                                                + '<input type="hidden" class="input_long" value="'
                                                                + topics[i].id + '"/>'
                                                        var action = $('<li/>').html(htmlStr).appendTo(
                                                                '#itemsContainer');
                                                    }
                                                    $("#addItems_subscription").hide();
                                                } else {
                                                    for ( var i = 0; i < topics.length; i++) {
                                                        var htmlStr = '<input type="text" name="topicTitleUpdate" maxlength="40" class="input_long {required:true,maxlength:40}" value="'
                                                                + topics[i].title
                                                                + '"/>'
                                                                + '<input name="topicIdUpdate" type="hidden" maxlength="40" class="input_long" value="'
                                                                + topics[i].id
                                                                + '"/>'
                                                                + '<a class="icn_trash_16" href="javascript:void(0);" title="'
                                                                + i18n['button.delete'] + '"></a>'
                                                        var action = $('<li/>').html(htmlStr).appendTo(
                                                                '#itemsContainer');
                                                        action.find('a').click(
                                                                function() {
                                                                    if ($('#itemsContainer').find('a.icn_trash_16')
                                                                            .size() <= 2) {
                                                                        $('#itemsContainer').find('a.icn_trash_16')
                                                                                .hide();
                                                                    }
                                                                    $(this).closest('li').remove();
                                                                });
                                                    }
                                                    if (topics.length <= 1) {
                                                        $('#itemsContainer').find('a.icn_trash_16').hide();
                                                    }
                                                    $("#addItems_subscription").show();
                                                }

                                            } else {
                                                EB_Common.dialog.alert(data.status);
                                            }
                                        }, "json");
                    }

                });
    }

    function initCacheElement() {
        topicNameSpace.topicCategoryTitle = $('#topicCategoryTitle');
        topicNameSpace.topicCategoryTitleUpdate = $('#topicCategoryTitleUpdate');
        topicNameSpace.topicCategoryIdText = $('#topicCategoryId');
        topicNameSpace.topicCategoryIdTextUpdate = $('#topicCategoryIdUpdate');
        topicNameSpace.saveTopicButton = $('#saveTopic');
        topicNameSpace.updateTopicButton = $('#updateSubscriptionField');
        topicNameSpace.topicTitle = $('#topicTitle');
        topicNameSpace.topicId = $('#topicId');

    }

    function saveTopicCategoryClicked() {
        $('#form_add_subscription').submit();
    }

    function saveTopicCategory() {
        topicCategory = {};
        topicCategory.topics = new Array();
        topicCategory.name = $.trim(topicNameSpace.topicCategoryTitle.val());
        topicCategory.id = '0';
        topicCategory.type = $("#topicCategoryType").val();
        var i = 0;

        $("input[name=topicTitle]").each(function() {
            var topicTitle = $(this).val();
            if (topicTitle != '') {
                topic = {};
                topic.title = topicTitle;
                topicCategory.topics[i] = topic;
                i++;
            }
        });

        sendSave(topicCategory);
    }

    function updateTopicCategoryClicked() {
        $("#updateForm").submit();
    }

    function updateTopicCategory() {
        topicCategory = {};
        topicCategory.topics = new Array();

        topicCategory.name = $.trim(topicNameSpace.topicCategoryTitleUpdate.val());
        topicCategory.id = topicNameSpace.topicCategoryIdTextUpdate.val();
        topicCategory.type = $("#topicCategory").val();
        var i = 0;
        $("input[name=topicTitleUpdate]").each(function() {
            var topicTitle = $(this).val();
            var topicId = $(this).next().val();
            if (topicTitle != '') {
                topic = {};
                topic.title = topicTitle;
                topic.id = topicId;
                topicCategory.topics[i] = topic;
                i++;
            }
        });
        sendSave(topicCategory);
    }

    function sendSave(topicCategory) {
        EB_Common.Ajax.post("/topicCategory/saveTopicCategory", {
            topicCategory : EB_Common.json.stringify(topicCategory)
        }, function(data) {
            if (data.status != "yes") {
                EB_Common.dialog.alert(i18n[data.status], i18n['dialog.title.warning']);
            } else {
                topicNameSpace.topicGrid.jqGrid("setGridParam", {
                    url : EB_Common.Ajax.wrapperUrl("/topicCategory/listTopicCategorys"),
                    datatype : "json",
                    mtype : 'get',
                    loadError : function() {
                        EB_Common.dialog.alert('load data error');
                    }
                }).trigger("reloadGrid");
                cleanEditPanel();

                if (topicCategory.type == "Weather") {
                    $("#weatherOption").remove();
                    $("#addItems_add_subscription").show();
                }
            }
        }, "json");
    }

    function cleanEditPanel() {
        topicNameSpace.topicCategoryTitle.val('').removeData().attr('disabled', false);
        topicNameSpace.topicCategoryIdText.val('');
        $("input[name=topicTitle]").val('');
        $("#form_add_subscription").hide();
    }

    topicNameSpace.editTopic = function(value) {
        EB_Common.Ajax.get("/topicCategory/getTopicCategory", {
            topicCategoryId : value
        }, function(data) {
            if (data.status == "yes") {
                var topicCategory = data.topicCategory;
            } else {
                EB_Common.dialog.alert(data.status);
            }
        }, "json");
    };

    topicNameSpace.removeTopicCategory = function(obj, value, e) {
        var tr = $(obj).parent().parent();
        EB_Common.dialog.confirm(i18n['setting.delete.subscriptionField'],
                i18n['global.threshold.delete.comfirmtitle'], function() {
                    $(this).dialog("close");
                    EB_Common.Ajax.post("/topicCategory/removeTopicCategory", {
                        topicCategoryId : value
                    }, function(data) {
                        if (data.status != "yes") {
                            EB_Common.dialog.alert(i18n[data.status], i18n['dialog.title.warning']);
                        } else {
                            if (tr.next().attr('name') == 'insertRow') {
                                tr.next().remove();
                            }

                            if (tr.find("td").eq(2).html() == 'Weather') {
                                $('<option id="weatherOption" value="Weather">Weather</option>').insertAfter(
                                        '#customizedOption');
                            }

                            tr.remove();
                            cleanEditPanel();

                        }
                    }, "json");
                });
        if (window.event) {
            window.event.cancelBubble = true;
        } else {
            e.stopPropagation();
        }
        
    };

    function repaintEditPanel(topic) {
        topicNameSpace.topicCategoryTitle.val(topic.name).attr('disabled', false);
        topicNameSpace.topicCategoryIdText.val(topic.id);
        topicNameSpace.topicCategory.attr('value', topic.type);
    }

    function initValidationRules() {
        $.validator.addMethod('itemsduplicate', function(value, element, param) {
            var values = {},
                inputs = $(element).closest('ul').find('input').not(element),
                lastRepeatValue = $(element).prop('lastRepeatValue'),
                repeatInputs = [];
            
            $(element).prop('lastRepeatValue', $.trim(value));
            inputs.each(function(index, element){
                values[$.trim($(this).val())] = true;
                if($.trim($(this).val()) == lastRepeatValue){
                    repeatInputs.push(element);
                }
            });
            // remove validation info
            if(lastRepeatValue != $.trim(value) && repeatInputs.length == 1){
               $(repeatInputs[0]).removeClass('error').next('label.error').remove();
            }
                
            if(values[$.trim(value)]){
                return false;
            }else{
                return true;
            }
            
        }, i18n['setting.contact.subscriptionFields.value.duplicate']);

    };

    topicNameSpace.initPage = function() {
        init();
        initTable();
        initCacheElement();
        $('#saveTopic').die();
        $('#saveTopic').live('click', saveTopicCategoryClicked);
        $('#updateSubscriptionField').die();
        $('#updateSubscriptionField').live('click', updateTopicCategoryClicked);
        $('#collapsedBtn').die();
        $('#collapsedBtn').live('click', function() {
            $("#insertRow").remove();
        });
        if (parseInt($("#weatherSubscriptionNum").val()) > 0) {
            $("#weatherOption").remove();
        }
        initValidationRules();
    };

    view.topic = topicNameSpace;

})(EB_View);