!function(a){define(function(require,b,c){c.exports=require("jsCore/pageTab");var d=require("jsCore/ability");c.exports.prototype.vid_abnormal=a.when(d.get("VideoDetectCaps",!0)).then(function(b){return b&&!b.UnFocusDetect&&a("[data-for=vid_blind][t=w_videoOn]").attr("t","w_Video Shelter").parent().translation(),b&&b.SupportMovedDetect}),c.exports.prototype.vid_blind=webApp.DeviceType.contains("TPC")&&webApp.CHANNEL_NUMBER>1?!0:!1}),define("vid_motion",function(require,b,c){function d(a){var b,c,d=/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,e=0,f="";if(/^(rgb|RGB)/.test(a))for(b=a.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(","),e=b.length-1;e>=0;e--)c=Number(b[e]).toString(16),1===c.length&&(c="0"+c),f+=c;else d.test(a)&&(b=a.replace(/#/,"").split(""),6===b.length&&(f=b[4]+b[5]+b[2]+b[3]+b[0]+b[1]));return 6!==f.length?0:parseInt(f,16)}var e=require("jsCore/rpc"),f=require("jsCore/pageBase"),g=require("jsCore/plugin"),h=require("common/common"),i=require("jsCore/modules/timeSection");require("widget/js/dui.slider"),require("widget/js/dui.figure"),require("jsCore/modules/eventHandler"),require("widget/js/dui.iconlist"),require("widget/js/dui.iconSelect");var j,k=null,l=null,m=null,n=null,o=0,p=0,q=0,r=!!isEnable("is_has_detectPic"),s=null;c.exports=f.extend({init:function(){k=this,webApp.CHANNEL_NUMBER>1&&(k.$("#vid_motion_channel").parent().removeClass("fn-hide"),k.$("#vid_motion_channel").parent().next("div")[0].removeClass("fn-hide"),l=a("#vid_motion_channel").iconSelect({channelNumber:webApp.CHANNEL_NUMBER,allEnable:!1,change:function(a,b){q=b.ch,k._renderElements()}}),l.iconSelect("index",q)),k.$("#v_m_anti").numberfield({min:0,max:100,allowDecimal:!1,allowNegative:!1}),k.$("#v_m_event").eventHandler(),j=k.$("#v_m_dialog").dialog({confirm:function(a,b){m=n,k._detachData(),b.ui.close()},close:function(){k._detachData()}}).detach().appendTo(document.body),j.dialog("setPosition",[310,615]),j.find("#v_m_sen").slider({complete:function(a,b){n[q].MotionDetectWindow[p].Sensitive=b.value,k._setTempConfig()}}),j.find("#v_m_thr").slider({change:function(a,b){r&&j.find("#v_m_figure").figure("threshold",b.value)},complete:function(a,b){n[q].MotionDetectWindow[p].Threshold=b.value,k._setTempConfig()}}),r&&j.find("#v_m_figure").figure({width:240}).parent().show(),j.find("#v_m_region").textfield({validReg:/[:"'{}\[\]<>\\,]/m,validRegRet:!1,errorHandle:"prevent",success:function(){n&&(n[q].MotionDetectWindow[p].Name=a(this).val())}}),j.find(".videodetect-region-item").on("click",function(){p=a(this).data("index"),g.SetCurrentDrawId(p);var b=n[q].MotionDetectWindow[p];a(this).addClass("videodetect-region-current").siblings().removeClass("videodetect-region-current"),j.find("#v_m_region").textfield("value",b.Name),j.find("#v_m_sen").slider("value",b.Sensitive),j.find("#v_m_thr").slider("value",b.Threshold)});var b=ability.get("VideoDetectCaps"),c=ability.get("PtzManualMotionDetect");a.when(b,c).done(function(a,b){s=a?a:{DetectVersion:["V1.0","V3.0"],MotionColumns:22,MotionDetectWindow:4,MotionRows:18},b===!0&&(s.PtzManual=!0,k.$("label[for=v_m_ptz]").parent().show()),k.render()})},render:function(){k._getConfig(!1)},destory:function(){j.remove()},_getConfig:function(a){e.ConfigManager.getConfig("MotionDetect").done(function(b){m=b,k._renderElements(),a&&k.tip("success","Operateingsuccess"),k.disabled("[btn-for=onConfirm]",!1)}).fail(function(){k.tip("error","Operateingfailure"),k.disabled("[btn-for=onConfirm]",!0)})},_renderElements:function(){var a=m[q];s.PtzManual&&k.$("#v_m_ptz").prop("checked",a.PtzManualEnable),k.$("#v_m_enable").prop("checked",a.Enable),k.$("#v_m_anti").numberfield("value",a.EventHandler.Dejitter),k.$("#v_m_event").eventHandler("set",a.EventHandler)},setAreaZone:function(){j.dialog("show"),n=a.extend(!0,[],m),r&&(j.find("#v_m_figure").figure("start"),e.DevVideoDetect.attachMotionData(++o%65535),webApp.NotifyVersion?h.devNotify.subscribe("devVideoDetect.notifyMotionData",window.showMotionFigure):k.$("#v_m_frame").attr("src","/cgi-bin/videomotion.cgi?sessionId="+e.getSession()),app.addEvent("RECONNECTION",k._reconnect));var b=n[q].MotionDetectWindow||[],c=[],f=[],i=new Array(s.MotionRows);if(b.length<s.MotionDetectWindow){a.each(b,function(a,b){c.push(b.Id)}),a.each(i,function(a){i[a]=0});for(var l=0;l<s.MotionDetectWindow;l++)-1===a.inArray(l,c)&&b.splice(l,0,{Id:l,Name:"Region "+(l+1),Region:i,Sensitive:isEnable("videodetect_default_sensitive")||58,Threshold:isEnable("videodetect_default_threshold")||4})}n[q].MotionDetectWindow=b,a.each(b,function(a,b){var c=d(j.find(".videodetect-regions a").eq(a).css("background-color"));f.push(b.Id+"@"+c+"-"+b.Region.join(":")),j.find(".videodetect-region-item:eq("+a+")").data("index",b.Id)}),g.cover("#v_m_detzone",function(){g.SetModuleMode(1),webApp.DeviceType.contains("TPC")?(g.SetVisibleVideoWnd(1,q),login.chkAuthority("Monitor_0"+(q+1))&&g.open(g.stream,q,1),!login.chkAuthority("Monitor_0"+(q+1))&&g.SetVideoWndTip(q,tl("noVideoAuthoity"))):g.open(),g.SetGridNum(s.MotionRows,s.MotionColumns),g.SetFuntionInfo("MotionDetect",f.join(" ")),g.SetCurrentDrawId(p)});var t=b[p];j.find("#v_m_region").textfield("value",t.Name),j.find("#v_m_sen").slider("value",t.Sensitive),j.find("#v_m_thr").slider("value",t.Threshold),k._setTempConfig(),g.addEvent("OutPutStringInfo",function(b,c){var d=c.split(" ");a.each(d,function(b,c){if(c){var d=c.split("-"),e=parseInt(d[0].split("@")[0]);a.each(d[1].split(":"),function(a,b){n[q].MotionDetectWindow[e].Region[a]=parseInt(b)})}}),k._setTempConfig()})},onClearArea:function(){g.RemoveAllMonDetectReg()},onDelArea:function(){g.RemoveMonDetectReg()},onSetPeriod:function(){m&&m[q].EventHandler&&m[q].EventHandler.TimeSection&&i.open(m[q].EventHandler.TimeSection).done(function(a){m[q].EventHandler.TimeSection=a})},onDefault:function(){e.ConfigManager.getDefault("MotionDetect").done(function(a){m[q]=a[q],k._renderElements(),k.tip("success","Defaultsuccess")}).fail(function(){k.tip("error","Defaultfailure")})},onRefresh:function(){k._getConfig(!0)},onConfirm:function(){m[q].Enable=k.$("#v_m_enable").prop("checked"),a.inArray("V3.0",s.DetectVersion)>-1&&(m[q].DetectVersion="V3.0"),s.PtzManual&&(m[q].PtzManualEnable=k.$("#v_m_ptz").prop("checked")),m[q].EventHandler=k.$("#v_m_event").eventHandler("get"),m[q].EventHandler.Dejitter=k.$("#v_m_anti").numberfield("value"),e.ConfigManager.setConfig("MotionDetect",m).done(function(){k.tip("success","Succeed in saving configure")}).fail(function(){k.tip("error","Saving failure")})},_reconnect:function(){e.DevVideoDetect.attachMotionData(++o%65535),webApp.NotifyVersion?h.devNotify.reconnect():k.$("#v_m_frame").attr("src","/cgi-bin/videomotion.cgi?sessionId="+e.getSession())},_setTempConfig:function(){n[0].Enable=!0,e.ConfigManager.setTemporaryConfig("MotionDetect",n)},_detachData:function(){r&&(j.find("#v_m_figure").figure("stop"),e.DevVideoDetect.detachMotionData(o),webApp.NotifyVersion?h.devNotify.detach("devVideoDetect.notifyMotionData"):k.$("#v_m_frame").attr("src",""),app.removeEvent("RECONNECTION",k._reconnect)),e.ConfigManager.restoreTemporaryConfig("MotionDetect"),g.addEvent("OutPutStringInfo",null),g.SetGridNum(0,0),g.hide()}}),window.showMotionFigure=function(b){a.each(b.data,function(a,b){b.id===p&&j.find("#v_m_figure").figure("push",b.threshold)})}}),define("vid_blind",function(require,a,b){var c=require("jsCore/rpc"),d=require("jsCore/pageBase"),e=require("jsCore/modules/timeSection");require("jsCore/modules/eventHandler");var f=null,g=null,h=null,i=0,j=!1;b.exports=d.extend({init:function(){h=this,h.$("#v_b_event").eventHandler(),ability.get("VideoDetectCaps").done(function(a){a&&a.UnFocusDetect?(j=!0,h.$("#v_b_videoable").next("span").attr("t","w_VideoShelterEnable").parent().translation(),h.$("#v_b_focusable").parent().show()):h.$("#v_b_focusable").parent().remove(),h.render()})},render:function(){h._getConfig(!1)},_getConfig:function(a){c.ConfigManager.getConfig("BlindDetect").done(function(b){f=b,h._renderElements(),a&&h.tip("success","Operateingsuccess")}).fail(function(){h.tip("error","Operateingfailure")}),j&&c.ConfigManager.getConfig("UnFocusDetect").done(function(a){g=a,h.$("#v_b_focusable").prop("checked",g[i].Enable)})},_renderElements:function(){h.$("#v_b_videoable").prop("checked",f[i].Enable),h.$("#v_b_event").eventHandler("set",f[i].EventHandler)},onDefault:function(){c.ConfigManager.getDefault("BlindDetect").done(function(a){f[i]=a[i],h._renderElements(),h.tip("success","Defaultsuccess")}).fail(function(){h.tip("error","Defaultfailure")}),j&&c.ConfigManager.getDefault("UnFocusDetect").done(function(a){g=a,h.$("#v_b_focusable").prop("checked",g[i].Enable)})},onRefresh:function(){h._getConfig(!0)},onConfirm:function(){f&&(f[i].Enable=h.$("#v_b_videoable").prop("checked"),f[i].EventHandler=h.$("#v_b_event").eventHandler("get"),c.ConfigManager.setConfig("BlindDetect",f).done(function(){h.tip("success","Succeed in saving configure")}).fail(function(){h.tip("error","Saving failure")})),g&&(g[i].Enable=h.$("#v_b_focusable").prop("checked"),g[i].EventHandler=f[i].EventHandler,c.ConfigManager.setConfig("UnFocusDetect",g))},onSetPeriod:function(){f&&f[i].EventHandler&&f[i].EventHandler.TimeSection&&e.open(f[i].EventHandler.TimeSection).done(function(a){f[i].EventHandler.TimeSection=a})}})}),define("vid_abnormal",function(require,b,c){var d=require("jsCore/rpc"),e=require("jsCore/pageBase"),f=require("jsCore/modules/timeSection");require("jsCore/modules/eventHandler");var g=null,h=null,i=0,j=null;c.exports=e.extend({init:function(){g=this,g.$("#v_a_event").eventHandler(),g.render(),webApp.CHANNEL_NUMBER>1&&(g.$("#vid_abnormal_channel").parent().removeClass("fn-hide"),g.$("#vid_abnormal_channel").parent().next("div")[0].removeClass("fn-hide"),j=a("#vid_abnormal_channel").iconSelect({channelNumber:webApp.CHANNEL_NUMBER,allEnable:!1,change:function(a,b){i=b.ch,g._renderElements()}}),j.iconSelect("index",i))},render:function(){g._getConfig(!1)},_getConfig:function(a){d.ConfigManager.getConfig("MovedDetect").done(function(b){h=b,g._renderElements(),a&&g.tip("success","Operateingsuccess"),g.disabled("[btn-for=onConfirm]",!1)}).fail(function(){g.tip("error","Operateingfailure"),g.disabled("[btn-for=onConfirm]",!0)})},_renderElements:function(){g.$("#v_a_enable").prop("checked",h[i].Enable),g.$("#v_a_event").eventHandler("set",h[i].EventHandler)},onDefault:function(){d.ConfigManager.getDefault("MovedDetect").done(function(a){h[i]=a[i],g._renderElements(),g.tip("success","Defaultsuccess")}).fail(function(){g.tip("error","Defaultfailure")})},onRefresh:function(){g._getConfig(!0)},onConfirm:function(){h[i].Enable=g.$("#v_a_enable").prop("checked"),h[i].EventHandler=g.$("#v_a_event").eventHandler("get"),d.ConfigManager.getConfig("MovedDetect").done(function(a){a[i]=h[i],d.ConfigManager.setConfig("MovedDetect",a).done(function(){g.tip("success","Succeed in saving configure")}).fail(function(){g.tip("error","Saving failure")})})},onSetPeriod:function(){h&&h[i].EventHandler&&h[i].EventHandler.TimeSection&&f.open(h[i].EventHandler.TimeSection).done(function(a){h[i].EventHandler.TimeSection=a})}})})}(jQuery);