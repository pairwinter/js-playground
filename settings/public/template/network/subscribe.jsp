<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>

<form id="subScribeForm" method="post">
    <h3>
        <spring:message code="setting.publish.subscribe" htmlEscape="false" />
         <a class="icon_help right" href="#" roboHelpIndex="103" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
    </h3>
    <div class="b-panel-body margin10-T">
        <h2>
            <spring:message code="setting.network.subscription" htmlEscape="false" />
        </h2>
        <dl class="b-dl-panel">
            <dt><spring:message code="notification.model.category" htmlEscape="false" /></dt>
            <dd><input type="radio" name="subscription" <c:if test="${networkEffectSetting.allSubscribeCategories}">checked="checked"</c:if> value="all"/> <span  class="margin5-L" ><spring:message code="incident.filter.all" htmlEscape="false"/></span></dd>
            <dd>
                <input type="radio" name="subscription" <c:if test="${not networkEffectSetting.allSubscribeCategories}">checked="checked"</c:if> value="only"/> <span  class="margin5-L" ><spring:message code="setting.publish.subscribe.only" htmlEscape="false" /> <a href="javascript:void(0);" id="updateSubCategories"><spring:message code="setting.publish.subscribe.specific" htmlEscape="false" /></a> </span>
                <ul id="subCategoryList" class="b-ul-style-disc margin10" <c:if test="${networkEffectSetting.allSubscribeCategories}">style="display:none;"</c:if>>
				<c:forEach var="category" items="${networkEffectSetting.subscribeCategories}" varStatus="status">
            		<li name="${category.id}">${category.name}
            	</c:forEach>
                </ul>
            </dd>

            <dt><spring:message code="setting.network.geography" htmlEscape="false" /></dt>
            <dd><input type="radio" name="address" <c:if test="${networkEffectSetting.allSubscribeAddresses}">checked="checked"</c:if> value="all"/> <span  class="margin5-L" ><spring:message code="setting.publish.subscribe.allArea" htmlEscape="false" /></span></dd>
            <dd>
                <input type="radio" name="address" <c:if test="${not networkEffectSetting.allSubscribeAddresses}">checked="checked"</c:if> value="only"/> <span  class="margin5-L" ><spring:message code="setting.publish.subscribe.myOrg" htmlEscape="false" /></span>
                <div id="orgAddressCt" class="div_gray_box margin10-T" style="width:600px;<c:if test="${networkEffectSetting.allSubscribeAddresses}">display:none;</c:if>">
                    <h3>
                        <spring:message code="contact.text.address.information" htmlEscape="false"/>
                    </h3>
                    <div id="address_div">
                    <c:set var="length" value="${fn:length(networkEffectSetting.subscribeAddresses)}"/>
			        <c:choose>
			        <c:when test="${length > 0 }">
			        <c:forEach var="address" items="${networkEffectSetting.subscribeAddresses}" varStatus="status">
			            <div class="subdiv_graybox">
							<div class="text-right">
					            <a class="icn_close_12" href="#" name="removeAddress"></a>
					        </div>
                            <table width="100%" cellspacing="0" cellpadding="0" class="table_infor">
                                <tbody>
                                    <tr>
                                        <td width="20%"><label class="label_a"><span class="xing">*</span><spring:message code="contact.field.address.locationName" htmlEscape="false"/></label>
                                        </td>
                                        <td width="80%">
                                            <input type="text" name="address[x].locationName"  value="<c:out value="${address.locationName}"/>" class="input_long {required:true,maxlength:40}">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label class="label_a"><span class="xing">*</span><spring:message code="contact.field.address.country" htmlEscape="false"/> </label>
                                        </td>
                                        <td>
                                            <select class="searchForGeoAddress select_long {required:true}" name="address[x].country">
                                                <option value=""><spring:message code="global.select.null.text"
		                                                                         htmlEscape="false"/></option>
		                                        <c:forEach var="country" items="${countries}">
		                                            <option value="<c:out value="${country.code}"/>" countryfullname="<c:out value="${country.value}"/> "
		                                                    <c:if test="${country.code eq address.country || country.value eq address.country}">selected="selected" </c:if> >${country.value}</option>
		                                        </c:forEach>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label class="label_a"><span class="xing">*</span><spring:message code="contact.field.address" htmlEscape="false"/></label>
                                        </td>
                                        <td>
                                            <input type="text" class="searchForGeoAddress input_long {required:true,maxlength:100}" maxlength="100" name="address[x].streetAddress" value="${address.streetAddress}"></td>
                                    </tr>
                                    <tr>
                                        <td><label class="label_a"><spring:message code="contact.field.address.suite" htmlEscape="false"/></label></td>
                                        <td>   <input type="text" name="address[x].suite" maxlength="10"  class="input_long searchForGeoAddress {maxlength:10}" value="${address.suite}"></td>
                                    </tr>
                                    <tr>
                                        <td><label class="label_a"><spring:message code="contact.field.address.city" htmlEscape="false"/></label>
                                        </td>
                                        <td><input type="text" class="searchForGeoAddress input_long {maxlength:40}" maxlength="40" name="address[x].city" value="${address.city}"></td>
                                    </tr>
                                    <tr>
                                        <td><label class="label_a"><spring:message code="contact.field.address.stateProvince" htmlEscape="false"/></label>
                                        </td>
                                        <td>
                                        	<c:choose>
		                                        <c:when test="${address.country eq 'US'}">
		                                            <select name="address[x].state" class="select_long searchForGeoAddress">
		                                                <option value=""><spring:message code="global.select.null.text" htmlEscape="false"/></option>
		                                                <c:forEach var="state" items="${states}">
		                                                    <option value="<c:out value="${state.code}"/>"
		                                                            <c:if test="${state.code eq address.state || state.value eq address.state}">selected="selected" </c:if>>
		                                                            <c:out value="${state.code}"/></option>
		                                                </c:forEach>
		                                            </select>
		                                        </c:when>
		                                        <c:otherwise>
		                                            <input type="text" class="searchForGeoAddress input_long  {maxlength:40}" maxlength="40" name="address[x].state" value="${address.state}">
		                                        </c:otherwise>
		                                    </c:choose>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label class="label_a"><spring:message code="contact.field.address.postalCode" htmlEscape="false"/></label>
                                        </td>
                                        <td>
                                            <input type="text" class="searchForGeoAddress input_long {postalcode:true}" name="address[x].postalCode" value="${address.postalCode}"></td>
                                    </tr>
                                    <tr>
                                        <td><label class="label_a"><spring:message code="contact.field.GeoSelect" htmlEscape="false"/></label>
                                        </td>
                                        <td><select name="selectForGeoLocation" class="select_long">
                                                <option value="-1"><spring:message code="setting.iv.weather.search" htmlEscape="false"/></option>
                                            </select></td>
                                    </tr>

                                    <tr class="tr_geo_location">
                                        <td>

                                            <label class="label_a"><span class="xing">*</span><spring:message code="contact.field.address.gisLocation.lon" htmlEscape="false"/></label>
                                        </td>
                                        <td>
                                            <input type="text" class="input_long {range:[-180,180],required:true}" name="address[x].gisLocation.lon" value="${address.gisLocation.lon}">

                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label class="label_a"><span class="xing">*</span><spring:message code="contact.field.address.gisLocation.lat" htmlEscape="false"/></label>
                                        </td>
                                        <td>
                                            <input type="text" class="input_long {range:[-90,90],required:true}" name="address[x].gisLocation.lat" value="${address.gisLocation.lat}">
                                        </td>
                                    </tr>
                                    <tr><td colspan="2" class="alignright"><a name="locateInMap" class="btn_add margin5-R b-gmap-location" href="#"><spring:message code="gmap.button.location" htmlEscape="false"/></a></td></tr>
                                </tbody>
                            </table>
			            </div>
			           </c:forEach>
			        </c:when>
			        <c:otherwise>
                        <div class="subdiv_graybox">
                            <table width="100%" cellspacing="0" cellpadding="0" class="table_infor">
                                <tbody>
                                    <tr>
                                        <td width="20%"><label class="label_a"><span class="xing">*</span><spring:message code="contact.field.address.locationName" htmlEscape="false"/></label>
                                        </td>
                                        <td width="80%">
                                            <input type="text" name="address[x].locationName"  class="input_long {required:true,maxlength:40}">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label class="label_a"><span class="xing">*</span><spring:message code="contact.field.address.country" htmlEscape="false"/></label>
                                        </td>
                                        <td>
                                            <select class="searchForGeoAddress select_long {required:true}" name="address[x].country">
                                                <option value=""><spring:message code="global.select.null.text" htmlEscape="false"/></option>
		                                        <c:forEach var="country" items="${countries}">
		                                            <option value="<c:out value="${country.code}"/>" countryfullname="<c:out value="${country.value}"/> ">${country.value}</option>
		                                        </c:forEach>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label class="label_a"><span class="xing">*</span><spring:message code="contact.field.address" htmlEscape="false"/></label>
                                        </td>
                                        <td>
                                            <input type="text" class="searchForGeoAddress input_long {required:true,maxlength:100}" maxlength="100" name="address[x].streetAddress"></td>
                                    </tr>
                                    <tr>
                                        <td><label class="label_a"><spring:message code="contact.field.address.suite" htmlEscape="false"/></label></td>
                                        <td>   <input type="text" name="address[x].suite" maxlength="10"  class="input_long searchForGeoAddress {maxlength:10}"></td>
                                    </tr>
                                    <tr>
                                        <td><label class="label_a"><spring:message code="contact.field.address.city" htmlEscape="false"/></label>
                                        </td>
                                        <td><input type="text" class="searchForGeoAddress input_long {maxlength:40}" maxlength="40" name="address[x].city"></td>
                                    </tr>
                                    <tr>
                                        <td><label class="label_a"><spring:message code="contact.field.address.stateProvince" htmlEscape="false"/></label>
                                        </td>
                                        <td>
											<input type="text" class="searchForGeoAddress input_long  {maxlength:40}" maxlength="40" name="address[x].state" value="${address.state}">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label class="label_a"><spring:message code="contact.field.address.postalCode" htmlEscape="false"/></label>
                                        </td>
                                        <td>
                                            <input type="text" class="searchForGeoAddress input_long {postalcode:true}" name="address[x].postalCode"></td>
                                    </tr>
                                    <tr>
                                        <td><label class="label_a"><spring:message code="contact.field.GeoSelect" htmlEscape="false"/></label>
                                        </td>
                                        <td><select name="selectForGeoLocation" class="select_long">
                                                <option value="-1"><spring:message code="setting.iv.weather.search" htmlEscape="false"/></option>
                                            </select></td>
                                    </tr>

                                    <tr class="tr_geo_location">
                                        <td>

                                            <label class="label_a"><span class="xing">*</span><spring:message code="contact.field.address.gisLocation.lon" htmlEscape="false"/></label>
                                        </td>
                                        <td>
                                            <input type="text" class="input_long {range:[-180,180],required:true}" name="address[x].gisLocation.lon">

                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label class="label_a"><span class="xing">*</span><spring:message code="contact.field.address.gisLocation.lat" htmlEscape="false"/></label>
                                        </td>
                                        <td>
                                            <input type="text" class="input_long {range:[-90,90],required:true}" name="address[x].gisLocation.lat">
                                        </td>
                                    </tr>
                                    <tr><td colspan="2" class="alignright"><a name="locateInMap" class="btn_add margin5-R b-gmap-location" href="#"><spring:message code="gmap.button.location" htmlEscape="false"/></a></td></tr>
                                </tbody>
                            </table>
                    </div>
			        </c:otherwise>
			        </c:choose>
                     </div>
                     
                    <div id="add_address_btn">
                        <i class="icn_addLink_12"></i><a href="javascript:void(0)" class="btn_add" id="addNewAddress"><spring:message code="contact.text.Add.other.address" htmlEscape="false"/></a>
                    </div>
                </div>
            </dd>
        </dl>
    </div>

    <div class="b-panel-body margin20-T">
        <h2>
            <spring:message code="setting.publish.subscribe.publishing" htmlEscape="false" />
        </h2>
        <p><spring:message code="setting.network.subscribe" arguments="${networkEffectSetting.publishCategories[0].name}" htmlEscape="false" /></p>
    </div>

    <div class="btn_footer">
        <input id="save" type="button" value="<spring:message code="button.save" htmlEscape="false" />" class="button orange" />
    </div>
</form>

<div id="subCategories" style="display: none;">
    <dl class="b-dl-panel">
        <dt class="margin10-B">
        <spring:message code="setting.publish.subscribe.subscribeYour" htmlEscape="false" />
        </dt>
        <c:forEach var="category" items="${categories}" varStatus="status">
        <dd>
            <input type="checkbox" value="${category.id}"/><span  class="margin5-L" name="${category.id}">${category.name}</span>
        </dd>
        </c:forEach>
    </dl>
</div>

<div id="pubCategories" style="display: none;">
    <dl class="b-dl-panel">
        <dt class="margin10-B">
        <spring:message code="setting.publish.subscribe.publishYour" htmlEscape="false" />
        </dt>
        <c:forEach var="category" items="${categories}" varStatus="status">
        <dd>
            <input type="checkbox"/><span  class="margin5-L" name="${category.id}">${category.name}</span>
        </dd>
        </c:forEach>
    </dl>
</div>

<!-- address_clone start -->
<div id="address_clone" style="display: none;">
    <div class="subdiv_graybox">
        <div style="text-align: right">
            <a class="icn_close_12" href="#" name="removeAddress"></a>
        </div>
        <table width="100%" cellspacing="0" cellpadding="0" class="table_infor">
            <tbody>
                <tr>
                    <td width="20%"><label class="label_a"><span class="xing">*</span><spring:message code="contact.field.address.locationName" htmlEscape="false"/></label>
                    </td>
                    <td width="80%">
                        <input type="text" name="address[x].locationName"  class="input_long {required:true,maxlength:40}">
                    </td>
                </tr>
                <tr>
                    <td><label class="label_a"><span class="xing">*</span><spring:message code="contact.field.address.country" htmlEscape="false"/></label>
                    </td>
                    <td>
                        <select class="searchForGeoAddress select_long {required:true}" name="address[x].country">
                            <option value=""><spring:message code="global.select.null.text" htmlEscape="false"/></option>
                            <c:forEach var="country" items="${countries}">
                                <option value="<c:out value="${country.code}"/>" countryfullname="<c:out value="${country.value}"/> ">${country.value}</option>
                            </c:forEach>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label class="label_a"><span class="xing">*</span><spring:message code="contact.field.address" htmlEscape="false"/></label>
                    </td>
                    <td>
                        <input type="text" class="searchForGeoAddress input_long {required:true,maxlength:100}" maxlength="100" name="address[x].streetAddress"></td>
                </tr>
                <tr>
                    <td><label class="label_a"><spring:message code="contact.field.address.suite" htmlEscape="false"/></label></td>
                    <td>   <input type="text" name="address[x].suite" maxlength="10"  class="input_long searchForGeoAddress {maxlength:10}"></td>
                </tr>
                <tr>
                    <td><label class="label_a"><spring:message code="contact.field.address.city" htmlEscape="false"/></label>
                    </td>
                    <td><input type="text" class="searchForGeoAddress input_long {maxlength:40}" maxlength="40" name="address[x].city"></td>
                </tr>
                <tr>
                    <td><label class="label_a"><spring:message code="contact.field.address.stateProvince" htmlEscape="false"/></label>
                    </td>
                    <td><input type="text" class="searchForGeoAddress input_long  {maxlength:40}" maxlength="40" name="address[x].state">
                    </td>
                </tr>
                <tr>
                    <td><label class="label_a"><spring:message code="contact.field.address.postalCode" htmlEscape="false"/></label>
                    </td>
                    <td>
                        <input type="text" class="searchForGeoAddress input_long {postalcode:true}" name="address[x].postalCode"></td>
                </tr>
                <tr>
                    <td><label class="label_a"><spring:message code="contact.field.GeoSelect" htmlEscape="false"/></label>
                    </td>
                    <td><select name="selectForGeoLocation" class="select_long">
                            <option value="-1"><spring:message code="setting.iv.weather.search" htmlEscape="false"/></option>
                        </select></td>
                </tr>

                <tr class="tr_geo_location">
                    <td>

                        <label class="label_a"><span class="xing">*</span><spring:message code="contact.field.address.gisLocation.lon" htmlEscape="false"/></label>
                    </td>
                    <td>
                        <input type="text" class="input_long {range:[-180,180],required:true}" name="address[x].gisLocation.lon">

                    </td>
                </tr>
                <tr>
                    <td><label class="label_a"><span class="xing">*</span><spring:message code="contact.field.address.gisLocation.lat" htmlEscape="false"/></label>
                    </td>
                    <td>
                        <input type="text" class="input_long {range:[-90,90],required:true}" name="address[x].gisLocation.lat">
                    </td>
                </tr>
                <tr><td colspan="2" class="alignright"><a name="locateInMap" class="btn_add margin5-R b-gmap-location" href="#"><spring:message code="gmap.button.location" htmlEscape="false"/></a></td></tr>
            </tbody>
        </table>
    </div>
</div>
<!-- address_clone end -->
<div style="display: none">
    <select id="state_select" class="searchForGeoAddress select_long" name="address[x].state">
		<option value=""><spring:message code="global.select.null.text" htmlEscape="false"/></option>
        <c:forEach var="state" items="${states}">
            <option value="<c:out value="${state.code}"/>" >
                    <c:out value="${state.code}"/></option>
        </c:forEach>
    </select>

    <input type="text" class="searchForGeoAddress input_long {maxlength:40}" id="state_input" name="address[x].state">
</div>

<link rel="stylesheet" href="${ctx}/statics/stylesheets/gmap.css?version=${util:getBuildInfo()}" />
<script type="text/javascript" src="${ctx}/statics/javascripts/everbridge/eb_gmap.js?version=${util:getBuildInfo()}"></script>
<script async="true" type="text/javascript" src="${scheme}://maps.google.com/maps/api/js?sensor=false&callback=EB_Common.gmaps.callback&language=${util:getCurrentLocale(pageContext.request)}"></script>
<script type="text/javascript" src="${ctx }/statics/javascripts/views/settings/network/network.js?version=${util:getBuildInfo()}"></script>

<script type="text/javascript">
    $(function() {
        EB_View.settings.network.initSubscribe();
    });
</script>