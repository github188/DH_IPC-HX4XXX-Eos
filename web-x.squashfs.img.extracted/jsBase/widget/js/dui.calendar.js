!function(a,b){var c='<div class="u-calendar-nav">                    <h1 wgt="Calendar"></h1>                    <select data-change="month">                        <option value="0" wgt="Jan"></option>                        <option value="1" wgt="Feb"></option>                        <option value="2" wgt="Mar"></option>                        <option value="3" wgt="Apr"></option>                        <option value="4" wgt="May"></option>                        <option value="5" wgt="Jun"></option>                        <option value="6" wgt="Jul"></option>                        <option value="7" wgt="Aug"></option>                        <option value="8" wgt="Sep"></option>                        <option value="9" wgt="Oct"></option>                        <option value="10" wgt="Nov"></option>                        <option value="11" wgt="Dec"></option>                    </select>                    <a data-action="prev" class="u-nav-left">                        <i class="i-calendar-left"></i>                    </a>                    <input data-change="year"></input>                    <a data-action="next" class="u-nav-right">                        <i class="i-calendar-right"></i>                    </a>                </div>                <table>                    <thead>                        <tr><th wgt="Sun"></th><th wgt="Mon"></th><th wgt="Tue"></th><th wgt="Wen"></th><th wgt="Thu"></th><th wgt="Fri"></th><th wgt="Sat"></th></tr>                    </thead>                    <tbody></tbody>                </table>';a.widget("dui.calendar",{version:"1.0.1",widgetName:"calendar",widgetEventPrefix:"calendar",options:{date:null,maxYear:2037,minYear:2e3,disableYear:!1,selectManyDays:!1,isShowToday:!0},_create:function(){var a=this.options;null===a.date&&(a.date=new Date);var b=a.date;this.year=this._justYear(b.getFullYear()),this.month=b.getMonth(),this.marks=[],this.tbody=this.element.append(c).trans_wgt().addClass("u-calendar").find("tbody"),a.disableYear&&this.element.find(".u-calendar-nav a,.u-calendar-nav input").remove(),this.element.find("[data-change=year]").numberfield({min:a.minYear,max:a.maxYear,allowDecimal:!1,allowNegative:!1}),this._refresh(),a.isShowToday&&this._selectDay(b.getDate(),!1,!1),this._setupEvents()},_setupEvents:function(){this._on(this._handleEvents)},_refresh:function(a){if(a){var b=a.getFullYear(),c=a.getMonth();this.monthDays=new Date(b,c+1,0).getDate(),this._renderCalendar(b,c,!0)}else{var b=this.year,c=this.month;this._renderCalendar(b,c)}this._renderCalendarNav(b,c),a||this._trigger("change",null,{ui:this,year:this.year,month:this.month+1,monthDays:this.monthDays})},_renderCalendarNav:function(a,b){this.element.find("[data-change=month]").val(b),this.element.find("[data-change=year]").val(a)},_renderCalendar:function(a,b,c){var d=new Date(a,b),e=d.getDay(),f=d.getDate();this.monthDays=new Date(a,b+1,0).getDate(),this.tbody.empty();for(var g=0,h=[];42>g;){if(g%7===0&&h.push("<tr>"),e>g||f>this.monthDays)h.push("<td></td>");else{var i="u-calendar-day ",j=this._getMarkDate(a,b,f),k=this.selected,l=k&&k.year===a&&k.month===b&&k.day===f,m=g%7===0||g%7===6;c&&(l=!1),i+=j?l?"u-calendar-select "+j.className:j.className:l?"u-calendar-select":"",h.push("<td "+(m?'class="u-calendar-weekend"':"")+'><a class="'+i+'" data-value="'+f+'">'+f++ +"</a></td>")}g%7===6&&h.push("</tr>"),g++}this.tbody.append(h.join(""))},select:function(a){if(a===b)return this._selectDay(this.day,!0);var c=this._paserDate(a);(this.year!==c.year||this.month!==c.month)&&(this.year=this._justYear(c.year),this.month=c.month,this._refresh()),c.day&&this._selectDay(c.day,!0)},_justYear:function(a){return Math.max(this.options.minYear,Math.min(a,this.options.maxYear))},markByBit:function(b,c){var d=new Date(this.year,this.month+1,0).getDate();b="string"===a.type(b)?b:(b>>>0).toString(2),this.clearmark();for(var e=b.length-2,f=1;d>=f;e--,f++)b.charAt(e)-0&&this.mark(new Date(this.year,this.month,f),c)},mark:function(a,b){var a=this._paserDate(a);a.day&&(a.className=b||"u-calendar-mark",this.marks.push(a),this._renderCalendar(this.year,this.month))},clearmark:function(){this.marks.length=0,this._renderCalendar(this.year,this.month)},getDay:function(){return{year:this.year,month:this.month+1,day:this.day,monthDays:this.monthDays}},refresh:function(a){this._refresh(a)},disabled:function(a){return arguments.length?(a?this.disable():this.enable(),void this.element.find("input,select").prop("disabled",a)):this.options.disabled},_getMarkDate:function(a,b,c){for(var d=this.marks.length;d--;){var e=this.marks[d];if(e.year===a&&e.month===b&&e.day===c)return e}return null},_paserDate:function(c){var d,e,f,g,h;if("date"===a.type(c))f=c.getFullYear(),g=c.getMonth(),h=c.getDate();else if(d=String(c).split(/\/|\s|-|\\/),e=d.length,e>=3?(f=parseInt(d[0]),g=parseInt(d[1])-1,h=parseInt(d[2])):2===e?(f=parseInt(d[0]),g=parseInt(d[1])-1):h=parseInt(d[0]),f!==b&&(isNaN(f)||0>=f)||g!==b&&(isNaN(g)||g>11||0>g)||h!==b&&(isNaN(h)||0>=h||h>new Date(f,g+1,0).getDate()))throw new Error("you input the wrong date. "+c+" is illegal date.");return{year:f||this.year,month:g||this.month,day:h}},_selectDay:function(a,b,c){var d=this.options,e=0,f="u-calendar-select",g=this.element.find("[data-value="+a+"]");0!==g.length&&(d.selectManyDays?g.hasClass(f)?b?e=1:(g.removeClass(f),e=0):(g.addClass(f),e=1):(this.element.find("."+f).removeClass(f),g.addClass(f)),this.day=parseInt(a),this.selected={year:this.year,month:this.month,day:this.day},c!==!1&&this._trigger("select",null,{ui:this,year:this.year,month:this.month+1,day:this.day,monthDays:this.monthDays,isSelected:e}))},_handleEvents:{"click [data-action]":function(b){var c=a(b.currentTarget).attr("data-action");"prev"===c&&this.year>this.options.minYear?this.year--:"next"===c&&this.year<this.options.maxYear&&this.year++,this._refresh()},"change [data-change]":function(b){var c=a(b.currentTarget).attr("data-change"),d=a(b.currentTarget).val();"month"===c?this.month=parseInt(d):"year"===c&&(this.year=this._justYear(parseInt(d))),this._refresh()},"click [data-value]":function(b){var c=this.options,d=a(b.currentTarget),e=d.attr("data-value");c.selectManyDays?this._selectDay(e):(e!=this.day||this.selected.month!=this.month||this.selected.year!=this.year)&&this._selectDay(e)}}})}(jQuery);