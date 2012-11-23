$(function(){
    var jc = js_course;
    function Apple(){//定义一个函数
        var name = "苹果";
        var num = 5;
        jc.utils.log("num_result",num);
        var getName = function(){
            return name;
        };
        return getName;//由于getName这个函数被返回了，所以它并没有结束其生存期。
    }
    var getName = Apple();//Apple这个函数执行完了，对num执行释放，但是对name不释放。
    var appleName = getName();
    jc.utils.log("name_result",appleName);
	/*---------------------------------*/
    var m = "hello";
    function showM(){
        this.getM=function(){
            return m;
        }
    }
    m="hello2";
    var s= new showM();
    jc.utils.log("code1",s.getM());
	/*---------------------------------*/
	var iBaseNum = 10;
	function addNum(iNum1, iNum2) {
	  function doAdd() {
		return iNum1 + iNum2 + iBaseNum;
	  }
	  return doAdd;
	}
	var doAdd = addNum(1,2);
	jc.utils.log("code2",doAdd());
});