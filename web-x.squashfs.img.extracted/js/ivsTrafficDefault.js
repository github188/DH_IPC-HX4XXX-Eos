!function(a){define(function(require,a,b){b.exports=require("jsCore/pageTab")}),define("ivsTrDefault",function(require,b,c){var d,e=require("jsCore/rpc"),f=(require("jsCore/ability"),require("jsCore/pageBase")),g=["IntelliTrackScene","VideoAnalyseGlobal","VideoAnalyseRule","VideoAnalyseModule","TrafficGlobal","VideoAnalyseCalibrate","TrafficSnapMosaic","OSD","TrafficSnapshot","SceneSnapShotWithRule","TrafficRecord","TrafficSnapshotNew"];c.exports=f.extend({init:function(){d=this},onDefault:function(){d.tip("warning",tl("waitConfigEffected")),e.ConfigManager.restore(g).done(function(){d.tip("success",tl("Operateingsuccess")),a("ivs_glogal_tab")&&a("#ivs_glogal_tab").click()}).fail(function(){d.tip("error",tl("Operateingfailure"))})}})})}(jQuery);