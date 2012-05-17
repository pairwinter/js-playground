(function(common){
	common.message.type="cn";
	// Validation
	common.message.validation={
			ip			:	"请输入一个有效的IP地址",
			domain		:	"请输入一个有效的域名",
			host		:	"请输入一个有效的主机地址",
			ip_or_domain:	"请输入一个有效的IP地址或者域名",
			phoneUS		:	"请输入一个有效的电话号码",
			multi_emails:	"请输入多个有效的邮箱地址,每行一个，每个邮箱地址不能超过128个字符",
		   multi_phoneUS:	"请输入多个有效的电话，每行一个",
		   		pattern :	"您输入的内容不符合格式",
		  jqueryValidate:	{
								required: "必填",
								remote: "该值已被占用，请重新输入",
								email: "请输入一个有效的邮箱地址",
								url: "请输入一个有效的URL",
								date: "请输入一个有效的时间",
								dateISO: "请输入一个有效的时间 (ISO).",
								number: "请输入一个有效的电话号码.",
								digits: "只能输入数字.",
								creditcard: "请输入一个有效的信用卡号",
								equalTo: "请输入相同内容",
								accept: "内容不合法.",
								maxlength: $.validator.format("您输入的内容不能超过{0}个字符."),
								minlength: $.validator.format("请至少输入 {0} 个字符."),
								rangelength: $.validator.format("您输入的内容长度必须在 {0} 和 {1} 之间."),
								range: $.validator.format("您输入的数字应大于{0}小于{1}."),
								max: $.validator.format("您输入的数字应小于等于{0}."),
								min: $.validator.format("您输入的数字应大于等于{0}.")
							}
	};
	//fild tip
	common.message.tip={
		ip:"请输入IP地址",
		userName:"请输入用户名，1～5个字符",
		repassword:"请再输入一次密码",
		phoneUS:"电话号码格式:x(xxx)-xxx-xxxx or xxx xxx xxxx or xxx-xxx-xxxx"
	};
	
	// Common
	common.message.common={
			error0	:"服务器已停止或正忙",
			error404	:"找不到请求的资源!",
			error500	:"服务器错误！",
			error10000	:"Session 已过期，请重新登录",
			error10001	:"您没有权限执行当前操作"
	}
})(EB_Common);
