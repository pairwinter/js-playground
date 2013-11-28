<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
<%-- <script type="text/javascript" src="${ctx }/statics/javascripts/views/settings/ssp/ssp.js?version=${util:getBuildInfo()}"></script> --%>
<fileCompress:jscompress compressedFileName="eb_view.settings.ssp.js" ctx="${ctx}"></fileCompress:jscompress>
<script>
	$(function() {
		var columnProperty = {
			expandIcon:true,
			expose : false,
			mandatory : false,
			enabled : true,
			editable : false,
			status : true
		};
		EB_View.ssp.init('contactPathTable', 'Contact Path', 'contactPathSaveBtn', columnProperty);

	});
</script>

<style>
.ui-jqgrid {
	clear: none !important;
}
</style>
<!-- Delivery Methods -->
<div class="margin10">
    <h3 class="margin10_B">
        <spring:message code="sspconfig.text.contactpath.description"/>
        <a class="icon_help right" href="#" roboHelpIndex="60" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
    </h3>
    <div>
        <label class="normal">
            <input type="checkbox" id="canOrderMemberPath" <c:if test="${canOrderMemberPath}">checked="checked"</c:if>/>
            <spring:message code="sspconfig.text.sspdeliverymethods.allowreorder"/>
            <a title="<spring:message code="sspconfig.text.sspdeliverymethods.allowreorder.tooltip"/>" class="b-tooltip margin5-L" href="javascript:void(0)"><i class="icn_information_16"></i></a>
        </label>
    </div>
    <div class="b-grid-single">
        <div class="jqgrid margin10-B">
            <table id="contactPathTable" cellpadding="0" cellspacing="0" class="b-grid-single-table" width="100%">
            </table>
        </div>
        <input type="hidden" id="minContactPathNum" value="${minContactPathNum}" />
        <div style="height:25px;">
            <label><spring:message code="setting.ssp.contactpaths.maxNum" htmlEscape="false" /></label>
            <select id="contactPathmax" name="contactPathmax" class="select_short valid margin5-L">
            </select>
        </div>
        <div class="clearfix">
            <input type="button" value='<spring:message code="button.save"/>' id="contactPathSaveBtn"
                class="button orange" />
        </div>
    </div>
</div>
