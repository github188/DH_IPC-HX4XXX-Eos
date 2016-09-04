!function(a){define(function(require,a,b){b.exports=require("jsCore/pageTab")}),define("mail",function(require,b,c){function d(a){return StringUtil.byteLength(a,"aaa")<=64}function e(a,b){for(var c,d=0;d<a.length;d++)if(c=a.slice(0,d+1),c.replace(/[^\x00-\xff]/g,"xxx").length>120){h.$(b).val(a.slice(0,d));break}return!0}var f=require("jsCore/rpc"),g=require("jsCore/pageBase"),h=null,i=null,j=-1,k={},l=require("common/common"),m=l.Check;c.exports=g.extend({init:function(){h=this,i=a.validator([{element:h.$("[cfg=Address]"),check:[m.alphaNumLineDot],errorMsg:[tl("w_wrongServerName")],events:["keyup"]},{element:h.$("[cfg=UserName]"),check:[m.noQuotation,m.noQuotation,d,d],errorMsg:[tl("w_noInputMarks"),tl("w_noInputMarks"),tl("w_usernameTooLong"),tl("w_usernameTooLong")],events:["keyup","blur","keyup","blur"]},{element:h.$("[cfg=Password]"),check:[m.noQuotation,m.noQuotation],errorMsg:[tl("w_noInputMarks"),tl("w_noInputMarks")],events:["keyup","blur"]},{element:h.$("[cfg=Title]"),check:[m.noQuotation,m.noQuotation,e],errorMsg:[tl("w_noInputMarks"),tl("w_noInputMarks"),tl("mailTitleTooLong")],events:["keyup","blur","blur"]}]),h.$("[cfg=SendInterv]").numberfield({min:0,max:3600,allowDecimal:!1,allowNegative:!1}),h.$("#mail_HI").numberfield({min:1,max:3600,allowDecimal:!1,allowNegative:!1}),h.$("[cfg=Port]").numberfield({min:1,max:65535,allowDecimal:!1,allowNegative:!1}),h.$("[cfg=Enable]").on("click",function(){h.disabled("#mail_HI",!h.$("[cfg=Enable]").is(":checked"))}),h.disabled("[btn-for=onReceiverAdd]"),h.$("#mail_receiver").on("keyup mouseout",function(){this.value.length>0?(h.$("[btn-for=onReceiverAdd]").removeClass("ui-set-control-icon-disabled"),h.disabled("[btn-for=onReceiverAdd]",!1)):(h.$("[btn-for=onReceiverAdd]").addClass("ui-set-control-icon-disabled"),h.disabled("[btn-for=onReceiverAdd]"))}),h.render()},render:function(){f.ConfigManager.getConfig("Email").done(function(a){k=a,h._renderElements()})},_renderElements:function(){h.$("#mail_receiver").val(""),a.each(h.$("[cfg]"),function(a,b){var c=h.$(b).attr("cfg"),d=h.$(b).attr("type");"checkbox"===d&&("Enable"===c?h.$(b).prop("checked",k.HealthReport[c]):h.$(b).prop("checked",k[c])),h.$(b).val(k[c])}),h.$("#mail_HI").val(k.HealthReport.Interval),h.disabled("#mail_HI",!h.$("[cfg=Enable]").is(":checked")),h.$("#mail_auth").val("None"),k.TlsEnable&&h.$("#mail_auth").val("TLS"),k.SslEnable&&h.$("#mail_auth").val("SSL"),h._renderReceiverList(),i.validate()},onReceiverAdd:function(){return 3==k.Receivers.length?void h.tip("warning",tl("w_emailrevnum")):a.inArray(h.$("#mail_receiver").val(),k.Receivers)>-1?void h.tip("warning",tl("w_sameEmail")):m.email(h.$("#mail_receiver").val())?(k.Receivers.push(h.$("#mail_receiver").val()),h.$("#mail_receiver").val(""),h.$("[btn-for=onReceiverAdd]").addClass("ui-set-control-icon-disabled"),h.disabled("[btn-for=onReceiverAdd]"),void h._renderReceiverList()):h.tip("warning",tl("w_emailreverror"))},onReceiverDel:function(){0>j||j>=k.Receivers.length||(k.Receivers.splice(j,1),h._renderReceiverList())},onTest:function(){f.NetApp.sendTestMail().done(function(){h.tip("success","w_emailtestsuccess")}).fail(function(){h.tip("error","w_emailtestfail")})},_renderReceiverList:function(){var b="",c=k.Receivers.filter(function(a){return""!=a});k.Receivers=c,j=-1,h.$("[btn-for=onReceiverDel]").addClass("ui-set-control-icon-disabled"),h.disabled("[btn-for=onReceiverDel]"),a.each(c,function(a,c){var d=8*c.length>204?8*c.length:204;b+='<a id="mail_receiver_address_'+a+'" class="ui-receiver-address" style="width:'+d+'px">'+c+"&nbsp</a>"}),h.$("#mail_receiver_list").html(b),h.$(".ui-receiver-address:first").length>0&&h.$(".ui-receiver-address:first").addClass("ui-receiver-address-current")&&(j=h.$(".ui-receiver-address:first").attr("id").replace(/[^\d]/g,""))&&h.$("[btn-for=onReceiverDel]").removeClass("ui-set-control-icon-disabled")&&h.disabled("[btn-for=onReceiverDel]",!1),h.$(".ui-receiver-address").on("click",function(){h.$(".ui-receiver-address").removeClass("ui-receiver-address-current"),j=this.id.replace(/[^\d]/g,""),h.$(this).addClass("ui-receiver-address-current"),h.$("[btn-for=onReceiverDel]").removeClass("ui-set-control-icon-disabled"),h.disabled("[btn-for=onReceiverDel]",!1)})},onDefault:function(){f.ConfigManager.getDefault("Email").done(function(a){k=a,h._renderElements(),h.tip("success","Defaultsuccess")}).fail(function(){h.tip("error","Defaultfailure")})},onRefresh:function(){f.ConfigManager.getConfig("Email").done(function(a){k=a,h._renderElements(),h.tip("success","Operateingsuccess")}).fail(function(){h.tip("error","Operateingfailure")})},onSave:function(){if(i.isInvalid())return h.tip("warning",i.errors()[0].errorMsg);if(""!=a("[cfg=SendAddress]").val()&&"none"!=a("[cfg=SendAddress]").val()&&!m.email(h.$("[cfg=SendAddress]").val()))return h.tip("warning","w_emailsendererror");a.each(h.$("[cfg]"),function(a,b){var c=h.$(b).attr("cfg"),d=h.$(b).attr("type");"checkbox"===d?"Enable"===c?k.HealthReport[c]=h.$(b).is(":checked"):k[c]=h.$(b).is(":checked"):"Port"===c||"SendInterv"===c?k[c]=h.$(b).val()-0:("text"===d||"password"===d)&&(k[c]=h.$(b).val())}),k.HealthReport.Interval=h.$("#mail_HI").val()-0;var b=h.$("#mail_auth").val();"SSL"==b?(k.SslEnable=!0,k.TlsEnable=!1):"TLS"==b?(k.SslEnable=!1,k.TlsEnable=!0):"None"==b&&(k.SslEnable=!1,k.TlsEnable=!1),f.ConfigManager.setConfig("Email",k).done(function(){h.tip("success","Succeed in saving configure")}).fail(function(){h.tip("error","Saving failure")})}})})}(jQuery);