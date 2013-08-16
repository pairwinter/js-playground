/**
 * Created with JetBrains WebStorm.
 * User: pairwinter
 * Date: 13-8-10
 * Time: 下午4:38
 * To change this template use File | Settings | File Templates.
 */
var PicuterSault={};
PicuterSault.Class = function() {
    var len = arguments.length;
    var ParentClass = arguments[0]; //父对象
    var SubObject = arguments[len-1];//子类的属性
    //如果子类属性中包含初始化函数（相当于构造函数）那么就使用这个函数进行初始化，否则使用父类的初始化函数
    var initialize = typeof SubObject.initialize == "function" ?SubObject.initialize :function(){ ParentClass.prototype.initialize.apply(this, arguments); };

    if (len > 1) {
        //[1,2,3].slice(1,0)=[],[1,2,3].slice(1,1) = [],[1,2,3].concat([],5) = [1, 2, 3, 5]
        //合并生成参数集合，[初始化函数，父类，其他父类，覆盖父类属性的对象]
        var newArgs = [initialize, ParentClass].concat(Array.prototype.slice.call(arguments).slice(1, len-1), SubObject);
        PicuterSault.inherit.apply(null, newArgs);
    } else {
        initialize.prototype = SubObject;
    }
    return initialize;
};
PicuterSault.inherit = function(){
    var initialize = arguments[0],
        ParentClass = arguments[1];
    var F = function(){};
    F.prototype = ParentClass.prototype;
    initialize.prototype = new F();

    if(arguments.length>2){
        var i, l, subObject,prototypes = initialize.prototype;
        for(i= 2,l=arguments.length;i<l;i++){
            subObject = arguments[i];
            if(typeof subObject === 'function'){
                subObject = subObject.prototype;
            }
            for(var property in subObject){
                var value = subObject[property];
                if(value !== undefined){
                    prototypes[property] = subObject[property];
                }
            }
        }
    }


}
PicuterSault.Module = PicuterSault.Class({
    dom:null,
    moduleName : '',
    controllerName : '',
    module : null,
    initialize:function(dom,options){
        var idOrDom = dom;
        if(!idOrDom || !(angular.isString(idOrDom) || angular.isElement(idOrDom))){
            return ;
        }else{
            if(angular.isString(idOrDom)){
                this.dom = document.getElementById(idOrDom);
            }else{
                this.dom = idOrDom;
            }
        }
        $(this.dom).attr("ng-controller",this.controllerName);
        this.module = angular.module(this.moduleName,[]);
    }
});
PicuterSault.Module.getNameSpace = function(name){
    if(!this[name]){
        this[name] = {};
    }
    return this[name];
}