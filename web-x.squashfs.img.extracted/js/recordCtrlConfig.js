!function(a){define(function(require,a,b){b.exports=require("jsCore/pageTab")}),define("recordCtrl",function(require,b,c){var d,e,f,g,h,i,j,k,l=require("jsCore/rpc"),m=require("jsCore/ability"),n=require("jsCore/pageBase");c.exports=n.extend({init:function(){var a=this;d=a.$("#rc_recordlen").numberfield({max:120,min:1,allowDecimal:!1,allowNegative:!1}),e=a.$("#rc_prerecord").numberfield({max:20,min:0,allowDecimal:!1,allowNegative:!1}),g=a.$("[sel-for=onOverWriteChange]"),f=a.$("select[sel-for=onStreamChange]").empty().append('<option value="0" t="w_MainStream"></option>'),webApp.MaxExtraStream>=1&&f.append('<option value="1" t="w_SecondStream"></option>'),f.translation(),m.get("MaxPreRecordTime").done(function(b){var c=a.$("#rc_prerecord_tip"),d=null!=b?b:5;c.text("(0~"+d+")"),e.numberfield("max",d)}),a.render()},render:function(){this._getConfig()},leave:function(){},destory:function(){},_getConfig:function(a){var b=this;l.ConfigManager.getConfig(["MediaGlobal","Record","RecordMode","StorageGroup"]).done(function(c){h=c[0].params.table,i=c[1].params.table,j=c[2].params.table,k=c[3].params.table,b._renderElement(h,i,j,k),b.disabled("a[btn-for=onSave]",!1),a&&b.tip("success","Operateingsuccess")}).fail(function(){b.disabled("a[btn-for=onSave]",!0),b.tip("error","Operateingfailure")})},_renderElement:function(a,b,c,h){var i=this;d.numberfield("value",a.PacketLength),e.numberfield("value",b[0].PreRecord),f.val(b[0].Stream).change(),g.val(h[0].OverWrite?1:0),i.$("[name=rc_recmode][mode="+c[0].Mode+"]").prop("checked",!0)},onDefault:function(){var a=this;return l.ConfigManager.getDefault(["MediaGlobal","Record","RecordMode","StorageGroup"]).done(function(b){h.PacketLength=b[0].params.table.PacketLength,i[0].PreRecord=b[1].params.table[0].PreRecord,i[0].Stream=b[1].params.table[0].Stream,j[0].Mode=b[2].params.table[0].Mode,k[0].OverWrite=b[3].params.table[0].OverWrite,a._renderElement(h,i,j,k),a.disabled("a[btn-for=onSave]",!1),a.tip("success","Defaultsuccess")}).fail(function(){a.disabled("a[btn-for=onSave]",!0),a.tip("error","Defaultfailure")}),!1},onRefresh:function(){return this._getConfig(!0),!1},onSave:function(){var a=this;return h.PacketLength=d.numberfield("value"),i[0].PreRecord=e.numberfield("value"),i[0].Stream=f.val()-0,k[0].OverWrite=k[1].OverWrite=!!(g.val()-0),j[0].Mode=a.$("[name=rc_recmode]:checked").attr("mode")-0,l.ConfigManager.setConfig(["MediaGlobal","Record","RecordMode","StorageGroup"],[h,i,j,k]).done(function(){a.tip("success","Succeed in saving configure")}).fail(function(){a.tip("error","Saving failure")}),!1},onStreamChange:function(b){var c=this,d=a(b.target);return"0"!==d.val()&&-1!==webApp.ProcessInfo.indexOf("A5S")?c.$("#rc_prerecord").closest("div.ui-form-item").hide():c.$("#rc_prerecord").closest("div.ui-form-item").show(),!1}})})}(jQuery);