<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
<%-- <script type="text/javascript"
	src="${ctx }/statics/javascripts/views/settings/ssp/sspRichTextEdit.js?version=${util:getBuildInfo()}"></script> --%>
<fileCompress:jscompress compressedFileName="eb_view.settings.sspRichTextEdit.js" ctx="${ctx}"></fileCompress:jscompress>
<script>
	$(function() {
		EB_View.richText.init('faqwysiwyg', 'FAQS', 'faqSaveBtn');
	});
</script>
<div class="margin10">
	<h3 class="margin10_B">
		<spring:message code="sspconfig.text.faqs.description" />
        <a class="icon_help right" href="#" roboHelpIndex="63" title="<spring:message code="global.menu.help" htmlEscape="false" />"></a>
	</h3>
	<div class="b-grid-single">
		<div class="rich_text">
			<textarea id="faqwysiwyg" style="display:none;"></textarea>
			<div class="margin10-T">
				<input type="button" value='<spring:message code="button.save"/>'
					id="faqSaveBtn" class="button orange" />
			</div>
		</div>

	</div>
</div>
