<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
<%-- <script type="text/javascript"
	src="${ctx }/statics/javascripts/views/settings/ssp/ssp.js?version=${util:getBuildInfo()}"></script> --%>
<fileCompress:jscompress compressedFileName="eb_view.settings.ssp.js" ctx="${ctx}"></fileCompress:jscompress>
<div class="margin10">
    <h3 class="margin10_B">
        <spring:message code="sspconfig.text.review.description"/>
        <a class="icon_help right" href="#" roboHelpIndex="109" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
    </h3>
    <div class="b-grid-single">
        <div class="margin10-T margin20-B">
            <a helpAndAnswerType="review" href="#" title="<spring:message code="sspconfig.text.ssp.helpandanswer"/>"><spring:message code="sspconfig.text.ssp.helpandanswer"/></a>
        </div>
    </div>
</div>
