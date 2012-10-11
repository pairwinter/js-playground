(function(view){
    //global var
	var addValidator,
	    updateValidator,
	    fieldItemTemplete = '<li><input type="text" name="definedValue" class="input_long {required:true}" maxlength="40"/>'
			   +'<a title="'+i18n['button.delete']+'" href="javascript:void(0);" style="display:none;" class="icn_trash_16"></a>'
			   +'<a class="icn_down" href="javascript:void(0);" style="display:none;"></a><a class="icn_up" href="javascript:void(0);" style="display:none;"></a></li>';
	view.settings.contact = {};
	view.settings.contact.customField = {};
	view.settings.contact.customField.initCustomFieldPage = function() {
		
	    // add validation 
		var adding = false;
		addValidator = EB_Common.validation.validate('addForm',{
			rules:{
				name :{
				    remote: {
				    	url:EB_Common.Ajax.wrapperUrl("/setting/contact/checkCustomFieldName")
				    }
				}
			},
			messages:{
				name:{
					remote:i18n['setting.error.customFields.duplicatedName']
				}
			},
			submitHandler:function(){
				if(adding)
    				return;
    			adding = true;
	            var queryString = $('#addDataType, #addDisplayFormat').fieldSerialize(); 
	            var definedValue=[];
	            $('#addForm').find('input[name="definedValue"]').each(function(){
	            	definedValue.push($(this).val());
	            });
	            EB_Common.Ajax.post("/setting/contact/customField?"+queryString,{name:$('#addName').val(),definedValue:definedValue},
	        		function(data){ 
	        		    if($('#emptyData').length > 0){
	        		    	$('#emptyData').remove();
	        		    }
						var str = '<tr name="data" id = "'+ data.id + '" displayformat="'+data.displayFormat+'"><td>'
								+ '</td><td>'
								+ setDataType(data.dataType)
								+ '</td><td>'
								+ setDisplayFormat(data.displayFormat)
								+ '</td><td>'
								+ '<a class="icn_trash_16" href="javascript:void(0);" title="'+i18n['button.delete']+'" ></a></td></tr>';
						$('#customFieldBody').prepend(str);
						$('#' + data.id +' td:eq(0)').text(data.name);
						$('#' + data.id).bind('click',showValue);
						$('#' + data.id + ' td a.icn_trash_16').bind('click',deleteGridItem);
						$('#addCustomField').closest('form').hide();
						$("#addName").removeData("previousValue");
						adding = false;
	            });
			}
		});

       // update form validation
	   var updating = false;
       updateValidator = EB_Common.validation.validate('updateForm',{
			submitHandler:function(){
				if(updating)
    				return;
				updating = true;
	            var definedValue=[];
	            $('#updateForm').find('input[name="definedValue"]').each(function(){
	            	definedValue.push($(this).val());
	            });
	            EB_Common.Ajax.put("/setting/contact/customField",{id:$('#editGrid').prev().attr('id'),name:$('#updateName').val(),definedValue:definedValue},
		        		function(data){ 
		            	if (data == '-1') {
							EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
							return;
						}
						$('#editGrid').prev().find('td').eq(0).text(data.name);
						$('#editGrid').prev().find('td').css('border-width','1px');
						$('#editGrid').hide();
						updating = false;
	            });
			}
    	});
	    
	    $.validator.addMethod('itemsduplicate', function(value, element, param) {
	    	var values = {},
	    		inputs = $(element).closest('ul').find('input').not(element),
	    		lastRepeatValue = $(element).prop('lastRepeatValue'),
	    		repeatInputs = [];
	    	
	    	$(element).prop('lastRepeatValue', $.trim(value));
	    	inputs.each(function(index, element){
	    		values[$.trim($(this).val())] = true;
	    		if($.trim($(this).val()) == lastRepeatValue){
	    	        repeatInputs.push(element);
	    	    }
	    	});
	    	//console.info(repeatInputs);
	    	// remove validation info
	    	if(lastRepeatValue != $.trim(value) && repeatInputs.length == 1){
	    		$(repeatInputs[0]).removeClass('error').next('label.error').remove();
	    	}
		    	
	    	if(values[$.trim(value)]){
	    		return false;
	    	}else{
				return true;
	    	}
			
        }, i18n['setting.error.items.duplicated']);
        
	    // add new custom field click event
		$('#addCustom').click(function(){
		    $('#editGrid').hide();
	        $('#addForm').show().find(':input').not(':button,:submit').val('');
	    	showFormatItem($('#addDisplayFormat').val());
	    });
	    	
	    $('#addItems').click(addItems);
	    $('#addItems_add').click(addItems);
	    
	    $('#addDisplayFormat').change(function(){
	        showFormatItem($(this).val());
	        var inputs = $('#itemsContainer_add li input');
	        if(inputs.length){
	        	validDataType(inputs, addValidator, $('#addDataType').val());
	        }
	    });
	    
	    // click tr show or hide
	    $('#customFieldBody tr[name="data"]').bind('click', showValue);
	    
	    $('#customFieldBody tr td a.icn_trash_16').bind('click', deleteGridItem);
	    
	    $('#updateCustomField').click(function(e){
	        var editRow = $('#editGrid'),
	    	    gridRow = editRow.prev(),
	    	    id = gridRow.attr('id'),
	    	    validation = $('#itemsContainer').next().find('span.error');
	    	if(gridRow.attr('displayformat') != 'F'){
	    		if($('#itemsContainer li').length == 0){
		    		validation[0].style.display = 'inline-block';
		    		return false;
		    	}else{
		    		validation.hide();
		    	}
	    	}
	    	
	    });
	    
	    $('#collapsedBtn').click(function(){
	    	$(this).closest('tr').prev().find('td').css('border-width','1px');
	    	$(this).closest('tr').hide();
	    });
	    $('#cancel').click(function(){
	    	$(this).closest('form').hide();
	    });
		
		$('#addDataType').change(function(){
			var inputs = $('#itemsContainer_add li input');
			inputs.val('').removeClass('error').siblings('.error-right').remove();
			validDataType(inputs, addValidator, $(this).val());
		});
		
		$('#editGrid').bind('click',function(e){
			$(this).prev().addClass('selected');
			//console.info($(this).prev());
			e.stopPropagation();
		});
	};
	
	// Dynamic validation
	/**
     * @param inputs form elements
     * @param validator What is it the validator?
     * @param dataType Data Type Value
    **/
	function validDataType(inputs, validator, dataType){
	    if(!inputs || inputs.length == 0){
	    	return;
	    }
		inputs.removeAttr('readonly').removeAttr('maxlength')
				.datepicker('destroy').rules('remove', 'range');
		inputs.rules('remove', 'number');
	    inputs.rules('add', {
			itemsduplicate : true
		});
		//console.info(dataType);
		dataType = dataType || 'STRING';
		switch(dataType){
			case 'STRING':
			   inputs.attr('maxlength','40');
			   break;
			
			case 'DATE':
			   inputs.attr('readonly','readonly');
			   inputs.datepicker({
					changeMonth : true,
					changeYear : true,
					dateFormat : 'yy-mm-dd',
					onSelect : function(dateStr) {
					    //console.info(this);
					    validator.element(this);
					}
				});
			   break;
			
			case 'NUMBER':
				inputs.rules("add", {
				     number: true,
					 range: [-9999999999,9999999999]
					});
				inputs.attr('maxlength','11');
			    break;
			
			default:
				break;
		}
	}
	
	function showFormatItem(value){
	    $('#itemsContainer_add').hide().html('');
		if(value == 'F'){
		   $('#addItems_add').hide();
	    }else{
	       $('#addItems_add').show();
	       $('#itemsContainer_add').show().append(fieldItemTemplete);
			   
		   $('#itemsContainer_add').on('click', 'a.icn_trash_16', deleteItem);// All of "li a" are bind the event click;
		   $('#itemsContainer_add').on('click', 'a.icn_down', {arrow : 'down'}, upOrDown);
		   $('#itemsContainer_add').on('click', 'a.icn_up', {arrow : 'up'}, upOrDown);
		}
	}
	
	// show grid item info
	
	var lastSelectedGridItem;
	function showValue(e){
	    // set border last tr td
	    if(lastSelectedGridItem){
	    	//$(lastSelectedGridItem).find('td').css('border-width','1px');
	    	$(this).find('td').css('border-color','#DDDDDD');
	    }
	    
        $('#addForm').hide();
        var updateForm;
        if($(this).next().attr('name') == 'gridSub'){
        	updateForm = $(this).next().toggle();
        	return;
        }else{
        	updateForm = $('#editGrid').insertAfter(this).show();
        }
        if(updateForm.is(':hidden')){
        	//$(this).find('td').css('border-width','1px');
        	$(this).find('td').css('border-color','#DDDDDD');
        }else{
        	//$(this).find('td').css('border-width','2px');
        	$(this).find('td').css('border-color','#CCCCCC');
        }
    	var name = $(this).find('td:eq(0)').text(),
    	    datatype = $(this).find('td:eq(1)').html(),
    	    format = $(this).find('td:eq(2)').html(),
    	    id = $(this).attr("id");
    	updateForm.find('input[name="name"]').val($.trim(name));
    	updateForm.find('table tr:eq(1) td:eq(1)').text($.trim(datatype));
    	updateForm.find('table tr:eq(2) td:eq(1) span:eq(0)').text($.trim(format));
    	$("#updateName").rules("remove","remote");
    	$("#updateName").rules("add", {
    		remote: EB_Common.Ajax.wrapperUrl("/setting/contact/checkCustomFieldName?id="+id),
    		messages: {
    			remote:i18n['setting.error.customFields.duplicatedName']
    		 }
    	});
    	
    	$('#itemsContainer').empty();
    	
    	if($(this).attr('displayformat') == 'F'){
    		$('#addItemsTr').hide();
    	}else{
    		$('#addItemsTr').show();
    		EB_Common.Ajax.get("/setting/contact/definedValue",
			{
				id : id
			},
			function(data) {
				for (var i = 0; i < data.length; i++) {
					$(fieldItemTemplete).appendTo('#itemsContainer').find(':input').val(data[i]);
				}
				$('#itemsContainer').on('click', 'a.icn_trash_16', deleteItem);// All of "li a" are bind the event click;
			   	$('#itemsContainer').on('click', 'a.icn_down', {arrow : 'down'}, upOrDown);
			   	$('#itemsContainer').on('click', 'a.icn_up', {arrow : 'up'}, upOrDown);
		   
	            showItemsSort($('#itemsContainer li'));
				//validation 
				validDataType($('#itemsContainer li input'), updateValidator, dataTypeCode(datatype));
			});
    	}
    	lastSelectedGridItem = this;
    }
	
	function deleteGridItem(e){
    	var tr = $(this).closest('tr'),
    	    tbody = tr.parent(),
    	    id = tr.attr("id");
		EB_Common.dialog.confirm(i18n['setting.delete.customField'], i18n['global.dialog.title.confirm'], function() {
			$(this).dialog("close");
			EB_Common.Ajax.remove("/setting/contact/customField", {
				id : id
			}, function(data) {
				if (data == '-1') {
					EB_Common.dialog.alert(i18n['setting.error.resource.notExists'],i18n['dialog.title.warning']);
					return;
				}
				if(tr.next().is('#editGrid')){
					tr.next().hide();
				}
				tr.remove();
				if(tbody.children('tr').length == 0){
					$('<tr id="emptyData"><td colspan="4"><div class="ui-jqgrid-empty-data" style="margin:13px;">' + i18n['global.grid.emptyDataCaption'] + '</div></td></tr>').appendTo(tbody);
				}
			});
		}, function() {
			return;
		});
		e.stopPropagation();
	}
	
	// add format item
	function addItems(e){
	    var id = this.id,
	        containerId = '#itemsContainer' + (id.indexOf('_add') == -1 ? '' : '_add'),
	        dataType = id.indexOf('_add') == -1 ? dataTypeCode($(this).closest('tbody').find('tr:eq(1) td:eq(1)').text()) : $('#addDataType').val(),
	        containerItems,
	        action = $(fieldItemTemplete).appendTo(containerId);
        
        containerItems = $(containerId + ' li');
        showItemsSort(containerItems);
        //validation
		var inputs = action.find('input');
		validDataType(inputs, (id.indexOf('_add') == -1 ? updateValidator : addValidator), dataType);
	}
	//Fields items sort
    function showItemsSort(containerItems) {
		var itemsLength = containerItems.length;
		containerItems.find('a.icn_down').hide();
		containerItems.find('a.icn_up').hide().css('margin-left', '');
		if (itemsLength == 1) {
			containerItems.find('a.icn_trash_16').hide();
		} else {
			containerItems.find('a.icn_trash_16').show();
			containerItems.each(function(index, element) {
						if (index == 0) {
							$(element).find('a.icn_down').show();
						} else if (index == itemsLength - 1) {
							$(element).find('a.icn_up').show().css(
									'margin-left', function(index, value) {
										return parseFloat(value) + 20;
									});
						} else {
							$(element).find('a.icn_down').show();
							$(element).find('a.icn_up').show();
						}
					});
		}
	}
    
    // delete format item
    function deleteItem(e) {
		var parentUl = $(this).closest('ul');
		$(this).closest('li').remove();
		showItemsSort(parentUl.children());
	}
	
	// arrow up and down to sort
	function upOrDown(e) {
		var self = $(this),
		    selfP = self.parent(),
		    parentUl = self.closest('ul'),
			siblings;
		if(e.data.arrow == 'up'){
			siblings = selfP.prev();
			siblings.before(selfP);
		}else{
			siblings = selfP.next();
			siblings.after(selfP);
		}
		showItemsSort(parentUl.children());
	}
	
	function setDataType(dataType) {
		var value;
		if (dataType == 'DATE')
			value = i18n['setting.contact.customFields.date'];
		else if (dataType == 'NUMBER')
			value = i18n['setting.contact.customFields.number'];
		else if (dataType == 'STRING')
			value = i18n['setting.contact.customFields.string'];
		else
			value = dataType;
		return value;
	}

    function dataTypeCode(dataType) {
		var value;
		dataType = $.trim(dataType);
		switch(dataType){
			case i18n['setting.contact.customFields.date']:
				value = 'DATE';
				break;
			case i18n['setting.contact.customFields.number']:
				value = 'NUMBER';
				break;
			case i18n['setting.contact.customFields.string']:
				value = 'STRING';
				break;
			default:
				value = 'STRING';
				break;
		}
		return value;
	}
	
	function setDisplayFormat(displayFormat) {
		var value;
		if (displayFormat == 'L')
			value = i18n['setting.contact.customFields.singleList'];
		else if (displayFormat == 'F')
			value = i18n['setting.contact.customFields.textbox'];
		else if (displayFormat == 'S')
			value = i18n['setting.contact.customFields.multiList'];
		else
			value = displayFormat;
		return value;
	}


})(EB_View);