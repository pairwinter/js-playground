(function(view) {

    // templates
	var template_homePage = '<p style="text-align: left;"><br></p><p style="text-align: left;"></p><div style="text-align: -webkit-auto; "><h1>&lt;sample text only - not suggested for distribution&gt;</h1></div><div style="text-align: -webkit-auto; "><br></div><h1 style="text-align: -webkit-auto; ">Emergency Alert Program</h1><div style="text-align: -webkit-auto; "><br></div><div style="text-align: -webkit-auto; ">Get alerted about emergencies and other important community news by signing up for our Emergency Alert Program. This system enables us to provide you with critical information quickly in a variety of situations, such as severe weather, unexpected road closures, missing persons and evacuations of buildings or neighborhoods.</div><div style="text-align: -webkit-auto; "><br></div><div style="text-align: -webkit-auto; ">You will receive time-sensitive messages wherever you specify, such as your home, mobile or business phones, email address, text messages and more. You pick where, you pick how.</div><p></p>';
	var template_faqPage = '<p><br></p><p></p><div><h1>&lt;sample text only - not suggested for distribution&gt;</h1></div><div><br></div><h1>Emergency Alert Program: Frequently Asked Questions</h1><div><br></div><h2>What is the Emergency Alert Program?</h2><div><br></div><div>This service allows you to opt-in to receive notifications via phone calls, text messaging, e-mail and more based on locations you care about. You can choose to receive notifications about events that may affect your home, workplace, family\'s schools and more.</div><div><br></div><h2>When will it be used?</h2><div><br></div><div>This system will be used to notify you about imminent threats to health and safety as well as informational notifications that affect your locations or work environments. Administrators will send notifications regarding severe weather, flooding, gas leaks, police activity and more.</div><div><br></div><h2>Will I still get emergency notifications if I don\'t sign up?</h2><div><br></div><div>If you don\'t create a username and password, you will receive notifications only by the methods that are on file for your Organization.</div><div><br></div><h2>What if my phone number or email address changes?</h2><div><br></div><div>The system is only as good as the information you provide. If your contact information changes, you can always visit your profile and update your information.</div><div><br></div><h2>Will my contact information be shared with others?</h2><div><br></div><div>No. The information that you provide will be used only for this Organization for notification purposes. We will not give or sell your contact or location information to any vendor or other organization.</div><p></p>';
	var template_overviewPage = '<p><br></p><p></p><h1>&lt;sample text only - not suggested for distribution&gt;</h1><h1><br></h1><h1>Notification Program Overview<br></h1><div><br></div><div>We have launched a new Mass Notification service that allows us to alert you. You opt-in to enter your contact information and subscribe to notification you care about based on your location. The information you provide is protected and will not be used for any other purpose.</div><div><br></div><p></p><h2>How It Works</h2><div><br></div><div>When we issue a notification about a potential safety hazard or concern, you will receive a message on the voice or text communication methods that you have registered. If requested for the notification, you can confirm that you have received the message and you will not be contacted by any subsequent methods regarding that &nbsp;particular notification. If you do not confirm, the system will continue to attempt to reach you at all of the contact paths that you have registered.</div><div><br></div><h2>Sign Up for Notifications</h2><div><br></div><div>Create an account and add your contact and location information into the Mass Notification system. All information you provide will be kept strictly confidential.</div><div><br></div><h2>Stop Receiving Notifications</h2><div><br></div><div>You can stop receiving at any time by removing your contact information from your profile.</div><p></p>';
	var richText = {}, cleditor;
	richText.init = function(richComponent, type, saveButton) {
		richText.richComponent = richComponent;
		richText.type = type;
		$("#" + saveButton).bind('click', {buttonId:saveButton},bindSaveEditHtml);
		cleditor = $('#' + richText.richComponent).cleditor({
		    width : 610, 
			height : 400,
			bodyStyle : 'min-height:300px;',
			controls : 'bold italic underline strikethrough subscript superscript | font size '
						+ 'style | color highlight removeformat | bullets numbering | outdent '
						+ 'indent | alignleft center alignright justify | undo redo | '
						+ 'rule image link unlink | cut copy paste pastetext'
						,
		    updateTextArea : function(html){
		    	$('#' + richText.richComponent).change();
		    	return html;
		    }
	    });
		getEditHtml();
	};

	function bindSaveEditHtml(button,event) {
		pageContent =$('#' + richText.richComponent).val();
		EB_Common.Ajax.post("/sspconfig/saveSSPHomePageContent", {
			pageHomeContent : pageContent,
			type : richText.type,
			title : 'no title'
		}, function(data) {
			if (data.status != "yes") {
				EB_Common.ToolPrompt.show(button.data.buttonId,i18n["'"+data.status+"'"]);
			} else {
				EB_Common.ToolPrompt.show(button.data.buttonId,'Save successfully');
			}
			
			//reset Leave Page State
            EB_Common.LeavePage.resetState();
		}, "json");
	}

	function getEditHtml() {
		EB_Common.Ajax.ajax({
			url : "/sspconfig/findHomePageContent",
			data : {
				type : richText.type
			},
			type:'get',
			success : function(data) {
				if (data.status != "yes") {
					EB_Common.dialog
							.alert(i18n["'" + data.status + "'"]);
				} else {
					var content;
					if (data.content != null) {
						content = data.content.pageContent;
					} else {
						switch (richText.type) {
							case 'Home Page' :
								content = template_homePage;
								break;
							case 'FAQS' :
								content = template_faqPage;
								break;
							case 'Overview' :
								content = template_overviewPage;
								break;
							default :
								content = '';
						}
					}
					$('#' + richText.richComponent).val(content);
					cleditor[0].updateFrame();
				}
			},
			dataType : "json"
		});
	}
	
	view.richText= richText;
})(EB_View);