<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
<div class="b-panel-body">
<h3>
	<spring:message
			code="setting.org.info" htmlEscape="false" />
    <a class="icon_help right" href="#" roboHelpIndex="26" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
</h3>

	<table cellpadding="0" cellspacing="0" border="0" class="b-formpanel">
		<tbody>
			<tr>
				<td class="bold width_204"><spring:message code="setting.org.info.name"
						htmlEscape="false" /></td>
				<td><c:out value="${org.name}"/></td>
			</tr>
			<tr>
				<td class="bold"><spring:message code="setting.org.info.identifier"
						htmlEscape="false" /></td>
				<td>${org.id}</td>
			</tr>
			<tr>
				<td class="bold"><spring:message code="setting.org.info.status"
						htmlEscape="false" /></td>
				<td><c:choose><c:when test="${org.status == 'A'}"><spring:message code="setting.org.info.active"
						htmlEscape="false" /></c:when><c:otherwise><spring:message code="setting.org.info.inactive"
						htmlEscape="false" /></c:otherwise></c:choose>
				</td>
			</tr>
			<tr>
				<td class="bold"><spring:message code="setting.country" htmlEscape="false" /></td>
				<td><c:out value="${country.value}"/></td>
			</tr>
			<tr>
				<td class="bold"><spring:message code="setting.org.info.dataStore"
						htmlEscape="false" /></td>
				<td><c:out value="${dataCenterName}"/></td>
			</tr>
			<tr>
				<td class="bold"><spring:message code="setting.org.info.accountName"
						htmlEscape="false" /></td>
				<td><c:out value="${accountName}"/></td>
			</tr>
			<tr>
				<td class="bold"><spring:message code="setting.org.info.lastModifyDate"
						htmlEscape="false" /></td>
				<td><fmt:formatDate value="${org.lastModifiedDate}" 
				timeZone="${user.timeZoneId}" pattern="yyyy-MM-dd HH:mm:ss z"/></td>
			</tr>
			<tr>
				<td class="bold"><spring:message code="setting.org.info.lastModifyBy"
						htmlEscape="false" /></td>
				<td><c:out value="${lastModifiedName}" /></td>
			</tr>
		</tbody>
	</table>
</div>

<%-- <div>
    <div class="b-panel-body margin10-T">
	    <h3>
			<span><spring:message
					code="setting.org.info.product" htmlEscape="false" /></span>
		</h3>

		<ul class="b-setting-org-products">
			<c:forEach var="productVo" items="${productVos}">
				<li><span>${productVo.name}</span><b
					<c:if test="${productVo.checked == false}"> class="unselect"</c:if>></b></li>
				<c:forEach var="feature" items="${productVo.features}">
					<li class="level2"><span>${feature.name}</span><b
						<c:if test="${productVo.checked == false}">class="unselect"</c:if>></b></li>
				</c:forEach>
			</c:forEach>
		</ul>
		
		<table cellspacing="0" cellpadding="0" class="b-table-panel">
			<thead>
				<tr>
					<th width="140px">My Products</th>
					<th width="190px">Features Available to Customers</th>
				</tr>
			</thead>
			
			<tbody>
				<tr>
					<td>Mass Notification</td>
					<td><input type="checkbox" checked="checked" disabled="disabled"  class="margin5-R"/>Profile Management Portal</td>
				</tr>
				<tr>
					<td>Interactive Visibility</td>
					<td><input type="checkbox" checked="checked" disabled="disabled"  class="margin5-R"/>Recipient Application</td>
				</tr>
				<tr>
					<td>&nbsp;</td>
					<td><input type="checkbox" checked="checked" disabled="disabled"  class="margin5-R"/>Everbridge Mobile</td>
				</tr>
			</tbody>
		</table>
	</div>
</div> --%>
