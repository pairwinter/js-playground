$(function(){
    var User = Backbone.Model.extend({
        defaults:function(){
            return {
                name:"",
                age:0
            }
        }
    });
    var Users = Backbone.Collection.extend({
        model:User,
        comparator:function(user){
            return user.age;
        }
    });
    var ViewUser = Backbone.View.extend({
        tagName:"li",
        template:_.template($("#user_template").html()),
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        initialize:function(){
        }
    });
    var AppUser = Backbone.View.extend({
        el:"#appUser",
        events:{
            "keypress #addUserInput":"pressEnter",
            "click #removeAll":"removeAll"
        },
        addOne:function(){
            var jCount = this.$("#count");
//            if(jCount.text())
        }
    });
});