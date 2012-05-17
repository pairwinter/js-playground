var EB_Common = function() {}
EB_Common.DEV_MODE =true;
EB_Common.includePath="";
EB_Common.include = function(file)
{
    var files = typeof file == "string" ? [file] : file;
    var head=$("head:first");
    for (var i = 0; i < files.length; i++)
    {
        var name = files[i].replace(/^\s|\s$/g, "");
        var att = name.split('.');
        var ext = att[att.length - 1].toLowerCase();
        var isCSS = ext == "css";
        var tag = isCSS ? "link" : "script";
        var attr = isCSS ? " type='text/css' rel='stylesheet' " : " language='javascript' type='text/javascript' ";
        var link = (isCSS ? "href" : "src") + "='" + EB_Common.includePath + name + "'";
        if ($(tag + "[" + link + "]").length == 0) head.append("<" + tag + attr + link + "></" + tag + ">");
    }
}
EB_Common.loadJs=function(file,success){
	$.ajax({
		url:file,
		dataType:"script",
		async:false
	});
}
//EB_Common.loadJs("javascripts/everbridge/eb_logger.js");
//EB_Common.loadJs("javascripts/everbridge/eb_cookie.js");
//EB_Common.loadJs("javascripts/everbridge/dialog/eb_dialog.js");
//EB_Common.loadJs("javascripts/everbridge/ajax/eb_ajax.js");
//EB_Common.loadJs("javascripts/everbridge/tree/eb_tree.js");
//EB_Common.loadJs("javascripts/everbridge/validation/eb_validation.js");