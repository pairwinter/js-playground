(function(view){
    view.universe={};
    view.universe.ebControl={
        everbridgeSearchContact:null,
        everbridgePolygonContacts:null,
        everbridgeSaveRegion:null,
        everbridgeSelectedContacts:null
    };
    view.universe.xyzLayers=[];
    view.universe.displayXYZlayer=function(display){
        var xyzLayers = EB_View.universe.xyzLayers;
        for(var i=0;i<xyzLayers.length;i++){
            if(xyzLayers[i]){
                xyzLayers[i].setVisibility(display);
            }
        }
    };
    view.universe.tmp={newAddFeatures:[]};
    view.universe.tool={
        AutoSizeAnchoredMaxSize : OpenLayers.Class(OpenLayers.Popup.Anchored, {'autoSize': true,'minSize': new OpenLayers.Size(100,100)}),
        AutoSizeFramedCloudMaxSize : OpenLayers.Class(OpenLayers.Popup.FramedCloud, {'autoSize': true,'minSize': new OpenLayers.Size(100,100)}),
        WidgetMakerFramedCloud : OpenLayers.Class(OpenLayers.Popup.FramedCloud, {'autoSize': true,'minSize': new OpenLayers.Size(200,120)}),
        createPopupForUniverse:function(layer,ll,popupClass,popupContentHTML,closeBox,overflow){
            var feature = new OpenLayers.Feature(layer, ll);
            feature.closeBox = !!closeBox;
            feature.popupClass = popupClass;
            feature.data.popupContentHTML = popupContentHTML;
            feature.data.overflow = (!!overflow) ? "auto" : "hidden";
            var popup = feature.createPopup(!!closeBox);
            return popup;
        },
        createMarkerForUniverse: function (markerLayer,ll, popupContentHTML,setting) {
            var size = new OpenLayers.Size(7,7);
            var offset = new OpenLayers.Pixel(-(size.w/2), -size.h/2);
            var icon = new OpenLayers.Icon(EB_Common.Ajax.ctx+"/statics/stylesheets/universe/img/point.png", size, offset);
            var options = {
                popupClass:EB_View.universe.tool.AutoSizeFramedCloudMaxSize,
                closeBox:false,
                overflow:true,
                icon:icon
            };
            if(setting){
                options = $.extend(options,setting);
            }
            var feature = new OpenLayers.Feature(markerLayer, ll);
            feature.closeBox = options.closeBox;
            feature.popupClass = options.popupClass;
            feature.data.popupContentHTML = popupContentHTML;
            feature.data.overflow = (options.overflow) ? "auto" : "hidden";
            feature.data.icon=options.icon;
            var marker = feature.createMarker();
            var markerClick = function (evt) {
                if (this.popup == null) {
                    this.popup = this.createPopup(this.closeBox);
                    map.addPopup(this.popup);
                    this.popup.show();
                } else {
                    this.popup.toggle();
                }
                OpenLayers.Event.stop(evt);
            };
            marker.events.register("mouseover", feature, markerClick);
            marker.events.register("mouseout", feature, markerClick);
            markerLayer.addMarker(marker);
            return marker;
        },
        escapeXML:function(t){
            if(!this.escapeXMLContainer)
                this.escapeXMLContainer=$("<span>").empty();
            var tt = this.escapeXMLContainer.text(t).html();
            var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
            tt = tt.replace(exp,"<a href='$1' target='_blank'>$1</a>");
            return tt;
        },
        disabledButton:function(jButton,isDisabled){
            if(isDisabled){
                jButton.removeClass("orange").addClass("gray").addClass("save_disabled").attr("disabled","disabled");
            }else{
                jButton.removeClass("gray").removeClass("save_disabled").addClass("orange").removeAttr("disabled");
            }
        }
    };
    view.universe.widget={
        notification:{load:false},
        twitter:{
            load:false,
            pageSize:30,
            markers:{}
        },
        weather:{
            pageSize:20,
            notificationData:null,
            warningPolygons:{}
        },
        recipientapp:{
            unsolicited:"unsolicited",
            solicited:"solicited",
            pageSize:20,
            loadCategory:false,
            notificationData:null,
            marker:null,
            markers:{},
            solicitedMarkers:{}
        },
        report:{}
    };
    view.universe.adjustWindow=function(){
        var jwindow=EB_View.universe.window=EB_View.universe.window?EB_View.universe.window:$(window);
        var windowHeight=Math.max(jwindow.height(),700);
        var topbox=EB_View.universe.topbox=EB_View.universe.topbox?EB_View.universe.topbox:$("#wrapper .topbox :first");
        var footer=EB_View.universe.footer=EB_View.universe.footer?EB_View.universe.footer:$("#footer");
        var otherHeight = topbox.outerHeight()+footer.outerHeight();
        var jcontainer=EB_View.universe.jcontainer=EB_View.universe.jcontainer?EB_View.universe.jcontainer:$("#container");
        var jmap=EB_View.universe.jmap=EB_View.universe.jmap?EB_View.universe.jmap:$("#map");
        var juniverseWidgetNav=EB_View.universe.universeWidgetNav=EB_View.universe.universeWidgetNav?EB_View.universe.universeWidgetNav:$("#universe_widget_nav");
        var juniverseWidgets=EB_View.universe.jwidgetsContainer=EB_View.universe.jwidgetsContainer?EB_View.universe.jwidgetsContainer:$("#universe_widget");
        var jnotificationWidget=EB_View.universe.jnotificationWidget=EB_View.universe.jnotificationWidget?EB_View.universe.jnotificationWidget:$("#notification_widget");
        EB_View.universe.windowHeight=windowHeight;
        var mapAreaHeight = windowHeight-otherHeight-20;
        jmap.height(mapAreaHeight-2);
        jcontainer.height(mapAreaHeight-2);
        var windowWidth = Math.max(jwindow.width(),1000);
        EB_View.universe.windowWidth=windowWidth;
        jcontainer.width(windowWidth);
        EB_Common.logger.log(jwindow.height()+","+jwindow.width());
        var jnotificationWidgetWidth=jnotificationWidget.is(":visible")?jnotificationWidget.width():0;
        if(jnotificationWidgetWidth>100){
            var w = Math.floor(windowWidth/3);
            jnotificationWidget.width(w);
            juniverseWidgets.css("left",w);
            jnotificationWidgetWidth=w;
        }else if(jnotificationWidgetWidth == 0){
            juniverseWidgets.css("left",0);
        }
        var juniverseWidgetsWidth = juniverseWidgets.is(":visible")?juniverseWidgets.width():0;
        if(juniverseWidgetsWidth>100){
            var w = Math.floor(windowWidth/2);
            if($("#universe_layer_12").hasClass("selected")){
                w = Math.floor(windowWidth/3);
            }
            juniverseWidgetsWidth=w;
            juniverseWidgets.width(w);
            juniverseWidgets.css("left",jnotificationWidgetWidth);
        }
        jmap.width(windowWidth-juniverseWidgetsWidth-jnotificationWidgetWidth);
        $("#notification_widget_nav").height(mapAreaHeight-3);
        juniverseWidgetNav.height(mapAreaHeight-3);
        $("#send_notification").height(juniverseWidgets.height()-1-41);
        $("#universe_widget_column").height(mapAreaHeight-3-104);
        if(map && map.updateSize)
            map.updateSize();
    };
    view.universe.destroyFeaturesPopup=function(features){
        if(!features && features.length==0) return;
        var featuresLength =  features.length;
        for(var i=0;i<featuresLength;i++){
            var popup = features[i].popup;
            if(!popup)
                continue;
            map.removePopup(popup);
            popup.destroy();
        }
    };
    view.universe.destroyMapPopup=function(){
        //destroy native popups (i.e. for dots rendered as part of tiles--not dynamically drawn)
        while( map.popups.length) {
          var popup = map.popups[0];
          map.removePopup( popup );
          popup.destroy();
        }
    }
})(EB_View);
// remove feature control
var RemoveFeature={
    geometryTypes: null,
    onDone: function(feature) {},
    layer: null,
    feature: null,
    selectControl: null,
    initialize: function(layer, options) {
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        this.layer = layer;
        var control = this;
        this.selectControl = new OpenLayers.Control.SelectFeature(layer,
            {geometryTypes: this.geometryTypes,
                onSelect: function(feature) {
                    control.onSelect.apply(control, [feature]);
                    function onPopupClose(){
                        map.removePopup(feature.popup);
                        feature.popup.destroy();
                    }
                    //var html = "<input type='button' value='Remove'/><input type='button' value='Cancel'/>";
                    var html = "<div class='popup_remove_polygon'></div>";
                    var popup = new OpenLayers.Popup.Anchored("chicken",feature.geometry.getBounds().getCenterLonLat(),new OpenLayers.Size(16,16),html,null, false, onPopupClose);
                    feature.popup = popup;
                    map.addPopup(popup);
                    $(popup.div).css("background-color","transparent");
                    var dom = popup.contentDiv;
                    $(dom).find(".popup_remove_polygon").click(function(){
                        control.remove(feature);
                    });
//                    var lonlat = feature.geometry.getBounds().getCenterLonLat();
//                    var removePoint = new OpenLayers.Feature.Vector(
//                        new OpenLayers.Geometry.Point(lonlat.lon,lonlat.lat), {
//                            type: 5 + parseInt(5 * Math.random())
//                        }
//                    );
//                    removePoint.register("click",function(e){alert(e)});
//                    feature.removePoint=removePoint;
//                    layer.addFeatures([removePoint]);
//                    var size = new OpenLayers.Size(21,25);
//                    var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
//                    var icon = new OpenLayers.Icon('http://www.openlayers.org/dev/img/marker.png', size, offset);
//                    var marker = new OpenLayers.Marker(feature.geometry.getBounds().getCenterLonLat(),icon);
//                    marker.events.register("mousedown", feature, function (evt) {
//                        feature.popup.toggle();       
//                        OpenLayers.Event.stop(evt);
//                    });
//                    markersLayer.addMarker(marker);
                },
                onUnselect: function(feature) {
                    control.onUnselect.apply(control, [feature]);
                    map.removePopup(feature.popup);
                    feature.popup.destroy();
                },
                clickout:true,toggle:false,multiple:false,hover:false});
    },
    destroy: function() {
        this.layer = null;
        this.selectControl.destroy();
        OpenLayers.Control.prototype.destroy.apply(this, []);
    },
    activate: function() {
        return (this.selectControl.activate() &&
            OpenLayers.Control.prototype.activate.apply(this, arguments));
    },
    deactivate: function() {
        // the return from the handler is unimportant in this case
        if(this.feature && this.feature.popup){
            map.removePopup(this.feature.popup);
        }
        this.selectControl.unselectAll();
        this.selectControl.deactivate();
        return OpenLayers.Control.prototype.deactivate.apply(this, arguments);
    },
    onSelect: function(feature) {
        this.feature = feature;
    },
    onUnselect: function(feature) {
        this.feature = null;
    },
    remove: function(feature) {
        if(feature.popup)
            map.removePopup(feature.popup);
        this.layer.removeFeatures([feature]);
        this.onDone(feature);
        feature.destroy();
    },
    setMap: function(map) {
        this.selectControl.setMap(map);
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
    },
    CLASS_NAME: "OpenLayers.Control.RemoveFeature"
};
OpenLayers.Control.RemoveFeature = OpenLayers.Class(OpenLayers.Control, RemoveFeature);
var GisPanel = {
    panel_head:null,
    panel_body:$('<div class="everbridge_gis_panel_body" id="everbridge_gis_panel_body"><ul id="everbridge_gis_panel_body_ul"></ul></div>'),
    controls: null,
    defaultControl: null,
    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        this.controls = [];
    },
    destroy: function() {
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
        for(var i = this.controls.length - 1 ; i >= 0; i--) {
            OpenLayers.Event.stopObservingElement(this.controls[i].panel_div);
            this.controls[i].panel_div = null;
        }
    },
    activate: function() {
        if (OpenLayers.Control.prototype.activate.apply(this, arguments)) {
            for(var i = 0; i < this.controls.length; i++) {
                if (this.controls[i] == this.defaultControl) {
                    this.controls[i].activate();
                }
            }
            this.redraw();
            return true;
        } else {
            return false;
        }
    },
    deactivate: function() {
        if (OpenLayers.Control.prototype.deactivate.apply(this, arguments)) {
            for(var i = 0; i < this.controls.length; i++) {
                this.controls[i].deactivate();
            }
            this.redraw();
            return true;
        } else {
            return false;
        }
    },
    draw: function() {
        var toolbar=$('#map_toolbar').clone();
        $("#map_toolbar").remove();
        toolbar.find("#triggerSelectContacts").click(function(){
            EB_View.universe.ebControl.everbridgeSelectedContacts.activate();
        });
        toolbar.find("#send_notification_btn").click(function(){
            EB_View.universe.widget.showSendNotification(2);
        });
        this.panel_head = toolbar.show();
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        for (var i = 0; i < this.controls.length; i++) {
            this.map.addControl(this.controls[i]);
            this.controls[i].deactivate();
        }
        this.activate();
        var control=this;
        this.panel_head.find(".univ-select-contact a").click(function(e){
            var head= $(this);
            if(head.hasClass("everbridge_gis_panel_open")){
                head.removeClass("title-tri_white_down").addClass("title-tri_white_up");
                head.removeClass("everbridge_gis_panel_open");
                control.panel_body.slideUp(100);
            }else{
                head.removeClass("title-tri_white_up").addClass("title-tri_white_down");
                head.addClass("everbridge_gis_panel_open");
                control.panel_body.slideDown(100);
            }
            e.stopPropagation();
        });
        OpenLayers.Event.observe(this.div, "mouseup", OpenLayers.Function.bindAsEventListener(this.mouseUp, this));
        OpenLayers.Event.observe(this.div, "click", this.ignoreEvent);
        OpenLayers.Event.observe(this.div, "mousedown", OpenLayers.Function.bindAsEventListener(this.mouseDown, this));
        OpenLayers.Event.observe(this.div, "dblclick", this.ignoreEvent);
        this.div.style.height="40px";
        this.div.style.width="100%";
        return this.div;
    },
    redraw: function() {
        for (var i = 0; i < this.controls.length; i++) {
            var element = this.controls[i].panel_div;
        }
        var ul = this.panel_body.find('#everbridge_gis_panel_body_ul');
        ul.empty();
        if (this.active) {
            for (var i = 0; i < this.controls.length; i++) {
                var c = this.controls[i];
                var holder = null
                if(c.placeholder){
                    holder = $('<li class="control_placeholder">'+ c.placeholder+'</li>');
                    ul.append(holder);
                }
                var element = c.panel_div;
                ul.append(element);
            }
        }
        var panel = $(this.div);
        panel.append(this.panel_head).append(this.panel_body);
    },
    activateControl: function (control) {
        if (!this.active) { return false; }
        if (control.type == OpenLayers.Control.TYPE_BUTTON) {
            control.trigger();
            return;
        }
        if (control.type == OpenLayers.Control.TYPE_TOGGLE) {
            if (control.active) {
                control.deactivate();
            } else {
                control.activate();
            }
            return;
        }
        for (var i = 0; i < this.controls.length; i++) {
            if (this.controls[i] == control) {
                control.activate();
            } else {
                if (this.controls[i].type != OpenLayers.Control.TYPE_TOGGLE) {
                    this.controls[i].deactivate();
                }
            }
        }
    },
    addControls: function(controls) {
        if (!(controls instanceof Array)) {
            controls = [controls];
        }
        this.controls = this.controls.concat(controls);

        for (var i = 0; i < controls.length; i++) {
            var c=controls[i];
            if (!((typeof c.displayInPanel) == "undefined" || c.displayInPanel)) {
                continue;
            }
            var $li=$("<li class='control_li'><a href='javascript:void(0)'>"+c.text+"</a></li>");
            $li.addClass(c.displayClass+"Li").addClass(c.displayClass+"ItemInactive");
            controls[i].panel_div = $li[0];
            OpenLayers.Event.observe(controls[i].panel_div, "click", OpenLayers.Function.bind(this.onClick, this, controls[i]));
        }
        // map.addControl() has already been called on the panel
        if (this.map) {
            for (var i = 0; i < controls.length; i++) {
                this.map.addControl(controls[i]);
                controls[i].deactivate();
            }
            this.redraw();
        }
    },
    onClick: function (ctrl, evt) {
        OpenLayers.Event.stop(evt ? evt : window.event,true);
        this.activateControl(ctrl);
    },
    ignoreEvent: function(evt) {
        OpenLayers.Event.stop(evt,true);
    },
    mouseDown: function(evt) {
        this.isMouseDown = true;
        this.ignoreEvent(evt);
    },
    mouseUp: function(evt) {
        if (this.isMouseDown) {
            this.isMouseDown = false;
            this.ignoreEvent(evt);
        }
    },
    CLASS_NAME: "OpenLayers.Control.GisPanel"
};
OpenLayers.Control.GisPanel = OpenLayers.Class(OpenLayers.Control, GisPanel);
var BaseDialogControl = {
    minimizeDiv: null,
    maximizeDiv: null,
    maximizeControl: function(e) {
        $("#map .baseDialogControl").hide();
        var $div = $(this.div);
        $div.show();
        var left=$("#everbridge_gis_panel_body").outerWidth();
        left=left+2;
        $div.css("left",left+"px");
        var li = $("#everbridge_gis_panel_body_ul ."+this.displayClass+"Li :first");
        var top = "42px";
//        if(li.length>0){
//            top=(li.position().top)+"px"
//        }else{
//            var left=($("#triggerSelectContacts").position().left)+"px";
//            $div.css("left",left);
//        }
        $div.css("top",top);
        this.showControls(true);
        if (e != null) {
            OpenLayers.Event.stop(e);
        }
        if(!window.dialogPanelIndex)
        {
            var zIndex = $div.css("zIndex");
            window.dialogPanelIndex=100+parseInt(zIndex);
        }
        $div.css("zIndex",window.dialogPanelIndex++);
        //disabled polygon operations
        $("#gis_polygon_tools").children(".on").trigger("click");
    },
    minimizeControl: function(e) {
        $(this.div).hide();
        this.showControls(false);
        if (e != null) {
            OpenLayers.Event.stop(e);
        }
    },
    showControls: function(minimize) {
        //this.maximizeDiv.style.display = minimize ? "" : "none";
        this.minimizeDiv.style.display = !minimize ? "none" : "";
    },
    createBaseDialog:function(title){
        var $div=$(this.div);
        $div.addClass("baseDialogControl").append("<p class='baseDialogControlHeader'>"+title+"<i class='icon_drag'></i></p>");
        $div.draggable({containment:"parent",handle:".baseDialogControlHeader"});
        $div.mousedown(function(){
            if(!window.dialogPanelIndex)
            {
                var zIndex = $div.css("zIndex");
                window.dialogPanelIndex=100+parseInt(zIndex);
            }
            $div.css("zIndex",window.dialogPanelIndex++);
        });
        // minimize button div
        this.minimizeDiv = $("<div class='base_dialog_control_close'></div>").get(0);
        this.minimizeDiv.style.display = "none";
        OpenLayers.Event.observe(this.minimizeDiv, "click",
            OpenLayers.Function.bindAsEventListener(this.minimizeControl, this)
        );
        $div.removeAttr("title");
        this.div.appendChild(this.minimizeDiv);
    },
    ignoreEvent: function(evt) {
        OpenLayers.Event.stop(evt,true);
    },
    mouseDown: function(evt) {
        this.isMouseDown = true;
        this.ignoreEvent(evt);
    },
    mouseUp: function(evt) {
        if (this.isMouseDown) {
            this.isMouseDown = false;
            this.ignoreEvent(evt);
        }
    }
};
OpenLayers.Control.BaseDialogControl = OpenLayers.Class(OpenLayers.Control, BaseDialogControl);
var BaseMapLayerSwitcher={
    activate: function() {this.maximizeControl();},
    deactivate: function() {},
    layerStates: null,
    layersDiv: null,
    baseLayersDiv: null,
    baseLayers: null,
    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
        this.layerStates = [];
    },
    destroy: function() {
        OpenLayers.Event.stopObservingElement(this.div);
        OpenLayers.Event.stopObservingElement(this.minimizeDiv);
        OpenLayers.Event.stopObservingElement(this.maximizeDiv);
        //clear out layers info and unregister their events
        this.clearLayersArray("base");
        //this.clearLayersArray("data");
        this.map.events.unregister("addlayer", this, this.redraw);
        this.map.events.unregister("changelayer", this, this.redraw);
        this.map.events.unregister("removelayer", this, this.redraw);
        this.map.events.unregister("changebaselayer", this, this.redraw);
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },
    setMap: function(map) {
        OpenLayers.Control.prototype.setMap.apply(this, arguments);

        this.map.events.register("addlayer", this, this.redraw);
        this.map.events.register("changelayer", this, this.redraw);
        this.map.events.register("removelayer", this, this.redraw);
        this.map.events.register("changebaselayer", this, this.redraw);
    },
    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this);
        this.createBaseDialog(this.text);
        this.loadContents();
        // set mode to minimize
        if(!this.outsideViewport) {
            this.minimizeControl();
        }
        // populate div with current info
        this.redraw();
        return this.div;
    },
    clearLayersArray: function(layersType) {
        var layers = this[layersType + "Layers"];
        if (layers) {
            for(var i=0; i < layers.length; i++) {
                var layer = layers[i];
                OpenLayers.Event.stopObservingElement(layer.inputElem);
                OpenLayers.Event.stopObservingElement(layer.labelSpan);
            }
        }
        this[layersType + "LayersDiv"].innerHTML = "";
        this[layersType + "Layers"] = [];
    },
    checkRedraw: function() {
        var redraw = false;
        if ( !this.layerStates.length ||
            (this.map.layers.length != this.layerStates.length) ) {
            redraw = true;
        } else {
            for (var i=0; i < this.layerStates.length; i++) {
                var layerState = this.layerStates[i];
                var layer = this.map.layers[i];
                if ( (layerState.name != layer.name) ||
                    (layerState.inRange != layer.inRange) ||
                    (layerState.id != layer.id) ||
                    (layerState.visibility != layer.visibility) ) {
                    redraw = true;
                    break;
                }
            }
        }
        return redraw;
    },
    redraw: function() {
        if (!this.checkRedraw()) {
            return this.div;
        }
        //clear out previous layers
        this.clearLayersArray("base");

        this.layerStates = new Array(this.map.layers.length);
        for (var i = 0; i < this.map.layers.length; i++) {
            var layer = this.map.layers[i];
            this.layerStates[i] = {
                'name': layer.name,
                'visibility': layer.visibility,
                'inRange': layer.inRange,
                'id': layer.id
            };
        }
        var layers = this.map.layers.slice();
        for( var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var baseLayer = layer.isBaseLayer;
            if (baseLayer && layer.displayInLayerSwitcher) {
                var checked = (baseLayer) ? (layer == this.map.baseLayer) : layer.getVisibility();
                // create input element
                var $inputElem = $("<input type='"+((baseLayer) ? "radio" : "checkbox")+"' "+(checked?"checked='checked'":"")+" id='"+("input_" + layer.name)+"' name='"+((baseLayer) ? "baseLayers" : layer.name)+"' value='"+(layer.name)+"'/>");
                var inputElem=$inputElem[0];
                if (!baseLayer && !layer.inRange) {inputElem.disabled = true;}
                var context = {'inputElem': inputElem,'layer': layer,'layerSwitcher': this};
                OpenLayers.Event.observe(inputElem, "mouseup", OpenLayers.Function.bindAsEventListener(this.onInputClick,context));
                // create span
                var labelSpan = document.createElement("span");
                if (!baseLayer && !layer.inRange) { labelSpan.style.color = "gray";}
                labelSpan.innerHTML = layer.name;
                OpenLayers.Event.observe(labelSpan, "click", OpenLayers.Function.bindAsEventListener(this.onInputClick,context));
                var groupArray = (baseLayer) ? this.baseLayers : this.dataLayers;
                groupArray.push({'layer': layer,'inputElem': inputElem,'labelSpan': labelSpan});
                var $li = $('<li></li>');
                $li.append(inputElem).append(labelSpan);
                this.baseLayersDiv.appendChild($li[0]);
            }
        }
        return this.div;
    },
    onInputClick: function(e) {
        if (!this.inputElem.disabled) {
            if (this.inputElem.type == "radio") {
                this.inputElem.checked = true;
                this.layer.map.setBaseLayer(this.layer);
            } else {
                this.inputElem.checked = !this.inputElem.checked;
                this.layerSwitcher.updateMap();
            }
        }
        OpenLayers.Event.stop(e);
    },
    onLayerClick: function(e) {
        this.updateMap();
    },
    updateMap: function() {
        // set the newly selected base layer
        for(var i=0; i < this.baseLayers.length; i++) {
            var layerEntry = this.baseLayers[i];
            if (layerEntry.inputElem.checked) {
                this.map.setBaseLayer(layerEntry.layer, false);
            }
        }
    },
    /**
     * Method: loadContents
     * Set up the labels and divs for the control
     */
    loadContents: function() {

        var $div=$(this.div);
        $div.addClass("everbridge_gis_basemap");
        //OpenLayers.Event.observe(this.div, "mouseup", OpenLayers.Function.bindAsEventListener(this.mouseUp, this));
        OpenLayers.Event.observe(this.div, "click", this.ignoreEvent);
        OpenLayers.Event.observe(this.div, "mousedown", OpenLayers.Function.bindAsEventListener(this.mouseDown, this));
        OpenLayers.Event.observe(this.div, "dblclick", this.ignoreEvent);

        // layers list div
        var $layerDiv = $('<div class="everbridge_gis_basemap_list"></div>');
        var $baseMapUL=$('<ul class="everbridge_gis_basemap_ul"></ul>');
        $layerDiv.append($baseMapUL);
        this.layersDiv = $layerDiv[0];
        this.baseLayersDiv=$baseMapUL[0];
        this.div.appendChild(this.layersDiv);
    },
    CLASS_NAME: "OpenLayers.Control.BaseMapLayerSwitcher"
};
OpenLayers.Control.BaseMapLayerSwitcher = OpenLayers.Class(OpenLayers.Control.BaseDialogControl, BaseMapLayerSwitcher);
var OverLayerSwitcher = {
    activate: function() {
        this.maximizeControl();
    },
    deactivate: function() {
    },
    layerStates: null,
    layersDiv: null,
    dataLayersDiv: null,
    dataLayers: null,
    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
        this.layerStates = [];
    },
    destroy: function() {
        OpenLayers.Event.stopObservingElement(this.div);
        OpenLayers.Event.stopObservingElement(this.minimizeDiv);
        OpenLayers.Event.stopObservingElement(this.maximizeDiv);
        this.clearLayersArray("data");
        this.map.events.unregister("addlayer", this, this.redraw);
        this.map.events.unregister("changelayer", this, this.redraw);
        this.map.events.unregister("removelayer", this, this.redraw);
        this.map.events.unregister("changebaselayer", this, this.redraw);
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },
    setMap: function(map) {
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
        this.map.events.register("addlayer", this, this.redraw);
        this.map.events.register("changelayer", this, this.redraw);
        this.map.events.register("removelayer", this, this.redraw);
        this.map.events.register("changebaselayer", this, this.redraw);
    },
    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this);
        this.createBaseDialog(this.text);
        this.loadContents();
        // set mode to minimize
        if(!this.outsideViewport) { this.minimizeControl(); }
        // populate div with current info
        this.redraw();
        return this.div;
    },
    clearLayersArray: function(layersType) {
        var layers = this[layersType + "Layers"];
        if (layers) {
            for(var i=0; i < layers.length; i++) {
                var layer = layers[i];
                OpenLayers.Event.stopObservingElement(layer.inputElem);
                OpenLayers.Event.stopObservingElement(layer.labelSpan);
            }
        }
        this[layersType + "LayersDiv"].innerHTML = "";
        this[layersType + "Layers"] = [];
    },
    checkRedraw: function() {
        var redraw = false;
        if ( !this.layerStates.length ||
            (this.map.layers.length != this.layerStates.length) ) {
            redraw = true;
        } else {
            for (var i=0; i < this.layerStates.length; i++) {
                var layerState = this.layerStates[i];
                var layer = this.map.layers[i];
                if ( (layerState.name != layer.name) ||
                    (layerState.inRange != layer.inRange) ||
                    (layerState.id != layer.id) ||
                    (layerState.visibility != layer.visibility) ) {
                    redraw = true;
                    break;
                }
            }
        }
        return redraw;
    },
    redraw: function() {
        if (!this.checkRedraw()) {
            return this.div;
        }
        this.clearLayersArray("data");
        this.layerStates = new Array(this.map.layers.length);
        for (var i = 0; i < this.map.layers.length; i++) {
            var layer = this.map.layers[i];
            this.layerStates[i] = {
                'name': layer.name,
                'visibility': layer.visibility,
                'inRange': layer.inRange,
                'id': layer.id
            };
        }

        var layers = this.map.layers.slice();
        if (!this.ascending) { layers.reverse(); }
        for( var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var baseLayer = layer.isBaseLayer;
            if (!baseLayer && layer.displayInLayerSwitcher) {
                if(layer.name=="PointsLayer" || layer.name=="PolygonsLayer" || layer.name=="MarkersLayer"){
                    continue;
                }
                var checked = (baseLayer) ? (layer == this.map.baseLayer) : layer.getVisibility();
                // create input element
                var $inputElem = $("<input type='"+((baseLayer) ? "radio" : "checkbox")+"' "+(checked?"checked='checked'":"")+" id='"+("input_" + layer.name)+"' name='"+((baseLayer) ? "baseLayers" : layer.name)+"' value='"+(layer.name)+"'/>");
                var inputElem=$inputElem[0];
                if (!baseLayer && !layer.inRange) { inputElem.disabled = true; }
                var context = { 'inputElem': inputElem, 'layer': layer, 'layerSwitcher': this };
                OpenLayers.Event.observe(inputElem, "mouseup", OpenLayers.Function.bindAsEventListener(this.onInputClick,context));
                // create span
                var labelSpan = document.createElement("span");
                if (!baseLayer && !layer.inRange) { labelSpan.style.color = "gray"; }
                labelSpan.innerHTML = layer.name;
                labelSpan.style.verticalAlign = (baseLayer) ? "bottom" : "baseline";
                OpenLayers.Event.observe(labelSpan, "click", OpenLayers.Function.bindAsEventListener(this.onInputClick,context));
                var groupArray = (baseLayer) ? this.baseLayers : this.dataLayers;
                groupArray.push({ 'layer': layer, 'inputElem': inputElem, 'labelSpan': labelSpan });
                var $li = $('<li></li>');
                $li.append(inputElem).append(labelSpan);
                this.dataLayersDiv.appendChild($li[0]);
            }
        }
        return this.div;
    },
    onInputClick: function(e) {
        if (!this.inputElem.disabled) {
            if (this.inputElem.type == "radio") {
                this.inputElem.checked = true;
                this.layer.map.setBaseLayer(this.layer);
            } else {
                this.inputElem.checked = !this.inputElem.checked;
                this.layerSwitcher.updateMap();
            }
        }
        OpenLayers.Event.stop(e);
    },
    onLayerClick: function(e) {
        this.updateMap();
    },
    updateMap: function() {
        // set the correct visibilities for the overlays
        for(var i=0; i < this.dataLayers.length; i++) {
            var layerEntry = this.dataLayers[i];
            layerEntry.layer.setVisibility(layerEntry.inputElem.checked);
        }
    },
    loadContents: function() {
        var $div=$(this.div);
        $div.addClass("everbridge_gis_overlayer");
        //OpenLayers.Event.observe(this.div, "mouseup", OpenLayers.Function.bindAsEventListener(this.mouseUp, this));
        OpenLayers.Event.observe(this.div, "click", this.ignoreEvent);
        OpenLayers.Event.observe(this.div, "mousedown", OpenLayers.Function.bindAsEventListener(this.mouseDown, this));
        OpenLayers.Event.observe(this.div, "dblclick", this.ignoreEvent);
        // layers list div
        var $layerDiv = $('<div class="everbridge_gis_overlayer_list"></div>');
        var $overLayerUL=$('<ul class="everbridge_gis_overlayer_ul"></ul>');
        $layerDiv.append($overLayerUL);
        this.layersDiv = $layerDiv[0];
        this.dataLayersDiv=$overLayerUL[0];
        this.div.appendChild(this.layersDiv);
    },
    CLASS_NAME: "OpenLayers.Control.OverLayerSwitcher"
};
OpenLayers.Control.OverLayerSwitcher = OpenLayers.Class(OpenLayers.Control.BaseDialogControl, OverLayerSwitcher);
var SearchContact = {
    searchReset:false,//if click Reset;
    lastSearchParams:{},
    orgAttrHashMap:null,
    searchContactDom:null,
    activate: function() {
        this.maximizeControl();
    },
    deactivate: function() {
    },
    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
    },
    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this);
        this.createBaseDialog(this.text);
        this.loadContents();
        // set mode to minimize
        if(!this.outsideViewport) { this.minimizeControl(); }
        // populate div with current info
        //this.redraw();
        return this.div;
    },
    initData:function(){
        var self = this;
        EB_Common.Ajax.get("/universe/fetchFiltersAndRules",null,function(data){
            EB_Common.logger.log(data);
            var contactFilters = data.contactFilters;
            var contactFilterRules = data.contactFilterRules;
            var operators = data.operators;
            self.orgAttrHashMap = data.orgAttrHashMap;
            if(contactFilters!=null){
                contactFilters = contactFilters.data;
                if(contactFilters!=null && contactFilters.length>0){
                    var dom_contactFilters=['<option value="0">'+i18n["universe.control.searchcontact.rule.selectfilter"]+'</option>'];
                    for ( var i = 0; i < contactFilters.length; i++) {
                        dom_contactFilters.push('<option value="'+contactFilters[i].id+'">'+EB_View.universe.tool.escapeXML(contactFilters[i].name)+'</option>');
                    }
                    $("#search_contact_filter_div select").html(dom_contactFilters.join(""));
                }else{
                    $("#search_contact_filter_div select").html("<option value='0'>"+i18n["universe.control.searchcontact.rule.notexistrule"]+"</option>");
                    EB_View.universe.tool.disabledButton($("#searchContactSubmit"),true);
                }
            }
            var dom_contactFilterRules=['<option value="0">'+i18n["universe.control.searchcontact.filter.selectfield"]+'</option>'];
            if(contactFilterRules){
                var cfrs = EB_View.universe.contactFilterRules={};
                for ( var i = 0; i < contactFilterRules.length; i++) {
                    cfrs[i+""]=contactFilterRules[i];
                    var option  = '<option cfr_index="'+i+'">'+EB_View.universe.tool.escapeXML(contactFilterRules[i].displayName)+'</option>';
                    dom_contactFilterRules.push(option);
                }
            }
            $("#gis_search_contacts_form .contactFilterRules").html(dom_contactFilterRules.join(""));
        },"json");
    },
    loadContents:function(content){
        var self = this;
        var $div = $(this.div);
        this.searchContactDom = $("#gis_search_contacts").clone();
        $("#gis_search_contacts").remove();
        EB_View.universe.tool.disabledButton(this.searchContactDom.find("#searchContactSubmit"),true);
        this.searchContactDom.find(":radio").click(function(){
            EB_View.universe.tool.disabledButton($("#searchContactSubmit"),false);
            if(this.value=="rule"){
                $("#search_contact_rule_div").show();
                $("#search_contact_filter_div").hide();
                if($("#search_contact_rule_div_ul .advanced-search-item").length==0){
                    EB_View.universe.tool.disabledButton($("#searchContactSubmit"),true);
                }
            }else{
                $("#search_contact_rule_div").hide();
                $("#search_contact_filter_div").show();
                if($("#search_contact_filter_div select").get(0).value=="0"){
                    EB_View.universe.tool.disabledButton($("#searchContactSubmit"),true);
                }else{
                    if($("#search_contact_filter_div_ul .advanced-search-item").length==0){
                        EB_View.universe.tool.disabledButton($("#searchContactSubmit"),true);
                    }
                }
            }
        });
        this.advancedSearch = new EB_View.advancedSearch();
        this.advancedSearch.setting.callback.afterRuleAdd=function(){
            EB_View.universe.tool.disabledButton($("#searchContactSubmit"),false);
        };
        this.advancedSearch.setting.callback.afterRuleRemove=function(){
            if($("#searchType1").is(":checked")){
                if($("#search_contact_filter_div_ul .advanced-search-item").length==0){
                    EB_View.universe.tool.disabledButton($("#searchContactSubmit"),true);
                }
            }else{
                if($("#search_contact_rule_div_ul .advanced-search-item").length==0){
                    EB_View.universe.tool.disabledButton($("#searchContactSubmit"),true);
                }
            }
        };
        this.searchContactDom.find("#search_contact_filter_div .select_filter").change(function(){
            var search_contact_review_filter = $("#search_contact_review_filter");
            if(this.value=="0"){
                search_contact_review_filter.hide();
            }else{
                search_contact_review_filter.show();
                EB_Common.Ajax.get("/universe/fetchRulesByFilterId",{filterId:this.value},function(data){
                    var contactFilterRules = data.contactFilterRules;
                    var len =contactFilterRules.length;
                    var search_contact_filter_div_ul = $("#search_contact_filter_div_ul").empty();
                    for ( var i = 0; i < len; i++) {
                        var rule = contactFilterRules[i];
                        var li_dom =self.advancedSearch.addCondtion(rule);
                        search_contact_filter_div_ul.append(li_dom);
                    }
                },"json");
            }
        });
        var self =this;
        this.searchContactDom.find("#gis_search_contacts_form .contactFilterRules").on("change",function(){
            var $this= $(this);
            var cfrs = EB_View.universe.contactFilterRules;
            var option = $this.find("option:selected");
            if(!cfrs) return;
            var contactFilterRule= cfrs[option.attr("cfr_index")];
            var li_dom =self.advancedSearch.addCondtion(contactFilterRule);
            $this.next().children(":first").append(li_dom);
            this.value="0";
        });
        this.searchContactDom.find("#searchContactSubmit").click(function(){
//            self.searchCommit(true);
            if($("#searchType1").is(":checked")){
                $("#search_contact_filter_form").submit();
            }else{
                $("#search_contact_rule_form").submit();
            }
        });
        this.searchContactDom.find("#searchContactReset").click(function(){
            EB_View.universe.tool.disabledButton($("#searchContactSubmit"),true);
            if($("#searchType1").is(":checked")){
                $("#search_contact_review_filter > .contactFilterRules").get(0).value="0";
                $("#search_contact_filter_div_ul").empty();
                $("#search_contact_review_filter").hide().prev().get(0).value="0";
            }else{
                $("#search_contact_rule_div > .contactFilterRules").get(0).value="0";
                $("#search_contact_rule_div_ul").empty();
            }
            if(!self.lastSearchParams.filterRules && !self.lastSearchParams.polygons){
                return;
            }
            map.setCenter(new OpenLayers.LonLat(defaultCenterLon, defaultCenterLat).transform(latlon_proj, spherical_mercator_proj));
            map.zoomTo(eb_zoom_level_to_real[defaultZoomLevel]);
            self.searchReset=true;
            EB_View.universe.displayXYZlayer(true);
            self.searchCommit(true);
        });
        this.searchContactDom.find("#gis_search_contacts_form").delegate("input","keypress",function(e,extraValue){
            if(e.which==13){
                self.searchCommit(true);
            }
        });
        $div.addClass("everbridge_gis_search_contact").append(this.searchContactDom.show());
        this.initData();
        OpenLayers.Event.observe(this.div, "click", this.ignoreEvent);
        OpenLayers.Event.observe(this.div, "mousedown", OpenLayers.Function.bindAsEventListener(this.mouseDown, this));
        OpenLayers.Event.observe(this.div, "dblclick", this.ignoreEvent);
        var filterForm=$div.find("#search_contact_filter_form");
        var ruleForm = $div.find("#search_contact_rule_form");

        EB_Common.validation.validate(filterForm,{submitHandler:function(){
           self.searchCommit(true);
        }});
        EB_Common.validation.validate(ruleForm,{submitHandler:function(){
            self.searchCommit(true);
        }});
    },
    searchCommit:function(isSearchClick){
        this.isSearchClick = isSearchClick;
        if(isSearchClick){
            EB_View.universe.displayXYZlayer(false);
        }
        var params = this.createParam();
        if(isSearchClick){
            this.lastSearchParams = params ;
        }else{
            params.filterIds = this.lastSearchParams.filterIds;
            params.filterRules = this.lastSearchParams.filterRules;
        }
        if((!params.filterIds) && (!params.filterRules) && (!params.polygons)){
            if(map.searchedFeatures)
                pointsMarkersLayer.clearMarkers();
            $("#selectedContactsCount").html(0);
            EB_View.universe.ebControl.everbridgeSearchContact.lastSearchParams={};
            EB_View.universe.widget.setDataToNotificationWidget();
            EB_View.universe.displayXYZlayer(true);
            pointsMarkersLayer.setVisibility(false);
            this.searchReset=false;
            return;
        }
        this.lastSearchParams = params;
        if(!params.filterIds){
            params.filterIds="";
        }
        if(!params.filterRules){
            params.filterRules="";
        }
        if(!params.polygons){
            params.polygons="";
            $("#selectedContactsCount").html(0);
        }
        var url="/universe/searchContact";
        this.showData(url,params);
    },
    createParam:function(){
        var params = {};
        var searchType = $("#gis_search_contacts_form #searchType1").attr("checked")?"filters":"rule";
        var filterIds = $("#search_contact_filter_div select").val();
        var contactFilterIds = [];
        var contactFilterRules=[];
        if(searchType=="filters"){
            if(!!filterIds && filterIds != "0"){
                contactFilterIds.push(filterIds);
            }
            if(contactFilterIds.length>0){
                params.filterRules=this.advancedSearch.getCondition("search_contact_filter_div_ul");
            }
        }else{
            params.filterRules=this.advancedSearch.getCondition("search_contact_rule_div_ul");
        }
        if(params.filterRules=="[]")
            params.filterRules=null;
        var polygons_points = [];
        var is_includes = [];
        loop1:
            for(var pp in gisPolygons){
                var points = [];
                var _points=gisPolygons[pp].components;
                var len = _points.length;
                loop2:
                    for(var i = 0 ; i<len;i++){
                        var lonLat = new OpenLayers.LonLat( _points[i].x ,_points[i].y ).transform(map.getProjectionObject(),latlon_proj);
                        if (lonLat.lon > 180 || lonLat.lon < -180) {
                            gisPolygons[pp].isInvalid = true;
                            EB_Common.dialog.alert(i18n["universe.control.searchcontact.invalidpolygoncoordinates"]);
                            continue loop1;
                        }
                        points.push({x:lonLat.lon,y:lonLat.lat});
                    }
                is_includes.push(gisPolygons[pp].polygonType == "include" ? "true" : "false");
                polygons_points.push(points);
            }
        EB_Common.logger.log(EB_Common.json.stringify(polygons_points));
        if(polygons_points.length>0){
            params.polygons = EB_Common.json.stringify(polygons_points);
            params.polygonIsIncludes = EB_Common.json.stringify(is_includes);
        }
        EB_Common.logger.log(params);
        return params;
    },
    showData:function(url,params){
        var self = this;
        params.thresholdSearchedContact=thresholdSearchedContact;
        EB_Common.Ajax.post(url,params,function(data){
            self.loadComplete(data, params);
        },"json");
    },
    loadComplete:function(data,params){
        EB_Common.logger.log(data);
        if((!this.lastSearchParams.filterIds) && (!this.lastSearchParams.filterRules) && (!this.lastSearchParams.polygons)){
            return;
        }
        var searchedContactsNum=data.contactsDataPage.totalCount;

        if(params.polygons){
            $("#selectedContactsCount").html(searchedContactsNum);
        }
        EB_View.universe.widget.setDataToNotificationWidget();
        if(!params.filterRules){
            pointsMarkersLayer.setVisibility(false);
            EB_View.universe.displayXYZlayer(true);
            return;
        }
        //if not search click, only display search result count
        if(!this.isSearchClick){
            return;
        }
        
        EB_View.universe.destroyMapPopup();

        var contactsAllDataPageNum = data.contactsAllDataPage.totalCount;
        if(contactsAllDataPageNum==0 && this.isSearchClick && params.filterRules){
            EB_Common.dialog.alert(i18n["universe.control.searchcontact.nocontactsfound"]);
            pointsMarkersLayer.clearMarkers();
            return;
        }
        if(contactsAllDataPageNum>thresholdSearchedContact && this.isSearchClick && params.filterRules){
            if(params.filterIds || params.filterRules){
                EB_View.universe.displayXYZlayer(true);
                var message = i18n["universe.control.searchcontact.searchedcontactsexceedmaximum"];
                message = message.replace("{0}",thresholdSearchedContact);
                EB_Common.dialog.alert(message);
                EB_View.universe.ebControl.everbridgeSearchContact.lastSearchParams={};
                EB_View.universe.widget.setDataToNotificationWidget();
            }
            return;
        }
        //markersLayer.setVisibility(false);
        pointsMarkersLayer.clearMarkers();
        if(!map.searchedFeatures){
            map.searchedFeatures=[];
        }
        EB_View.universe.destroyFeaturesPopup(map.searchedFeatures);
        map.searchedFeatures=[];
        pointsMarkersLayer.setVisibility(true);
        var displaySearchedPoints=function(){
            $("#selectedContactsCount").data("displayPoints",true);
            $(this).dialog("close");
            var contacts=data.contactsAllDataPage.data;
            var len = contacts.length;
            var contact = null;
            for(var i = 0 ; i<len ; i++){
                contact = contacts[i];
                if((!contact.address) || contact.address.length==0)
                    continue;
                var alen=contact.address.length;
                for(var a=0;a<alen;a++){
                    var address = contact.address[a];
                    var gisLocation=address.gisLocation;
                    if(!!gisLocation){
                        var lat = gisLocation.lat;
                        var lon = gisLocation.lon;
                        var lonLat = new OpenLayers.LonLat( lon ,lat ).transform(latlon_proj,map.getProjectionObject());
                        var html=[];
                        html.push("<p>"+contact.firstName+" "+contact.lastName+"</p>");
                        html.push("<p>"+address.streetAddress+"</p>");
                        html.push("<p>"+address.city+"</p>");
                        html.push("<p>"+address.postalCode+"</p>");
                        html.push("<p>"+address.country+"</p>");
                        EB_View.universe.tool.createMarkerForUniverse(pointsMarkersLayer,lonLat, html.join(""));
                    }
                }
            }
        };
        EB_Common.dialog.alert(contactsAllDataPageNum+" "+i18n["universe.control.searchcontact.displaypoints"]);
        displaySearchedPoints();
    },
    CLASS_NAME:"OpenLayers.Control.SearchContacts"
};
OpenLayers.Control.SearchContact = OpenLayers.Class(OpenLayers.Control.BaseDialogControl, SearchContact);

var RegionLibrary={
    htmlResourceId:"gis_region_library",
    searchContactDom:null,
    allRegions:null,
    regionLibrary:null,
    activate: function() {
        this.maximizeControl();
    },
    deactivate: function() {
    },
    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
    },
    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this);
        this.createBaseDialog(this.text);
        this.loadContents();
        // set mode to minimize
        if(!this.outsideViewport) { this.minimizeControl(); }
        // populate div with current info
        //this.redraw();
        return this.div;
    },
    maximizeControl:function(e) {
        OpenLayers.Control.BaseDialogControl.prototype.maximizeControl.apply(this);
        var self = this;
        var orgId = $("#map").attr("data-orgId");
        var params = {
            orgId : orgId
        };
        var html = '';
        if(self.allRegions) return;
        EB_Common.Ajax.post("/universe/fetchRegionLib",params,function(data){
            self.regionLibrary = data.regionLibraryDataPage.data;
            if (self.regionLibrary && self.regionLibrary.length > 0) {
                var numItems = self.regionLibrary.length;
                var regionLibraryItem = null;
                for(var i=0; i<numItems; i++) {
                    regionLibraryItem = self.regionLibrary[i];
                    if (regionLibraryItem.fileType == regionLibraryFolder) {
                        var folder_name = $.jgrid.htmlEncode(regionLibraryItem.name);
                        if (folder_name.length >= regionLibraryNameDisplayLengthMax) {
                            folder_name = $.trim(folder_name.substring(0,regionLibraryNameDisplayLengthMax-1)) + "...";
                        }
                        html += '<div class="folder row" id="folder_' + regionLibraryItem.id + '"> \
                                <div class="folder_name" title="' + $.jgrid.htmlEncode(regionLibraryItem.name) + '"> \
                                    <div class="action_expand"></div> \
                                    <span>' + folder_name + '</span> \
                                </div>';
                        if ((!regionLibraryItem.regions) || (regionLibraryItem.regions.length == 0)) {
                            html += '</div>';
                            continue;
                        }
                    } else if (regionLibraryItem.fileType == regionLibraryRegion) {
                        var region_name = $.jgrid.htmlEncode(regionLibraryItem.name);
                        if (region_name.length >= regionLibraryNameDisplayLengthMax) {
                            region_name = $.trim(region_name.substring(0,regionLibraryNameDisplayLengthMax-1)) + "...";
                        }
                        html += '<div class="region"><div class="region_name" title="' + $.jgrid.htmlEncode(regionLibraryItem.name) + '">' + region_name +'</div><div class="action_load" data-regionId="' + regionLibraryItem.id + '">load</div></div>';
                        //populate the allRegions array (used for loading shapes)
                        if (self.allRegions == null) {
                            self.allRegions = [];
                        }
                        self.allRegions[regionLibraryItem.id] = regionLibraryItem.shapes;
                        continue;
                    }
                    var numRegions = regionLibraryItem.regions.length;
                    for (var j=0; j<numRegions; j++) {
                        var region = regionLibraryItem.regions[j];
                        var region_name = $.jgrid.htmlEncode(region.name);
                        if (region_name.length >= regionLibraryNameDisplayLengthMax) {
                            region_name = $.trim(region_name.substring(0,regionLibraryNameDisplayLengthMax-1)) + "...";
                        }
                        html += '<div class="region"><div class="region_name" title="' + $.jgrid.htmlEncode(region.name) + '">' + region_name +'</div><div class="action_load" data-regionId="' + region.id + '">load</div></div>';
                        
                        //populate the allRegions array (used for loading shapes)
                        if (self.allRegions == null) {
                            self.allRegions = [];
                        }
                        self.allRegions[region.id] = region.shapes;
                    }
                    html += '</div>';
                }
                $("#"+self.htmlResourceId).html(html);
            } else {
                $("#"+self.htmlResourceId+" .msg").html(msgRegionLibEmpty);
            }
            self.searchContactDom.find('.folder .folder_name').click(function() {
                var clickFolderId = $(this).parent().attr('id');
                if ($('#' + clickFolderId + ' .region').is(':visible')) {
                    $('#' + clickFolderId + ' .region').hide();
                } else {
                    $('#' + clickFolderId + ' .region').show();
                }
            });
            self.searchContactDom.find('.action_load').click(function() {
                var jthis = $(this);
                var regionId = jthis.attr('data-regionId');
                self.loadRegion(regionId);
                var temp;
            });

        },"json");
    },
    loadContents:function(content){
        var $div = $(this.div);
        this.searchContactDom = $("#"+this.htmlResourceId).clone();
        $("#"+this.htmlResourceId).remove();
        $div.addClass("everbridge_"+this.htmlResourceId).append(this.searchContactDom.show());
        var orgId = $("#map").attr("data-orgId");
        var params = {
            orgId : orgId
        };
        OpenLayers.Event.observe(this.div, "click", this.ignoreEvent);
        OpenLayers.Event.observe(this.div, "mousedown", OpenLayers.Function.bindAsEventListener(this.mouseDown, this));
        OpenLayers.Event.observe(this.div, "dblclick", this.ignoreEvent);
    },
    loadRegion:function(regionId) {
        var region = this.allRegions[regionId];
        var zoom_to_point;
        this.features = [];
        for (var i=0; i<region.length; i++) {
            var shape = region[i].shape;
            var points = shape.points;
            var shape_points=[];
            for (var j=0; j<points.length; j++) {
                var point = new OpenLayers.Geometry.Point(points[j].x, points[j].y);
                point.transform(latlon_proj, map.getProjectionObject());
                shape_points.push(point);
                if (j == 0) {
                    zoom_to_point = new OpenLayers.LonLat(points[j].x, points[j].y).transform(latlon_proj,map.getProjectionObject());
                }
            }
            var linear_ring = new OpenLayers.Geometry.LinearRing(shape_points);
            var polygon = new OpenLayers.Geometry.Polygon([linear_ring]);
            var polygon_feature = new OpenLayers.Feature.Vector(polygon);
            shape.id=polygon_feature.id;
            
            //Set polygon's include/exclude attribute
            var is_include = region[i].include;
            var polygon_style = '';
            if (is_include) {
                polygon_style = {fillColor: polyFillColorDef};
            } else {
                polygon_style = {fillColor: polyFillColorExclude};
            }
            var style = OpenLayers.Util.applyDefaults(polygon_style, OpenLayers.Feature.Vector.style["default"]);
            polygon_feature.style = style;
            polygon_feature.polygonType = is_include ? "include" : "exclude";
            
            this.features.push(polygon_feature);
        }
        polygonsLayer.addFeatures(this.features);
        map.setCenter(zoom_to_point);
        map.zoomTo(9);
    },
    CLASS_NAME: "OpenLayers.Control.RegionLibrary"
};
OpenLayers.Control.RegionLibrary = OpenLayers.Class(OpenLayers.Control.BaseDialogControl, RegionLibrary);

var SearchLocation={
    htmlResourceId:"gis_search_location",
    searchContactDom:null,
    activate: function() {
        this.maximizeControl();
    },
    deactivate: function() {
    },
    searchType:"address",
    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
    },
    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this);
        this.createBaseDialog(this.text);
        this.loadContents();
        if(!this.outsideViewport) { this.minimizeControl(); }
        return this.div;
    },
    loadContents:function(content){
        var self =this;
        var $div = $(this.div);
        this.searchContactDom = $("#"+this.htmlResourceId).clone();
        $("#"+this.htmlResourceId).remove();
        $div.addClass("everbridge_"+this.htmlResourceId).append(this.searchContactDom.show());
        OpenLayers.Event.observe(this.div, "click", this.ignoreEvent);
        OpenLayers.Event.observe(this.div, "mousedown", OpenLayers.Function.bindAsEventListener(this.mouseDown, this));
        OpenLayers.Event.observe(this.div, "dblclick", this.ignoreEvent);
        this.searchContactDom.find(":radio").click(function(){
            if(this.value=="address"){
                $("#search_location_div label").text(i18n["universe.control.searchlocation.address"]);
            }else{
                $("#search_location_div label").text(i18n["universe.control.searchlocation.contact"]);
            }
        });
        this.searchContactDom.find("#search_location_submit").click(function(){
            var url = '';
            var data = {};
            var searchType = ($('#gis_search_location_form #locSearchType1').is(":checked"))?"address":"contact";
            self.searchType=searchType;
            if (searchType == 'address') {
                url = 'universe/searchLocationByAddress';
                data.addressLine = $('#search_location_input').val();
            } else {
                url = 'universe/searchLocationByContact';
                data.contactName = $('#search_location_input').val();
            }
            EB_Common.logger.log(data);
            self.showData(url,data);
        });
        this.searchContactDom.find("#search_location_input").keypress(function(e){
            if(e.which==13){
                $("#search_location_submit").click();
            }
        });
        
        this.searchContactDom.find("input[name='locSearchMarker']").change(function(e) {
            var marker_type = ($("#locSearchMarker1").is(":checked"))?"point":"polygon" ;
            if (marker_type == 'polygon') {
                self.checkRadiusValidity();
            } else {
                $div.find("#gis_search_location_actions input[type='text']").val("");
                $div.find("#gis_search_location_actions .set_marker_disabled").hide();
                $div.find("#gis_search_location_actions .set_marker").show();
            }
        });
        
        this.searchContactDom.find("#gis_search_location_actions input[name='radius']").keypress(function(e){
            var charCode = (e.which) ? e.which : event.keyCode;

            //Allow period (.) only once
            var radius = $div.find("#gis_search_location_actions input[type='text']").val();
            if (charCode == 46 && radius.indexOf('.') == -1) {
                return true;
            }
            
            //Don't allow non-numeric characters
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }

            return true;
        });
        
        
        this.searchContactDom.find("#gis_search_location_actions input[name='radius']").keyup(function(e) {
            $div.find('#locSearchMarker2').attr('checked', 'checked');
            self.checkRadiusValidity();
        });

        this.searchContactDom.find("#gis_search_location_actions input[name='radius']").focus(function(e) {
            $div.find('#locSearchMarker2').attr('checked', 'checked');
            self.checkRadiusValidity();
        });
        
        this.searchContactDom.find("#gis_search_location_form_show").click(function(){
            if($("#gis_search_location_form").is(":hidden")){
                $(this).text("∨");
                $("#gis_search_location_form").slideDown();
                $("#gis_search_location_result").hide();
            }else{
                $(this).text("∧");
                $("#gis_search_location_form").slideUp();
                $("#gis_search_location_result").show();
            }
        });
    },
    checkRadiusValidity:function() {
        var radius = this.searchContactDom.find("#gis_search_location_actions input[type='text']").val();
        var radiusFloat = parseFloat(radius);

        if (!radiusFloat || radiusFloat == 0 || radius.length < 0) {
            this.searchContactDom.find("#gis_search_location_actions .set_marker_disabled").show();
            this.searchContactDom.find("#gis_search_location_actions .set_marker").hide();
        } else {
            this.searchContactDom.find("#gis_search_location_actions .set_marker_disabled").hide();
            this.searchContactDom.find("#gis_search_location_actions .set_marker").show();
        }
    },
    showData:function(url,params){
        var self = this;
        EB_Common.Ajax.post(url,params,function(data){
            $("#gis_search_location_form_show").text("∧");
            $("#gis_search_location_result").show();
            $("#gis_search_location_form").slideUp();
            var trs=[];
            var showActions=!1;
            if(self.searchType=="address"){
                var addresses=data.addressDataPage.data;
                if(addresses.length>0) showActions=!0;
                for(var i = 0;i<addresses.length;i++){
                    trs.push('<p class="contact_address" lon="'+addresses[i].longitude+'" lat="'+addresses[i].latitude+'">'+addresses[i].addressLine+'</p>')
                }
                $("#gis_search_location_result_div").empty().show().append(trs.join(""));
            }else{
                var contacts=data.contactDataPage.data;
                if(contacts.length>0) showActions=!0;
                for(var i = 0;i<contacts.length;i++){
                    var contact = contacts[i];
                    var ps=[];
                    if(contact){
                        var addresses=contact.address;
                        if(addresses){
                            for(var j=0;j<addresses.length;j++){
                                var address=addresses[j];
                                var gisLocation=address.gisLocation;
                                var lonlat="";
                                if(!!gisLocation){
                                    lonlat =" lon="+gisLocation.lon+" lat="+gisLocation.lat+" ";
                                }
                                var e = EB_View.universe.tool.escapeXML;
                                var html=[];
                                html.push('<p>'+contact.firstName+' '+contact.lastName+'</p>');
                                html.push('<p>'+e(address.streetAddress)+'</p>');
                                html.push('<p>'+e(address.city)+'</p>');
                                html.push('<p>'+address.postalCode+'</p>');
                                html.push('<p>'+e(address.country)+'</p>');
                                var p_html = e(address.streetAddress+" "+ address.city + " " + address.postalCode + " " + address.country);
                                ps.push('<p'+lonlat+' class="contact_address">'+p_html+'</p>'+'<div style="display:none">'+html.join('')+'</div>');
                            }
                        }
                    }
                    if(ps.length==0){
                        ps.push("<p class='contact_no_address'>There is no address!</p>");
                    }
                    trs.push('<div class="contact_name">'+contact.firstName+","+contact.lastName+'</div>'+ps.join(""));
                }
                $("#gis_search_location_result_div").empty().show().append(trs.join(""));
            }
            if(showActions){
                $('#gis_search_location_actions').show();
                $('.gis_search_location_result_title #results_exists').show();
                $('.gis_search_location_result_title #results_notexists').hide();
            } else {
                $('#gis_search_location_actions').hide();
                $('.gis_search_location_result_title #results_exists').hide();
                $('.gis_search_location_result_title #results_notexists').show();
            }
            $("#gis_search_location_result_div").unbind("click").click(function(e){
                var dom = $(e.target);
                if(dom.is("p") && dom.hasClass("contact_address")){
                    dom.addClass("on").siblings().removeClass("on");
                }
            }).find(".contact_address:first").addClass("on");
            $("#gis_search_location_actions .set_marker").unbind("click").click(function() {
                var p = $("#gis_search_location_result_div p.on");
                if(p.length>0)
                    self.displayFeature({lon:p.attr("lon"),lat:p.attr("lat"),location:p.next().html()});
            });
        },"json");
    },
    displayFeature:function(address){
        markersLayer.setVisibility(true);
        markersLayer.clearMarkers();
        if(this.features){
            EB_View.universe.destroyFeaturesPopup(this.features);
            polygonsLayer.removeFeatures(this.features);
        }
        this.features=[];
        var marker_type = ($("#locSearchMarker1").is(":checked"))?"point":"polygon" ;
        if (marker_type == 'point') {
            var lonLat = new OpenLayers.LonLat( address.lon ,address.lat ).transform(latlon_proj,map.getProjectionObject());
            var popupContentHTML = '<div>'+address.location+'<div>';

            var size = new OpenLayers.Size(34,34);
            var offset = new OpenLayers.Pixel(-8, -size.h+3);
            var icon = new OpenLayers.Icon(EB_Common.Ajax.ctx+"/statics/stylesheets/universe/img/univ_map_marker.png", size, offset);
            var setting = {
                icon: icon
            }
            var marker = EB_View.universe.tool.createMarkerForUniverse(markersLayer,lonLat,popupContentHTML,setting);
            map.setCenter(marker.lonlat);
        } else {
            var radius = $('#gis_search_location_actions input[name="radius"]').val();
            var radius_units = $('#gis_search_location_actions select[name="radius_units"] option:selected').val();
            //Convert input to meters (generally accepted units for working with maps)
            radius = parseFloat(radius);
            switch(radius_units) {
                case ('m'):break;
                case ('ft'):radius = radius / 3.28084;break;
                case ('mi'):radius = radius / 0.000621371;break;
                case ('km'):radius = radius / 0.001;break;
            }
            var lonlat = new OpenLayers.LonLat(address.lon, address.lat).transform(latlon_proj,map.getProjectionObject());
            //Conversion logic based on info at http://trac.osgeo.org/openlayers/ticket/1375
            var r = 6378137;  //Earth's radius in meters
            var glonlat = OpenLayers.Layer.SphericalMercator.inverseMercator(address.lon, address.lat);
            var lonlat1 = OpenLayers.Layer.SphericalMercator.forwardMercator(glonlat.lon, glonlat.lat - 90 / (Math.PI * r));
            var lonlat2 = OpenLayers.Layer.SphericalMercator.forwardMercator(glonlat.lon, glonlat.lat + 90 / (Math.PI * r));
            var coef = lonlat2.lat - lonlat1.lat;
            radius = radius * coef;
            var radial_polygon = new OpenLayers.Feature.Vector(OpenLayers.Geometry.Polygon.createRegularPolygon(new OpenLayers.Geometry.Point(lonlat.lon,lonlat.lat),radius,40,0));
            this.features.push(radial_polygon);
            map.setCenter(lonlat);
            map.zoomTo(14);
            polygonsLayer.addFeatures(this.features);
        }
    },
    CLASS_NAME: "OpenLayers.Control.SearchLocation"
};
OpenLayers.Control.SearchLocation = OpenLayers.Class(OpenLayers.Control.BaseDialogControl, SearchLocation);
var PolygonTools={
    htmlResourceId:"gis_polygon_tools",
    htmlResourceDom:null,
    polygonCount:0,
    activate: function() {
        this.maximizeControl();
    },
    deactivate: function() {
    },
    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
    },
    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this);
        this.createBaseDialog(this.text);
        this.loadContents();
        // set mode to minimize
        if(!this.outsideViewport) { this.minimizeControl(); }
        // populate div with current info
        //this.redraw();
        return this.div;
    },
    toggleControl:function(jElement) {
        var action = jElement.attr("action");
        if(this.featureControls[action].active){
            this.featureControls[action].deactivate();
            jElement.removeClass("on");
            return;
        }
        jElement.addClass("on");
        jElement.siblings().removeClass("on");
        for (key in this.featureControls) {
            var control = this.featureControls[key];
            if ( action == key) {
                control.activate();
            } else {
                control.deactivate();
            }
        }
    },
    loadContents:function(content){
        var self = this;
        var $div = $(this.div);
        this.htmlResourceDom = $("#"+this.htmlResourceId).clone();
        this.htmlResourceDom.children().click(function(){
            self.toggleControl($(this));
        });
        $("#"+this.htmlResourceId).remove();
        $div.addClass("everbridge_"+this.htmlResourceId).append(this.htmlResourceDom.show());
        OpenLayers.Event.observe(this.div, "click", this.ignoreEvent);
        OpenLayers.Event.observe(this.div, "mousedown", OpenLayers.Function.bindAsEventListener(this.mouseDown, this));
        OpenLayers.Event.observe(this.div, "dblclick", this.ignoreEvent);

        //var searchContactControl =  new OpenLayers.Control.SearchContact();
        var polygonOperateAdd=function(obj){
            EB_Common.logger.log(obj.feature);
            var components = obj.feature.geometry.components;
            if(components){
                var feature= obj.feature;
                if(!feature.geometry.getArea()>0){
                    return;
                }
                gisPolygons[feature.id]=components[0];
                gisPolygons[feature.id].polygonType= feature.polygonType ? feature.polygonType : "include";
                gisPolygons[feature.id].polygonName='Polygon'+ (self.polygonCount++);
                gisPolygons[feature.id].feature=feature;
                var submit = feature.data.submit;
                if(submit == undefined)
                    submit = true;
                if(submit)
                    EB_View.universe.ebControl.everbridgeSearchContact.searchCommit(false);
            }
            //var vertices = feature.geometry.clone().getVertices();
            var vertices = feature.geometry.clone().components[0].components;
            var vert_array = [];
            for (var i=0; i < vertices.length; ++i) {
                //maxExtent: new OpenLayers.Bounds(-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892),
                var lonLat = new OpenLayers.LonLat( vertices[i].x ,vertices[i].y ).transform(spherical_mercator_proj,latlon_proj);
//                if(lonLat.lon>180){
//                    lonLat.lon=180-lonLat.lon;
//                }if(lonLat.lon<-180){
//                    lonLat.lon = -180-lonLat.lon;
//                }
                vert_array.push({x: lonLat.lon, y: lonLat.lat});
                EB_Common.logger.log(vertices[i].x +","+ vertices[i].y+"==="+ lonLat.lon +","+ lonLat.lat);
            }

            var data = {};
            var num_contacts = 0;
            data.vertices = EB_Common.json.stringify(vert_array);
            data.orgId = $("#map").attr("data-orgId");
            EB_Common.logger.log(gisPolygons);
        };
        var polygonOperateModify=function(obj){
            EB_Common.logger.log(obj.feature);
            var components = obj.feature.geometry.components;
            if(components)
                gisPolygons[obj.feature.id]=components[0];
            EB_Common.logger.log(gisPolygons);
            EB_View.universe.ebControl.everbridgeSearchContact.searchCommit(false);
        };
        var polygonOperateDelete=function(obj){
            EB_Common.logger.log(obj.feature);
            if(gisPolygons[obj.feature.id]){
            	var weather_warning_parasitifer = gisPolygons[obj.feature.id].feature.data.weather_warning_parasitifer;
            	if(weather_warning_parasitifer){
            		EB_View.universe.widget.weather.highlight(weather_warning_parasitifer,false);
            	}
            	delete gisPolygons[obj.feature.id];
                EB_Common.logger.log(gisPolygons);
                EB_View.universe.ebControl.everbridgeSearchContact.searchCommit(false);
            }

        };
        polygonsLayer.events.register("featureadded",'', polygonOperateAdd);
        polygonsLayer.events.register("featuremodified",'', polygonOperateModify);
        polygonsLayer.events.register("featureremoved",'', polygonOperateDelete);
        var self =this;
        var featureAdded=function(feature){
            $("#gis_polygon_tools .on").removeClass("on");
            for (key in self.featureControls) {
                self.featureControls[key].deactivate();
            }
        };
        var options = {
            handlerOptions : {
                freehand : true
            },
            featureAdded:featureAdded
        };
        this.featureControls = {
            freeform : new OpenLayers.Control.DrawFeature(polygonsLayer, OpenLayers.Handler.Polygon, options),
            regular: new OpenLayers.Control.DrawFeature(polygonsLayer, OpenLayers.Handler.Polygon, {handlerOptions: {freehand: false},featureAdded:featureAdded}),//绘制多边形的方法
            circle: new OpenLayers.Control.DrawFeature(polygonsLayer, OpenLayers.Handler.RegularPolygon,{handlerOptions: {sides: 40},featureAdded:featureAdded}),
            rotate: new OpenLayers.Control.ModifyFeature(polygonsLayer, {mode:OpenLayers.Control.ModifyFeature.ROTATE | OpenLayers.Control.ModifyFeature.RESIZE}),
            reshape:new OpenLayers.Control.ModifyFeature(polygonsLayer, {mode:OpenLayers.Control.ModifyFeature.RESHAPE}),
            drag : new OpenLayers.Control.ModifyFeature(polygonsLayer,{mode:OpenLayers.Control.ModifyFeature.DRAG,vertexRenderIntent:"point"}),
            select: new OpenLayers.Control.SelectFeature(polygonsLayer,{clickout:true,toggle:false,multiple:false,hover:false,box:true,toggleKey:"ctrlKey",multipleKey:"shiftKey"}),
            remove:new OpenLayers.Control.RemoveFeature(polygonsLayer)
        };
        for ( var key in this.featureControls) {
            this.map.addControl(this.featureControls[key]);
        }
    },
    CLASS_NAME: "OpenLayers.Control.PolygonTools"
};
OpenLayers.Control.PolygonTools = OpenLayers.Class(OpenLayers.Control.BaseDialogControl, PolygonTools);

var SelectedContacts={
    htmlResourceId:"gis_selected_contacts",
    searchContactDom:null,
    activate: function() {
        this.maximizeControl();
    },
    deactivate: function() {
        this.removeHighlights();
        $("#"+this.htmlResourceId).find('.polygons .actions .save_disabled').show();
        $("#"+this.htmlResourceId).find('.polygons .actions .save').hide();
        $("#"+this.htmlResourceId).find('.polygons .heading input[name="polygon"]').attr('checked', false);
    },
    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
    },
    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this);
        this.createBaseDialog(this.text);
        this.loadContents();
        if(!this.outsideViewport) { this.minimizeControl(); }
        return this.div;
    },
    loadContents:function(content){
        var $div = $(this.div);
        var self = this;
        this.searchContactDom = $("#"+this.htmlResourceId).clone();
        $("#"+this.htmlResourceId).remove();
        $div.addClass("everbridge_"+this.htmlResourceId).append(this.searchContactDom.show());
        OpenLayers.Event.observe(this.div, "click", this.ignoreEvent);
        OpenLayers.Event.observe(this.div, "mousedown", OpenLayers.Function.bindAsEventListener(this.mouseDown, this));
        OpenLayers.Event.observe(this.div, "dblclick", this.ignoreEvent);

        this.searchContactDom.find('.clearall').click(function() {
            for(var g in gisPolygons){
                if(gisPolygons[g].isInvalid)
                    delete gisPolygons[g];
            }
            polygonsLayer.removeAllFeatures();
            markersLayer.clearMarkers();
            polygonsLayer.redraw();
            EB_View.universe.ebControl.everbridgeSearchContact.searchCommit(false);
            //Update the Selected Contacts overlay
            $div.find(' .polygons .results').html('');
            self.polygonCheckboxSelectLogic();
        });
        this.searchContactDom.find('.actions .save').click(function() {
            var polygon_points = [];
            var is_includes = [];
            $("#gis_selected_contacts .results input[name='polygon']:checked").each(function() {
                var poly_id = $(this).val();
                var _points = gisPolygons[poly_id].components;
                var len = _points.length;
                var points = [];
                for(var i = 0 ; i<len;i++){
                    var lonLat = new OpenLayers.LonLat( _points[i].x ,_points[i].y ).transform(map.getProjectionObject(),latlon_proj);
                    points.push({x:lonLat.lon,y:lonLat.lat});
                }
                polygon_points.push(points);
                is_includes.push(gisPolygons[poly_id].polygonType == 'include' ? true : false);
            });
            EB_View.universe.ebControl.everbridgeSaveRegion.activate();
            EB_View.universe.ebControl.everbridgeSaveRegion.selectedPolygons = polygon_points;
            EB_View.universe.ebControl.everbridgeSaveRegion.selectedPolygonsIsIncludes = is_includes;
        });
        this.searchContactDom.find('#polygon_id').change(function() {
            var checks = self.searchContactDom.find('.polygons .results input[name="polygon"]');
            var checked = $(this).prop("checked");
            checks.each(function(index) {
                $(this).prop("checked", checked)
                self.polygonCheckboxSelectLogic(this);
            });
        });
    },
    minimizeControl: function(e) {
        OpenLayers.Control.BaseDialogControl.prototype.minimizeControl.apply(this);
        this.removeHighlights();
        $("#"+this.htmlResourceId).find('.polygons .actions .save_disabled').show();
        $("#"+this.htmlResourceId).find('.polygons .actions .save').hide();
        $("#"+this.htmlResourceId).find('.polygons .heading input[name="polygon"]').attr('checked', false);
    },
    maximizeControl: function(e) {
        OpenLayers.Control.BaseDialogControl.prototype.maximizeControl.apply(this);
        var $div = this.searchContactDom;
        var self = this;

        //Clear existing entries
        $("#"+this.htmlResourceId).find('.polygons .actions .save_disabled').show();
        $("#"+this.htmlResourceId).find('.polygons .actions .save').hide();
        $("#"+this.htmlResourceId).find('.polygons .heading input[name="polygon"]').attr('checked', false);
        $("#"+this.htmlResourceId).find('.polygons .results').empty();
        var params = self.createParam();
        if(!params.polygons) return;
        EB_Common.Ajax.post("/universe/fetchPolygonCounts",params,function(data){
            var contact_counts = data.polygonCounts;
            //Traverse all polygons array and show results in designated area
            var count = 0;
            var datas=[];
            for (var p in gisPolygons) {
                var polygon = gisPolygons[p];
                //Polygons marked invalid should be skipped since they were not sent to the server in the first place
                if (polygon.isInvalid) {
                    continue;
                }
                datas.push({polyName:polygon.polygonName,polyId:p,numContacts:contact_counts[count],include:polygon.polygonType == "include",exclude:polygon.polygonType == "exclude"});
                count++;
            }
            var rows = $("#selectedContactsTemplate").render(datas);
            var results = $('#gis_selected_contacts .polygons .results:first');
            results.empty().append(rows);
            results.find("select").change(function(e) {
                var polygon_type_selected = $(this).val();
                var featureId = $(this).attr('data-polyId');
                gisPolygons[featureId].polygonType = polygon_type_selected;
                if (!polygonsLayer) {return null;}
                var feature = polygonsLayer.getFeatureById(featureId);  //returned object (feature) of type "OpenLayers.Feature.Vector"
                var current_style = feature.style;
                var polygon_style = 'include';
                if (polygon_type_selected == 'include') {
                    polygon_style = {fillColor: polyFillColorDef};
                } else if (polygon_type_selected == 'exclude') {
                    polygon_style = {fillColor: polyFillColorExclude};
                }
                if (current_style == null) {
                    var style = OpenLayers.Util.applyDefaults(polygon_style, OpenLayers.Feature.Vector.style["default"]);
                } else {
                    var style = OpenLayers.Util.applyDefaults(polygon_style, current_style);
                }
                feature.style = style;
                polygonsLayer.redraw();
                //re-calculate count for Selected Contacts
                params = self.createParam();
                EB_Common.Ajax.post("/universe/fetchPolygonCounts",params,function(data){
                    contact_counts = data.polygonCounts;
                    var selected_contacts_count = contact_counts[contact_counts.length - 1];
                    $("#selectedContactsCount").html(selected_contacts_count);
                    EB_View.universe.widget.setDataToNotificationWidget();
                },"json");
            });
            results.find('.contactscount a').click(function(e){
                EB_View.universe.ebControl.everbridgePolygonContacts.clickedPolyId = $(this).attr("data-polyId");
                EB_View.universe.ebControl.everbridgePolygonContacts.activate();

            });
            results.find('.delete').click(function(e){
                var jthis = $(this);
                var featureToRemoveId = jthis.attr("data-polyId");
                var removeFeature = polygonsLayer.getFeatureById(featureToRemoveId);
                polygonsLayer.removeFeatures([removeFeature]);
                polygonsLayer.redraw();
                jthis.parent().parent().remove();
            });
            results.find('input[name="polygon"]').click(function() {
                self.polygonCheckboxSelectLogic(this);
            });
        },"json");
    },
    createParam:function(){
        var params = EB_View.universe.ebControl.everbridgePolygonContacts.createParam();
        if(!params.filterIds){
            params.filterIds="";
        }
        if(!params.filterRules){
            params.filterRules="";
        }
        if(!params.polygons){
            params.polygons="";
        }
        return params;
    },
    removeHighlights: function() {
        //Remove all polygon highlighting
        var features = polygonsLayer.features;
        if (features) {
            for (var i = 0; i<features.length; i++) {
                var feature = features[i];
                var current_style = feature.style;
                if  (current_style && current_style.strokeWidth == polyStrokeWidthHighlight) {
                    var style = OpenLayers.Util.applyDefaults({strokeWidth: polyStrokeWidthDef}, current_style);
                    feature.style = style;
                }
            }
        }
        polygonsLayer.redraw();
    },
    polygonCheckboxSelectLogic: function(elem) {
        var $div = $("#"+this.htmlResourceId);
        var results = $div.find('.polygons .results input[name="polygon"]');
        var num_checked = results.filter(":checked").length;
        if (num_checked > 0) {
            $div.find('.polygons .actions .save_disabled').hide();
            $div.find('.polygons .actions .save').show();
        } else {
            $div.find('.polygons .actions .save_disabled').show();
            $div.find('.polygons .actions .save').hide();
        }
        //highlight/outline selected polygon
        if (elem) {
            var is_checked = $(elem).prop("checked");
            var poly_id = $(elem).val();
            var polygon = gisPolygons[poly_id];
            if (!polygonsLayer) {return;}
            var feature = polygonsLayer.getFeatureById(poly_id);  //returned object (feature) of type "OpenLayers.Feature.Vector"
            var current_style = feature.style;
            var polygon_style = {strokeWidth: is_checked ? polyStrokeWidthHighlight : polyStrokeWidthDef};
            if (current_style == null) {
                var style = OpenLayers.Util.applyDefaults(polygon_style, OpenLayers.Feature.Vector.style["default"]);
            } else {
                var style = OpenLayers.Util.applyDefaults(polygon_style, current_style);
            }
            feature.style = style;
        }
        //handle heading level checkbox
        var heading_checkbox = $div.find('#polygon_id');
        var num_checkboxes = results.length;
        if (num_checked == 0) {
            heading_checkbox.prop("checked", false);
        } else if (num_checked==num_checkboxes) {
            heading_checkbox.prop("checked", true);
        }
    },
    CLASS_NAME: "OpenLayers.Control.SelectedContacts"
};
OpenLayers.Control.SelectedContacts = OpenLayers.Class(OpenLayers.Control.BaseDialogControl, SelectedContacts);

var PolygonContacts={
    htmlResourceId:"gis_polygon_contacts",
    searchContactDom:null,
    clickedPolyId:null,
    activate: function() {
        this.maximizeControl();
    },
    deactivate: function() {
    },
    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
        //this.draw();
    },
    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this);
        this.createBaseDialog(this.text);
        this.loadContents();
        // set mode to minimize
        if(!this.outsideViewport) { this.minimizeControl(); }
        // populate div with current info
        //this.redraw();

        return this.div;
    },
    loadContents:function(content){
        var $div = $(this.div);
        this.searchContactDom = $("#"+this.htmlResourceId).clone();
        $("#"+this.htmlResourceId).remove();
        $div.addClass("everbridge_"+this.htmlResourceId).append(this.searchContactDom.show()).show();
        OpenLayers.Event.observe(this.div, "click", this.ignoreEvent);
        OpenLayers.Event.observe(this.div, "mousedown", OpenLayers.Function.bindAsEventListener(this.mouseDown, this));
        OpenLayers.Event.observe(this.div, "dblclick", this.ignoreEvent);

    },
    maximizeControl:function(e) {
        var params = this.createParam();

        if(!params.filterIds){
            params.filterIds="";
        }
        if(!params.filterRules){
            params.filterRules="";
        }
        if(!params.polygon){
            params.polygon="";
        }
        if(!params.polygons){
            params.polygons="";
        }
        var url="universe/fetchPolygonContacts";
        this.showData(url,params);

        OpenLayers.Control.BaseDialogControl.prototype.maximizeControl.apply(this);

    },
    createParam:function(){
        var params = {};
        params = EB_View.universe.ebControl.everbridgeSearchContact.lastSearchParams;

        var polygon_points = [];
        var is_includes = [];
        if (this.clickedPolyId) {   //polygon clicked
            var points = [];
            var _points=gisPolygons[this.clickedPolyId].components;
            var len = _points.length;
            for(var i = 0 ; i<len;i++){
                var lonLat = new OpenLayers.LonLat( _points[i].x ,_points[i].y ).transform(map.getProjectionObject(),latlon_proj);
                points.push({x:lonLat.lon,y:lonLat.lat});
            }
            params.polygon = EB_Common.json.stringify(points);
        } else {                    //no polygon clicked, so get points for all available polygons
            loop1:
                for(var pp in gisPolygons){
                    var points = [];
                    var _points=gisPolygons[pp].components;
                    var len = _points.length;
                    loop2:
                        for(var i = 0 ; i<len;i++){
                            var lonLat = new OpenLayers.LonLat( _points[i].x ,_points[i].y ).transform(map.getProjectionObject(),latlon_proj);
                            if (lonLat.lon > 180 || lonLat.lon < -180) {
                                continue loop1;
                            }
                            points.push({x:lonLat.lon,y:lonLat.lat});
                        }
                    is_includes.push(gisPolygons[pp].polygonType == "include" ? "true" : "false");
    
                    polygon_points.push(points);
                }
            params.polygons = EB_Common.json.stringify(polygon_points);
            params.polygonIsIncludes = EB_Common.json.stringify(is_includes);
        }

        //
//            var polygons_points = [];
//            for(var pp in gisPolygons){
//                var points = [];
//                var _points=gisPolygons[pp].components;
//                var len = _points.length;
//                for(var i = 0 ; i<len;i++){
//                    var lonLat = new OpenLayers.LonLat( _points[i].x ,_points[i].y ).transform(map.getProjectionObject(),latlon_proj);
//                    points.push({x:lonLat.lon,y:lonLat.lat});
//                }
//                polygons_points.push(points);
//            }
//            EB_Common.logger.log(EB_Common.json.stringify(polygons_points));

        EB_Common.logger.log(params);
        return params;
    },
    showData:function(url,params){
        if(!this.loadJqgrid){
            $("#gridTable").jqGrid({
                url:url,
                mtype:"post",
                postData: params,
                datatype: "json",
                emptyDataCaption : i18n['global.grid.emptyDataCaption'],
                contentType: "application/json",
                jsonReader : {
                    root: "polygonContactsDataPage.data",
                    page: "polygonContactsDataPage.currentPageNo",
                    total: "polygonContactsDataPage.totalPageCount",
                    records: "polygonContactsDataPage.totalCount",
                    repeatitems: false
                },
                height: "auto",
                autowidth : true,
                rowNum: 10,
                rowList: [10],
                colNames:['First Name','Middle Initial', 'Last Name', 'Address'],
                colModel:[
                    {name:'firstName',sortable:false,width:85},
                    {name:'middleInitial',sortable:false,width:75},
                    {name:'lastName',sortable:false,width:110},
                    {name:'geoSearchAddress.0.streetAddress',sortable:false,width:238}
                ],
                autoWidth:false,
                height:"250px",
                viewrecords:true,
                sortable:false,
                pager:"#gridPager",
                caption: "",
                prmNames : {
                    page:"pageNo",
                    rows:"pageSize"
                }
            });
            this.loadJqgrid=true;
            $("#gridTable").jqGrid('setGridWidth', 530);
        }else{
            $("#gridTable").jqGrid('setGridParam',{url:url,postData:params,"loadComplete":function(data){
                //self.loadComplete(data,params);
                var a;
            }}).trigger("reloadGrid");
        }
    },
    CLASS_NAME: "OpenLayers.Control.PolygonContacts"
};
OpenLayers.Control.PolygonContacts = OpenLayers.Class(OpenLayers.Control.BaseDialogControl, PolygonContacts);

var SaveRegion={
    htmlResourceId:"gis_save_region",
    searchContactDom:null,
    selectedPolygons:null,
    selectedPolygonsIsIncludes:null,
    activate: function() {
        this.maximizeControl();
    },
    deactivate: function() {
        $('#' + this.htmlResourceId).find(" .message").html("");
        $('#' + this.htmlResourceId).find(" .message").hide();
        $("#regionname").val('');
        $("#" + this.htmlResourceId + " .ui-combobox-input").val('');
        if(EB_View.universe.ebControl.everbridgeSelectedContacts)
        EB_View.universe.ebControl.everbridgeSelectedContacts.removeHighlights();
        $('#' + this.htmlResourceId).find('.actions .save_disabled').show();
        $('#' + this.htmlResourceId).find('.actions .save_enabled').hide();
    },
    minimizeControl: function(e) {
        OpenLayers.Control.BaseDialogControl.prototype.minimizeControl.apply(this);
        $('#' + this.htmlResourceId).find(" .message").html("");
        $('#' + this.htmlResourceId).find(" .message").hide();
        $("#regionname").val('');
        $("#" + this.htmlResourceId + " .ui-combobox-input").val('');
        if(EB_View.universe.ebControl.everbridgeSelectedContacts)
        EB_View.universe.ebControl.everbridgeSelectedContacts.removeHighlights();
        $('#' + this.htmlResourceId).find('.actions .save_disabled').show();
        $('#' + this.htmlResourceId).find('.actions .save_enabled').hide();

    },
    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
    },
    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this);
        this.createBaseDialog(this.text);
        this.loadContents();
        // set mode to minimize
        if(!this.outsideViewport) { this.minimizeControl(); }
        // populate div with current info
        //this.redraw();

        return this.div;
    },
    loadContents:function(content){
        var $div = $(this.div);
        var $var = this;
        this.searchContactDom = $("#"+this.htmlResourceId).clone();
        $("#"+this.htmlResourceId).remove();
        $div.addClass("everbridge_"+this.htmlResourceId).append(this.searchContactDom.show());
        OpenLayers.Event.observe(this.div, "click", this.ignoreEvent);
        OpenLayers.Event.observe(this.div, "mousedown", OpenLayers.Function.bindAsEventListener(this.mouseDown, this));
        OpenLayers.Event.observe(this.div, "dblclick", this.ignoreEvent);

        this.searchContactDom.find('.save').click(function() {
            $var.saveRegion();
        });

        this.searchContactDom.find("a.foldersexpand").click(function(){
            if (this.searchContactDom.find(".folderlist:hidden")) {
                this.searchContactDom.show();
            } else {
                this.searchContactDom.hide();
            }
        });

        this.searchContactDom.find("#folderlist").combobox({});

        this.searchContactDom.find('#regionname').keyup(function(e) {
            if ($.trim($("#regionname").val()).length > 0) {
                $div.find('.actions .save_disabled').hide();
                $div.find('.actions .save_enabled').show();
            } else {
                $div.find('.actions .save_disabled').show();
                $div.find('.actions .save_enabled').hide();
            }
        });

    },
    saveRegion:function() {
        var url="/universe/saveRegion";
        var region_name = $("#regionname").val();
        //var folder_id = $("#folderlist").val();
        var folder_name = $("#" + this.htmlResourceId + " .ui-combobox-input").val();

        var orgId = $("#map").attr("data-orgId");

        var params = {
            orgId : orgId,
            regionName : region_name,
            folderName : folder_name,
            polygons : EB_Common.json.stringify(this.selectedPolygons),
            polygonIsIncludes: EB_Common.json.stringify(this.selectedPolygonsIsIncludes)
        };

        EB_Common.Ajax.post(url,params,function(data){
            $("#gis_save_region .message").show();
            $("#gis_save_region .message").html(data.message);
            
            //Clear out regions so that it is reloaded from server when My Shapes (aka Region Library) clicked
            everbridgeRegionLibrary.allRegions = null;
        },"json");
    },
    CLASS_NAME: "OpenLayers.Control.SelectedContacts"
};
OpenLayers.Control.SaveRegion = OpenLayers.Class(OpenLayers.Control.BaseDialogControl, SaveRegion);

//
var polyFillColorDef = '#ee9900';
var polyFillColorExclude = '#4b62bf';
var polyStrokeWidthDef = 1;
var polyStrokeWidthHighlight = 4;
var universeLayout=null;
var universeMapData={}
function handleZoomIn(lonlat) {
    if (map.baseLayer.id.indexOf("Bing") != -1) {
        var zoomTarget = next_zoom_level[this.map.zoom+1];
        zoomTarget--;
    } else {
        var zoomTarget = next_zoom_level[this.map.zoom];
    }
    if(lonlat){
        map.setCenter(lonlat);
    }
    map.zoomTo(zoomTarget);
}
function handleZoomOut() {
    if (map.baseLayer.id.indexOf("Bing") != -1) {
        var zoomTarget = previous_zoom_level[this.map.zoom+1];
        zoomTarget--;
    } else {
        var zoomTarget = previous_zoom_level[this.map.zoom];
    }
    map.zoomTo(zoomTarget);
}
function getZoomTarget(isIn) {
    var zoomTarget = 0;
    if(isIn){
        if (map.baseLayer.id.indexOf("Bing") != -1) {
            zoomTarget = next_zoom_level[this.map.zoom+1];
            zoomTarget--;
        } else {
            zoomTarget = next_zoom_level[this.map.zoom];
        }
    }else{
        if (map.baseLayer.id.indexOf("Bing") != -1) {
            zoomTarget = previous_zoom_level[this.map.zoom+1];
            zoomTarget--;
        } else {
            zoomTarget = previous_zoom_level[this.map.zoom];
        }
    }
    return zoomTarget;
}

function init() {
    load_layers(layers_obj);

    var widgetLayer_style=new OpenLayers.Style({fillColor: "#D1A9FC",fillOpacity: 0.3,strokeColor:"#D1A9FC"});
    widgetLayer =  new OpenLayers.Layer.Vector("WidgetLayer",{styleMap:widgetLayer_style});
    markersLayer = new OpenLayers.Layer.Markers("MarkersLayer");
    widgetMarkersLayer = new OpenLayers.Layer.Markers("WidgetMarkersLayer");
    pointsMarkersLayer = new OpenLayers.Layer.Markers("PointsMarkersLayer");
    var polygonLayer_selectStyle = new OpenLayers.Style({fillColor:"blue",fillOpacity: 0.3});
    var polygonLayer_pointStyle= OpenLayers.Util.applyDefaults({graphicName:"cross",fillColor: "#ffffff",strokeColor:"#000000",fillOpacity: 1},OpenLayers.Feature.Vector.style["default"]);
    var polygonLayer_style = new OpenLayers.StyleMap({'point':polygonLayer_pointStyle,'select': polygonLayer_selectStyle});
    polygonsLayer = new OpenLayers.Layer.Vector("PolygonsLayer",{styleMap:polygonLayer_style});
    map.addLayers([widgetLayer,polygonsLayer,widgetMarkersLayer,markersLayer,pointsMarkersLayer]);
//    markersLayer.setZIndex(2000);
    map.addControl(new OpenLayers.Control.MousePosition({
            formatOutput:function(lonLat){
                lonLat =  new OpenLayers.LonLat( lonLat.lon ,lonLat.lat ).transform(spherical_mercator_proj,latlon_proj);
                return lonLat.lon+","+lonLat.lat;
            }
        }
    ));
    
    //Disable mouse wheel here, so we can setup a Control for it later on (see OpenLayers.Control.MouseWheel below)
    var nav = new OpenLayers.Control.Navigation({zoomWheelEnabled: false});
    map.addControl(nav);
    
    //map.addControl(new OpenLayers.Control.KeyboardDefaults());

    // Zoom - via zoom bar
    // Jump forward and backward to our custom zoom levels rather than allowing zoom on all the
    // zoom levels in between.
    var zoom=new OpenLayers.Control.Zoom();
    zoom.onZoomClick = function(evt) {
        EB_Common.logger.log(evt);
        if (evt.buttonElement.hash == "#zoomIn") {
            handleZoomIn();
        } else {
            handleZoomOut();
        }

        return false;
    };
    map.addControl(zoom);
    
    //zoom - via mouse clicks
    OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
        defaultHandlerOptions: {
            'single': false,
            'double': true,
            'pixelTolerance': 0,
            'stopSingle': false,
            'stopDouble': true
        },

        initialize: function(options) {
            this.handlerOptions = OpenLayers.Util.extend({}, this.defaultHandlerOptions);
            OpenLayers.Control.prototype.initialize.apply(this, arguments);
            this.handler = new OpenLayers.Handler.Click(
                    this, {'dblclick': this.dbclickTarget}, this.handlerOptions
            );
        },
        dbclickTarget: function(evt) {
            var currentZoom = this.map.getZoom();
            var newZoom = getZoomTarget(true);
            newZoom = Math.max(newZoom, 0);
            newZoom = Math.min(newZoom, this.map.getNumZoomLevels());
            if (newZoom === currentZoom) {
                return;
            }
            var size    = this.map.getSize();
            var deltaX  = size.w/2 - evt.xy.x;
            var deltaY  = evt.xy.y - size.h/2;
            var newRes  = this.map.baseLayer.getResolutionForZoom(newZoom);
            var zoomPoint = this.map.getLonLatFromPixel(evt.xy);
            var newCenter = new OpenLayers.LonLat(
                zoomPoint.lon + deltaX * newRes,
                zoomPoint.lat + deltaY * newRes );
            this.map.setCenter( newCenter, newZoom );
        }
    });
    var zoomClick = new OpenLayers.Control.Click();
    map.addControl(zoomClick);
    zoomClick.activate();
    
    //zoom - via mouse wheel
    OpenLayers.Control.MouseWheel = OpenLayers.Class(OpenLayers.Control, {
        wheelUp: function(evt, delta) {
            this.wheelChange(evt, delta || 1);
        },
        wheelDown: function(evt, delta) {
            this.wheelChange(evt, delta || -1);
        },
        wheelChange: function(evt, deltaZ) {
            var currentZoom = this.map.getZoom();
            var newZoom = getZoomTarget(Math.round(deltaZ)>0)
            newZoom = Math.max(newZoom, 0);
            newZoom = Math.min(newZoom, this.map.getNumZoomLevels());
            if (newZoom === currentZoom) {
                return;
            }
            var size    = this.map.getSize();
            var deltaX  = size.w/2 - evt.xy.x;
            var deltaY  = evt.xy.y - size.h/2;
            var newRes  = this.map.baseLayer.getResolutionForZoom(newZoom);
            var zoomPoint = this.map.getLonLatFromPixel(evt.xy);
            var newCenter = new OpenLayers.LonLat(
                zoomPoint.lon + deltaX * newRes,
                zoomPoint.lat + deltaY * newRes );
            this.map.setCenter( newCenter, newZoom );
        },
        initialize: function(options) {
        	if (!options) options = {};
            this.handlerOptions = OpenLayers.Util.extend(options, this.defaultHandlerOptions);
            OpenLayers.Control.prototype.initialize.apply(this, arguments);
            this.handler = new OpenLayers.Handler.MouseWheel(
                    this,
                    {
                        up: this.wheelUp,
                        down:this.wheelDown
                    },
                    this.handlerOptions
            );
        }
    });
    var zoomWheel = new OpenLayers.Control.MouseWheel({'interval': 100, 'cumulative': false});
    map.addControl(zoomWheel);
    zoomWheel.activate();
    
    var gisPanel = new OpenLayers.Control.GisPanel();
    var everbridgeSearchLocation = new OpenLayers.Control.SearchLocation({title:i18n["universe.control.searchlocation"],text:i18n["universe.control.searchlocation"]});
    gisPanel.addControls(everbridgeSearchLocation);
    var everbridgeSearchContact = new OpenLayers.Control.SearchContact({title:i18n["universe.control.searchcontact"],text:i18n["universe.control.searchcontact"]});
    gisPanel.addControls(everbridgeSearchContact);
    var everbridgeBaseMapLayerSwitcher=new OpenLayers.Control.BaseMapLayerSwitcher({title:i18n["universe.control.basemap"], text: i18n["universe.control.basemap"]});
    gisPanel.addControls(everbridgeBaseMapLayerSwitcher);
    var everbridgePolygonTools = new OpenLayers.Control.PolygonTools({title:i18n["universe.control.polygontools"],text:i18n["universe.control.polygontools"],placeholder:i18n["universe.control.placeholder_highlightingcontacts"]});
    gisPanel.addControls(everbridgePolygonTools);
    everbridgeRegionLibrary = new OpenLayers.Control.RegionLibrary({title:i18n["universe.control.regionlibrary"],text:i18n["universe.control.regionlibrary"]});
    gisPanel.addControls(everbridgeRegionLibrary);
    var everbridgeSelectedContacts = new OpenLayers.Control.SelectedContacts({title:i18n["universe.control.selectedcontacts"],text:(i18n["universe.control.selectedcontacts"]+'<span class="count"></span>'),displayInPanel:false});
    gisPanel.addControls(everbridgeSelectedContacts);
    var everbridgePolygonContacts = new OpenLayers.Control.PolygonContacts({title:'Polygon Contacts',text:'Polygon Contacts',displayInPanel:false});
    gisPanel.addControls(everbridgePolygonContacts);
    var everbridgeSaveRegion = new OpenLayers.Control.SaveRegion({title:'Save Region to Library',text:'Save Region to Library',displayInPanel:false});
    gisPanel.addControls(everbridgeSaveRegion);
    map.addControl(gisPanel);
    EB_View.universe.ebControl.everbridgeSearchContact=everbridgeSearchContact;
    EB_View.universe.ebControl.everbridgeSelectedContacts=everbridgeSelectedContacts;
    EB_View.universe.ebControl.everbridgePolygonContacts=everbridgePolygonContacts;
    EB_View.universe.ebControl.everbridgeSaveRegion=everbridgeSaveRegion;
}

function add_contactable_layer(layer_obj) {
    contactable_layers[layer_obj.description] = layer_obj;
//      document.getElementById('contactable_layer_select').options.add(new Option(layer_obj.description, layer_obj.sourceId, true));
};

function setup_kml_layer(layer_obj) {
    var kml_popup = null;
    var url = layer_obj.url + "?bust=" + new Date().getTime();
    var visible = layer_obj.visible;
    EB_Common.logger.log("Loading kml layer " + layer_obj.description + " from " + url + ", visible? " + visible);
    var kml_layer = new OpenLayers.Layer.Vector(layer_obj.description, {
        projection: latlon_proj,
        visibility: visible,
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.HTTPS({url: url,
            format: new OpenLayers.Format.KML({extractStyles: true, extractAttributes: true, maxDepth: 2})
        })
    });
    if (visible) {
        selectable_layers.push(kml_layer);
        reload_select();
    }
    var load_complete = function() {
        if (layer_obj.provider.pollingInterval != -1) {
            setTimeout(function() {
                popup_close();
                url = layer_obj.url + "?bust=" + new Date().getTime();
                kml_layer.protocol = new OpenLayers.Protocol.HTTPS({url: url,
                    format: new OpenLayers.Format.KML({extractStyles: true, extractAttributes: true, maxDepth: 2})
                });
                kml_layer.refresh();
            }, layer_obj.provider.pollingInterval * 1000);
        }
    };
    var popup_close = function(evt) {
        if (kml_popup) map.removePopup(kml_popup);
    };
    var feature_select = function(event) {
        popup_close();

        var feature = event.feature;
        // Since KML is user-generated, do naive protection against
        // Javascript.
        var content = "<h4>"+feature.attributes.name + "</h4>" + feature.attributes.description;
        if (content.search("<script") != -1) {
            content = "Content contained Javascript! Escaped content below.<br>" + content.replace(/</g, "&lt;");
        }
        kml_popup = new OpenLayers.Popup.FramedCloud("kml_popup", feature.geometry.getBounds().getCenterLonLat(),
            new OpenLayers.Size(100,100),
            content,
            null, true, popup_close);
        feature.popup = kml_popup;
        map.addPopup(kml_popup);
    };
    var feature_unselect = function(event) {
        var feature = event.feature;
        if(feature.popup) {
            map.removePopup(feature.popup);
            feature.popup.destroy();
            delete feature.popup;
            kml_popup = null;
        }
    };
    kml_layer.events.on({
        "featureselected": feature_select,
        "featureunselected": feature_unselect,
        "loadend": load_complete
    });
    EB_Common.logger.log(kml_layer);
    map.addLayer(kml_layer);
};

function support_utf_layer() {
    var utf_popup = null;
    var click_callback = function(infoLookup, loc, pixel) {
        if (infoLookup) {
            var info;
            for (var idx in infoLookup) {
                // idx can be used to retrieve layer from map.layers[idx]
                info = infoLookup[idx];
                if (info && info.data) {
                    if (utf_popup) map.removePopup(utf_popup);
                    EB_Common.logger.log(loc);
                    EB_Common.Ajax.get("/universe/showContact/" + info.data.id + "/" + info.data.address + "/", function(data) {
                        EB_Common.logger.log(data);
                        var lonlat = loc;
                        if(data.status){
                            var lat = data.contactAddress.gisLocation.lat;
                            var lon = data.contactAddress.gisLocation.lon;
                            lonlat= new OpenLayers.LonLat( lon ,lat ).transform(latlon_proj,map.getProjectionObject());
                        }
                        utf_popup=EB_View.universe.tool.createPopupForUniverse(markersLayer,lonlat,EB_View.universe.tool.AutoSizeFramedCloudMaxSize,data.address);
                        map.addPopup(utf_popup);
                    });
                } else {
                    if (utf_popup) map.removePopup(utf_popup);
                }
            }
        }
    };
    var hover_callback = function(infoLookup, loc, pixel) {
        var map = document.getElementById('map');
        for (var idx in infoLookup) {
            var info = infoLookup[idx];
            if (info && info.data) {
                map.className = "largemap hoverHands";
                break;
            } else map.className = "largemap";
        }
    };
    map.addControl(
        new OpenLayers.Control.UTFGrid({
            callback: click_callback,
            handlerMode: "click"
        })
    );
    map.addControl(
        new OpenLayers.Control.UTFGrid({
            callback: hover_callback,
            handlerMode: "move"
        })
    );
};
var eb_zoom_level_to_real = {0: 3, 1: 6,2: 9,3: 12,4: 15};
var real_zoom_level_to_eb = {3: 0,6: 1,9: 2,12: 3,15: 4};
var next_zoom_level = {0: 3,1: 3,2: 3,3: 6,4: 6,5: 6,6: 9,7: 9,8: 9,9: 12,10: 12,11: 12,12: 15,13: 15,14: 15,15: 15,16: 15,17: 15,18: 15,19: 15};
var previous_zoom_level = {0: 3,1: 3,2: 3,3: 3,4: 3,5: 3,6: 3,7: 6,8: 6,9: 6,10: 9,11: 9, 12: 9,13: 12,14: 12,15: 12,16: 15,17: 15,18: 15,19: 15};
var default_server_resolutions = [156543.03390625,78271.516953125, 39135.7584765625, 19567.87923828125,9783.939619140625, 4891.9698095703125,2445.9849047851562,1222.9924523925781, 611.4962261962891,305.74811309814453,152.87405654907226,76.43702827453613,38.218514137268066,19.109257068634033,9.554628534317017,4.777314267158508,2.388657133579254,1.194328566789627,0.5971642833948135];
function load_layers(layers_obj) {
    var utf_added = false;
    var kml_registrations = [];
    var layers = [];
    var vlayer = new OpenLayers.Layer.Vector("Editable", {displayInLayerSwitcher: false});
    layers.push(vlayer);
    var center = [0,0];
    var defaultBaseLayer = null;
    for (var i=0; i<layers_obj.length; ++i) {
        var layer_obj = layers_obj[i];
        if (layer_obj.sourceId) add_contactable_layer(layer_obj);

        if (layer_obj.type == ("GMAP")) {
            if(!window.google.maps.MapTypeId)
                continue;
            if (layer_obj.provider && layer_obj.provider.parameters && layer_obj.provider.parameters.type) {
                var type = null;
                switch (layer_obj.provider.parameters.type) {
                    case "street" :
                        type = window.google.maps.MapTypeId.ROADMAP;
                        break;
                    case "terrain" :
                        type = window.google.maps.MapTypeId.TERRAIN;
                        break;
                    case "hybrid" :
                        type = window.google.maps.MapTypeId.HYBRID;
                        break;
                    case "satellite" :
                        type = window.google.maps.MapTypeId.SATELLITE;
                };

                if (type) {
                    var glayer = new OpenLayers.Layer.Google(layer_obj.description, {
                        'type': type, 'isBaseLayer': layer_obj.baseLayer, 'buffer': 1, 'visibility': layer_obj.visible, 'animationEnabled' : false,'displayOutsideMaxExtent': false, 'wrapDateLine': false
                    });
                    layers.push(glayer);
                }
            }
        } else if (layer_obj.type == "OSM") {
            layers.push(new OpenLayers.Layer.OSM(null, null, {'visibility': layer_obj.visible}));
        } else if (layer_obj.type == "ESRI") {
            center = layer_obj.bounds.center;
            if (layer_obj.provider && layer_obj.provider.parameters && layer_obj.provider.parameters.url) {
                EB_Common.logger.log(layer_obj.visible);
                EB_Common.logger.log(layer_obj.provider.parameters.url);
                layers.push(new OpenLayers.Layer.XYZ(layer_obj.description, layer_obj.provider.parameters.url,
                    {'sphericalMercator':true, 'buffer': 1, 'isBaseLayer': layer_obj.baseLayer, 'visibility': layer_obj.visible})
                );
            }
        } else if (layer_obj.type == "BING") {
            if (layer_obj.provider && layer_obj.provider.parameters && layer_obj.provider.parameters.key) {
                layers.push(new OpenLayers.Layer.Bing({'isBaseLayer': layer_obj.baseLayer, 'key': layer_obj.provider.parameters.key, 'visibility': layer_obj.visible}));
            }
        } else if (layer_obj.type === "XYZ") {
            EB_Common.logger.log("xyz layer url == " + layer_obj.url);
            if(layer_obj.url){
                if(layer_obj.url.indexOf("?")>-1){
                    layer_obj.url=layer_obj.url+"&universer="+Math.random();
                }else{
                    layer_obj.url=layer_obj.url+"?universer="+Math.random();
                }
            }
            var xyzLayer = new OpenLayers.Layer.XYZ(layer_obj.description, layer_obj.url,
                {'sphericalMercator':true, 'buffer': 1, 'isBaseLayer': layer_obj.baseLayer, 'visibility': layer_obj.visible});
            xyzLayer.serverResolutions = default_server_resolutions;
            layers.push(xyzLayer);
            EB_View.universe.xyzLayers.push(xyzLayer);
            if (layer_obj.provider.name === 'mapnik') {
                // If this layer contains a UTF layer, make sure it gets added as an overlay
                if (layer_obj.utflayer) {
                    var utf_url = layer_obj.utflayer.url;
                    EB_Common.logger.log("UTF layer url is " + utf_url);

                    var utf_layer = new OpenLayers.Layer.UTFGrid({
                        url: utf_url,
                        utfgridResolution: 4,
                        displayInLayerSwitcher: false,
                        useJSONP: true
                    });
                    utf_layer.serverResolutions = default_server_resolutions;
                    layers.push(utf_layer);
                    utf_added = true;

                    // Link this utf layer to the parent layer so that toggles of the parent's visibility also remove
                    // this layer.
                    xyzLayer.events.register('visibilitychanged', xyzLayer, function (e) {
                        EB_Common.logger.log("visibility changed for contact layer");
                        EB_Common.logger.log(e);
                        if (xyzLayer.visibility) {
                            //map.addLayer(utf_layer);
                            utf_layer.setVisibility(true);
                        } else {
                            document.getElementById('map').className = "largemap";
//                            map.removeLayer(utf_layer);
                            utf_layer.setVisibility(false);
                        }
                    });
                }
            }
        } else if (layer_obj.type === 'KML') {
            EB_Common.logger.log("KML url is " + layer_obj.url);
            kml_registrations.push(layer_obj);
        }
        // Identify the default base map layer for initial load
        if (layer_obj.visible && layer_obj.baseLayer) {
            defaultBaseLayer = layers[layers.length-1];
        }
    }
    EB_Common.logger.log(layers);
    if(defaultZoomLevel>15)
        defaultZoomLevel= 3;
    var mapOption={
        maxExtent: new OpenLayers.Bounds(-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892),
        div: "map",
        allOverlays: false,
        theme:"",
        controls:[],
        layers: layers,
        center: new OpenLayers.LonLat(defaultCenterLon, defaultCenterLat).transform(latlon_proj, spherical_mercator_proj),
        zoom: eb_zoom_level_to_real[defaultZoomLevel],
        units: 'mi',    //important: if this is changed, then must modify calculation in SearchLocation.showData.loadComplete
        numZoomLevels:19,
        projection: spherical_mercator_proj
    };
    map = new OpenLayers.Map(mapOption);
    map.setBaseLayer(defaultBaseLayer);
    if (utf_added) {
        support_utf_layer();
    }
    /**
     for (var i=0; i<kml_registrations.length; ++i) {
     try {
     setup_kml_layer(kml_registrations[i]);
     } catch(e) {
     EB_Common.logger.log("Failed to register kml " + i + " due to:\n" + e);
     }
     }
     */
}