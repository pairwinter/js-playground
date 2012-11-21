$(function(){
	var jc = js_course;

    var obj1 = {
        id:1,
        name:"eb1",
        getName:function(){
            return this.name;
        }
    }
    var resultName = obj1.getName();//result eb1;
    jc.utils.log("resultName1",resultName);
    var obj2= {name:"eb2"};
    resultName = obj1.getName.call(obj2);//result  eb2;
    jc.utils.log("resultName2",resultName);


	/*---------------------------------*/
	var obj1 = {
		id:1,
		name:"eb1",
		getName:function(){
			return this.name;
		}
	}
	var resultName = obj1.getName()
	jc.utils.log("code1",resultName);
	/*---------------------------------*/
	var obj2 = {
		id:2,
		name:"eb2",
		getName:function(){
			return this.name;
		}
	}
	resultName = obj2.getName()
	jc.utils.log("code2",resultName);
	/*---------------------------------*/
	var obj3 = {
		id:3,
		name:"eb3"
	}
	resultName = obj1.getName.call(obj3);
	jc.utils.log("code3",resultName);
	resultName = obj2.getName.call(obj3);
	jc.utils.log("code3",resultName,true);
	resultName = obj1.getName.call(obj2);
	jc.utils.log("code3",resultName,true);
	resultName = obj2.getName.call(obj1);
	jc.utils.log("code3",resultName,true);
	/*---------------------------------*/
});