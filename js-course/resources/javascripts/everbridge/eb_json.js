(function(common){
	common.json={};
	// implement JSON.stringify serialization
	if(window.JSON && window.JSON.stringify)
		common.json.stringify = window.JSON.stringify;
	else{
		common.json.stringify = function (obj) {
		    var t = typeof (obj);
		    if (t != "object" || obj === null) {
		        // simple data type
		        if (t == "string") obj = '"'+obj+'"';
		        return String(obj);
		    }
		    else {
		        // recurse array or object
		        var n=null, v=null, json = [], arr = (obj && obj.constructor == Array);
		        for (n in obj) {
		            v = obj[n]; t = typeof(v);
		            if (t == "string") v = '"'+v+'"';
		            else if (t == "object" && v !== null) v = common.json.stringify(v);
		            json.push((arr ? "" : '"' + n + '":') + String(v));
		        }
		        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		    }
		};
	}
})(EB_Common);