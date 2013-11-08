<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>

<!-- setting panel -->
<form id="ipawsForm" enctype="multipart/form-data" method="post">
    <h3>
        <spring:message code="setting.publish.cmas_wea.item1" htmlEscape="false" />
        <a class="icon_help right" href="#" roboHelpIndex="46" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
    </h3>
    <p class="font-gray margin10-B margin10-T">
        <spring:message code="setting.org.loginMsg.promptText" htmlEscape="false" />
    </p>
    <table id="lastModified" <c:if test="${ipawsSetting == null}">style="display:none;"</c:if>>
            <tbody>
                <tr>
                    <td>
                    <spring:message code="setting.org.loginMsg.lastModifyDate" htmlEscape="false" />:
                </td>
                <td>
                    <span id="lastModifiedDate" ><fmt:formatDate value="${ipawsSetting.lastModifiedDate}" 
                                    timeZone="${user.timeZoneId}" pattern="yyyy-MM-dd HH:mm:ss z"/></span>
                </td>
            </tr>
            <tr>
                <td>
                    <spring:message code="setting.org.loginMsg.lastModifyBy" htmlEscape="false" />:
                </td>
                <td>
                    <span id="lastModifiedUserId"><c:set var="userId" value="${ipawsSetting.lastModifiedId}"></c:set>${util:getUserFullNameById(userId)}</span>
                    </td>
                </tr>
            </tbody>
        </table>

        <table class="b-form-table margin10-T">
            <tbody>
            <tr>
                <td><label><spring:message code="setting.publish.ipaws.file" htmlEscape="false" /></label></td>
                <td>
                    <input type="file" name="file"  id="digCertFile" <c:if test="${ipawsSetting.digitalCertFileName != null}">style="display:none;"</c:if> />
                    <span id="digitalCertFileName" <c:if test="${ipawsSetting.digitalCertFileName == null}">style="display:none;"</c:if> >${ipawsSetting.digitalCertFileName}</span>
            	</td>
            </tr>

            <tr>
                <td><label><spring:message code="setting.publish.ipaws.logonId" htmlEscape="false" /></label></td>
                <td>
                	<span id="logonCogIdLabel" <c:if test="${ipawsSetting.logonCogId == null}">style="display:none;"</c:if>>${ipawsSetting.logonCogId}</span>
                    <input id="logonCogId" type="text"  name="logonCogId" maxlength="30" <c:if test="${ipawsSetting.logonCogId != null}">style="display:none;"</c:if> />
                </td>
            </tr>
            <tr>
                <td width="200px" style="vertical-align: top;"><label><spring:message code="setting.publish.ipaws.logonUser" htmlEscape="false" /></label></td>
                <td>
                	<span id="logonUserLabel" <c:if test="${ipawsSetting.logonUser == null}">style="display:none;"</c:if>>${ipawsSetting.logonUser}</span>
                    <input id="logonUser" type="text"  name="logonUser" maxlength="30" <c:if test="${ipawsSetting.logonUser != null}">style="display:none;"</c:if> />
                </td>
            </tr>
        </tbody>
    </table>
	
	<c:set var="style" value=""/>
	<c:if test="${ipawsSetting.logonCogId != null}">
		<c:set var="style" value="display:none;"/>
	</c:if>
    <div class="btn_footer">
        <button disabled="disabled" id="saveBtn" type="button" class="button gray btn_disabled canDisabled margin10-B" <c:if test="${ipawsSetting.logonCogId != null}">style="display:none;"</c:if> >
           <spring:message code="button.save" htmlEscape="false" />
        </button>
        <input id="removeBtn" type="button" value="<spring:message code="setting.publish.ipaws.removeAll" htmlEscape="false" />" <c:if test="${ipawsSetting.logonCogId == null}">style="display:none;"</c:if> class="button gray" />
    </div>
</form>

<script type="text/javascript" src="${ctx }/statics/javascripts/views/settings/network/ipaws.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript">
    $(function() {
        EB_View.settings.network.ipaws.initPage();
    });
</script>