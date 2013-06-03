(function(jc){
    /**
     * Application
     */
    EmberTweetsApp = Ember.Application.create();
    EmberTweetsApp.SearchTextField = Ember.TextField.extend({
        insertNewline : function(){
            EmberTweetsApp.tweetsController.loadTweets();
        }
    });
    /**
     * Models
     */
    EmberTweetsApp.Tweet = Ember.Object.extend({
        avatar : null,
        screen_name : null,
        text : null,
        date : null
    })
    /**
     * Views
     */
    /**
     * Controller
     */
    EmberTweetsApp.tweetsController = Ember.ArrayController.create({
        content:[],
        userName:null,
        loadTweets:function(){
            var me = this;
            var userName = me.get("userName");
            if(userName){
                var url = 'http://api.twitter.com/1/statuses/user_timeline.json'+ ('?screen_name=%@&callback=?'.fmt(me.get("username")));
                EmberTweetsApp.recentUserController.addUser(userName);
                $.getJSON(url,function(data){
                    me.set('content', []);
                    $(data).each(function(index,value){
                        var t = EmberTweetsApp.Tweet.create({
                            avatar: value.user.profile_image_url,
                            screen_name: value.user.screen_name,
                            text: value.text,
                            date: value.created_at
                        });
                        me.pushObject(t);
                    })
                });
            }
        }
    });
    EmberTweetsApp.recentUsersController = Ember.ArrayController.create({
        content :[],
        addUser:function(name){
            if(this.contains(name)) this.removeObject(name);
            this.pushObject(name);
        },
        removeUser:function(name){
            this.removeObject(name);
        },
        searchAgain:function(view){
            EmberTweetsApp.tweetsController.set("userName",view.context);
            EmberTweetsApp.tweetsController.loadTweets();
        },
        reverse:function(){
            return this.toArray().reverse();
        }.property('@each')
    })
})(js_course);