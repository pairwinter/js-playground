<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
<script type="text/x-jsrender" id="addressTemplate">
{{for #data}}
<div class="subdiv_graybox">
	<div style="text-align: right">
		<a class="icn_close_12" href="javascript:void(0);" name="removeAddress"></a>
	</div>
	<table width="100%" cellspacing="0" cellpadding="0" class="table_infor">
		<tbody>
			<tr>
				<td width="20%">
					<label class="label_a"><span class="xing">*</span><spring:message code="contact.field.address.locationName" htmlEscape="false" /> </label>
				</td>
				<td width="80%">
					<input type="text" name="locationName" maxlength="40" class="input_long {required:true}"></td>
			</tr>
			<tr>
				<td>
					<label class="label_a"><span class="xing">*</span><spring:message code="contact.field.address.country" htmlEscape="false" /></label>
				</td>
				<td>
					<select class="searchForGeoAddress select_long {required:true}" name="country">
						<option value="">
							<spring:message code="global.select.null.text" htmlEscape="false" />
						</option>
						{{for countries}}
							<option value="{{:code}}" countryfullname="{{:value}}" {{if code==#parent.parent.data.country}}selected="selected"{{/if}}>{{:value}}</option>
						{{/for}}
					</select>
				</td>
			</tr>
			<tr>
				<td>
					<label class="label_a"><span class="xing">*</span><spring:message code="contact.field.address" htmlEscape="false" /></label>
				</td>
				<td>
					<input type="text" class="searchForGeoAddress input_long {required:true,maxlength:100}" maxlength="100" name="streetAddress">
				</td>
			</tr>
			<tr>
				<td>
					<label class="label_a"><spring:message code="contact.field.address.suite" htmlEscape="false" /></label>
				</td>
				<td>
					<input type="text" name="suite" maxlength="10" class="input_long searchForGeoAddress {maxlength:10}">
				</td>
			</tr>
			<tr>
				<td>
					<label class="label_a"><spring:message code="contact.field.address.city" htmlEscape="false" /></label>
				</td>
				<td>
					<input type="text" class="searchForGeoAddress input_long {maxlength:40}" maxlength="40" name="city">
				</td>
			</tr>
			<tr>
				<td>
					<label class="label_a"><spring:message code="contact.field.address.stateProvince" htmlEscape="false" /></label>
				</td>
				<td><input type="text" class="searchForGeoAddress input_long  {maxlength:40}" maxlength="40" name="state"></td>
			</tr>
			<tr>
				<td>
					<label class="label_a"><spring:message code="contact.field.address.postalCode" htmlEscape="false" /></label>
				</td>
				<td>
					<input type="text" class="searchForGeoAddress input_long {postalcode:true}" name="postalCode">
				</td>
			</tr>
			<tr>
				<td>
					<label class="label_a"><spring:message code="contact.field.GeoSelect" htmlEscape="false" /></label>
				</td>
				<td>
					<select name="selectForGeoLocation" class="select_long">
						<option value="-1">
							<spring:message code="setting.iv.weather.search" htmlEscape="false" />
						</option>
					</select>
				</td>
			</tr>
			<tr class="tr_geo_location">
				<td>
					<label class="label_a"><spring:message code="contact.field.address.gisLocation.lon" htmlEscape="false" /></label>
				</td>
				<td>
					<input type="text" class="input_long {range:[-180,180]}" name="gisLocation.lon">
				</td>
			</tr>
			<tr>
				<td>
					<label class="label_a"><spring:message code="contact.field.address.gisLocation.lat" htmlEscape="false" /></label>
				</td>
				<td>
					<input type="text" class="input_long {range:[-90,90]}" name="gisLocation.lat">
				</td>
			</tr>
			<tr>
				<td colspan="2" class="alignright">
					<a name="locateInMap" class="btn_add margin5-R" href="#"><spring:message code="gmap.button.location" htmlEscape="false" /></a>
				</td>
			</tr>
		</tbody>
	</table>
</div>    
{{/for}}
</script>

