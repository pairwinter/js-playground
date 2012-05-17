组成部分：
EB_Common : 基本js文件，用来集成各个模块。
其他子模块：
1，ajax:提供了异步加载的效果显示和错误处理。
	错误处理：404，500，session过期和权限不足，不同的错误需要header中设置相应的状态码，其中session过期和权限不足的状态码，定义为10000，10001
	封装在EB_Common.
2，dialog:基于jquery ui
	封装了三个方法：
		common.dialog.alert() 提示
		common.dialog.confirm() 确认
		common.dialog.dialog() 文本输入
	封装在EB_Common.
3，国际化：
	i18n.js根据参数读取不同的国际化配置文件。
4，验证：
	基于jquery validate
	定义了验证规则的添加的方式。
	输入框取得焦点需要显示的提示信息：在输入框的class中添加validate_fild,为输入框添加自定义属性tip
	e.g:<input class="otherclass validate_fild" tip="ip" pos="down"/>这样点击输入框时会从资源化文件中读取相应的ip提示内容并显示。
	另外pos属性支持四种提示定位方式：
		不写：使用默认的添加方式，直接将提示信息添加在输入框后面
		left:以绝对定位方式添加在输入框后面
		down:以block方式添加在输入框下面
		down-absolute：以绝对定位方式添加在输入框下面
	封装在EB_Common.
5,cookie
	基于jquery.cookie,b并将其封装在EB_Common
6,logger
	开发用，对于不支持console的浏览器提供窗口显示log。
	
7，树：
	基于ZTree，并将其封装在EB_Common