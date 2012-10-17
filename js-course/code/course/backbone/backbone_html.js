(function(jc){
    jc.backbone  = {};
    var page = jc.backbone;
    page.view = function(){
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
    }
    page.collection = function(){
        var Book = Backbone.Model.extend({
            default : {
                title:'default'
            },
            initialize: function(){
                //alert('Hey, you create me!');
            }
        });
        var BookShelf = Backbone.Collection.extend({
            model : Book
        });
        var book1 = new Book({title : 'book1'});
        var book2 = new Book({title : 'book2'});
        var book3 = new Book({title : 'book3'});
        //var bookShelf = new BookShelf([book1, book2, book3]); //注意这里面是数组,或者使用add
        var bookShelf = new BookShelf;
        bookShelf.add(book1);
        bookShelf.add(book2);
        bookShelf.add(book3);
        bookShelf.remove(book3);
        //基于underscore这个js库，还可以使用each的方法获取collection中的数据
        var jBookList = $("#book-list");
        bookShelf.each(function(book){
            jBookList.append("<li>"+book.get('title')+"</li>");
        });
    };
    page.fetch = function(){
        $.ajax({
            url:"http://maps.googleapis.com/maps/api/geocode/json?address="+t.jAddress.val()+"&region=us&sensor=false&callback=?",
            type:"get",
            dataType:"text",
            success:function(data){
                alert(data);
            },
            error:function(x,y,z){

            }
        });
    };
    page.router = function(){
        var AppRouter = Backbone.Router.extend({
            routes: {
                "showData/:id":"showData",//如果写成“/showData/:id”将不起作用！必须去掉前面的斜线！
                "download/*path":"download",
                "list/*path/:id":"list",
                "*actions" : "defaultRoute"
            },
            showData:function(id){
                jc.utils.log("code1",id);
            },
            download:function(path){
                jc.utils.log("code2",path);
            },
            list:function(path,id){
                jc.utils.log("code3",path);
                jc.utils.log("code3",id,true);
            },
            defaultRoute : function(actions){
                jc.utils.log("code4",actions);
            }
        });
        var app_router = new AppRouter;
        Backbone.history.start();
    }
    page.searchView = function(){
        var searchTemplate = $.templates("#search_template");
        var SearchView = Backbone.View.extend({
            initialize:function(){
               this.render();
            },
            render:function(){
                var template = searchTemplate.render({search_label:"name"})
                this.$el.html(template);
            },
            events:{
                "click #search_button":"doSearch"
            },
            doSearch:function(){
                jc.utils.log("code5",$("#search_input").val());
            }
        });
        var searchView = new SearchView({el:$("#search_container")});
    }
})(js_course);
$(function(){
    js_course.backbone.view();
    js_course.backbone.collection();
    js_course.backbone.router();
    js_course.backbone.searchView();
});