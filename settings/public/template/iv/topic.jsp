<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>


<script type="text/javascript"
	src="${ctx }/statics/javascripts/views/settings/iv/topic.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript">
	$(function() {
		EB_View.topic.initPage();
	});
</script>
<div class="b-panel-nobox">
	<div class="b-panel-header clearfix">
		<h3 class="b-panel-title-top left">Topic Settings</h3>
		<div class="b-panel-tools right">
			<a href="#" id="addBtn">Add a Topic</a> <span
				id="usedAndRemainingLabel" style="padding-left: 10px;">0 Used
				/ 15 Remaining</span>
		</div>
	</div>
	<div class="b-panel-bwrap" id="gridPanel">
		<div class="b-panel-title">
			<span class="icon_tabpanel_expand"></span> <span class="title">Current
				Topic</span>
			<div class="info" id="activeAndInActiveLabel">0 Active / 1
				Inactive</div>
		</div>
		<div class="b-panel-body b-panel-nobox jqgrid">
			<table id="topicTable" style="width: 100%;">
			</table>
		</div>
	</div>

	<div class="b-panel-collapse-bg">
		<span class="b-panel-collapse extend" id="panelCollapse"></span>
	</div>

	<div class="b-panel-bwrap" id="formPanel">
		<form id="form1">
			<div class="b-panel-title">
				<span class="icon_tabpanel_expand"></span> <span class="title"
					id="addNewTab">Add New</span>
			</div>
			<div class="b-panel-body b-panel-nobox b-panel-border">
				<div class="b-panel-body-inner">
					<h2 class="b-panel-tool-condition">NAME</h2>

					<table class="b-form-table" style="margin-left: 20px;">
						<tr>
							<td>title:</td>
							<td colspan="2"><input type="text" id="topicTitle"><input
								type="hidden" id="topicId" /></td>
						</tr>
						<tr>
							<td>topic category:</td>
							<td><select class="select-normal" id="topicCategory">
							</select></td>
						</tr>
						<c:forEach var="weatherService" items="${weatherServices}">
							<tr>
								<td>${weatherService.country }:</td>
							</tr>
							<tr>
								<td colspan="2"><input type="checkbox"
									id="weatherTypeCheckBox_${weatherService.id}" />${weatherService.weatherType.name}</td>
							</tr>
						</c:forEach>
					</table>
					<div class="margin20-T">
						<input type="button" class="button orange" value="<spring:message code="button.save" htmlEscape="false" />"
							id="saveTopic">
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
