!function(a){define(function(require,a,b){b.exports=require("jsCore/pageTab")}),define("https",function(require,b,c){var d=require("jsCore/rpc"),e=require("jsCore/pageBase"),f=null,g=null,h={},i=null,j=require("common/common"),k=j.Check;c.exports=e.extend({init:function(){f=this,g=a.validator([{element:i.find("[cfg=Country]"),check:[k.require],errorMsg:[tl("w_Need")],events:["blur"]},{element:i.find("[cfg=State]"),check:[k.require],errorMsg:[tl("w_Need")],events:["blur"]},{element:i.find("[cfg=Locatity]"),check:[k.require],errorMsg:[tl("w_Need")],events:["blur"]},{element:i.find("[cfg=Organization]"),check:[k.require],errorMsg:[tl("w_Need")],events:["blur"]},{element:i.find("[cfg=OrganizationUnit]"),check:[k.require],errorMsg:[tl("w_Need")],events:["blur"]},{element:i.find("[cfg=CommonName]"),check:[k.require],errorMsg:[tl("w_Need")],events:["blur"]}]),i=f.$("#https_addDialog").dialog({save:function(){f._onSave()}}).detach().appendTo(document.body),i.find("[cfg=Country], [cfg=State], [cfg=Locatity], [cfg=Organization]").textfield({validReg:/^[\d|a-z|A-Z|\-|_]*$/,validRegRet:!0,errorHandle:"prevent"}),i.find("[cfg=OrganizationUnit]").textfield({validReg:/[^0-9a-zA-Z]/g,validRegRet:!1,errorHandle:"prevent"})},render:function(){d.ConfigManager.getConfig("Https").done(function(a){h=a,f._renderElements()})},destory:function(){i.remove()},_renderElements:function(){f.$("#https_download_cert").attr("src",""),a.each(f.$("[cfg]"),function(a,b){var c=f.$(b).attr("cfg");f.$(b).val(h.ServerCertificate[c])}),g.validate()},openDialog:function(){i.dialog("show")},downloadCert:function(){f.$("#https_download_cert").attr("src",h.RootCertificate.Path)},_onSave:function(){return g.isInvalid()?i.find("#httpDiaTip").tip("warning",g.errors()[0].errorMsg):(a.each(f.$("[cfg]"),function(a,b){var c=f.$(b).attr("cfg");h.ServerCertificate[c]=f.$(b).val()}),i.dialog("close"),void d.ConfigManager.setConfig("Https",h).done(function(){f.tip("success","w_create_success")}).fail(function(){f.tip("error","w_create_failure")}))}})})}(jQuery);