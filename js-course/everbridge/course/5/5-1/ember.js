(function(jc){
    var App = jc.EmberApp = Ember.Application.create();

    App.Store = DS.Store.extend({
        revision:12,
        adapter:'DS.FixtureAdapter'
    });

    App.Router.map(function(){
        this.resource('posts',function(){
            this.resource("post",{path:':post_id'});
        });
        this.resource('about');
    });

    App.PostsRoute = Ember.Route.extend({
        model:function(){
            return App.Post.find();
        }
    });

    App.PostController = Ember.ObjectController.extend({
        isEditing:false,
        edit:function(){
            this.set('isEditing',true);
        },
        doneEditing:function(){

        }
    });

    App.Post = DS.Model.extend({
        title:DS.attr("string"),
        author:DS.attr("string"),
        intro:DS.attr("string"),
        extended:DS.attr("string"),
        publishedAt:DS.attr("date")
    });

    App.Post.FIXTURES = [{
        id:1,
        title:"titile 1",
        author:"one",
        publishedAt:new Date("05-31-2013"),
        intro:"first fixture",
        extended:"extended 1"
    },{
        id:2,
        title:"titile 2",
        author:"two",
        publishedAt:new Date("05-31-2013"),
        intro:"second fixture",
        extended:"extended 2 with html tag <a href='www.google.com'>google</a>"
    }];

    Ember.Handlebars.registerBoundHelper("date",function(date){
        return moment(date).fromNow();
    });

    var showdown = new Showdown.converter();
    Ember.Handlebars.registerBoundHelper("markdown",function(input){
        return new Ember.Handlebars.SafeString(showdown.makeHtml(input));
    });
})(js_course);