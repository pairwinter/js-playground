$(function(){
    var o1 = {};
    o1.name = "test";
    console.log(o1.prototype);
    var o2 = new Object();
    console.log(o2.prototype);
    function A(){
        this.name="MT";
        this.age=0;
    }
    var CopyA ={};
    for(var pro in A){
        CopyA[pro] = A[pro];
    }
    console.log(A.prototype);
    var a = new A();
    console.log(a.prototype);
});