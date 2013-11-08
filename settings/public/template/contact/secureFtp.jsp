<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
<%-- <script src="${ctx }/statics/javascripts/views/settings/contact/secureFtp.js?version=${util:getBuildInfo()}"></script> --%>
<fileCompress:jscompress compressedFileName="eb_view.settings.contact.js" ctx="${ctx}"></fileCompress:jscompress>
<!-- setting panel -->
<div class="b-panel-body">
    <h3>
        <spring:message code="setting.contact.secureFtp" htmlEscape="false" />
        <a class="icon_help right" href="#" roboHelpIndex="16" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
    </h3>
    <div class="margin20-B font-gray">
        <spring:message code="setting.contact.security.secureFtp.explain" htmlEscape="false" />
	</div>
    <table class="b-table-normal" cellspacing="0" cellpadding="0">
        <tbody>
            <tr>
                <td><label><spring:message code="setting.contact.secureFtp.host" htmlEscape="false" /></label></td>
                <td><span class="spaninput" style="margin-left: 0px;"><c:out value="${sftpServerUrl}"></c:out></span></td>
            </tr>
            <tr>
                <td><label><spring:message code="setting.contact.security.secureFtp.sftpKey" htmlEscape="false" /></label></td>
                <td>
                    <a href="#" id="downloadFTPKey" class="button orange margin20-R" style="display: none;"><spring:message code="setting.contact.download.key" htmlEscape="false" /></a>
                    <button id="ftpKey" class="button gray btn_disabled canDisabled margin20-R" type="button" disabled>
                        <spring:message code="setting.contact.download.key" htmlEscape="false" />
                    </button>
                    <a href="#" id="generateFTP"><spring:message code="setting.contact.security.generate" htmlEscape="false" /></a>
                </td>
            </tr>
        </tbody>
    </table>
		 
    <div class="margin20-T">
        <span class="icn_pdf_16"></span><a href="${ctx}/statics/DownloadAccessInstructions.pdf?version=${util:getBuildInfo()}" target="_blank"><spring:message code="setting.contact.download.doc" htmlEscape="false" /></a>
    </div>
</div>

<div class="b-panel-body margin10-T">
    <h3>
        <spring:message code="setting.contact.security.fileEncryption" htmlEscape="false" />
        <a class="icon_help right" href="#" roboHelpIndex="97" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
    </h3>
    <div class="margin20-B font-gray">
        <spring:message code="setting.contact.security.fileEncryption.explain" htmlEscape="false" />
	</div>
    <table class="b-table-normal" cellspacing="0" cellpadding="0" id="eb_file">
        <tbody>
            <tr>
                <td><label><spring:message code="setting.contact.security.fileEncryption.status" htmlEscape="false" /></label></td>
                <td>
                    <input type="radio" <c:if test="${encryptStatus eq false}">checked</c:if> name="encryptionStatus" value="false" id="encryptionStatus1"/>
                    <label for="encryptionStatus1" class="margin10-R"><spring:message code="setting.contact.security.fileEncryption.status1" htmlEscape="false" /></label>
                    <input type="radio" <c:if test="${encryptStatus eq true}">checked</c:if> name="encryptionStatus" value="true" id="encryptionStatus2"/>
                    <label for="encryptionStatus2"><spring:message code="setting.contact.security.fileEncryption.status2" htmlEscape="false" /></label>
                </td>
            </tr>
            <tr id="trFileKey">
                <td><label><spring:message code="setting.contact.security.fileEncryption.key" htmlEscape="false" /></label></td>
                <td>
                    <a href="#" id="downloadFileKey" style="display: none;" class="button orange  margin20-R"><spring:message code="setting.contact.download.key" htmlEscape="false" /></a>
                    <button id="fileKey" class="button gray btn_disabled canDisabled margin20-R" type="button" disabled>
                        <spring:message code="setting.contact.download.key" htmlEscape="false" />
                    </button>
                    <a href="#" id="generateFile"><spring:message code="setting.contact.security.generate" htmlEscape="false" /></a>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="margin20-T" id="divFileDoc">
        <span class="icn_pdf_16"></span><a href="${ctx}/statics/Everbridge_Upload_FileEncryption_Instructions.pdf?version=${util:getBuildInfo()}" target="_blank"><spring:message code="setting.contact.download.encryption.doc" htmlEscape="false" /></a>
    </div>
</div>
    
<script>
$(function() {
	EB_View.settings.contact.secureFtp.initPage(${hasFtpKey}, ${hasFileKey});
});
</script>