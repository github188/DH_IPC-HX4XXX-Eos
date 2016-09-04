!function(a){define(function(require,b,c){function d(){var b=this,c=[{id:"video_image",title:"w_Image Adjust Config",iconCls:"ui-video-icon-image",type:"Side",on:function(){h.o.imageOn()},off:function(){h.o.imageOff()}},{id:"video_original",title:"FullRes Show",iconCls:"ui-video-icon-per",type:"Single",on:function(b){-1!==e.stream&&("Original Size"!==webApp.DisplayMode&&f.set("DHVideoWHModeOld",webApp.DisplayMode,{duration:30,path:"/"}),webApp.DisplayMode="Original Size",e.SetShowMode(0),f.set("DHVideoWHMode",webApp.DisplayMode,{duration:30,path:"/"}),h.hideItem("video_whRate"),h.o.modeChange(),a(b.target).attr("title",tl("FullRes Hide")))},off:function(b){h.hideItem("video_whRate",!1),h.toggleCurrent("video_whRate","Original Rate"===f.get("DHVideoWHModeOld")?0:1),a(b.target).attr("title",tl("FullRes Show"))}},{id:"video_whRate",title:"WHRate",iconCls:"ui-video-icon-wh",type:"Sub",subElems:[{t:"Original Rate",handle:function(){if(-1!==e.stream){if(webApp.DisplayMode="Original Rate",f.set("DHVideoWHMode",webApp.DisplayMode,{duration:30,path:"/"}),h.hasItem("video_triggerTrack"))if(h.o.showTrigger){var a=h.o.trackMode();e.SetShowMode(a?2:1)}else e.SetShowMode(1);h.o.modeChange()}}},{t:"adapted window",handle:function(){-1!==e.stream&&(webApp.DisplayMode="Adaptive Window",f.set("DHVideoWHMode",webApp.DisplayMode,{duration:30,path:"/"}),h.hasItem("video_triggerTrack")&&e.SetShowMode(0),h.o.modeChange(webApp.DisplayMode))}}]},{id:"video_fluency",title:"Adjust fluency",iconCls:"ui-video-icon-quality",type:"Sub",subElems:[{t:"w_Real Time",handle:function(){e.SetDelayTime(5)}},{t:"w_Normal",handle:function(){e.SetDelayTime(4)}},{t:"w_Fluency",handle:function(){e.SetDelayTime(1)}}]}];j=a.when(e.CheckFuncSupport(2),ability.get("VideoAnalyse"),ability.get("VideoInputCapsEx"),ability.get("VideoInputCaps"),ability.get("WideViewControl"),ability.get("IVSCaps")).always(function(d,g,j,k,l,m){if(d&&c.splice(2,0,{id:"video_fullScreen",title:"Fullscreen Open",iconCls:"ui-video-icon-full",type:"Normal",click:function(){e.SetFullScreen()}}),g&&g.Support&&c.push({id:"video_ivsRule",title:"w_ivsRule",iconCls:"ui-video-icon-ivs",type:"Sub",subElems:[{t:"enable",handle:function(){e.SetIVSEnable(!0)}},{t:"disable",handle:function(){h.hasItem("video_triggerTrack")?e.ShowRuleState(!1):e.SetIVSEnable(!1)}}]}),c.push({id:"video_ptz",title:"w_PtzLink",iconCls:"ui-video-icon-ptz",type:"Side",on:function(){h.o.ptzOn()},off:function(){h.o.ptzOff()}}),(j&&j.ABFFunction.Support||k&&(k.ElectricFocus||k.SyncFocus))&&login.chkAuthority("VideoInputConfig")&&login.chkAuthority("Monitor_01")&&c.push({id:"video_zoomFocus",title:"w_zoomFocus",iconCls:"ui-video-icon-adjust",type:"Side",on:function(){h.o.zoomOn()},off:function(){h.o.zoomOff()}}),l&&l[0]&&l[0].Support&&c.push({id:"video_wideview",title:"WideView",iconCls:"ui-video-icon-wideview",type:"Single",on:function(a){h.o.wideviewOn(a)},off:function(a){h.o.wideviewOff(a)}}),!webApp.IsSDIntel&&m){var n=m.SupportedScenes||[],o=!1;a.each(n,function(b,d){if(o)return!1;var e=d.SupportedRules||[];a.each(e,function(a,b){return b.TriggerTrack?(c.push({id:"video_triggerTrack",title:"w_TriggerTrack",iconCls:"ui-video-icon-triggerTrack",type:"Side",on:function(){h.o.trackOn()},off:function(){h.o.trackOff()}}),o=!0,!1):void 0})})}k&&k.FishEye&&c.push({id:"video_fisheye",title:"fisheyevideo",iconCls:"ui-video-icon-fish",type:"Side",on:function(){h.o.fishEyeOn()},off:function(){h.o.fishEyeOff()}}),c.push({id:"video_svac",title:"w_svac",iconCls:"ui-video-icon-svc",type:"Sub",subElems:[{t:"baseLevel",handle:function(){e.ChooseFrame(0)}},{t:"enhancementLevel",handle:function(){e.ChooseFrame(1)}}]}),c.push({id:"video_rayright",title:"rayRight",iconCls:"ui-video-icon-ray",type:"Single",on:function(){e.ActiveCrossLocation(!0),h.o.crossLocationOn()},off:function(){e.ActiveCrossLocation(!1),h.o.crossLocationOff()}}),a.each(c,function(c,d){var e=a('<div class="ui-video-iconbar"></div>'),f=a('<a href="javascript:;" class="ui-video-icon" itemtype='+d.type+" id="+d.id+"><i></i></a>");d.title&&f.attr("t","title::"+d.title),d.iconCls&&f.children("i").addClass(d.iconCls),i.append(e.append(f));var g="_init"+d.type;a.isFunction(b[g])&&b[g](d,f)}),i.translation(),h.toggleCurrent("video_fluency",1),h.toggleCurrent("video_svac",0),h.hasItem("video_triggerTrack")&&("Original Size"==webApp.DisplayMode?(f.set("DHVideoWHModeOld","Original Rate"),h.toggleCurrent("video_original")):h.toggleCurrent("video_whRate",0)),g&&g.Support&&h.toggleCurrent("video_ivsRule",0)})}var e=require("../plugin"),f=require("common/common").Cookie,g=(require("../rpc"),{showImage:!0,showPtz:!1,showRayRight:!1,showTrigger:!0,imageOn:a.noop,imageOff:a.noop,ptzOn:a.noop,ptzOff:a.noop,modeChange:a.noop,zoomOn:a.noop,zoomOff:a.noop,wideviewOn:a.noop,wideviewOff:a.noop,trackOn:a.noop,trackOff:a.noop,crossLocationOn:a.noop,crossLocationOff:a.noop,fishEyeOn:a.noop,fishEyeOff:a.noop}),h=null,i=a("<div></div>"),j=null;a.fn.videoBar=function(){var b=arguments[0],c=2<=arguments.length?Array.prototype.slice.call(arguments,1):[],e=this;return this.each(function(){if(!("string"!==a.type(b)||h&&a.isFunction(h[b])))return!1;if("string"===a.type(b)){var f=h[b].apply(a(this),c);if(void 0!==f)return e=f,!1}else"string"===a.type(b)||h||(h=new d)}),e},d.prototype.render=function(b){h.o=a.extend({},g,b),this.append(i),h.hideItem("video_image",h.o.showImage===!1),h.hideItem("video_ptz",h.o.showPtz===!1),h.hideItem("video_rayright",h.o.showRayRight===!1),h.hideItem("video_triggerTrack",h.o.showTrigger===!1)},d.prototype.destroy=function(){h=null,i.empty()},d.prototype.hideItem=function(a,b){j.always(function(){var c=i.find("#"+a);b===!1?c.show().hasClass("current")&&c.next(".ui-video-wrap").show():c.hide().hasClass("current")&&c.next(".ui-video-wrap").hide()})},d.prototype.toggleCurrent=function(a,b){j.always(function(){var c=i.find("#"+a);void 0===b?c.click():c.next(".ui-video-wrap").find(".ui-video-wrap-item:eq("+b+")").click()})},d.prototype.isCurrent=function(a,b){var c=i.find("#"+a);return void 0===b?c.hasClass("current"):c.next(".ui-video-wrap").find(".ui-video-wrap-item:eq("+b+")").hasClass("current")},d.prototype.hasItem=function(a){var b=i.find("#"+a);return b.length},d.prototype._initSide=function(b,c){c.on("click",function(d){return c.hasClass("current")?(c.removeClass("current"),a(b.target).hide(),b.off(d)):(i.find(".ui-video-icon.current[itemtype="+c.attr("itemtype")+"]").click(),c.addClass("current"),a(b.target).show(),b.on(d))})},d.prototype._initNormal=function(a,b){b.on("click",function(b){return a.click(b)})},d.prototype._initSingle=function(a,b){b.on("click",function(c){return b.hasClass("current")?(b.removeClass("current"),a.off(c)):(b.addClass("current"),a.on(c))})},d.prototype._initSub=function(b,c){var d=a('<div class="ui-video-wrap"></div>');a.each(b.subElems,function(b,e){var f=a('<a href="javascript:;" class="ui-video-wrap-item"><i class="ui-video-wrap-icon"></i><label t="'+e.t+'"></label></a>').on("click",function(b){d.find(".ui-video-wrap-item").removeClass("current"),i.find(b.currentTarget).addClass("current"),a.isFunction(e.handle)&&e.handle(),c.trigger("click",[b.isTrigger])});d.append(f)}),c.parent().append(d),c.on("click",function(a,b){return b?!1:(c.hasClass("current")||i.find(".ui-video-icon.current[itemtype="+c.attr("itemtype")+"]").click(),c.toggleClass("current"),void d.toggle())})},c.exports=d})}(jQuery);