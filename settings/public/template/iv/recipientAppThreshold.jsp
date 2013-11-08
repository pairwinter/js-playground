<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
<%-- <script type="text/javascript" src="${ctx }/statics/javascripts/views/settings/iv/recipientAppThreshold.js?version=${util:getBuildInfo()}"></script> --%>
<fileCompress:jscompress compressedFileName="eb_view.settings.iv.js" ctx="${ctx}"></fileCompress:jscompress>
<script type="text/javascript">
	$(function() {
		EB_View.recipientAppThreshold.initPage();
	});
</script>
<div class="b-panel-bwrap">
	<div class="b-panel-header">
		<h3 class="b-panel-title-top">
			<spring:message code="recipientthreshold.text.description" />
            <a class="icon_help right" href="#" roboHelpIndex="44" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
		</h3>
	</div>
	<div class="b-panel-tools right  margin25-R">
		<a href="#" id="addUnsolicitedCategoryButton" style="display:none;"><spring:message code="setting.iv.mobile.add" htmlEscape="false" /></a> 
	</div>
</div>
<table class="b-form-table">
	<tbody>
		<tr>
			<td colspan="2">
			<div class="left margin25-R">
                <c:if test="${organization.allowShareMessage==true}">
				<input type="checkbox" id="allowShareMessage" checked="checked" onclick="EB_View.recipientAppThreshold.modifyShareMessageSetting(this.id);"/> <spring:message
					code="recipientthreshold.text.checbox.allowsharemessage" />
			</c:if>	
			<c:if test="${organization.allowShareMessage==false}">
				<input type="checkbox" id="allowShareMessage" onclick="EB_View.recipientAppThreshold.modifyShareMessageSetting(this.id);"/> <spring:message
					code="recipientthreshold.text.checbox.allowsharemessage" />
			</c:if>
            </div>
            <div class="left">
                <c:if test="${organization.shareMessageStatus==true}">
                    <span class="b-grid-status" id="shareMessageStatus" onclick="EB_View.recipientAppThreshold.modifyShareMessageSetting(this.id);"></span>
                </c:if>
                <c:if test="${organization.shareMessageStatus==false}">
                    <span class="b-grid-status off" id="shareMessageStatus" onclick="EB_View.recipientAppThreshold.modifyShareMessageSetting(this.id);"></span>
                </c:if>
            </div>
            </td>

		</tr>
		<tr>
			<td>
				<c:if test="${organization.allowSendMessage==true}">
					<input type="checkbox" id="allowSendMessage" checked="checked" onclick="EB_View.recipientAppThreshold.modifyShareMessageSetting(this.id);"/> <spring:message
						code="recipientthreshold.text.checbox.allowsendmessage" />
				</c:if>		
				<c:if test="${organization.allowSendMessage==false}">
					<input type="checkbox" id="allowSendMessage" onclick="EB_View.recipientAppThreshold.modifyShareMessageSetting(this.id);"/> <spring:message
						code="recipientthreshold.text.checbox.allowsendmessage" />
				</c:if>	
				
			</td>
				
		</tr>
	</tbody>
</table>
	
<div class="b-panel-bwrap" id="gridPanel">
	<div class="b-panel-title">
		<span class="icon_tabpanel_expand"></span>
		<span class="title" id="unsolicitedCategoryCount"><spring:message
				code="recipientthreshold.text.unsolicitedcategory.title" /></span>
	</div>
	<div>
		<div class="jqgrid scroll-y clear-both">
			<table
				id="unsolicitedCategoryTable">
			</table>
			<div id="unsolicitedCategoryGridPager"></div>
		</div>
	</div>
</div>	
<div class="b-panel-collapse-bg">
	<span class="b-panel-collapse extend" id="panelCollapse"></span>
</div>
<div class="b-panel-bwrap">
	<div class="b-panel-title">
		<span class="icon"></span> <span id="ra_tabpanel_expand_add" class="icon_tabpanel_expand"></span>
		<span class="title" id="addCategoryHead"><spring:message code="setting.iv.mobile.add" htmlEscape="false" /></span>
	</div>
	<div class="b-padding10">
		<form id="addUnsolicitedCategoryForm">
			<table cellspacing="0" cellpadding="0" class="b-formpanel-noborder" width="500px">
				<tbody>
					<tr>
					    <td width="100px"><label for="name"><spring:message code="setting.iv.mobile.name" htmlEscape="false" /></label></td>
						<td>
						    <div class="left margin5-R">
						    	<span>
							 		<input type="text" id="unsolicitedCategoryText" name="unsolicitedCategoryTextName" class="input_short event_input margin5-T" pos="bottom" maxlength="120"/>
							 	</span> 
							 	<input id="unsolicitedCategoryId" type="hidden" value="0"> 
							</div> 
							<dl class="b-select-icon left margin5-R" id="select_map" >
								<dt class="clearfix" tabindex="1">
								    <a href="javascript:void(0)" class="b-univmap-ra-red left" clazz="b-univmap-ra-red"></a>
									<i style="margin-top:20px;" class="icon_gray_downarrow" ></i>
								</dt>
								<dd style="display:none;">
									<a href="javascript:void(0)" class="b-univmap-ra-red"></a>
									<a href="javascript:void(0)" class="b-univmap-ra-purp"></a>
									<a href="javascript:void(0)" class="b-univmap-ra-orng"></a>
									<a href="javascript:void(0)" class="b-univmap-ra-grn"></a>
									<a href="javascript:void(0)" class="b-univmap-ra-blu"></a>
								</dd>
							</dl>
							
						</td>
					</tr>
				</tbody>
			</table>
			<div class="margin5-L">
				<input type="button" class="button orange margin5-T" value="<spring:message code="button.save" htmlEscape="false" />" id="saveUnsolicitedCategory">
			</div>
		</form>
	</div>
</div>

