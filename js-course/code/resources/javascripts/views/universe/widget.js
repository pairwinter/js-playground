(function(view){
    $.views.tags({
        escapeHtml:function(val){
            return EB_View.universe.tool.escapeXML(val);
        }
    });
    $.views.helpers({
        formatIconSrc:function(icon){
            return EB_Common.Ajax.ctx+"/statics/stylesheets/settings/img/"+icon;
        },
        formatTwitterTime: function(val){
            if(val && val.indexOf("-")>-1){
                var vals = val.split("-");
                return vals[0]+" "+i18n["global.month."+vals[1]]+" "+vals[2];
            }
            val =  val.replace("*SA*","s");
            val =  val.replace("*MA*","m");
            val =  val.replace("*HA*","h");
            return val;
        },
        formatWeatherCondition:function(val){
            if(val){
                return (!!i18n["weatherthreshold.condition."+val])?i18n["weatherthreshold.condition."+val]:"";
            }
            return "";
        },
        cut:function(val){
            if(val>140){
                return val.substring(0,140)+"...";
            }
            return val;
        },
        escapeHtml:function(val){
            return EB_View.universe.tool.escapeXML(val);
        }
    });
    view.universe.tool.parseSelectTime=function(value){
         var values = value.split(" ");
        if(values[1]=="m"){
            return (parseInt(values[0])*60*1000);
        }else if(values[1]=="h"){
            return (parseInt(values[0])*3600*1000);
        }else if(values[1]=="d"){
            return (parseInt(values[0])*24*3600*1000);
        }
        return 0;
    };
    view.universe.tool.pagination=function(pagination,currentPageNo,totalPageCount,callback,args){
        if(totalPageCount!=0){
            if(pagination.data("jqPagination"))
                pagination.jqPagination("destroy");
            pagination.show().jqPagination({
                link_string	: 'javascript:',
                max_page	: totalPageCount,
                current_page: currentPageNo,
                paged: function(page) {
                    args[0].pageNo=page;
                    switch (args.length){
                        case 1: callback(args[0]);break;
                        case 2: callback(args[0],args[1]);break;
                        case 3: callback(args[0],args[1],args[2]);break;
                        default :break;
                    }
                }
            });
            pagination.children().removeClass("ui-state-disabled");
            if(totalPageCount==1){
                pagination.children().not(".current").addClass("ui-state-disabled");
            }else if(currentPageNo==1){
                pagination.children(".first,.previous").addClass("ui-state-disabled");
            }else if(currentPageNo==totalPageCount){
                pagination.children(".next,.last").addClass("ui-state-disabled");
            }
            pagination.find(".current").text(currentPageNo+"/"+totalPageCount);
        }else{
            pagination.hide();
        }
    };
    view.universe.tool.setNoData=function(ul,markers){
        if(markers){
            for(var markerId in markers){
                if(markers[markerId].display)
                    markers[markerId].display(false);
            }
        }
        ul.empty().append($("<li class='li_nodata'>").text(i18n["universe.widget.twitter.nodata"]));
        ul.next().hide();
    };
    // create marker
    view.universe.tool.createMarkerForWidget=function(markers,markerId,lon,lat,icon,display,markerHtml){
        if(markers[markerId])
        {
            var marker = markers[markerId];
            if(display === undefined)
                display = true;
            marker.display(display);
            return marker;
        }
        var lonlat = new OpenLayers.LonLat(lon, lat).transform(latlon_proj,map.getProjectionObject());
        if(!icon){
            icon = "univmap_tw_blu-dia.png";
        }
        var iconPath = EB_Common.Ajax.ctx+"/statics/stylesheets/settings/img/"+icon;
        var size = new OpenLayers.Size(21,25);
        var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
        icon = new OpenLayers.Icon(iconPath, size, offset);
        if(!markerHtml){
            var marker = new OpenLayers.Marker(lonlat,icon);
            markers[markerId]=marker;
            if(display === undefined)
                display = true;
            marker.display(display);
            widgetMarkersLayer.addMarker(marker);
            return marker;
        }else{
            var feature = new OpenLayers.Feature(markers, lonlat);
            feature.closeBox = false;
            feature.popupClass = EB_View.universe.tool.WidgetMakerFramedCloud;
            feature.data.popupContentHTML = markerHtml;
            feature.data.overflow = "auto";
            feature.data.icon=icon;
            var marker = feature.createMarker();
            var markerClick = function (evt) {
                if (this.popup == null) {
                    this.popup = this.createPopup(this.closeBox);
                    this.popup.events.register("mouseover",this,function(e){
                    });
                    map.addPopup(this.popup);
                    this.popup.show();
                } else {
                    this.popup.toggle();
                }
                OpenLayers.Event.stop(evt);
            };
            marker.events.register("mouseover", feature, markerClick);
            marker.events.register("mouseout", feature, markerClick);
            markers[markerId]=marker;
            marker.display(display);
            widgetMarkersLayer.addMarker(marker);
            return marker;
        }
    };
    view.universe.widget.fillMap = function(filterRules,searchShapes){
//        return null;
        if(filterRules){
            var ruleDom = $("#search_contact_rule_div_ul").empty();
            for(var i=0;i<filterRules.length;i++){
                var filterRule = filterRules[i];
                var r = EB_View.universe.ebControl.everbridgeSearchContact.advancedSearch.addCondtion(filterRule);
                ruleDom.append(r);
            }
            $("#searchType2").click();
        }
        if(searchShapes && searchShapes.length>0){
            var polygons = [];
            for(var i=0;i<searchShapes.length;i++){
                var searchShape = searchShapes[i];
                if(searchShape && searchShape.polygon){
                    var points = searchShape.polygon;
                    var shape_points=[];
                    for (var j=0; j<points.length; j++) {
                        var point = new OpenLayers.Geometry.Point(points[j].x, points[j].y);
                        point.transform(latlon_proj, map.getProjectionObject());
                        shape_points.push(point);
                    }
                    var linear_ring = new OpenLayers.Geometry.LinearRing(shape_points);
                    var polygon = new OpenLayers.Geometry.Polygon([linear_ring]);
                    var polygon_feature = new OpenLayers.Feature.Vector(polygon);
                    var isInclude = searchShape.isInclude;
                    polygon_feature.data.isInclude=searchShape.isInclude;
                    var current_style = polygon_feature.style;
                    var polygon_style = 'include';
                    if (isInclude) {
                        polygon_style = {fillColor: polyFillColorDef};
                    } else {
                        polygon_style = {fillColor: polyFillColorExclude};
                    }
                    if (current_style == null) {
                        var style = OpenLayers.Util.applyDefaults(polygon_style, OpenLayers.Feature.Vector.style["default"]);
                    } else {
                        var style = OpenLayers.Util.applyDefaults(polygon_style, current_style);
                    }
                    polygon_feature.style = style;
                    polygon_feature.polygonType = isInclude ? "include" : "exclude";
                    polygon_feature.data.submit=false;
                    polygons.push(polygon_feature);
                }
            }
            polygonsLayer.addFeatures(polygons);
            EB_View.universe.ebControl.everbridgeSearchContact.searchCommit(true);
        }
    };

    view.universe.widget.setDataToNotificationWidget=function(){
        if(EB_View.universe.widget.notification.load) {
            EB_View.notifications.newBc.polygons.getDataFromMap(EB_View.universe.ebControl.everbridgeSearchContact.lastSearchParams,$("#selectedContactsCount").text());
        }
    };
    view.universe.widget.showSendNotification=function(source){
        if(EB_View.universe.widget.notification.load)
        {
            $("#hide_show_notification_widget").click();
            EB_View.universe.widget.recipientapp.addNotificationData();
            EB_View.universe.widget.weather.setWeatherNotificationData();
            return;
        }
        var url = EB_Common.Ajax.wrapperUrl("/bcTemplates/new/"+source);
        $("#send_notification").load(url,function(){
            EB_View.universe.widget.notification.load=true;
            $("#send_notification_btn").attr("title",i18n["universe.navigation.newbroadcast.title"]);
            var jmap=EB_View.universe.jmap;
            var jnotificationWidget = EB_View.universe.jnotificationWidget;
            var juniverseWidgetNav=EB_View.universe.universeWidgetNav;
            var juniverseWidgets=EB_View.universe.jwidgetsContainer;
            if(!EB_View.universe.isGroupLeader)
            {
                if($("#universe_widget_nav").hasClass("widgets_horizontal")){
                    $("#hide_show_widgets_nav").click();
                }
            }
            jnotificationWidget.show();
            var notificationWidth =Math.floor(EB_View.universe.windowWidth/3);
            jnotificationWidget.width(notificationWidth);
            $("#notification_widget_nav").height(juniverseWidgets.height()-1);
            $("#send_notification").height(juniverseWidgets.height()-1-41);
            if(!EB_View.universe.isGroupLeader){
                juniverseWidgets.css("left",jnotificationWidget.width()+"px");
            }
            $("#notification_widget .univ-panel").hide();
            $("#notification_widget_nav").addClass("widgets_horizontal").removeClass("widgets_vertical").children(":first").show();
            var universeWidgetsWidth=juniverseWidgets.is(":visible")?juniverseWidgets.width():0;
            jmap.width(EB_View.universe.windowWidth-notificationWidth-universeWidgetsWidth);
            map.updateSize();
        });
    }
    view.universe.widget.removeSendNotification=function(){
        //$("#send_notification").empty();
        EB_View.universe.widget.notification.load=false;
        $("#notification_widget").hide();
        EB_View.universe.adjustWindow();
    };
    //process widget's position and display status when be triggered.
    view.universe.widget.showWidget=function(widget){
        var widgetId="#"+widget.attr("id");
        if(!widget.is(":hidden")){
            widget.siblings().find(".widget-expansion").not(".off").trigger("click");
            widget.show().find(".off").trigger("click");
            return;
        }
        var column1=$("#universe_widget_column_sub1_ul");
        var column2=$("#universe_widget_column_sub2_ul");
        var showNumOfColumn1 =column1.children(":visible").length;
        var showNumOfColumn2 =column2.children(":visible").length;
        if(column2.is(":hidden")){
            if(column2.find(widgetId).length>0){
                var copy = widget.clone(true);
                widget.remove();
                widget=copy;
                column1.append(widget);
            }
        }else{
            if(showNumOfColumn1<=showNumOfColumn2){
                if(column1.find(widgetId).length==0){
                    var copy = widget.clone(true);
                    widget.remove();
                    widget=copy;
                    column1.append(widget);
                }
            }else{
                if(column2.find(widgetId).length==0){
                    var copy = widget.clone(true);
                    widget.remove();
                    widget=copy;
                    column2.append(widget);
                }
            }
        }
        widget.siblings().find(".widget-expansion").not(".off").trigger("click");
        widget.show().find(".off").trigger("click");
        if(widgetId=="#widget_weather"){
            EB_View.universe.widget.weather.loadPage();
        }else if(widgetId == "#widget_twitter"){
            EB_View.universe.widget.twitter.loadPage();
        }else if(widgetId == "#widget_recipientapp"){
            EB_View.universe.widget.recipientapp.loadPage();
        }
    }
    // add event for dom of universe
    view.universe.widget.addListenerForDom=function(){
        var jmap = EB_View.universe.jmap;
        var jUniverseWidgetNav = $("#universe_widget_nav");
        var jHideShowWidgetNav = $("#hide_show_widgets_nav");
        var jUniverseWidget = $("#universe_widget");
        var jNotificationWidget = $("#notification_widget");
        var jNotificationWidgetNav = $("#notification_widget_nav");
        //toolbar layout
        $("#widgets_list_ul li a").click(function(){
            var jthis = $(this);
            if(jUniverseWidgetNav.hasClass("widgets_vertical")){
                jHideShowWidgetNav.click();
            }
            var widgetName = jthis.attr("widget");
            EB_View.universe.widget[widgetName].nav=jthis;
            var widgetId="#widget_"+widgetName;
            var widget = $(widgetId);
            EB_View.universe.widget.showWidget(widget);
        });
        var adjustLayout=EB_View.universe.adjustLayout=function(){
            var t = $("#universe_layer .selected").attr("layout");
            var windowWidth=EB_View.universe.windowWidth;
            var navWidth=0;
            navWidth=Math.floor(windowWidth/3);
            if(t=="3"){
                navWidth = Math.floor(windowWidth/2);;
                $("#universe_widget_column_sub2").show();
                $("#universe_widget_column_sub1").width("50%");

            }else{
                $("#universe_widget_column_sub2").hide();
                $("#universe_widget_column_sub1").width("100%");
            }
            jUniverseWidget.width(navWidth);
            if($("#notification_widget").is(":visible")){
                var noti_width=jNotificationWidget.width();
                jmap.width(windowWidth-(jUniverseWidget.width()+noti_width));
            }else{

                jmap.width(windowWidth-jUniverseWidget.width());
            }
            map.updateSize();
        };
        jHideShowWidgetNav.click(function(){
            //horizontal
            if(jUniverseWidgetNav.hasClass("widgets_vertical")){
                $("#universe_widget_column").show().height(jmap.height()-3-104);
                jUniverseWidgetNav.addClass("widgets_horizontal").removeClass("widgets_vertical");
                if(jNotificationWidget.is(":visible")){
                    $("#hide_show_notification_widget").removeClass("btn_widgets_to_right").addClass("btn_widgets_to_left");
                    jNotificationWidget.width("auto");
                    $("#send_notification").hide().siblings().show().parent().addClass("widgets_vertical").removeClass("widgets_horizontal");
                    var noti_width=jNotificationWidget.width();
                    jUniverseWidget.css("left",noti_width);
                }else{
                    jUniverseWidget.css("left",0);
                }
                adjustLayout();
            }else{//vertical
                $("#universe_widget_column").hide();
                jUniverseWidgetNav.addClass("widgets_vertical").removeClass("widgets_horizontal");
                jUniverseWidget.width("auto");
                if(jNotificationWidget.is(":visible")){
                    var noti_width=jNotificationWidget.width();
                    jUniverseWidget.css("left",noti_width);
                    jmap.width(EB_View.universe.windowWidth-(jUniverseWidget.width()+noti_width));
                }else{
                    jmap.width(EB_View.universe.windowWidth-jUniverseWidget.width());
                }
                map.updateSize();
            }
        });
        $("#universe_layer a").click(function(){
            $(this).addClass("selected").siblings().removeClass("selected");
            adjustLayout();
        });
        $("#notification_widget_icon").click(function(){
            $("#hide_show_notification_widget").click();
        });
        $("#hide_show_notification_widget").click(function(){
            var windowWidth=EB_View.universe.windowWidth;
            var isGroupLeader = EB_View.universe.isGroupLeader;
            if($(this).hasClass("btn_widgets_to_left")) {
                $(this).removeClass("btn_widgets_to_left").addClass("btn_widgets_to_right");
                if(isGroupLeader){
                    $("#send_notification").show().prev().hide().parent().addClass("widgets_horizontal").removeClass("widgets_vertical");
                    jNotificationWidget.width(Math.floor(EB_View.universe.windowWidth/3));
                    var noti_width=jNotificationWidget.width();
                    jmap.width(windowWidth-noti_width);
                }else{
                    $("#universe_widget_column").hide();
                    jUniverseWidgetNav.addClass("widgets_vertical").removeClass("widgets_horizontal");
                    jUniverseWidget.width("auto");
                    $("#send_notification").show().prev().hide().parent().addClass("widgets_horizontal").removeClass("widgets_vertical");
                    jNotificationWidget.width(Math.floor(EB_View.universe.windowWidth/3));
                    jNotificationWidgetNav.height(jUniverseWidget.height()-1);
                    $("#send_notification").height(jUniverseWidget.height()-1);
                    var noti_width=jNotificationWidget.width();
                    jUniverseWidget.css("left",noti_width);
                    jmap.width(windowWidth-(jUniverseWidget.width()+noti_width));
                }
            }else{
                $(this).removeClass("btn_widgets_to_right").addClass("btn_widgets_to_left");
                if(isGroupLeader){
                    $("#send_notification").hide().prev().show().parent().removeClass("widgets_horizontal").addClass("widgets_vertical");
                    jNotificationWidget.width("auto");
                    var noti_width=jNotificationWidget.width();
                    jmap.width(windowWidth-noti_width);
                }else{
                    $("#send_notification").hide().prev().show().parent().removeClass("widgets_horizontal").addClass("widgets_vertical");
                    jNotificationWidget.width("auto");
                    var noti_width=jNotificationWidget.width();
                    jUniverseWidget.css("left",noti_width);
                    jmap.width(windowWidth-noti_width-jUniverseWidget.width());
                }
            }
            map.updateSize();
        });
    };
    //add sortable event for widgets
    view.universe.widget.sortableWidgets=function(){
        $(".column").sortable({
            connectWith:$(".column"),
            placeholder:'widget-placeholder',
            handle: '.widget-header',
            cursor:'move',
            forcePlaceholderSize: true,
            revert: 300,
            delay: 100,
            opacity: 0.8,
            scroll:false,
            zIndex:10000,
            //  use a helper-clone that is append to 'body' so is not 'contained' by a pane
            helper:function (evt, ui) {
                return $(ui).clone().appendTo('body').show();
            }
        }).find(".widget-expansion").mousedown(function (e) {
                e.stopPropagation();
            }).toggle(
            function(){$(this).addClass("off").parent().parent().parent().next().hide();return false;},
            function () {$(this).removeClass("off").parent().parent().parent().next().show();return false;}).
            parent().click(function(){$(this).children(":first").click()});
        $(".widget-remove").click(function(){
            var li = $(this).parent().parent().parent().parent();
            EB_View.universe.widget[li.attr("widget")].nav.removeClass("off");
            li.hide();
            if(li.siblings(":visible").length==0){
                var parentId=li.parent().attr("id");
                if(parentId=="column_center"){
                    if(universeLayout.children.east.state.east.isClosed || $("#column_east li:visible").length==0){
                        universeLayout.close("east");
                    }
                }else if(parentId=="column_east"){
                    universeLayout.children.east.close('east');
                    if($("#column_center li:visible").length==0){
                        universeLayout.close("east");
                    }
                }
            }
        });
    };
    //when sended notification call this method;
    view.universe.widget.callReportWidget=function(){
        $("#widgets_list_ul li a[widget='report']").click();
    }
    /******************************** recipientapp widget*****************************************/
    view.universe.widget.recipientapp.loadPage=function(){
        //tab event
        $("#selectedRecipiendappType a").unbind("click").click(function(){
            var jthis =$(this);
            jthis.addClass("mouse_out").siblings().removeClass("mouse_out");
            var field =jthis.attr("field");
            var widget_recipientapp=$("#widget_recipientapp");
            var unsolicited =  widget_recipientapp.find(".unsolicited");
            var solicited = widget_recipientapp.find(".solicited");
            if(field=="unsolicited")
            {
                unsolicited.show();
                solicited.hide();
            }else{
                unsolicited.hide();
                solicited.show();
                if(!solicited.data("hasLoad")){
                    solicited.data("hasLoad",true);
                    $("#recipientappTime_solicited").trigger("change");
                }
            }
        });
        //change time
        $("#recipientappTime").change(function(){
            var postData={pageNo:1,pageSize:EB_View.universe.widget.recipientapp.pageSize,time:EB_View.universe.tool.parseSelectTime(this.value)}
            var ucl = $("#unsolicitedCategoryList").get(0);
            if(ucl.value!="0"){
                postData.categoryId = ucl.value;
            }
            EB_View.universe.widget.recipientapp.loadMessages(postData,"refresh");
        });
        $("#recipientappTime_solicited").change(function(){
            var postData={pageNo:1,pageSize:EB_View.universe.widget.recipientapp.pageSize,time:EB_View.universe.tool.parseSelectTime(this.value)}
            EB_View.universe.widget.recipientapp.loadMessages_solicited(postData,"refresh");
        });
        //click category
        $("#unsolicitedCategoryList").unbind("change").change(function(){
            var postData={pageNo:1,pageSize:EB_View.universe.widget.recipientapp.pageSize,time:EB_View.universe.tool.parseSelectTime($("#recipientappTime").get(0).value)}
            if(this.value!="0"){
                postData.categoryId = this.value;
            }
            EB_View.universe.widget.recipientapp.loadMessages(postData,"refresh");
        });
        //refresh
        $("#recipient_refresh a").unbind("click").click(function(){
            var $this = $(this);
            if($this.hasClass("unsolicited")){
                var postData={pageNo:1,pageSize:EB_View.universe.widget.recipientapp.pageSize,time:EB_View.universe.tool.parseSelectTime($("#recipientappTime").get(0).value)}
                if(this.value!="0"){
                    postData.categoryId = this.value;
                }
                EB_View.universe.widget.recipientapp.loadMessages(postData,"refresh");
            }else{
                var postData={pageNo:1,pageSize:EB_View.universe.widget.recipientapp.pageSize,time:EB_View.universe.tool.parseSelectTime($("#recipientappTime_solicited").get(0).value)}
                EB_View.universe.widget.recipientapp.loadMessages_solicited(postData,"refresh");
            }
        });
        //click show all on map
        function showAllOnMap(jdom,markers,ul_id){
            var recipientapp_viewonmaps=$("#"+ul_id).find(".viewonmap");
            if(!jdom.hasClass("show")){
                var firstMarker = null;
                recipientapp_viewonmaps.each(function(i){
                    var jthis =$(this);
                    jthis.addClass("show");
                    jthis.parent().parent().parent().addClass("highlighted_w-contentblock");
                    var m=EB_View.universe.tool.createMarkerForWidget(markers,jthis.attr("markerId"),jthis.attr("lon"),jthis.attr("lat"),jthis.attr("icon"),true);
                    if(i==0){
                        firstMarker=m;
                    }
                });
                if(firstMarker)
                    map.setCenter(firstMarker.lonlat);
                jdom.addClass("show");
            }else{
                recipientapp_viewonmaps.each(function(){
                    var jthis =$(this);
                    jthis.removeClass("show");
                    jthis.parent().parent().parent().removeClass("highlighted_w-contentblock");
                });
                for(var markerId in markers){
                    if(markers[markerId].display)
                        markers[markerId].display(false);
                }
                jdom.removeClass("show");
            }
        }
        $("#recipientapp_viewallonmap").unbind("click").click(function(){
            showAllOnMap($(this),EB_View.universe.widget.recipientapp.markers,"recipientapp_messages_list")
        });
        $("#recipientapp_viewallonmap_solicited").unbind("click").click(function(){
            showAllOnMap($(this),EB_View.universe.widget.recipientapp.solicitedMarkers,"recipientapp_solicited_list")
        });

        //set data to notification
        $("#universe_widget_column").undelegate(".recipientapp_newnotification,.recipientapp_newnotification_solicited","click").
            delegate(".recipientapp_newnotification,.recipientapp_newnotification_solicited","click",function(){
            var jthis = $(this);
            var contactId = jthis.attr("contactId") ;
            var firstName = jthis.attr("firstName");
            var lastName = jthis.attr("lastName");
            EB_View.universe.widget.recipientapp.notificationData={
                contactId: contactId,
                firstName: firstName,
                lastName:  lastName
            }
            EB_View.universe.widget.showSendNotification(2);
        });
        //view on map
        $("#universe_widget_column").undelegate(".viewonmap_unsolicited","click").delegate(".viewonmap_unsolicited","click",function(){
            var jthis = $(this);
            EB_View.universe.widget.recipientapp.displayMarkerOfDom(jthis,EB_View.universe.widget.recipientapp.markers);
        });
        $("#universe_widget_column").undelegate(".viewonmap_solicited","click").delegate(".viewonmap_solicited","click",function(){
            var jthis = $(this);
            EB_View.universe.widget.recipientapp.displayMarkerOfDom(jthis,EB_View.universe.widget.recipientapp.solicitedMarkers);
        });
        //load when open widget recipientapp
        var postData={
            pageNo:1,
            pageSize:EB_View.universe.widget.recipientapp.pageSize,
            time:EB_View.universe.tool.parseSelectTime($("#recipientappTime").get(0).value)
        };
        EB_View.universe.widget.recipientapp.loadMessages(postData,"refresh");
    }
    view.universe.widget.recipientapp.displayMarkerOfDom=function(jdom,markers){
        var marker=null;
        if(markers[jdom.attr("markerId")]){
            var marker = markers[jdom.attr("markerId")];
            if(jdom.hasClass("show")){
                marker.display(false);
                jdom.removeClass("show");
                jdom.parent().parent().parent().removeClass("highlighted_w-contentblock");
            }else{
                jdom.addClass("show");
                jdom.parent().parent().parent().addClass("highlighted_w-contentblock");
                marker.display(true);
                map.setCenter(marker.lonlat);
            }
            return;
        }
        marker =EB_View.universe.tool.createMarkerForWidget(markers,jdom.attr("markerId"),jdom.attr("lon"),jdom.attr("lat"),jdom.attr("icon"),true);
        map.setCenter(marker.lonlat);
        jdom.addClass("show");
    }
    //request data from server;
    view.universe.widget.recipientapp.loadMessages=function(postData,operation){
        var recipientappWidget=EB_View.universe.widget.recipientapp;
        var recipientappMessagesList = $("#recipientapp_messages_list");
        if(!recipientappWidget.loadCategory){
            postData.loadCategory = true;
        }
        EB_Common.Ajax.get("/universe/widget/searchRecipientappMessages",postData,function(data){
            EB_Common.logger.log(data);
            //load category once
            if(!recipientappWidget.loadCategory){
                var categoryList = data.unsolicitedCategoryList;
                var options = ['<option value="0" selected>'+i18n["universe.mybridge.category.select"]+'</option>'];
                for(var i=0;i<categoryList.length;i++){
                    options.push('<option value="'+categoryList[i].id+'">'+EB_View.universe.tool.escapeXML(categoryList[i].title)+'</option>');
                }
                $("#unsolicitedCategoryList").empty().append(options.join(""));
                EB_View.universe.widget.recipientapp.loadCategory = true;
            }
            var ums = data.unsolicitedMessages;
            var renderResult= null;
            if(operation=="append"){
                renderResult =  $("#RecipientappMessagesTemplate").render(ums.data);
                recipientappMessagesList.append(renderResult);
                loadMarkers(ums.data,false);
            }else if(operation=="prepend"){
                renderResult =  $("#RecipientappMessagesTemplate").render(ums.data);
                recipientappMessagesList.append(renderResult);
                loadMarkers(ums.data,false);
            }else if(operation=="refresh"){
                if(ums.totalCount==0){
                    EB_View.universe.tool.setNoData(recipientappMessagesList,EB_View.universe.widget.recipientapp.markers);
                    return;
                }
                EB_View.universe.tool.pagination($("#unsolicitedPagination"),ums.currentPageNo,ums.totalPageCount,EB_View.universe.widget.recipientapp.loadMessages,[postData,"refresh"]);
                renderResult =  $("#RecipientappMessagesTemplate").render(ums.data);
                recipientappMessagesList.empty().append(renderResult);
                loadMarkers(ums.data,true);
            }
            function loadMarkers(messages,clearPreview){
                var markers = EB_View.universe.widget.recipientapp.markers;
                for(var markerId in markers){
                    if(markers[markerId].display)
                        markers[markerId].display(false);
                }
                var isShowAllOnMap = $("#recipientapp_viewallonmap").hasClass("show");
                var marker=null;
                for(var i=0;i<messages.length;i++){
                    var message=messages[i];
                    if(message.longitude && message.latitude){
                        if(isShowAllOnMap){
                            message.show=true;
                        }
                        var markerHtml = $("#unsolicitedMarkerTemplate").render(message);
                        var marker_ = EB_View.universe.tool.createMarkerForWidget(markers,"unsolicited"+message.id,message.longitude,message.latitude,message.category.icon,isShowAllOnMap,markerHtml);
                        if(!marker){
                            marker = marker_;
                        }
                    }
                }
                if(marker && isShowAllOnMap){
                    map.setCenter(marker.lonlat);
                }
            }
        },"json");
    }
    view.universe.widget.recipientapp.loadMessages_solicited=function(postData,operation){
        var recipientappWidget=EB_View.universe.widget.recipientapp;
        var recipientappSolicitedList = $("#recipientapp_solicited_list");
        EB_Common.Ajax.get("/universe/widget/searchSolicitedMessages",postData,function(data){
            EB_Common.logger.log(data);
            var cms = data.circumstanceMessages;
            if(cms.totalCount==0){
                EB_View.universe.tool.setNoData(recipientappSolicitedList,EB_View.universe.widget.recipientapp.solicitedMarkers);
                return;
            }
            var renderResult= null;
            if(operation=="prepend"){

            }else if(operation=="refresh"){
                EB_View.universe.tool.pagination($("#solicitedPagination"),cms.currentPageNo,cms.totalPageCount,EB_View.universe.widget.recipientapp.loadMessages_solicited,[postData,"refresh"]);
                loadMarkers(cms.data,true);
                renderResult =  $("#RecipientappMessagesTemplate_solicited").render(cms.data);
                recipientappSolicitedList.empty().append(renderResult);
            }
            function loadMarkers(messages,clearPreview){
                var markers = EB_View.universe.widget.recipientapp.solicitedMarkers;
                for(var markerId in markers){
                    if(markers[markerId].display)
                        markers[markerId].display(false);
                }
                var isShowAllOnMap = $("#recipientapp_viewallonmap_solicited").hasClass("show");
                var marker=null;
                for(var i=0;i<messages.length;i++){
                    var message=messages[i];
                    if(message.longitude && message.latitude){
                        if(isShowAllOnMap){
                            message.show=true;
                        }
                        var markerHtml = $("#solicitedMarkerTemplate").render(message);
                        var marker_ = EB_View.universe.tool.createMarkerForWidget(markers,"solicited"+message.id,message.longitude,message.latitude,"univmap_tw_grn-circ.png",isShowAllOnMap,markerHtml);
                        if(!marker){
                            marker = marker_;
                        }
                    }
                }
                if(marker && isShowAllOnMap){
                    map.setCenter(marker.lonlat);
                }
            }
        },"json");
    }
    view.universe.widget.recipientapp.addNotificationData=function(){
        var data = EB_View.universe.widget.recipientapp.notificationData;
        if(data){
            EB_View.notifications.newBc.polygons.addContactToList(data.contactId,data.firstName,data.lastName);
        }
        EB_View.universe.widget.recipientapp.notificationData=null;

    }
    /******************************** weather widget*****************************************/
    view.universe.widget.weather.loadPage=function(){
        $("#weatherTime").unbind("change").change(function(){
            if(EB_View.universe.widget.weather.feature){
                polygonsLayer.removeFeatures(EB_View.universe.widget.weather.feature);
            }
            var postData={pageNo:1,pageSize:EB_View.universe.widget.recipientapp.pageSize,time:EB_View.universe.tool.parseSelectTime(this.value)}
            EB_View.universe.widget.weather.loadAlerts(postData,"refresh");
        });
        $("#weahterRefresh").unbind("click").click(function(){
            $("#weatherTime").trigger("change");
        });
        $("#universe_widget_column").undelegate(".weather_viewonmap,.weather_warning_viewonmap","click").delegate(".weather_viewonmap,.weather_warning_viewonmap","click",function(){
            var jthis = $(this);
            EB_View.universe.widget.weather.displayPolygon(jthis,!jthis.hasClass("show"));
        });
        $("#universe_widget_column").undelegate(".weather_newnotification","click").delegate(".weather_newnotification","click",function(){
            var jthis = $(this);
            var li = jthis.parent().parent().parent();
            var title = li.find(".heading:first").text();
            var body = li.find(".weather_summary:first").text();
            EB_View.universe.widget.weather.notificationData={};
            EB_View.universe.widget.weather.notificationData.title = title;
            EB_View.universe.widget.weather.notificationData.body = body;
            EB_View.universe.widget.showSendNotification(2);
        });
        $("#universe_widget_column").undelegate(".weather_more,.weather_less","click").delegate(".weather_more,.weather_less","click",function(){
            var jthis = $(this);
            jthis.hide();
            if(jthis.hasClass("weather_more")){
                jthis.next().show();
                jthis.parent().next().show();
            }else{
                jthis.prev().show();
                jthis.parent().next().hide();
            }

        });
        EB_View.universe.widget.weather.loadAlerts({pageNo:1,pageSize:EB_View.universe.widget.weather.pageSize});
    }
    view.universe.widget.weather.loadAlerts=function(postData){
        if($("#weatherTime").get(0).value!="0"){
            postData.time=EB_View.universe.tool.parseSelectTime($("#weatherTime").get(0).value);
        }

        EB_Common.Ajax.get("/universe/widget/searchWeatherAlerts",postData,function(data){
            EB_Common.logger.log(data);
            widgetLayer.removeAllFeatures();
            if(data.weatherAlerts.totalCount==0){
                EB_View.universe.tool.setNoData($("#weather_threshold_list"));
                return;
            }
            EB_View.universe.tool.pagination($("#weatherPagination"),data.weatherAlerts.currentPageNo,data.weatherAlerts.totalPageCount,EB_View.universe.widget.weather.loadAlerts,[postData]);
            $("#weather_threshold_list").html($("#weatherThresholdTemplate").render(data.weatherAlerts.data));
        },"json");
    }
    
    view.universe.widget.weather.setWeatherNotificationData=function(){
        var data =  EB_View.universe.widget.weather.notificationData
        if(data){
            EB_View.notifications.newBc.polygons.setWeatherNotificationData(data.title,data.body);
        }
        EB_View.universe.widget.weather.notificationData=null;
    }
  //high light the dom when related polygons ware display in map
    view.universe.widget.weather.highlight=function(jdom,isHighlight){
    	if(isHighlight){
    		jdom.addClass("show").parent().parent().parent().addClass("highlighted_w-contentblock");
    	}else{
    		jdom.removeClass("show").parent().parent().parent().removeClass("highlighted_w-contentblock");;
    	}
    }
    view.universe.widget.weather.displayPolygon=function(jdom,display){
        if(display === undefined){
            display=true;
        }
        EB_View.universe.widget.weather.highlight(jdom,display);
        var postData = {weatherFeedId:jdom.attr("weatherFeedId")};
        var warning = jdom.attr("warning")=="true";
        postData.warning= warning;
        var weather = EB_View.universe.widget.weather;
        var jdom_features= jdom.data("features");
        if(jdom_features && jdom_features.length>0){
            if(!display){
            	if(!warning){
            		widgetLayer.removeFeatures(jdom_features);
            	}else{
            		polygonsLayer.removeFeatures(jdom_features);
            	}
            }
            else{
            	if(!warning) widgetLayer.addFeatures(jdom_features);
            	else polygonsLayer.addFeatures(jdom_features);
            }
            return;
        }
        if(!display) return;
        EB_Common.Ajax.get("/universe/widget/fetchWeatherFeedPolygons",postData,function(data){
            EB_Common.logger.log(data);
            var ww = EB_View.universe.widget.weather;
            var polygons = data.geoPolygons;
            if(polygons == null) return;
            var l = polygons.length;
            var center = null;
            if(jdom.data("features")){
               var f = jdom.data("features");
               center = f[0].geometry.getBounds().getCenterLonLat();
                map.setCenter(center);
                map.zoomTo(9);
                return;
            }
            var features = [];
            for(var i =0;i<l;i++){
                var polygon = polygons[i];
                var points = polygon.points;
                var shape_points=[];
                for (var j=0; j<points.length; j++) {
                    var point = new OpenLayers.Geometry.Point(points[j].x, points[j].y);
                    point.transform(latlon_proj, map.getProjectionObject());
                    shape_points.push(point);
                }
                var linear_ring = new OpenLayers.Geometry.LinearRing(shape_points);
                var polygon = new OpenLayers.Geometry.Polygon([linear_ring]);
                var polygon_feature = new OpenLayers.Feature.Vector(polygon);
                if(i==0){
                    center = polygon_feature.geometry.getBounds().getCenterLonLat();
                }
                polygon_feature.data.weather_warning_parasitifer=jdom;
                features.push(polygon_feature);
            }
            if(features.length!=0)
            {
            	jdom.data("features",features);
                if(!postData.warning){
                    widgetLayer.addFeatures(features);
                }else{
                	polygonsLayer.addFeatures(features);
                }
                map.setCenter(center);
                map.zoomTo(9);
            }else{
//                EB_Common.dialog.alert();
            }
        },"json");
    };
    /******************************** twitter widget*****************************************/
    view.universe.widget.twitter.loadPage=function(){
        //tab event
        $("#selectedTwitterType a").unbind("click").click(function(){
            var jthis =$(this);
            jthis.addClass("mouse_out").siblings().removeClass("mouse_out");
            var field =jthis.attr("field");
            var widget_twitter=$("#widget_twitter");
            var alerts = widget_twitter.find(".alerts_tab");
            var feeds = widget_twitter.find(".tweets_tab");
            if(field=="alerts")
            {
                alerts.show();
                feeds.hide();
            }else{
                alerts.hide();
                feeds.show();
                if(!feeds.data("hasLoad")){
                    feeds.data("hasLoad",true);
                    $("#twitterFeedsRefresh").click();
                    $("#twitterFeedsRefresh").data("refresh",false);
                }else{
                    if($("#twitterFeedsRefresh").data("refresh")){
                        $("#twitterFeedsRefresh").click();
                        $("#twitterFeedsRefresh").data("refresh",false);
                    }
                }
            }
        });
        $("#selectedTwitterGeoType").unbind("change").bind("change",function(){
            var jthis = $(this);
            var field = $("#selectedTwitterType").children(".mouse_out").attr("field");
            if(field == "alerts"){
                $("#twitterAlertsRefresh").trigger("click");
            }else{
                $("#twitterFeedsRefresh").trigger("click");
            }
        });
        $("#twitterAlertsTime").unbind("change").change(function(){
            var postData={pageNo:1,pageSize:EB_View.universe.widget.twitter.pageSize,time:EB_View.universe.tool.parseSelectTime(this.value)};
            EB_View.universe.widget.twitter.loadAlerts(postData,"refresh");
        });
        $("#twitterTweetsTime").unbind("change").change(function(){
            var postData={
                pageNo:1,
                pageSize:EB_View.universe.widget.twitter.pageSize,
                time:EB_View.universe.tool.parseSelectTime(this.value)
            };
            EB_View.universe.widget.twitter.loadTweets(postData,$("#tweets_list"),true);
        });
        //refresh throshold and feeds
        $("#twitterAlertsRefresh,#twitterFeedsRefresh").unbind("click").click(function(){
            if(this.id=="twitterAlertsRefresh"){
                var postData={pageNo:1,pageSize:EB_View.universe.widget.twitter.pageSize,time:EB_View.universe.tool.parseSelectTime($("#twitterAlertsTime").get(0).value)};
                EB_View.universe.widget.twitter.loadAlerts(postData);
            }else{
                var postData={
                    pageNo:1,
                    pageSize:EB_View.universe.widget.twitter.pageSize,
                    time:EB_View.universe.tool.parseSelectTime($("#twitterTweetsTime").get(0).value)
                };
                EB_View.universe.widget.twitter.loadTweets(postData,$("#tweets_list"),true);
            }
        });
        //refresh tweets in threshold
        $("#twitter_threshold_list").undelegate(".refresh","click").delegate(".refresh","click",function(){
            var jthis=$(this);
            var li =jthis.parent().parent();
            var ul= li.children(".tweetsList");
            var viewTweets=li.find(".viewTweets");
            if(!viewTweets.hasClass("show")){
                viewTweets.click();
            }else{
                var postData={
                    thresholdId:jthis.attr("thresholdId"),
                    pageNo:1,
                    pageSize:EB_View.universe.widget.twitter.pageSize
                };
                EB_View.universe.widget.twitter.loadTweets(postData,ul);
            }
        });
        //view tweets in one threshold/alerts
        $("#twitter_threshold_list").undelegate(".viewTweets","click").delegate(".viewTweets","click",function(){
            var jthis = $(this);
            if(jthis.hasClass("show")){
                jthis.parent().next().hide().next().hide();
                jthis.removeClass("show");
                jthis.parent().parent().children(":first").find(".alert_tweets_viewonmap").hide();
                return;
            }else{
                jthis.parent().next().show();
                jthis.addClass("show");
            }
            var postData={
                thresholdId:jthis.attr("thresholdId"),
                pageNo:1,
                pageSize:EB_View.universe.widget.twitter.pageSize
            }
            EB_View.universe.widget.twitter.loadTweets(postData,jthis.parent().next());
        });
        //view one alert all tweets on map
        $("#universe_widget_column").undelegate(".alert_tweets_viewonmap","click").delegate(".alert_tweets_viewonmap","click",function(){
            var markers = EB_View.universe.widget.twitter.markers;
            var jthis = $(this);
            var li = jthis.parent().parent().parent();
            var siblings = li.siblings();
            siblings.each(function(){
                var sibling=$(this);
                sibling.find(".alert_tweets_viewonmap").removeClass("show");
                sibling.find(".tweet_viewonmap").removeClass("show");
                sibling.find(".w-contentblock").removeClass("highlighted_w-contentblock");
            });
            if(!jthis.hasClass("show")){
                li.children(".tweetsList").find(".tweet_viewonmap").each(function(i){
                    var firstMarker = null;
                    var jdom=$(this);
                    jdom.addClass("show");
                    jdom.parent().next().addClass("highlighted_w-contentblock");
                    var marker_=EB_View.universe.tool.createMarkerForWidget(markers,jdom.attr("markerId"),jdom.attr("lon"),jdom.attr("lat"),jdom.attr("icon"),true);
                    if(i==0){
                        firstMarker = marker_;
                    }
                    if(firstMarker)
                        map.setCenter(firstMarker.lonlat);

                });
                jthis.addClass("show");
            }else{
                for(var markerId in markers){
                    if(markers[markerId].display)
                        markers[markerId].display(false);
                }
                jthis.removeClass("show");
                li.children(".tweetsList").find(".tweet_viewonmap").each(function(){
                    $(this).removeClass("show").parent().next().removeClass("highlighted_w-contentblock");
                });
            }
        });
        //view all feeds on map
        $("#universe_widget_column").undelegate(".feedsViewAllOnMap","click").delegate(".feedsViewAllOnMap","click",function(){
            var markers = EB_View.universe.widget.twitter.markers;
            var jthis = $(this);
            var lis = $("#tweets_list").children();
            lis.each(function(){
                var li=$(this);
                li.removeClass("show");
                li.find(".w-contentblock").removeClass("highlighted_w-contentblock");
            });
            if(!jthis.hasClass("show")){
                lis.find(".tweet_viewonmap").each(function(i){
                    var firstMarker = null;
                    var jdom=$(this);
                    jdom.addClass("show");
                    jdom.parent().next().addClass("highlighted_w-contentblock");
                    var marker_=EB_View.universe.tool.createMarkerForWidget(markers,jdom.attr("markerId"),jdom.attr("lon"),jdom.attr("lat"),jdom.attr("icon"),true);
                    if(i==0){
                        firstMarker = marker_;
                    }
                    if(firstMarker)
                        map.setCenter(firstMarker.lonlat);

                });
                jthis.addClass("show");
            }else{
                for(var markerId in markers){
                    if(markers[markerId].display)
                        markers[markerId].display(false);
                }
                jthis.removeClass("show");
                lis.find(".tweet_viewonmap").each(function(){
                    $(this).removeClass("show").parent().next().removeClass("highlighted_w-contentblock");
                });
            }
        });
        //view on map
        $("#universe_widget_column").undelegate(".tweet_viewonmap","click").delegate(".tweet_viewonmap","click",function(){
            var jthis = $(this);
            EB_View.universe.widget.twitter.displayMarkerOfDom(jthis,EB_View.universe.widget.twitter.markers);
        });

        $("#universe_widget_column").undelegate(".follow_user","click").delegate(".follow_user","click",function(){
            EB_View.universe.widget.twitter.followUser($(this));
        });
        EB_View.universe.widget.twitter.loadAlerts({pageNo:1,pageSize:EB_View.universe.widget.twitter.pageSize});
    }
    view.universe.widget.twitter.getTweetsType=function(){
        var tweetsType = $("#selectedTwitterGeoType").val();
        return  tweetsType;
    }
    view.universe.widget.twitter.loadAlerts=function(postData){
        if($("#twitterAlertsTime").get(0).value!="0"){
            postData.time=EB_View.universe.tool.parseSelectTime($("#twitterAlertsTime").get(0).value);
        }
        var tweetsType = EB_View.universe.widget.twitter.getTweetsType();
        postData.tweetsType = tweetsType;
        EB_Common.Ajax.get("/universe/widget/searchTwitterAlerts",postData,function(data){
            EB_Common.logger.log(data);
            var ttl = $("#twitter_threshold_list");
            var t =  data.twitterAlerts;
            ttl.prev().find(".t_a_trigger_num").text(t.totalCount);
            if(t.totalCount==0){
                EB_View.universe.tool.setNoData(ttl);
                return;
            }
            var postData = {pageSize:EB_View.universe.widget.twitter.pageSize};
            EB_View.universe.tool.pagination($("#twitterThresholdPagination"),t.currentPageNo,t.totalPageCount,EB_View.universe.widget.twitter.loadAlerts,[postData]);
            ttl.html($("#twitterThresholdTemplate").render(t.data));
        },"json");
    }
    view.universe.widget.twitter.loadTweets = function(postData,ul,isPagination){
        var tweetsType = EB_View.universe.widget.twitter.getTweetsType();
        postData.tweetsType = tweetsType;
        if(ul.attr("alert_id")){
            postData.alertId = ul.attr("alert_id");
        }
        if(tweetsType=="geo"){
            isPagination=false;
        }else{
            isPagination=true;
        }
        EB_Common.Ajax.get("/universe/widget/searchTweets",postData,function(data){
            EB_Common.logger.log(data);
            ul.prev().find(".tweetsCount").html(data.tweetDataPage.totalCount);
            ul.prev().prev().find(".tweetsCount").html(data.tweetDataPage.totalCount);
            if(data.tweetDataPage.totalCount==0){
                ul.parent().children(":first").find(".alert_tweets_viewonmap").hide();
                EB_View.universe.tool.setNoData(ul,EB_View.universe.widget.twitter.markers);
                return;
            }
            var isShowAllOnMap = ul.parent().children(":first").find(".alert_tweets_viewonmap").hasClass("show");
            function loadMarkers(messages,clearPreview){
                var markers = EB_View.universe.widget.twitter.markers;
                for(var markerId in markers){
                    if(markers[markerId].display)
                        markers[markerId].display(false);
                }
                var marker=null;
                var icon = ul.attr("icon");
                for(var i=0;i<messages.length;i++){
                    var message=messages[i];
                    if(message.location && message.location.lon && message.location.lat){
                        if(isShowAllOnMap){
                            message.show="true";
                        }
                        message.icon = icon;
                        var markerHtml=$("#tweetMarkerTemplate").render(message);
                        var marker_ = EB_View.universe.tool.createMarkerForWidget(markers,"tweets"+message.id,message.location.lon,message.location.lat,message.icon,isShowAllOnMap,markerHtml);
                        if(!marker){
                            marker = marker_;
                        }
                    }
                }
                if(marker && isShowAllOnMap){
                    map.setCenter(marker.lonlat);

                }
            }
            loadMarkers(data.tweetDataPage.data,isShowAllOnMap);
            ul.parent().find("tweetsCount").text(data.tweetDataPage.totalCount);
            if(isPagination){
                EB_View.universe.tool.pagination(ul.next(),data.tweetDataPage.currentPageNo,data.tweetDataPage.totalPageCount,EB_View.universe.widget.twitter.loadTweets,[postData,ul,isPagination]);
            }else{
                ul.next().hide();
            }
            ul.html($("#tweetsTemplate").render(data.tweetDataPage.data));
            ul.parent().children(":first").find(".alert_tweets_viewonmap").show();
        },"json");
    };
    view.universe.widget.twitter.displayMarkerOfDom=function(jdom,markers){
        var marker=null;
        if(markers[jdom.attr("markerId")]){
            var marker = markers[jdom.attr("markerId")];
            if(jdom.hasClass("show")){
                marker.display(false);
                jdom.removeClass("show");
                jdom.parent().next().removeClass("highlighted_w-contentblock");
            }else{
                jdom.addClass("show");
                marker.display(true);
                map.setCenter(marker.lonlat);
                jdom.parent().next().addClass("highlighted_w-contentblock");
            }
            return;
        }
        marker =EB_View.universe.tool.createMarkerForWidget(markers,jdom.attr("markerId"),jdom.attr("lon"),jdom.attr("lat"),jdom.attr("icon"),false);
        map.setCenter(marker.lonlat);
        jdom.addClass("show");
    };
    view.universe.widget.twitter.followUser=function(jdom){
        var postData={follow:!(jdom.attr("follow")=="true"),screenName:jdom.attr("screen_name")};
        function excute(){
            $(this).dialog("close");
            EB_Common.Ajax.get("/universe/widget/followUser",postData,function(){
                var follow = postData.follow;
                jdom.attr("follow",follow);
                var title = "";
                if(follow){
                    title = i18n["universe.widget.twitter.untrack.title"]
                }else{
                    title = i18n["universe.widget.twitter.track.title"]
                }
                jdom.attr("title",title);
                var screen_name = jdom.attr("screen_name");
                jdom.parent().parent().siblings().find(".follow_user").each(function(){
                    var jthis = $(this);
                     if(jthis.attr("screen_name")==screen_name)
                     {
                         jthis.attr("title",title).attr("follow",follow);
                     }
                });
                $("#twitterFeedsRefresh").data("refresh",true);
            },"json");
        }
        if(postData.follow){
            EB_Common.dialog.confirm(i18n["universe.widget.twitter.track.prompt"]+postData.screenName+"?","",excute);
        }else{
            EB_Common.dialog.confirm(i18n["universe.widget.twitter.untrack.prompt"]+postData.screenName+"?","",excute);
        }
    }
})(EB_View)