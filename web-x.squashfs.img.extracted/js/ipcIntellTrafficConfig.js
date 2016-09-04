!function(a){define(function(require,a,b){b.exports=require("jsCore/pageTab")}),define("traffic_scene",function(require,b,c){function d(a){for(var b=0;b<i.Lanes.length;b++)if(i.Lanes[b].Number===a)return b}var e,f,g,h,i,j,k,l=require("jsCore/rpc"),m=require("jsCore/pageBase"),n=require("jsCore/modules/eventHandler"),o=(require("common/common"),require("jsCore/rpcLogin")),p=require("jsCore/plugin"),q=require("jsCore/modules/timeSection"),r=require("jsCore/ability"),s=require("jsCore/modules/IntellMutex"),t=[tl("None"),tl("w_chuan"),tl("w_e"),tl("w_gans"),tl("w_ganz"),tl("w_gang"),tl("w_guiz"),tl("w_guil"),tl("w_hei"),tl("w_hu"),tl("w_jil"),tl("w_ji"),tl("w_tjin"),tl("w_jin"),tl("w_jing"),tl("w_liao"),tl("w_lu"),tl("w_meng"),tl("w_min"),tl("w_ning"),tl("w_qing"),tl("w_qiong"),tl("w_shan"),tl("w_su"),tl("w_wan"),tl("w_xiang"),tl("w_xin"),tl("w_yu"),tl("w_lyu"),tl("w_yue"),tl("w_yun"),tl("w_zang"),tl("w_zhe")],u=null,v=null;c.exports=m.extend({init:function(){u=this,u.eventHandler=new n("#tr_sc_eHandler",{RecordEnable:!1,RecordLatch:!1,MailEnable:!1}),u.intellMutex=new s("ipcTraffic_mutex"),a.each(t,function(a,b){u.$("#tr_sc_local").append("<option value="+b+">"+b+"</option>")}),u.$("#tr_sc_minWidth,#tr_sc_maxWidth").numberfield({max:1200,min:480,allowDecimal:!1,allowNegative:!1}).blur(function(a){"tr_sc_minWidth"===a.target.id?u.$("#tr_sc_maxWidth").numberfield("min",u.$("#tr_sc_minWidth").numberfield("value")):u.$("#tr_sc_minWidth").numberfield("max",u.$("#tr_sc_maxWidth").numberfield("value"))}),u.$("#tr_sc_table").table({pageable:!1,height:140,columns:[{title:tl("w_lane"),width:"15%",render:function(a){return a._index+1}},{width:"25%",render:function(a){return tl("w_lane")+a.Number}},{action:"draw",icon:"i-draw",handle:function(a){var b=tl("w_lane")+a.Number;return p.SetCurShape(b),p.DeleteShape(b),p.AddShape(0,"TrafficLane",tl("w_lane")+"@"+a.Number,0,0),i.Lanes.splice(d(a.Number),1,{Number:a.Number}),!1},width:"50%"},{action:"delete",icon:"i-clear",handle:function(b){return a.confirm(tl("Ok"),tl("w_sureDelLane"),function(){p.DeleteShape(tl("w_lane")+b.Number),k.splice(d(b.Number),1),this.del(b)}),!1},titleIcon:"i-add",titleAction:function(){return u._onDrawLane()},width:"10%"}],onRowSelect:function(a,b){return v=b.rowIndex,p.SetCurShape(tl("w_lane")+b.data.Number),!1}}),r.get("IVSCaps").done(function(a){var b=s.getIntellMutexTip("Traffic",a||{});b&&(u.intellMutex.add("intell",b),u.intellMutex.setCtrl("intell",!0)),u.intellMutex.add("tvout",'<span t="IntellMutexTVOut">'+tl("IntellMutexTVOut")+"</span>"),u.render()}),u.$("#tr_sc_enable").click(function(){this.checked?u.intellMutex.show():u.intellMutex.hide()}),isEnable("is_show_plate")&&(u.$("#tr_vehicle_wrap").show(),u.$("#tr_flowStat_wrap").show())},render:function(){u.intellMutex.hide(),u.intellMutex.setCtrl("tvout",g_videoInConflict.DSP.hasConflict()),p.cover("#traffic_video",function(a){p.SetRegionNum(0),p.SetModuleMode(2),o.chkAuthority("Monitor_01")&&p.open(),a&&u.onRefresh()}),p.addEvent("OutPutStringInfo",function(a,b){b=JSON.parse(b),"OutPutRuleRect"===a?u._onRegionChange(b):"OutPutGlobalLaneInfo"===a&&u._onLaneChange(b)}),u._getConfig(!1)},leave:function(){p.hide(),p.addEvent("OutPutStringInfo",null),p.SetIVSConfig("",0)},_getConfig:function(a){l.ConfigManager.getConfig(["VideoAnalyseGlobal","VideoAnalyseModule","VideoAnalyseRule","TrafficFlowStat"]).done(function(b){e=b[0].params.table,f=b[1].params.table,g=b[2].params.table,h=b[3].result&&b[3].params.table;for(var c=0;c<e.length;c++)if("Traffic"===e[c].Scene.Type)return i=e[c].Scene.Detail,j=f[c][0],k=g[c],u._render(),void(a&&u.$("#tr_sc_tip").tip("success",tl("Operateingsuccess")));u.$("#tr_sc_tip").tip("error",tl("Operateingfailure"))}).fail(function(){u.$("#tr_sc_tip").tip("error",tl("Operateingfailure"))})},_render:function(){var b={params:{table:[[{Scene:{Detail:{Lanes:i.Lanes,Type:i.Type}}}]]},TrafficLane:!0};p.SetIVSConfig(JSON.stringify(b),0),p.SetCurPtzID(0);var c=j.DetectRegion,d={RuleRect:[[c[0][0],c[0][1]],[c[2][0],c[2][1]]]};p.SetObjectConfig(JSON.stringify(d)),u.eventHandler.set(k[0].EventHandler),u.$("#tr_sc_table").table("dataSource",i.Lanes).table("selectRow",i.Lanes.length-1);var e=j.SizeFilter;u.$("#tr_sc_minWidth").numberfield("value",e.MinSize[0]),u.$("#tr_sc_maxWidth").numberfield("value",e.MaxSize[0]),u.$("#tr_sc_enable").prop("checked",k[0].Enable),u.$("#tr_sc_vehicle").prop("checked","all"===i.ReportMode),u.$("#tr_sc_local").val(a.isArray(i.PlateHints)&&i.PlateHints.length>0?i.PlateHints[0]:tl("None")),h&&u.$("#tr_sc_flowStat").prop("checked",h.Config[0].Enable)},onDrawRegion:function(){return j.DetectRegion?p.SetCurShape("RuleRect"):(p.SetCurShape("save"),p.AddShape(6,"","RuleRect",0,0)),!1},onClearRegion:function(){return j.DetectRegion&&(p.DeleteShape("RuleRect"),j.DetectRegion=null),!1},_onRegionChange:function(a){var b=a.OutPutRuleRect;j.DetectRegion=[[b[0][0],b[0][1]],[b[0][0],b[1][1]],[b[1][0],b[1][1]],[b[1][0],b[0][1]]]},onDrawLine:function(){return 0!==i.Lanes.length&&i.Lanes[v].LeftLine?(p.AddShape(0,"TrafficLane",tl("w_lane")+i.Lanes[v].Number+"_line",-1,0),!1):!!a.alert(tl("w_drawLaneFirst"))},onClearLine:function(){return 0!==i.Lanes.length&&i.Lanes[v].DetectLine?(p.DeleteShape(tl("w_lane")+v+"_line"),i.Lanes[v].DetectLine=null,!1):!1},_onDrawLane:function(){if(i.Lanes.length>=4)return!!u.$("#tr_sc_tip").tip("warning",tl("w_laneNumMax"));var b=0;a.each(i.Lanes,function(a,c){return b!==c.Number?!1:void b++});var c={Number:b};u.$("#tr_sc_table").table("add",c,b).table("selectRow",b),p.AddShape(0,"TrafficLane",tl("w_lane")+"@"+b,0,0);var d={Type:"TrafficTollGate",Name:"TrafficTollGate"+b,Enable:u.$("#tr_sc_enable").prop("checked"),ObjectTypes:["Vehicle","Plate"],PtzPresetId:0,Config:{LaneNumber:b,DetectLine:null,Direction:["Obverse","Reverse"],LastSnapPosition:100},EventHandler:{AlarmOutChannels:[0],AlarmOutEnable:!1,AlarmOutLatch:10,BeepEnable:!1,Dejitter:2,Delay:30,ExAlarmOutChannels:[0],ExAlarmOutEnable:!1,LogEnable:!1,MMSEnable:!1,MailEnable:!0,MatrixChannels:[0],MatrixEnable:!1,MessageEnable:!1,OnVideoMessageEnable:!1,PtzLink:[["None",0],["None",0],["None",0],["None",0],["None",0],["None",0],["None",0],["None",0],["None",0],["None",0],["None",0],["None",0],["None",0],["None",0],["None",0],["None",0]],PtzLinkEnable:!1,RecordChannels:[0],RecordEnable:!1,RecordLatch:10,SnapshotChannels:[0],SnapshotEnable:!0,SnapshotPeriod:0,SnapshotTimes:0,SnapshotTitleEnable:!0,TimeSection:[["1 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59"],["1 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59"],["1 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59"],["1 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59"],["1 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59"],["1 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59"],["1 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59","0 00:00:00-23:59:59"]],TourChannels:[0],TourEnable:!1,TourSplit:"Split1",VoiceEnable:!1}};return k.splice(b,0,d),!1},_onLaneChange:function(b){a.each(i.Lanes,function(a,c){return c.Number===b[0].config.Lanes[0].Number?(i.Lanes.splice(a,1,b[0].config.Lanes[0]),k[a].Config.DetectLine=b[0].config.Lanes[0].DetectLine,!1):void 0})},onSetPeriod:function(){return k[0].EventHandler&&k[0].EventHandler.TimeSection&&(p.hide(),q.open(k[0].EventHandler.TimeSection).done(function(a){k[0].EventHandler.TimeSection=a}).always(function(){p.cover("#traffic_video")})),!1},onRefresh:function(){return u._getConfig(!0),!1},onDefault:function(){return l.ConfigManager.getDefault(["VideoAnalyseGlobal","VideoAnalyseModule","VideoAnalyseRule","TrafficFlowStat"]).done(function(a){e=a[0].params.table,f=a[1].params.table,g=a[2].params.table,h=a[3].result&&a[3].params.table;for(var b=0;b<e.length;b++)if("Traffic"===e[b].Scene.Type)return i=e[b].Scene.Detail,j=f[b][0],k=g[b],u._render(),void u.$("#tr_sc_tip").tip("success",tl("Defaultsuccess"));u.$("#tr_sc_tip").tip("error",tl("Defaultfailure"))}).fail(function(){u.$("#tr_sc_tip").tip("error",tl("Defaultfailure"))}),!1},onSave:function(){if(!j.DetectRegion)return u.$("#tr_sc_tip").tip("warning",tl("w_regionNull"));var b=i.Lanes.length;if(0===b)return u.$("#tr_sc_tip").tip("warning",tl("w_drawLane"));for(var c=0;b>c;c++){if(!i.Lanes[c].LeftLine)return u.$("#tr_sc_tip").tip("warning",tl("w_drawLane")+i.Lanes[c].Number+"!");if(!i.Lanes[c].DetectLine)return u.$("#tr_sc_tip").tip("warning",tl("w_drawDetectLine")+i.Lanes[c].Number+"!")}a.each(k,function(a,b){b.Enable=u.$("#tr_sc_enable").prop("checked"),b.EventHandler=u.eventHandler.get()}),i.ReportMode=u.$("#tr_sc_vehicle").prop("checked")?"all":"plate",u.$("#tr_sc_local").val()===tl("None")?delete i.PlateHints:i.PlateHints=[u.$("#tr_sc_local").val()];var d=j.SizeFilter;d.MinSize[0]=u.$("#tr_sc_minWidth").numberfield("value"),d.MaxSize[0]=u.$("#tr_sc_maxWidth").numberfield("value"),l.ConfigManager.getConfig("TrafficSnapshot.Detector").done(function(b){a.each(b,function(a,b){b.Enable=!1}),a.each(i.Lanes,function(a,c){b[c.Number].Enable=!0}),l.ConfigManager.setConfig("TrafficSnapshot.Detector",b)});var m=["VideoAnalyseGlobal","VideoAnalyseModule","VideoAnalyseRule"],n=[e,f,g];return h&&(h.Config[0].Enable=u.$("#tr_sc_flowStat").prop("checked"),m.push("TrafficFlowStat"),n.push(h)),l.ConfigManager.setConfig(m,n).done(function(){u.$("#tr_sc_tip").tip("success",tl("Succeed in saving configure"))}).fail(function(){u.$("#tr_sc_tip").tip("error",tl("Saving failure"))}),!1}})}),define("traffic_osd",function(require,b,c){var d=require("jsCore/rpc"),e=require("jsCore/pageBase"),f=null,g={"%09":"osd_num","%y%M%d%h%m%s":"osd_time","%12":"osd_color","%61":"osd_type","%46":"osd_logo","%58":"osd_plate"},h={osd_num:"%09",osd_time:"%y%M%d%h%m%s",osd_color:"%12",osd_type:"%61",osd_logo:"%46",osd_plate:"%58"},i=0;c.exports=e.extend({init:function(){f=this,f.$(":checkbox[name^=osd]").click(function(){var b=a(this);b.prop("checked")?f._addItem(b.attr("name")):f._delItem(b.attr("name"))}),f.$(".traffic_OSD_move").each(function(a,b){f[b.id]=new Drag.Move(b.id,{droppables:".traffic_OSD_item",limit:{x:[20,380],y:[10,10]},onStart:function(){this.element.addClass("traffic_OSD_moving")},onDrop:function(a,b){b&&b.hasClass("enable")&&b.getProperty("item-num")!=a.getProperty("move-num")&&b.addClass("moveTag")},onComplete:function(){{var a=f.$(".moveTag"),b=f.$("#"+this.element.id),c=f.$(".traffic_OSD_item[item-num="+b.attr("move-num")+"]");f.$(".traffic_OSD_move[move-num="+a.attr("item-num")+"]")}if(a.length){var d=a.attr("item-num"),e=a.position().left;if(b.attr("move-num")>a.attr("item-num"))for(var g=3;g>=d;g--)g>=b.attr("move-num")||f.$(".traffic_OSD_move[move-num="+g+"]")&&f.$(".traffic_OSD_move[move-num="+g+"]").css("left",e+20+84*(g-d+1)).attr("move-num",g+1);else for(var g=0;d>=g;g++)g<=b.attr("move-num")||f.$(".traffic_OSD_move[move-num="+g+"]")&&f.$(".traffic_OSD_move[move-num="+g+"]").css("left",e+20+84*(g-d-1)).attr("move-num",g-1);b.css("left",a.position().left+20).attr("move-num",a.attr("item-num")),a.removeClass("moveTag")}else b.css("left",c.position().left+20);b.removeClass("traffic_OSD_moving")}})}),isEnable("is_show_plate")&&(f.$("#osd_time_wrap").hide(),f.$("#osd_logo_wrap").show(),f.$("#osd_plate_wrap").show()),f.render()},destory:function(){f.$(".traffic_OSD_move").each(function(a,b){delete f[b.id]})},render:function(){plugin.cover("#traffic_osd_video",function(a){plugin.SetRegionNum(0),plugin.SetModuleMode(2),login.chkAuthority("Monitor_01")&&plugin.open(),a&&f.onRefresh()}),f._getConfig(!1)},leave:function(){plugin.hide()},onRefresh:function(){return f._getConfig(!0),!1},onDefault:function(){return d.ConfigManager.getDefault("TrafficSnapshot.OSD.OSDOrder").done(function(a){f._render(a),f.$(".u-tip").tip("success",tl("Defaultsuccess"))}).fail(function(){f.disabled("[btn-for=onSave]"),f.$(".u-tip").tip("error",tl("Defaultfailure"))}),!1},onSave:function(){var b=[];return f.$(".traffic_OSD_move[move-num]").each(function(c,d){var e=a(d);b[e.attr("move-num")]=h[e.attr("id")]}),d.ConfigManager.setConfig("TrafficSnapshot.OSD.OSDOrder",b.join("")).done(function(){f.$(".u-tip").tip("success",tl("Succeed in saving configure"))}).fail(function(){f.$(".u-tip").tip("error",tl("Saving failure"))}),!1},_getConfig:function(a){d.ConfigManager.getConfig("TrafficSnapshot.OSD.OSDOrder").done(function(b){f._render(b),a&&f.$(".u-tip").tip("success",tl("Operateingsuccess"))}).fail(function(){f.disabled("[btn-for=onSave]"),f.$(".u-tip").tip("error",tl("Operateingfailure"))})},_addItem:function(a){var b=f.$(".traffic_OSD_item:not(.enable):first").addClass("enable").position();f.$("#"+a).attr("move-num",i).show().css("left",b.left+20),i++},_delItem:function(b){var c=f.$("#"+b).hide();f.$(".traffic_OSD_item.enable:last").removeClass("enable"),c.siblings("[move-num]").each(function(b,d){a(d).attr("move-num")>c.attr("move-num")&&a(d).css("left",function(a,b){return parseInt(b)-84}).attr("move-num",function(a,b){return b-1})}),i--,c.removeAttr("move-num","")},_render:function(b){i=0,f.$(".traffic_OSD_move").removeAttr("move-num").hide(),f.$(".traffic_OSD_item").removeClass("enable"),f.$(":checkbox[name]").prop("checked",!1);var c=[];a.each(h,function(a,d){var e=b.indexOf(d);e>-1&&(c[e]=d)}),a.each(c,function(a,b){f.$(":checkbox[name="+g[b]+"]").click()})}})})}(jQuery);