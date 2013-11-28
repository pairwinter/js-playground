<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
<div class="margin10">
	<div class="b-panel-header clearfix">
		<div class="b-panel-header">
			<h3>
				<spring:message code="setting.publish.generic" htmlEscape="false" />
                <a class="icon_help right" href="#" roboHelpIndex="48" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
			</h3>
			<div class="b-panel-tools margin10-T">
				<button id="addSubscribeUrl" type="button"
					class="button button-tbl gray ">
					<i class="icn_action_add " id=""></i>
					<spring:message code="button.add" htmlEscape="false" />
				</button>
			</div>
			<form id="addUrlForm" method="post" class="margin10-T"
				style="display: none;">
				<div class="advancedsearch_div">
					<h3>
						<spring:message code="setting.contact.customFields.addFields"
							htmlEscape="false" />
					</h3>
					<div class="advanced-search-assist b-bg-white">
						<table cellspacing="0" cellpadding="0" class="b-form-table">
							<tbody>
								<tr>
									<td width="100px">
                                        <span class="xing">*</span><label for="url"><spring:message code="setting.publish.alertus.url" htmlEscape="false" /></label>
                                    </td>
									<td><input type="text" class="input_long {required:true,url:true}"
										maxlength="200" name="url" id="addUrl">
									<button id="test" class="button button-tbl gray" type="button"><spring:message
												code="button.new.test" htmlEscape="false" /></button>
									</td>
								</tr>
								<tr>
									<td width="100px">
                                        <span class="xing">*</span>
                                        <label for="displayName"><spring:message code="setting.publish.generic.displayName" htmlEscape="false" /></label>
                                    </td>
									<td><input type="text" class="input_long {required:true}"
										maxlength="200" name="displayName" id="addDisplayName"></td>
								</tr>
								<tr>
									<td width="100px"><label for="username"><spring:message
												code="security.login.form.name" htmlEscape="false" /></label></td>
									<td><input type="text" class="input_long" maxlength="200"
										name="username" id="addUsername"></td>
								</tr>
								<tr>
									<td width="100px"><label for="password"><spring:message
												code="security.login.form.password" htmlEscape="false" /></label></td>
									<td><input type="password" class="input_long" maxlength="200"
										name="password" id="addPassword"></td>
								</tr>
							</tbody>
						</table>
						<div class="margin20-T">
							<input type="button" class="button orange margin5-R"
								value="<spring:message code="button.save" htmlEscape="false" />"
								id="saveUrl"> <input id="cancel" class="button gray"
								type="button"
								value="<spring:message code="button.cancel" htmlEscape="false" />">
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="margin10-T" id="gridPanel">
		<div class="b-panel-body b-panel-nobox jqgrid">
			<table id="subscribeUrlTable" style="width: 100%;">
			</table>
		</div>
	</div>
</div>

<script type="text/javascript"
	src="${ctx }/statics/javascripts/views/settings/network/network.js?version=${util:getBuildInfo()}"></script>

<script type="text/javascript">
	$(function() {
		EB_View.settings.network.initGeneric();
	});
</script>
<script id="updateSubscribeUrl" type="text/x-jsrender">
{{for #data}}
<table>
	<tr>
		<td class="b-grid-single-sub" style="border-bottom: 1px">
			<form id="updateSubscribeUrlForm">
				<div class="b-panel-body ">
					<table cellspacing="0" cellpadding="0" class="b-form-table">
						<tbody>
							<tr>
								<td width="100px">
                                    <span class="xing">*</span><label for="url"><spring:message code="setting.publish.alertus.url" htmlEscape="false" /></label>
                                </td>
								<td><input type="text" class="input_long {required:true,url:true}"
									maxlength="200" name="url" id="updateUrl" value="{{>url}}">
								<button id="test" class="button button-tbl gray" type="button"><spring:message
												code="button.new.test" htmlEscape="false" /></button>
								</td>
							</tr>
							<tr>
								<td width="100px">
                                    <span class="xing">*</span><label for="displayName"><spring:message code="setting.publish.generic.displayName" htmlEscape="false" /></label>
                                </td>
								<td><input type="text" class="input_long {required:true}"
										maxlength="200" name="displayName" id="updateDisplayName" value="{{>displayName}}"></td>
							</tr>
							<tr>
								<td width="100px"><label for="username"><spring:message
											code="security.login.form.name" htmlEscape="false" /></label></td>
								<td><input type="text" class="input_long" maxlength="200" value="{{>username}}"
									name="username" id="updateUsername"></td>
							</tr>
							<tr>
								<td width="100px"><label for="password"><spring:message
											code="security.login.form.password" htmlEscape="false" /></label></td>
								<td><input type="password" class="input_long" maxlength="200" value="{{>password}}"
									name="password" id="updatePassword"></td>
							</tr>
						</tbody>
					</table>
					<div class="margin20-T">
						<input type="button"
							value="<spring:message code="button.update" htmlEscape="false" />"
							class="button orange margin5-R">
						<input id="collapsedBtn" class="button gray" type="button"
							value="<spring:message code="button.cancel" htmlEscape="false" />">
					</div>
				</div>
			</form>
		</td>
	</tr>
</table>
{{/for}}
</script>
