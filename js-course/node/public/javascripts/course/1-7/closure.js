$(function(){
	/*---------------------------------*/
	var m = "hello";
	var jc = js_course;
	function showM(){
		jc.utils.log("code1",m);
	}
	m="hello2";
	showM();
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
	/*---------------------------------*/
	function Apple(){
		var name = "苹果";
		var num = 5;
		this.getName = function(){
			return name;
		}
		jc.utils.log("code3",num);
	}
	var apple = new Apple();
	jc.utils.log("code3",apple.getName(),true);
	/*---------------------------------*/
});