$(function(){
    var jc = js_course;

    function A(){
        this.id=0;
        this.name="A";
        this.getId=function(){
            alert(this.id);
        }
        return {id:1,name:"B"};
    }
    var a = new A();
    jc.utils.log("a_result", JSON.stringify(a));


    var j = new jQuery.fn.init(document);
    var is = jQuery.prototype.isPrototypeOf(j);
    jc.utils.log("j_result", "jQuery.prototype是否是j的原型:"+is);
});