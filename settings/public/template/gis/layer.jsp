<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
<script type="text/javascript"
	src="${ctx}/statics/javascripts/plugin/ztree/js/jquery.ztree.all-3.2.min.js?version=${util:getBuildInfo()}"></script>
<!-- ztree i18n -->
<script type="text/javascript" src="${ctx }/statics/javascripts/plugin/ztree/js/i18n/jquery.ztree_${util:getCurrentLocale(pageContext.request)}.js?version=${util:getBuildInfo()}"></script>
	
<script type="text/javascript"
	src="${ctx }/statics/javascripts/views/settings/gis/layer.js?version=${util:getBuildInfo()}"></script>
<%-- <fileCompress:jscompress compressedFileName="eb_view.settings.gis.js" ctx="${ctx}"></fileCompress:jscompress> --%>
<div class="margin10">
<h3>
	<spring:message code="setting.menu.gis.layer"
		htmlEscape="false" />
    <a class="icon_help right" href="#" roboHelpIndex="41" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
</h3>
<div id="layerPanel" class="clearfix">
	<div class="left b-setting-gis-tree w_50p">
	    <div>
	        <div id="duplicationName" class="error-top right margin30-R" style="display:none;position:absolute;left:420px;"><b></b><label></label></div>
			<ul class="g_btnmenu">
				<li id="addFolder"><i class="icn_addfolder_16 margin5-R"></i><a 
					href="javascript:void(0)"><spring:message code="button.add" htmlEscape="false" /></a></li>
				<li id="export" class="export-grap"><i class="icn_export_16 grap"></i><a
					 href="javascript:void(0)" class="disable"><spring:message code="button.export"
							htmlEscape="false" /></a></li>
			</ul>
		</div>
		<div class="whitebg" style="text-align: left;">
			<ul id="layerTree" class="ztree g_tree"
				style="overflow: auto; height: 300px"></ul>
		</div>
	</div>

	<!-- Import Region start-->
	<form id="layerForm" method="post" ENCTYPE="multipart/form-data"
		class="left margin10-L w_50p b-panel-body">
		<input type="hidden" id="layerName" name="name" />
		<div class="">
			<h4>
				<spring:message code="setting.gis.layer.import" htmlEscape="false" />
				<i class="icn_information_16 b-tooltip" title="<spring:message code="setting.gis.layer.import.prompt" htmlEscape="false" />"></i>
			</h4>
			<div id="import_ct"></div>

			<a class="import-btn" id="import_btn"><i class="icn_addLink_12"></i>
			<spring:message code="setting.gis.layer.importAnother" htmlEscape="false" /></a>
			<div class="b-setting-gis-btnct">
				<input type="submit" id="upload"
					value="<spring:message code="button.upload" htmlEscape="false" />"
					class="button orange" style="display: none;" />
			</div>
		</div>
	</form>
</div>
<!-- Import Region end-->
</div>
<!--<script type="text/javascript" src="${ctx}/statics/javascripts/everbridge/eb_tooltip.js?version=${util:getBuildInfo()}"></script>-->
<script type="text/javascript">
  $(function(){
	    var zNodes = $.parseJSON('${resources}'); 
		EB_View.settings.gis.initLayerPage(zNodes);
		/* var options = {};
		options.container = $('#layerPanel');
		options.nodes = zNodes;
		EB_View.settings.gis.layerPanel.getInstance(options);  */
		//new EB_Common.toolTip();
        $('.b-tooltip').tooltip();
  });
</script>
<script id="uploadTemplate" type="text/x-jsrender">
{{for #data}}
<div class="b-upload_div margin10-T">
<ul>
	<li>
		<label><span class="xing">*</span><spring:message code="setting.gis.layer.choose" htmlEscape="false" /></label>
		<div>
			<input name="layerFile" type="file" class="{required:true,accept:'zip'}" style="background-color: #ffffff" />
		</div>
	</li>
	<li>
		<label><span class="xing">*</span><spring:message code="setting.gis.layer.name" htmlEscape="false" /></label>
		<div>
			<input name="{{:layer}}" type="text" class="input_width250 checkLayerName {required:true}" maxlength="80"/>
		</div>
	</li>
	<li>
		<label><spring:message code="setting.gis.layer.folder" htmlEscape="false" /></label>
		<div>
			<select class="select select_width250" name="parentId" id="parentId">
				<option value="-1"></option>
				{{for nodes}}
					<option value="{{:id}}">{{>name}}</option>
				{{/for}}
			</select>
		</div>
	</li>
</ul>
<div class="b-setting-form-del"></div>
</div>
{{/for}}
</script>