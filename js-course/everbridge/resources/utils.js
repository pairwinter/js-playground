var js_course = {
  splitLine:'=========================================================================================================='
};
(function(jc){
	var u = jc.utils={};
	jc.codes=[];
	for(var i=0;i<10;i++){
		jc.codes.push("code"+(i+1));
	}
	u.log=function(id,val,isAppend){
		if(isAppend === undefined)
			isAppend = false;
		if(isAppend)
			$("#"+id).append("<p>"+id+": "+val+"</p>");
		else
			$("#"+id).html("<p>"+id+": "+val+"</p>");
		
	};
    u.browserLog = function(v){
        console.log(v);
    }
})(js_course);