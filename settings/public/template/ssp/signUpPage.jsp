<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
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
            EB_View.ssp.init('signupTable', 'SignUp', 'signupSaveBtn', columnProperty);
        });
    </script>
    <div class="margin10">
        <h3 class="margin10_B">
        <spring:message code="sspconfig.text.signUpPage.description" />
        <a class="icon_help right" href="#" roboHelpIndex="62" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
    </h3>
    <div class="b-grid-single">
        <div class="jqgrid margin25-B">
            <table id="signupTable"  cellpadding="0" cellspacing="0" class="b-grid-single-table" width="100%"></table>
        </div>
        <div class="margin10-T margin20-B">
            <a helpAndAnswerType="signUp" href="#" title="<spring:message code="sspconfig.text.ssp.helpandanswer"/>"><spring:message code="sspconfig.text.ssp.helpandanswer"/></a>
        </div>
        <div class="clearfix">
            <input type="button" value='<spring:message code="button.save"/>' id="signupSaveBtn" class="button orange" />
        </div>
    </div>
</div>