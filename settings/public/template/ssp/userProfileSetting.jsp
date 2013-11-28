<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/commons/taglibs.jsp" %>
<%-- <script type="text/javascript" src="${ctx }/statics/javascripts/views/settings/ssp/ssp.js?version=${util:getBuildInfo()}"></script> --%>
<fileCompress:jscompress compressedFileName="eb_view.settings.ssp.js" ctx="${ctx}"></fileCompress:jscompress>
<script>
    $(function () {
        var columnProperty = {
            expandIcon: true,
            expose: false,
            mandatory: false,
            enabled: true,
            editable: false,
            status: true,
            publiced: "${publiced}"
        };
        EB_View.ssp.init('userProfileSettingTable', 'User Profile Setting', 'userProfileSettingSaveBtn', columnProperty);
    });
</script>
<div class="margin10">
    <h3 class="margin10_B">
        <spring:message code="sspconfig.text.userprofilesetting.description"/>
        <a class="icon_help right" href="#" roboHelpIndex="56" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
    </h3>

    <div>
        <div class="jqgrid margin25-B">
            <table id="userProfileSettingTable" cellpadding="0" cellspacing="0"></table>
        </div>
        <div class="margin10-T margin20-B">
            <a helpAndAnswerType="profile" href="javascript:void(0)" title="<spring:message code="sspconfig.text.ssp.helpandanswer"/>"><spring:message code="sspconfig.text.ssp.helpandanswer"/></a>
        </div>
        <div class="margin10-T">
            <input type="button" value='<spring:message code="button.save"/>' id="userProfileSettingSaveBtn" class="button orange"/>
        </div>
    </div>
</div>

