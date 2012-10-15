(function(view){
	view.settings = {};
	view.settings.menu = {};
	view.settings.menu.initPage = function(isTwitter,isWeather){
		var pMenu = loadMenu(isTwitter,isWeather);
		pMenu.setCurrentMenu('level1_1','level1_1_1',EB_Common.Ajax.wrapperUrl('/setting/organization/baseInfo/'));
		view.settings.menu.setTableHighlight();
	};
	
	function loadMenu(isTwitter,isWeather) {
		var platform = $.everbridge.platform, menu = platform.SettingMenu;

		var menuData = [];
        menuData.push({
					id : 'level1_1',
					name : i18n['setting.menu.org'],
					children : [{
								id : 'level1_1_1',
								name : i18n['setting.menu.org.baseInfo'],
								href : EB_Common.Ajax.wrapperUrl('/setting/organization/baseInfo/')
							}, {
								id : 'level1_1_2',
								name : i18n['setting.menu.org.loginMsg'],
								href : EB_Common.Ajax.wrapperUrl('/setting/organization/loginMsg/')
							}]
				});
        menuData.push({
					id : 'level1_2',
					name : i18n['setting.menu.gis'],
					children : [{
								id : 'level1_2_1',
								name : i18n['setting.menu.gis.default'],
								href : EB_Common.Ajax.wrapperUrl('/setting/gis/default/')
							},  {
								id : 'level1_2_2',
								name : i18n['setting.menu.gis.shape'],
								href : EB_Common.Ajax.wrapperUrl('/setting/gis/region/'),
								leavePage : false
							}]
				}     );

        var childrenMenu = [];
        var i = 1;
        if(isWeather == "true")
        {
            childrenMenu.push({
                id : 'level1_3_' + i,
                name : i18n['setting.menu.iv.weather'],
                href : EB_Common.Ajax.wrapperUrl('/weatherThreshold'),
                minWidth : 900
            });
            ++i;
        }
        if(isTwitter == "true")
        {
            childrenMenu.push({
                id : 'level1_3_' + i,
                    name : i18n['setting.menu.iv.twitter'],
                href : EB_Common.Ajax.wrapperUrl('/twitterThreshold/loginTwitterThreshold'), //twitterThreshold/0
                minWidth : 900
            });
            ++i
        }
        childrenMenu.push({
            id : 'level1_3_4',
            name : i18n['setting.menu.iv.recipient'],
            href : EB_Common.Ajax.wrapperUrl('/recipientAppThreshold')
        });

        menuData.push({
					id : 'level1_3',
					name : i18n['setting.menu.iv'],
					children : childrenMenu
				});

        menuData.push({
					id : 'level1_4',
					name : i18n['setting.menu.broadcast'],
					children : [{
							id : 'level1_4_1',
							name : i18n['setting.menu.broadcast.default'],
							href : EB_Common.Ajax.wrapperUrl('/setting/broadcast/default/')
						}, {
							id : 'level1_4_2',
							name : i18n['setting.menu.broadcast.sender'],
							href : EB_Common.Ajax.wrapperUrl('/setting/broadcast/senderInfo/')
						}, {
							id : 'level1_4_3',
							name : i18n['setting.menu.broadcast.delivery'],
							href : EB_Common.Ajax.wrapperUrl('/setting/broadcast/deliveryMethods/'),
							leavePage : false
						},{
							id : 'level1_4_4',
							name : i18n['setting.menu.broadcast.throttling'],
							href : EB_Common.Ajax.wrapperUrl('/setting/broadcast/throttling/')
						}, {
							id : 'level1_4_5',
							name : i18n['setting.menu.broadcast.greetings'],
							href : EB_Common.Ajax.wrapperUrl('/setting/broadcast/greetingLib/')
						}, {
							id : 'level1_4_6',
							name : i18n['setting.menu.broadcast.conference'],
							href : EB_Common.Ajax.wrapperUrl('/setting/broadcast/conferenceBridge/')
						}, {
							id : 'level1_4_7',
							name : i18n['setting.menu.broadcast.email'],
							href : EB_Common.Ajax.wrapperUrl('/setting/broadcast/emailTemplate/')
						}]
				});
        menuData.push({
					id : 'level1_5',
					name : i18n['setting.menu.contact'],
					children : [{
								id : 'level1_5_1',
								name : i18n['setting.menu.contact.record'],
								href : EB_Common.Ajax.wrapperUrl('/setting/contact/recordType/'),
								leavePage : false
							}, {
								id : 'level1_5_2',
								name : i18n['setting.menu.contact.custom'],
								href : EB_Common.Ajax.wrapperUrl('/setting/contact/customField/')
							},{
								id : 'level1_5_3',
								name : i18n['setting.menu.contact.subscription'],
								href : EB_Common.Ajax.wrapperUrl('/topicCategory/subscription')
							},{
								id : 'level1_5_4',
								name : i18n['setting.menu.contact.secure'],
								href : EB_Common.Ajax.wrapperUrl('/setting/contact/secureFtp/')
							}]

				});
        menuData.push({
					id : 'level1_7',
					name : i18n['setting.menu.ssp'],
					children : [
							{
								id : 'level7_1',
								name : i18n['setting.menu.ssp.options'],
								href : EB_Common.Ajax.wrapperUrl('/sspconfig/sspOptions')
							}, {
								id : 'level7_2',
								name : i18n['setting.menu.ssp.profile'],
								href : EB_Common.Ajax.wrapperUrl('/sspconfig/userProfileSetting')
							}, {
								id : 'level7_3',
								name : i18n['setting.menu.ssp.subscriptions'],
								href : EB_Common.Ajax.wrapperUrl('/sspconfig/subScriptions')
							}, {
								id : 'level7_4',	
								name : i18n['setting.menu.ssp.custom'],
								href : EB_Common.Ajax.wrapperUrl('/sspconfig/customerFields')
							}, {
								id : 'level7_5',
								name : i18n['setting.menu.ssp.location'],
								href : EB_Common.Ajax.wrapperUrl('/sspconfig/location')
							}, {
								id : 'level7_6',
								name : i18n['setting.menu.ssp.path'],
								href : EB_Common.Ajax.wrapperUrl('/sspconfig/contactPath')
							}, {
								id : 'level7_7',
								name : i18n['setting.menu.ssp.banner'],
								href : EB_Common.Ajax.wrapperUrl('/sspconfig/banner')
							}, {
								id : 'level7_8',
								name : i18n['setting.menu.ssp.home'],
								href : EB_Common.Ajax.wrapperUrl('/sspconfig/homePage')
							}, {
								id : 'level7_9',
								name : i18n['setting.menu.ssp.faq'],
								href : EB_Common.Ajax.wrapperUrl('/sspconfig/faq')
							}, {
								id : 'level7_10',
								name : i18n['setting.menu.ssp.overview'],
								href : EB_Common.Ajax.wrapperUrl('/sspconfig/overView')
							}]
				});

		var conf = {
			id : 'menuCt',
			container: 'contentPanel',
			data : menuData
		};

		var pMenu = new menu(conf);
		pMenu.loadMenuLevel1();
		
		return pMenu;

	}
	
	view.settings.menu.setTableHighlight = function(){
		$('.b-grid-single-table tbody tr').live('mouseover', function(){
			$(this).addClass('highlight');
		}).live('mouseout', function(){
			$(this).removeClass('highlight');
		}).live('click', function(){
			$(this).parent().children('tr').removeClass('selected');
			$(this).addClass('selected');
		});
	}

    $("#level1_3_3").remove();
})(EB_View);