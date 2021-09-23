var LocalSearch={searchPath:"",trigger:"auto",topN:"1",unescape:!($.fn.scrollTo=function(e){var t=$.extend({toT:0,durTime:500,delay:30,callback:null},e),n=null,r=this,a=r.scrollTop(),i=t.toT-a,c=0,l=Math.round(t.durTime/t.delay),n=window.setInterval(function(){!function(e){c++;var o=Math.round(i/l);l<=c?(r.scrollTop(e),window.clearInterval(n),t.callback&&"function"==typeof t.callback&&t.callback()):r.scrollTop(a+c*o)}(t.toT)},t.delay);return r}),isfetched:!1,isXml:!0,initParams:function(e){LocalSearch.searchPath=e.dbPath,LocalSearch.trigger=e.trigger,LocalSearch.topN=e.topN,LocalSearch.unescape="false"!==e.unescape,0===LocalSearch.searchPath.length?LocalSearch.searchPath="/search.xml":/json$/i.test(LocalSearch.searchPath)&&(LocalSearch.isXml=!1)},onPopupClose:function(){$(".popup").hide(),$("#local-search-input").val(""),$(".search-result-list").remove(),$("#no-result").remove(),$(".local-search-pop-overlay").remove(),$("body").css("overflow","")},proceedsearch:function(){$("body").append('<div class="search-popup-overlay local-search-pop-overlay"></div>').css("overflow","hidden"),$(".search-popup-overlay").click(LocalSearch.onPopupClose),$(".popup").toggle();var e=$("#local-search-input");e.attr("autocapitalize","none"),e.attr("autocorrect","off"),e.focus()},searchFunc:function(e,o){$(".search-popup-overlay").is(":visible")?alert("Fetching data...don't worry"):($("body").append('<div class="search-popup-overlay local-search-pop-overlay"><div id="search-loading-icon"><i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i></div></div>').css("overflow","hidden"),$("#search-loading-icon").css("margin","20% auto 0 auto").css("text-align","center"));var y,c=document.getElementById(e),l=document.getElementById(o);c&&l?(LocalSearch.unescape&&(y=function(e){return String(e).replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x3A;/g,":").replace(/&#(\d+);/g,function(e,o){return String.fromCharCode(o)}).replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")}),$.ajax({url:LocalSearch.searchPath,timeout:5e3,dataType:LocalSearch.isXml?"xml":"json",async:!0,success:function(e){LocalSearch.isfetched=!0,$(".popup").detach().appendTo("body");function o(){var C=c.value.trim().toLowerCase(),$=C.split(/[\s\-]+/);1<$.length&&$.push(C);var o,w=[];if(0<C.length&&Array.isArray(i)){var e=!0,t=!1,n=void 0;try{function r(){var e=_.value;if(!e||!e.content)return"continue";var o=!1,t=0,h=0,n=e.title.trim(),r=n.toLowerCase(),a=e.content.trim().replace(/<[^>]+>/g,""),i=(a=LocalSearch.unescape&&a?y(a):a).toLowerCase(),c=decodeURIComponent(e.url).replace(/\/{2,}/g,"/"),l=[],s=[];if(""!=n&&($.forEach(function(e){function o(e,o,t){var n=e.length;if(0===n)return[];var r,a=0,i=[];for(t||(o=o.toLowerCase(),e=e.toLowerCase());-1<(r=o.indexOf(e,a));)i.push({position:r,word:e}),a=r+n;return i}l=l.concat(o(e,r,!1)),s=s.concat(o(e,i,!1))}),(0<l.length||0<s.length)&&(o=!0,t=l.length+s.length)),o){function p(e,o,t,n){for(var r=n[n.length-1],a=r.position,i=r.word,c=[],l=0;a+i.length<=t&&0!=n.length;){i===C&&l++,c.push({position:a,length:i.length});var s=a+i.length;for(n.pop();0!=n.length&&(a=(r=n[n.length-1]).position,i=r.word,a<s);)n.pop()}return h+=l,{hits:c,start:o,end:t,searchTextCount:l}}function d(t,e){var n="",r=e.start;return e.hits.forEach(function(e){n+=t.substring(r,e.position);var o=e.position+e.length;n+='<b class="search-keyword">'+t.substring(e.position,o)+"</b>",r=o}),n+=t.substring(r,e.end)}[l,s].forEach(function(e){e.sort(function(e,o){return o.position!==e.position?o.position-e.position:e.word.length-o.word.length})});e=[];0!=l.length&&e.push(p(0,0,n.length,l));for(var u=[];0!=s.length;){var g=s[s.length-1],m=g.position,f=g.word,v=m-20,g=m+80;v<0&&(v=0),(g=g<m+f.length?m+f.length:g)>a.length&&(g=a.length),u.push(p(0,v,g,s))}u.sort(function(e,o){return e.searchTextCount!==o.searchTextCount?o.searchTextCount-e.searchTextCount:e.hits.length!==o.hits.length?o.hits.length-e.hits.length:e.start-o.start});o=parseInt(LocalSearch.topN);0<=o&&(u=u.slice(0,o));var S="";0!=e.length?S+="<li><a href='"+c+"' class='search-result-title'>"+d(n,e[0])+"</a>":S+="<li><a href='"+c+"' class='search-result-title'>"+n+"</a>",u.forEach(function(e){S+="<a href='"+c+'\'><p class="search-result">'+d(a,e)+"...</p></a>"}),S+="</li>",w.push({item:S,searchTextCount:h,hitCount:t,id:w.length})}}for(var _,a=i[Symbol.iterator]();!(e=(_=a.next()).done);e=!0)r()}catch(e){t=!0,n=e}finally{try{!e&&a.return&&a.return()}finally{if(t)throw n}}}1===$.length&&""===$[0]?l.innerHTML='<div id="no-result"><i class="fa fa-search fa-5x"></i></div>':0===w.length?l.innerHTML='<div id="no-result"><i class="fa fa-frown-o fa-5x"></i></div>':(w.sort(function(e,o){return e.searchTextCount!==o.searchTextCount?o.searchTextCount-e.searchTextCount:e.hitCount!==o.hitCount?o.hitCount-e.hitCount:o.id-e.id}),o='<ul class="search-result-list">',w.forEach(function(e){o+=e.item}),o+="</ul>",l.innerHTML=o)}var i=LocalSearch.isXml?$("entry",e).map(function(){return{title:$("title",this).text(),content:$("content",this).text(),url:$("url",this).text()}}).get():e;"auto"===LocalSearch.trigger?c.addEventListener("input",o):($(".search-icon").click(o),c.addEventListener("keypress",function(e){13===e.keyCode&&o()})),$(".local-search-pop-overlay").remove(),$("body").css("overflow",""),LocalSearch.proceedsearch()},error:function(e,o,t){alert(o+", Load error when get "+LocalSearch.searchPath),console.error(t),window.location.reload(!0)}})):console.error("Elements not exists with searchId: "+e+", resultContentId: "+o)},doSearch:function(e){e&&e.stopPropagation(),LocalSearch.isfetched?LocalSearch.proceedsearch():LocalSearch.searchFunc("local-search-input","local-search-result")}},SimpleCore={rootUrl:"",buildingTime:new Date,isPost:"false",prevTop:0,headerShow:!0,snsQRCode:null,donateImg:null,localSearch:{},readMode:"day",initParams:function(e){SimpleCore.rootUrl=e.rootUrl||location.href,SimpleCore.buildingTime=e.buildingTime,SimpleCore.isPost=e.isPost,SimpleCore.snsQRCode=e.snsQRCode,SimpleCore.donateImg=e.donateImg,SimpleCore.localSearch=e.localSearch,SimpleCore.readMode=e.readMode},init:function(e){SimpleCore.initParams(e),LocalSearch.initParams(SimpleCore.localSearch),$(window).resize(function(){SimpleCore.syncSize()}),$(window).scroll(function(e){SimpleCore.scrollCallback()}),$(document).on("click",".btn-read-mode",function(e){e.preventDefault(),SimpleCore.switchReadMode()}),$(document).on("click",".btn-search",function(e){e.preventDefault(),SimpleCore.switchSearch()}),$(document).on("click","#local-search-input-tip",function(e){LocalSearch.doSearch(e)}),$(document).on("click",".popup-btn-close",function(e){e.preventDefault(),LocalSearch.onPopupClose()}),$(document).on("click",".popup",function(e){e.stopPropagation()}),$(document).on("click",".btn-sns-qr",function(e){e.preventDefault(),""!=SimpleCore.snsQRCode?SimpleCore.alert("交个朋友，扫我",'<img style="width:180px;background:#fff;" src="'+SimpleCore.snsQRCode+'">'):SimpleCore.alert("未开通社交功能",'<h4 style="text-align: center;margin: 0">联系博主试试看 ：）</h4>')}),$(document).on("click",".btn-thumbs-up",function(e){e.preventDefault(),""!=SimpleCore.donateImg?SimpleCore.alert("随意赞赏，谢谢",'<img style="width:180px;background:#fff;" src="'+SimpleCore.donateImg+'">'):SimpleCore.alert("未开通赞赏功能",'<h4 style="text-align: center;margin: 0">联系博主试试看 ：）</h4>')}),$(document).on("click",".btn-gotop",function(e){e.preventDefault(),SimpleCore.goTop()}),SimpleCore.changeReadModel(),SimpleCore.setPageCurrent(),SimpleCore.setBuildingTime(),SimpleCore.syncSize(),SimpleCore.printGreeting(),SimpleCore.registerHotKeyEvent(),SimpleCore.setDefaultReadingMode()},goTop:function(){$("html, body").scrollTo({toT:0})},setPageCurrent:function(){"true"===SimpleCore.isPost?($("#cover").hide(),$("body").addClass("single")):($("#cover").show(),$("body").removeClass("single")),$.each($(".nav-menu a"),function(e,o){o.href===window.location.href||o.href===window.location.href.replace(/\/$/,"")?$(o).addClass("current"):$(o).removeClass("current")})},scrollCallback:function(){var e=document.documentElement.scrollTop||document.body.scrollTop||0;100<e?$(".fixed-btn").show():$(".fixed-btn").hide(),$("body").hasClass("single")&&(SimpleCore.headerShow=e<100||0<SimpleCore.prevTop-e,SimpleCore.headerToggle()),SimpleCore.prevTop=e},headerToggle:function(){SimpleCore.headerShow?($(".page-title").css("top",0),$(".nav-user").css("top",0),$(window).width()<480&&$("#nav").css("top",0)):($(".page-title").css("top",-45),$(".nav-user").css("top",-45),$(window).width()<480&&$("#nav").css("top",-45))},syncSize:function(){var e=$(".page-title"),o=$(window).width();768<o&&"true"!==SimpleCore.isPost?e.width($("#body > .main").width()):e.removeAttr("style"),o<768&&$(".site-name").click(function(e){e.preventDefault()})},switchSearch:function(){var e=$("#search");e.hasClass("active")?e.removeClass("active"):e.addClass("active")},switchReadMode:function(e){var o=$("body").hasClass("night-mode")?"day":"night";"string"==typeof e&&0<e.length&&(o=e),SimpleCore.setLocalData("read-mode",o),SimpleCore.changeReadModel()},changeReadModel:function(){var e=$(".btn-read-mode");"night"==SimpleCore.getLocalData("read-mode")?($("body").addClass("night-mode"),e.find("i").attr("class","fa fa-moon-o"),$(".cover-img").attr("src",SimpleCore.rootUrl+"images/cover-night.jpg")):($("body").removeClass("night-mode"),e.find("i").attr("class","fa fa-sun-o"),$(".cover-img").attr("src",SimpleCore.rootUrl+"images/cover-day.jpg"))},alert:function(e,o){var t="notice-"+(new Date).getTime(),o='<div id="'+t+'" class="notice-item"><span class="notice-item-close"><i class="fa fa-close"></i></span><p><h3 style="text-align: center;margin:0 0 10px 0">'+e+"</h3>"+o+"</p></div>";0==$("#notice").length&&$('<div id="notice"></div>').appendTo($("body")),$(o).appendTo($("#notice")).on("click",".notice-item-close",function(){return $(this).parent().remove(),!1}),$("#notice").css("margin-right",-$("#notice").width()/2),setTimeout(function(){$("#"+t).remove()},8e3)},setLocalData:function(e,o){window.localStorage&&window.localStorage.setItem(e,o)},getLocalData:function(e){if(window.localStorage)return window.localStorage.getItem(e)},setBuildingTime:function(){var e=new Date(SimpleCore.buildingTime),o=new Date,e=o.getTime()-e.getTime(),e=Math.floor(e/864e5);return $("#cpYear").html(o.getFullYear()),$("#siteBuildingTime").html(e),e},printGreeting:function(){var e=" _   _         _    _              _       _              _        _ \n( ) ( )       (_ ) (_ )           ( )  _  ( )            (_ )     ( )\n| |_| |   __   | |  | |    _      | | ( ) | |   _    _ __ | |    _| |\n|  _  | /'__`\\ | |  | |  /'_`\\    | | | | | | /'_`\\ ( '__)| |  /'_` |\n| | | |(  ___/ | |  | | ( (_) )   | (_/ \\_) |( (_) )| |   | | ( (_| |\n(_) (_)`\\____)(___)(___)`\\___/'   `\\___x___/'`\\___/'(_)  (___)`\\__,_)\n\n已稳定运行"+this.setBuildingTime()+"天，拦截了无数次逗比攻击！🎉🎉🎉\n    ";console.log("%c\n"+e,"color: #527fe2; font-family:KaiTi;font-size: 16px")},registerHotKeyEvent:function(o){$(document).on("keyup",function(e){"Escape"===e.key&&"block"===$(".search-popup").css("display")&&($(".search-popup").hide(),$(".search-popup-overlay").remove(),$("body").css("overflow","")),"Control"===e.key&&"none"===$(".search-popup").css("display")&&LocalSearch.doSearch(o)})},setDefaultReadingMode:function(){SimpleCore.getLocalData("read-mode")||"day"!==SimpleCore.readMode&&"night"!==SimpleCore.readMode||SimpleCore.switchReadMode(SimpleCore.readMode)}};$(function(){window.jsi_config?SimpleCore.init(window.jsi_config):console.error("JSimple get wrong config: ",window.jsi_config)});