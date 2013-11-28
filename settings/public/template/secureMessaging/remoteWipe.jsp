<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/commons/taglibs.jsp" %>

<div class="margin10">
    <h3>
        <spring:message code="setting.text.securemessaging.title" htmlEscape="false"/>
        <a title="Help" robohelpindex="106" href="#" class="icon_help right"></a>
    </h3>

    <p class="margin10-T"><spring:message code="setting.text.securemessaging.title.helpmessage" htmlEscape="false"/></p>
    <h4 class="txt-xlarge margin10-T">
        <spring:message code="setting.text.securemessaging.remotewipe" htmlEscape="false"/>
        <a title="<spring:message code="setting.text.securemessaging.remotewipe.tooltip" htmlEscape="false" />"
           class="b-tooltip" href="javascript:void(0)"><i class="icn_information_16"></i></a>
    </h4>

    <div class="b-panel-body margin10-T padding20-L">
        <h4>
            <spring:message code="setting.text.securemessaging.remotewipeandlogout" htmlEscape="false"/>
            <a title="<spring:message code="setting.text.securemessaging.remotewipeandlogout.tooltip" htmlEscape="false" />"
               class="b-tooltip" href="javascript:void(0)"><i class="icn_information_16"></i></a>
        </h4>

        <p class="margin10-T"><spring:message code="setting.text.securemessaging.remotewipeandlogout.helpmessgae"
                                              htmlEscape="false"/></p>

        <div class="clearfix margin10-T">
            <div class="nitif_message borderright txt_center left" style="width:100px;"  id="contactsBtn">
                <p><strong class="txt-xxlarge font-gray" id="countOfContacts">0</strong></p>
                <a href="javascript:void(0);"><spring:message code="notification.text.contact" htmlEscape="false"/></a>
            </div>
            <div class="left margin20-L padding10_T">
                <button type="button" class="button gray" id="wipeNow" disabled="disabled"><spring:message
                        code="setting.text.securemessaging.btn.text" htmlEscape="false"/></button>
            </div>
        </div>
    </div>

    <div class="b-panel-body margin10-T padding20-L">
        <h4><spring:message code="setting.text.securemessaging.remotewipehistory" htmlEscape="false"/></h4>

        <div class="jqgrid">
            <table id="remoteWipe_gridTable" class="table_list" cellpadding="0" cellspacing="0"></table>
            <!--page start-->
            <div id="remoteWipe_gridPager" class="page"></div>
            <!--page end-->
        </div>
    </div>
</div>
<script type="text/x-jsrender" id="remoteWipe_detail_tmpl">
    <div id="remoteWipeDetail" style="display: block;">
        <p class="margin10-T margin20-B txt-large">{{:header}}</p>
        <table width="100%" cellspacing="0" cellpadding="0" class="b-grid-single-table">
            <thead>
            <tr>
                <th width="62%"><spring:message code="setting.text.secure.message.wiped.detail.title"></spring:message></th>
                <th width="10%"><spring:message
                        code="setting.text.secure.message.wiped.detail.successful"></spring:message></th>
                <th width="8%"><spring:message
                        code="setting.text.secure.message.wiped.detail.pending"></spring:message></th>
                <%--<th width="5%"><spring:message code="setting.text.secure.message.wiped.detail.eror"></spring:message></th>--%>
                <th width="15%">&nbsp;</th>
            </tr>
            </thead>
            <tbody>
                {{for secureMessageWipeItems}}
                <tr>
                    <td>{{:firstName}} {{:lastName}}</td>
                    <td class="text-center">{{:sucessfulCount}}</td>
                    <td class="text-center">{{:pendingCount}}</td>
                    <%--<td class="text-center">&nbsp;</td>--%>
                    <td>&nbsp;</td>
                </tr>
                {{/for}}
            </tbody>
        </table>
    </div>
</script>

<jsp:include page="/WEB-INF/views/template/contact/contactSelect.jsp"/>
<script type="text/javascript"
src="${ctx }/statics/javascripts/plugin/ztree/js/jquery.ztree.all-3.2.min.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript"
src="${ctx }/statics/javascripts/views/contact/selectContact.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript"
        src="${ctx }/statics/javascripts/views/settings/secureMessaging/remoteWipe.js?version=${util:getBuildInfo()}"></script>
<script type="text/javascript">
    $(function () {
        EB_View.settings.secureMessaging.remoteWipe.initPage('${ctx}');
    });
</script>