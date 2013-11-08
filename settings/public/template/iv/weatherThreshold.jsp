<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>

<link rel="stylesheet" href="${ctx}/statics/stylesheets/gmap.css?version=${util:getBuildInfo()}" />
<script type="text/javascript" src="${ctx}/statics/javascripts/everbridge/eb_gmap.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript" src="${scheme}://maps.google.com/maps/api/js?sensor=false&callback=EB_Common.gmaps.callback&language=${util:getCurrentLocale(pageContext.request)}"></script>
<fileCompress:jscompress compressedFileName="eb_view.settings.iv.js" ctx="${ctx}"></fileCompress:jscompress>

<script type="text/javascript">
    $(function() {
        EB_View.weatherThreshold.init();
    });
</script>

<div class="b-panel-nobox">
	<div class="b-panel-header clearfix">
		<h3 class="left">
			<spring:message code="weatherthreshold.text.description" />
		</h3>

        <div class="b-panel-tools right ">
            <a href="javascript:void(0);" id="addBtn" style="display: none;"><spring:message code="weatherthreshold.text.addthreshold"/></a>
            <%--<span id="usedAndRemainingLabel" style="display: none;">0 <spring:message code="weatherthreshold.text.used"/> / 0 <spring:message code="weatherthreshold.text.remaining"/></span>--%>
            <a class="icon_help" href="#" roboHelpIndex="42" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
        </div>
	</div>
	<div class="b-panel-bwrap" id="gridPanel">
		<div class="b-panel-title">
			<span class="icon_tabpanel_expand <c:if test="${not hasThresholds}">collapsed</c:if>"></span> <span class="title"><spring:message
					code="weatherthreshold.text.currentthresholds" /></span>
			<div class="info" id="activeAndInActiveLabel">
                ${activeNum} <spring:message code="weatherthreshold.text.active" /> / ${inactiveNum} <spring:message code="weatherthreshold.text.inactive" />
			</div>
		</div>
		<div class="jqgrid scroll-y clear-both" <c:if test="${not hasThresholds }">style="display:none"</c:if> >
			<table id="thresholdsTable">
			</table>
		</div>
	</div>

	<div class="b-panel-collapse-bg">
		<span class="b-panel-collapse extend" id="panelCollapse"></span>
	</div>

	<div class="b-panel-bwrap" id="formPanel">
		<form id="addWeatherThresholdForm">
			<div class="b-panel-title">
				<span id="wt_tabpanel_expand_add" class="icon_tabpanel_expand"></span>
				<span class="title" id="addNewTab"><spring:message
						code="weatherthreshold.text.addweatherthreshold" /></span>
			</div>
			<div class="b-padding10" style="min-width:800px;">
				<div class=" pos-relative clearfix">
					<div class="left width_percent48">
						<div class="b-panel-tool-condition">
							<spring:message code="weatherthreshold.text.if" />
						</div>
						<table class="b-form-table" width="93%">
							<tr>
							<td colspan="2">
								<input type="radio" name="weatherType" value="all" checked="checked"> <spring:message code="setting.iv.weather.allWarning" />
							</td>
							</tr>
							<tr>
							<td colspan="2">
								<input type="radio" name="weatherType" value="select" /><spring:message code="setting.iv.weather.selectWarning" htmlEscape="false" />
								<input type="text" class="input-invisible {atLeastOneService:true}" name="warnings" id="warnings"/>
							</td>
							</tr>
							<tr id="weatherWarningTypeTr">
								<td width="120px"></td>
								<td>
									<!-- <ul
										class="b-bg-white b-distance b-panel-scroll b-border left"
										style="height: 100px; width: 242px; padding-left: 5px;"
										id="warning">
									</ul>  -->
								</td>
							</tr>

							<tr id="actionsTr">
								<td width="120px" style="vertical-align: top;"><label><spring:message
											code="weatherthreshold.text.condition" /></label></td>
								<td>
									<ul
										class="b-bg-white b-distance b-panel-scroll b-border left"
										style="height: 100px; width: 242px; padding-left: 5px;"
										id="condition">
									</ul> <input type="text" class="input-invisible {atLeastOneCondition:true}"
									name="conditions" id="conditions"/>
								</td>
							</tr>
						</table>

						<!--  Address information-->
						<div class="infor_div div_gray_box margin10-T">
							<strong><spring:message
									code="weatherthreshold.text.address.information"
									htmlEscape="false" /></strong>
							<div>
							</div>
							<div id="address_div">
								<c:if
									test="${fn:length(weatherThreshold.thresholdAddresses) >0 }">
									<c:forEach var="address"
										items="${weatherThreshold.thresholdAddresses }" varStatus="c">
										<div class="subdiv_graybox" style="width: 100%;">
											<div class="text-right">
												<a name="removeaddr_" href="javascript:void(0)" class="icn_close_12"></a>
											</div>
											<table id="lastAddress" cellspacing="0" cellpadding="0"
												class="table_infor" width="100%">
												<tbody>
													<tr>
														<td width="20%"><label class="label_a"> <spring:message
																	code="contact.field.address.country" htmlEscape="false" /></label> 
                                                        </td>
                                                        <td width="80%"><input name="address[x].country"
															value="${contry.code}" type="hidden"/> <span><spring:message
																	code="setting.iv.weather.usa" htmlEscape="false" /></span></td>
													</tr>
													<tr>
														<td><span class="xing">*</span><label class="label_a"><spring:message
																	code="contact.field.address" htmlEscape="false" /> </label>
                                                        </td>
                                                        <td>
                                                            <input type="text"
															name="address[x].streetAddress"
															value="${address.streetAddress }" maxlength="100"
															class="width_percent94 searchForGeoAddress {required:true,maxlength:100}"></td>
													</tr>
													<tr>
														<td><span class="xing">*</span><label class="label_a"><spring:message
																	code="contact.field.address.city" htmlEscape="false" /></label>
                                                        </td>
                                                        <td><input type="text"
															name="address[x].city" value="${address.city }"
															maxlength="40"
															class="width_percent94 searchForGeoAddress {required:true,maxlength:40}"></td>
													</tr>

													<tr>
														<td><span class="xing">*</span><label class="label_a"><spring:message
																	code="contact.field.address.stateProvince"
																	htmlEscape="false" /> </label>
                                                        </td>
                                                        <td><input
															type="text" name="address[x].state"
															value="${address.state }" maxlength="40"
															class="width_percent94 searchForGeoAddress {required:true,maxlength:40}">
														</td>
													</tr>
													<tr>
														<td><label class="label_a"> <spring:message
																	code="contact.field.address.postalCode"
																	htmlEscape="false" /></label>
                                                        </td>
                                                        <td><input type="text"
															name="address[x].postalCode"
															value="${address.postalCode }"
															class="width_percent94 searchForGeoAddress {postalcode:true}"></td>
													</tr>
													<tr>
														<td><label class="label_a"> <spring:message
																	code="contact.field.GeoSelect" htmlEscape="false" /></label>
                                                        </td>
                                                        <td><select  style="width: 94%"
															class="selectForGeoLocation"
															name="selectForGeoLocationName2">
																<option value="-1"><spring:message
																	code="setting.iv.weather.search" htmlEscape="false" /></option>
														</select></td>
													</tr>
													<tr
														class="tr_geo_location">
														<td>
                                                            <span class="xing">*</span><label class="label_a"><spring:message
																			code="contact.field.address.gisLocation.lon"
																			htmlEscape="false" /> </label>
                                                       </td>
                                                       <td>
                                                        <input
														    name="address[x].gisLocation.lon" type="text"
															value="${address.gisLocation.lon}"
															class="width_percent94 {range:[-180,180],required:true}" />

                                                        </td>
                                                        </tr>
                                                    <tr>
                                                        <td>
															<label class="label_a"><span class="xing">*</span><spring:message
																			code="contact.field.address.gisLocation.lat"
																			htmlEscape="false" /> </label> <input
																		name="address[x].gisLocation.lat" type="text"
																		value="${address.gisLocation.lat}"
																		class="width_percent94 {range:[-90,90],required:true}">

														</td>
													</tr>
													<tr><td class="alignright" colspan="2"><a href="#" class="btn_add margin5-R b-gmap-location" name="locateInMap"><spring:message code="gmap.button.location" htmlEscape="false"/></a></td></tr>
												</tbody>
											</table>
										</div>
									</c:forEach>
								</c:if>

							</div>
							<div class="add_other" id="add_adress_btn"
								<c:if test="${fn:length(contact.address) <=0 }">style="display: none;"</c:if>>
								<i class="icn_addLink_12"></i><a id="addNewAddress"
									class="btn_add" href="javascript:void(0)"><spring:message
										code="contact.text.Add.other.address" htmlEscape="false" /></a>
							</div>
						</div>

					</div>
					<div class="b-separate-vertical"></div>
					<div class="right width_percent48">
						<div class="b-panel-tool-condition">
							<spring:message code="weatherthreshold.text.ifWhen" />
						</div>
						<table class="b-form-table margin10-L" width="100%">
							<tbody>
								<tr>
									<td><input type="checkbox" id="sendDashboardAlert"
										checked="checked" disabled="disabled"> <spring:message
											code="weatherthreshold.text.senddashboardalert" /></td>
								</tr>
								<tr>
									<td><input type="checkbox" id="launchBroadcast"> <spring:message
											code="weatherthreshold.text.launchbroadcast" /></td>
								</tr>
								<tr class="toggleHidden" style="display: none">
									<td style="padding-left: 20px;"><input type="checkbox"
										id="statrtEvent"> <span class="b-distance-right"><spring:message
												code="weatherthreshold.text.startevent" /></span>
										<input
											type="text" class="event_input" id="statrtEventText"
											name="statrtEventTextName" disabled="disabled"
											maxlength="120" pos="right" /></td>
								</tr>
								<tr class="toggleHidden" style="display: none">
									<td style="padding-left: 20px;"><span
										class="b-text-height"><spring:message
												code="weatherthreshold.text.choosebroadcasttemplate" /> </span>
										<div class="clearfix">
											<div class="search_div width_percent94" id="searchCt">
												<input type="text" class="name_input"
													id="searchBroadCastTempleteText"
													placeholder="<spring:message code="button.search" htmlEscape="false" />"
													style="width: 99%" />
												<button class="gbqfb" id="searchBroadCastTempleteButton">
													<span class="gbqfi"></span>
												</button>
											</div>
										</div>
										<ul class="iv-bt-div width_percent94" id="broadcatTemplates">
										</ul>
										<div>
											<label><spring:message code="setting.iv.weather.check" htmlEscape="false" /></label>
											<ul class="iv-bt-div b-inline-block width_percent94"
												id="broadcatTemplates2">
											</ul>
											<span>
												<input type="text" class="input-invisible {atLeastOneBroadCastTemplete:true}"
													name="broadCastTempletes" id="broadCastTempletes"/>
											</span>
										</div></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div class="whitebg text-center b-padding10">
					<label class="b-form-table-lable"> <spring:message
							code="weatherthreshold.text.thresholdname" /> </label>
					<span> <input id="thresholdTemplateName" type="text"
						name="thresholdTemplateName" maxlength="120"
						class="input_long event_input {required:true,maxlength:120}" pos="bottom" />
						<input type="hidden" id="thresholdId" /> <input type="button"
						id="thresholdSaveButton" value="<spring:message code="button.save" htmlEscape="false" />" class="button orange">
					</span>

				</div>
			</div>
		</form>
	</div>
	
</div>



<!-- clone temp -->
<div id="selectCountries" style="display: none">
	<select name="" class="" id="selectCountries_select">
		<option value="">
			<spring:message code="global.select.null.text" htmlEscape="false" />
		</option>
		<c:forEach var="contry" items="${ countrys}">
			<option value="${contry.code}">${contry.value}</option>
		</c:forEach>
	</select>
</div>
<div style="display: none;" id="clone_tb">
	<div class="subdiv_graybox" style="width: 93%;">
		<div class="text-right">
			<a name="removeaddr_" href="javascript:void(0)" class="icn_close_12"></a>
		</div>
		<table cellspacing="0" cellpadding="0" class="table_infor" name="addreessTable" width="100%" >
			<tbody>
				<tr>
					<td width="20%"><label class="label_a"> <spring:message
								code="contact.field.address.country" htmlEscape="false" /></label> <!-- <select name="address[x].country" class="select_short searchForGeoAddress {required:true}"> </select> -->
					</td>
                    <td width="80%"><input name="address[x].country" value="US" type="hidden" /> <span><spring:message code="setting.iv.weather.usa" htmlEscape="false" /></span></td>
				</tr>
				<tr>
					<td><label class="label_a"><span class="xing">*</span><spring:message
								code="contact.field.address" htmlEscape="false" /> </label>
                    </td>
                    <td>
                        <input type="text"
						name="address[x].streetAddress" maxlength="100"
						class="width_percent94 searchForGeoAddress {required:true,maxlength:100}"></td>
				</tr>
				<tr>
					<td><label class="label_a"><span class="xing">*</span><spring:message
								code="contact.field.address.city" htmlEscape="false" /> </label>
                    </td>
                    <td><input type="text" name="address[x].city"
						maxlength="40"
						class="width_percent94 searchForGeoAddress {required:true,maxlength:40}"></td>
				</tr>
				<tr>
					<td><label class="label_a"><span class="xing">*</span><spring:message
								code="contact.field.address.stateProvince" htmlEscape="false" /> </label>
                    </td>
                    <td><input type="text" name="address[x].state"
						maxlength="40"
						class="width_percent94 searchForGeoAddress {required:true,maxlength:40}">
					</td>
				</tr>
				<tr>
					<td><label class="label_a"> <spring:message
								code="contact.field.address.postalCode" htmlEscape="false" /></label>
                    </td>
                    <td>
                        <input type="text" name="address[x].postalCode" class="width_percent94 searchForGeoAddress {postalcode:true}"></td>
				</tr>
				<tr>
					<td><label class="label_a"> <spring:message
								code="contact.field.GeoSelect" htmlEscape="false" /></label>
                    </td>
                    <td><select style="width: 94%" class="selectForGeoLocation"
						 name="selectForGeoLocation">
							<option value="-1"><spring:message code="setting.iv.weather.search" htmlEscape="false" /></option>
					</select></td>
				</tr>
				<tr class="tr_geo_location">
					<td>
						<label class="label_a"><span class="xing">*</span><spring:message
								code="contact.field.address.gisLocation.lon" htmlEscape="false" /> </label>
                    </td>
                    <td>
						<input name="address[x].gisLocation.lon" type="text"
						 class="width_percent94 {range:[-180,180],required:true}">

					</td>
				</tr>
				<tr class="tr_geo_location">
					<td><label class="label_a"><span class="xing">*</span><spring:message
								code="contact.field.address.gisLocation.lat" htmlEscape="false" /> </label>
                    </td>
                    <td>
						<input name="address[x].gisLocation.lat" type="text"
						 class="width_percent94 {range:[-90,90],required:true}">
					</td>
				</tr>
				<tr><td class="alignright" colspan="2"><a href="#" class="btn_add margin5-R b-gmap-location" name="locateInMap"><spring:message code="gmap.button.location" htmlEscape="false"/></a></td></tr>
			</tbody>
		</table>
	</div>
</div>

<div id="weatherEvents" style="display: none;">
    <strong><spring:message code="weatherEvents.selection.text" htmlEscape="false"/> </strong> <br />
	<ul class="ul_a">
		<c:forEach var="group" items="${groups}">
			<li><input type='checkbox' name="group" value="${group.name }"/><i class="b-ui-treepanel-branch-icon margin5-L"></i><a href='javascript:void(0)' class="group"><b>${group.name }</b></a>
			<ul class="ul_a1" style="display: none;">
				<c:forEach var="weatherService" items="${group.weatherServices}">
					<li><input type='checkbox' name="weatherService" value="${weatherService.id }"/>${weatherService.title }</li>
				</c:forEach>
			</ul>
			</li>
		</c:forEach>
	</ul>
</div>

<div id="readOnlyWeatherEvents" style="display: none;">
    <strong id="weatherEventsTitle"></strong> <br />
    <ul class="ul_weatherevent">
        <c:forEach var="group" items="${groups}">
            <li><i class="b-ui-treepanel-branch-icon margin5-L"></i><a href='javascript:void(0)' class="group"><b>${group.name }</b></a>
                <ul class="ul_subweatherevent" style="display: none;">
                    <c:forEach var="weatherService" items="${group.weatherServices}">
                        <li name="${weatherService.id}">${weatherService.title }</li>
                    </c:forEach>
                </ul>
            </li>
        </c:forEach>
    </ul>
</div>

<script id="bcTemplate" type="text/x-jsrender">
    {{for #data}}
    <li><a href='javascript:void(0);' title='Add' class='icn_addLink_12' onclick='EB_View.weatherThreshold.searchedCheckboxClicked(this);' id='{{:id}}'></a>{{>message.title}}</li>";
    {{/for}}
</script>
<script id="addedBcTemplate" type="text/x-jsrender">
    {{for #data}}
    <li><a href='javascript:void(0);' title='Remove' class='icn_trash_16' onclick='EB_View.weatherThreshold.removeBroadCastTemplate(this);' id='{{:id}}'></a>{{>name}}</li>
    {{/for}}
</script>