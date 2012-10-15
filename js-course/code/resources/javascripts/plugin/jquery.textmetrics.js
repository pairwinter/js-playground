
/**
 * count the text metrics Linder Wang
 * 
 * @singleton
 */
(function($, undefined) {

	// init package
	$.everbridge = $.everbridge || {};
	$.everbridge.platform = $.everbridge.platform || {};

	$.everbridge.platform.TextMetrics = function() {
		var shared;
		return {
			/**
			 * @param {String/HTMLElement}
			 *            el
			 * @param {String}
			 *            text
			 * @param {Number}
			 *            fixedWidth (optional)
			 * @return {Object}
			 */
			measure : function(el, text, fixedWidth) {
				if (!shared) {
					shared = $.everbridge.platform.TextMetrics.Instance(el,
							fixedWidth);
				}
				shared.bind(el);
				shared.setFixedWidth(fixedWidth || 'auto');
				return shared.getSize(text);
			},

			/**
			 * @param {String/HTMLElement}
			 *            el
			 * @param {Number}
			 *            fixedWidth (optional)
			 * @return {} instance
			 */
			createInstance : function(el, fixedWidth) {
				return $.everbridge.platform.TextMetrics.Instance(el,
						fixedWidth);
			}
		};
	}();

	$.everbridge.platform.TextMetrics.Instance = function(bindTo, fixedWidth) {
		var ml = $('<div></div>').appendTo(document.body);
		ml.css({position:'absolute'});
		ml.offset({top:-1000, left:-1000});
		ml.hide();

		// if fixedWidth, set default width
		if (fixedWidth) {
			ml.setWidth(fixedWidth);
		}

		var instance = {
			/**
			 * @param {String}
			 *            text
			 * @return {Object}
			 */
			getSize : function(text) {
				ml.text(text);
				var size =  {
					width : ml.outerWidth(),
					height : ml.outerHeight()
				};
				ml.text('');
				
				return size;
			},

			/**
			 * @param {String/HTMLElement}
			 *            el
			 */
			bind : function(el) {
				ml.css({
							'font-size' : $(el).css('font-size'),
							'font-style' : $(el).css('font-style'),
							'font-weight' : $(el).css('font-weight'),
							'font-family' : $(el).css('font-family'),
							'line-height' : $(el).css('line-height')
						});
			},

			/**
			 * @param {Number}
			 *            width
			 */
			setFixedWidth : function(width) {
				ml.width(width);
			},

			/**
			 * @param {String}
			 *            text
			 * @return {Number} width
			 */
			getWidth : function(text) {
				ml.style.width = 'auto';
				return this.getSize(text).width;
			},

			/**
			 * @param {String}
			 *            text
			 * @return {Number} height
			 */
			getHeight : function(text) {
				return this.getSize(text).height;
			}
		
		};

		instance.bind(bindTo);

		return instance;
	};

	$.extend($.fn, {
		/**
		 * @param {String}
		 *            text
		 * @param {Number}
		 *            min
		 * @param {Number}
		 *            max
		 * @return {Number}
		 */
		getTextWidth : function(text, min, max) {
			var width = $(this).outWidth(), constrain = function(v, diff, m, mx) {
				if (v - diff < m) {
					diff = v - m;
				} else if (v - diff > mx) {
					diff = v - mx;
				}
				return diff;
			};
			return $.everbridge.platform.TextMetrics.measure(this.dom, text,
					width.constrain(min || 0, max || 1000000));
		}
	});

})(jQuery);
