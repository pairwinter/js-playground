(function(view) {
    view.dashboard = function() {};
    view.dashboard.widgets = function() {};
    view.dashboard.widgets.broadcastCount = function() {};
    view.dashboard.widgets.broadcastCount.initPage = function() {
	    getdata();
	    $('broadcastCount').everyTime('300s', function() {
	        getdata();
	    });
    }
    
    function getdata() {
        EB_Common.Ajax.get(EB_Common.Ajax.wrapperUrl("/notifications/status"), {timeStamp:new Date().getTime()}, function(data) {
            $("#inprogress").html(data.inprogress);
            $("#lastweek").html(data.lastweek);
            $("#lastmonth").html(data.lastmonth);
        }, "json");
    }
})(EB_View);