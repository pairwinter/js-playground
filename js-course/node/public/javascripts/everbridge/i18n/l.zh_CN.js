(function(common){
	common.message.type="zh_CN";
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
		   	less_equal  :   "{1}的值应该小于等于{2}的值.",
		   	phone_length_nanp :   "您输入的有效电话号码长度必须为10.",
			phone_length_other :   "您输入的有效电话号码长度必须在 4 和 20 之间.",
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
	// table grid
	common.message.grid={
		defaults : {
			recordtext: "{0} - {1}\u3000共 {2} 条",	// 共字前是全角空格
			emptyrecords: "无数据显示",
			loadtext: "读取中...",
			pgtext : " {0} 共 {1} 页"
		},
		search : {
			caption: "搜索...",
			Find: "查找",
			Reset: "重置",
			odata : ['等于\u3000\u3000', '不等\u3000\u3000', '小于\u3000\u3000', '小于等于','大于\u3000\u3000','大于等于', 
				'开始于','不开始于','属于\u3000\u3000','不属于','结束于','不结束于','包含\u3000\u3000','不包含','空值于\u3000\u3000','非空值'],
			groupOps: [	{ op: "AND", text: "所有" },	{ op: "OR",  text: "任一" }	],
			matchText: " 匹配",
			rulesText: " 规则"
		},
		edit : {
			addCaption: "添加记录",
			editCaption: "编辑记录",
			bSubmit: "提交",
			bCancel: "取消",
			bClose: "关闭",
			saveData: "数据已改变，是否保存？",
			bYes : "是",
			bNo : "否",
			bExit : "取消",
			msg: {
				required:"此字段必需",
				number:"请输入有效数字",
				minValue:"输值必须大于等于 ",
				maxValue:"输值必须小于等于 ",
				email: "这不是有效的e-mail地址",
				integer: "请输入有效整数",
				date: "请输入有效时间",
				url: "无效网址。前缀必须为 ('http://' 或 'https://')",
				nodefined : " 未定义！",
				novalue : " 需要返回值！",
				customarray : "自定义函数需要返回数组！",
				customfcheck : "Custom function should be present in case of custom checking!"
				
			}
		},
		view : {
			caption: "查看记录",
			bClose: "关闭"
		},
		del : {
			caption: "删除",
			msg: "删除所选记录？",
			bSubmit: "删除",
			bCancel: "取消"
		},
		nav : {
			edittext: "",
			edittitle: "编辑所选记录",
			addtext:"",
			addtitle: "添加新记录",
			deltext: "",
			deltitle: "删除所选记录",
			searchtext: "",
			searchtitle: "查找",
			refreshtext: "",
			refreshtitle: "刷新表格",
			alertcap: "注意",
			alerttext: "请选择记录",
			viewtext: "",
			viewtitle: "查看所选记录"
		},
		col : {
			caption: "选择列",
			bSubmit: "确定",
			bCancel: "取消"
		},
		errors : {
			errcap : "错误",
			nourl : "没有设置url",
			norecords: "没有要处理的记录",
			model : "colNames 和 colModel 长度不等！"
		},
		formatter : {
			integer : {thousandsSeparator: " ", defaultValue: '0'},
			number : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0.00'},
			currency : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
			date : {
				dayNames:   [
					"Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat",
			         "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
				],
				monthNames: [
					"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
					"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
				],
				AmPm : ["am","pm","AM","PM"],
				S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th'},
				srcformat: 'Y-m-d',
				newformat: 'm-d-Y',
				masks : {
					ISO8601Long:"Y-m-d H:i:s",
					ISO8601Short:"Y-m-d",
					ShortDate: "Y/j/n",
					LongDate: "l, F d, Y",
					FullDateTime: "l, F d, Y g:i:s A",
					MonthDay: "F d",
					ShortTime: "g:i A",
					LongTime: "g:i:s A",
					SortableDateTime: "Y-m-d\\TH:i:s",
					UniversalSortableDateTime: "Y-m-d H:i:sO",
					YearMonth: "F, Y"
				},
				reformatAfterEdit : false
			},
			baseLinkUrl: '',
			showAction: '',
			target: '',
			checkbox : {disabled:true},
			idName : 'id'
		}
	}
	// Common
	common.message.common={
			error0	:"服务器已停止或正忙",
			error404	:"找不到请求的资源!",
			error500	:"服务器错误！",
			error10000	:"Session 已过期，请重新登录",
			error10001	:"您没有权限执行当前操作"
	}
})(EB_Common);
