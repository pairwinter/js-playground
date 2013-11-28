<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
<%-- <script type="text/javascript"
	src="${ctx }/statics/javascripts/views/settings/gis.js?version=${util:getBuildInfo()}"></script> --%>
<fileCompress:jscompress compressedFileName="eb_view.settings.gis.js" ctx="${ctx}"></fileCompress:jscompress>
<!-- setting panel -->
<form id="gisDefaultForm" name="gisDefaultForm">
    <a class="icon_help right" href="#" roboHelpIndex="39" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
		<div class="clearfix">
			<div class="b-panel-body left w_50p">
				<h3 class="height_30">
                    <spring:message code="setting.gis.default.baseMap" htmlEscape="false" />

                </h3>
				<div class="height80">
					<ul class="b-setting-gis-ul">
						<c:forEach var="baseMap" items="${baseMaps}">
							<li><input id="baseMap" type="radio" value="${baseMap.key}" name="baseMap"
								<c:if test="${baseMap.key == org.gisSetting.baseMap }">checked</c:if>>  ${baseMap.value}</li>
						</c:forEach>
					</ul>
				</div>
			</div>
			<div class="b-panel-body left w_50p margin10-L">
				<h3 class="height_30"><spring:message code="setting.gis.default.mapCenter" htmlEscape="false" /></h3>

				<div class="height80">
					<label><spring:message code="setting.gis.default.mapCenter.title" htmlEscape="false" /></label><br>
					<div><input id="mapCenter" type="text" class="input-radius width_percent94 {required:true}" name="mapCenter" value="${org.gisSetting.mapCenter}" /></div>
					<div class="title-font1 italic margin5-T width_percent94 text-right"><spring:message code="setting.gis.default.mapCenter.example" htmlEscape="false" /></div>
				</div>
			</div>
			<div class="b-panel-body left w_50p margin10-T">
				<h3 class="height_30"><spring:message code="setting.gis.default.zoomLevel" htmlEscape="false" /></h3>

				<div class="height80">
					<label><spring:message code="setting.gis.default.zoomLevel.title" htmlEscape="false" /></label><br>
					<span> <select id="mapZoomLevel"  name="mapZoomLevel" class="select width_percent94" >
							<c:forEach var="zoomLevel" items="${zoomLevels}">
								<option value="${zoomLevel.id}"
									<c:if test="${zoomLevel.id == org.gisSetting.mapZoomLevel }">selected</c:if>>${zoomLevel.value}</option>
							</c:forEach>
					</select>
					</span>
				</div>
			</div>
			
			<div class="b-panel-body left w_50p margin10-L margin10-T">
				<h3 class="height_30"><spring:message code="setting.gis.default.projection" htmlEscape="false" /></h3>

				<div class="height80">
					<label><spring:message code="setting.gis.default.projection.title" htmlEscape="false" /></label><br>
					<span> <select id="projection"  name="projection" class="select width_percent94" >
							<c:forEach var="projection" items="${projections}">
								<option value="${projection.id}"
									<c:if test="${projection.id == org.gisSetting.projection }">selected</c:if>>${projection.value}</option>
							</c:forEach>
					</select>
					</span>
				</div>
			</div>
        </div>

		<div class="margin20-T">
			<input type="submit" value="<spring:message code="button.save" htmlEscape="false" />" class="button orange" id="formBut0"> 
		 	<input type="button"value="<spring:message code="button.cancel" htmlEscape="false" />" class="button gray" id="cancel" style="display: none">
		</div>
</form>
<script type="text/javascript">
	$(function() {
		EB_View.settings.gis.initDefaultPage();
	});
</script>