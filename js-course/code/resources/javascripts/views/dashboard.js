(function(view) {
    view.dashboard = function() {
    };

    var leftSortableOptions = {
        forcePlaceholderSize : true,
        placeholder : 'placeholder ui-widget-content',
        tolerance : 'pointer',
        helper : 'clone',
        opacity : '0.5',
        handle : '.dashboarditem-header',
        cancel : '.leftitems',
        start : function(event, ui) {
            var cloneitem = ui.item.clone().css("display", "block");
            cloneitem.insertAfter(ui.item);
            nowcloneitem = cloneitem;
        },
        stop : function(event, ui) {
            if (ui.item.parent().attr("id") == this.id) {
                ui.item.remove();
            } else {
                nowcloneitem.hide();
            }
        },
        connectWith : '.customize_column'
    }
    var rightSortableOptions = {
        forcePlaceholderSize : true,
        placeholder : 'customize_placeholder ui-widget-content',
        distance : 30,
        tolerance : 'pointer',
        opacity : '0.5',
        helper : 'clone',
        handle : '.dashboarditem-header',
        receive : function(event, ui) {
            receiveItem(event, ui, this);
        },
        beforeStart : function(event, ui) {
            store = $(".dashboarditem-content", ui.item).clone();
            $(".dashboarditem-content", ui.item).remove();
        },
        stop : function(event, ui) {
            // _cf_dashboard.stopItem(event, ui, this);
            // ui.item.append(store);
            sortColumnDiv(this);
        },
        connectWith : '.customize_column'
    };
    view.dashboard.initDashboard = function(maxRows) {
        view.dashboard.maxRows = maxRows;
        var nowcloneitem;
        var store = {};
        var sortEle = $(".customize_column").sortable(rightSortableOptions);
        $(".customize_leftcolumn").sortable(leftSortableOptions);
        $(".customize_leftcolumn").disableSelection();
        $("#customize_left").hide();

        $("#hideleft").bind("click", function() {
            $("#customize_left").hide();
            $("#showleft_div").show();
            $("#hideleft_div").hide();
        });
        $("#showleft").bind("click", function() {
            showLeft();
        });
        // load existed dashboarditem
        var interval = 1;
        $(".existeditem").each(function() {
            var container = $(".dashboarditem-container", $(this));
            var url = $(this).attr("data-url");
            setTimeout(function() {
                EB_Common.Ajax.get(url, {}, function(data) {
                    container.html(data);
                }, "html");
            }, interval * 100);
            interval++;
        });
        // add live listener of buttons
        $(".icn_close_16").live("click", function() {
            var itemDiv = $(this).parent().parent();
            var columnDiv = itemDiv.parent();
            moveBackToLeft(itemDiv);
            itemDiv.remove();
            sortColumnDiv(columnDiv);
        })

        // collapse/expand
        $(".extend-collapse").live("click", function() {
            var itemDiv = $(this).parent().parent();
            var container = $(".dashboarditem-content", itemDiv);
            if (container.is(":hidden")) {
                container.show();
                //itemDiv.css("height", itemDiv.attr("data-height") + "px");
                itemDiv.css("height", "100%");
                $(this).removeClass('icn_expand_16');
            } else {
                container.hide();
                itemDiv.css("height", "24px");
                $(this).addClass('icn_expand_16');
            }
        })

        // maximize/normalize
        $(".max-restore").live("click", function() {
            var itemDiv = $(this).parent().parent();
            var dashPanel = $("#customize_right");
            if (dashPanel.is(":hidden")) {
                $("#fullscreenDiv").empty();
                $("#fullscreenDiv").hide();
                dashPanel.show();
            } else {
                $("#fullscreenDiv").empty().show();
                dashPanel.hide();
                var data = {
                    id : "full_" + itemDiv.attr("data-item-id"),
                    url : itemDiv.attr("data-url"),
                    widgetType : itemDiv.attr("data-widget-type"),
                    widget : {
                        id : itemDiv.attr("data-widget-id"),
                        title : itemDiv.attr("data-widget-title"),
                        rowspan : itemDiv.attr("data-widget-rowspan"),
                        collapsible : false,
                        expandable : true,
                        deletable : false
                    }
                };
                var itemDiv = $.tmpl("dashboardItemTmpl", [ {
                    row : 0,
                    col : 0,
                    item : data
                } ]);
                itemDiv.find('.dashboarditem-header').css('cursor','auto');
                $("#fullscreenDiv").css("width", "100%").append(itemDiv);
                //itemDiv.appendTo("#fullscreenDiv").css("width", "100%");
                // TODO: add event listener to item div
                EB_Common.Ajax.get(data.url, {}, function(data) {
                    $(".dashboarditem-container", itemDiv).html(data);
                }, "html");
            }
        })

        // load item templates
        EB_Common.Ajax.get("/statics/tmpl/dashboard/leftItem.html", {}, function(data) {
            $.template("leftItemTmpl", data);
        }, "html");
        EB_Common.Ajax.get("/statics/tmpl/dashboard/dashboardItem.html", {}, function(data) {
            $.template("dashboardItemTmpl", data);
        }, "html");
    }

    function receiveItem(event, ui, columnDiv) {
        var t = this;
        if (ui.sender.hasClass("customize_leftcolumn")) {
            var row = 1;
            var widget = $(".dashboarditem", ui.item);
            var targetItems = $(".dashboarditem", $(columnDiv));
            targetItems.each(function(index) {
                if ($(widget).attr("id") == $(this).attr("id")) {
                    row = index + 1;
                }
            })
            row = row == targetItems.length ? (row - 1) : row;
            var col = $(columnDiv).attr("id").substr(7);
            // check to see if there is an existed dashboard item in the target position
            EB_Common.Ajax.post('/dashboard', {
                row : row,
                col : col,
                widgetId : widget.attr("id").substr(5),
                widgetType : widget.attr("data-widget-type")
            }, function(data, type) {
                ui.item.remove();
                var itemDiv = $.tmpl("dashboardItemTmpl", [ {
                    item : data
                } ]).sortable(rightSortableOptions);
                itemDiv.insertBefore("#item_" + row + "_" + col);
                // TODO: add event listener to item div
                EB_Common.Ajax.get(data.widget.url, {}, function(data) {
                    $(".dashboarditem-container", itemDiv).html(data);
                }, "html");
                // resort the columnDiv
                sortColumnDiv(columnDiv);
            }, 'json');
        } else {
            sortColumnDiv(columnDiv);
        }
    }

    function showLeft() {
        $("#customize_left").show();
        $("#hideleft_div").show();
        $("#showleft_div").hide();
    }

    function sortColumnDiv(columnDiv) {
        var dashItems = $(".dashboarditem", $(columnDiv));
        if (dashItems.length > view.dashboard.maxRows) {
            var itemDiv = $(".dashboarditem:last", $(columnDiv));
            moveBackToLeft(itemDiv);
            itemDiv.remove();
        }
        // reassign item id
        resortColumnDiv(columnDiv);
    }

    function moveBackToLeft(itemDiv) {
        var widgets = [ {
            widgetId : itemDiv.attr("data-widget-id"),
            widgetType : itemDiv.attr("data-widget-type"),
            widgetTitle : itemDiv.attr("data-widget-title")
        } ];
        $.tmpl("leftItemTmpl", widgets).sortable(leftSortableOptions).insertAfter(".sys_widgets");
        EB_Common.Ajax.ajax({
            url : '/dashboard/' + itemDiv.attr("data-item-id"),
            type : 'DELETE',
            dataType : 'json'
        });
        showLeft();
    }

    function resortColumnDiv(columnDiv) {
        dashItems = $(".dashboarditem", $(columnDiv));
        if (dashItems.length > 0) {
            var col = $(columnDiv).attr("id").substr(7);
            var itemIds = [];
            dashItems.each(function(index) {
                $(this).attr("id", "item_" + (index + 1) + "_" + col);
                itemIds.push($(this).attr("data-item-id"));
            });
			EB_Common.Ajax.ajax({
                url : '/dashboard/' + itemIds.join("|") + "/" + col,
                type : 'PUT',
                dataType : 'json'
            });
        }
    }
})(EB_View);