
/**
 * jQuery plug 
 * 
 */
(function($, undefined) {
	
	/**
	 * setting menu
	**/
	$.everbridge.platform.SettingMenu = function(o) {
		if(!o || !o.id){
			return;
		}
		var id = o.id,
		    menuCt = $('#' + id);
		if(menuCt.length == 0){
			return;
		}
		
		this.menuCt = menuCt;
		
		//async loading default false 
		this.asyn = o.asyn || false;
		
		//when async loading need param data
		if(this.asyn === false && o.data){
			var collection = new jQuery.everbridge.platform.Collection();
			collection.addAll(o.data);
			this.data = collection;
		}
		
		if(this.asyn === false && o.url){
			this.url = o.url;	
		}
		this.params = o.params || {};
		
		var container = o.container;
		if(container){
			if(typeof container == 'string'){
				container = $('#' + container);
			}else{
			    container = $(container); 
			}
			if(container.length > 0){
				this.container = container;
			}
			
		}
		
		this.initMenu();
		this.initTemplate();
		
		this.suspend = false;
		
	};
	
	var menu = $.everbridge.platform.SettingMenu,
		menuP = menu.prototype,
	    apply = $.everbridge.platform.support.applyTemplate;

	jQuery.extend(menuP, {

		/**
		 * init Menu
		 */
		initMenu : function(){
			var html = [];
			html.push('<b class="arrows"></b>');
			html.push('<div class="b-menu-ct"></div>');	   
			this.menuCt.html(html.join(''));	
			
			var menu = this.menuCt.find('.b-menu-ct'),
				arrows = this.menuCt.find('b.arrows');
				
			this.menu = menu;
			this.arrows = arrows;
		},
		
		/**
		 * init Menu Template
		 */
		initTemplate : function(){
			var temp;
			//menu level1
			if(!this.templateLevel1){
				temp = [];
				temp.push('<div id="{id}" class="b-node-level1">');
				temp.push('	<span class="b-node-text">{name}</span>');
				temp.push('</div>');
				this.templateLevel1 = temp.join('');
			}
			//menu level2
			if(!this.templateLevel2){
				temp = [];
				temp.push('<div id="{id}" class="b-node-level2">');
				temp.push('	<span class="b-node-text">{name}</span>');
				temp.push('</div>');
				this.templateLevel2 = temp.join('');
			}
		},
		
		/**
		 * load the menu of level 1
		 */
		loadMenuLevel1 : function() {
			var me = this;
			if (this.asyn) {
				$.ajax({
					url : me.url,
					data : me.params,
					type : 'get',
					contentType : 'application/json;charset=utf-8',
					dataType : "json",
					success : function(data, textStatus) {
						me._loadMenuLevel1(data);
					}
				});
			} else {
				if(!this.data || this.data.length == 0){
					return;
				}
				
				this._loadMenuLevel1(this.data);
			}
		},

		
		//private
		_loadMenuLevel1 : function(data) {
			var html = [],
				me = this,
				menu = me.menu;
			html.push('<ul class="b-menu-el">');
			for (var i = 0, len = data.length; i < len; i++) {
				html.push('<li>');
				html.push(apply(this.templateLevel1, data.item(i)));
				html.push('</li>');
			}
			html.push('</ul>');
			menu.html(html.join(''));

			// highlight
			var items = menu.find('li div.b-node-level1');
			items.mouseover(function() {
						$(this).addClass('hightlight');
					});
			items.mouseout(function() {
						$(this).removeClass('hightlight');
					});

			items.click(function() {
			    me.currentItmeLevel1 = this;
			    me._clickMenuLevel1();
			});
		},
		
		//private
		_clickMenuLevel1 : function(){
			var el = $(this.currentItmeLevel1),
				id = el.attr('id'),
				level2El = el.next();
			if (el.hasClass('b-node-extended')) {
				el.removeClass('b-node-extended');
				level2El.hide();
			} else {
				if (this.lastNodeLevel1) {
					this.lastNodeLevel1.next().hide();
					this.lastNodeLevel1.removeClass('b-node-extended');
				}
				el.addClass('b-node-extended');
				if (level2El.length == 0) {
					el.after('<div class="b-node-submenu" style="display:none;"></div>');
					level2El = el.next();
					this.loadMenuLevel2(level2El, id);
				}
				if(level2El.find('ul').length > 0 ){
					level2El.show();
					//var top = level2El.find('ul li').position().top + 8;
					//this.arrows.css({top:top});
                    this.arrows.hide();
				}else{
				    var top = el.position().top + 8;
					this.arrows.css({top:top});
                   //this.arrows.hide();
				}
			}
			this.lastNodeLevel1 = el;
			this.adjustContainerHeight();
		},
		
		/**
		 * load the menu of level 1
		 * param container  
		 * param parentId 
		 */
		loadMenuLevel2 : function(container, parentId) {
			if (this.asyn) {
				$.ajax({
					url : me.url,
					data : {parentId1:parentId},
					type : 'get',
					contentType : 'application/json;charset=utf-8',
					dataType : "json",
					success : function(data, textStatus) {
						me._loadMenuLevel2(container, data);
					}
				});
			} else {
				var subData = this.data.key(parentId);
				if(!subData.children || subData.children.length == 0){
					return;
				}
				
				this._loadMenuLevel2(container, subData.children);
			}
			
		},
		
		//private
		_loadMenuLevel2: function(container, data){
			var html = ['<ul>'],
				me = this;
			for (var i = 0, len = data.length; i < len; i++) {
				html.push('<li>');
				html.push(apply(this.templateLevel2, data.item(i)));
				html.push('</li>');
			}
			html.push('</ul>');
			container.html(html.join(''));
			
			//highlight
			var items = container.find('ul li div.b-node-level2');
			items.mouseover(
				function(){
					$(this).addClass('hightlight');
				}
			);
			items.mouseout(
				function(){
					$(this).removeClass('hightlight');
				}
			);
			
			items.click(function() {
				me.currentItmeLevel2 = this;
				me.currentItemData = data;
				me.leavePage(2);
			});
		},
		
		//private
		_clickMenuLevel2 : function(){
			var el = $(this.currentItmeLevel2),
			    id = el.attr('id'),
			    data = this.currentItemData;
			if (this.lastNodeLevel2) {
				this.lastNodeLevel2.removeClass('b-node-current');
			}
			el.addClass('b-node-current');
			
			this.lastNodeLevel2 = el;
			
			var top = el.position().top + 8;
			this.arrows.css({top:top});
            this.arrows.show();
			
			var href = data.key(id).href,
			    handler = data.key(id).handler,
			    leavePage =  data.key(id).leavePage,
			    minWidth = data.key(id).minWidth;
			if(href){
			    this.ajaxLoading({
							url : href,
							handler : handler,
							leavePage : leavePage,
							minWidth : minWidth
						});
			}
		},
		
		/**
		 * set current menu
		 */
		setCurrentMenu : function(level1NodeId, level2NodeId, url) {
			if (!this.asyn) {
				var el,
					menu = this.menu,
					collapsedEl;
				if (level1NodeId) {
					el = menu.find("#" + level1NodeId);
					if (el.next().length == 0) {
						el.after('<div class="b-node-submenu" style="display:none;"></div>');
					}
					el.addClass('b-node-extended');
					container = el.next();
					this.lastNodeLevel1 = el;
					this.loadMenuLevel2(container, level1NodeId);
					if(container.find('ul').length > 0 ){
						container.show();
					}
				}

				if (level2NodeId) {
					el = menu.find("#" + level2NodeId);
					el.addClass('b-node-current');
					this.lastNodeLevel2 = el;
					
					var top = el.position().top + 8;
					this.arrows.css({top:top});
					
					this.ajaxLoading({
								url : url
							});
				}
			}
		},
		
		adjustContainerHeight : function(){
			var menuHeight = this.menuCt.height(),
				    contentPanel = this.container;
				if(contentPanel.outerHeight() <= menuHeight){
					contentPanel.css({
						minHeight : menuHeight - 32
					});
				}else{
					contentPanel.css({
						minHeight : 400
					});
				}
				
				//me.container.parent().css({minHeight:menuHeight});
		},
		
		/**
		 * load pages
		 * @param options
			{
				href : href,
				handler : handler,
				leavePage : leavePage,
				minWidth : minWidth
			}
		**/
		ajaxLoading : function(options) {
			var url = options.url,
				handler = options.handler,
				leavePage = options.leavePage,
				minWidth = options.minWidth;
				
		    if(handler && typeof handler == 'function'){
		        handler();
		    }
	    	var container = this.container,
		    	menuHeight = this.menuCt.height(),
		    	me = this;
			if(!container){
				return;
			}
			//unify destroy all dialog
			EB_Common.dialog.destroyAll();
			container.empty().css('min-width','');
	        
	        EB_Common.LeavePage.removeListener();
			//remote
	        $.ajax({
				url: url,
				success: function(r, s){
					container.html(r);
					if(minWidth && typeof minWidth == 'number'){
						container.css('min-width',minWidth);
					}
					me.adjustContainerHeight();
				},
				complete: function(r, s){
				    if(leavePage !== false){
				    	EB_Common.LeavePage.addListener(null, container.attr('id'));
				    }
				}
			});
			//lacal
			//container.load(url, function() {});

		},
		
		leavePage : function(level){
		    var fn = level == 1 ? this._clickMenuLevel1 : this._clickMenuLevel2,
		        scope = this;
			if(EB_Common.LeavePage.changeState()){
	    		EB_Common.dialog.leavePage(function(){
	    			EB_Common.LeavePage.removeListener();
	    			fn.call(scope);
	    		});
	    	}else{
	    		fn.call(scope);
	    	}
		}
			//
	});

})(jQuery);

