define(function(){var a=null,b=[],c=Page.commConfig={init:function(){c.translate(),c.render(),c.bind()},translate:function(){$("comm").set("text",tl("w_ComConf_auth")),$("comm_protocol_title").set("text",tl("w_COM Function")),$("comm_baudrate_title").set("text",tl("w_Baudrate")),$("comm_databit_title").set("text",tl("w_Data Bits")),$("comm_stopbit_title").set("text",tl("w_Stop Bits")),$("ver1").set("text",tl("w_Parity"));var a=$("comm_parity").getElements("option");a[0].setProperty("text",tl("None")),a[1].setProperty("text",tl("Odd")),a[2].setProperty("text",tl("Even")),a[3].setProperty("text",tl("Mark")),a[4].setProperty("text",tl("Vacant")),$("comm_default").set("text",tl("w_DefaultConfig")),$("comm_refresh").set("text",tl("w_Refresh")),$("comm_confirm").set("text",tl("Ok")),$("comm_help").set("title",tl("w_help"))},render:function(){!isEnable("is_show_help")&&$("comm_help").setStyle("display","none"),b=[],rpc.CommPort.getProtocolList().done(function(d){for(var e=0;e<d.length;e++)"Console"==d[e]&&b.push("Console"),"COM_EXALARM"==d[e]&&b.push("COM_EXALARM");rpc.ConfigManager.getConfig("Comm").done(function(b){a=b,c._renderElements(a)})})},bind:function(){$("comm_confirm").addEvent("click",c._bindConfirm),$("comm_refresh").addEvent("click",c._bindRefresh),$("comm_default").addEvent("click",c._bindDefault),$("comm_help").addEvent("cllck",function(){openHelp("commConfig.htm")})},_renderElements:function(a){var c=a[0];$("comm_protocol").empty(),b.each(function(a){$("comm_protocol").options.add(new Option(tl(a),a))});var d=b.indexOf(c.ProtocolName);$("comm_protocol").selectedIndex=0>d?0:d,$("comm_baudrate").value=c.Attribute[0],$("comm_databit").value=c.Attribute[1],$("comm_stopbit").value=c.Attribute[3],$("comm_parity").value=c.Attribute[2]},_bindDefault:function(){rpc.ConfigManager.getDefault("Comm").done(function(a){c._renderElements(a),remarkDisplay("comm_remark",tl("Defaultsuccess"),3e3,0)}).fail(function(){remarkDisplay("comm_remark",tl("Defaultfailure"),3e3,1)})},_bindConfirm:function(){var b=a[0];b.ProtocolName=$("comm_protocol").value,b.Attribute[0]=$("comm_baudrate").value-0,b.Attribute[1]=$("comm_databit").value-0,b.Attribute[2]=$("comm_parity").value,b.Attribute[3]=$("comm_stopbit").value,rpc.ConfigManager.setConfig("Comm",a).done(function(){remarkDisplay("comm_remark",tl("Succeed in saving configure"),3e3,0)}).fail(function(){remarkDisplay("comm_remark",tl("Saving failure"),3e3,1)})},_bindRefresh:function(){rpc.ConfigManager.getConfig("Comm").done(function(b){a=b,c._renderElements(a)}).fail(function(){remarkDisplay("comm_remark",tl("Operateingfailure"),3e3,1)})}}});