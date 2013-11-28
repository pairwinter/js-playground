<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
<%-- <script type="text/javascript"
	src="${ctx }/statics/javascripts/views/settings/ssp/sspOptions.js?version=${util:getBuildInfo()}"></script> --%>
<fileCompress:jscompress compressedFileName="eb_view.settings.sspOptions.js" ctx="${ctx}"></fileCompress:jscompress>
<script>
	$(function() {
		EB_View.ssp.initSspOptions();
	});
</script>

<div class="margin10">
	<h3 class="margin10_B">
        <spring:message code="sspconfig.text.sspoptions.description" />
        <a class="icon_help right" href="#" roboHelpIndex="55" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
    </h3>
    <div id="ssplink" style="display:none;"><a style="font-size: 15px;" href="${ssplink}" target="_blank">${ssplink}</a> </div>
	<table cellspacing="0" cellpadding="0" class="b-formpanel">
		<tbody>
			<tr>
				<td class="width_204 b-text-top"><label><spring:message code="sspconfig.text.sspoptions.portal_type" /></label></td>
				<td>
					<input type="radio" name="optionType" value="Public Notifications Portal"/> <span class="b-radio-lable"><spring:message code="sspconfig.text.sspoptions.publicportal" /></span>
					<div style="padding-top: 8px;">
						<input type="radio" name="optionType" value="Private Notifications Portal"/> <span class="b-radio-lable"><spring:message code="sspconfig.text.sspoptions.privateportal" /></span>
					</div>
				</td>
			</tr>
			<tr id="publicType" style="display:none;">
				<td>
					<label><spring:message code="sspconfig.text.sspoptions.new_optin_record_type" /></label>
				</td>
				<td>
                    <label class="normal">All new sign ups are assigned:</label>
					<select id="newRecord" class="select_short">
                        <c:forEach var="recordType" items="${recordTypes}">
                            <option value="${recordType.id}"><c:out value="${recordType.name}"></c:out></option>
                        </c:forEach>
					</select>
				</td>
			</tr>
		</tbody>
	</table>

	<div class="margin20-T">
		<span><spring:message code="sspconfig.text.setting" /></span><br><br>
		<input type="submit" value="<spring:message code="button.save"/>" class="button orange" id="SSPOptionsSaveBtn">
	</div>
</div>


