!function(a){define(function(require,a,b){b.exports=require("jsCore/pageTab")}),define("backup",function(require,b,c){var d=require("jsCore/rpc"),e=require("jsCore/plugin"),f=require("jsCore/pageBase"),g=["VideoInOptions","VideoColor","Encode","VideoWaterMark","VideoWidget","ChannelTitle","VideoEncodeROI","VideoInPreviewOptions","VideoInWhiteBalance","VideoInExposure","VideoInDenoise","VideoInDayNight","VideoInFocus","VideoInZoom","VideoInSharpness","VideoInColor","VideoInRotate","VideoImageControl","VideoInMode","VideoInDefog","VideoWidgetNumberStat","AudioInDenoise","VideoInBacklight","LDCorrection","OSDSysAbnormal","NetAbort","PPPoE","DDNS","AlarmServer","NTP","Email","WLan","Wireless","SIP","Mobile","T2UServer","SNMP","Bonjour","ARP&Ping","Qos","VideoAnalyseRule","VideoAnalyseGlobal","VideoAnalyseModule","UserGlobal","MotionDetect","BlindDetect","UnFocusDetect","LossDetect","Alarm","NetAlarm","AlarmOut","ExAlarmOut","IPConflict","NetAbort","StorageNotExist","StorageFailure","StorageLowSpace","StorageHealthAlarm","FlashLight","LoginFailureAlarm","ArmMode","AudioDetect","Sound","AudioInputVolume","AudioOutputVolume","TrafficSnapshot.Detector","TrafficSnapshot.OSD.OSDOrder","MovedDetect","SmartEncode","Record","Snap","RecordMode","SnapMode","RecordStoragePoint","NAS","MediaGlobal","Holiday","StorageGlobal","StorageGroup","Comm","Ptz","AutoMaintain","ATM","ATMSniffer","Locales","Lighting","VideoOut"];c.exports=f.extend({init:function(){var a=this;a.render()},render:function(){},onImport:function(){var a=this;return e.ShowSaveOrOpenDlg("openFile","",[{description:"Config Files (*.backup)",extensions:["backup"]}]).done(function(b){a._importConfig(b[0],b[1])}),!1},onExport:function(){var a=this;return e.ShowSaveOrOpenDlg("saveFile","DeviceConfig",[{description:"Config Files (*.backup)",extensions:["backup"]}]).done(function(b){a._exportConfig(b[0],b[1])}),!1},_importConfig:function(b,c){var f=this;f.tip("warning","w_waiting",-1);var g=[],h=[];e.ReadFile(c).done(function(b){try{if(a.each(JSON.parse(b),function(a,b){g.push(a),h.push(b)}),0===g.length)return f.tip("warning","No items which can be imported.");d.ConfigManager.setConfig(g,h).done(function(){f.tip("success","Succeed in saving configure"),f.$("#bu_path").text(c)}).fail(function(){f.tip("error","Saving failure")})}catch(e){f.tip("warning","Bad FileFormat!")}})},_exportConfig:function(b,c){var f=this;if(/[\\\/\:\*\?\"\<\>\|]/g.test(b))return f.tip("error","File Name Invalid!");f.tip("warning","w_waiting",-1);try{d.ConfigManager.getConfig(g).done(function(b){var d={};a.each(b,function(a,b){b.result&&b.params&&b.params.table&&(d[g[a]]=b.params.table)}),e.WriteFile(JSON.stringify(d),"w+",c).done(function(a){-1===a?f.tip("error","w_No Write Right"):(f.tip("success","Operateingsuccess"),f.$("#bu_path").text(c))})}).fail(function(){f.tip("error","Operateingfailure")})}catch(h){f.tip("error","Operateingfailure")}}})})}(jQuery);