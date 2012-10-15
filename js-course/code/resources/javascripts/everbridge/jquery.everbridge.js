
/**
 * tools
 */
(function($, undefined) {
	
	//init package
	$.everbridge = $.everbridge || {};
	$.everbridge.platform = $.everbridge.platform || {};

	var re = /\{([\w-]+)\}/g;

	$.everbridge.platform.support = {

		// deal with template
		applyTemplate : function(template, values) {
			return template.replace(re, function(m, name) {
						return values[name] !== undefined ? values[name] : "";
					});
		}

	};
	
	// collection
	$.everbridge.platform.Collection = function(){
		this.items = [];
	    this.map = {};
	    this.keys = [];
	    this.allMap = [];//all nodes
	    this.length = 0;
	};
	
	jQuery.extend($.everbridge.platform.Collection.prototype, {
		/**
		 * 加入一个item到集合中。
		 */
		add : function(key, o) {
			if (arguments.length == 1) {//对于只传一个参数的处理
				o = arguments[0];
				//封装子节点
				if(o.children && o.children.length > 0){
					var coll = new $.everbridge.platform.Collection();
					coll.addAll(o.children);
					o.children = coll;
					
					//this.addAll(o.children);
				}
				key = this.getKey(o);
			}
			if (typeof key != 'undefined' && key !== null) {
				this.map[key] = o;
				this.allMap[key] = o;
			}
			this.length++;
			this.items.push(o);
			this.keys.push(key);
			return o;
		},
		
		getKey : function(o) {
			return o.id;
		},
		
		addAll : function(objs) {
			if (arguments.length > 1
					|| Object.prototype.toString.apply(objs) === '[object Array]') {
				var args = arguments.length > 1 ? arguments : objs;
				for (var i = 0, len = args.length; i < len; i++) {
					this.add(args[i]);
				}
			}
		},

		key : function(key) {
			return this.map[key];
		},

		item : function(index) {
			return this.items[index];
		},
		
		find : function(key){
			return this.allMap[key];
		}

			//

		});

})(jQuery);
