<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
<link rel="stylesheet" href="${ctx}/statics/stylesheets/gmap.css?version=${util:getBuildInfo()}" />
<div class="b-panel-nobox">
	<div class="b-panel-header">
		<h3 class="b-panel-title-top">
			<spring:message code="twitterthreshold.text.description" />
             <a class="icon_help right" href="#" roboHelpIndex="43" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
		</h3>
		<div class="b-panel-tools clearfix">
			<div class="right">
				<a href="javascript:void(0);" id="addTwitterThresholdButton" style="display:none;" style="padding-left: 10px;"><spring:message code="setting.iv.twitter.add" /></a>
					<span class="info" style="display:none;" id="usedAndRemainingLabel">
						0
						<spring:message code="global.threshold.used" />
						/ 0
						<spring:message code="global.threshold.remaining" />
					</span>
			</div>
		</div>
	</div>
	<div id="gridPanelTw" class="b-panel-bwrap">
		<div class="b-panel-title">
			<span class="icon_tabpanel_expand"></span> <span class="title"><spring:message
					code="weatherthreshold.text.currentthresholds" /></span>
			<div class="info" id="activeAndInActiveLabel">
				${activeNum}
				<spring:message code="weatherthreshold.text.active" />
				/ ${inactiveNum}
				<spring:message code="weatherthreshold.text.inactive" />
			</div>
		</div>
		<div class="jqgrid scroll-y clear-both">
			<table id="twitterThresholdTable">
			</table>
		</div>
	</div>
	<div class="b-panel-collapse-bg">
		<span class="b-panel-collapse extend" id="panelCollapse2"></span>
	</div>
	<div id="gridPanelTwDynamicFollower" class="b-panel-bwrap">
		<div class="b-panel-title">
			<span class="icon_tabpanel_expand"></span> <span class="title"><spring:message
					code="twitterthreshold.text.dymanicfollowersetting" /></span>
			
		</div>
		<div class="jqgrid scroll-y clear-both">
			<table id="dynamicFollowerTable">
			</table>			
		</div>
	</div>
	<div class="b-panel-collapse-bg">
		<span class="b-panel-collapse extend" id="panelCollapse3"></span>
	</div>
	<div class="b-panel-bwrap">
		<form id="twitterThresholdForm">
			<div class="b-panel-title">
				<span class="icon"></span> <span id="tw_tabpanel_expand_add" class="icon_tabpanel_expand"></span>
				<span class="title" id="thresholdTitle"><spring:message code="setting.iv.twitter.addNew" /></span>
			</div>

			<div class="b-padding10" style="min-width:800px;">
				<div class="pos-relative clearfix">
					<div class="width_percent48 left">
						<h2 class="b-panel-tool-condition"><spring:message code="setting.iv.twitter.alert" /></h2>

						<div id="twitterTab" class="tab">
							<div class="tab_lst">
								<a tabPanel="volumePanel" href="javascript:void(0)"
									class="mouse_out"><spring:message code="setting.iv.twitter.volume" /></a> <a tabPanel="percentagePanel"
									href="javascript:void(0)"><spring:message code="setting.iv.twitter.percentage" /></a>
							</div>
							<!--Volume start-->
							<div id="volumePanel" class="margin10-L">
								<div class="margin10-T">
									<label><spring:message code="setting.iv.twitter.for" /></label> 
									<span>
										<input id="timeText" type="text" name="timeTextName" class="input_width40 event_input {required:true,range:[1,60]}" >
										<span>
											<select class="select_width80" id="timeUnitSelect" >
												<option selected="selected" value="MINUTES"><spring:message code="setting.iv.twitter.minutes" /></option>
												<option value="HOURS"><spring:message code="setting.iv.twitter.hours" /></option>
										    </select><spring:message code="setting.iv.twitter.each" />
									    </span>
									</span>
								</div>
								<div class="margin10-T">
									<div>
										<label><spring:message code="setting.iv.twitter.criteria" /></label>
									</div>
									<table class="b-form-table" cellpadding="0" cellspacing="0">
										<tbody>
											<tr>
												<td class="nowrap"><input type="checkbox" id="keywordsTextCheckbox" class="toggleValidation" >&nbsp;&nbsp;<spring:message code="setting.iv.twitter.keywords" /></td>
												<td><input id="keywordsText" type="text" name="keywordsTextName" disabled="disabled" class="initDisabled event_input {required:true,maxlength:40} prefixKeywordTextLong prefixKeywordCommon input_short" placeholder="<spring:message code="setting.iv.twitter.keyword" />,<spring:message code="setting.iv.twitter.keyword" />"><span class="margin10-L"><spring:message code="setting.iv.twitter.and" /></span></td>
											</tr>
											<tr>
												<td><input type="checkbox" id="hashtagsTextCheckbox" class="toggleValidation">&nbsp;&nbsp;<spring:message code="setting.iv.twitter.hashtags" /></td>
												<td><input id="hashtagsText" type="text" name="hashtagsTextName" disabled="disabled"  class="input_short event_input initDisabled {required:true,minlength:2,maxlength:40} prefixHashtagsText" value="" placeholder="#<spring:message code="setting.iv.twitter.hashtag" />,#<spring:message code="setting.iv.twitter.hashtag" />">
                                                    <span class="margin10-L"><spring:message code="setting.iv.twitter.and" /></span></td>
											</tr>
											<tr>
												<td><input type="checkbox" id="followNameCheckbox" class="toggleValidation">&nbsp;&nbsp;<spring:message code="setting.iv.twitter.from" /></td>

												<td><input type="text" id="followName" value="" disabled="disabled" name="followName" class="input_short event_input initDisabled {required:true,minlength:2,maxlength:40} prefixfollowName validateTwitterUser" placeholder="@<spring:message code="setting.iv.twitter.username" />"/>
                                                    <span class="margin10-L"><spring:message code="setting.iv.twitter.and" /></span><span id="volumeTwitterUserFailMessage"><span id="volumeRetryTwitterUser" href="javascript:void(0)"><spring:message code="setting.iv.twitter.try" /></span></span><span id="volumeTwitterUserSuccessMessage"> <spring:message code="setting.iv.twitter.success" /> </span></td>
											</tr>
											<tr>
												<td valign="top"><input type="checkbox" id="radiusTextCheckbox" class="toggleValidation">&nbsp;&nbsp;<spring:message code="setting.iv.twitter.within" /></td>
												<td colspan="2">
													<div>

															<input type="text" id="radiusText" disabled="disabled" name="radiusTextName" class="input_width40 event_input initDisabled {required:true,range:[1,100]}">
                                                           <span>
                                                             <select id="geoUnitSelect" class="select-normal" style="width:90px;">
                                                                <option value="Feet"><spring:message code="setting.iv.twitter.feet" /></option>
                                                                <option value="Meter"><spring:message code="setting.iv.twitter.meters" /></option>
                                                                <option value="Kilometer"><spring:message code="setting.iv.twitter.kilometers" /></option>
                                                                <option value="Mile"><spring:message code="setting.iv.twitter.miles" /></option>
                                                            </select>
                                                        </span>
													</div>
													<div class="margin5-T">
														<span><spring:message code="setting.iv.twitter.address" /></span>
														<a href="#" class="btn_add margin5-R font-gray b-gmap-location" id="locateInMap"><spring:message code="gmap.button.location" htmlEscape="false"/></a>
                                                        <div class="margin5-T">
	                                                        <input type="text" id="locationText" name="locationTextName" disabled="disabled" maxlength="1000" class="initDisabled searchForGeoAddress event_input {required:true} input_width183">&nbsp;&nbsp;
                                                        </div>
                                                        <div class="margin5-T" style="display:none;">
                                                            <select id="locationSelector" class="input_width183 selectForGeoLocation">
                                                                <option value=""><spring:message code="setting.iv.weather.search" htmlEscape="false" /></option>
                                                            </select>
                                                        </div>
                                                        <div class="margin5-T"><input type="hidden" disabled="disabled" id="geoAddressText"></div>
                                                        <div id="sd_1344839213821" style="display: block; width: auto; top: 31px;background:#FFF68F;">
																<table cellspacing="0" cellpadding="2" id="st">
																	<tbody id="addressBody">
																	</tbody>
																</table>
														</div>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div class="margin10-T">
									<label><spring:message code="setting.iv.twitter.receive" /></label> 
									<input type="text" name="twitterThresholdAmount" class="input_width40 event_input {required:true,digits:true,range:[1,100]}" id="twitterThresholdAmountText"/></input>
									<spring:message code="setting.iv.twitter.tweets" />
								</div>
							</div>
							<!--Volume end-->


							<!--percentage start-->
							<div id="percentagePanel" class="margin10-L"
								style="display: none;">
								<div class="margin10-T">
									<label><spring:message code="setting.iv.twitter.for" /></label> 
									<input id="timeTextPercentage" type="text" name="timeTextPercentage" class="input_width40 event_input {required:true,range:[1,60]}"/>
									<span>
									<select class="select_width80" id="timeUnitSelectPercentage">
											<option selected="selected" value="MINUTES"><spring:message code="setting.iv.twitter.minutes" /></option>
											<option value="HOURS"><spring:message code="setting.iv.twitter.hours" /></option>
									</select><spring:message code="setting.iv.twitter.each" />
                                        </span>
								</div>
								<div class="margin10-T">
									<label><spring:message code="setting.iv.twitter.where" /></label> <select id="denominatorSelect" class="select_width120">
										<option value="fromFollower"><spring:message code="setting.iv.twitter.user" /></option>
										<option value="hashtags"><spring:message code="setting.iv.twitter.hashtag" /></option>
									</select> <spring:message code="setting.iv.twitter.is" /> 
									<span>
										<input id="denominatorText" type="text" name="denominatorText" class="{required:true,minlength:2,maxlength:40} event_input prefixfollowName validateTwitterUser" value=""  placeholder="@<spring:message code="setting.iv.twitter.username" />"/>
									</span>
									<span id="denominatorTwitterUserFailMessage"><span id="denominatorRetryTwitterUser" href="javascript:void(0)"><spring:message code="setting.iv.twitter.try" /></span></span>
									<span id="denominatorTwitterUserSuccessMessage"> <spring:message code="setting.iv.twitter.success" /> </span>
								</div>
								<div class="margin10-T">
									<label><spring:message code="setting.iv.twitter.and" /></label> <select class="select_width80 select-normal"
										id="twitterThresholdPercentageSelect">
										<option value="0.05">5%</option>
										<option value="0.1" selected="selected">10%</option>
										<option value="0.15">15%</option>
										<option value="0.2">20%</option>
										<option value="0.25">25%</option>
										<option value="0.3">30%</option>
										<option value="0.35">35%</option>
										<option value="0.4">40%</option>
										<option value="0.45">45%</option>
										<option value="0.5">50%</option>
										<option value="0.55">55%</option>
										<option value="0.6">60%</option>
										<option value="0.65">65%</option>
										<option value="0.7">70%</option>
										<option value="0.75">75%</option>
										<option value="0.8">80%</option>
										<option value="0.85">85%</option>
										<option value="0.9">90%</option>
										<option value="0.95">95%</option>
										<option value="1">100%</option>
									</select> <spring:message code="setting.iv.twitter.meet" />
								</div>
								<div class="margin10-T">
									<table class="b-form-table" cellpadding="0" cellspacing="0">
										<tr>
											<td  class="nowrap"><input id="keywordsTextPercentageCheckbox" type="checkbox" class="toggleValidation"/>&nbsp;&nbsp;<spring:message code="setting.iv.twitter.keywords" /></td>
											<td><input type="text" id="keywordsTextPercentage" disabled="disabled" value="" name="keywordsTextNamePercentage" class="initDisabled event_input {required:true,maxlength:40} prefixKeywordTextLong prefixKeywordCommon input_short" placeholder="<spring:message code="setting.iv.twitter.keyword" />,<spring:message code="setting.iv.twitter.keyword" />"/>
                                                <span class="margin10-L"><spring:message code="setting.iv.twitter.and" /></span></td>
										</tr>
										<tr id="hashtagsTextPercentageTr">
												<td  class="nowrap"><input id="hashtagsTextPercentageCheckbox" type="checkbox" class="toggleValidation" />&nbsp;&nbsp;<spring:message code="setting.iv.twitter.hashtags" /></td>
												<td><input id="hashtagsTextPercentage" type="text" disabled="disabled" name="hashtagsTextNamePercentage" class="input_short event_input initDisabled {required:true,minlength:2,maxlength:40} prefixHashtagsText"
													value="" placeholder="#<spring:message code="setting.iv.twitter.hashtag" />,#<spring:message code="setting.iv.twitter.hashtag" />"><span class="margin10-L"><spring:message code="setting.iv.twitter.and" /></span></td>
										</tr>
										<tr id="followNamePercentTr" style="display:none;">
											<td><input id="followNamePercentageCheckbox" type="checkbox" class="toggleValidation" />&nbsp;&nbsp;<spring:message code="setting.iv.twitter.from" /></td>
											<td><input type="text" id="followNamePercentage" value="" disabled="disabled" name="followNamePercentage" class="input_short event_input initDisabled {required:true,minlength:2,maxlength:40} prefixfollowName validateTwitterUser" placeholder="@<spring:message code="setting.iv.twitter.username" />"/>
                                                <span class="margin10-L"><spring:message code="setting.iv.twitter.and" /> </span><span id="percentageTwitterUserFailMessage"><span id="percentageRetryTwitterUser" href="javascript:void(0)"><spring:message code="setting.iv.twitter.try" /></span></span>
																						<span id="percentageTwitterUserSuccessMessage"> <spring:message code="setting.iv.twitter.request" /></span></td>
										</tr>
										<tr>
											<td valign="top"><input id="radiusTextPercentageCheckbox" type="checkbox" class="toggleValidation" />&nbsp;&nbsp;<spring:message code="setting.iv.twitter.within" /></td>
											<td colspan="2">
												<div>
													<span id="radiusTextPercentageErrorMessage">
														<input type="text" id="radiusTextPercentage" disabled="disabled" name="radiusTextPercentageName" class="input_width40 event_input initDisabled {required:true,range:[1,100]}" >

                                                    <span>
													<select id="geoUnitSelectPercentage" class="margin10-L select_width80">
														<option value="Feet"><spring:message code="setting.iv.twitter.feet" /></option>
                                                        <option value="Meter"><spring:message code="setting.iv.twitter.meters" /></option>
                                                        <option value="Kilometer"><spring:message code="setting.iv.twitter.kilometers" /></option>
                                                        <option value="Mile"><spring:message code="setting.iv.twitter.miles" /></option>
													</select>
                                                   </span>
                                                   </span>
                                                </div>
												<div class="margin5-T">
													<span><spring:message code="setting.iv.twitter.address" /></span>
													    <a href="#" class="btn_add margin5-R font-gray b-gmap-location" id="locateInMap2"><spring:message code="gmap.button.location" htmlEscape="false"/></a>
														<div id ="locationTextPercentageErroMessage"  class="margin5-T">
															<input type="text" id="locationTextPercentage" disabled="disabled" name="locationTextNamePercentage" maxlength="1000" class="input_width183 searchForGeoAddress event_input initDisabled {required:true,minlength:2}" >
														</div>
                                                        <div class="margin5-T" style="display:none;">
                                                            <select id="locationTextPercentageSelector" class="input_width183 selectForGeoLocation">
                                                                <option value=""><spring:message code="setting.iv.weather.search" htmlEscape="false" /></option>
                                                            </select>
                                                        </div>
														<input type="hidden" disabled="disabled" id="geoAddressTextPercentage">
															<div id="sd_1344839213822" style="display: block; width: auto; top: 31px;background:#FFF68F;">
																<table cellspacing="0" cellpadding="2" id="st">
																	<tbody id="addressBodyPercentage">
																	</tbody>
																</table>
															</div>
													</div> 
											</td>

										</tr>
									</table>
								</div>
							</div>
							<!--percentage end-->
						</div>
					</div>
					<div class="b-separate-vertical"></div>
					
					<!-- right area -->
					<div class="width_percent48 right">
						<h2 class="b-panel-tool-condition"><spring:message code="setting.iv.twitter.alerted" htmlEscape="false" /></h2>
						<table class="b-form-table margin10-L" width="100%">
							<tbody>
								<tr>
									<td><input type="checkbox" id="sendDashboardAlert" checked="checked" disabled="disadbled">
										<spring:message code="setting.iv.twitter.send" htmlEscape="false" /></td>
								</tr>
								<tr>
									<td><input type="checkbox" id="launchBroadcastTwitter">
										<spring:message code="setting.iv.twitter.launch" htmlEscape="false" /></td>
								</tr>
								<tr class="toggleHidden" style="display: none">
									<td style="padding-left: 20px;"><input type="checkbox" checked="checked" id="statrtEvent" > <span class="b-distance-right"><spring:message code="setting.iv.twitter.start" htmlEscape="false" /> </span> <input type="text" class="event_input {required:true}"
										id="statrtEventText" name="statrtEventTextName" maxlength="120" pos="right" ></td>
								</tr>
								<tr class="toggleHidden" style="display: none">
									<td style="padding-left: 20px;"><span
										class="b-text-height"><spring:message code="setting.iv.twitter.choose" htmlEscape="false" /></span>
										<div class="clearfix">
											<div class="search_div margin5-B width_percent94" id="searchCt">
												<input type="text" placeholder="<spring:message code="setting.iv.twitter.search" htmlEscape="false" />"
													id="searchBroadCastTempleteText" name="searchBroadCastTempleteTextName" class="name_input"  style="width: 99%" >
												<button id="searchTwBroadCastTempleteButton" class="gbqfb">
													<span class="gbqfi"></span>
												</button>
											</div>
										</div>

										<ul  id="broadcatTemplatesTw" class="iv-bt-div width_percent94">
										</ul> 
										<div>
											<label><spring:message code="setting.iv.twitter.check" htmlEscape="false" /></label>
											<ul class="iv-bt-div b-inline-block width_percent94" id="broadcatTemplates2" >
											</ul>
											<span>
												<input type="text" class="input-invisible {atLeastOneBroadCastTemplete:true}" name="broadCastTempletes" id="broadCastTempletes"/>
											</span>
										</div>
										</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div class="margin10-T clearfix block-center" style="width: 360px;">
					<div class="left"><label class="margin5-R"><spring:message code="setting.iv.twitter.show" htmlEscape="false" /></label></div>
					<dl class="b-select-icon left" id="select_map">
						<dt class="clearfix" tabindex="1">
						    <a name="select" href="javascript:void(0)" class="b-univmap-tw-red left" clazz="b-univmap-tw-red"></a>
							<i style="margin-top:15px;" class="icon_gray_downarrow" ></i>
						</dt>
						<dd style="display:none;">
							<a name="select" href="javascript:void(0)" class="b-univmap-tw-red"></a>
							<a name="select" href="javascript:void(0)" class="b-univmap-tw-purp"></a>
							<a name="select" href="javascript:void(0)" class="b-univmap-tw-orng"></a>
							<a name="select" href="javascript:void(0)" class="b-univmap-tw-grn"></a>
							<a name="select" href="javascript:void(0)" class="b-univmap-tw-blu"></a>
						</dd>
					</dl>
				</div>
				<div class="whitebg text-center b-padding10">
					<label class="margin5-R"><spring:message code="setting.iv.twitter.thresholdName" htmlEscape="false" />:</label> 
					
					<span>
						<input type="text" id="thresholdName" maxlength="120"
                               class="input_long event_input {required:true,maxlength:120}" pos="bottom"  name="thresholdName" value="">
						<input type="hidden" id="thresholdId" /> 
						<input type="button" id="saveBtn" value="<spring:message code="button.save" htmlEscape="false" />" class="button orange">
					</span>
				</div>
		</form>
	</div>

</div>

<%-- <script type="text/javascript" src="${ctx }/statics/javascripts/views/settings/iv/twitterthreshold.js?version=${util:getBuildInfo()}"></script> --%>
<!--<script type="text/javascript" src="${ctx}/statics/javascripts/everbridge/eb_tooltip.js?version=${util:getBuildInfo()}"></script>-->
<script type="text/javascript" src="${ctx}/statics/javascripts/everbridge/eb_gmap.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript" src="${scheme}://maps.google.com/maps/api/js?sensor=false&callback=EB_Common.gmaps.callback&language=${util:getCurrentLocale(pageContext.request)}"></script>
<fileCompress:jscompress compressedFileName="eb_view.settings.iv.js" ctx="${ctx}"></fileCompress:jscompress>
<script type="text/javascript">
	$(function() {
		EB_View.twitterthreshold.initPage();
	});
</script>
<script id="bcTemplate" type="text/x-jsrender">
    {{for #data}}
        <li><a href='javascript:void(0);' title='Add' class='icn_addLink_12' onclick='EB_View.twitterthreshold.searchedCheckboxClicked(this);' id='{{:id}}'></a>{{>message.title}}</li>";
    {{/for}}
</script>

<script id="addedBcTemplate" type="text/x-jsrender">
    {{for #data}}
        <li><a href='javascript:void(0);' title='Remove' class='icn_trash_16' onclick='EB_View.twitterthreshold.removeBroadCastTemplate(this);' id='{{:id}}'></a>{{>name}}</li>
    {{/for}}
</script>
