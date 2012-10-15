/**
 * Created with IntelliJ IDEA.
 * User: carl
 * Date: 8/13/12
 * Time: 5:56 PM
 * To change this template use File | Settings | File Templates.
 */
(function(view){
    var advancedSearch = function(settings){
        this.setting={
            container:'',
            filterRules:[],
            exsitFilterRules:[],
            attrs:['attributeId','type','contactFieldId','columnName','embeddedColumnName','showType',
                'dataType','contactFilterOption','displayName','displayFieldName','fieldName' ],
            orgAttrMap : {},
            topicCategoryMap : {},
            recordTypesStr : {},
            languagesStr : {},
            countrysStr : {},
            tabledId : '',
            formId : '',
            context : '',
            searchBtnId:'_advanceSearchBtn',
            callback:{
                beforeSearch:null,
                searchFun:null,
                afterRuleAdd:null,
                afterRuleRemove:null
            },
            tippos:null,
            fieldReader:{
                name:'displayName',
                fieldName:'fieldName',
                fieldDisplayName:'displayName',
                dataType:'dataType',
                showType:'showType',
                operator:'operator',
                fieldValue:'fieldValue',
                defaultValue:'defaultValue',
                inputValue:'inputValue'
            }
        };
        this.addCondtion=function(field){
            console.log(field);
            var self = this;
            var newSearchDiv = $('<div class="advanced-search-item">');
            var attrs = this.setting.attrs;
            var fieldReader = this.setting.fieldReader;
            for (var i = 0; i < attrs.length; i++) {
                if(field[attrs[i]]){
                    newSearchDiv.append($('<input type="hidden">').attr("name", attrs[i]).val(field[attrs[i]]));
                }
            }
            var displayName = $('<input type="text"  name="displayName" readonly="readonly" class="input">').val(field[fieldReader.fieldDisplayName]);

            var operatorSelect = $('<select class="select">').attr('name', this.setting.fieldReader.operator);
            var searchValueInput = $('<input type="text" name="fieldValue" class="searchValueInput input_width250">');
    //            var deleteSearch = $('<a href="javascript:void(0);" class="icn_trash_16 deleteSearch">');
            var deleteSearch = $(document.createElement('a')).attr("href","javascript:void(0);").addClass("icn_trash_16 deleteSearch txt_top");
            deleteSearch.bind('click',function(){
                $(this).parent().parent().remove();
                if(self.setting.callback.afterRuleRemove)
                    self.setting.callback.afterRuleRemove.call(this);
            }) ;
            var valueSpan = $('<span>').append(searchValueInput).append(deleteSearch);

    //            alert(valueSpan.html());
            var validationCss = "{required:true}";

            if(field[fieldReader.showType]=="MULTIPLE"){
                operatorSelect.append($('<option>').val("IN").text(i18n['global.operator.IN']));
                operatorSelect.append($('<option>').val("NIN").text(i18n['global.operator.NIN']));
            }else if(field[fieldReader.showType]=="SINGLE"){
                operatorSelect.append($('<option>').val("E").text(i18n['global.operator.IS']));
                operatorSelect.append($('<option>').val("NE").text(i18n['global.operator.ISNOT']));
            }else if(field[fieldReader.fieldName]=="userId" ||
                field[fieldReader.fieldName]=="individualAccountId" ||
                field[fieldReader.fieldName]=="address.gisLocation.lon"){
                operatorSelect.append($('<option>').val("ISNULL").text(i18n['global.operator.ISNULL']));
                operatorSelect.append($('<option>').val("NOTNULL").text(i18n['global.operator.NOTNULL']));
                searchValueInput.remove();
            }else if(field[fieldReader.dataType] == "STRING"){
                operatorSelect.append($('<option>').val("E").text(i18n['global.operator.E']));
                operatorSelect.append($('<option>').val("NE").text(i18n['global.operator.NE']));
                operatorSelect.append($('<option>').val("LIKE").text(i18n['global.operator.LIKE']));
            }else if(field[fieldReader.dataType] == "DATE"){
                operatorSelect.append($('<option>').val("BETWEEN").text(i18n['global.operator.EQTO']));
                operatorSelect.append($('<option>').val("LT").text(i18n['global.operator.BEFORE']));
                operatorSelect.append($('<option>').val("LTE").text(i18n['global.operator.BEFOREOREQ']));
                operatorSelect.append($('<option>').val("GT").text(i18n['global.operator.AFTER']));
                operatorSelect.append($('<option>').val("GTE").text(i18n['global.operator.AFTEROREQ']));
            }else{
                operatorSelect.append($('<option>').val("E").text(i18n['global.operator.E']));
                operatorSelect.append($('<option>').val("NE").text(i18n['global.operator.NE']));
                operatorSelect.append($('<option>').val("LT").text(i18n['global.operator.LT']));
                operatorSelect.append($('<option>').val("LTE").text(i18n['global.operator.LTE']));
                operatorSelect.append($('<option>').val("GT").text(i18n['global.operator.GT']));
                operatorSelect.append($('<option>').val("GTE").text(i18n['global.operator.GTE']));
            }
            operatorSelect.val(field[fieldReader.operator]);
            var datepickSetting = {
                showOn : "button",
                buttonImage : this.setting.context+"/statics/stylesheets/common/img/icn_calendar_16.png",
                buttonImageOnly : true,
                changeMonth : true,
                changeYear : true,
                buttonText: "Calendar",
                altFormat: "yy-mm-dd",
                dateFormat: "yy-mm-dd",
                buttonText: "Calendar",
                onClose : function(dateStr) {
                    $(this).valid();
                }
            };
            switch(field[fieldReader.showType]){
                case "MULTIPLE":
                    var multiSelect = $("<select>").attr("multiple","multiple").addClass("select-multiple ").attr('name','fieldValue');
                    for(var key in field[fieldReader.defaultValue]){
                        var isSelected = false;
                        if(!$.isEmptyObject(field[fieldReader.inputValue])){
                            $.each(field[fieldReader.inputValue],function(i,element){
                                if(element==key){
                                    isSelected=true;
                                }
                            });
                        }
                        multiSelect.append($("<option>").val(key).text(field[fieldReader.defaultValue][key]).attr("selected",isSelected));
                    }
                    validationCss = "{required:true}";
                    searchValueInput.replaceWith(multiSelect);
                    searchValueInput = multiSelect;
                    break;
                case "SINGLE":
                    var select = $("<select>").addClass("select_width250").attr('name','fieldValue');
                    for(var key in field[fieldReader.defaultValue]){
                        select.append($("<option>").val(key).text(field[fieldReader.defaultValue][key]).attr("selected",(key==field[fieldReader.inputValue])));
                    }
                    searchValueInput.replaceWith(select);
                    searchValueInput= select;
                    validationCss = "{required:true}";
                    break;
                case "TEXT":
                    if (field[fieldReader.dataType] == "DATE") {
                        searchValueInput.attr("readonly", true).addClass("datepicker_attr").datepicker(datepickSetting);
                        validationCss = "{required:true}";
                    }
                    if (field[fieldReader.dataType] == "NUMBER") {
                        validationCss = "{required:true,number:true}";
                    }
                    searchValueInput.val(field[fieldReader.inputValue]);
                    break;
                default:
                    validationCss = "{required:true}";
                    searchValueInput.val(field[fieldReader.inputValue]);
                    break;
            }

            searchValueInput.addClass(validationCss);
            if(self.setting.tippos)
                searchValueInput.attr("pos",self.setting.tippos);

            console.log(searchValueInput);
    //            EB_Common.logger.debug(newSearchDiv);
            $("#advance_search_rows").append(newSearchDiv.append(displayName).append(operatorSelect).append(valueSpan));
            if(self.setting.callback.afterRuleAdd)
                self.setting.callback.afterRuleAdd.call(this);
            return newSearchDiv;
        };
        this.getCondition=function(container){
            var conditionArray = [];
            var advanceSearchMain = this;
            if(container === undefined){
                container = this.setting.container?this.setting.container:"advance_search_rows";
            }
            $("#"+container+" > div").each(function(){
                var showType = $(this).find("input[name$='showType']").val();
                var type = $(this).find("input[name$='type']").val();
                var resultJson={};
                $(this).find("input,select").each(function(){
                    var lastName = $(this).attr("name");
                    var val=$(this).val();
                    if((showType=="MULTIPLE" || type=="CUSTOM") && lastName==advanceSearchMain.setting.fieldReader.fieldValue){

                        val = [];
                        if($(this).attr("multiple")=='multiple'){
                            $(this).find("option:selected").each(function(){
                                val.push($(this).val());
                            });
                        }else{
                            val.push($(this).val());
                        }
                    }
                    resultJson[lastName]=val;
                });
                if(!$.isEmptyObject(resultJson)){
                    conditionArray.push(resultJson);
                }
            });

            return EB_Common.json.stringify(conditionArray);
        };
        this.init=function(settings){
            var advanceSearchMain = this;
            this.setting = $.extend(advanceSearchMain.setting,settings);
            var fieldReader = this.setting.fieldReader;
            var datepickSetting = {
                showOn : "button",
                buttonImage : advanceSearchMain.setting.context+"/statics/stylesheets/common/img/icn_calendar_16.png",
                buttonImageOnly : true,
                changeMonth : true,
                changeYear : true,
                buttonText: "Calendar",
                altFormat: "yy-mm-dd",
                dateFormat: "yy-mm-dd",
                onClose : function(dateStr) {
                    $(this).valid();
                }
            };
            $(".datepicker_attr").datepicker(datepickSetting);

            var tabledId = this.setting.tabledId;
            var formId = this.setting.formId;
            var context = this.setting.context;
            var searchBtnId = this.setting.searchBtnId;
            var filterRules = advanceSearchMain.setting.filterRules;
            var exsitFilterRules = advanceSearchMain.setting.exsitFilterRules;
            if(filterRules){
                $.each(filterRules,function(i,element){
                    var option = $('<option>').val(element.type).text(element[fieldReader.fieldDisplayName]).attr('filterIndex',i);
                    $('#_advancedSearch_select').append(option);
                });
            }
            if(exsitFilterRules){
                $.each(exsitFilterRules,function(i,element){
                    advanceSearchMain.addCondtion(element);
                });
            }
            $("#isFilterCheck").click(function(){
                if($(this).is(":checked")){
                    var filterDiv = $('<div class="left margin25-R" id="filterName_div">');
                    var filterlabled = $('<label>').text(i18n["contact.text.filter.name"]).addClass('margin5-R');
                    var filterInput =$('<input id="filterName" name="filterName" type="text">').addClass('input checkFilterNameSearch {required:true}');
                    $(this).parent().after(filterDiv.append(filterlabled).append(filterInput));
                    $("#filterName").rules("add", {
                        remote: {
                            url: context+"/contacts/filters/check/name/json",
                            type: "post",
                            data: {
                                name: function(){
                                    return $("#filterName").val();
                                }
                            }
                        },
                        messages: {
                            remote: i18n['global.valid.text.checkFilterName']
                        }
                    });
                }else{
                    $(this).parent().next('div').remove();
                }
            });
            /*$.validator.addMethod('checkFilterNameSearch',function(value,element){
                var result;
                $.ajax(context+'/contacts/filters/check/name/json',
                    {data:{name:value},
                        success:function(data){
                            result = data;
                        },
                        type:'post',
                        dataType:'json',
                        async:false});
                return result;
            },i18n['global.valid.text.checkFilterName']);*/

            $.validator.addMethod('checkConditionNum',function(value,element){
                return $("#advance_search_rows > div").size()>0;
            },'Please choose one condition at least!');

            $("#_advancedSearch_select").change(function(){
                if(!$(this).val()){
                    return false;
                }
                advanceSearchMain.addCondtion(filterRules[$(this).find("option:selected").attr("filterIndex")]);
                $(this).val("");
            });
            $(".deleteSearch").click(function(){
                $(this).parent().parent().remove();
            });
            $("#"+searchBtnId).click(function(){

                var validResult = true;
                $("#advanced_content_div").find('input,select').each(function(){
                    var t = $(this).valid();
                    if(validResult){
                        validResult = t;
                    }
                });
                if(!validResult){
                    return;
                }
                var isFilterVal = ($("input[name='isFilter']:checked").val()!=undefined)?true:false;
                var filterName= $("#filterName").val();
                var conditionStr = advanceSearchMain.getCondition();
                if((typeof advanceSearchMain.setting.callback.beforeSearch)=="function"){
                    advanceSearchMain.setting.callback.beforeSearch.apply(this,[conditionStr]);
                }
                if((typeof advanceSearchMain.setting.callback.searchFun)=="function"){
                    return advanceSearchMain.setting.callback.searchFun.apply(this,[conditionStr]);
                }
                if(tabledId){
                    $('#'+tabledId).jqGrid('setGridParam',{datatype:'json',postData:{quickSearchValue:'',
                        filterRules:conditionStr,isFilter:isFilterVal,filterName:filterName}}).trigger("reloadGrid");
                }

            });
        };
        if(settings)
            this.init(settings);
    };
    view.advancedSearch = advancedSearch;
})(EB_View);
