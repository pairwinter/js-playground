$(function(){
    //大厅 ， 负责支撑全局的结构
    var TodoMVC = new Backbone.Marionette.Application();
    TodoMVC.addRegions({
        header : "#header",
        main : '#main',
        footer : '#footer'
    });
    TodoMVC.on('initialize:after',function(){
        Backbone.history.start();
    });

    /**
     * 定义数据结构
     */
    TodoMVC.module('Todos' , function(Todos,App,Backbone,Marionette,$,_){
        Todos.Todo = Backbone.Model.extend({
            localStorage : new Backbone.LocalStorage('todos-backbone'),
            defaults : {
                title : '',
                completed : false,
                created : 0
            },
            initialize:function(){
                if(this.isNew()){
                    this.set('created',Date.now());
                }
            },
            toggle : function(){
                return this.set('completed',!this.isCompleted());
            },
            isCompleted : function(){
                return this.get('completed');
            }
        });

        Todos.TodoList = Backbone.Collection.extend({
            model : Todos.Todo,
            localStorage:new Backbone.LocalStorage('todos-backbone'),
            getCompleted : function(){
                return this.filter(this._isCompleted);
            },
            getActive:function(){
                return this.reject(this._isCompleted);
            },
            comparator : function(todo){
                return todo.get('created');
            },
            _isCompleted : function(todo){
                return todo.get('completed');
            }
        })
    });

    /**
     *  布局，定义大厅中的小厅，各个组成部分
     */
    TodoMVC.module('Layout',function(Layout,App,Backbone,Marionette,$,_){
        /**
         * Header
         */
        Layout.Header = Marionette.ItemView.extend({
            template:"#template-header",
            ui:{
                input : "#new-todo"
            },
            events : {
                'keypress #new-todo' : 'onInputKeypress'
            },
            onInputKeypress : function(evt){
                var ENTER_KEY = 13;
                var todoText = this.ui.input.val().trim();
                if(evt.which === ENTER_KEY && todoText){
                    this.collection.create({
                        title:todoText
                    });
                    this.ui.input.val('');
                }
            }
        });

        /**
         * Footer
         */
        Layout.Footer = Marionette.ItemView.extend({
            template:'#template-footer',
            ui:{
                counter : '#todo-count>strong',
                filters : '#filters a'
            },
            events : {
                'click #clear-completed' : 'onClearClick'
            },
            collectionEvents : {
                'all' : 'render'
            },
            templateHelpers : {
                activeCountLabel : function(){
                    return (this.activeCount<=1?'item':'items') + ' left';
                }
            },
            initialize : function(){
                this.listenTo(App.vent,'TodoMVC:filter',this.updateFilterSelection);
            },
            serializeData : function(){
                var active = this.collection.getActive().length;
                var total = this.collection.length;

                return {
                    activeCount: active,
                    totalCount: total,
                    completedCount: total - active
                };
            },
            onRender:function(){
                this.$el.parent().toggle(this.collection.length>0);
                this.updateFilterSelection("");
            },
            updateFilterSelection:function(filter){
                this.ui.filters.removeClass("selected").filter("[href='#"+filter+"']").addClass("selected");
            },
            onClearClick:function(){
                var completed = this.collection.getCompleted();
                completed.forEach(function destroy(todo){
                    todo.destroy();
                });
            }
        });
    });
    /**
     * 单独一个module，用来定义Controller.
     */
    TodoMVC.module('TodoList',function(TodoList,App,Backbone,Marionette,$,_){
        /**
         *  Handle routes to show the active or complete todo  tiems.
         * @type {*}
         */
        TodoList.Router = Marionette.AppRouter.extend({
            appRoutes : {
                '*filter' : 'filterItems'
            }
        });

        TodoList.Controller = function(){
            this.todoList = new App.Todos.TodoList();
        };

        _.extend(TodoList.Controller.prototype,{
            start : function(){
                this.showHeader(this.todoList);
                this.showFooter(this.todoList);
                this.showTodoList(this.todoList);
            },
            showHeader : function(todoList){
                var header = new App.Layout.Header({
                    collection : todoList
                });
                App.header.show(header);
                for(var i = 0; i<50 ; i++){
                    header.collection.create({
                        title:i+""
                    });
                }

            },
            showFooter : function(todoList){
                var footer = new App.Layout.Footer({
                    collection : todoList
                });
                App.footer.show(footer);

            },
            showTodoList : function(todoList){
                var todoListView = new TodoList.Views.ListView({
                    collection : todoList
                })
                App.main.show(todoListView);
            },
            filterItems : function(filter){
                App.vent.trigger('TodoMVC:filter',(filter && filter.trim()) || '');
            }
        });

        TodoList.addInitializer(function(){
            var controller = new TodoList.Controller();
            new TodoList.Router({
                controller : controller
            });
            controller.start();
        });

    });

    TodoMVC.module('TodoList.Views',function(Views,App,Backbone,Marionette,$,_){
        Views.ItemView = Marionette.ItemView.extend({
            tagName : 'LI',
            template : "#template-todoItemView",
            ui : {
                edit : '.edit',
                checkbox : ".toggle"
            },
            events : {
                'click .destroy' : 'destroy',
                'dblclick label' : 'onEditClick',
                'keypress .edit' : 'onEditKeypress',
                'click .toggle' : "toggle"
            },
            initialize : function(){
//                this.listenTo(this.model,"change",this.render);
                this.listenTo(this.model,"change:completed",this.renderCompleted);
            },
            onRender:function(){
                this.$el.removeClass('active completed');
                if(this.model.get('completed')){
                    this.$el.addClass('completed');
                }else{
                    this.$el.addClass('active');
                }
            },
            renderCompleted : function(){
                this.$el.removeClass('active completed');
                if(this.model.get('completed')){
                    this.$el.addClass('completed');
                }else{
                    this.$el.addClass('active');
                }
                this.ui.checkbox.prop('checked',this.model.get('completed'));
            },
            destroy:function(){
                this.model.destroy();
            },
            toggle : function(){
                this.model.toggle().save();
            },
            onEditClick : function(evt){
                this.$el.addClass('editing');
                this.ui.edit.focus();
            },
            onEditKeypress : function(evt){
                var ENTER_KEY = 13;
                if(evt.which === ENTER_KEY){
                    var todoText = this.ui.edit.val().trim();
                    if(todoText){
                        this.model.set('title',todoText).save();
                        this.$el.removeClass('editing');
                    }
                }
            }
        });

        Views.ListView = Marionette.CompositeView.extend({
            template : '#template-todoListCompositeView',
            itemView : Views.ItemView,
            itemViewContainer : "#todo-list",
            ui : {
                toggle : "toggle-all"
            },
            events : {
                'click #toggle-all' : 'onToggleAllClick'
            },
            initialize : function(){
                this.listenTo(this.collection,"all",this.update);
            },
            onRender:function(){
                this.update();
            },
            update : function(){
                function reduceCompleted(left,right){return left && right.get('completed')};
                var allCompleted = this.collection.reduce(reduceCompleted,true);
                this.ui.toggle.prop('checked',allCompleted);
                if(this.collection.length === 0){
                    this.$el.parent().hide();
                }else{
                    this.$el.parent().show();
                }
            },
            onToggleAllClick:function(evt){
                var isChecked = evt.currentTarget.checked;
                this.collection.each(function(todo){
                    var time1= new Date();
                    todo.set({'completed':isChecked});
                    var time2= new Date();
                    console.log(time2.getTime() - time1.getTime());
                })
            }
        });

        // Application Event Handlers
        // --------------------------
        //
        // Handler for filtering the list of items by showing and
        // hiding through the use of various CSS classes

        App.vent.on('TodoMVC:filter',function(filter){
            filter = filter || "all";
            $("#todoapp").attr("class",'filter-'+filter);
        });
    });

    TodoMVC.start();
});