<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
	
<div class="b-panel-nobox">
	<div class="b-panel-header clearfix">
		<h3 class="left">
			<spring:message
				code="twitterthreshold.text.twitteraccount.description"/>
		</h3>
		<div class="right">
			0
			<spring:message code="global.threshold.used" />
			/ 200
			<spring:message code="global.threshold.remaining" />
		</div>
	</div>
	<div class="b-panel-tools">
		<spring:message
			code="twitterthreshold.text.addtwitteraccountinformation" />
	</div>
	<div class="b-panel-bwrap">
		<table class="b-form-table">
			<tbody>
				<tr>
					<td><lable>
						<spring:message code="twitterthreshold.text.username" /></lable></td>
					<td><input class="input-normal input_long" id="username" value="${twitterStreamAccount.username }"/>
						<input class="input-normal input_long" id="twitterSteamAccountId" type="hidden" value="${twitterStreamAccount.id}"/>
					</td>
				</tr>
				<tr>
					<td><lable>
						<spring:message code="twitterthreshold.text.password" /></lable></td>
					<td><input class="input-normal input_long" id="password"
						type="password" value="${twitterStreamAccount.password}"/></td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="b-panel-bottom padding20-L">
		<input id="saveTwitterAccountBtn" type="button"
			value='<spring:message code="button.save"/>' class="button orange">
	</div>
</div>

<script type="text/javascript"
	src="${ctx }/statics/javascripts/views/settings/iv/twitterthresholdindex.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript">
	$(function() {
		EB_View.twitterthresholdIndex.initPage();
	});
</script>


