!function(a){function b(b){b.find("[section]").timefield(),a.each(b.find("label[cfg^=the_]"),function(c,d){a(d).on("click",function(){b.find("input[cfg="+a(this).attr("cfg")+"]").trigger("click")})}),b.find("input[cfg=the_week_all]").on("click",function(){var c=a(this).prop("checked"),d=b.find("input[cfg^=the_day]").filter(function(){return!a(this).prop("disabled")});a.each(d,function(){a(this).prop("checked",c)})}),b.find("input[cfg^=the_day]").on("click",function(){for(var a=!0,c=0;8>c;c++)if(!b.find("input[cfg=the_day_"+c+"]").prop("checked")){a=!1;break}b.find("input[cfg=the_week_all]").prop("checked",a)}),b.find(":text").keyup(function(c){var d=a(c.target),e=d.closest("div[section]").attr("section")-0,f=d.closest("div[section]").attr("ii")-0,g=d.data("index");if(39===c.which)return 0===f&&2===g?b.find("div[section="+e+"][ii=1]").children(":text:eq(0)").select():1===f&&2===g&&5>e?b.find("div[section="+(e+1)+"][ii=0]").children(":text:eq(0)").select():(5!==e||1!==f||2!==g)&&b.find("div[section="+e+"][ii="+f+"]").children(":text:eq("+(g+1)+")").select(),!1;if(37===c.which)return 1===f&&0===g?b.find("div[section="+e+"][ii=0]").children(":text:eq(2)").select():0===f&&0===g&&e>0?b.find("div[section="+(e-1)+"][ii=1]").children(":text:eq(2)").select():(0!==e||0!==f||0!==g)&&b.find("div[section="+e+"][ii="+f+"]").children(":text:eq("+(g-1)+")").select(),!1;if(38===c.which)return e>0&&b.find("div[section="+(e-1)+"][ii="+f+"]").children(":text:eq("+g+")").select(),!1;if(40===c.which)return 5>e&&b.find("div[section="+(e+1)+"][ii="+f+"]").children(":text:eq("+g+")").select(),!1;if(2===d.val().length){if(0===f&&2===g)return b.find("div[section="+e+"][ii=1]").children(":text:eq(0)").select(),!1;if(1===f&&2===g&&5>e)return b.find("div[section="+(e+1)+"][ii=0]").children(":text:eq(0)").select(),!1}}).blur(function(c){var d=a(c.target),e=d.closest("div[section]"),f=e.attr("section")-0,g=e.attr("ii")-0,h=[];return h[g]=e.timefield("value").split(":"),h[(g+1)%2]=b.find("div[section="+f+"][ii="+(g+1)%2+"]").timefield("value").split(":"),3600*h[0][0]+60*h[0][1]+1*h[0][2]>3600*h[1][0]+60*h[1][1]+1*h[1][2]&&b.find("div[section="+f+"][ii=1]").timefield("value",h[0].join(":")),!1})}function c(b,c,d){d.find(".u-dialog-content").find("input[type=checkbox]").prop({checked:!1,disabled:!1}),d.find("input[cfg=the_day_"+c+"]").prop({checked:!0,disabled:!0}),d.find("label[cfg^=the_day]").removeClass("fn-color-red"),d.find("label[cfg=the_day_"+c+"]").addClass("fn-color-red"),a.each(b[c],function(b,c){var e=c.match(/([\d]+) (\d\d):(\d\d):(\d\d)-(\d\d):(\d\d):(\d\d)/),f=d.find("[section="+b+"]"),g=[];g[0]=e[2]+":"+e[3]+":"+e[4],g[1]=e[5]+":"+e[6]+":"+e[7];var h="the_period_"+b+"_";a(h+"mode").checked=!!(1&e[1]),f.each(function(b,c){a(c).timefield("value",g[b])}),f.parent().find("[chktype=general]").prop("checked",!!(1&e[1]))})}function d(b,c){var d=[];a.each(b.find("input[cfg^=the_day]"),function(b){a(this).prop("checked")&&d.push(b)});for(var e=0;e<d.length;e++)for(var f=0;6>f;f++){var g,h,i=b.find("[section="+f+"]"),j=0;i.parent().find("[chktype=general]").prop("checked")&&(j|=1),g=i.eq(0).timefield("value"),h=i.eq(1).timefield("value"),c[d[e]][f]=j+" "+g+"-"+h}return c}define(function(require,a,b){b.exports=require("jsCore/pageTab")}),define("the_config",function(require,e,f){var g,h=require("jsCore/rpc"),i=require("jsCore/pageBase"),j=null,k=null,l=0;require("widget/js/dui.schedule"),f.exports=i.extend({init:function(){k=this,k.$("#t_c_timesec").addClass("ui-timeplan").append(a("#the_schedule").html()).find(".schedule_canvas").attr("id","t_c_canvas"),k.$("#t_c_canvas").schedule({holiday:!1,type:["general"]}),k.$(".ui-timeplan-button a").on("click",function(){k.onSetup(a(this).attr("day"))}),a.each(k.$("label[cfg]"),function(b,c){a(c).on("click",function(){k.$("input[cfg="+a(this).attr("cfg")+"]").trigger("click")})}),k.$("#t_c_dialog").append(a("#the_dialog").html()).find(".u-dialog").attr("id","dialog1"),g=k.$("#dialog1").dialog({confirm:function(a,b){j.TimeSchedule=d(g,j.TimeSchedule),b.ui.close(),k._renderElements()}}).detach().appendTo(document.body),b(g),k.render()},render:function(){k._getConfig(!1)},destory:function(){g.remove()},_getConfig:function(a){h.ConfigManager.getConfig("QuickFocusSchedule").done(function(b){j=b,k._renderElements(),a&&k.tip("success","Operateingsuccess"),k.disabled("[btn-for=onConfirm]",!1)}).fail(function(){k.tip("error","Operateingfailure"),k.disabled("[btn-for=onConfirm]",!0)})},_renderElements:function(){k.$("#t_c_canvas").schedule("render",j.TimeSchedule)},onSetup:function(a){c(j.TimeSchedule,parseInt(a),g),g.dialog("show")},onDefault:function(){h.ConfigManager.getDefault("QuickFocusSchedule").done(function(a){j=a,k._renderElements(j),k.tip("success","Defaultsuccess")}).fail(function(){k.tip("error","Defaultfailure")})},onRefresh:function(){k._getConfig(!0)},onConfirm:function(){h.ConfigManager.getConfig("QuickFocusSchedule").done(function(a){a=j,h.ConfigManager.setConfig("QuickFocusSchedule",a).done(function(){k.tip("success","Succeed in saving configure")}).fail(function(){k.tip("success","Succeed in saving configure")})})},onSelChannel:function(a){l=a.target.value-0,k._renderElements(j)}})})}(jQuery);