(function(common){
	common.include(["/javascripts/everbridge/tree/ztree/css/zTreeStyle.css"]);
	common.loadJs("/javascripts/everbridge/tree/ztree/jquery.ztree.core-3.1.min.js");
	var tree={
		build:function(domId,setting,nodes){
			$.fn.zTree.init($("#"+domId), setting);
		}
	};
	common.tree=tree;
})(EB_Common)