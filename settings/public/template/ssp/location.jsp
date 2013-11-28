<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
<%-- <script type="text/javascript"
	src="${ctx }/statics/javascripts/views/settings/ssp/ssp.js?version=${util:getBuildInfo()}"></script> --%>
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
		EB_View.ssp.init('locationTable', 'Location', 'locationSaveBtn', columnProperty);
	});
</script>

<style>
.ui-jqgrid {
	clear: none !important;
}
</style>
<div class="margin10">
    <h3 class="margin10_B">
        <spring:message code="sspconfig.text.location.description"/>
        <a class="icon_help right" href="#" roboHelpIndex="59" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
    </h3>
<div class="b-grid-single">
	<div class="jqgrid margin25-B">
		<table id="locationTable"  cellpadding="0" cellspacing="0" class="b-grid-single-table" width="100%"></table>
	</div>
    <div class="margin10-T margin20-B">
      <h4 class="margin10-B">Help & Answers</h4>
      <p class="margin5-B"><spring:message code="sspconfig.text.addressentrypage.description"/> : <a helpAndAnswerType="locations" href="#" title="<spring:message code="sspconfig.text.ssp.helpandanswer"/>"><spring:message code="sspconfig.text.ssp.helpandanswer"/></a></p>
      <p class="margin5-B"><spring:message code="sspconfig.text.verificationpage.description"/> : <a helpAndAnswerType="verifyLocations" href="#" title="<spring:message code="sspconfig.text.ssp.helpandanswer"/>"><spring:message code="sspconfig.text.ssp.helpandanswer"/></a>
    </div>
	<div class="clearfix">
		<input type="button" value='<spring:message code="button.save"/>' id="locationSaveBtn" class="button orange" />
	</div>
</div>
</div>
