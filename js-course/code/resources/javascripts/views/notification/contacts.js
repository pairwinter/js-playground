(function(view) {
    var treeObj = null;
    var individualJQgridOptions = {
        autoencode : true,
        emptyDataCaption : i18n['global.grid.emptyDataCaption'],
        mtype : "get",
        jsonReader : {
            root : "data",
            postData : {
                quicksearchvalue : ""
            },
            page : "currentPageNo",
            total : "totalPageCount",
            records : "totalCount",
            repeatitems : false
        },
        height : 240,
        width : 500,
        colNames : [ i18n['contact.field.firstName'], i18n['contact.field.middleInitial'],
                i18n['contact.field.lastName'],i18n['contact.field.suffix'], i18n['contact.field.externalId'], "" ],
        colModel : [ {
            name : 'firstName',
            index : 'firstName',
            width : 80
        }, {
            name : 'middleInitial',
            index : 'middleInitial',
            width : 90
        }, {
            name : 'lastName',
            index : 'lastName',
            width : 70
        },{
            name : 'suffix',
            index : 'suffix',
            width : 50
        }, {
            name : 'externalId',
            index : 'externalId',
            width : 90
        }, {
            name : 'id',
            index : 'id',
            width : 80,
            hidden : true
        } ],
        sortname : 'id',
        sortorder : 'asc',
        viewrecords : false,
        pager : "#individual_gridPager",
        multiselect : true,
        rowNum : 10,
        rowList : [ 10 ],
        prmNames : {
            page : "pageNo", //
            totalrows : "totalrows" //
        },
        onSelectAll : function(rowIds, status) {
            $(rowIds).each(function(index, rowId) {
                syncCheckedIndividuals(status, $("#individual_gridTable").getRowData(rowId));
            })
        },
        onSelectRow : function(rowId, status) {
            syncCheckedIndividuals(status, $("#individual_gridTable").getRowData(rowId));
        },
        loadComplete : function() {
            syncToGrid("select_contact", "individual_gridTable", "cb_individual_gridTable");
        }
    };
    view.contacts = function() {
    }
    view.contacts.initialize = function() {
        $("#search").click(function() {
            if ($("#type_individual").attr("checked") == "checked") {
                var quicksearchvalue = $("#quicksearchvalue").val();
                $("#individual_gridTable").jqGrid('setGridParam', {
                    url : EB_Common.Ajax.wrapperUrl("/bcTemplates/contacts/contact"),
                    datatype : "json",
                    mtype : 'GET',
                    postData : {
                        quicksearchvalue : quicksearchvalue
                    }
                }).trigger("reloadGrid");
            }
            if ($("#type_filter").attr("checked") == "checked") {
                var searchvalue = $("#quicksearchvalue").val();
                $("#rule_gridTable").jqGrid('setGridParam', {
                    postData : {
                        searchvalue : searchvalue
                    }
                }).trigger("reloadGrid");
            }
            if ($("#type_group").attr("checked") == "checked") {
                var searchvalue = $("#quicksearchvalue").val();
                searchTree(searchvalue);
            }
        });
        EB_Common.logger.log("searchForm size"+$("#searchForm").length);
        EB_Common.validation.validate("searchForm");
        $('#forAdvanceSearch').click(function() {
            $('#advancedsearch_div').toggle();
        });

        $("#close_adv_btn").click(function() {
            $('#advancedsearch_div').hide();
        })

        $("#contacts_del_btn").click(function() {
            syncBackGrid("select_contact", "individual_gridTable", "cb_individual_gridTable");
        })

        $("#rules_del_btn").click(function() {
            syncBackGrid("select_filter", "rule_gridTable", "cb_rule_gridTable");
        })

        $("#groups_del_btn").click(function() {
            var treeNodes = treeObj.getCheckedNodes(true);
            $("#select_group option:selected").each(function() {
                var id = $(this).val();
                if (treeNodes && treeNodes.length > 0) {
                    for ( var i = 0; i < treeNodes.length; i++) {
                        var treeNode = treeNodes[i];
                        if (treeNode.id == id) {
                            treeObj.checkNode(treeNode, false, true, true);
                        }
                    }
                }
            });
        })

        $("input[name^='contactType']").click(function() {
            switchContactsSrc($(this).val());
        });

        $("#rule_gridTable").jqGrid({
            autoencode:true,
            url : EB_Common.Ajax.wrapperUrl("/bcTemplates/contacts/filter"),
            datatype : "json",
            emptyDataCaption : i18n['global.grid.emptyDataCaption'],
            jsonReader : {
                root : "data",
                page : "currentPageNo",
                total : "totalPageCount",
                records : "totalCount",
                repeatitems : false
            },
            height : 280,
            width : 500,
            rowNum : 10,
            rowList : [ 10 ],
            colNames : [ 'Rules name', '' ],
            colModel : [ {
                name : 'name',
                index : 'name',
                width : 80
            }, {
                name : 'id',
                index : 'id',
                width : 80,
                hidden : true
            } ],
            sortname : 'id',
            sortorder : 'asc',
            viewrecords : true,
            pager : "#rule_gridPager",
            multiselect : true,
            prmNames : {
                page : "pageNo", // 
                totalrows : "totalrows" //
            },
            onSelectAll : function(rowIds, status) {
                $(rowIds).each(function(index, rowId) {
                    syncCheckedRules(status, $("#rule_gridTable").getRowData(rowId));
                })
            },
            onSelectRow : function(rowId, status) {
                syncCheckedRules(status, $("#rule_gridTable").getRowData(rowId));
            },
            loadComplete : function() {
                syncToGrid("select_filter", "rule_gridTable", "cb_rule_gridTable");
            }
        });
        $("#individual_gridTable").jqGrid($.extend({
            url : EB_Common.Ajax.wrapperUrl("/bcTemplates/contacts/contact"),
            datatype : "json"
        }, individualJQgridOptions));
        // load groups tree
        loadGroups();
    }

    view.contacts.advancedSearch = function(conditionsArr) {
        $("#individual_gridTable").jqGrid('setGridParam', {
            url : EB_Common.Ajax.wrapperUrl("/contacts/json"),
            datatype : 'json',
            mtype : 'POST',
            postData : {
                filterRules : conditionsArr
            }
        }).trigger("reloadGrid");
    }

    function switchContactsSrc(type) {
        if (type == 1) {
            $("#select_contact_src").show();
            $("#select_group_src").hide();
            $("#select_filter_src").hide();
        } else if (type == 2) {
            $("#select_contact_src").hide();
            $("#select_group_src").show();
            $("#select_filter_src").hide();
        } else {
            $("#select_contact_src").hide();
            $("#select_group_src").hide();
            $("#select_filter_src").show();
        }
    }

    function syncCheckedRules(checked, filter) {
        if (checked && filter.name) {
            if ($('#select_filter option[value="' + filter.id + '"]').length == 0) {
                $('#select_filter').append("<option value='" + filter.id + "'>" + filter.name + "</option>");
            }
        } else {
            $("#select_filter option[value='" + filter.id + "']").remove();
        }
    }

    function syncCheckedIndividuals(checked, contact) {
        if (checked && contact.firstName) {
            if ($("#select_contact option[value='" + contact.id + "']").length == 0) {
                $('#select_contact').append(
                        "<option value='" + contact.id + "'>" + contact.firstName + " " + contact.middleInitial + " "
                                + contact.lastName + "(" + contact.externalId + ")" + "</option>");
            }
        } else {
            $("#select_contact option[value='" + contact.id + "']").remove();
        }
    }

    function syncBackGrid(selectFieldId, gridId, allChBoxId) {
        // remove selected contacts
        $("#" + selectFieldId + " option:selected").each(function() {
            var option = $(this);
            // sync to data grid
            var unchecked = false;
            $("#" + gridId).find("input[type='checkbox']").each(function() {
                var names = $(this).attr("name").split("_");
                var contact = $("#" + gridId).getRowData(names[names.length - 1]);
                if (contact.id == option.val()) {
                    $(this).removeAttr("checked");
                    unchecked = true;
                }
            })
            if (unchecked) {
                $("#" + allChBoxId).removeAttr("checked");
            }
            option.remove();
        })
    }

    function syncToGrid(selectFieldId, gridId, allChBoxId) {
        // sync to data grid
        var checkedCount = 0;
        var childChboxes = $("#" + gridId).find("input[type='checkbox']");
        childChboxes.each(function() {
            var chbox = $(this);
            var names = chbox.attr("name").split("_");
            var contact = $("#" + gridId).getRowData(names[names.length - 1]);
            $("#" + selectFieldId + " option").each(function() {
                if (contact.id == $(this).val()) {
                    chbox.attr("checked", "checked");
                    checkedCount++;
                }
            });
        })
        if (checkedCount == childChboxes.length && childChboxes.length > 0) {
            $("#" + allChBoxId).attr("checked", "checked");
        }
    }

    function loadGroups() {
        var setting = {
            check : {
                enable : true,
                chkStyle : "checkbox",
                chkboxType : {
                    "Y" : "s",
                    "N" : "ps"
                }
            },
            data : {
                keep : {
                    leaf : false,
                    parent : false
                },
                key : {
                    checked : "checked",
                    children : "groups",
                    name : "name",
                    id : "id",
                    title : ""
                }
            },
            edit : {
                enable : false,
                drag : {
                    isCopy : false,
                    isMove : true
                }
            },
            view : {
                selectedMulti : true,
                autoExpand : true
            },
            callback : {
                onCheck : function(event, treeId, treeNode) {
                    syncCheckedGroups();
                }
            }
        };
        var selectedGroupIds = $('#selectedGroupIds').val();
        EB_Common.Ajax.get("/contacts/groups/tree/json", {"selectedGroupIds":selectedGroupIds}, function(data) {
            var rootNode = {
                id : -1,
                name : "All Contact Groups",
                groups : data,
                open : true
            };
            treeObj = $.fn.zTree.init($("#groupsTree"), setting, rootNode);
        }, 'json');
    }

    function syncCheckedGroups() {
        $('#select_group').empty();
        var treeNode = treeObj.getCheckedNodes(true);
        if (treeNode && treeNode.length > 0) {
            for ( var i = 0; i < treeNode.length; i++) {
                if (!treeNode[i].getCheckStatus().half && treeNode[i].id != -1) {
                    $('#select_group').append(
                            "<option value='" + treeNode[i].id + "'>" + treeNode[i].name + "</option>");
                }
            }
        }
    }
    function searchTree(str) {
        var nodes = treeObj.transformToArray(treeObj.getNodesByParamFuzzy("name", str, null));
        for ( var i = 0; i < nodes.length; i++) {
            treeObj.selectNode(nodes[i]);
            treeObj.expandNode(nodes[i], true, true, false);
        }
    }
})(EB_View.notifications);