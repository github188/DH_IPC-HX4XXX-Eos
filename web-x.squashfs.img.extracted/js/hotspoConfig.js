!function(a){define(function(require,a,b){b.exports=require("jsCore/pageTab")}),define("hotspoFol",function(require,b,c){var d,e,f=require("jsCore/rpc"),g=require("jsCore/ability"),h=require("jsCore/plugin"),i=require("jsCore/pageBase"),j=require("jsCore/modules/timeSection"),k=null,l={},m=webApp.CHANNEL_NUMBER>1?1:0,n={},o={FlashEnable:webApp.ALARM_FLASH,FlashLatch:webApp.ALARM_FLASH,RecordEnable:!0,RecordLatch:!0,MailEnable:!0,SnapshotEnable:!0,PtzLinkEnable:webApp.HasPtz,AlarmOutEnable:!!webApp.ALARM_OUT_NUMBER,AlarmOutLatch:!!webApp.ALARM_OUT_NUMBER,VoiceEnable:webApp.IsAudioFileManager&&webApp.AUDIO_OUT_NUMBER,MMSEnable:webApp.Is3G||webApp.Is4G};c.exports=i.extend({init:function(){k=this,k.bind(),k.initEventHandler(),k.render()},initEventHandler:function(){if(k.$("[cfg]").each(function(a,b){var c=k.$(b),d=c.attr("cfg");o[d]||c.closest(".ui-form-item").remove()}),webApp.HasPtz){if(k.$("[cfg=PtzLinkEnable]").change(function(a){var b=k.$(a.target),c=b.prop("checked");g.get("PTZCaps",!0).done(function(a){e=a;var b=k.$("#hotspo_doPtzLink");c?(b.parent().show(),b.val(b.is(":has(option[value="+d.EventHandler.PtzLink[0][0]+"])")?d.EventHandler.PtzLink[0][0]:"None")):(b.parent().hide(),b.val("None")),b.change()})}),k.$("#hotspo_doPtzLink").change(function(a){var b=k.$(a.target),c=b.val(),f=d.EventHandler.PtzLink[0],g=k.$("#hotspo_ptzNum"),h=k.$("#hotspo_QuickFocus");if(a.isTrigger||(f[0]=c),"None"===c)g.parent().hide(),g.numberfield("value",1),h.hide();else if("QuickFocus"===c)k._valueLimit(f[1],0,24),k._valueLimit(f[2],1,300),k.$("#hotspo_quickfzoom").numberfield({min:0,max:24,value:f[1],allowNegative:!1,allowDecimal:!1}),k.$("#hotspo_quickftime").numberfield({min:1,max:300,value:f[2]?f[2]:10,allowNegative:!1,allowDecimal:!1}),g.parent().hide(),g.numberfield("value",1),h.show();else{var i=e[c+"Min"],j=e[c+"Max"];g.numberfield("min",i),g.numberfield("max",j),k._valueLimit(f[1],i,j),g.numberfield("value",f[1]),g.next().text("("+i+"~"+j+")"),g.parent().show(),h.hide()}return!1}),k.$("#hotspo_ptzNum").numberfield({allowDecimal:!1,allowNegative:!1}).blur(function(){return d.EventHandler.PtzLink[0][1]=k.$("#hotspo_ptzNum").numberfield("value"),!1}),k.$("#hotspo_quickfzoom").blur(function(){return d.EventHandler.PtzLink[0][1]=k.$("#hotspo_quickfzoom").numberfield("value"),!1}),k.$("#hotspo_quickftime").blur(function(){return d.EventHandler.PtzLink[0][2]=k.$("#hotspo_quickftime").numberfield("value"),!1}),webApp.ALARM_OUT_NUMBER>1&&o.AlarmOutEnable){for(var a=k.$("#hotspo_alarmchn"),b=0;b<webApp.ALARM_OUT_NUMBER;b++)a.append('<a href="javascript:;" class="ui-channel-item" channle='+b+">"+(b+1)+"</a>");a.click(function(a){return k.$(a.target).toggleClass("ui-channel-item-current"),!1})}k.$("[cfg=FlashLatch],[cfg=RecordLatch],[cfg=AlarmOutLatch]").numberfield({min:10,max:300,allowDecimal:!1,allowNegative:!1})}},render:function(){h.cover("#hotspo_video",function(){var a="Monitor_0"+(m+1);h.SetIVSDrawingEnable(!1),login.chkAuthority(a)?(h.SetVisibleVideoWnd(1,m),h.ConnectRealVideoEx(m,m,h.stream)):(h.SetVisibleVideoWnd(1,m),h.SetVideoWndTip(m,tl("noVideoAuthoity")))}),k._getRefresh(!1)},bind:function(){k.$("#hotspo_HotThreshold, #hotspo_ColdThreshold").numberfield({min:-40,max:1e3,decimalPrecision:1}),k.$("#hotspo_notingle").numberfield({min:0,max:100,allowNegative:!1,allowDecimal:!1}),k.$("#hotspo_HotThreshold").blur(function(){k.$("#hotspo_ColdThreshold").val(k.$("#hotspo_ColdThreshold").val()-0>k.$("#hotspo_HotThreshold").val()-0?k.$("#hotspo_HotThreshold").val()-0:k.$("#hotspo_ColdThreshold").val()-0)}),k.$("#hotspo_ColdThreshold").blur(function(){k.$("#hotspo_HotThreshold").val(k.$("#hotspo_HotThreshold").val()-0<k.$("#hotspo_ColdThreshold").val()-0?k.$("#hotspo_ColdThreshold").val()-0:k.$("#hotspo_HotThreshold").val()-0)}),k.$("#hotspo_iconHigh").click(function(){k.$("#hotspo_colorpanel").css({left:"100px",top:"25px","z-inde":"9999"}),showColorPicker("hotspo_colorpanel","hotspo_HighColor","hotspo_colorHigh",n.HighCTMakerColor)}),k.$("#hotspo_iconLow").click(function(){k.$("#hotspo_colorpanel").css({left:"100px",top:"50px","z-inde":"9999"}),showColorPicker("hotspo_colorpanel","hotspo_LowColor","hotspo_colorLow",n.LowCTMakerColor)}),k.$("#hotspo_hotModeOn, #hotspo_hotModeOff").click(function(){k._displayColorSet()}),k.$("#hotspo_alarmCombin, #hotspo_alarmSing").click(function(){k._linkHCEnabled()}),k.$("#hotspo_fireContent .ui-switch-icon").click(function(){var a=k.$(this).toggleClass("toggle").attr("data-link");new Fx.Slide(a).toggle()}),new Fx.Slide("hotspo_alarmbox").hide()},leave:function(){h.hide()},onSetPeriod:function(){h.hide(),d&&d.EventHandler&&d.EventHandler.TimeSection&&j.open(d.EventHandler.TimeSection).done(function(a){d.EventHandler.TimeSection=a}).always(function(){h.cover("#hotspo_video")})},_valueLimit:function(a,b,c){b>a&&(a=b),a>c&&(a=c)},_linkHCEnabled:function(){k.$("#hotspo_alarmCombin").is(":checked")?(k.$("#hotspo_HotAlarmEnable").prop("checked",!0),k.$("#hotspo_ColdAlarmEnable").prop("checked",!0),k.disabled("#hotspo_HotAlarmEnable, #hotspo_ColdAlarmEnable")):k.disabled("#hotspo_HotAlarmEnable, #hotspo_ColdAlarmEnable",!1)},_displayColorSet:function(){k.$("#hotspo_hotModeOn").is(":checked")?k.$(".colorSet").hide():k.$(".colorSet").show()},_renderElements:function(){k.$("#hotspo_HighColor").val(n.HighCTMakerColor),k.$("#hotspo_LowColor").val(n.LowCTMakerColor);var a=k._getRGBAString(n.HighCTMakerColor);k.$("#hotspo_colorHigh").css("background","rgb("+a+")");var b=k._getRGBAString(n.LowCTMakerColor);k.$("#hotspo_colorLow").css("background","rgb("+b+")"),k.$("#hotspo_HotSpotFollow").prop("checked",n.HotSpotFollow),"Auto"==n.HotSpotColorMode?(k.$("#hotspo_hotModeOn").prop("checked",!0),k.$("#hotspo_hotModeOff").prop("checked",!1)):(k.$("#hotspo_hotModeOn").prop("checked",!1),k.$("#hotspo_hotModeOff").prop("checked",!0)),k._displayColorSet(),webCaps.deviceType.contains("-T")&&k._renderHotSoptElements()},_renderHotSoptElements:function(){k.$("#hotspo_HotAlarmEnable").prop("checked",d.HotAlarmEnable),k.$("#hotspo_ColdAlarmEnable").prop("checked",d.ColdAlarmEnable),k.$("#hotspo_HotThreshold").val(d.HotThreshold),k.$("#hotspo_ColdThreshold").val(d.ColdThreshold),k.$("#hotspo_linkHCFocus").val(d.ColdSpotLinkEnable?"1":"0"),k.$("#hotspo_notingle").val(d.EventHandler.Dejitter),k.$("[cfg]:checkbox").each(function(a,b){var c=k.$(b),e=c.attr("cfg");c.prop("checked",!!d.EventHandler[e]),"PtzLinkEnable"===e&&c.change()}),k.$("[cfg=FlashLatch],[cfg=RecordLatch],[cfg=AlarmOutLatch]").each(function(a,b){var c=k.$(b);c.numberfield("value",d.EventHandler[c.attr("cfg")]||10)}),webApp.ALARM_OUT_NUMBER>1&&o.AlarmOutEnable&&a.isArray(d.EventHandler.AlarmOutChannels)&&(k.$("#hotspo_alarmchn").children().removeClass("ui-channel-item-current"),a.each(d.EventHandler.AlarmOutChannels,function(a,b){k.$("#hotspo_alarmchn a[channle="+b+"]").addClass("ui-channel-item-current")})),k.$("#hotspo_alarmSing").prop("checked","AboveMax"==d.HotAlarmCondition),k.$("#hotspo_alarmCombin").prop("checked","AboveMax"!=d.HotAlarmCondition),k._linkHCEnabled()},_getRGBAString:function(a){var b=[a[0],a[1],a[2]];return b.map(function(a,b){return 3==b&&(a=1),a}).join(",")},_getColorString:function(a){return[0,1,2,3].map(function(b){return a.split(",")[b]-0})},_saveCurRule:function(){if(d.HotAlarmEnable=k.$("#hotspo_HotAlarmEnable").is(":checked"),d.ColdAlarmEnable=k.$("#hotspo_ColdAlarmEnable").is(":checked"),d.HotThreshold=k.$("#hotspo_HotThreshold").val()-0,d.ColdThreshold=k.$("#hotspo_ColdThreshold").val()-0,d.HotSpotLinkEnable="0"!=k.$("#hotspo_linkHCFocus").val()?!1:!0,d.ColdSpotLinkEnable="0"!=k.$("#hotspo_linkHCFocus").val()?!0:!1,d.EventHandler.Dejitter=k.$("#hotspo_notingle").val()-0,k.$("[cfg]:checkbox").each(function(a,b){var c=k.$(b);d.EventHandler[c.attr("cfg")]=c.prop("checked")}),k.$("[cfg=FlashLatch],[cfg=RecordLatch],[cfg=AlarmOutLatch]").each(function(a,b){var c=k.$(b);d.EventHandler[c.attr("cfg")]=c.numberfield("value")}),webApp.ALARM_OUT_NUMBER>1&&o.AlarmOutEnable){var a=[];k.$("#hotspo_alarmchn").children(".ui-channel-item-current").each(function(b,c){a.push(k.$(c).attr("channle")-0)}),d.EventHandler.AlarmOutChannels=a}k.$("#hotspo_alarmSing").is(":checked")?(d.HotAlarmCondition="AboveMax",d.ColdAlarmCondition="BelowMin"):(d.HotAlarmCondition="AboveMaxAndBelowMin",d.ColdAlarmCondition="AboveMaxAndBelowMin")},onSave:function(){return n.HighCTMakerColor=k._getColorString(k.$("#hotspo_HighColor").val()),n.LowCTMakerColor=k._getColorString(k.$("#hotspo_LowColor").val()),n.HotSpotFollow=k.$("#hotspo_HotSpotFollow").is(":checked"),n.HotSpotColorMode=k.$("#hotspo_hotModeOn").is(":checked")?"Auto":"Manual",webCaps.deviceType.contains("-T")?(k._saveCurRule(),f.ConfigManager.setConfig(["HeatImagingThermometry","HotColdSpotWarning"],[n,l]).done(function(){k.$("#hotspo_tip").tip("success",tl("Succeed in saving configure"))}).fail(function(){k.$("#hotspo_tip").tip("error",tl("Saving failure"))})):f.ConfigManager.setConfig("HeatImagingThermometry",n).done(function(){k.$("#hotspo_tip").tip("success",tl("Succeed in saving configure"))}).fail(function(){k.$("#hotspo_tip").tip("error",tl("Saving failure"))}),!1},onRefresh:function(){return k._getRefresh(!0),!1},onDefault:function(){return webCaps.deviceType.contains("-T")?f.ConfigManager.getDefault(["HeatImagingThermometry","HotColdSpotWarning"]).done(function(a){n=a[0].params.table,l=a[1].params.table,d=l[m],k._renderElements(),k.$("#hotspo_tip").tip("success",tl("Defaultsuccess"))}).fail(function(){k.$("#hotspo_tip").tip("error",tl("Defaultfailure"))}):f.ConfigManager.getDefault("HeatImagingThermometry").done(function(){n=table,k._renderElements(),k.$("#hotspo_tip").tip("success",tl("Defaultsuccess"))}).fail(function(){k.$("#hotspo_tip").tip("error",tl("Defaultfailure"))}),!1},_getRefresh:function(a){webCaps.deviceType.contains("-T")?f.ConfigManager.getConfig(["HeatImagingThermometry","HotColdSpotWarning"]).done(function(b){n=b[0].params.table,l=b[1].params.table,d=l[m],k._renderElements(),a&&k.$("#hotspo_tip").tip("success",tl("Operateingsuccess"))}).fail(function(){a&&k.$("#hotspo_tip").tip("error",tl("Operateingfailure"))}):(!a&&k.$("#hotspo_fireContent").hide(),!a&&k.$(".device_T").hide(),f.ConfigManager.getConfig("HeatImagingThermometry").done(function(b){n=b,k._renderElements(),a&&k.$("#hotspo_tip").tip("success",tl("Operateingsuccess"))}).fail(function(){a&&k.$("#hotspo_tip").tip("error",tl("Operateingfailure"))}))}})})}(jQuery);