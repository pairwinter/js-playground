(function(view) {
    view.notifications = function() {

    };

    view.notifications.initializeTabs = function(hrefParent, tabContainer) {
        $('#' + hrefParent + ' a').click(function(e) {
            e.preventDefault();
            var href = $(this).attr('href');
            $('#' + hrefParent + ' a').removeClass('mouse_out');
            $(this).addClass('mouse_out');
            EB_Common.Ajax.load($('#' + tabContainer).empty(), href);
        });
        $(location.hash || ("#" + $('#' + hrefParent + ' a:first-child').attr("id"))).click();
    };

    view.notifications.listenTabs = function() {
        EB_View.notifications.initializeTabs("main_tabs", "tab_container");

        $("#a_inprogress").click(function() {
            loadHistoryNotifications("Inprogress");
        });
        $("#a_lastweek").click(function() {
            loadHistoryNotifications("LastWeek");
        });
        $("#a_lastmonth").click(function() {
            loadHistoryNotifications("LastMonth");
        });
    };

    view.notifications.listenSearch = function(gridId) {
        $(".gbqfb").click(function() {
            _reloadGrid(gridId);
        });
        $("#search").keydown(function(event) {
            if (event.which == 13) {
                event.preventDefault();
                _reloadGrid(gridId);
            }
        })
    }

    view.notifications.refreshCounter = function() {
        EB_Common.Ajax.get(EB_Common.Ajax.wrapperUrl("/notifications/status"), {
            t : Math.random()
        }, function(data) {
            $("#inprogress").html(data.inprogress);
            $("#lastweek").html(data.lastweek);
            $("#lastmonth").html(data.lastmonth);
        }, "json");
    }

    view.notifications.reloadGrid = function(gridId) {
        _reloadGrid(gridId);
    }

    view.notifications.onServerSuccess = function(data, index, btnId, refreshCounter) {
        if (data.success) {
            if (refreshCounter) {
                view.notifications.refreshCounter();
            }
            window.location = EB_Common.Ajax.wrapperUrl("/") + "notifications#ui-tabs-" + index;
        } else {
            $("#" + btnId).show();
            $("#cancel").show();
            if(data.message=="10000"){
                EB_Common.dialog.alert("upload error,please try again later.");
            }else{
                EB_Common.dialog.alert(data.message);
            }

        }
    }

    function _reloadGrid(gridId) {
        $("#" + gridId).jqGrid('setGridParam', {
            postData : {
                messageTitle : $("#search").val()
            }
        }).trigger("reloadGrid");
    }

    function loadHistoryNotifications(status) {
        $('#main_tabs a').removeClass('mouse_out');
        $("#ui-tabs-3").addClass('mouse_out');
        EB_Common.Ajax.load($("#tab_container").empty(), '/histories/' + status);
    }
})(EB_View);
