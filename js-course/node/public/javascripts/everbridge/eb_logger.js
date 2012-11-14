//provide a graceful firebug console wrapper to avoid error
(function(common){
	var Logger = {
	    log: function() {
	    	if(EB_Common.DEV_MODE){
	    		if(window.console)  console.log(arguments);
	    		else  showInspect(arguments);
	    	}
	    },
	    debug: function() {
	        if(window.console && EB_Common.DEV_MODE) console.debug(arguments);
	    },
	    error: function() {
	        if(window.console && EB_Common.DEV_MODE) console.error(arguments);
	    },
	    warn: function() {
	        if(window.console && EB_Common.DEV_MODE) console.warn(arguments);
	    },
	    profile :function() {
	        if(window.console && EB_Common.DEV_MODE) console.profile(arguments);
	    },
	    profileEnd :function() {
	        if(window.console && EB_Common.DEV_MODE) console.profileEnd(arguments);
	    },
	    trace: function(){
	        if(window.console && EB_Common.DEV_MODE) console.trace(arguments);
	    },
	    group: function() {
	        if(window.console && EB_Common.DEV_MODE) console.group(arguments);
	    },
	    groupEnd: function(){
	        if(window.console && EB_Common.DEV_MODE) console.groupEnd(arguments);
	    },
	    dir: function() {
	        if(window.console && EB_Common.DEV_MODE) console.dir(arguments);
	    },
	    dirxml: function(){
	        if(window.console && EB_Common.DEV_MODE) console.dirxml(arguments);
	    }
	};
	function inspect(obj, maxLevels, level)
	{
	  var str = '', type, msg;
	    if(level == null)  level = 0;
	    if(maxLevels == null) maxLevels = 1;
	    if(maxLevels < 1)     
	        return '<font color="red">Error: Levels number must be > 0</font>';
	    if(obj == null)
	    return '<font color="red">Error: Object <b>NULL</b></font>';
	    str += '<ul>';
	    for(var pro in obj)
	    {
	      try
	      {
	          type =  typeof(obj[pro]);
	          if(type!="function")
	          str += '<li>(type : ' + type + ') ' + pro + ( (obj[pro]==null)?(': <b>null</b>'):(': <b>'+obj[pro]+'</b>')) + '</li>';
	          if((type == 'object') && (obj[pro] != null) && (level+1 < maxLevels))
	          	str += inspect(obj[pro], maxLevels, level+1);
	      }
	      catch(err)
	      {
	        if(typeof(err) == 'string') msg = err;
	        else if(err.message)        msg = err.message;
	        else if(err.description)    msg = err.description;
	        else                        msg = 'Unknown';
	        str += '<li><font color="red">(Error) ' + pro + ': ' + msg +'</font></li>';
	      }
	    }
	    str += '</ul>';
		return str;
	}
	function showInspect(obj)
	{
		var text="";
		if(!!obj[0])
		{
			for(var i=0;i<obj.length;i++)
			{
				text+=inspect(obj[i],5,0);
			}
		}else{
			text=inspect(obj,5,0);
		}
		if(!Logger.dump_div)
		{
			var $div=$("<div><input type='button' value='close'/><input type='button' value='clear'/><p></p></div>");
			$div.find("input").click(function(){
				if(this.value=="close")
					$div.hide();
				else if(this.value=="clear")
					$div.find("p").html("");
			});
			$div.css({"position":"absolute","bottom":"0px","right":"0px","width":"100%","height":"200px","background-color":"black","color":"#FFF","overflow":"auto"});
			Logger.dump_div=$div;
			$("body").append($div);
		}
		text = "<table>" + text + "<br/><hr/></table>";
		Logger.dump_div.show().find("p").append(text);
	}
	common.logger=Logger;
})(EB_Common);
