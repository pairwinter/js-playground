var EB_Common = function() {};
var EB_View = function(){};
EB_Common.protocol = window.location.protocol;
EB_Common.message={};
EB_Common.DEV_MODE = location.href.indexOf('localhost') != -1;
EB_Common.includePath="";
EB_Common.getPath=function(){
	if(!EB_Common.includePath)
	{
		$("head script").each(function(){
			var src=$(this).attr("src");
			if(src.indexOf("EB_Common.js")>-1)
			{
				EB_Common.includePath=src.substring(0,src.indexOf("EB_Common.js"));
				return;
			}
			
		});
	}
	return EB_Common.includePath;
};
EB_Common.include = function(file)
{
	EB_Common.includePath=EB_Common.getPath();
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
};
EB_Common.loadJs=function(file,success){
	$.ajax({
		url:file,
		dataType:"script",
		async:false
	});
};
EB_Common.noData=function(element){
	var container;
	if( typeof element =='string'){
		container = $('#' + element);
	}else if(element.nodeType == 1 && element.tagName){
		container = element;
	}
	$('<div class="div_nodata">'+i18n['dashboard.noData']+'</div>').appendTo(container);
	
};

EB_Common.escapeHTML=function(b) {
    var a = $("<div />");
    a.text(b);
    return a.html()
}

/**
 * We can call it to achieve that a dialog open before leaving the page.
 * The dialog will prompt that you are sure to want to leave this page.
 * 
 * @param formEl 
 * @author Linder Wang
 * @date 2012-8-16
**/
/*
 * example
   EB_Common.LeavePage.addListener('loginMsgForm');
	$('#cancelId').click(function(){
		//if the form inputs' value is changed
    	if(EB_Common.LeavePage.changeState()){
    		EB_Common.dialog.leavePage(function(){
    			EB_Common.LeavePage.removeListener();
    			window.location=context+"/contacts/manage#ui-tabs-4";
    		});
    	}
		
	});

*/
EB_Common.LeavePage = function(){
    var inputs,
        container,
        changeFlag = false,
        changeFn = function(index, element){
        	changeFlag = true;
        	//console.info(changeFlag);
        	if(container){
				$('#'+container).off('change', inputs, changeFn);
			}else{
				$('body').off('change', inputs, changeFn);
			}
        }
	
	
	var pub = {
		addListener : function(formEl, ct){
		    //We should remove explicit listener if no call removeListener,
		    inputs = null;
		    container = ct;
			if(formEl){
				if(typeof formEl == 'string'){
					inputs = '#' + formEl + ':input'
				}else if(formEl.nodeType == 1 && formEl.tagName){
					inputs = '#' + formEl.id + ':input'
				}else if(formEl instanceof jQuery){
					inputs = '#' + formEl.attr(id) + ':input'
				}
			}
			if(!inputs){
				inputs = ':input';
			}
			inputs += ':not(":button,:reset,:submit")';
			//console.info($(inputs));
			if(container){
				$('#'+container).on('change', inputs, changeFn);
			}else{
				$('body').on('change', inputs, changeFn);
			}
		},
		
		removeListener : function(){
		    if(inputs){
		    	if(container){
					$('#'+container).off('change', inputs, changeFn);
				}else{
					$('body').off('change', inputs, changeFn);
				}
				inputs = null;
		    }
			changeFlag = false;
		},
		
		changeState : function(){
			return changeFlag;
		},
		
		resetState : function(){
			changeFlag = false;
			if(container){
				$('#'+container).on('change', inputs, changeFn);
			}else{
				$('body').on('change', inputs, changeFn);
			}
		}
	}
	
	return pub;
}();

/**
 * Browser compatibility
 * @author Linder Wang
 * @date 2012-9-7
**/
EB_Common.support = (function() {
	var support = {
	    canvas : 'CANVAS',
	    svg : 'SVG',
	    vml : 'VML',
    
		init : function() {
			var doc = document, tests = this.tests, ln = tests.length, i, test;

			for (i = 0; i < ln; i++) {
				test = tests[i];
				this[test.identity] = test.fn.call(this, doc);
			}
		},

		tests : [

				/**
				 * @property SVG True if the device supports SVG
				 * @type {Boolean}
				 */
				{
					identity : 'SVG',
					fn : function(doc) {
						return !!doc.createElementNS
								&& !!doc.createElementNS("http:/"
												+ "/www.w3.org/2000/svg", "svg").createSVGRect;
					}
				},

				/**
				 * @property Canvas True if the device supports Canvas
				 * @type {Boolean}
				 */
				{
					identity : 'CANVAS',
					fn : function(doc) {
						return !!doc.createElement('canvas').getContext;
					}
				},

				/**
				 * @property VML True if the device supports VML
				 * @type {Boolean}
				 */
				{
					identity : 'VML',
					fn : function(doc) {
						var d = doc.createElement("div");
						d.innerHTML = "<!--[if vml]><br><br><![endif]-->";
						return (d.childNodes.length == 2);
					}
				}]
	};
	support.init();
	return support;
})();

Array.prototype.remove = Array.prototype.remove ||  function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
