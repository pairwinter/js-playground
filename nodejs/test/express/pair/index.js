var express = require("express");
var util = require("util");
var app = express.createServer();
var User = require("./user");
app.configure(function() {
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.methodOverride());
	app.set('views', __dirname + '/views');
	app.set('view engine', 'html');
	app.register(".html", require("jqtpl").express);
	app.set('view options', {
		layout : false
	});
});
app.configure("development", function() {
	app.use(express.static(__dirname + "/public"));
	app.use(express.errorHandler({
		dumpExceptions : true,
		showStack : true
	}));
});
app.configure("production", function() {
	var oneYear = 31557600000;
	app.use(express.static(__dirname + "/public", {
		maxAge : oneYear
	}));
	app.use(express.errorHandler());
});

// get 請求
function pp(req, res) {
	var params = "";
	if (!!req.params[0])
		params += " " + req.params[0] + " ";
	if (!!req.params.id)
		params += " " + req.params.id + " ";
	if (!!req.params.operation)
		params += " " + req.params.operation + " ";
	if (!!req.params.format)
		params += " " + req.params.format + " ";
	if (!params)
		params = "no data";
	return params + "\n";
}
var paths = {
	"/" : function(req, res) {
		res.send("/ " + pp(req, res))
	},
	"/user/:id" : function(req, res) {
		res.send("/user/:id " + pp(req, res))
	},
	"/user/:id?" : function(req, res) {
		res.send("/user/:id? " + pp(req, res))
	},
	"/user/:id(d+)" : function(req, res) {
		res.send("/user/:id(d+) " + pp(req, res))
	},
	"/files/*" : function(req, res) {
		res.send("/files/* " + pp(req, res))
	},
	"/file/*.*" : function(req, res) {
		res.send("/file/*.* " + pp(req, res))
	},
	"/user/:id/:operation?" : function(req, res) {
		res.send("/user/:id/:operation? " + pp(req, res))
	},
	"/products.:format" : function(req, res) {
		res.send("/products.:format " + pp(req, res))
	},
	"/products.:format?" : function(req, res) {
		res.send("/products.:format? " + pp(req, res))
	},
	"/user/:id.:format?" : function(req, res) {
		res.send("/user/:id.:format? " + pp(req, res))
	},
	"/to_form/" : function(req, res) {
		var data = {
			"layout" : "layout/mylayout.html",
			"title" : "post 请求提交页面"
		}
		res.render("pages/form.html", data);
	}
};
for ( var p in paths) {
	app.get(p, paths[p]);
}
// post 请求
app.post("/process_form", function(req, res) {
	var data = {};
	data.layout = "layout/mylayout.html";
	data.title = "结果";
	data.params = util.inspect(req.body);
	res.render("pages/result.html", data);
});

var users = [ {
	name : "winer1"
}, {
	name : "winer2"
}, {
	name : "winer3"
} ];
// 处理所有请求
app.all("/all_user/:id/:op?", function(req, res, next) {
	var user = users[req.params.id];
	if (!!user) {
		req.user = user;
		next();
	} else {
		// next(new Error("没有找到用户："+req.params.id));
		res.send("没有找到用户：" + req.params.id);
	}
});
// 处理所有请求
app.get("/all_user/:id/read", function(req, res, next) {
	res.send("viewing: " + req.user.name + "\n");
});
app.get("/all_user/:id/edit", function(req, res, next) {
	res.send("editing: " + req.user.name + "\n");
});
app.get("/all_user/:id/delete", function(req, res, next) {
	res.send("deleting: " + req.user.name + "\n");
});

// 路由中间件 mw：Middleware
var mw_check_user = function(req, res, next) {
	var user = users[req.params.id];
	if (!!user) {
		req.user = user;
		next();
	} else {
		// next(new Error("没有找到用户："+req.params.id));
		res.send("没有找到用户：" + req.params.id);
	}
};
var mw_check_auth = function(req, res, next) {
	if (req.user.name == "winer1") {
		next();
	} else {
		res.send("用户“" + req.user.name + "”没有权限执行此操作！");
	}
}
// 路由中间件（mw_check_user，mw_check_auth）将按照顺序被执行。
app.get("/mw_user/:id", mw_check_user, mw_check_auth, function(req, res, next) {
	res.send("用户“" + req.user.name + "”权限验证通过！");
	// next();
});
app.get("/mw_user/:id?", function(req, res) {
	res.send("用户“" + req.user.name + "”权限验证通过，这是路由[/mw_user/:id?]返回的结果！");
});

// 404 500错误处理
function NOT_FOUND(msg) {
	this.name = "404!找不到您请求的资源！";
	this.msg=msg;
	Error.call(this, msg);
	Error.captureStackTrace(this, arguments.callee);
}
NOT_FOUND.prototype.__proto__ = Error.prototype;
app.get("/404", function(req, res, next) {
	throw new NOT_FOUND("sdf");
});
//注意：如果app.configure中配置了errorHandler，那么此方法将不被执行。
app.error(function(err, req, res, next) {
	if (err instanceof NOT_FOUND) {
		res.send(err);
	} else {
		next(err);
	}
});

//参数预处理
app.param("userId",function(req,res,next,id){
	User.User.get(id,function(err,user){
		if(err)
			return next(err);
		req.user=user;
		next();
	});
});
app.get("/param/:userId",function(req,res){
	res.send(req.user.name);
});
app.listen(9001);
