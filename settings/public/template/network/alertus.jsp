<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>

<div class="margin10">
	<div class="b-panel-header clearfix">
		<div class="b-panel-header">
			<h3>
				<spring:message code="setting.publish.alertus" htmlEscape="false" />
                <a class="icon_help right" href="#" roboHelpIndex="47" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
			</h3>
			<div class="b-panel-tools margin10-T">
				<button id="addAlertUs" type="button"
					class="button button-tbl gray ">
					<i class="icn_action_add " id=""></i>
					<spring:message code="button.add" htmlEscape="false" />
				</button>
			</div>
			<form id="addAlertUsForm" method="post" class="margin10-T" style="display: none;">
				<div class="advancedsearch_div">
					<h3>
						<spring:message code="setting.contact.customFields.addFields"
							htmlEscape="false" />
					</h3>
					<div class="advanced-search-assist b-bg-white">
						<table class="b-form-table">
							<tr>
								<td width="150px"><span class="xing">*</span><label for="name"><spring:message
											code="twitterthreshold.field.thresholdname"
											htmlEscape="false" /></label> </td>
								<td><input type="text" class="input_long {required:true}"
									name="name" id="addName" /></td>
							</tr>
							<tr>
								<td width="150px"><span class="xing">*</span><label for="url"><spring:message code="setting.publish.alertus.url" htmlEscape="false" /></label> </td>
								<td>
									 <input type="text" class="input_long {required:true,url:true}"
									name="url" id="addUrl" />
                                    <button id="load" type="button" class="button button-tbl gray"><spring:message code="universe.control.regionlibrary.load" htmlEscape="false" /></button>
								</td>
							</tr>

							<tr>
								<td><span class="xing">*</span><label for="profile"><spring:message code="setting.publish.alertus.profile" htmlEscape="false" /></label></td>
								<td><select class="select_long {required:true}" name="profileId" id="addProfileId"></select></td>
							</tr>
                            
                            <tr>
								<td><span class="xing">*</span><label for="addressMode">Address Mode</label></td>
								<td>
                                    <select class="select_long" name="addressMode" id="addressMode">
                                        <option value="group">Group</option>
                                        <option value="all">All</option>
                                    </select>
                                </td>
							</tr>
                            
							<tr>
                                <td class="txt_top"><span class="xing">*</span><label for="group"><spring:message code="user.create.group.label" htmlEscape="false" /></label></td>
								<td><select class="select_long {required:true}"
                                            name="groupId" id="addGroupId" multiple="multiple">
								</select></td>
							</tr>
                            <tr>
								<td><span class="xing">*</span><label for="duration">Duration</label></td>
                                <td><input class="input_long {required:true}" type="text" name="duration" id="duration"/></td>
							</tr>
                            <!-- <tr>
								<td><span class="xing">*</span><label for="duration2">1200/9000</label> </td>
                                    <td><input class="input_long" type="text" name="duration2" id="duration2"/></td>
							</tr> -->
						</table>
						<div class="margin20-T">
							<input type="button" class="button orange margin5-R"
								value="<spring:message code="button.save" htmlEscape="false" />"
								id="saveAlertUs"> <input id="cancel" class="button gray"
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
			<table id="alertUsTable" style="width: 100%;">
			</table>
		</div>
	</div>
</div>

<script type="text/javascript"
	src="${ctx }/statics/javascripts/views/settings/network/network.js?version=${util:getBuildInfo()}"></script>

<script type="text/javascript">
	$(function() {
		EB_View.settings.network.initAlertUs();
	});
</script>

<script id="updateAlertUs" type="text/x-jsrender">
{{for #data}}
<table>
	<tr>
		<td class="b-grid-single-sub" style="border-bottom: 1px">
			<form id="updateAlertUsForm">
				<div class="b-panel-body ">
					<table class="b-form-table">
						<tr>
							<td width="150px"><span class="xing">*</span><label for="name"><spring:message code="twitterthreshold.field.thresholdname" htmlEscape="false" /></label></td>
							<td><input type="text" class="input_long {required:true}" value="{{:setting.name}}"
								name="name" id="updateName" /></td>
						</tr>
						<tr>
							<td width="150px"><span class="xing">*</span><label for="url"><spring:message code="setting.publish.alertus.url" htmlEscape="false" /></label> </td>
							<td>
								<input type="text" class="input_long {required:true,url:true}" value="{{:setting.url}}"
								name="url" id="updateUrl" />
                                <button id="load" type="button" class="button button-tbl gray"><spring:message code="universe.control.regionlibrary.load" htmlEscape="false" /></button>
							</td>
						</tr>
						<tr>
							<td><span class="xing">*</span><label for="profile"><spring:message code="setting.publish.alertus.profile" htmlEscape="false" /></label></td>
							<td><select class="select_long {required:true}"
								name="profileId" id="updateProfileId">
								{{for profiles}}
									<option value="{{:id}}" {{if id === #parent.parent.data.setting.profileId}}selected{{/if}}>{{>name}}</option>
								{{/for}}
							</select></td>
						</tr>
						<tr>
							<td><span class="xing">*</span><label for="addressMode">Address Mode</label></td>
							<td>
                                <select class="select_long" name="addressMode" id="updateAddressMode">
                                    <option value="group" {{if setting.alertUsMode === "group"}}selected{{/if}}>Group</option>
                                    <option value="all" {{if setting.alertUsMode ===  "all"}}selected{{/if}}>All</option>
                                </select>
                            </td>
						</tr>
						<tr {{if setting.alertUsMode ===  "all"}}style="display:none;"{{/if}}>
							<td><span class="xing">*</span><label for="group"><spring:message
										code="user.create.group.label" htmlEscape="false" /></label> </td>
							<td><select class="select_long {required:true}" name="groupId" id="updateGroupId" multiple="multiple">
								{{for groups}}
									<option value="{{:groupId}}">{{>groupName}}</option>
								{{/for}}
							</select></td>
						</tr>
						<tr>
							<td><span class="xing">*</span><label for="duration">Duration</label></td>
                            <td><input class="input_long {required:true}" value="{{:setting.duration}}" type="text" name="duration" id="updateDuration"/></td>
						</tr>
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