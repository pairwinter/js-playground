/**
 * This is the base class that provides the basic layout and positioning that
 * all tip-based classes require. This class can be used directly for simple,
 * statically-positioned tips that are displayed programmatically. author :
 * Linder Wang date : 2012-7-19
 */
(function(common) {
    var tipSeq = 0;
	$.extend(common, {
		// constructor for toolTip
		toolTip : function(config) {
			this.settings = $.extend(true, {}, common.toolTip.defaults, config);
			this.init();
		}
	});

	$.extend(common.toolTip, {
			defaults : {
				tipClass : 'b-tooltip',
				tipHoverClass : 'b-tooltip-hover',
				tipCaption : 'tipcaption',
				autoRender : true,
				tipBaseClass : 'b-tooltip-info',
				anchor : 'right',//left,right,top or bottom
				orientation : true,// The true is mouse orientation or DOCElement or element id
				arrows : false,
				arrowsOffset : 0,
				offset : 5,
				arrowsW : 10,
				arrowsH : 20,
				arrowsColor : '#000000',
				tipCls : undefined,
				tipStyle : undefined,
				tipMaxWidth : undefined,
				tipAttach : undefined// Attach a kind of tooltip
			},
			
			prototype : {
				init : function(){
				    var me = this,
				        tipAttach = me.settings.tipAttach,
					    toolTips = $('.' + this.settings.tipClass).filter(function() {
							return (tipAttach && typeof tipAttach == 'string') ? $(this).attr('tipAttach') == me.settings.tipAttach : $(this).attr('tooltip') == 'true';
						});
					toolTips.mouseover(function(event){
						var caption = $(this).attr(me.settings.tipCaption);
						me.showTip(caption);
						var x = event.pageX,
						    y = event.pageY;
						me.position(x, y, event.target);
						me.show();
						$(this).addClass(me.settings.tipHoverClass);
					});
					
					toolTips.mouseout(function(event){
						me.hide();
						$(this).removeClass(me.settings.tipHoverClass);
					});
				},
				
				showTip : function(caption){
					if(!this.toolTipInfo){
						this.createTipElement();
					}
					this.toolTipInfo.find('div').html(caption);
				},
				
				createTipElement : function(){
					var tipContainer =  $('<div class="' + this.settings.tipBaseClass + '"/>').appendTo(typeof this.settings.autoRender === 'boolean' ? document.body : this.settings.autoRender),
						tipInfo = $('<div class="' + this.settings.tipBaseClass + '-text"><div>'),
						tipArrows;
					if(this.settings.tipCls){
						tipInfo.addClass(this.settings.tipCls);
					}
					if(this.settings.tipStyle){
						tipInfo.css(this.settings.tipStyle);
					}
					if (this.settings.tipMaxWidth) {
						tipInfo.css({
								'max-width' : this.settings.tipMaxWidth
							});
					}
					
					tipContainer.append(tipInfo);
					this.toolTipInfo = tipInfo;
					
					if(this.settings.arrows === true){
					    this.createTipArrows(tipContainer);
					}
				},
				
				position : function(x, y, target){
				    var orientation = this.settings.orientation,
				    	el;
					if(typeof orientation == 'string'){
						if(orientation == 'element'){
							el = target;
						}else{
							el = document.getElementById(orientation);
						}
					}else if(!!orientation.tagName){//DomElement
						el = orientation;
					}
					if(el){
						var offset = $(el).offset(),
							tip = $(this.toolTipInfo),
							targetH = $(target).outerHeight(),
							targetW = $(target).outerWidth(),
							tipH = tip.outerHeight();
						x = offset.left + targetW + this.settings.offset,
						y = offset.top - Math.abs(tipH/2 - targetH/2);
						if(this.settings.arrows){
							x += this.settings.arrowsW;
						}
					}
					this.toolTipInfo.css({top:y,left:x});
					
					if(this.settings.arrows){
						this.setArrows(x, y + tipH/2);
					}
				},
				
				show : function(animate){
					this.toolTipInfo.show();
					if(this.tipArrows){
						this.tipArrows.show();
					}
				},
				
				hide : function(animate){
					this.toolTipInfo.hide();
					if(this.tipArrows){
						this.tipArrows.hide();
					}
				},
				
				// deal with browser compatibility
				createTipArrows : function(tipContainer){
					var arrowsW = this.settings.arrowsW,
						arrowsH = this.settings.arrowsH,
						tipArrows = $('<div class="' + this.settings.tipBaseClass + '-arrows"></div>');
						support = EB_Common.support;
					this.tipArrows = tipArrows;
					tipContainer.append(tipArrows);
					if(support[support.canvas] === true){
						tipArrows.append('<canvas width="' + arrowsW + 'px" height="' + arrowsH + 'px"></canvas>');
						var canvas = tipArrows.find('canvas')[0],
	                    	context = canvas.getContext('2d');
		                context.beginPath(); // 
						context.fillStyle='rgba(0,0,0,0.7)';// black  alpha 0.7
						context.lineWidth = 0.1;  
		                context.moveTo(0, arrowsH/2);
		                context.lineTo(arrowsW, arrowsH);  
						context.lineTo(arrowsW, 0);  
						context.fill();
		                context.stroke();
		                context.closePath(); 
					}else if(support[support.svg] === true){
						var points = '0 ' + arrowsH/2 + ' ' + arrowsW + ' ' + arrowsH + ' ' + arrowsW + ' 0';
						tipArrows.css({width:arrowsW,height:arrowsH}).append('<svg version="1.1" xmlns="http://www.w3.org/2000/svg"><polygon points="' + points + '" style="fill:#000000;fill-opacity:0.7"/></svg>');

					}else if(support[support.vml]){
					    var points = '0,' + arrowsH/2 + ',' + arrowsW + ',' + arrowsH + ',' + arrowsW + ',0';
						tipArrows.css({width:arrowsW,height:arrowsH}).append('<v:polyline points="' + points + '"  fillcolor="#000000" />');
					}else {
						//Does not support vector diagram
					}
				},
				
				setArrows : function(x, y){
					var arrowsW = this.settings.arrowsW,
						arrowsH = this.settings.arrowsH;
	                this.tipArrows.css({top:(y-arrowsH/2),left:(x-arrowsW)});
				}
			}
	});
	common.toolTip.initialize = function(config) {
	    return new common.toolTip(config);
	}
})(EB_Common);
