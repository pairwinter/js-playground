$(function () {
    var jc = js_course;
    /*************************** arguments ****************************************/
    function testArguments(a, b) {
        var i, s = "函数testArguments期望传入";
        var numargs = arguments.length;// 获取被传递参数的数值。
        var expargs = testArguments.length;// 获取期望参数的数值。
        s += expargs + "个参数，";
        s += numargs + "个参数已被传入！";
        s += "它们是："
        for (i = 0; i < numargs; i++) {// 获取参数内容。
            s += "参数" + i + " = " + arguments[i] + (i == numargs - 1 ? "" : "，");
        }
        jc.utils.log("result", s,true);
        if(testArguments2.arguments){//说明testArguments2这个方法正在执行，且在它里面调用了testArguments这个方法。
            var a = testArguments2.arguments;
            var a_length = a.length;
            var args = "testArguments2的参数，它们是：";
            for (i = 0; i < a_length; i++) {// 获取参数内容。
                args +="参数"+i + " = " + testArguments2.arguments[i] + (i == a_length - 1 ? "" : "，");
            }
            jc.utils.log("result", args,true);
        }
    }
    testArguments(100, "everbridge");//单独执行
    function testArguments2(c,d,e,f) {
        testArguments(c,d); //被其他函数调用
    };
    testArguments2(1,2,3,4);
    //多态
    function testPolymorphic(){
        switch (arguments.length){
            case 0 :
                jc.utils.log("testPolymorphic", "no arguments");
                break;
            case 1 :
                jc.utils.log("testPolymorphic", arguments[0],true);
                break;
            case 2 :
                jc.utils.log("testPolymorphic", arguments[0] + "," + arguments[1],true);
                break;
            default :
                break;
        }
    }
    testPolymorphic();
    testPolymorphic(1);
    testPolymorphic(1,2);

    /*************************** caller demo **********************************/
    function callerDemo() {
        if (callerDemo.caller) {
            var a = callerDemo.caller.toString();
            jc.utils.log("callerDemo_toString", a,true);
        } else {
            jc.utils.log("callerDemo_toString", "this is a top function");
        }
        //如果在这里在次执行callerDemo.caller会怎样？
//        if (callerDemo.caller) {
//            callerDemo.caller.apply();
//        }
    }
    function handleCaller() {
        callerDemo();
    }
    handleCaller();

    /*************************** callee **********************************/
    //callee可以打印其本身
    function calleeDemo() {
        jc.utils.log("calleeDemo_toString", arguments.callee.toString());
    }
    calleeDemo();
    //用于验证参数
    function calleeLengthDemo(arg1, arg2) {
        if (arguments.length==arguments.callee.length) {
            jc.utils.log("calleeDemo_checkLength", "参数个数相同",true);
        } else {
            jc.utils.log("calleeDemo_checkLength", "实参长度：" +arguments.length+"；形参长度： " +arguments.callee.length , true);
        }
    }
    calleeLengthDemo(1,2);
    calleeLengthDemo(1);
    //递归计算
    var sum = function(n){
        if (n > 0)
            return n+arguments.callee(n - 1);
        else
           return 0;
    }
    var calleeDemo_sum = sum(10);
    jc.utils.log("calleeDemo_sum", calleeDemo_sum , true);
});