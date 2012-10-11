$(document).ready(function(e) {
    $('#profileMenu li a').click(function(e){
		e.preventDefault();
		var me = $(this);
		var tabs = $('#profileMenu li a'),
			subTabs = $('#profileSubMenu li a');
		for(var i=0,len=tabs.length;i<len;i++){
			tabs.eq(i).removeClass('selected_pro');
			tabs.eq(i).find('span i').removeClass('arrow_moveout');
		}
		for(var i=0,len=subTabs.length;i<len;i++){
			subTabs.eq(i).removeClass('selected_pro');
			subTabs.eq(i).find('span i').removeClass('arrow_moveout');
		}
		me.addClass('selected_pro');
				
		if(me.attr('name') == 'hasChildren'){
			var arrow = me.find('span i');
			arrow.toggleClass('arrow_up_moveout','arrow_down');
			$('#profileSubMenu').toggle();
		}else{
			me.find('span i').addClass('arrow_moveout');
			tabs.eq(2).find('span i').removeClass('arrow_up_moveout');
			var href = $(this).attr('href');
			//remote
			   $.ajax({
					url: href,
					success: function(r, s){
						$('#profileContent').html( r );
					}
				});
			//lacal
			//$('#profileContent').load(href,function(){});
		}
		
	});
	
	//remote
	$.ajax({
		url: 'change_psw.html',
		success: function(r, s){
			$('#profileContent').html( r );
		}
	});
	//$('#profileContent').load('change_psw.html',function(){});
	
	
	//subMenu
	$('#profileSubMenu li a').click(function(e){
		e.preventDefault();
		var me = $(this);
	
		var tabs = $('#profileSubMenu li a'),
			length = tabs.length;
		for(var i=0;i<length;i++){
			tabs.eq(i).removeClass('selected_pro');
			tabs.eq(i).find('span i').removeClass('arrow_moveout');
		}
		me.addClass('selected_pro');
		me.find('span i').addClass('arrow_moveout');
		
		var href = $(this).attr('href');
		//remote
		   $.ajax({
				url: href,
				success: function(r, s){
					$('#profileContent').html( r );
				}
			});
		//lacal
		//$('#profileContent').load(href,function(){});
		
	});
	
});

