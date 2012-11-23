$(function(){
	var jc = js_course;
    //case 1
    function test1(){
        var startDate = new Date();
        for (i = 0; i < 1000; i++) {
            var myList = $('.myList1');
            myList.append('<p>This is list item ' + i+"</p>");
        }
        var endDate = new Date();
        jc.utils.log("test1_time",endDate.getTime()-startDate.getTime());
    }
    test1();
    //case 2
    function test2(){
        var startDate = new Date();
        var myList = $('.myList2');
        for (i = 0; i < 1000; i++) {
            myList.append('<p>This is list item ' + i+"</p>");
        }
        var endDate = new Date();
        jc.utils.log("test2_time",endDate.getTime()-startDate.getTime());
    }
    test2();
    //case 3
    function test3(){
        var startDate = new Date();
        var myList = $('.myList3');
        var list=[];
        for (i = 0; i < 1000; i++) {
            list.push('<p>This is list item ' + i+"</p>");
        }
        myList.append(list.join(""));
        var endDate = new Date();
        jc.utils.log("test3_time",endDate.getTime()-startDate.getTime());
    }
    test3();
});