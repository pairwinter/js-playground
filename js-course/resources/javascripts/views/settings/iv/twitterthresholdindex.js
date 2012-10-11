(function(view) {
	twitterthresholdIndex = {};
	twitterthresholdIndex.initPage = function() {
		//cacheUIElement();
		//addListeners();
	};
	
	cacheUIElement = function() {
		twitterthresholdIndex.saveTwitterAccountBtn = $('#saveTwitterAccountBtn');
		twitterthresholdIndex.username = $('#username');
		twitterthresholdIndex.password = $('#password');
		twitterthresholdIndex.twitterSteamAccountId = $('#twitterSteamAccountId');
	};

	addListeners = function() {
		twitterthresholdIndex.saveTwitterAccountBtn.click(saveTwitterStreamAccount);
	};

	saveTwitterStreamAccount = function() {
		var username = $.trim(twitterthresholdIndex.username.val());
		if (username.length == 0) {
			EB_Common.dialog
					.alert(i18n['twitterthresholdIndex.dialog.alert.username']);
			twitterthresholdIndex.username.focus();
			return;
		}
		var password = $.trim(twitterthresholdIndex.password.val());
		if (password.length == 0) {
			EB_Common.dialog.alert(i18n['twitterthresholdIndex.dialog.alert.pass']);
			twitterthresholdIndex.password.focus();
			return;
		}
		twitterStreamAccount = {};
		twitterStreamAccount.id = twitterthresholdIndex.twitterSteamAccountId.val();
		twitterStreamAccount.username = username;
		twitterStreamAccount.password = password;
		EB_Common.Ajax
				.post(
						"/twitterThreshold/createTwitterAccount",
						{
							twitterSteamAccount : EB_Common.json
									.stringify(twitterStreamAccount)
						},
						function(data) {
							if (data.status == "yes") {
								var hasTwitterStreamAccount= data.hasTwitterStreamAccount;
								if(!hasTwitterStreamAccount){
									EB_Common.dialog.alert(i18n['twitterthresholdIndex.dialog.alert.noexiststwitterstreamaccount']);
									return ;
								}
								reloadPage('/twitterThreshold/loginTwitterThreshold');
							} else {
								EB_Common.dialog
										.alert(i18n['twitterthresholdIndex.dialog.alert.createtwitterstreamaccount']);
							}
						}, "json");
	};
	
	
	reloadPage=function(url){
		var container = $('#contentPanel');
		container.children().remove();
		container.load(EB_Common.Ajax
				.wrapperUrl(url),
				function() {
				});
	};

	view.twitterthresholdIndex = twitterthresholdIndex;
})(EB_View);