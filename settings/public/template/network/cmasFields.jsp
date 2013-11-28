<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>

<!-- setting panel -->
<div class="margin10">
    <div class="b-panel-header">
        <h3>
            <spring:message code="setting.publish.cmas_wea.item4" htmlEscape="false" />
            <a title="Help" robohelpindex="83" href="#" class="icon_help right"></a>
        </h3>
    </div>
    <div class="b-grid-single">
        <form id="eb_form">
            <table width="100%" cellspacing="0" cellpadding="0" class="b-grid-single-table" id="eb_grid">
                <thead>
                <tr>
                    <th width="20%"><spring:message code="setting.publish.cmas_wea.cmasfields.col1" htmlEscape="false" /></th>
                    <th width="20%"><spring:message code="setting.publish.cmas_wea.cmasfields.col2" htmlEscape="false" /></th>
                    <th width="60%"><spring:message code="setting.publish.cmas_wea.cmasfields.col3" htmlEscape="false" /></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><spring:message code="setting.ipaws.cmasField.senderAgencyName" htmlEscape="false" /></td>
                    <td><input type="checkbox" name="expose" id="agencyExpose" <c:if test="${agencyHidden eq false}">checked="checked"</c:if> ></td>
                    <td>
                        <select  name="senderAgencyName" id="senderAgencyName" >
                            <c:forEach var="agency" items="${agencyList}" varStatus="status">
                                <option value="${agency.id}" <c:if test="${agency.defaultVal}">selected="selected"</c:if> >${agency.value}</option>
                            </c:forEach>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><spring:message code="setting.ipaws.cmasField.urgency" htmlEscape="false" /></td>
                    <td><input type="checkbox" name="expose" id="urgencyExpose" <c:if test="${urgencyHidden eq false}">checked="checked"</c:if> ></td>
                    <td>
                        <select class="select_short" name="urgency" id="urgency" >
                            <c:forEach var="urgency" items="${urgencyList}" varStatus="status">
                                <option value="${urgency.id}" <c:if test="${urgency.defaultVal}">selected="selected"</c:if> >${urgency.value}</option>
                            </c:forEach>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><spring:message code="setting.ipaws.cmasField.severity" htmlEscape="false" /></td>
                    <td><input type="checkbox" name="expose" id="severityExpose" <c:if test="${severityHidden eq false}">checked="checked"</c:if> ></td>
                    <td>
                        <select class="select_short" name="severity" id="severity" >
                            <c:forEach var="severity" items="${severityList}" varStatus="status">
                                <option value="${severity.id}" <c:if test="${severity.defaultVal}">selected="selected"</c:if> >${severity.value}</option>
                            </c:forEach>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><spring:message code="setting.ipaws.cmasField.certainty" htmlEscape="false" /></td>
                    <td><input type="checkbox" name="expose" id="certaintyExpose" <c:if test="${certaintyHidden eq false}">checked="checked"</c:if> ></td>
                    <td>
                        <select class="select_short" name="certainty" id="certainty" >
                            <c:forEach var="certainty" items="${certaintyList}" varStatus="status">
                                <option value="${certainty.id}" <c:if test="${certainty.defaultVal}">selected="selected"</c:if> >${certainty.value}</option>
                            </c:forEach>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><spring:message code="setting.ipaws.cmasField.expiresIn" htmlEscape="false" /></td>
                    <td><input type="checkbox" name="expose" id="expiredHoursExpose" <c:if test="${expireTimeHidden eq false}">checked="checked"</c:if> ></td>
                    <td>
                        <select class="select_short" name="expiredHours" id="expiredHours" >
                            <c:forEach var="expireTime" items="${expireTimeList}" varStatus="status">
                                <option value="${expireTime.id}" <c:if test="${expireTime.defaultVal}">selected="selected"</c:if> >${expireTime.value}</option>
                            </c:forEach>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="txt_top"><spring:message code="setting.ipaws.cmasField.sameCode" htmlEscape="false" /></td>
                    <td class="txt_top"><input type="checkbox" name="expose" id="sameCodeExpose" <c:if test="${sameCodeHidden eq false}">checked="checked"</c:if> ></td>
                    <td>
                        <div class="right">
                            <input class="input-invisible" name="sameCode" id="sameCode" value="" type="text" />
                        </div>
                        <ul id="sameCodes" class="b-distance b-border padding10-L margin20-R">
                            <c:forEach var="sameCode" items="${sameCodeList}"
                                       varStatus="status">
                                <li><input type="checkbox" name="sameCode1" id="${sameCode.id}" <c:if test="${sameCode.defaultVal}">checked="checked"</c:if> > <label for="${sameCode.id}">${sameCode.value} - ${sameCode.desc}</label></li>
                            </c:forEach>
                        </ul>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="margin20-T">
                <input type="submit" id="saveBtn" class="button orange" value="<spring:message code="button.save" htmlEscape="false" />">
            </div>
        </form>
    </div>
</div>

<script type="text/javascript" src="${ctx }/statics/javascripts/views/settings/network/cmasFields.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript">
    $(function() {
        EB_View.settings.network.cmasFields.initPage();
    });
</script>