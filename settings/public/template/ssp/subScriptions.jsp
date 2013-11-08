<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>

<script type="text/javascript" src="${ctx }/statics/javascripts/views/settings/ssp/subscription.js?version=${util:getBuildInfo()}"></script>
<script>
	$(function() {
		EB_View.ssp.init($.parseJSON('${json}'));
		EB_View.ssp.handleCheckboxClick();
		EB_View.ssp.handleNameClick();

        $('#override .b-tooltip').tooltip();

	});
</script>
<!-- Alerts Page-->
<div class="margin10">
    <h3 class="margin10_B">
        <spring:message code="sspconfig.text.subscription.description"/>
        <a class="icon_help right" href="#" roboHelpIndex="57" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
    </h3>
    <table class="b-form-table" <c:if test="${hasWeatherTopicCategory ne true}">style="display: none" </c:if> >
        <tbody>
        <tr>
            <td>
                <input type="checkbox" id="autoAlertStatus" <c:if test="${org.autoAlertsDisabled }">checked</c:if> /> <span><spring:message code="weatherthreshold.text.checbox.allowautoalerts" /> </span> <span class="txt999 txt-small">(<spring:message code="weatherthreshold.text.checbox.allowautoalertsmessage" /> )</span>
            </td>
        </tr>
        </tbody>
    </table>
    <div>
        <div class="jqgrid  margin25-B">
            <table id="subscriptionsTable" cellpadding="0" cellspacing="0">

            </table>
        </div>
        <div class="margin10-T margin20-B">
            <a helpAndAnswerType="alerts" href="#" title="<spring:message code="sspconfig.text.ssp.helpandanswer"/>"><spring:message code="sspconfig.text.ssp.helpandanswer"/></a>
        </div>
        <div class="margin10-T">
            <input type="button" value='<spring:message code="button.save"/>' id="subscriptionsSaveBtn"
                class="button orange" />
        </div>
    </div>
</div>

<div id="quietPeriodSetting" style="display: none;">
    <dl class="b-dl-panel">
        <dt>
            <spring:message code="weatherthreshold.quietPeriodSetting.text1" htmlEscape="false" />
        </dt>
        <dd><spring:message code="weatherthreshold.quietPeriodSetting.text2" htmlEscape="false"  />
        </dd>
        <dd class="margin20-L"><input id="enableAll" type="checkbox" <c:if test="${quietPeriodSetting.enabled }">checked</c:if> >&nbsp;<label for="enableAll"><spring:message code="weatherthreshold.quietPeriodSetting.text3" htmlEscape="false" /></label>
        <dd id="quietPeriodTime" <c:if test="${not quietPeriodSetting.enabled }">style="display: none" </c:if>>
            <table cellpadding="0" cellspacing="3" class="margintT_10" style="width: 300px; background: #dddddd; margin: 0 auto; padding: 10px;">
                <tbody>
                <tr>
                    <td><strong><spring:message code="setting.menu.gis.default" htmlEscape="false" /></strong></td></tr>
                </tr>
                <tr>
                    <td><spring:message code="weatherthreshold.quietPeriodSetting.text4" htmlEscape="false" /></td></tr>
                <tr><td>
                    <div class="margin15-L">
                        <label style="width:1px; height:1px; left:-1000px; overflow:hidden;" for="startTime"></label>
                        <select id="startTime"  title="Select start time" >
                            <option value="1" <c:if test="${quietPeriodSetting.organizationQuietPeriod.startHours == 1}">selected="selected"</c:if> >01:00</option>
                            <option value="2" <c:if test="${quietPeriodSetting.organizationQuietPeriod.startHours == 2}">selected="selected"</c:if> >02:00</option>
                            <option value="3" <c:if test="${quietPeriodSetting.organizationQuietPeriod.startHours == 3}">selected="selected"</c:if> >03:00</option>
                            <option value="4" <c:if test="${quietPeriodSetting.organizationQuietPeriod.startHours == 4}">selected="selected"</c:if> >04:00</option>
                            <option value="5" <c:if test="${quietPeriodSetting.organizationQuietPeriod.startHours == 5}">selected="selected"</c:if> >05:00</option>
                            <option value="6" <c:if test="${quietPeriodSetting.organizationQuietPeriod.startHours == 6}">selected="selected"</c:if> >06:00</option>
                            <option value="7" <c:if test="${quietPeriodSetting.organizationQuietPeriod.startHours == 7}">selected="selected"</c:if> >07:00</option>
                            <option value="8" <c:if test="${quietPeriodSetting.organizationQuietPeriod.startHours == 8}">selected="selected"</c:if> >08:00</option>
                            <option value="9" <c:if test="${quietPeriodSetting.organizationQuietPeriod.startHours == 9}">selected="selected"</c:if> >09:00</option>
                            <option value="10" <c:if test="${quietPeriodSetting.organizationQuietPeriod.startHours == 10}">selected="selected"</c:if> >10:00</option>
                            <option value="11" <c:if test="${quietPeriodSetting.organizationQuietPeriod.startHours == 11}">selected="selected"</c:if> >11:00</option>
                            <option value="12" <c:if test="${quietPeriodSetting.organizationQuietPeriod.startHours == 12}">selected="selected"</c:if> >12:00</option>
                        </select>
                        <label style="width:1px; height:1px; left:-1000px; overflow:hidden;" for="startMeridiem"></label>
                        <select id="startMeridiem" title="Select AM/PM">
                            <option value="AM" <c:if test="${quietPeriodSetting.organizationQuietPeriod.startMeridiem == 'AM'}">selected="selected"</c:if> >AM</option>
                            <option value="PM" <c:if test="${quietPeriodSetting.organizationQuietPeriod.startMeridiem == 'PM'}">selected="selected"</c:if> >PM</option>
                        </select>
                    </div>
                </td></tr>
                <tr><td><div class="margin15-L"><spring:message code="weatherthreshold.quietPeriodSetting.and" htmlEscape="false" /></div></td></tr>
                <tr><td>
                    <div style="margin-left:15px;">
                        <label style="width:1px; height:1px; left:-1000px; overflow:hidden;" for="endTime"></label>
                        <select id="endTime" title="Select end time" >
                            <option value="1" <c:if test="${quietPeriodSetting.organizationQuietPeriod.endHours == 1}">selected="selected"</c:if> >01:00</option>
                            <option value="2" <c:if test="${quietPeriodSetting.organizationQuietPeriod.endHours == 2}">selected="selected"</c:if> >02:00</option>
                            <option value="3" <c:if test="${quietPeriodSetting.organizationQuietPeriod.endHours == 3}">selected="selected"</c:if> >03:00</option>
                            <option value="4" <c:if test="${quietPeriodSetting.organizationQuietPeriod.endHours == 4}">selected="selected"</c:if> >04:00</option>
                            <option value="5" <c:if test="${quietPeriodSetting.organizationQuietPeriod.endHours == 5}">selected="selected"</c:if> >05:00</option>
                            <option value="6" <c:if test="${quietPeriodSetting.organizationQuietPeriod.endHours == 6}">selected="selected"</c:if> >06:00</option>
                            <option value="7" <c:if test="${quietPeriodSetting.organizationQuietPeriod.endHours == 7}">selected="selected"</c:if> >07:00</option>
                            <option value="8" <c:if test="${quietPeriodSetting.organizationQuietPeriod.endHours == 8}">selected="selected"</c:if> >08:00</option>
                            <option value="9" <c:if test="${quietPeriodSetting.organizationQuietPeriod.endHours == 9}">selected="selected"</c:if> >09:00</option>
                            <option value="10" <c:if test="${quietPeriodSetting.organizationQuietPeriod.endHours == 10}">selected="selected"</c:if> >10:00</option>
                            <option value="11" <c:if test="${quietPeriodSetting.organizationQuietPeriod.endHours == 11}">selected="selected"</c:if> >11:00</option>
                            <option value="12" <c:if test="${quietPeriodSetting.organizationQuietPeriod.endHours == 12}">selected="selected"</c:if> >12:00</option>
                        </select>
                        <label style="width:1px; height:1px; left:-1000px; overflow:hidden;" for="endMeridiem"></label>
                        <select id="endMeridiem" title="Select AM/PM" >
                            <option value="AM" <c:if test="${quietPeriodSetting.organizationQuietPeriod.endMeridiem == 'AM'}">selected="selected"</c:if> >AM</option>
                            <option value="PM" <c:if test="${quietPeriodSetting.organizationQuietPeriod.endMeridiem == 'PM'}">selected="selected"</c:if> >PM</option>
                        </select>
                    </div>
                </td></tr>
                <tr>
                    <td>
                        <label style="width:1px; height:1px; left:-1000px; overflow:hidden;" for="timeZone"></label>
                        <select id="timeZone" class="width_250 field_single_select {required:true}" title="Select time zone" >
                            <option value=""><spring:message code="weatherthreshold.timezone.pleaseselect" htmlEscape="false" /></option>
                            <c:forEach var="timeZone" items="${timeZones}">
                                <option value="${timeZone.key}" <c:if test="${quietPeriodSetting.organizationQuietPeriod.timeZoneId == timeZone.key}">selected="selected"</c:if> >${timeZone.value}</option>
                            </c:forEach>
                        </select>
                    </td>
                </tr>
                </tbody>
            </table>
        </dd>
    </dl>
    <dl id="override" class="b-dl-panel" <c:if test="${not quietPeriodSetting.enabled }">style="display:none;"</c:if> >
    	<dt>
            <spring:message code="weatherthreshold.quietPeriod.Override" htmlEscape="false"  />
        </dt>
        <dd><spring:message code="weatherthreshold.quietPeriod.Override.text1" htmlEscape="false"  />
        </dd>
        <dd class="margin20-L"><b><spring:message code="weatherthreshold.quietPeriod.Override.text2" htmlEscape="false"  /></b></dd>
        <dd>
        <ul class="margin20-L">
        <c:forEach var="override" items="${quietPeriodSetting.overrides}" varStatus="status">
        	<li>
            <span class="left" id="${override.weatherType.id}">
                <input name="category" type="checkbox" <c:if test="${override.newEnabled or override.allClearEnabled }">checked</c:if> /><label  class="margin5-L normal" name="${override.weatherType.id}">${override.weatherType.name} ${override.weatherType.type}</label>
                <div class="margin20-L" <c:if test="${not override.newEnabled and not override.allClearEnabled }">style="display:none;"</c:if> >
                	<b class="margin5-R"><spring:message code="notification.send.label" htmlEscape="false"  />:</b><input type="checkbox" <c:if test="${override.newEnabled }">checked</c:if> />&nbsp;<spring:message code="weatherthreshold.condition.AWXNEW" htmlEscape="false"  /><input class="margin10-L" type="checkbox" <c:if test="${override.allClearEnabled }">checked</c:if> />&nbsp;<spring:message code="weatherthreshold.quietPeriod.Override.allclear" htmlEscape="false"  />
                </div>
            </span>
            <span class="right b-tooltip" title='<spring:message code="setting.ssp.subscription.tooltip.${override.weatherType.id}" htmlEscape="false"/>'><i class="icn_information_16"></i></span>
            </li>
        </c:forEach>
        </ul>
        </dd>
    </dl>
</div>