<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>

<!-- setting panel -->
<div class="margin10">
	<div class="b-panel-header">
		<h3>
			<spring:message code="setting.publish.cmas_wea.item2" htmlEscape="false" />
            <a title="Help" robohelpindex="90" href="#" class="icon_help right"></a>
		</h3>
	</div>

	<div class="b-grid-single">
        <form id="eb_form" style="display:none;">
            <table width="100%" cellspacing="0" cellpadding="0" class="b-grid-single-table" id="eb_grid">
                <thead>
                    <tr>
                        <th width="10%"><spring:message code="setting.publish.cmas_wea.samecodes.col1" htmlEscape="false" /></th>
                        <th width="35%"><spring:message code="setting.publish.cmas_wea.samecodes.col3" htmlEscape="false" /></th>
                        <th width="35%"><spring:message code="setting.publish.cmas_wea.samecodes.col4" htmlEscape="false" /></th>
                        <th width="20%">&nbsp;</th>
                    </tr>
                </thead>
                <tbody id="sameCodesBody">
                <c:forEach var="sameCode" items="${sameCodeList}"
                           varStatus="status">
                    <tr id="${sameCode.id}" name="data">
                        <td>
                            <a href="#" title="<spring:message code="button.down" htmlEscape="false" />" name="operte_down" class="icn_down_16"></a>
                            <a href="#"title="<spring:message code="button.up" htmlEscape="false" />" name="operte_up" class="icn_up_16"></a>
                            <span class="margin10-L txt_middle"></span>
                        </td>
                        <td><c:out value="${sameCode.value}" /></td>
                        <td><c:out value="${sameCode.desc}" escapeXml="false" /></td>
                        <td>
                            <a href="#" title="<spring:message code="button.edit" htmlEscape="false" />" name="operte_edit" class="icn_edit_16"></a>
                            <a href="#" title="<spring:message code="button.save" htmlEscape="false" />" name="operte_save" class="icn_save_16" style="display:none;"></a>
                            <a href="#" title="<spring:message code="button.cancel" htmlEscape="false" />" name="operte_cancel" class="icn_cancel_16" style="display:none;"></a>
                            <a href="#" title="<spring:message code="button.delete" htmlEscape="false" />" name="operte_delete" class="icn_trash_16"></a>
                        </td>
                    </tr>
                </c:forEach>
                </tbody>
                <tfoot>
                    <tr>
                        <td><span style="display:none;">&nbsp;</span></td>
                        <td><input type="text" placeholder="<spring:message code="setting.publish.cmas_wea.samecodes.placeholder1" htmlEscape="false" />" class="width_percent94 {required: true,digitslength: 6}" maxlength="6" name="value" /></td>
                        <td><input type="text" placeholder="<spring:message code="setting.publish.cmas_wea.samecodes.placeholderDesc" htmlEscape="false" />" class="width_percent94 {required: true,maxlength: 30}" maxlength="30" name="desc" /></td>
                        <td>
                            <a id="addButton" href="#"><i class="icn_addLink_12 margin5-R"></i><spring:message code="button.add" htmlEscape="false" /></a>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </form>
	</div>
</div>

<script type="text/javascript" src="${ctx }/statics/javascripts/views/settings/network/sameCodes.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript">
    $(function() {
        EB_View.settings.network.sameCodes.initPage();
    });
</script>