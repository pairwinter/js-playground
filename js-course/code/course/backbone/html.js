$(function(){
    var World = Backbone.Model.extend({
        //创建一个World的对象，拥有name属性
        name: null
    });

    var Worlds = Backbone.Collection.extend({
        //World对象的集合
        initialize: function (models, options) {
            this.bind("add", options.view.addOneWorld);
        }
    });

    var AppView = Backbone.View.extend(
        {
            el: $("body"),
            initialize: function () {
                //构造函数，实例化一个World集合类，并且以字典方式传入AppView的对象
                this.worlds = new Worlds(null, { view : this })
            },
            events: {
                "click #check":  "checkIn"   //事件绑定，绑定Dom中id为check的元素
            },
            checkIn: function () {
                var world_name = "世界";
                var world = new World({ name: world_name });
                this.worlds.add(world);
            },
            addOneWorld: function(model) {
                $("#world-list").append("<li>这里是来自 <b>" + model.get('name') + "</b> 星球的问候：hello world！</li>");
            }
        }
    );
    //实例化AppView
    var appview = new AppView;
});