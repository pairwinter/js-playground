(function(jc){
    var u = jc.utils;
    jc.backbone3 = {
        events:{},
        model:{}
    };
    var page = jc.backbone3;
    var pe = page.events;
    pe.bindTest=function(){
        var obj = {};
        _.extend(obj,Backbone.Events);
        obj.bind("show",function(val){
            u.log("code_events",val,true);
        });
        obj.trigger("show","obj的show事件第1次触发！");
        obj.bind("all", function(eventName) {
            u.log("code_events_all","被触发的事件名称是："+eventName);
        });
        obj.trigger("show","obj的show事件第2次触发！同时obj的all事件也被触发！");
        /************************************************************************************/
        var start = function(){
            u.log("code_events_obj_change_start","obj 触发 change 事件，执行 start");
        }
        var end = function(val){
            u.log("code_events_obj_change_end","obj 触发 change 事件，执行 end");
        }
        obj.bind("change",start);
        obj.bind("change",end);
        obj.trigger("change",start);
        obj.unbind("change");
        obj.trigger("change");
        /************************************************************************************/
    };
    page.comparator = function(){
        var Chapter  = Backbone.Model;
        var chapters = new Backbone.Collection;
        chapters.comparator = function(chapter) {
            return chapter.get("page");
        };
        chapters.add(new Chapter({page: 9, title: "The End"}));
        chapters.add(new Chapter({page: 5, title: "The www.csser.com"}));
        chapters.add(new Chapter({page: 1, title: "The Beginning"}));
        u.log("code_comparator",chapters.pluck("title"));
    }

})(js_course);
$(function(){
    var bb3= js_course.backbone3;
    bb3.events.bindTest();
    bb3.comparator();
});