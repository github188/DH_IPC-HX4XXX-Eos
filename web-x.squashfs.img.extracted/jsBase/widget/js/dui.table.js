!function(a,b){var c=["<div>",'<div class="u-table-head"><table></table></div>','<div class="u-table-main"><table></table></div>',"</div>"];a.widget("dui.table",{version:"1.0.1",widgetName:"table",widgetEventPrefix:"table",options:{editColable:!1,pageable:!1,hideheader:!1,pageSize:9,currentPage:1,curSortCol:"",curSortDirec:"asc",height:"auto",columns:[],dataSource:[],filter:{},reSelectRow:!1},_create:function(){this.element.toggleClass("u-table",!0),this.table=a(c.join("")),this.header=this.table.find(".u-table-head"),this.options.hideheader&&this.header.hide(),this.bodyWrap=this.table.find(".u-table-main"),this.selectedRow=-1,this._renderHeader(),this.options.editColable&&this._renderColumnsSelect(),this.options.dataSource=a.extend(!0,[],this.options.dataSource),this._renderBody(),this.primaryKey||(this.primaryKey="__id",this._generatePk()),this._dataView(),this.element.empty().append(this.table),this.options.pageable&&(this.element.append('<div class="u-table-foot"></div>'),this.footer=this.element.find(".u-table-foot"),this._renderFooter()),this._setupEvents(),this._refreshBody(),this._setWidth(),this.setHeight()},_setupEvents:function(){var b=this;this._on(this.table,this._handleEvents),this.bodyWrap.on("scroll",function(){b.header.find("table").css("margin-left","-"+a(this).scrollLeft()+"px")})},_renderHeader:function(){var a,b,c=this.options.columns,d="<thead><tr>",e="<colgroup>";for(a=0;a<c.length;a++)b=c[a],b.primaryKey&&(this.primaryKey=b.fields),b.hide||(e+='<col style="width:'+(b.width||"")+'"></col>',b.sortable?d+="<th data-col="+a+' data-action="sortCol" style="cursor:pointer;">'+(b.title||""):(d+="<th data-col="+a+">",d+=b.check?'<input type="checkbox" data-action="checkAll">':b.titleIcon?'<i data-action="titleAction" class="'+b.titleIcon+'" style="cursor:pointer;"></i>':b.title||""),d+="</th>");d+="</tr></thead>",e+="</colgroup>",this.header.find("table").empty().append(e+d),this.colgroup=e},_renderColumnsSelect:function(){var a=this.options.columns;if(0!==a.length){var b,c,d=['<div class="editor">','<a href="#" class="drop" data-action="dropdown"></a>','<div class="list dropdown-menu"><ul>'];for(b=0;b<a.length;b++)c=a[b],c.title&&d.push('<li><label><input type="checkbox" data-column="'+b+'" '+(c.hide?"":"checked")+"/> "+c.title+"</label></li>");d.push("</ul></div></div>"),this.header.append(d.join(""))}},_renderBody:function(){var b=this.bodyWrap.find("table");b.empty().append(this.colgroup),this.body=a("<tbody></tbody>").appendTo(b)},_setWidth:function(){for(var a,b=this.options.columns,c=b.length,d=0;c--;)a=b[c],!a.hide&&a.width&&-1===String(a.width).indexOf("%")&&(d+=parseInt(a.width));if(0!==d){var e=this.bodyWrap[0].offsetWidth-this.bodyWrap[0].clientWidth;d=Math.max(this.table.width(),d),this.bodyWrap.find("table").width(d-e),this.header.find("table").width(d-e),this.table.eq(0).css({position:"relative"})}},setHeight:function(c){a.isNumeric(c)&&(this.options.height=c);var d=this.options.height,e=0,f=0,g=0,h=this.bodyWrap[0].offsetHeight-this.bodyWrap[0].clientHeight;"auto"===d||d===b?g=this.bodyWrap.find("table").height()+h:(e=this.header.outerHeight()||20,this.footer&&(f=this.footer.outerHeight()),g=d-e-f),this.bodyWrap.height(g)},_generatePk:function(){for(var a=0,b=this.options.dataSource,c=b.length,d=this.primaryKey;c>a;)b[a][d]=a++},_refreshBody:function(b){var c,d,e=this,f=e.dataView,g=e.options.columns,h=e.primaryKey,i=b?e.body:e.body.empty(),j=b||e._getCurrentPageRange();if(!(b&&this.options.pageable&&i.children("tr").length>=this.options.pageSize)){for(c=j.start;c<j.end;c++){d=f[c][h];var k=a('<tr class="'+(c%2?"odd":"even")+'"></tr>').attr("data-index",d);e.selectedRow===d&&k.addClass("current"),a.each(g,function(b,d){if(!d.hide){var g="",h=a("<td></td>").attr("data-col",b);a.isFunction(d.render)?(g=d.render.call(e,a.extend(f[c],{_index:c})),a.isDeferred(g)&&(g.done(function(a){h.append(a)}),g="")):d.fields?(g=a.chk(f[c][d.fields])?f[c][d.fields].toString():"",d.valueMap?g=d.valueMap[g]:d.template&&(g=a.template(d.template,f[c])),d.editor&&h.attr("data-editable",d.fields)):d.action?g=d.icon?"<i data-action="+d.action+' class="'+d.icon+'"></i>':"<a data-action="+d.action+' class="u-button">'+d.title+"</a>":d.check&&(g='<input type="checkbox" data-action="checkItem" '+(f[c][d.check]?"checked":"")+" >"),h.append(g).appendTo(k)}}),k.appendTo(i)}var l=e.bodyWrap.find(':checkbox[data-action="checkItem"]');e.header.find(":checkbox[data-action=checkAll]").prop("checked",l.length?!l.filter(":not(:checked)").length:!1),i.find("[widget]").each(function(){var b=a(this).attr("widget");a(this)[b]()})}},_renderFooter:function(){var a=this,b='<div class="u-pagination clearfix"><a href="#" data-action="first" class="i-first"></a><a href="#" data-action="prev" class="i-prev"></a><span class="u-page-info"></span><a href="#" data-action="next" class="i-next"></a><a href="#" data-action="last" class="i-last"></a><input type="text" class="u-input"/><a href="#" data-action="goto" class="i-go"></a></div>';this.footer.append(b),this.pagination=this.footer.find(".u-pagination").pagination({currentPage:this.options.currentPage,pageSize:this.options.pageSize,total:this.dataView.length,change:function(b,c){a.options.currentPage=c.currentPage,a._refreshBody()}})},selectRow:function(b,c){var d="current",e=this,f=this.options.dataSource[b],g=arguments.length>1;return-1===b?(e.body.find("."+d).removeClass(d),void(e.selectedRow=-1)):void((f||g)&&a.each(this.dataView,function(a,h){if(g?h[b]==c:h[e.primaryKey]===b){e.selectedRow=h[e.primaryKey];var i=e._getCurrentPageRange();return a>=i.start&&a<i.end?(e.body.find("."+d).removeClass(d),e.body.find("[data-index="+h[e.primaryKey]+"]").addClass(d)):e.go(Math.floor(a/e.options.pageSize)+1),e._trigger("onRowSelect",null,{ui:e,data:f,rowIndex:b}),!1}}))},getSelectedData:function(){return this.options.dataSource[this.selectedRow]||null},getSelectedRow:function(){return this.selectedRow},getMultiChecked:function(b){var c=this.dataView,d=[];return a.each(c,function(a,c){c[b]&&d.push(c)}),d},add:function(b,c){var d=this.options.dataSource,e=null,f=[].splice;a.isNumeric(c)?c>=0?(d.splice(c,0,b),this.selectedRow>=c&&(this.selectedRow+=1),this._generatePk(),this._dataView(),this._refreshBody()):(d.push(b),this._generatePk(),e=this._filterData(d[d.length-1]),f.apply(this.dataView,[this.dataView.length,0].concat(e)),e.length&&this._refreshBody({start:this.dataView.length-1,end:this.dataView.length})):(d.unshift(b),this.selectedRow+=1,this._generatePk(),this._dataView(),this._refreshBody()),this._setPagination(this.dataView.length)},modify:function(c,d){var e=this.options;if(d==b?d=this.selectedRow:(d=e.pageable?(e.currentPage-1)*e.pageSize+d:d,d=this.dataView[d][this.primaryKey]),-1!=d){var f=e.dataSource;if(d>=0&&d<f.length){var g=f[d];a.extend(g,c),this._dataView(),this._refreshBody()}}},del:function(a){var c=a[this.primaryKey],d=this.options.dataSource;c===b&&(c=this._findIndex(a)),d[c]&&(d.splice(c,1),0===d.length?(this.selectedRow=-1,this._trigger("onEmpty")):this.selectedRow>=c&&this.selectRow(0===this.selectedRow?0:this.selectedRow-1),this._generatePk(),this._dataView(),this._refreshBody(),this._setPagination(this.dataView.length))},refresh:function(){this._refreshBody()},filter:function(a){return arguments.length?(this.options.filter=a||{},this.options.currentPage=1,this.selectedRow=-1,this._dataView(),this._setPagination(this.dataView.length),this._refreshBody(),this):this.options.filter},dataSource:function(a){return 0===arguments.length?this.options.dataSource:(this.options.dataSource=a,this.selectedRow=-1,this._generatePk(),this._dataView(),this._refreshBody(),this._setPagination(this.dataView.length),void 0)},go:function(a){this.pagination.pagination("go",a)},_setPagination:function(a){this.pagination&&this.pagination.pagination("total",a)},_findIndex:function(a){for(var b=0,c=this.options.dataSource,d=c.length;d>b;){var e,f=!0;for(e in c[b])if(c[b].hasOwnProperty(e)&&a[e]!==c[b][e]){f=!1;break}if(f)return b;b++}return-1},_getCurrentPageRange:function(){var a=this.options,b=this.dataView||[],c=a.currentPage,d=a.pageSize,e=a.pageable,f={start:0,end:b.length};return e&&(f.start=(c-1)*d,f.end=Math.min(c*d,b.length)),f},_getActionHandle:function(a){for(var b=this.options.columns,c=b.length;c--;)if(b[c].action===a)return b[c].handle;return null},getRowElement:function(a){return this.bodyWrap.find("table tr").eq(a)},_getColByFields:function(a){for(var b=this.options.columns,c=b.length;c--;)if(b[c].fields===a)return b[c];return null},_dataView:function(){this.dataView=[],this.dataView=this._filterData(this.options.dataSource)},_sortDataSourceByCol:function(a){var b;b="asc"==this.options.curSortDirec?[1,-1]:[-1,1],this.dataView.sort(function(c,d){var e="undefined"!=typeof pinyin?pinyin.getCamelChars(c[a]):c[a],f="undefined"!=typeof pinyin?pinyin.getCamelChars(d[a]):d[a];return e==f?c._index-d._index>0?1:-1:e>f?b[0]:b[1]})},_filterData:function(b){var c=this.options.filter||{},d="",e="object"===a.type(b)?a.makeArray(b):b,f=[];if(a.isEmptyObject(c))f=a.extend([],e);else{var g=!0;a.each(e,function(b,e){a.each(c,function(b,c){switch(d=a.type(c)){case"regexp":g=c.test(e[b]);break;case"function":g=c(e[b],e);break;default:g=e[b]==c}return g}),g&&f.push(e)})}return f},_handleEvents:{"click [data-action]":function(b){var c=a(b.currentTarget),d=c.closest("tr").attr("data-index"),e=this.options.dataSource[d],f=c.attr("data-action"),g=this._getActionHandle(f);return a.isFunction(g)?g.call(this,e,b):void 0},"click tbody tr":function(b){var c=a(b.currentTarget),d=c.attr("data-index")-0;(this.options.reSelectRow||d!==this.selectedRow)&&this.selectRow(d)},"mouseleave tbody tr":function(b){var c=a(b.currentTarget),d=c.attr("data-index"),e=this.options.dataSource[d];c.removeClass(this.options.hoverClass),this._trigger("onRowLeave",b,{ui:this,data:e,rowIndex:d})},"mouseenter tbody tr":function(b){var c=a(b.currentTarget),d=c.attr("data-index"),e=this.options.dataSource[d];c.addClass(this.options.hoverClass),this._trigger("onRowEnter",b,{ui:this,data:e,rowIndex:d})},"dblclick tbody tr":function(b){var c=a(b.currentTarget),d=c.attr("data-index"),e=this.options.dataSource[d];this._trigger("onRowDblClick",b,{ui:this,data:e,rowIndex:d})},"click [data-action=dropdown]":function(b){var c=a(b.currentTarget).next(".dropdown-menu");return c.hasClass("open")?c.removeClass("open"):(c.addClass("open"),a(document).on("click.tablepoup",function(b){0===a(b.target).closest(".dropdown-menu").length&&(c.removeClass("open"),a(document).off("click.tablepoup"))})),!1},"click [data-action=checkAll]":function(b){var c=a(b.currentTarget),d=c.prop("checked"),e=this;this.bodyWrap.find(":checkbox[data-action=checkItem]").prop("checked",d).each(function(b,c){var f=a(c),g=f.closest("tr").attr("data-index"),h=f.closest("td").attr("data-col");e.options.dataSource[g][e.options.columns[h].check]=d});var f=c.closest("th").attr("data-col"),g=this.options.columns[f],h=g.checkAll;return a.isFunction(h)?h.call(this,b,g):void 0},"click [data-action=titleAction]":function(b){var c=a(b.target),d=c.closest("th").attr("data-col")-0,e=this.options.columns[d],f=e.titleAction;return a.isFunction(f)?f.call(this,b,e):void 0},"click [data-action=sortCol]":function(b){var c=a(b.target),d=c.closest("th").attr("data-col")-0,e=this.options.columns[d];this.options.curSortCol==e.fields&&(this.options.curSortDirec="asc"==this.options.curSortDirec?"desc":"asc"),a.isFunction(e.sort)?e.sort(this.dataView,this.options.curSortDirec):this._sortDataSourceByCol(e.fields),this.options.curSortCol=e.fields,this._refreshBody()},"click [data-action=checkItem]":function(b){var c=a(b.currentTarget),d=c.closest("tr").attr("data-index"),e=this.options.dataSource[d],f=c.closest("td").attr("data-col"),g=this.options.columns[f];this.header.find(":checkbox[data-action=checkAll]").prop("checked",!this.bodyWrap.find(':checkbox[data-action="checkItem"]:not(:checked)').length),e[g.check]=c.prop("checked");var h=g.checkItem;return a.isFunction(h)?h.call(this,b,g):void 0},"change [data-column]":function(b){var c=a(b.currentTarget).attr("data-column"),d=a(b.currentTarget).prop("checked"),e=this.options.columns;e[c].hide=!d,this._renderHeader(),this._renderBody(),this._refreshBody(),this._setWidth(),this.setHeight()},"dblclick [data-editable]":function(b){function c(){a(document).off("click.tableEditor");var b=d._trigger("onblurEditor",null,{data:h,editVal:j.val(),field:f,_index:g});b!==!1&&j.val()&&(h[f]="number"==i.dataType?j.val()-0:j.val()),d._dataView(),d._refreshBody()}var d=this,e=a(b.currentTarget),f=e.attr("data-editable"),g=e.closest("tr").attr("data-index"),h=this.options.dataSource[g],i=this._getColByFields(f);if(null!==i){if(a.isFunction(i.editor)){var j=i.editor.call(this,e,a.extend({},i,{data:h,_index:g}));if(!j||0===j.length)return;{e.height(),e.width()}e.addClass("u-table-editCell").empty().append(j),j.focus(),j.val(h[f]),j.select().on("keypress",function(b){b.which===a.ui.keyCode.ENTER&&c()}),a(document).on("click.tableEditor",function(a){return a.target!==j[0]&&c(),!1})}return!1}},change:function(b){var c=b.target,d=(c.tagName,c.type,a(c)),e=d.closest("tr[data-index]").attr("data-index"),f=d.closest("td").attr("data-col");if(e&&f){e=parseInt(e),f=parseInt(f);var g=this.options.dataSource[e],h=this.options.columns[f],i=d.attr("widget");if(!h.editor){if(!g.hasOwnProperty([h.fields]))return;g[h.fields]=i&&d[i]?d[i]("value"):d.val()}}}}})}(jQuery);