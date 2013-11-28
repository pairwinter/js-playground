<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
<%-- <script type="text/javascript"
	src="${ctx }/statics/javascripts/views/settings/ssp/ssp.js?version=${util:getBuildInfo()}"></script> --%>
<fileCompress:jscompress compressedFileName="eb_view.settings.ssp.js" ctx="${ctx}"></fileCompress:jscompress>
<%-- <script type="text/javascript" src="${ctx}/statics/javascripts/everbridge/eb_tooltip.js?version=${util:getBuildInfo()}"></script> --%>	
<script type="text/javascript">
	d2 = new Date();
	var src = $("#bannerImg").attr("src");
	$("#bannerImg").attr("src", src+"?t="+d2.getTime());
	
	$('#uploadImgForm').validate({
	    rules: { 'file': { required: true,accept: "png|jpeg|jpg|gif|bmp"}},
	    messages:{
	    	'file':{accept:"Please upload an image in valid format"}
	    }
	});
	//new EB_Common.toolTip();
</script>
<div class="margin10">
    <h3 class="margin10_B">
        <spring:message code="sspconfig.text.banner.description"/>
        <a class="icon_help right" href="#" roboHelpIndex="61" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
    </h3>
    <div class="b-grid-single" style="min-height:580px;">
        <form:form id="uploadImgForm" enctype="multipart/form-data" method="post">
            <div class="margin10-B"><strong><spring:message code="sspconfig.text.ssp.bannertext"/></strong></div>
            <div>
	            <input type="file" name="file" id="file" size="47" style="background-color: #ffffff"/>
            </div>
            <div class="tip_message margin5-T"><spring:message code="ssp.banner.message.tip" htmlEscape="false" /></div>
            <div class="clearfix">
                <label id="status" style="height: 15px;"></label><br>
                <input type="button" name="fileLoad" id="fileLoad" value='<spring:message code="button.upload"/>' onClick="EB_View.ssp.fileupload()" class="button orange left"/>
            </div>
        </form:form>
        <div class="margin20-T margin25-B" style="max-width: 992px;">
        	<c:if test="${unexist==false}">
        		<div id="showImgDiv" >
        			<strong><spring:message code="ssp.banner.lable" htmlEscape="false"/></strong>
	            	<a id="deleteImg" class="right margin5-B c_pointer" onclick="EB_View.ssp.deleteImg();return false;" href="javascript:void(0);"><span class="icn_trash_16"></span><spring:message code="ssp.banner.clear" htmlEscape="false"/></a>
	            	<div class="preview_banner margin5-T"><img id="bannerImg" src="${ctx}/settings/sspconfig/showbanner/${orgId}" class="banner_custom"  /></div>
	            	<center><span id="fileName"></span></center>
            	</div>
	        </c:if>
	        <c:if test="${unexist==true}">
	        	<div id="showImgDiv" style="display:none;">
		            <a id="deleteImg" class="right margin5-B" onclick="EB_View.ssp.deleteImg();return false;" href="javascript:void(0);"><span class="icn_trash_16"></span><spring:message code="ssp.banner.clear" htmlEscape="false"/></a>
		            <div class="preview_banner margin5-T"><img id="bannerImg" src="${ctx}/settings/sspconfig/showbanner/${orgId}" class="banner_custom"  /></div>
		           <center><span id="fileName"></span></center>
	            </div>
	        </c:if>
        </div>
    </div>
</div>
