(function(view) {
    view.bcTemplates = function() {

    };
    view.bcTemplates.initialize = function() {
        $("#bc_grid_table")
                .jqGrid(
                        {
                            autoencode : true,
                            url : EB_Common.Ajax.wrapperUrl("/bcTemplates/list"),
                            datatype : "json",
                            emptyDataCaption : i18n['global.grid.emptyDataCaption'],
                            gridGetLength : true,
                            mtype : "post",
                            jsonReader : {
                                root : "data",
                                page : "currentPageNo",
                                total : "totalPageCount",
                                records : "totalCount",
                                repeatitems : false
                            },
                            height : "auto",
                            autowidth : true,
                            colNames : [ '', '', i18n['broadcasttemplate.field.messagetitle'],
                                    i18n['broadcasttemplate.field.type'], i18n['broadcasttemplate.field.category'],
                                    i18n['broadcasttemplate.field.createdate'],
                                    i18n['broadcasttemplate.field.createby'],
                                    i18n['broadcasttemplate.field.distribution'],
                                    i18n['broadcasttemplate.field.broadcastoptions'],

                                    '' ],
                            colModel : [
                                    {
                                        width : 40,
                                        colGetLength : false,
                                        name : 'id',
                                        index : 'id',
                                        align : "center",
                                        formatter : function(value, rec, row) {
                                            if (row.integral) {
                                                return '<input class="bcChbox" name="broadcasttemplateid" type="checkbox" value="'
                                                        + row.id + '">';
                                            } else {
                                                return '<input title="'
                                                        + i18n['messagetemplate.text.disabled']
                                                        + '" class="bcChbox" name="broadcasttemplateid" type="checkbox" disabled="disabled" value="'
                                                        + row.id + '">';
                                            }
                                        }
                                    },
                                    {
                                        name : 'priority',
                                        index : 'priority',
                                        colGetLength : false,
                                        sorttype : "string",
                                        width : 20,
                                        sortable : false,
                                        formatter : function(value, rec, row) {
                                            if (row.priority == 'Priority') {
                                                return '<i class="icn_priority_hover_16"></i>';
                                            } else {
                                                return '';
                                            }
                                        }
                                    },
                                    {
                                        name : 'title',
                                        index : 'messageTitle',
                                        sorttype : "string",
                                        width : 220,
                                        formatter : function(value, rec, row) {
                                            if (row.message)
                                                return $.jgrid.htmlEncode(row.message.title);
                                            return "";
                                        }
                                    },
                                    {
                                        name : 'type',
                                        index : 'type',
                                        sorttype : "string",
                                        width : 60
                                    },
                                    {
                                        name : 'category',
                                        index : 'category',
                                        sortable : false,
                                        formatter : function(value, rec, row) {
                                            return row.category ? $.jgrid.htmlEncode(row.category.name) : '';
                                        }
                                    },
                                    {
                                        width : 180,
                                        name : 'formattedCreateDate',
                                        index : 'createdDate',
                                        sorttype : "datetime",
                                        sortable : true
                                    },
                                    {
                                        name : 'createdName',
                                        index : 'createdName',
                                        sorttype : "string"
                                    },
                                    {
                                        name : 'contact_integral',
                                        index : 'contact_integral',
                                        colGetLength : false,
                                        sortable : false,
                                        width : 80,
                                        formatter : function(value, rec, row) {
                                            return row.broadcastContacts && row.broadcastContacts.integral ? '<i class="icn_yes_16"></i>'
                                                    : '<i class="icn_dbldash"></i>';
                                        }
                                    },
                                    {
                                        name : 'broadcastoption',
                                        index : 'broadcastoption',
                                        colGetLength : false,
                                        sortable : false,
                                        width : 60,
                                        formatter : function(value, rec, row) {
                                            return row.broadcastSettings && row.broadcastSettings.integral ? '<i class="icn_yes_16"></i>'
                                                    : '<i class="icn_dbldash"></i>';
                                        }
                                    },
                                    {
                                        width : 80,
                                        colGetLength : false,
                                        name : 'id',
                                        index : 'id',
                                        align : "center",
                                        sortable : false,
                                        formatter : function(value, rec, row) {
                                            return '<a href="javascript:void(' + row.id + ')" title="'
                                                    + i18n['button.update']
                                                    + '" class="icn_edit_16 bc_edit_btn"></a><a href="javascript:void('
                                                    + row.id + ')" class="icn_trash_16 bc_del_btn" title="'
                                                    + i18n['button.delete'] + '"> </a>';
                                        }
                                    } ],
                            sortname : 'createdDate',
                            sortorder : 'desc',
                            viewrecords : true,
                            pager : "#bc_grid_pager",
                            multiselect : false,
                            prmNames : {
                                page : "pageNo", // 
                                totalrows : "totalrows" //
                            },
                            loadComplete : function() {
                                $(".bc_edit_btn").click(function() {
                                    var bcId = $(this).attr("href").match(/\d+/)[0];
                                    EB_Common.Ajax.get('/bcTemplates/check/isUsedByThreshold/' + bcId, {}, function(data) {
                                        if(data.success) {
                                            window.location.href = EB_Common.Ajax.wrapperUrl("/bcTemplates/edit/" + bcId);
                                        } else {
                                            EB_Common.dialog.confirm(i18n["global.dialog.edit.confirm"]+"<br/>"+i18n["notification.title.bcReference"]+": "+data.message, 
                                                    i18n['global.dialog.title.confirm'], function() {
                                                $(this).dialog("close");
                                                window.location.href = EB_Common.Ajax.wrapperUrl("/bcTemplates/edit/" + bcId);
                                            })
                                        }
                                    });
                                });
                                $(".bc_del_btn").click(
                                        function() {
                                            var bcId = $(this).attr("href").match(/\d+/)[0];
                                            EB_Common.dialog.confirm(i18n['global.dialog.content.confirm'], i18n['global.dialog.title.confirm'],
                                                    function() {
                                                        $(this).dialog("close");
                                                        EB_Common.Ajax.get('/bcTemplates/check/isUsedByThreshold/' + bcId, {},
                                                            function(data) {
                                                                if (data.success) {
                                                                    // send delete request
                                                                    EB_Common.Ajax.remove('/bcTemplates/delete/' + bcId, {},
                                                                        function(data) {
                                                                            if (data.success) {
                                                                                view.reloadGrid("bc_grid_table");
                                                                            } else{
                                                                                EB_Common.dialog.alert(data.message);
                                                                            }
                                                                        })
                                                                }else{
                                                                    EB_Common.dialog.alert(i18n["notification.title.bcReference"]+ ": " +data.message);
                                                                }
                                                            })

                                                    });
                                        })
                            }

                        });
        view.listenSearch("bc_grid_table");
        $("#event").combobox({
            width : 165,
            autoFocus : true
        });

        $('#dialog').dialog({
            autoOpen : false,
            width : 625,
            height : "auto",
            modal : true,
            resizable : false,
            buttons : {
                Ok : {
                    click : function() {
                        var checkedBcs = $(".bcChbox:checked");
                        if (checkedBcs.length > 0) {
                            var bcIds = [];
                            checkedBcs.each(function() {
                                bcIds.push($(this).val());
                            });
                            EB_Common.Ajax.post('/bcTemplates/send', {
                                eventName : $("#eventName").val(),
                                bcIds : bcIds.join("|")
                            }, function(data) {
                                $('#dialog').dialog("close");
                                if (data.success) {
                                    EB_View.notifications.refreshCounter();
                                    $("#ui-tabs-3").click();
                                }
                            }, 'json');
                        }
                    },
                    'class' : 'orange',
                    text : i18n['button.send']
                },
                Cancel : {
                    click : function() {
                        $(this).dialog("close");
                    },
                    'class' : 'gray',
                    text : i18n['global.dialog.button.cancel']
                }

            }

        });
        $("#dialog_link").unbind();
        $('#dialog_link').click(function() {
            if ($(".bcChbox:checked").length > 0) {
                $('#dialog').dialog('open');
            } else {
                $('#errMessage').html(i18n['broadcasttemplate.text.errmessage']);
            }

            return false;
        });

    };
})(EB_View.notifications);