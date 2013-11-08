<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
<%-- <script type="text/javascript"
	src="${ctx }/statics/javascripts/views/settings/organization.js?version=${util:getBuildInfo()}"></script> --%>
<fileCompress:jscompress compressedFileName="eb_view.settings.org.js" ctx="${ctx}"></fileCompress:jscompress>
<!-- setting panel -->
<form id="loginMsgForm">
	<div class="margin10">
		<h3>
			<spring:message code="setting.org.loginMsg" htmlEscape="false" />
            <a class="icon_help right" href="#" roboHelpIndex="38" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
		</h3>
		<p class="margin25-B"><spring:message code="setting.org.loginMsg.info" htmlEscape="false" /></p>
		<p>
			<spring:message code="setting.org.loginMsg.lastModifyDate"
				htmlEscape="false" />: <span id="lastModifiedDate" ><fmt:formatDate value="${org.lastModifiedMsgDate}" 
				timeZone="${user.timeZoneId}" pattern="yyyy-MM-dd HH:mm:ss z"/></span>
		</p>

		<p class="margin25-B">
			<spring:message code="setting.org.loginMsg.lastModifyBy"
				htmlEscape="false" />: <span id="lastModifiedBy"><c:set var="userId" value="${org.lastModifiedMsgBy}"></c:set>${util:getUserFullNameById(userId)}</span>
		</p>

		<!-- Message -->
		<div>
            <div style="height:20px;">
                <input type="checkbox" name="showMessage" id="showMessage"
                    <c:if test="${showMessageFlag}"> checked="checked"</c:if>>
                <spring:message code="setting.org.loginMsg.show" htmlEscape="false" />

                <input type="text" class="input-invisible" id="loginMsgVid" />
            </div>
			<div class="b-setting-textarea">
				<textarea name="loginMsg" id="loginMsg" placeholder="<spring:message code="setting.org.loginMsg.textarea"/>" ><c:out value="${org.loginMessage}"/></textarea>
			</div>
			<%-- <span class="title-font1 italic margin5-T"><spring:message code="setting.org.loginMsg.infoLength" htmlEscape="false" />:
					<span id ="loginMsgLength"></span>
			</span> --%>
		</div>

		<div class="margin20-T">
			<input type="button" value="<spring:message code="button.save" htmlEscape="false" />" class="button orange margin5-R" id="formBut0">
		 	<input type="reset" style="display: none" value="<spring:message code="button.cancel" htmlEscape="false" />" class="button gray" id="cancel">
		</div>
	</div>
</form>
<script type="text/javascript">
$(function() {
	EB_View.settings.organization.initLoginMsgPage();
});
</script>