/**
 * This is a base prompt.
 * we can use the class liking the following.
 * After saving saving – message fades in then fades back out (appears for total of 2 seconds or so)
 * The class is singleton. The prompt object instance only one. 

   @author Linder Wang 
   @date   2012-8-6
 */
 
 /*
  * example
  <button id="btnSave">Save</button>
  <script type="text/javascript">
	$(function() {
		EB_Common.ToolPrompt.show('btnSave','Save Successful!');
	})
	</script>
 */
(function(common) {

   common.ToolPrompt = function() {
		var shared;
		return {
			/**
			 * show prompt info
			 * @param el The el is a DOMElement id , a DOMElement or a jQuery Object
             * @param text The text is prompting the info
			 * @param config Custom config
			 */
			show  : function(el, text, config) {
				if (!shared) {
					shared = common.ToolPrompt.Instance();
				}
				shared.initConfig(config);
				shared.bind(el);
				shared.setText(text);
				//shared.disappear();
			}
		};
	}();
   
   /**
	* Instance ToolPrompt
   **/
   common.ToolPrompt.Instance = function() {
		var instance = {
			defaults : {
				promptClass : 'b-toolprompt',
				autoRender : true,
				disappearTime : 2500,
				adjustWidth : 20
			},
			init : function() {
				this.createElement();
			},
			createElement : function() {
				var prompt = $('<div />').appendTo(document.body);
				this.toolPrompt = prompt;
			},
			initConfig : function(config){
			    this.settings = $.extend(true, {}, this.defaults, config);
			    
			    if(typeof this.settings.autoRender !== 'boolean'){
			    	this.toolPrompt.appendTo(this.settings.autoRender);
			    }
						
				this.toolPrompt.addClass(this.settings.promptClass);
			},
			
			bind : function(el) {
			    if(typeof el == 'string'){
			    	el = $('#' + el);
			    }
				var pos = el.position(), 
					top = pos.top + el.height()/2, 
					left = pos.left + el.outerWidth() + this.settings.adjustWidth;
				this.toolPrompt.css({
							top : top,
							left : left
						});
			},
			setText : function(text) {
				var div = this.toolPrompt.html(text);
				div.slideToggle(1000);
				div.animate({
					left : '+=5'
				}, 1000);
				div.animate({
					left : '-=5'
				}, 1000);
				div.slideToggle(2000);
			},
			disappear : function() {
				var disappearTime = this.settings.disappearTime, prompt = this.toolPrompt;
				setTimeout(function() {
							prompt.fadeOut(1000);
						}, disappearTime);
			}
		};

		instance.init();

		return instance;
	};

})(EB_Common);
