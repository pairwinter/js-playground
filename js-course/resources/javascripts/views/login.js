(function(view){
	view.login = function(){};
	view.login.initLoginPage = function(locale) {
        $('input[name="username"]').focus();
        $("#username,#password").keypress(function(event){
            if(event.keyCode==13){
                $('#proceed').click();
            }
        });

        function checkCookie(){
            var cookieEnabled=(navigator.cookieEnabled)? true : false
            if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled){
                document.cookie="testcookie";
                cookieEnabled=(document.cookie.indexOf("testcookie")!=-1)? true : false;
            }
            return (cookieEnabled)?true:showCookieFail();
        }

        function showCookieFail(){
            if($.queryUrl!="?login_error=cookie"){
                window.location.href=$.queryUrl.set("login_error","cookie");
            }

        }
        checkCookie();
		EB_Common.validation.validate("loginForm");
		
		$("a[id^='anclan-']").click(function(){
			var langId=$(this).attr("id").split("-")[1];

			var newUrl = $.queryUrl.set("lang", langId);
			window.location = newUrl;
		});
		
		$('#selectId').click(function(e){
			e.stopPropagation();
			$('#select_items').show();
		});
		
		//listen submit event
		$("#proceed").click(function(){
            if($("#username").val()==""){
                window.location.href=$.queryUrl.set("login_error","u");
                return;
            }
            if($("#password").val()==""){
                window.location.href=$.queryUrl.set("login_error","p");
                return;
            }
			$("#loginForm").submit();
		})
		$(document).keydown(function(e){
			var keyCode = e.keyCode;
			if(keyCode == 13){
				$("#loginForm").submit();
			}
		});

		$(document).click(function(){
			$('#select_items').hide();
		});
		
		//select default locale
		$("a[id^='anclan-']").each(function(){
			if(locale == $(this).attr("id").split("-")[1]) {
				$("#currentLan").val($(this).html());
			}
		});
	}
})(EB_View)