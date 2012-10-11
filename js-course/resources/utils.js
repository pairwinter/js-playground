var js_course = {};
(function(jc){
	var u = jc.utils={};
	jc.codes=[];
	for(var i=0;i<10;i++){
		jc.codes.push("code"+(i+1));
	}
	u.log=function(id,val){
		$("#"+id).html(val);
	};
})(js_course);