!function(){define(function(require,a,b){b.exports=require("jsCore/pageTab")}),define("tmodMode",function(require,a,b){var c=require("jsCore/rpc"),d=require("jsCore/pageBase"),e=(require("common/common"),null),f={},g=0;b.exports=d.extend({init:function(){e=this,g=webApp.CHANNEL_NUMBER>1?1:0,$original=e.$("#tmod_enabled"),$fpga=e.$("#tmod_disabled"),e.render()},render:function(){c.ConfigManager.getConfig("ThermoAlgo").done(function(a){f=a,e._renderElements()})},_renderElements:function(){$original.prop("checked","Flir"==f?!0:!1),$fpga.prop("checked","Flir"==f?!1:!0)},onDefault:function(){c.ConfigManager.getDefault("ThermoAlgo").done(function(a){f=a,e._renderElements(),e.tip("success","Defaultsuccess")}).fail(function(){e.tip("error","Defaultfailure")})},onRefresh:function(){c.ConfigManager.getConfig("ThermoAlgo").done(function(a){f=a,e._renderElements(),e.tip("success","Operateingsuccess")}).fail(function(){e.tip("error","Operateingfailure")})},onSave:function(){f=$original.is(":checked")?"Flir":"Dahua",c.ConfigManager.setConfig("ThermoAlgo",f).done(function(){e.tip("success","Succeed in saving configure")}).fail(function(){e.tip("error","Saving fialure")})}})})}(jQuery);