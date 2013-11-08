<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
<form:form id="secureMessageForm" modelAttribute="secureMessageSetting">
<div class="margin10">
  <h3>
      <spring:message code="setting.text.secure.message.title"></spring:message>
    <a title="Help" robohelpindex="105" href="#" class="icon_help right"></a>
  </h3>
  <p class="margin10-T"><spring:message code="setting.text.secure.message.subhead"></spring:message></p>
  <div class="margin45-T margin10-L">
    <h4 class="txt-xlarge"><spring:message code="setting.text.secure.message.expiration"></spring:message>
       <a title="<spring:message code="setting.text.secure.message.expiration.help"></spring:message>" class="b-tooltip" href="javascript:void(0)"><i class="icn_information_16"></i></a>
    </h4>
    <div class="margin10-T">
      <%--<input type="checkbox" name="enable" id="expiration_enable" />--%>
      <form:checkbox path="enable" value="true" id="expiration_enable"/>
      <span><spring:message code="setting.text.secure.message.expiration.prefix"></spring:message> </span>
      <%--<input type="text" name="days" value="${secureMessageSetting.duration}" class="input_width40"/>--%>
      <form:input path="duration" id="expiration_input" disabled="${!secureMessageSetting.enable}" cssClass="input_width40"/>
      <span><spring:message code="setting.text.secure.message.expiration.suffix"></spring:message></span>
    </div>

    <div class="margin45-T">
      <button type="button" id="submitBtn" class="button orange"><spring:message code="button.save"></spring:message></button>
    </div>
  </div>
</div>
</form:form>
<script type="text/javascript" src="${ctx}/statics/javascripts/views/settings/secureMessaging/secureMessageSetting.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript">
    (function(view){
        view.settings.secureMessaging.setting.initPage();
    })(EB_View);
</script>