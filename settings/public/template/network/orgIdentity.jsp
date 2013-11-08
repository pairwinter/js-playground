<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
<jsp:include page="../../template/universe/universeApp.jsp"></jsp:include>
<jsp:include page="../../template/notification/message.jsp"></jsp:include>
<form class="margin10" method="post" id="orgIdentityForm">
    <h3>
        <spring:message code="setting.publish.network" htmlEscape="false" />
        <a class="icon_help right" href="#" roboHelpIndex="45" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
    </h3>
    <table class="b-form-table">
        <tbody>
            <tr>
                <td width="200px" style="vertical-align: top;"><label><spring:message code="setting.org.info.name" htmlEscape="false" /></label></td>
                <td>
                    <c:out value="${networkEffectSetting.nickName}"></c:out>
                    <div class="margin10-T">
                        <input type="checkbox" name="displayLogo" id="displayLogo" <c:if test="${networkEffectSetting.displayLogo}">checked</c:if> /> <span  class="margin5-L" ><spring:message code="setting.publish.network.logo" htmlEscape="false" /></span>
                    </div>
                    <div class="margin10-T" <c:if test="${not networkEffectSetting.displayLogo }">style="display: none;"</c:if> id="logoCt">
                    	<div id="imageDiv" <c:if test="${not imageExsit }">style="display: none;"</c:if> >
                    			<img src="${ctx}/settings/network/orgIdentity/logo" width="25" height="25" title="logo" id="logoIcon"/>
	                    		<a id="deleteImg" class="margin5-B c_pointer txt_top" href="javascript:void(0);"><span class="icn_trash_16"></span></a>
                        </div>
                        <div id="fileDiv" <c:if test="${imageExsit }">style="display: none;"</c:if> >
                        	<input type="file" class="{required : true}" name="logo" id="logo" />
                        </div>
                    </div>
                </td>
            </tr>

            <tr>
                <td><label><spring:message code="recipientAppThreshold.field.category" htmlEscape="false" /></label></td>
                <td>
                    <c:out value="${networkEffectSetting.category.name}"></c:out>
                </td>
            </tr>
            <tr>
                <td><label><spring:message code="setting.publish.network.area" htmlEscape="false" /></label></td>
                <td>
                	<input type="hidden" id="shapeFilePath" name="shapeFilePath">
                	<input type="hidden" id="regionLibraryId" name="regionLibraryId">
                	<div id="networkShape" <c:if test="${fn:length(networkEffectSetting.responsibilityArea) > 0 }">style="display: none;"</c:if> ></div>
                	<div id="shapesDiv" <c:if test="${fn:length(networkEffectSetting.responsibilityArea) <= 0 }">style="display: none;"</c:if> >exist shape <a id="deleteShapes" class="margin5-B c_pointer txt_top" href="javascript:void(0);"><span class="icn_trash_16"></span></a></div>
                </td>
            </tr>
        </tbody>
    </table>

    <div class="btn_footer">
        <input id="save" type="button" value="<spring:message code="button.save" htmlEscape="false" />" class="button orange" />
    </div>
</form>
<script type="text/x-jsrender" id="regionLibraryTemplate">
    <div dataId="{{>id}}" class="padding10" style="border:1px solid #cccccc;"><label class="input_long">{{>name}}</label>
        <button type="button" value="Preview on map" id="previewOnMap" class="button gray margin10-L"><spring:message code="notification.field.pulishMessage.network.previewOnMap" htmlEscape="false"/></button></div>
</script>
<script type="text/x-jsrender" id="networkAppTemplate">
    <div>
        <div>
            <input type="radio" class="margin3_R" checked="checked" name="shapeRadio" value="None" id="shapeRadio0" /><label for="shapeRadio0">
            <spring:message code="notification.title.recordmessage.none" htmlEscape="false"/></label>
            <input type="radio" class="margin10-L" name="shapeRadio" value="UploadShape" id="shapeRadio1" /><label for="shapeRadio1">
            <spring:message code="notification.field.pulishMessage.network.affectedArea.upload" htmlEscape="false"/></label>
            <input type="radio" class="margin10-L" name="shapeRadio" value="SelectRegion" id="shapeRadio2" /><label for="shapeRadio2">
            <spring:message code="notification.field.pulishMessage.network.affectedArea.myShapes" htmlEscape="false"/></label>
        </div>
    <%--upload shape&ndash--%>
        <div>
            <div class="upload shape" style="display:none" id="uploadShapDiv">
                <div id="uploadBtnDiv">
                    <span id="uploadShape"><spring:message code="notification.field.pulishMessage.network.uploadShapeBtn" htmlEscape="false"/></span>
                </div>
                <div class="noti_content_hid uploader">
                    <ul id="shapeFileContainer"></ul>
                </div>
            </div>
            <div id="selectFromRegionLibraryDiv">
                <div class="my_shape" id="regionLibrayDiv"></div>
                <div class="my_shape" id="regionLibrayDiv2"></div>
                <div id="regionLibrarySelected"></div>
            </div>

            <input type="hidden" id="div1HasValue" value="0" />
            <input type="hidden" id="div2HasValue" value="0" />
            <input type="hidden" id="selectValue" value="0" />
        </div>
    </div>
</script>
<script type="text/javascript" src="${ctx}/statics/javascripts/plugin/openlayers/OpenLayers.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript" src="${ctx}/statics/javascripts/plugin/fileupload/swfupload.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript" src="${ctx}/statics/javascripts/plugin/fileupload/swfupload.queue.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript" src="${ctx}/statics/javascripts/views/notification/base/base.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript" src="${ctx}/statics/javascripts/views/universe/base/universeApp.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript" src="${ctx}/statics/javascripts/views/universe/base/universeApps.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript" src="${ctx}/statics/javascripts/views/universe/gisInformation.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript" src="${ctx}/statics/javascripts/views/universe/showOnMapWidget.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript" src="${ctx}/statics/javascripts/views/notification/publish/publish.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript" src="${ctx}/statics/javascripts/views/settings/network/network.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript" src="${scheme}://maps.google.com/maps/api/js?sensor=false&callback=EB_Common&language=${util:getCurrentLocale(pageContext.request)}"></script>
<script type="text/javascript">
    $(function() {
        EB_View.settings.network.initOrgIdentity("<%=session.getId()%>");
    });
</script>