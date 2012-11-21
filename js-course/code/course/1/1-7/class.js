$(function(){
	var jc = js_course;
	/*---------------------------------*/
    var Person={
        create:function(id,name){//构造函数
            this.id = id;
            this.name = name;
        },
        getId:function(){
            return this.id;
        },
        getName:function(){
            return this.name;
        }
    }
	var jobs = {};
//    jobs.prototype=Person;//如果这么写就犯了上一节那个特别特别注意的一点的错误，
    jobs.__proto__=Person;//这个地方是指定原型链而不是指定原型，意思就是说，如果在jobs中找不到某个属性，就去Person中找。
    jobs.create(1,"jobs");
    jc.utils.log("code1",jobs.getId());
    var bill = {};
    bill.__proto__=Person;
    bill.create(2,"bill");
    jc.utils.log("code2",bill.getId());

    var Jobs=function(){};
    Jobs.prototype = Person;
    var j = new Jobs();
    j.create(3,"J");
    jc.utils.log("code3",j.getName());


    function newInstance(Class,args){
        function _new(){
            Class.create.apply(this,arguments[0]);//假设基类的初始化函数都是create
        }
        _new.prototype=Class;
        return new _new(args);
    }
    var person = newInstance(Person,[4,"css"]);
    jc.utils.log("code4",person.getName());


    /**
     * Class:被继承的类
     * attributes,子类新加的或者重载的属性（方法），没有多态
     */
    function newSubClass(Class,attributes){
        function _new(attrs){
            if(attrs){
                for(var a in attrs){
                    this[a] = attrs[a];//拷贝新定义的属性到子类中。
                }
            }
        }
        _new.prototype=Class;
        return new _new(attributes);
    }
    var options = {
        create:function(id,name,great){
            this.id = id;
            this.name = name;
            this.great=great;
        },
        getGreat:function(){
            return this.great;
        }
    }
    var StudentClass = newSubClass(Person,options);
    var student = newInstance(StudentClass,[5,"student","great 3"]);
    jc.utils.log("code5",student.getGreat());


    var Class = {
        create: function() {
            return function() {
                this.initialize.apply(this, arguments);
            }
        }
    };
    var Person = Class.create();
    //也就是Person=function(){this.initialize.apply(this, arguments);};
    Person.prototype = {
        initialize:function(id,name){
            this.id=id;
            this.name=name;
        },
        getName:function(){
            return this.name;
        }
    }
    var tom = new Person(1,"tom");
    jc.utils.log("tom_name",tom.getName());
});