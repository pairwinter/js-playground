<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
<%-- <script type="text/javascript" src="${ctx }/statics/javascripts/views/settings/contact/subscription.js?version=${util:getBuildInfo()}"></script> --%>
<fileCompress:jscompress compressedFileName="eb_view.settings.contact.js" ctx="${ctx}"></fileCompress:jscompress>
<script type="text/javascript" src="${ctx}/statics/javascripts/plugin/jquery.ui.combobox.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript">
	$(function() {
		EB_View.topic.initPage();
        $('.b-tooltip').tooltip();
	});
</script>
<div class="margin10">
	<div class="b-panel-header clearfix">
		<div class="b-panel-header">
			<h3>
                <spring:message code="setting.contact.subscriptionFields" htmlEscape="false" />
                <a class="icon_help right" href="#" roboHelpIndex="54" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
            </h3>
			<input  id="weatherSubscriptionNum" type="hidden" value="${weatherSubscriptionNum}" />
			<div class="b-panel-tools">
				<button id="addSubscription" type="button"
					class="button button-tbl gray ">
					<i class="icn_action_add " id=""></i>
					<spring:message code="button.add" htmlEscape="false" />
				</button>
			</div>
			<form id="form_add_subscription" style="display: none;" >
                  <div style="position:absolute;left:-2000px;">
                    <input type="text" class="input-invisible {duplicateNameCt:['#form_add_subscription','input[name=\'topicTitle\']']}" name="duplicateForAdd"/>
                </div>
				  <div class="advancedsearch_div" >
						<h3><spring:message code="setting.contact.customFields.addFields" htmlEscape="false" /></h3>
                         <div class="advanced-search-assist b-bg-white">
							<table class="b-formpanel-noborder" cellspacing="0" cellpadding="0"  width="100%">
								<tr>
									<td class="b-text-top">
									<label for="cycles"><spring:message code="setting.contact.subscriptionFields.topicCategoryType" htmlEscape="false" /></label></td>
									<td>
										<select id="topicCategoryType" name="topicCategoryType" class="select select_long">
											<option id="customizedOption" value="Customized"><spring:message code="setting.contact.subscriptionFields.customized" htmlEscape="false" /></option>
											<option id="weatherOption" value="Weather" <c:if test="${not hasWeatherFeatures}">disabled="disabled"</c:if> ><spring:message code="setting.contact.subscriptionFields.weather" htmlEscape="false" /></option>
							  			</select>
							  			<a class="icon_help b-tooltip" title="<spring:message code="setting.contact.subscriptionFields.weather.tip" htmlEscape="false" />"  href="javascript:void(0)"></a>
							  		</td>
								</tr>
								<tr>
									<td class="b-text-top">
									<label for="cycles"><span id="heading" class="xing" style="display:none">*</span><spring:message code="setting.contact.subscriptionFields.group" htmlEscape="false" /></label></td>
									<td>
										<select id="topicGroup" target_id="topicGroupName" name="topicGroup" maxlength='40' >
											<option value=""></option>
										</select>
										<input name="topicGroupName" id="topicGroupName" class="margin25-L input-invisible" type="text" value="" maxlength='40'/>
										<a class="icon_help b-tooltip" title="<spring:message code="setting.contact.subscriptionFields.group.tip" htmlEscape="false" />"  href="javascript:void(0)"></a>
							  		</td>
								</tr>
								<tr type="customized">
									<td class="bold input_short">
									<label for="cycles"><span class="xing">*</span><spring:message code="setting.contact.subscriptionFields.name" htmlEscape="false" /></label></td>
									<td>
                                        <input type="text" id="topicCategoryTitle" name="topicCategoryTitle" class="input_long {required:true,maxlength:40}" maxlength="40"/>
                                        <input type="hidden" id="topicCategoryId" />
                                    </td>
								</tr>
								<tr type="customized">
									<td class="b-text-top">
									<label for="cycles"><span class="xing">*</span><spring:message code="setting.contact.subscriptionFields.value" htmlEscape="false" /></label></td>
									<td>
										  <ul id="itemsContainer_add">
										  	<li class="liAdded">
											  	<input type="text" name="topicTitle" maxlength="40" class="input_long {required:true,maxlength:40}"/><input type="hidden" name="topicId" value="0" class="input_long"/><a class="icn_trash_16" href="javascript:void(0);" style="display:none;" title="<spring:message code="button.delete" htmlEscape="false" />"></a>
										  	</li>
										  </ul>
										  
									  	  <a id="addItems_add_subscription" href="javascript:void(0);" style="display:inline-block;"><i class="icn_addLink_12"></i> <spring:message code="button.add.another.items" htmlEscape="false" /></a>
									   
				                    </td>
								</tr>
								<c:forEach var="group" items="${groups}">
									<tr type="weatherGroup" style="display:none;">
									<td class="bold input_short bg_BE">
									<label for="cycles"><spring:message code="setting.contact.subscriptionFields.name" htmlEscape="false" /></label></td>
									<td class="bg_BE">
                                        <b><c:out value="${group.name}"></c:out></b>
                                    </td>
								</tr>
								<tr type="weatherType" style="display:none">
									<td class="b-text-top">
									<label for="cycles"><spring:message code="setting.contact.subscriptionFields.value" htmlEscape="false" /></label></td>
									<td>
										  <ul class="margin10-L">
										   	<c:forEach var="weatherService" items="${group.weatherServices}">
									  	 		<li>
									  	 			${weatherService.title}
									  	 		</li>
									  		</c:forEach>
										  </ul>
				                    </td>
								</tr>
								</c:forEach>
							</table>
						<div class="margin20-T">
							<input type="button" class="button orange margin5-R" value="<spring:message code="button.save" htmlEscape="false" />"
								id="saveTopic"> 
								<input id="cancel" class="button gray" type="button" value="<spring:message code="button.cancel" htmlEscape="false" />">
						</div>
                         </div>
				</div>
			</form>
		</div>
	</div>
	<div class="margin10-T" id="gridPanel">
		<div class="b-panel-body b-panel-nobox jqgrid">
			<table id="topicTable" style="width: 100%;">
			</table>
		</div>
	</div>

</div>
<table id="editGrid" style="display:none;" name="gridSub" width="100%" cellpadding="0" cellspacing="0">
		<tr>
		  <td class="b-grid-single-sub" style="border-bottom:1px">
		     <form id="updateForm">
                <div style="position:absolute;left:-2000px;">
                    <input type="text" class="input-invisible {duplicateNameCt:['#updateForm','input[name=\'topicTitleUpdate\']']}" name="duplicateForUpdate"/>
                </div> 
		  	   <div class="b-panel-body ">
					<table cellspacing="0" cellpadding="0" class="b-formpanel-noborder" width="100%">
						<tbody>
							<tr>
								<td class="b-text-top">
								<label for="cycles"><span id="updateHeading" class="xing" style="display:none">*</span><spring:message code="setting.contact.subscriptionFields.group" htmlEscape="false" /></label></td>
								<td>
									<select id="topicGroup_edit" target_id="topicGroupName_edit" name="topicGroup_edit" maxlength='40' >
										<option value=""></option>
									</select>
									<input name="topicGroupName_edit" class="margin25-L input-invisible" id="topicGroupName_edit" type="text" value="" maxlength='40'/>
									<a class="icon_help b-tooltip" title="<spring:message code="setting.contact.subscriptionFields.group.tip" htmlEscape="false" />"  href="javascript:void(0)"></a>
						  		</td>
							</tr>
							<tr>
								<td><label><spring:message code="setting.contact.subscriptionFields.topicCategoryType" htmlEscape="false" /></label></td>
								<td></td>
							</tr>
							<tr type="customized">
								<td width="130px"><label><span class="xing">*</span><spring:message code="setting.contact.subscriptionFields.name" htmlEscape="false" /></label></td>
								<td class="padding25-L">
								    <input type="text" id="topicCategoryTitleUpdate" name="name" class="input_long {required:true,maxlength:40}" maxlength="40">
								    <input type="hidden" id="topicCategoryIdUpdate" />
								    <input type="hidden" id="topicCategory" />
								</td>
							</tr>
							<tr type="customized">
								<td class="b-text-top">
								<label><span class="xing">*</span><spring:message code="setting.contact.subscriptionFields.value" htmlEscape="false" /></label></td>
								<td class="padding50-L">
								  <span></span>
								  <ul class="b-distance" id="itemsContainer" style="padding: 0;">
								  </ul>
								  <div>
								  	<a id="addItems_subscription" href="javascript:void(0);" style="display:inline-block;"><i class="icn_addLink_12"></i> <spring:message code="button.add.another.items" htmlEscape="false" /></a>
								  </div>
			                    </td>
							</tr>
							<c:forEach var="group" items="${groups}">
									<tr type="weatherGroup" style="display:none;">
									<td class="bold input_short bg_BE">
									<label for="cycles"><spring:message code="setting.contact.subscriptionFields.name" htmlEscape="false" /></label></td>
									<td class="bg_BE">
                                        <b><c:out value="${group.name}"></c:out></b>
                                    </td>
								</tr>
								<tr type="weatherType" style="display:none">
									<td class="b-text-top">
									<label for="cycles"><spring:message code="setting.contact.subscriptionFields.value" htmlEscape="false" /></label></td>
									<td>
									  <ul class="margin10-L">
									   	<c:forEach var="weatherService" items="${group.weatherServices}">
								  	 		<li>
								  	 			${weatherService.title}
								  	 		</li>
								  		</c:forEach>
									  </ul>
				                    </td>
								</tr>
								</c:forEach>
						</tbody>
					</table>
					<div class="margin20-T">
						<input type="button" value="<spring:message code="button.update" htmlEscape="false" />" class="button orange margin5-R" id="updateSubscriptionField">
						<input id="collapsedBtn" class="button gray" type="button" value="<spring:message code="button.cancel" htmlEscape="false" />">
					</div>
				</div>
			</form>
		  </td>
		</tr>
</table>
