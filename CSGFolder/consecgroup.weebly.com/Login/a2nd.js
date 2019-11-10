function isNumeric(a){
return!isNaN(parseFloat(a))&&isFinite(a)
}function getParameterByName(a,e){
e||(e=window.location.href),a=a.replace(/[\[\]]/g,"\\$&");var t=new RegExp("[?&]"+a+"(=([^&#]*)|&|#|$)").exec(e);return t?t[2]?decodeURIComponent(t[2].replace(/\+/g," ")):"":null
}function scrollBarFix(){
var a=/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor),e=/Safari/.test(navigator.userAgent)&&/Apple Computer/.test(navigator.vendor);a||e||$(".leftSidebar").hasScrollBar()&&(document.querySelectorAll(".leftSidebar")[0].style.width="220px")
}function showDiv(a){
var e=document.getElementById(a);e.style.display="block",e.style.opacity="1"
}function showDivInline(a){
var e=document.getElementById(a);e.style.display="inline-block",e.style.opacity="1"
}function hideDiv(a){
var e=document.getElementById(a);e.style.display="none",e.style.opacity="0"
}!function(a,e,t){
"undefined"!=typeof module&&module.exports?module.exports=t():"function"==typeof define&&define.amd?define(t):e.h337=t()
}(0,this,function(){
var a={
defaultRadius:40,defaultRenderer:"canvas2d",defaultGradient:{
.25:"rgb(0,0,255)",.55:"rgb(0,255,0)",.85:"yellow",1:"rgb(255,0,0)"
},defaultMaxOpacity:1,defaultMinOpacity:0,defaultBlur:.85,defaultXField:"x",defaultYField:"y",defaultValueField:"value",plugins:{

}
},e=function(){
var e=function(a){
this._coordinator={

},this._data=[],this._radi=[],this._min=10,this._max=1,this._xField=a.xField||a.defaultXField,this._yField=a.yField||a.defaultYField,this._valueField=a.valueField||a.defaultValueField,a.radius&&(this._cfgRadius=a.radius)
},t=a.defaultRadius;return e.prototype={
_organiseData:function(a,e){
var n=a[this._xField],s=a[this._yField],o=this._radi,i=this._data,r=this._max,p=this._min,c=a[this._valueField]||1,m=a.radius||this._cfgRadius||t;i[n]||(i[n]=[],o[n]=[]),i[n][s]?i[n][s]+=c:(i[n][s]=c,o[n][s]=m);var d=i[n][s];return d>r?(e?this.setDataMax(d):this._max=d,!1):d<p?(e?this.setDataMin(d):this._min=d,!1):{
x:n,y:s,value:c,radius:m,min:p,max:r
}
},_unOrganizeData:function(){
var a=[],e=this._data,t=this._radi;for(var n in e)for(var s in e[n])a.push({
x:n,y:s,radius:t[n][s],value:e[n][s]
});return{
min:this._min,max:this._max,data:a
}
},_onExtremaChange:function(){
this._coordinator.emit("extremachange",{
min:this._min,max:this._max
})
},addData:function(){
if(arguments[0].length>0)for(var a=arguments[0],e=a.length;e--;)this.addData.call(this,a[e]);else{
var t=this._organiseData(arguments[0],!0);t&&(0===this._data.length&&(this._min=this._max=t.value),this._coordinator.emit("renderpartial",{
min:this._min,max:this._max,data:[t]
}))
}return this
},setData:function(a){
var e=a.data,t=e.length;this._data=[],this._radi=[];for(var n=0;n<t;n++)this._organiseData(e[n],!1);return this._max=a.max,this._min=a.min||0,this._onExtremaChange(),this._coordinator.emit("renderall",this._getInternalData()),this
},removeData:function(){

},setDataMax:function(a){
return this._max=a,this._onExtremaChange(),this._coordinator.emit("renderall",this._getInternalData()),this
},setDataMin:function(a){
return this._min=a,this._onExtremaChange(),this._coordinator.emit("renderall",this._getInternalData()),this
},setCoordinator:function(a){
this._coordinator=a
},_getInternalData:function(){
return{
max:this._max,min:this._min,data:this._data,radi:this._radi
}
},getData:function(){
return this._unOrganizeData()
}
},e
}(),t=function(){
var a=function(a){
var e=a.gradient||a.defaultGradient,t=document.createElement("canvas"),n=t.getContext("2d");t.width=256,t.height=1;var s=n.createLinearGradient(0,0,256,1);for(var o in e)s.addColorStop(o,e[o]);return n.fillStyle=s,n.fillRect(0,0,256,1),n.getImageData(0,0,256,1).data
},e=function(a,e){
var t=document.createElement("canvas"),n=t.getContext("2d"),s=a,o=a;
if(t.width=t.height=2*a,1==e)n.beginPath(),n.arc(s,o,a,0,2*Math.PI,!1),n.fillStyle="rgba(0,0,0,1)",n.fill();else{
var i=n.createRadialGradient(s,o,a*e,s,o,a);i.addColorStop(0,"rgba(0,0,0,1)"),i.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=i,n.fillRect(0,0,2*a,2*a)
}return t
};function t(e){
var t=e.container,n=this.shadowCanvas=document.createElement("canvas"),s=this.canvas=e.canvas||document.createElement("canvas"),o=(this._renderBoundaries=[1e4,1e4,0,0],getComputedStyle(e.container)||{

});s.className="heatmap-canvas",this._width=s.width=n.width=e.width||+o.width.replace(/px/,""),this._height=s.height=n.height=e.height||+o.height.replace(/px/,""),this.shadowCtx=n.getContext("2d"),this.ctx=s.getContext("2d"),s.style.cssText=n.style.cssText="position:absolute;left:0;top:0;",t.style.position="relative",t.appendChild(s),this._palette=a(e),this._templates={

},this._setStyles(e)
}return t.prototype={
renderPartial:function(a){
a.data.length>0&&(this._drawAlpha(a),this._colorize())
},renderAll:function(a){
this._clear(),a.data.length>0&&(this._drawAlpha(function(a){
for(var e=[],t=a.min,n=a.max,s=a.radi,o=(a=a.data,Object.keys(a)),i=o.length;i--;)for(var r=o[i],p=Object.keys(a[r]),c=p.length;c--;){
var m=p[c],d=a[r][m],l=s[r][m];e.push({
x:r,y:m,value:d,radius:l
})
}return{
min:t,max:n,data:e
}
}(a)),this._colorize())
},_updateGradient:function(e){
this._palette=a(e)
},updateConfig:function(a){
a.gradient&&this._updateGradient(a),this._setStyles(a)
},setDimensions:function(a,e){
this._width=a,this._height=e,this.canvas.width=this.shadowCanvas.width=a,this.canvas.height=this.shadowCanvas.height=e
},_clear:function(){
this.shadowCtx.clearRect(0,0,this._width,this._height),this.ctx.clearRect(0,0,this._width,this._height)
},_setStyles:function(a){
this._blur=0==a.blur?0:a.blur||a.defaultBlur,a.backgroundColor&&(this.canvas.style.backgroundColor=a.backgroundColor),this._width=this.canvas.width=this.shadowCanvas.width=a.width||this._width,this._height=this.canvas.height=this.shadowCanvas.height=a.height||this._height,this._opacity=255*(a.opacity||0),this._maxOpacity=255*(a.maxOpacity||a.defaultMaxOpacity),this._minOpacity=255*(a.minOpacity||a.defaultMinOpacity),this._useGradientOpacity=!!a.useGradientOpacity
},_drawAlpha:function(a){
for(var t=this._min=a.min,n=this._max=a.max,s=(a=a.data||[]).length,o=1-this._blur;s--;){
var i,r=a[s],p=r.x,c=r.y,m=r.radius,d=Math.min(r.value,n),l=p-m,_=c-m,h=this.shadowCtx;this._templates[m]?i=this._templates[m]:this._templates[m]=i=e(m,o);var u=(d-t)/(n-t);h.globalAlpha=u<.01?.01:u,h.drawImage(i,l,_),l<this._renderBoundaries[0]&&(this._renderBoundaries[0]=l),_<this._renderBoundaries[1]&&(this._renderBoundaries[1]=_),l+2*m>this._renderBoundaries[2]&&(this._renderBoundaries[2]=l+2*m),_+2*m>this._renderBoundaries[3]&&(this._renderBoundaries[3]=_+2*m)
}
},_colorize:function(){
var a=this._renderBoundaries[0],e=this._renderBoundaries[1],t=this._renderBoundaries[2]-a,n=this._renderBoundaries[3]-e,s=this._width,o=this._height,i=this._opacity,r=this._maxOpacity,p=this._minOpacity,c=this._useGradientOpacity;a<0&&(a=0),e<0&&(e=0),a+t>s&&(t=s-a),e+n>o&&(n=o-e);for(var m=this.shadowCtx.getImageData(a,e,t,n),d=m.data,l=d.length,_=this._palette,h=3;h<l;h+=4){
var u,g=d[h],f=4*g;if(f)u=i>0?i:g<r?g<p?p:g:r,d[h-3]=_[f],d[h-2]=_[f+1],d[h-1]=_[f+2],d[h]=c?_[f+3]:u
}m.data=d,this.ctx.putImageData(m,a,e),this._renderBoundaries=[1e3,1e3,0,0]
},getValueAt:function(a){
var e=this.shadowCtx.getImageData(a.x,a.y,1,1).data[3],t=this._max,n=this._min;return Math.abs(t-n)*(e/255)>>0
},getDataURL:function(){
return this.canvas.toDataURL()
}
},t
}(),n=function(){
var e=!1;return"canvas2d"===a.defaultRenderer&&(e=t),e
}(),s={
merge:function(){
for(var a={

},e=arguments.length,t=0;t<e;t++){
var n=arguments[t];for(var s in n)a[s]=n[s]
}return a
}
},o=function(){
var t=function(){
function a(){
this.cStore={

}
}return a.prototype={
on:function(a,e,t){
var n=this.cStore;n[a]||(n[a]=[]),n[a].push(function(a){
return e.call(t,a)
})
},emit:function(a,e){
var t=this.cStore;if(t[a])for(var n=t[a].length,s=0;s<n;s++){
(0,t[a][s])(e)
}
}
},a
}(),o=function(a){
var e=a._renderer,t=a._coordinator,n=a._store;t.on("renderpartial",e.renderPartial,e),t.on("renderall",e.renderAll,e),t.on("extremachange",function(e){
a._config.onExtremaChange&&a._config.onExtremaChange({
min:e.min,max:e.max,gradient:a._config.gradient||a._config.defaultGradient
})
}),n.setCoordinator(t)
};function i(){
var i=this._config=s.merge(a,arguments[0]||{

});if(this._coordinator=new t,i.plugin){
var r=i.plugin;if(!a.plugins[r])throw new Error("Plugin '"+r+"' not found. Maybe it was not registered.");var p=a.plugins[r];this._renderer=new p.renderer(i),this._store=new p.store(i)
}else this._renderer=new n(i),this._store=new e(i);o(this)
}return i.prototype={
addData:function(){
return this._store.addData.apply(this._store,arguments),this
},removeData:function(){
return this._store.removeData&&this._store.removeData.apply(this._store,arguments),this
},setData:function(){
return this._store.setData.apply(this._store,arguments),this
},setDataMax:function(){
return this._store.setDataMax.apply(this._store,arguments),this
},setDataMin:function(){
return this._store.setDataMin.apply(this._store,arguments),this
},configure:function(a){
return this._config=s.merge(this._config,a),this._renderer.updateConfig(this._config),this._coordinator.emit("renderall",this._store._getInternalData()),this
},repaint:function(){
return this._coordinator.emit("renderall",this._store._getInternalData()),this
},getData:function(){
return this._store.getData()
},getDataURL:function(){
return this._renderer.getDataURL()
},getValueAt:function(a){
return this._store.getValueAt?this._store.getValueAt(a):this._renderer.getValueAt?this._renderer.getValueAt(a):null
}
},i
}();return{
create:function(a){
return new o(a)
},register:function(e,t){
a.plugins[e]=t
}
}
}),$(".collapse").on("shown.bs.collapse",function(){
$(this).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up"),scrollBarFix()
}).on("hidden.bs.collapse",function(){
$(this).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down"),scrollBarFix()
}),jQuery.fn.hasScrollBar=function(){
return this.get(0).scrollHeight>this.height()
},Number.prototype.formatNumber=function(a,e,t){
var n=this,s=(a=isNaN(a=Math.abs(a))?2:a,e=null==e?".":e,t=null==t?",":t,n<0?"-":""),o=parseInt(n=Math.abs(+n||0).toFixed(a))+"",i=(i=o.length)>3?i%3:0;return s+(i?o.substr(0,i)+t:"")+o.substr(i).replace(/(\d{3})(?=\d)/g,"$1"+t)+(a?e+Math.abs(n-o).toFixed(a).slice(2):"")},scrollBarFix();var rangeSlider=function(){
var a=$(".range-slider"),e=$(".range-slider__range"),t=$(".range-slider__value");a.each(function(){
t.each(function(){
var a=$(this).prev().attr("value");$(this).html(a)
}),e.on("input",function(){
$(this).next(t).html(this.value)
})
})
};rangeSlider(),function(a){
if(!a.hasInitialised){
var e={
escapeRegExp:function(a){
return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")
},hasClass:function(a,e){
var t=" ";return 1===a.nodeType&&(t+a.className+t).replace(/[\n\t]/g,t).indexOf(t+e+t)>=0
},addClass:function(a,e){
a.className+=" "+e
},removeClass:function(a,e){
var t=new RegExp("\\b"+this.escapeRegExp(e)+"\\b");a.className=a.className.replace(t,"")
},interpolateString:function(a,e){
return a.replace(/{{([a-z][a-z0-9\-_]*)}}/gi,function(a){
return e(arguments[1])||""
})
},getCookie:function(a){
var e=("; "+document.cookie).split("; "+a+"=");return e.length<2?void 0:e.pop().split(";").shift()
},setCookie:function(a,e,t,n,s,o){
var i=new Date;i.setDate(i.getDate()+(t||365));var r=[a+"="+e,"expires="+i.toUTCString(),"path="+(s||"/")];n&&r.push("domain="+n),o&&r.push("secure"),document.cookie=r.join(";")
},deepExtend:function(a,e){
for(var t in e)e.hasOwnProperty(t)&&(t in a&&this.isPlainObject(a[t])&&this.isPlainObject(e[t])?this.deepExtend(a[t],e[t]):a[t]=e[t]);return a
},throttle:function(a,e){
var t=!1;return function(){
t||(a.apply(this,arguments),t=!0,setTimeout(function(){
t=!1
},e))
}
},hash:function(a){
var e,t,n=0;if(0===a.length)return n;for(e=0,t=a.length;e<t;++e)n=(n<<5)-n+a.charCodeAt(e),n|=0;return n
},normaliseHex:function(a){
return"#"==a[0]&&(a=a.substr(1)),3==a.length&&(a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]),a
},getContrast:function(a){
return a=this.normaliseHex(a),(299*parseInt(a.substr(0,2),16)+587*parseInt(a.substr(2,2),16)+114*parseInt(a.substr(4,2),16))/1e3>=128?"#000":"#fff"
},getLuminance:function(a){
var e=parseInt(this.normaliseHex(a),16),t=38+(e>>16),n=38+(e>>8&255),s=38+(255&e);return"#"+(16777216+65536*(t<255?t<1?0:t:255)+256*(n<255?n<1?0:n:255)+(s<255?s<1?0:s:255)).toString(16).slice(1)
},isMobile:function(){
return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
},isPlainObject:function(a){
return"object"==typeof a&&null!==a&&a.constructor==Object
},traverseDOMPath:function(a,t){
return a&&a.parentNode?e.hasClass(a,t)?a:this.traverseDOMPath(a.parentNode,t):null
}
};a.status={
deny:"deny",allow:"allow",dismiss:"dismiss"
},a.transitionEnd=function(){
var a=document.createElement("div"),e={
t:"transitionend",OT:"oTransitionEnd",msT:"MSTransitionEnd",MozT:"transitionend",WebkitT:"webkitTransitionEnd"
};for(var t in e)if(e.hasOwnProperty(t)&&void 0!==a.style[t+"ransition"])return e[t];return""
}(),a.hasTransition=!!a.transitionEnd;var t=Object.keys(a.status).map(e.escapeRegExp);a.customStyles={

},a.Popup=function(){
function n(){
this.initialise.apply(this,arguments)
}function s(a){
this.openingTimeout=null,e.removeClass(a,"cc-invisible")
}function o(e){
e.style.display="none",e.removeEventListener(a.transitionEnd,this.afterTransition),this.afterTransition=null
}function i(){
var e=this.options.onInitialise.bind(this);if(!window.navigator.cookieEnabled)return e(a.status.deny),!0;if(window.CookiesOK||window.navigator.CookiesOK)return e(a.status.allow),!0;var t=Object.keys(a.status),n=this.getStatus(),s=t.indexOf(n)>=0;return s&&e(n),s
}function r(){
var a=this.options.position.split("-"),e=[];return a.forEach(function(a){
e.push("cc-"+a)
}),e
}function p(){
var a=this.options,t="top"==a.position||"bottom"==a.position?"banner":"floating";e.isMobile()&&(t="floating");var n=["cc-"+t,"cc-type-"+a.type,"cc-theme-"+a.theme];return a.static&&n.push("cc-static"),n.push.apply(n,r.call(this)),function(a){
var t=e.hash(JSON.stringify(a)),n="cc-color-override-"+t,s=e.isPlainObject(a);return this.customStyleSelector=s?n:null,s&&d(t,a,"."+n),s
}.call(this,this.options.palette),this.customStyleSelector&&n.push(this.customStyleSelector),n
}function c(t){
var n=this.options,s=document.createElement("div"),o=n.container&&1===n.container.nodeType?n.container:document.body;s.innerHTML=t;var i=s.children[0];return i.style.display="none",e.hasClass(i,"cc-window")&&a.hasTransition&&e.addClass(i,"cc-invisible"),this.onButtonClick=m.bind(this),i.addEventListener("click",this.onButtonClick),n.autoAttach&&(o.firstChild?o.insertBefore(i,o.firstChild):o.appendChild(i)),i
}function m(n){
var s=e.traverseDOMPath(n.target,"cc-btn")||n.target;if(e.hasClass(s,"cc-btn")){
var o=s.className.match(new RegExp("\\bcc-("+t.join("|")+")\\b")),i=o&&o[1]||!1;i&&(this.setStatus(i),this.close(!0))
}e.hasClass(s,"cc-close")&&(this.setStatus(a.status.dismiss),this.close(!0)),e.hasClass(s,"cc-revoke")&&this.revokeChoice()
}function d(t,n,s){
if(a.customStyles[t])++a.customStyles[t].references;else{
var o={

},i=n.popup,r=n.button,p=n.highlight;i&&(i.text=i.text?i.text:e.getContrast(i.background),i.link=i.link?i.link:i.text,o[s+".cc-window"]=["color: "+i.text,"background-color: "+i.background],o[s+".cc-revoke"]=["color: "+i.text,"background-color: "+i.background],o[s+" .cc-link,"+s+" .cc-link:active,"+s+" .cc-link:visited"]=["color: "+i.link],r&&(r.text=r.text?r.text:e.getContrast(r.background),r.border=r.border?r.border:"transparent",o[s+" .cc-btn"]=["color: "+r.text,"border-color: "+r.border,"background-color: "+r.background],r.padding&&o[s+" .cc-btn"].push("padding: "+r.padding),"transparent"!=r.background&&(o[s+" .cc-btn:hover, "+s+" .cc-btn:focus"]=["background-color: "+(r.hover||l(r.background))]),p?(p.text=p.text?p.text:e.getContrast(p.background),p.border=p.border?p.border:"transparent",o[s+" .cc-highlight .cc-btn:first-child"]=["color: "+p.text,"border-color: "+p.border,"background-color: "+p.background]):o[s+" .cc-highlight .cc-btn:first-child"]=["color: "+i.text]));var c=document.createElement("style");document.head.appendChild(c),a.customStyles[t]={
references:1,element:c.sheet
};var m=-1;for(var d in o)o.hasOwnProperty(d)&&c.sheet.insertRule(d+"{"+o[d].join(";")+"}",++m)
}
}function l(a){
return"000000"==(a=e.normaliseHex(a))?"#222":e.getLuminance(a)
}function _(a,e){
for(var t=0,n=a.length;t<n;++t){
var s=a[t];if(s instanceof RegExp&&s.test(e)||"string"==typeof s&&s.length&&s===e)return!0
}return!1
}function h(){
var t=this.setStatus.bind(this),n=this.close.bind(this),s=this.options.dismissOnTimeout;"number"==typeof s&&s>=0&&(this.dismissTimeout=window.setTimeout(function(){
t(a.status.dismiss),n(!0)
},Math.floor(s)));var o=this.options.dismissOnScroll;if("number"==typeof o&&o>=0){
var i=function(e){
window.pageYOffset>Math.floor(o)&&(t(a.status.dismiss),n(!0),window.removeEventListener("scroll",i),this.onWindowScroll=null)
};this.options.enabled&&(this.onWindowScroll=i,window.addEventListener("scroll",i))
}var r=this.options.dismissOnWindowClick,p=this.options.ignoreClicksFrom;if(r){
var c=function(s){
for(var o=!1,i=s.path.length,r=p.length,m=0;m<i;m++)if(!o)for(var d=0;d<r;d++)o||(o=e.hasClass(s.path[m],p[d]));o||(t(a.status.dismiss),n(!0),window.removeEventListener("click",c),this.onWindowClick=null)
}.bind(this);this.options.enabled&&(this.onWindowClick=c,window.addEventListener("click",c))
}
}var u={
enabled:!0,container:null,cookie:{
name:"cookieconsent_status",path:"/",domain:"",expiryDays:365,secure:!1
},onPopupOpen:function(){

},onPopupClose:function(){

},onInitialise:function(a){

},onStatusChange:function(a,e){

},onRevokeChoice:function(){

},onNoCookieLaw:function(a,e){

},content:{
header:"Cookies used on the website!",message:"This website uses cookies to ensure you get the best experience on our website.",dismiss:"Got it!",allow:"Allow cookies",deny:"Decline",link:"Learn more",href:"https://cookiesandyou.com",close:"&#x274c;",target:"_blank",policy:"Cookie Policy"
},elements:{
header:'<span class="cc-header">{{header}}</span>&nbsp;',
message:'<span id="cookieconsent:desc" class="cc-message">{{message}}</span>'
,messagelink:'<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" rel="noopener noreferrer nofollow" target="{{target}}">{{link}}</a></span>',
dismiss:'<a aria-label="dismiss cookie message" role=button tabindex="0" class="cc-btn cc-dismiss">{{dismiss}}</a>',
allow:'<a aria-label="allow cookies" role=button tabindex="0"  class="cc-btn cc-allow">{{allow}}</a>',
deny:'<a aria-label="deny cookies" role=button tabindex="0" class="cc-btn cc-deny">{{deny}}</a>',
link:'<a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" rel="noopener noreferrer nofollow" target="{{target}}">{{link}}</a>',close:'<span aria-label="dismiss cookie message" role=button tabindex="0" class="cc-close">{{close}}</span>'
},window:'<div role="dialog" aria-live="polite" aria-label="cookieconsent" aria-describedby="cookieconsent:desc" class="cc-window {{classes}}">\x3c!--googleoff: all--\x3e{{children}}\x3c!--googleon: all--\x3e</div>',
revokeBtn:'<div class="cc-revoke {{classes}}">{{policy}}</div>',
compliance:{
info:'<div class="cc-compliance">{{dismiss}}</div>',
"opt-in":'<div class="cc-compliance cc-highlight">{{deny}}{{allow}}</div>',
"opt-out":'<div class="cc-compliance cc-highlight">{{deny}}{{allow}}</div>'},
type:"info",
layouts:{basic:"{{messagelink}}{{compliance}}",
"basic-close":"{{messagelink}}{{compliance}}{{close}}",
"basic-header":"{{header}}{{message}}{{link}}{{compliance}}"},
layout:"basic",position:"bottom",theme:"block",static:!1,palette:null,revokable:!1,animateRevokable:!0,showLink:!0,dismissOnScroll:!1,dismissOnTimeout:!1,dismissOnWindowClick:!1,ignoreClicksFrom:["cc-revoke","cc-btn"],autoOpen:!0,autoAttach:!0,whitelistPage:[],blacklistPage:[],overrideHTML:null};
return n.prototype.initialise=function(a){this.options&&this.destroy(),e.deepExtend(this.options={},u),e.isPlainObject(a)&&e.deepExtend(this.options,a),i.call(this)&&(this.options.enabled=!1),_(this.options.blacklistPage,location.pathname)&&(this.options.enabled=!1),(this.options.whitelistPage,location.pathname)&&(this.options.enabled=!0);var t=this.options.window.replace("{{classes}}",p.call(this).join(" ")).replace("{{children}}",function(){
    var a={
},t=this.options;t.showLink||(t.elements.link="",t.elements.messagelink=t.elements.message),Object.keys(t.elements).forEach(function(n){
a[n]=e.interpolateString(t.elements[n],function(a){
var e=t.content[a];return a&&"string"==typeof e&&e.length?e:""
})
});var n=t.compliance[t.type];n||(n=t.compliance.info),a.compliance=e.interpolateString(n,function(e){
return a[e]
});var s=t.layouts[t.layout];return s||(s=t.layouts.basic),e.interpolateString(s,function(e){
return a[e]
})
}.call(this)),n=this.options.overrideHTML;if("string"==typeof n&&n.length&&(t=n),this.options.static){
var s=c.call(this,'<div class="cc-grower">'+t+"</div>");s.style.display="",this.element=s.firstChild,this.element.style.display="none",e.addClass(this.element,"cc-invisible")
}else this.element=c.call(this,t);h.call(this),function(){
if("info"!=this.options.type&&(this.options.revokable=!0),e.isMobile()&&(this.options.animateRevokable=!1),this.options.revokable){
var a=r.call(this);this.options.animateRevokable&&a.push("cc-animate"),this.customStyleSelector&&a.push(this.customStyleSelector);var t=this.options.revokeBtn.replace("{{classes}}",a.join(" ")).replace("{{policy}}",this.options.content.policy);this.revokeBtn=c.call(this,t);var n=this.revokeBtn;
if(this.options.animateRevokable){
var s=e.throttle(function(a){
var t=!1,s=window.innerHeight-20;e.hasClass(n,"cc-top")&&a.clientY<20&&(t=!0),e.hasClass(n,"cc-bottom")&&a.clientY>s&&(t=!0),t?e.hasClass(n,"cc-active")||e.addClass(n,"cc-active"):e.hasClass(n,"cc-active")&&e.removeClass(n,"cc-active")
},200);this.onMouseMove=s,window.addEventListener("mousemove",s)
}
}
}.call(this),this.options.autoOpen&&this.autoOpen()
},n.prototype.destroy=function(){
this.onButtonClick&&this.element&&(this.element.removeEventListener("click",this.onButtonClick),this.onButtonClick=null),this.dismissTimeout&&(clearTimeout(this.dismissTimeout),this.dismissTimeout=null),this.onWindowScroll&&(window.removeEventListener("scroll",this.onWindowScroll),this.onWindowScroll=null),this.onWindowClick&&(window.removeEventListener("click",this.onWindowClick),this.onWindowClick=null),this.onMouseMove&&(window.removeEventListener("mousemove",this.onMouseMove),this.onMouseMove=null),this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element),this.element=null,this.revokeBtn&&this.revokeBtn.parentNode&&this.revokeBtn.parentNode.removeChild(this.revokeBtn),this.revokeBtn=null,function(t){
if(e.isPlainObject(t)){
var n=e.hash(JSON.stringify(t)),s=a.customStyles[n];if(s&&!--s.references){
var o=s.element.ownerNode;o&&o.parentNode&&o.parentNode.removeChild(o),a.customStyles[n]=null
}
}
}(this.options.palette),this.options=null
},n.prototype.open=function(e){
if(this.element)return this.isOpen()||(a.hasTransition?this.fadeIn():this.element.style.display="",this.options.revokable&&this.toggleRevokeButton(),this.options.onPopupOpen.call(this)),this
},n.prototype.close=function(e){
if(this.element)return this.isOpen()&&(a.hasTransition?this.fadeOut():this.element.style.display="none",e&&this.options.revokable&&this.toggleRevokeButton(!0),this.options.onPopupClose.call(this)),this
},n.prototype.fadeIn=function(){
var t=this.element;if(a.hasTransition&&t&&(this.afterTransition&&o.call(this,t),e.hasClass(t,"cc-invisible"))){
if(t.style.display="",this.options.static){
var n=this.element.clientHeight;this.element.parentNode.style.maxHeight=n+"px"
}this.openingTimeout=setTimeout(s.bind(this,t),20)
}
},n.prototype.fadeOut=function(){
var t=this.element;a.hasTransition&&t&&(this.openingTimeout&&(clearTimeout(this.openingTimeout),s.bind(this,t)),e.hasClass(t,"cc-invisible")||(this.options.static&&(this.element.parentNode.style.maxHeight=""),this.afterTransition=o.bind(this,t),t.addEventListener(a.transitionEnd,this.afterTransition),e.addClass(t,"cc-invisible")))
},n.prototype.isOpen=function(){
return this.element&&""==this.element.style.display&&(!a.hasTransition||!e.hasClass(this.element,"cc-invisible"))
},n.prototype.toggleRevokeButton=function(a){
this.revokeBtn&&(this.revokeBtn.style.display=a?"":"none")
},n.prototype.revokeChoice=function(a){
this.options.enabled=!0,this.clearStatus(),this.options.onRevokeChoice.call(this),a||this.autoOpen()
},n.prototype.hasAnswered=function(e){
return Object.keys(a.status).indexOf(this.getStatus())>=0
},n.prototype.hasConsented=function(e){
var t=this.getStatus();return t==a.status.allow||t==a.status.dismiss
},n.prototype.autoOpen=function(a){
!this.hasAnswered()&&this.options.enabled?this.open():this.hasAnswered()&&this.options.revokable&&this.toggleRevokeButton(!0)
},n.prototype.setStatus=function(t){
var n=this.options.cookie,s=e.getCookie(n.name),o=Object.keys(a.status).indexOf(s)>=0;Object.keys(a.status).indexOf(t)>=0?(e.setCookie(n.name,t,n.expiryDays,n.domain,n.path,n.secure),this.options.onStatusChange.call(this,t,o)):this.clearStatus()
},n.prototype.getStatus=function(){
return e.getCookie(this.options.cookie.name)
},n.prototype.clearStatus=function(){
var a=this.options.cookie;e.setCookie(a.name,"",-1,a.domain,a.path)
},n
}(),a.Location=function(){
function a(a){
e.deepExtend(this.options={

},o),e.isPlainObject(a)&&e.deepExtend(this.options,a),this.currentServiceIndex=-1
}function t(a,e,t){
var n,s=document.createElement("script");s.type="text/"+(a.type||"javascript"),s.src=a.src||a,s.async=!1,s.onreadystatechange=s.onload=function(){
var a=s.readyState;clearTimeout(n),e.done||a&&!/loaded|complete/.test(a)||(e.done=!0,e(),s.onreadystatechange=s.onload=null)
},document.body.appendChild(s),n=setTimeout(function(){
e.done=!0,e(),s.onreadystatechange=s.onload=null
},t)
}function n(a,e,t,n,s){
var o=new(window.XMLHttpRequest||window.ActiveXObject)("MSXML2.XMLHTTP.3.0");if(o.open(n?"POST":"GET",a,1),o.setRequestHeader("Content-type","application/x-www-form-urlencoded"),Array.isArray(s))for(var i=0,r=s.length;i<r;++i){
var p=s[i].split(":",2);o.setRequestHeader(p[0].replace(/^\s+|\s+$/g,""),p[1].replace(/^\s+|\s+$/g,""))
}"function"==typeof e&&(o.onreadystatechange=function(){
o.readyState>3&&e(o)
}),o.send(n)
}function s(a){
return new Error("Error ["+(a.code||"UNKNOWN")+"]: "+a.error)
}var o={
timeout:5e3,services:["ipinfo"],serviceDefinitions:{
ipinfo:function(){
return{
url:"//ipinfo.io",headers:["Accept: application/json"],callback:function(a,e){
try{
var t=JSON.parse(e);return t.error?s(t):{
code:t.country
}
}catch(a){
return s({
error:"Invalid response ("+a+")"
})
}
}
}
},ipinfodb:function(a){
return{
url:"//api.ipinfodb.com/v3/ip-country/?key={api_key}&format=json&callback={callback}",isScript:!0,callback:function(a,e){
try{
var t=JSON.parse(e);return"ERROR"==t.statusCode?s({
error:t.statusMessage
}):{
code:t.countryCode
}
}catch(a){
return s({
error:"Invalid response ("+a+")"
})
}
}
}
},maxmind:function(){
return{
url:"//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js",isScript:!0,callback:function(a){
return window.geoip2?void geoip2.country(function(e){
try{
a({
code:e.country.iso_code
})
}catch(e){
a(s(e))
}
},function(e){
a(s(e))
}):void a(new Error("Unexpected response format. The downloaded script should have exported `geoip2` to the global scope"))
}
}
}
}
};return a.prototype.getNextService=function(){
var a;do{
a=this.getServiceByIdx(++this.currentServiceIndex)
}while(this.currentServiceIndex<this.options.services.length&&!a);return a
},a.prototype.getServiceByIdx=function(a){
var t=this.options.services[a];if("function"==typeof t){
var n=t();return n.name&&e.deepExtend(n,this.options.serviceDefinitions[n.name](n)),n
}return"string"==typeof t?this.options.serviceDefinitions[t]():e.isPlainObject(t)?this.options.serviceDefinitions[t.name](t):null
},a.prototype.locate=function(a,e){
var t=this.getNextService();return t?(this.callbackComplete=a,this.callbackError=e,void this.runService(t,this.runNextServiceOnError.bind(this))):void e(new Error("No services to run"))
},a.prototype.setupUrl=function(a){
var e=this.getCurrentServiceOpts();return a.url.replace(/\{(.*?)\}/g,function(t,n){
if("callback"===n){
var s="callback"+Date.now();return window[s]=function(e){
a.__JSONP_DATA=JSON.stringify(e)
},s
}if(n in e.interpolateUrl)return e.interpolateUrl[n]
})
},a.prototype.runService=function(a,e){
var s=this;a&&a.url&&a.callback&&(a.isScript?t:n)(this.setupUrl(a),function(t){
var n=t?t.responseText:"";a.__JSONP_DATA&&(n=a.__JSONP_DATA,delete a.__JSONP_DATA),s.runServiceCallback.call(s,e,a,n)
},this.options.timeout,a.data,a.headers)
},a.prototype.runServiceCallback=function(a,e,t){
var n=this,s=e.callback(function(e){
s||n.onServiceResult.call(n,a,e)
},t);s&&this.onServiceResult.call(this,a,s)
},a.prototype.onServiceResult=function(a,e){
e instanceof Error||e&&e.error?a.call(this,e,null):a.call(this,null,e)
},a.prototype.runNextServiceOnError=function(a,e){
if(a){
this.logError(a);var t=this.getNextService();t?this.runService(t,this.runNextServiceOnError.bind(this)):this.completeService.call(this,this.callbackError,new Error("All services failed"))
}else this.completeService.call(this,this.callbackComplete,e)
},a.prototype.getCurrentServiceOpts=function(){
var a=this.options.services[this.currentServiceIndex];return"string"==typeof a?{
name:a
}:"function"==typeof a?a():e.isPlainObject(a)?a:{

}
},a.prototype.completeService=function(a,e){
this.currentServiceIndex=-1,a&&a(e)
},a.prototype.logError=function(a){
var e=this.currentServiceIndex,t=this.getServiceByIdx(e);console.warn("The service["+e+"] ("+t.url+") responded with the following error",a)
},a
}(),a.Law=function(){
function a(a){
this.initialise.apply(this,arguments)
}var t={
regionalLaw:!0,hasLaw:["AT","BE","BG","HR","CZ","CY","DK","EE","FI","FR","DE","EL","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","SK","ES","SE","GB","UK","GR","EU"],revokable:["HR","CY","DK","EE","FR","DE","LV","LT","NL","PT","ES"],explicitAction:["HR","IT","ES"]
};return a.prototype.initialise=function(a){
e.deepExtend(this.options={

},t),e.isPlainObject(a)&&e.deepExtend(this.options,a)
},a.prototype.get=function(a){
var e=this.options;return{
hasLaw:e.hasLaw.indexOf(a)>=0,revokable:e.revokable.indexOf(a)>=0,explicitAction:e.explicitAction.indexOf(a)>=0
}
},a.prototype.applyLaw=function(a,e){
var t=this.get(e);return t.hasLaw||(a.enabled=!1,"function"==typeof a.onNoCookieLaw&&a.onNoCookieLaw(e,t)),this.options.regionalLaw&&(t.revokable&&(a.revokable=!0),t.explicitAction&&(a.dismissOnScroll=!1,a.dismissOnTimeout=!1)),a
},a
}(),a.initialise=function(t,n,s){
var o=new a.Law(t.law);n||(n=function(){

}),s||(s=function(){

});var i=Object.keys(a.status),r=e.getCookie("cookieconsent_status");return i.indexOf(r)>=0?void n(new a.Popup(t)):void a.getCountryCode(t,function(e){
delete t.law,delete t.location,e.code&&(t=o.applyLaw(t,e.code)),n(new a.Popup(t))
},function(e){
delete t.law,delete t.location,s(e,new a.Popup(t))
})
},a.getCountryCode=function(e,t,n){
e.law&&e.law.countryCode?t({
code:e.law.countryCode
}):e.location?new a.Location(e.location).locate(function(a){
t(a||{

})
},n):t({

})
},a.utils=e,a.hasInitialised=!0,window.cookieconsent=a
}
}(window.cookieconsent||{

}),window.addEventListener("load",function(){
window.cookieconsent.initialise({
palette:{
popup:{
background:"#000000",text:"#ffffff"
},button:{
background:"#18bc9c",text:"#ffffff"
}
},position:"bottom-right",content:{
href:null
}
})
}),$(function(){
var a={
4:2,5:3,8:7,9:8,11:10,14:13,15:98,17:70,18:66,22:4,25:68,26:69,28:200,30:15,31:50,32:51,33:52
},e=0,t=s();function n(){
$.ajax({
dataType:"json",url:"https://truckersmp.krashnz.com/servers",success:function(e){
if(!e.error){
var t=0;for(var n in e.servers){
var s=e.servers[n],o=document.getElementById("server_players_"+a[s.id]);o&&(o.innerHTML=s.players.formatNumber(0)),t+=parseFloat(s.players)
}document.getElementById("server_players_99").innerHTML=t.formatNumber(0)
}
}
})
}function s(){
return Math.round((new Date).getTime()/1e3)
}function o(){
$.ajax({
dataType:"json",url:"https://truckersmp.krashnz.com/time",success:function(a){
if(!a.error){
var n=s(),o=a.fetch;e=parseInt(a.time),e+=Math.floor((n-o)/10),t=n,i(),setInterval(i,500)
}
}
})
}function i(){
s()-t>=10&&(e+=1,t=s());var a=60*(e-1),n=parseInt(a/3600)%24,o="0"+parseInt(a/60)%60,i=n>=12?"pm":"am";0==(n=n>12?n-12:n)&&(n="12"),document.getElementById("game-time").innerHTML=n+":"+o.substr(-2)+" "+i
}n(),setInterval(n,3e4),o(),setInterval(function(){
clearInterval(i),o()
},6e4)
}),$(function(){
function a(a,e,t){
var n="";if(t){
var s=new Date;s.setTime(s.getTime()+24*t*60*60*1e3),n="; expires="+s.toGMTString()
}document.cookie=a+"="+e+n+"; path=/"
}function e(a){
for(var e=a+"=",t=document.cookie.split(";"),n=0;n<t.length;n++){
for(var s=t[n];" "==s.charAt(0);)s=s.substring(1,s.length);if(0==s.indexOf(e))return s.substring(e.length,s.length)
}return null
}function t(e){
a(e,"",-1)
}var n={
map_color:"color",truck_color:"color",player_name_color:"color",city_name_color:"color",country_name_color:"color",heatmap:"checkbox",truck_face:"checkbox",truck_box:"checkbox",name_show:"checkbox",name_show_id:"checkbox",truck_vis_range:"slider"
};!function(){
for(var a in n){
var t=n[a],s=e(a);if(null!=s){
if("color"!=t&&"slider"!=t||(document.getElementById(a).value=s),"checkbox"==t){
var o=!1;"true"==s&&(o=!0),document.getElementById(a).checked=o
}
}else"checkbox"==t&&(document.getElementById(a).checked=!0)
}
}(),$("#settings_reset").click(function(){
!function(){
for(var a in n)t(a);location.reload()
}()
}),$("#map_color").on("input",function(){
a("map_color",$(this).val(),360)
}),$("#truck_color").on("input",function(){
a("truck_color",$(this).val(),360)
}),$("#player_name_color").on("input",function(){
a("player_name_color",$(this).val(),360)
}),$("#city_name_color").on("input",function(){
a("city_name_color",$(this).val(),360)
}),$("#country_name_color").on("input",function(){
a("country_name_color",$(this).val(),360)
}),$("#heatmap").change(function(){
a("heatmap",$(this).is(":checked"),360)
}),$("#truck_face").change(function(){
a("truck_face",$(this).is(":checked"),360)
}),$("#truck_box").change(function(){
a("truck_box",$(this).is(":checked"),360)
}),$("#name_show").change(function(){
a("name_show",$(this).is(":checked"),360)
}),$("#name_show_id").change(function(){
a("name_show_id",$(this).is(":checked"),360)
}),$("#truck_vis_range").change(function(){
a("truck_vis_range",$(this).val(),360)
})
}),function(a){
a.fn.extend({
donetyping:function(e,t){
t=t||500;var n,s=function(a){
n&&(n=null,e.call(a))
};return this.each(function(e,o){
var i=a(o);i.is(":input")&&i.on("keyup keypress paste",function(a){
("keyup"!=a.type||8==a.keyCode)&&(n&&clearTimeout(n),n=setTimeout(function(){
s(o)
},t))
}).on("blur",function(){
s(o)
})
})
}
})
}(jQuery);var url,oldValue="=^-^=";function searchLoad(){
url="https://tracker.ets2map.com/v3/playersearch",$("#player_search").donetyping(function(){
search($(this).val())
})
}function switchServers(a){
switch(a){
case 2:return"Simulation 1 (ETS2)";case 3:return"Simulation 2 (ETS2)";case 4:return"Simulation 3 (ETS2)";case 7:return"Arcade (ETS2)";case 9:return"Simulation (ATS)";case 10:return"[US] Simulation (ATS)";case 15:return"[US] Simulation (ETS2)";case 50:return"ProMods 1 (ETS2)";case 51:return"ProMods 2 (ETS2)";case 52:return"[US] ProMods (ETS2)";case 65:case 66:case 67:case 68:return"Event";default:return"Unknown Server"
}
}search=function(a){
a.toLowerCase()==oldValue.toLowerCase()||(0!==a.length?($("#search_results").show(),$.ajax({
type:"GET",url:url,data:{
string:a
},cache:!1,success:function(a){
if(a.Success){
var e='<li class="search-item search-sep">Results<div>0 matches</div></li>';if(null!==a.Data){
var t=a.Data.length,n=t+" matches";for(var s in 1==t&&(n="1 match"),t>=10&&(n="10 of "+t+" matches"),e='<li class="search-item search-sep">Results<div>'+n+"</div></li>",a.Data)if(s<=10){
var o=a.Data[s];e+='<li class="search-item">       <a href="javascript:findPlayer('+o.PlayerId+", "+o.X+", "+o.Y+", "+o.ServerId+');" tabindex="-1">           <div class="search-name">'+o.Name+" ("+o.MpId+')</div>           <div class="search-details">'+switchServers(o.ServerId)+" - "+o.PlayerId+"</div>       </a>    </li>"
}
}$("#search_list").html(e)
}else console.log("Something when wrong...",a)
}
})):$("#search_results").hide()),oldValue=a
},searchFollow=function(a){
0!==a.length&&isNumeric(a)&&(a=parseInt(a),$.ajax({
type:"GET",url:url,data:{
string:a
},cache:!1,success:function(e){
var t=!1;if(e.Success){
if(null!==e.Data)for(var n in console.log("Looking for user with TMP ID:",a),e.Data){
var s=e.Data[n];a==s.MpId&&(t=!0,findPlayer(s.PlayerId,s.X,s.Y,s.ServerId))
}
}else console.log("Something when wrong trying to follow the user...",e),$("#offline_msg_text").html('<i class="fas fa-exclamation-triangle"></i> Something when wrong trying to follow the user. Please try again.'),$("#offline_msg").show();t||(console.log("Unable to find user online with TMP ID:",a),$("#offline_msg_text").html('<i class="fas fa-exclamation-triangle"></i> Unable to find user online with TruckersMP ID: <b>'+a+"</b>"),$("#offline_msg").show())
}
}))
},$(function(){
searchLoad();var a=getParameterByName("follow");null!==a&&searchFollow(a);var e=getParameterByName("x"),t=getParameterByName("y"),n=getParameterByName("zoom");null!==e&&null!==t&&GoToCoordinate(e,t,null!==n?n:1)
});var debug=!1,debugCenter=!1,screenWidth=500,screenHeight=500,zoom,tileSize=249.9,offsetX=-10,offsetY=-18,imageCoords=1e3,cameraX,cameraY,elemLeft,elemTop,heatmap,displayHeatmap=!1,serverID,isGame="ETS2",tiles,trucks,stats,pois,poitypes,ctx,c,isClicking=[];isClicking[0]=!1,isClicking[1]=!1;var mXOld=[],mYOld=[],mouseX,mouseY,xVel=0,yVel=0,lastJSONPullTime=(new Date).getTime(),lastJSONStatPullTime=(new Date).getTime(),lastUpdateTime=(new Date).getTime(),truckClicked,previousClicked,fetchingPlayerData=0,poiClicked,currentZoomLevel=1,isDragging=!1,xmlHttp=[],intervalId,images=[],images_ats=[],playerCheck;function getCurrentZoomLevel(){
var a=1;return screenWidth/(tileSize*Math.pow(3,a-1)*zoom)>10&&a++,screenWidth/(tileSize*Math.pow(3,a-1)*zoom)>10&&a++,screenWidth/(tileSize*Math.pow(3,a-1)*zoom)>10&&a++,a
}function Tile(a,e,t,n){
this.set=function(a,e){
null!=a&&null!=e&&(this.x=a,this.y=e),t&&(this.path=t),n&&(this.zoomLevel=n),this.imageData=null
},this.set(a,e),this.draw=function(a){
var e=(o=coordToScreen(this.x,this.y,0,0,!1)).x,n=o.y;if(e+tileSize*zoom*Math.pow(3,this.zoomLevel-1)>0&&e-tileSize*zoom*Math.pow(3,this.zoomLevel-1)<screenWidth&&n+tileSize*zoom*Math.pow(3,this.zoomLevel-1)>0&&n-tileSize*zoom*Math.pow(3,this.zoomLevel-1)<screenHeight){
if(currentZoomLevel==this.zoomLevel){
if(!this.imageData){
var s=new Image;s.src=t,this.imageData=s
}
}else delete this.imageData,this.imageData=null;try{
if(null!=this.imageData){
var o=coordToScreen(this.x,this.y,tileSize*Math.pow(3,this.zoomLevel-1),tileSize*Math.pow(3,this.zoomLevel-1),!1);a.drawImage(this.imageData,o.x,o.y,tileSize*zoom*Math.pow(3,this.zoomLevel-1),tileSize*zoom*Math.pow(3,this.zoomLevel-1))
}
}catch(a){
delete this.imageData,this.imageData=null
}
}else delete this.imageData,this.imageData=null
}
}function images_load(){
var a=[{
name:"truck",path:"https://ets2map.com/mapicons/truck.png"
},{
name:"radar",path:"https://ets2map.com/mapicons/radar.png"
},{
name:"fuel",path:"https://ets2map.com/mapicons/ets2/map/gas_ico.png"
},{
name:"parking",path:"https://ets2map.com/mapicons/ets2/map/parking_ico.png"
},{
name:"service",path:"https://ets2map.com/mapicons/ets2/map/service_ico.png"
},{
name:"garage",path:"https://ets2map.com/mapicons/ets2/map/garage_free_ico.png"
},{
name:"recruitment",path:"https://ets2map.com/mapicons/ets2/map/recruitment_ico.png"
},{
name:"train",path:"https://ets2map.com/mapicons/ets2/road/road_train_ico.png"
},{
name:"port",path:"https://ets2map.com/mapicons/ets2/road/road_port_overlay.png"
},{
name:"business_stokes",path:"https://ets2map.com/mapicons/ets2/companies/stokes.png"
},{
name:"business_trameri",path:"https://ets2map.com/mapicons/ets2/companies/trameri.png"
},{
name:"business_euroacres",path:"https://ets2map.com/mapicons/ets2/companies/euroacres.png"
},{
name:"business_sanbuilders",path:"https://ets2map.com/mapicons/ets2/companies/sanbuilders.png"
},{
name:"business_bcp",path:"https://ets2map.com/mapicons/ets2/companies/bcp.png"
},{
name:"business_kaarfor",path:"https://ets2map.com/mapicons/ets2/companies/kaarfor.png"
},{
name:"business_wgcc",path:"https://ets2map.com/mapicons/ets2/companies/wgcc.png"
},{
name:"business_eurogoodies",path:"https://ets2map.com/mapicons/ets2/companies/eurogoodies.png"
},{
name:"business_tree_et",path:"https://ets2map.com/mapicons/ets2/companies/tree_et.png"
},{
name:"business_road_quarry",path:"https://ets2map.com/mapicons/ets2/road/road_quarry.png"
},{
name:"business_polarislines",path:"https://ets2map.com/mapicons/ets2/companies/polarislines.png"
},{
name:"business_posped",path:"https://ets2map.com/mapicons/ets2/companies/posped.png"
},{
name:"business_sellplan",path:"https://ets2map.com/mapicons/ets2/companies/sellplan.png"
},{
name:"business_lkwlog",path:"https://ets2map.com/mapicons/ets2/companies/lkwlog.png"
},{
name:"business_fcp",path:"https://ets2map.com/mapicons/ets2/companies/fcp.png"
},{
name:"business_itcc",path:"https://ets2map.com/mapicons/ets2/companies/itcc.png"
},{
name:"business_tradeaux",path:"https://ets2map.com/mapicons/ets2/companies/tradeaux.png"
},{
name:"business_transinet",path:"https://ets2map.com/mapicons/ets2/companies/transinet.png"
},{
name:"business_nbfc",path:"https://ets2map.com/mapicons/ets2/companies/nbfc.png"
},{
name:"business_skoda",path:"https://ets2map.com/mapicons/ets2/companies/skoda.png"
},{
name:"business_zelenye",path:"https://ets2map.com/mapicons/ets2/companies/zelenye.png"
},{
name:"business_ini",path:"https://ets2map.com/mapicons/ets2/companies/ini.png"
},{
name:"business_scania",path:"https://ets2map.com/mapicons/ets2/companies/scania.png"
},{
name:"business_spinelli",path:"https://ets2map.com/mapicons/ets2/companies/spinelli.png"
},{
name:"business_aci",path:"https://ets2map.com/mapicons/ets2/companies/aci.png"
},{
name:"business_ika_bohag",path:"https://ets2map.com/mapicons/ets2/companies/ika_bohag.png"
},{
name:"business_cargotras",path:"https://ets2map.com/mapicons/ets2/companies/cargotras.png"
},{
name:"business_cesare_smar",path:"https://ets2map.com/mapicons/ets2/companies/cesare_smar.png"
},{
name:"business_piac",path:"https://ets2map.com/mapicons/ets2/companies/piac.png"
},{
name:"business_tesore_gust",path:"https://ets2map.com/mapicons/ets2/companies/tesore_gust.png"
},{
name:"business_libellula",path:"https://ets2map.com/mapicons/ets2/companies/libellula.png"
},{
name:"business_tras_med",path:"https://ets2map.com/mapicons/ets2/companies/tras_med.png"
},{
name:"business_marina_it",path:"https://ets2map.com/mapicons/ets2/companies/marina_it.png"
},{
name:"business_cont_port_it",path:"https://ets2map.com/mapicons/ets2/companies/cont_port_it.png"
},{
name:"business_costruzi",path:"https://ets2map.com/mapicons/ets2/companies/costruzi.png"
},{
name:"business_volvo",path:"https://ets2map.com/mapicons/ets2/companies/volvo.png"
},{
name:"business_fle",path:"https://ets2map.com/mapicons/ets2/companies/fle.png"
},{
name:"business_batisse",path:"https://ets2map.com/mapicons/ets2/companies/batisse.png"
},{
name:"business_bhv",path:"https://ets2map.com/mapicons/ets2/companies/bhv.png"
},{
name:"business_lisette_log",path:"https://ets2map.com/mapicons/ets2/companies/lisette_log.png"
},{
name:"business_voitureux",path:"https://ets2map.com/mapicons/ets2/companies/voitureux.png"
},{
name:"business_boisserie",path:"https://ets2map.com/mapicons/ets2/companies/boisserie.png"
},{
name:"business_suprema_ru",path:"https://ets2map.com/mapicons/ets2/companies/suprema_ru.png"
},{
name:"business_rosmark_ru",path:"https://ets2map.com/mapicons/ets2/companies/rosmark_ru.png"
},{
name:"business_cemelt_fl_ru",path:"https://ets2map.com/mapicons/ets2/companies/cemelt_fl_ru.png"
},{
name:"business_ladoga_ru",path:"https://ets2map.com/mapicons/ets2/companies/ladoga_ru.png"
},{
name:"business_pk_medved_ru",path:"https://ets2map.com/mapicons/ets2/companies/pk_medved_ru.png"
},{
name:"business_ns_oil_ru",path:"https://ets2map.com/mapicons/ets2/companies/ns_oil_ru.png"
},{
name:"business_cont_port",path:"https://ets2map.com/mapicons/ets2/companies/cont_port.png"
},{
name:"business_ns_oil",path:"https://ets2map.com/mapicons/ets2/companies/ns_oil.png"
},{
name:"business_bltmetal",path:"https://ets2map.com/mapicons/ets2/companies/bltmetal.png"
},{
name:"business_rosmark",path:"https://ets2map.com/mapicons/ets2/companies/rosmark.png"
},{
name:"business_ibp",path:"https://ets2map.com/mapicons/ets2/companies/ibp.png"
},{
name:"business_ladoga",path:"https://ets2map.com/mapicons/ets2/companies/ladoga.png"
},{
name:"business_sal_fi",path:"https://ets2map.com/mapicons/ets2/companies/sal_fi.png"
},{
name:"business_ukko",path:"https://ets2map.com/mapicons/ets2/companies/ukko.png"
},{
name:"business_ns_chem",path:"https://ets2map.com/mapicons/ets2/companies/ns_chem.png"
},{
name:"business_lintukainen",path:"https://ets2map.com/mapicons/ets2/companies/lintukainen.png"
},{
name:"business_baltomorsk",path:"https://ets2map.com/mapicons/ets2/companies/baltomorsk.png"
},{
name:"business_cemelt_win",path:"https://ets2map.com/mapicons/ets2/companies/cemelt_win.png"
},{
name:"business_gnt",path:"https://ets2map.com/mapicons/ets2/companies/gnt.png"
},{
name:"business_nosko",path:"https://ets2map.com/mapicons/ets2/companies/nosko.png"
},{
name:"business_eviksi",path:"https://ets2map.com/mapicons/ets2/companies/eviksi.png"
},{
name:"business_blt_yacht",path:"https://ets2map.com/mapicons/ets2/companies/blt_yacht.png"
},{
name:"business_aerobalt",path:"https://ets2map.com/mapicons/ets2/companies/aerobalt.png"
},{
name:"business_kivi",path:"https://ets2map.com/mapicons/ets2/companies/kivi.png"
},{
name:"business_renar",path:"https://ets2map.com/mapicons/ets2/companies/renar.png"
},{
name:"business_nch",path:"https://ets2map.com/mapicons/ets2/companies/nch.png"
},{
name:"business_viljo_paper",path:"https://ets2map.com/mapicons/ets2/companies/viljo_paper.png"
},{
name:"business_fintyre",path:"https://ets2map.com/mapicons/ets2/companies/fintyre.png"
},{
name:"business_radus",path:"https://ets2map.com/mapicons/ets2/companies/radus.png"
},{
name:"business_blt",path:"https://ets2map.com/mapicons/ets2/companies/blt.png"
},{
name:"business_renat",path:"https://ets2map.com/mapicons/ets2/companies/renat.png"
},{
name:"business_onnelik",path:"https://ets2map.com/mapicons/ets2/companies/onnelik.png"
},{
name:"business_egres",path:"https://ets2map.com/mapicons/ets2/companies/egres.png"
},{
name:"business_suprema",path:"https://ets2map.com/mapicons/ets2/companies/suprema.png"
},{
name:"business_lvr",path:"https://ets2map.com/mapicons/ets2/companies/lvr.png"
},{
name:"business_lateds",path:"https://ets2map.com/mapicons/ets2/companies/lateds.png"
},{
name:"business_ateria",path:"https://ets2map.com/mapicons/ets2/companies/ateria.png"
},{
name:"business_viln_paper",path:"https://ets2map.com/mapicons/ets2/companies/viln_paper.png"
},{
name:"business_agrominta",path:"https://ets2map.com/mapicons/ets2/companies/agrominta.png"
},{
name:"business_domdepo",path:"https://ets2map.com/mapicons/ets2/companies/domdepo.png"
},{
name:"business_ee_paper",path:"https://ets2map.com/mapicons/ets2/companies/ee_paper.png"
},{
name:"business_baltomors_ru",path:"https://ets2map.com/mapicons/ets2/companies/baltomors_ru.png"
},{
name:"business_severoatm_ru",path:"https://ets2map.com/mapicons/ets2/companies/severoatm_ru.png"
},{
name:"business_domdepo_ru",path:"https://ets2map.com/mapicons/ets2/companies/domdepo_ru.png"
},{
name:"business_kamen_ru",path:"https://ets2map.com/mapicons/ets2/companies/kamen_ru.png"
},{
name:"business_bltmetal_ru",path:"https://ets2map.com/mapicons/ets2/companies/bltmetal_ru.png"
},{
name:"business_blt_ru",path:"https://ets2map.com/mapicons/ets2/companies/blt_ru.png"
},{
name:"business_blt_yacht_ru",path:"https://ets2map.com/mapicons/ets2/companies/blt_yacht_ru.png"
},{
name:"business_cont_port_ru",path:"https://ets2map.com/mapicons/ets2/companies/cont_port_ru.png"
},{
name:"business_aerobalt_ru",path:"https://ets2map.com/mapicons/ets2/companies/aerobalt_ru.png"
},{
name:"business_ns_chem_ru",path:"https://ets2map.com/mapicons/ets2/companies/ns_chem_ru.png"
},{
name:"business_nch_ru",path:"https://ets2map.com/mapicons/ets2/companies/nch_ru.png"
},{
name:"business_fintyre_ru",path:"https://ets2map.com/mapicons/ets2/companies/fintyre_ru.png"
},{
name:"business_ika_ru",path:"https://ets2map.com/mapicons/ets2/companies/ika_ru.png"
},{
name:"business_radus_ru",path:"https://ets2map.com/mapicons/ets2/companies/radus_ru.png"
},{
name:"business_mvm_carriere",path:"https://ets2map.com/mapicons/ets2/companies/mvm_carriere.png"
},{
name:"business_dans_jardin",path:"https://ets2map.com/mapicons/ets2/companies/dans_jardin.png"
},{
name:"business_eco",path:"https://ets2map.com/mapicons/ets2/companies/eco.png"
},{
name:"business_port_de_conteneur",path:"https://ets2map.com/mapicons/ets2/companies/port_de_conteneur.png"
},{
name:"business_wilnet_trans",path:"https://ets2map.com/mapicons/ets2/companies/wilnet_trans.png"
},{
name:"business_nucleon",path:"https://ets2map.com/mapicons/ets2/companies/nucleon.png"
},{
name:"business_marina_fr",path:"https://ets2map.com/mapicons/ets2/companies/marina_fr.png"
},{
name:"business_chimi",path:"https://ets2map.com/mapicons/ets2/companies/chimi.png"
},{
name:"business_bhb_raffin",path:"https://ets2map.com/mapicons/ets2/companies/bhb_raffin.png"
},{
name:"business_gomme_monde",path:"https://ets2map.com/mapicons/ets2/companies/gomme_monde.png"
},{
name:"business_nos_pat",path:"https://ets2map.com/mapicons/ets2/companies/nos_pat.png"
},{
name:"business_subse",path:"https://ets2map.com/mapicons/ets2/companies/subse.png"
},{
name:"business_globeur",path:"https://ets2map.com/mapicons/ets2/companies/globeur.png"
},{
name:"business_huilant",path:"https://ets2map.com/mapicons/ets2/companies/huilant.png"
},{
name:"business_gallia_ferry",path:"https://ets2map.com/mapicons/ets2/companies/gallia_ferry.png"
},{
name:"business_exomar",path:"https://ets2map.com/mapicons/ets2/companies/exomar.png"
},{
name:"business_pp_chimica",path:"https://ets2map.com/mapicons/ets2/companies/pp_chimica.png"
},{
name:"business_te_logistica",path:"https://ets2map.com/mapicons/ets2/companies/te_logistica.png"
},{
name:"business_fui",path:"https://ets2map.com/mapicons/ets2/companies/fui.png"
},{
name:"business_acc",path:"https://ets2map.com/mapicons/ets2/companies/acc.png"
},{
name:"business_aaa",path:"https://ets2map.com/mapicons/ets2/companies/aaa.png"
},{
name:"business_c_navale",path:"https://ets2map.com/mapicons/ets2/companies/c_navale.png"
},{
name:"business_cnp",path:"https://ets2map.com/mapicons/ets2/companies/cnp.png"
},{
name:"business_sal",path:"https://ets2map.com/mapicons/ets2/companies/sal.png"
},{
name:"business_fattoria_f",path:"https://ets2map.com/mapicons/ets2/companies/fattoria_f.png"
},{
name:"business_eolo_lines",path:"https://ets2map.com/mapicons/ets2/companies/eolo_lines.png"
},{
name:"business_marmo",path:"https://ets2map.com/mapicons/ets2/companies/marmo.png"
},{
name:"business_quadrelli",path:"https://ets2map.com/mapicons/ets2/companies/quadrelli.png"
},{
name:"business_vitas_pwr",path:"https://ets2map.com/mapicons/ets2/companies/vitas_pwr.png"
},{
name:"business_comoto",path:"https://ets2map.com/mapicons/ets2/companies/comoto.png"
},{
name:"business_drekkar",path:"https://ets2map.com/mapicons/ets2/companies/drekkar.png"
},{
name:"business_norr_food",path:"https://ets2map.com/mapicons/ets2/companies/norr_food.png"
},{
name:"business_nord_crown",path:"https://ets2map.com/mapicons/ets2/companies/nord_crown.png"
},{
name:"business_norrsken",path:"https://ets2map.com/mapicons/ets2/companies/norrsken.png"
},{
name:"business_polar_fish",path:"https://ets2map.com/mapicons/ets2/companies/polar_fish.png"
},{
name:"business_sag_tre",path:"https://ets2map.com/mapicons/ets2/companies/sag_tre.png"
},{
name:"business_ms_stein",path:"https://ets2map.com/mapicons/ets2/companies/ms_stein.png"
},{
name:"business_marina",path:"https://ets2map.com/mapicons/ets2/companies/marina.png"
},{
name:"business_konstnr",path:"https://ets2map.com/mapicons/ets2/companies/konstnr.png"
},{
name:"business_agronord",path:"https://ets2map.com/mapicons/ets2/companies/agronord.png"
},{
name:"business_vpc",path:"https://ets2map.com/mapicons/ets2/companies/vpc.png"
},{
name:"business_aria_food",path:"https://ets2map.com/mapicons/ets2/companies/aria_food.png"
},{
name:"business_bjork",path:"https://ets2map.com/mapicons/ets2/companies/bjork.png"
},{
name:"business_nord_sten",path:"https://ets2map.com/mapicons/ets2/companies/nord_sten.png"
},{
name:"road_d_a3",path:"https://ets2map.com/mapicons/ets2/road/road_d_a3.png"
},{
name:"road_d_a9",path:"https://ets2map.com/mapicons/ets2/road/road_d_a9.png"
},{
name:"road_d_a6",path:"https://ets2map.com/mapicons/ets2/road/road_d_a6.png"
},{
name:"road_d_a99",path:"https://ets2map.com/mapicons/ets2/road/road_d_a99.png"
},{
name:"road_at_a12",path:"https://ets2map.com/mapicons/ets2/road/road_at_a12.png"
},{
name:"road_at_a13",path:"https://ets2map.com/mapicons/ets2/road/road_at_a13.png"
},{
name:"road_toll_ico",path:"https://ets2map.com/mapicons/ets2/road/road_toll_ico.png"
},{
name:"road_it_a22",path:"https://ets2map.com/mapicons/ets2/road/road_it_a22.png"
},{
name:"road_it_a4",path:"https://ets2map.com/mapicons/ets2/road/road_it_a4.png"
},{
name:"road_it_a13",path:"https://ets2map.com/mapicons/ets2/road/road_it_a13.png"
},{
name:"road_d_a4",path:"https://ets2map.com/mapicons/ets2/road/road_d_a4.png"
},{
name:"road_d_a71",path:"https://ets2map.com/mapicons/ets2/road/road_d_a71.png"
},{
name:"road_d_a2",path:"https://ets2map.com/mapicons/ets2/road/road_d_a2.png"
},{
name:"road_d_a24",path:"https://ets2map.com/mapicons/ets2/road/road_d_a24.png"
},{
name:"road_d_a1",path:"https://ets2map.com/mapicons/ets2/road/road_d_a1.png"
},{
name:"road_d_a20",path:"https://ets2map.com/mapicons/ets2/road/road_d_a20.png"
},{
name:"parking_ico",path:"https://ets2map.com/mapicons/ets2/map/parking_ico.png"
},{
name:"road_d_a8",path:"https://ets2map.com/mapicons/ets2/road/road_d_a8.png"
},{
name:"road_d_a93",path:"https://ets2map.com/mapicons/ets2/road/road_d_a93.png"
},{
name:"road_d_a38",path:"https://ets2map.com/mapicons/ets2/road/road_d_a38.png"
},{
name:"road_d_a19",path:"https://ets2map.com/mapicons/ets2/road/road_d_a19.png"
},{
name:"road_cz_5",path:"https://ets2map.com/mapicons/ets2/road/road_cz_5.png"
},{
name:"road_at_a1",path:"https://ets2map.com/mapicons/ets2/road/road_at_a1.png"
},{
name:"road_at_a8",path:"https://ets2map.com/mapicons/ets2/road/road_at_a8.png"
},{
name:"road_at_a2",path:"https://ets2map.com/mapicons/ets2/road/road_at_a2.png"
},{
name:"road_at_a10",path:"https://ets2map.com/mapicons/ets2/road/road_at_a10.png"
},{
name:"road_it_a23",path:"https://ets2map.com/mapicons/ets2/road/road_it_a23.png"
},{
name:"road_d_a17",path:"https://ets2map.com/mapicons/ets2/road/road_d_a17.png"
},{
name:"road_d_a13",path:"https://ets2map.com/mapicons/ets2/road/road_d_a13.png"
},{
name:"road_d_a10",path:"https://ets2map.com/mapicons/ets2/road/road_d_a10.png"
},{
name:"road_cz_10_b",path:"https://ets2map.com/mapicons/ets2/road/road_cz_10_b.png"
},{
name:"road_cz_8",path:"https://ets2map.com/mapicons/ets2/road/road_cz_8.png"
},{
name:"road_cz_1_b",path:"https://ets2map.com/mapicons/ets2/road/road_cz_1_b.png"
},{
name:"road_at_a9",path:"https://ets2map.com/mapicons/ets2/road/road_at_a9.png"
},{
name:"road_d_a12",path:"https://ets2map.com/mapicons/ets2/road/road_d_a12.png"
},{
name:"road_d_a11",path:"https://ets2map.com/mapicons/ets2/road/road_d_a11.png"
},{
name:"road_cz_11",path:"https://ets2map.com/mapicons/ets2/road/road_cz_11.png"
},{
name:"road_cz_1",path:"https://ets2map.com/mapicons/ets2/road/road_cz_1.png"
},{
name:"road_at_a21",path:"https://ets2map.com/mapicons/ets2/road/road_at_a21.png"
},{
name:"road_pl_a4",path:"https://ets2map.com/mapicons/ets2/road/road_pl_a4.png"
},{
name:"road_pl_a2",path:"https://ets2map.com/mapicons/ets2/road/road_pl_a2.png"
},{
name:"road_cz_2",path:"https://ets2map.com/mapicons/ets2/road/road_cz_2.png"
},{
name:"road_at_a4",path:"https://ets2map.com/mapicons/ets2/road/road_at_a4.png"
},{
name:"road_at_a6",path:"https://ets2map.com/mapicons/ets2/road/road_at_a6.png"
},{
name:"road_sk_r1",path:"https://ets2map.com/mapicons/ets2/road/road_sk_r1.png"
},{
name:"road_cz_4",path:"https://ets2map.com/mapicons/ets2/road/road_cz_4.png"
},{
name:"road_hu_m1",path:"https://ets2map.com/mapicons/ets2/road/road_hu_m1.png"
},{
name:"road_hu_m15",path:"https://ets2map.com/mapicons/ets2/road/road_hu_m15.png"
},{
name:"road_pl_s8",path:"https://ets2map.com/mapicons/ets2/road/road_pl_s8.png"
},{
name:"road_ru_a229",path:"https://ets2map.com/mapicons/ets2/road/road_ru_a229.png"
},{
name:"road_lt_a5",path:"https://ets2map.com/mapicons/ets2/road/road_lt_a5.png"
},{
name:"road_pl_8",path:"https://ets2map.com/mapicons/ets2/road/road_pl_8.png"
},{
name:"road_lt_a7",path:"https://ets2map.com/mapicons/ets2/road/road_lt_a7.png"
},{
name:"road_pl_16",path:"https://ets2map.com/mapicons/ets2/road/road_pl_16.png"
},{
name:"road_border_ico",path:"https://ets2map.com/mapicons/ets2/road/road_border_ico.png"
},{
name:"road_d_a96",path:"https://ets2map.com/mapicons/ets2/road/road_d_a96.png"
},{
name:"road_at_a14",path:"https://ets2map.com/mapicons/ets2/road/road_at_a14.png"
},{
name:"road_at_s16",path:"https://ets2map.com/mapicons/ets2/road/road_at_s16.png"
},{
name:"road_d_a7",path:"https://ets2map.com/mapicons/ets2/road/road_d_a7.png"
},{
name:"road_d_a215",path:"https://ets2map.com/mapicons/ets2/road/road_d_a215.png"
},{
name:"road_d_a210",path:"https://ets2map.com/mapicons/ets2/road/road_d_a210.png"
},{
name:"road_d_a5",path:"https://ets2map.com/mapicons/ets2/road/road_d_a5.png"
},{
name:"road_d_a661",path:"https://ets2map.com/mapicons/ets2/road/road_d_a661.png"
},{
name:"road_d_a81",path:"https://ets2map.com/mapicons/ets2/road/road_d_a81.png"
},{
name:"road_ch_1",path:"https://ets2map.com/mapicons/ets2/road/road_ch_1.png"
},{
name:"road_ch_4",path:"https://ets2map.com/mapicons/ets2/road/road_ch_4.png"
},{
name:"road_ch_2",path:"https://ets2map.com/mapicons/ets2/road/road_ch_2.png"
},{
name:"road_it_a9",path:"https://ets2map.com/mapicons/ets2/road/road_it_a9.png"
},{
name:"road_it_a7",path:"https://ets2map.com/mapicons/ets2/road/road_it_a7.png"
},{
name:"road_it_a51",path:"https://ets2map.com/mapicons/ets2/road/road_it_a51.png"
},{
name:"road_it_a50",path:"https://ets2map.com/mapicons/ets2/road/road_it_a50.png"
},{
name:"road_it_a1",path:"https://ets2map.com/mapicons/ets2/road/road_it_a1.png"
},{
name:"road_it_a12",path:"https://ets2map.com/mapicons/ets2/road/road_it_a12.png"
},{
name:"road_d_a28",path:"https://ets2map.com/mapicons/ets2/road/road_d_a28.png"
},{
name:"road_fr_a4",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a4.png"
},{
name:"road_ch_3",path:"https://ets2map.com/mapicons/ets2/road/road_ch_3.png"
},{
name:"road_it_a6",path:"https://ets2map.com/mapicons/ets2/road/road_it_a6.png"
},{
name:"road_it_a21",path:"https://ets2map.com/mapicons/ets2/road/road_it_a21.png"
},{
name:"road_it_a10",path:"https://ets2map.com/mapicons/ets2/road/road_it_a10.png"
},{
name:"road_d_a45",path:"https://ets2map.com/mapicons/ets2/road/road_d_a45.png"
},{
name:"road_d_a30",path:"https://ets2map.com/mapicons/ets2/road/road_d_a30.png"
},{
name:"road_d_a31",path:"https://ets2map.com/mapicons/ets2/road/road_d_a31.png"
},{
name:"road_nl_a7",path:"https://ets2map.com/mapicons/ets2/road/road_nl_a7.png"
},{
name:"road_fr_a31",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a31.png"
},{
name:"road_fr_a36",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a36.png"
},{
name:"road_fr_a35",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a35.png"
},{
name:"road_it_a55",path:"https://ets2map.com/mapicons/ets2/road/road_it_a55.png"
},{
name:"road_it_a32",path:"https://ets2map.com/mapicons/ets2/road/road_it_a32.png"
},{
name:"road_d_a61",path:"https://ets2map.com/mapicons/ets2/road/road_d_a61.png"
},{
name:"road_nl_a73",path:"https://ets2map.com/mapicons/ets2/road/road_nl_a73.png"
},{
name:"road_nl_a1",path:"https://ets2map.com/mapicons/ets2/road/road_nl_a1.png"
},{
name:"road_b_a4",path:"https://ets2map.com/mapicons/ets2/road/road_b_a4.png"
},{
name:"road_l_a6",path:"https://ets2map.com/mapicons/ets2/road/road_l_a6.png"
},{
name:"road_l_a3",path:"https://ets2map.com/mapicons/ets2/road/road_l_a3.png"
},{
name:"road_fr_a41",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a41.png"
},{
name:"road_fr_a43",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a43.png"
},{
name:"road_b_a3",path:"https://ets2map.com/mapicons/ets2/road/road_b_a3.png"
},{
name:"road_b_a15",path:"https://ets2map.com/mapicons/ets2/road/road_b_a15.png"
},{
name:"road_nl_a16",path:"https://ets2map.com/mapicons/ets2/road/road_nl_a16.png"
},{
name:"road_nl_a9",path:"https://ets2map.com/mapicons/ets2/road/road_nl_a9.png"
},{
name:"road_nl_a10",path:"https://ets2map.com/mapicons/ets2/road/road_nl_a10.png"
},{
name:"road_nl_a50",path:"https://ets2map.com/mapicons/ets2/road/road_nl_a50.png"
},{
name:"road_fr_a311",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a311.png"
},{
name:"road_fr_a6",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a6.png"
},{
name:"road_b_a7",path:"https://ets2map.com/mapicons/ets2/road/road_b_a7.png"
},{
name:"road_b_a1",path:"https://ets2map.com/mapicons/ets2/road/road_b_a1.png"
},{
name:"road_nl_a15",path:"https://ets2map.com/mapicons/ets2/road/road_nl_a15.png"
},{
name:"road_nl_a4",path:"https://ets2map.com/mapicons/ets2/road/road_nl_a4.png"
},{
name:"road_fr_a26",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a26.png"
},{
name:"road_fr_a29",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a29.png"
},{
name:"road_fr_a47",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a47.png"
},{
name:"road_fr_a89",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a89.png"
},{
name:"road_fr_a72",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a72.png"
},{
name:"road_fr_a25",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a25.png"
},{
name:"road_fr_a2",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a2.png"
},{
name:"road_fr_a23",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a23.png"
},{
name:"road_fr_a1",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a1.png"
},{
name:"road_fr_a16",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a16.png"
},{
name:"road_fr_a3",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a3.png"
},{
name:"road_fr_a104",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a104.png"
},{
name:"road_fr_a28",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a28.png"
},{
name:"road_fr_a13",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a13.png"
},{
name:"road_fr_a10",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a10.png"
},{
name:"road_fr_a11",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a11.png"
},{
name:"road_uk_a20",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a20.png"
},{
name:"road_uk_a2",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a2.png"
},{
name:"road_uk_a120",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a120.png"
},{
name:"road_uk_a12",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a12.png"
},{
name:"road_uk_a14",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a14.png"
},{
name:"road_uk_a259",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a259.png"
},{
name:"road_uk_m2",path:"https://ets2map.com/mapicons/ets2/road/road_uk_m2.png"
},{
name:"road_uk_m25",path:"https://ets2map.com/mapicons/ets2/road/road_uk_m25.png"
},{
name:"road_uk_m11",path:"https://ets2map.com/mapicons/ets2/road/road_uk_m11.png"
},{
name:"road_uk_a1",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a1.png"
},{
name:"road_uk_m180",path:"https://ets2map.com/mapicons/ets2/road/road_uk_m180.png"
},{
name:"road_uk_a180",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a180.png"
},{
name:"road_uk_a63",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a63.png"
},{
name:"road_uk_a15",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a15.png"
},{
name:"road_uk_a27",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a27.png"
},{
name:"road_uk_m4",path:"https://ets2map.com/mapicons/ets2/road/road_uk_m4.png"
},{
name:"road_uk_m1",path:"https://ets2map.com/mapicons/ets2/road/road_uk_m1.png"
},{
name:"road_uk_m18",path:"https://ets2map.com/mapicons/ets2/road/road_uk_m18.png"
},{
name:"road_uk_m62",path:"https://ets2map.com/mapicons/ets2/road/road_uk_m62.png"
},{
name:"road_uk_a1ylw",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a1ylw.png"
},{
name:"road_uk_a696",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a696.png"
},{
name:"road_uk_a68",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a68.png"
},{
name:"road_uk_m27",path:"https://ets2map.com/mapicons/ets2/road/road_uk_m27.png"
},{
name:"road_uk_m3",path:"https://ets2map.com/mapicons/ets2/road/road_uk_m3.png"
},{
name:"road_uk_m5",path:"https://ets2map.com/mapicons/ets2/road/road_uk_m5.png"
},{
name:"road_uk_m6",path:"https://ets2map.com/mapicons/ets2/road/road_uk_m6.png"
},{
name:"road_uk_m56",path:"https://ets2map.com/mapicons/ets2/road/road_uk_m56.png"
},{
name:"road_uk_m74",path:"https://ets2map.com/mapicons/ets2/road/road_uk_m74.png"
},{
name:"road_uk_a720",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a720.png"
},{
name:"road_uk_m8",path:"https://ets2map.com/mapicons/ets2/road/road_uk_m8.png"
},{
name:"road_uk_m90",path:"https://ets2map.com/mapicons/ets2/road/road_uk_m90.png"
},{
name:"road_uk_a9",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a9.png"
},{
name:"road_uk_a35",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a35.png"
},{
name:"road_uk_a31",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a31.png"
},{
name:"road_uk_a483",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a483.png"
},{
name:"road_uk_m53",path:"https://ets2map.com/mapicons/ets2/road/road_uk_m53.png"
},{
name:"road_uk_a80",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a80.png"
},{
name:"road_uk_a30",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a30.png"
},{
name:"road_uk_a38",path:"https://ets2map.com/mapicons/ets2/road/road_uk_a38.png"
},{
name:"road_pl_22",path:"https://ets2map.com/mapicons/ets2/road/road_pl_22.png"
},{
name:"road_ru_a195",path:"https://ets2map.com/mapicons/ets2/road/road_ru_a195.png"
},{
name:"road_fi_8",path:"https://ets2map.com/mapicons/ets2/road/road_fi_8.png"
},{
name:"road_fi_40",path:"https://ets2map.com/mapicons/ets2/road/road_fi_40.png"
},{
name:"road_fi_2",path:"https://ets2map.com/mapicons/ets2/road/road_fi_2.png"
},{
name:"road_fi_11",path:"https://ets2map.com/mapicons/ets2/road/road_fi_11.png"
},{
name:"road_ru_a216",path:"https://ets2map.com/mapicons/ets2/road/road_ru_a216.png"
},{
name:"road_lt_a13",path:"https://ets2map.com/mapicons/ets2/road/road_lt_a13.png"
},{
name:"road_lt_a11",path:"https://ets2map.com/mapicons/ets2/road/road_lt_a11.png"
},{
name:"road_lt_a1",path:"https://ets2map.com/mapicons/ets2/road/road_lt_a1.png"
},{
name:"road_lv_a9",path:"https://ets2map.com/mapicons/ets2/road/road_lv_a9.png"
},{
name:"road_lv_a11",path:"https://ets2map.com/mapicons/ets2/road/road_lv_a11.png"
},{
name:"road_lv_a10",path:"https://ets2map.com/mapicons/ets2/road/road_lv_a10.png"
},{
name:"road_fi_1",path:"https://ets2map.com/mapicons/ets2/road/road_fi_1.png"
},{
name:"road_fi_9",path:"https://ets2map.com/mapicons/ets2/road/road_fi_9.png"
},{
name:"road_fi_41",path:"https://ets2map.com/mapicons/ets2/road/road_fi_41.png"
},{
name:"road_fi_3",path:"https://ets2map.com/mapicons/ets2/road/road_fi_3.png"
},{
name:"road_lt_a12",path:"https://ets2map.com/mapicons/ets2/road/road_lt_a12.png"
},{
name:"road_lt_a18",path:"https://ets2map.com/mapicons/ets2/road/road_lt_a18.png"
},{
name:"road_lv_a8",path:"https://ets2map.com/mapicons/ets2/road/road_lv_a8.png"
},{
name:"road_lv_a5",path:"https://ets2map.com/mapicons/ets2/road/road_lv_a5.png"
},{
name:"road_est_4",path:"https://ets2map.com/mapicons/ets2/road/road_est_4.png"
},{
name:"road_est_11",path:"https://ets2map.com/mapicons/ets2/road/road_est_11.png"
},{
name:"road_fi_50",path:"https://ets2map.com/mapicons/ets2/road/road_fi_50.png"
},{
name:"road_fi_51",path:"https://ets2map.com/mapicons/ets2/road/road_fi_51.png"
},{
name:"road_fi_52",path:"https://ets2map.com/mapicons/ets2/road/road_fi_52.png"
},{
name:"road_fi_12",path:"https://ets2map.com/mapicons/ets2/road/road_fi_12.png"
},{
name:"road_lt_a16",path:"https://ets2map.com/mapicons/ets2/road/road_lt_a16.png"
},{
name:"road_lt_a6",path:"https://ets2map.com/mapicons/ets2/road/road_lt_a6.png"
},{
name:"road_lt_a9",path:"https://ets2map.com/mapicons/ets2/road/road_lt_a9.png"
},{
name:"road_lt_a2",path:"https://ets2map.com/mapicons/ets2/road/road_lt_a2.png"
},{
name:"road_lt_a17",path:"https://ets2map.com/mapicons/ets2/road/road_lt_a17.png"
},{
name:"road_lt_a10",path:"https://ets2map.com/mapicons/ets2/road/road_lt_a10.png"
},{
name:"road_lt_a8",path:"https://ets2map.com/mapicons/ets2/road/road_lt_a8.png"
},{
name:"road_lv_a6",path:"https://ets2map.com/mapicons/ets2/road/road_lv_a6.png"
},{
name:"road_lv_a7",path:"https://ets2map.com/mapicons/ets2/road/road_lv_a7.png"
},{
name:"road_lv_a4",path:"https://ets2map.com/mapicons/ets2/road/road_lv_a4.png"
},{
name:"road_lv_a2",path:"https://ets2map.com/mapicons/ets2/road/road_lv_a2.png"
},{
name:"road_lv_a3",path:"https://ets2map.com/mapicons/ets2/road/road_lv_a3.png"
},{
name:"road_lv_a1",path:"https://ets2map.com/mapicons/ets2/road/road_lv_a1.png"
},{
name:"road_est_6",path:"https://ets2map.com/mapicons/ets2/road/road_est_6.png"
},{
name:"road_est_2",path:"https://ets2map.com/mapicons/ets2/road/road_est_2.png"
},{
name:"road_est_1",path:"https://ets2map.com/mapicons/ets2/road/road_est_1.png"
},{
name:"road_fi_7",path:"https://ets2map.com/mapicons/ets2/road/road_fi_7.png"
},{
name:"road_fi_4",path:"https://ets2map.com/mapicons/ets2/road/road_fi_4.png"
},{
name:"road_lt_a4",path:"https://ets2map.com/mapicons/ets2/road/road_lt_a4.png"
},{
name:"road_lt_a19",path:"https://ets2map.com/mapicons/ets2/road/road_lt_a19.png"
},{
name:"road_lt_a14",path:"https://ets2map.com/mapicons/ets2/road/road_lt_a14.png"
},{
name:"road_lv_a14",path:"https://ets2map.com/mapicons/ets2/road/road_lv_a14.png"
},{
name:"road_est_3",path:"https://ets2map.com/mapicons/ets2/road/road_est_3.png"
},{
name:"road_est_92",path:"https://ets2map.com/mapicons/ets2/road/road_est_92.png"
},{
name:"road_fi_15",path:"https://ets2map.com/mapicons/ets2/road/road_fi_15.png"
},{
name:"road_lv_a15",path:"https://ets2map.com/mapicons/ets2/road/road_lv_a15.png"
},{
name:"road_lv_a13",path:"https://ets2map.com/mapicons/ets2/road/road_lv_a13.png"
},{
name:"road_lv_a12",path:"https://ets2map.com/mapicons/ets2/road/road_lv_a12.png"
},{
name:"road_ru_a212",path:"https://ets2map.com/mapicons/ets2/road/road_ru_a212.png"
},{
name:"road_est_7",path:"https://ets2map.com/mapicons/ets2/road/road_est_7.png"
},{
name:"road_ru_a180",path:"https://ets2map.com/mapicons/ets2/road/road_ru_a180.png"
},{
name:"road_ru_m10",path:"https://ets2map.com/mapicons/ets2/road/road_ru_m10.png"
},{
name:"road_ru_p23",path:"https://ets2map.com/mapicons/ets2/road/road_ru_p23.png"
},{
name:"road_ru_a118",path:"https://ets2map.com/mapicons/ets2/road/road_ru_a118.png"
},{
name:"road_ru_p21",path:"https://ets2map.com/mapicons/ets2/road/road_ru_p21.png"
},{
name:"road_hu_m7",path:"https://ets2map.com/mapicons/ets2/road/road_hu_m7.png"
},{
name:"road_pl_a1",path:"https://ets2map.com/mapicons/ets2/road/road_pl_a1.png"
},{
name:"road_pl_1",path:"https://ets2map.com/mapicons/ets2/road/road_pl_1.png"
},{
name:"road_hu_m0",path:"https://ets2map.com/mapicons/ets2/road/road_hu_m0.png"
},{
name:"road_hu_m6",path:"https://ets2map.com/mapicons/ets2/road/road_hu_m6.png"
},{
name:"road_pl_7",path:"https://ets2map.com/mapicons/ets2/road/road_pl_7.png"
},{
name:"road_hu_m3",path:"https://ets2map.com/mapicons/ets2/road/road_hu_m3.png"
},{
name:"road_hu_m5",path:"https://ets2map.com/mapicons/ets2/road/road_hu_m5.png"
},{
name:"road_pl_s7",path:"https://ets2map.com/mapicons/ets2/road/road_pl_s7.png"
},{
name:"road_pl_4",path:"https://ets2map.com/mapicons/ets2/road/road_pl_4.png"
},{
name:"road_hu_m30",path:"https://ets2map.com/mapicons/ets2/road/road_hu_m30.png"
},{
name:"road_pl_2",path:"https://ets2map.com/mapicons/ets2/road/road_pl_2.png"
},{
name:"road_hu_m35",path:"https://ets2map.com/mapicons/ets2/road/road_hu_m35.png"
},{
name:"road_fr_a8",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a8.png"
},{
name:"road_fr_a51",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a51.png"
},{
name:"road_fr_a7",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a7.png"
},{
name:"road_fr_a55",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a55.png"
},{
name:"road_fr_a9",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a9.png"
},{
name:"road_fr_a75",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a75.png"
},{
name:"road_fr_a71",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a71.png"
},{
name:"road_fr_a20",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a20.png"
},{
name:"road_fr_a61",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a61.png"
},{
name:"road_fr_a84",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a84.png"
},{
name:"road_fr_a81",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a81.png"
},{
name:"road_fr_a62",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a62.png"
},{
name:"road_fr_a83",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a83.png"
},{
name:"road_fr_a837",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a837.png"
},{
name:"road_fr_a630",path:"https://ets2map.com/mapicons/ets2/road/road_fr_a630.png"
},{
name:"road_fr_n12",path:"https://ets2map.com/mapicons/ets2/road/road_fr_n12.png"
},{
name:"road_fr_n165",path:"https://ets2map.com/mapicons/ets2/road/road_fr_n165.png"
},{
name:"road_it_a14",path:"https://ets2map.com/mapicons/ets2/road/road_it_a14.png"
},{
name:"road_it_a90",path:"https://ets2map.com/mapicons/ets2/road/road_it_a90.png"
},{
name:"road_it_a91",path:"https://ets2map.com/mapicons/ets2/road/road_it_a91.png"
},{
name:"road_it_a24",path:"https://ets2map.com/mapicons/ets2/road/road_it_a24.png"
},{
name:"road_it_a19",path:"https://ets2map.com/mapicons/ets2/road/road_it_a19.png"
},{
name:"road_it_a30",path:"https://ets2map.com/mapicons/ets2/road/road_it_a30.png"
},{
name:"road_it_a16",path:"https://ets2map.com/mapicons/ets2/road/road_it_a16.png"
},{
name:"road_it_a20",path:"https://ets2map.com/mapicons/ets2/road/road_it_a20.png"
},{
name:"road_it_a18",path:"https://ets2map.com/mapicons/ets2/road/road_it_a18.png"
},{
name:"road_it_a2",path:"https://ets2map.com/mapicons/ets2/road/road_it_a2.png"
},{
name:"road_it_a11",path:"https://ets2map.com/mapicons/ets2/road/road_it_a11.png"
},{
name:"road_dk_e20",path:"https://ets2map.com/mapicons/ets2/road/road_dk_e20.png"
},{
name:"road_dk_e45",path:"https://ets2map.com/mapicons/ets2/road/road_dk_e45.png"
},{
name:"road_dk_e39",path:"https://ets2map.com/mapicons/ets2/road/road_dk_e39.png"
},{
name:"road_no_e18",path:"https://ets2map.com/mapicons/ets2/road/road_no_e18.png"
},{
name:"road_no_e134",path:"https://ets2map.com/mapicons/ets2/road/road_no_e134.png"
},{
name:"road_dk_e47",path:"https://ets2map.com/mapicons/ets2/road/road_dk_e47.png"
},{
name:"road_no_e6",path:"https://ets2map.com/mapicons/ets2/road/road_no_e6.png"
},{
name:"road_swe_e20",path:"https://ets2map.com/mapicons/ets2/road/road_swe_e20.png"
},{
name:"road_swe_e6",path:"https://ets2map.com/mapicons/ets2/road/road_swe_e6.png"
},{
name:"road_swe_e22",path:"https://ets2map.com/mapicons/ets2/road/road_swe_e22.png"
},{
name:"road_swe_e4",path:"https://ets2map.com/mapicons/ets2/road/road_swe_e4.png"
},{
name:"road_swe_e18",path:"https://ets2map.com/mapicons/ets2/road/road_swe_e18.png"
},{
name:"road_no_e16",path:"https://ets2map.com/mapicons/ets2/road/road_no_e16.png"
},{
name:"road_no_e39",path:"https://ets2map.com/mapicons/ets2/road/road_no_e39.png"
},{
name:"missing",path:"https://ets2map.com/mapicons/missing.png"
}];myforeach(a,function(e){
var t=a[e];images[t.name]=new Image,images[t.name].src=t.path
});var e=[{
name:"truck",path:"https://ets2map.com/mapicons/truck.png"
},{
name:"radar",path:"https://ets2map.com/mapicons/radar.png"
},{
name:"fuel",path:"https://ets2map.com/mapicons/ats/map/gas_ico.png"
},{
name:"parking",path:"https://ets2map.com/mapicons/ats/map/parking_ico.png"
},{
name:"service",path:"https://ets2map.com/mapicons/ats/map/service_ico.png"
},{
name:"garage",path:"https://ets2map.com/mapicons/ats/map/garage_free_ico.png"
},{
name:"recruitment",path:"https://ets2map.com/mapicons/ats/map/recruitment_ico.png"
},{
name:"business_hms_service",path:"https://ets2map.com/mapicons/ats/companies/hms_service.png"
},{
name:"business_charged",path:"https://ets2map.com/mapicons/ats/companies/charged.png"
},{
name:"business_gallon_oil",path:"https://ets2map.com/mapicons/ats/companies/gallon_oil.png"
},{
name:"business_walbert",path:"https://ets2map.com/mapicons/ats/companies/walbert.png"
},{
name:"business_sunshine",path:"https://ets2map.com/mapicons/ats/companies/sunshine.png"
},{
name:"business_voltison",path:"https://ets2map.com/mapicons/ats/companies/voltison.png"
},{
name:"business_eddys_food",path:"https://ets2map.com/mapicons/ats/companies/eddys_food.png"
},{
name:"business_plaster_n_son",path:"https://ets2map.com/mapicons/ats/companies/plaster_n_son.png"
},{
name:"business_re_train",path:"https://ets2map.com/mapicons/ats/companies/re_train.png"
},{
name:"business_avs_met_scr",path:"https://ets2map.com/mapicons/ats/companies/avs_met_scr.png"
},{
name:"business_dg_wd",path:"https://ets2map.com/mapicons/ats/companies/dg_wd.png"
},{
name:"business_st_met",path:"https://ets2map.com/mapicons/ats/companies/st_met.png"
},{
name:"business_coastline_mining",path:"https://ets2map.com/mapicons/ats/companies/coastline_mining.png"
},{
name:"business_bitumen",path:"https://ets2map.com/mapicons/ats/companies/bitumen.png"
},{
name:"business_darchelle_uzau",path:"https://ets2map.com/mapicons/ats/companies/darchelle_uzau.png"
},{
name:"business_42print",path:"https://ets2map.com/mapicons/ats/companies/42print.png"
},{
name:"business_chemso",path:"https://ets2map.com/mapicons/ats/companies/chemso.png"
},{
name:"business_kw_trk_pln",path:"https://ets2map.com/mapicons/ats/companies/kw_trk_pln.png"
},{
name:"business_aport_pcc",path:"https://ets2map.com/mapicons/ats/companies/aport_pcc.png"
},{
name:"business_tidbit",path:"https://ets2map.com/mapicons/ats/companies/tidbit.png"
},{
name:"business_sellgoods",path:"https://ets2map.com/mapicons/ats/companies/sellgoods.png"
},{
name:"business_hds_met_shp",path:"https://ets2map.com/mapicons/ats/companies/hds_met_shp.png"
},{
name:"business_pnp_wd_pln",path:"https://ets2map.com/mapicons/ats/companies/pnp_wd_pln.png"
},{
name:"business_bushnell_farm",path:"https://ets2map.com/mapicons/ats/companies/bushnell_farm.png"
},{
name:"business_oak_port",path:"https://ets2map.com/mapicons/ats/companies/oak_port.png"
},{
name:"business_sf_port",path:"https://ets2map.com/mapicons/ats/companies/sf_port.png"
},{
name:"business_phoenix_freight",path:"https://ets2map.com/mapicons/ats/companies/phoenix_freight.png"
},{
name:"business_gm_food_plnt",path:"https://ets2map.com/mapicons/ats/companies/gm_food_plnt.png"
},{
name:"business_aport_abq",path:"https://ets2map.com/mapicons/ats/companies/aport_abq.png"
},{
name:"business_hs",path:"https://ets2map.com/mapicons/ats/companies/hs.png"
},{
name:"business_oh_con_hom",path:"https://ets2map.com/mapicons/ats/companies/oh_con_hom.png"
},{
name:"business_hf_wd_pln",path:"https://ets2map.com/mapicons/ats/companies/hf_wd_pln.png"
},{
name:"business_sh_shp_pln",path:"https://ets2map.com/mapicons/ats/companies/sh_shp_pln.png"
},{
name:"business_dw_air_pln",path:"https://ets2map.com/mapicons/ats/companies/dw_air_pln.png"
},{
name:"business_ftf_food_pln",path:"https://ets2map.com/mapicons/ats/companies/ftf_food_pln.png"
},{
name:"business_port_sea",path:"https://ets2map.com/mapicons/ats/companies/port_sea.png"
},{
name:"business_dc_car_dlr",path:"https://ets2map.com/mapicons/ats/companies/dc_car_dlr.png"
},{
name:"business_port_tac",path:"https://ets2map.com/mapicons/ats/companies/port_tac.png"
},{
name:"road_us64",path:"https://ets2map.com/mapicons/ats/road/road_us64.png"
},{
name:"road_is40",path:"https://ets2map.com/mapicons/ats/road/road_is40.png"
},{
name:"road_us95",path:"https://ets2map.com/mapicons/ats/road/road_us95.png"
},{
name:"road_is15",path:"https://ets2map.com/mapicons/ats/road/road_is15.png"
},{
name:"road_is10",path:"https://ets2map.com/mapicons/ats/road/road_is10.png"
},{
name:"road_ca_r111",path:"https://ets2map.com/mapicons/ats/road/road_ca_r111.png"
},{
name:"road_is8",path:"https://ets2map.com/mapicons/ats/road/road_is8.png"
},{
name:"road_is84",path:"https://ets2map.com/mapicons/ats/road/road_is84.png"
},{
name:"road_is82",path:"https://ets2map.com/mapicons/ats/road/road_is82.png"
},{
name:"road_ca_r190",path:"https://ets2map.com/mapicons/ats/road/road_ca_r190.png"
},{
name:"road_us395",path:"https://ets2map.com/mapicons/ats/road/road_us395.png"
},{
name:"road_ca_r58",path:"https://ets2map.com/mapicons/ats/road/road_ca_r58.png"
},{
name:"road_is5",path:"https://ets2map.com/mapicons/ats/road/road_is5.png"
},{
name:"road_ca_r14",path:"https://ets2map.com/mapicons/ats/road/road_ca_r14.png"
},{
name:"road_ca_r99",path:"https://ets2map.com/mapicons/ats/road/road_ca_r99.png"
},{
name:"road_ca_r1",path:"https://ets2map.com/mapicons/ats/road/road_ca_r1.png"
},{
name:"road_us101",path:"https://ets2map.com/mapicons/ats/road/road_us101.png"
},{
name:"road_ca_r126",path:"https://ets2map.com/mapicons/ats/road/road_ca_r126.png"
},{
name:"road_ca_r120",path:"https://ets2map.com/mapicons/ats/road/road_ca_r120.png"
},{
name:"road_is80",path:"https://ets2map.com/mapicons/ats/road/road_is80.png"
},{
name:"road_ca_r44",path:"https://ets2map.com/mapicons/ats/road/road_ca_r44.png"
},{
name:"road_ca_r299",path:"https://ets2map.com/mapicons/ats/road/road_ca_r299.png"
},{
name:"road_us30",path:"https://ets2map.com/mapicons/ats/road/road_us30.png"
},{
name:"road_is405",path:"https://ets2map.com/mapicons/ats/road/road_is405.png"
},{
name:"road_ca_r198",path:"https://ets2map.com/mapicons/ats/road/road_ca_r198.png"
},{
name:"road_ca_r152",path:"https://ets2map.com/mapicons/ats/road/road_ca_r152.png"
},{
name:"road_us97",path:"https://ets2map.com/mapicons/ats/road/road_us97.png"
},{
name:"road_is580",path:"https://ets2map.com/mapicons/ats/road/road_is580.png"
},{
name:"road_toll_ico",path:"https://ets2map.com/mapicons/ats/road/road_toll_ico.png"
},{
name:"road_ca_r37",path:"https://ets2map.com/mapicons/ats/road/road_ca_r37.png"
},{
name:"road_us160",path:"https://ets2map.com/mapicons/ats/road/road_us160.png"
},{
name:"road_us191",path:"https://ets2map.com/mapicons/ats/road/road_us191.png"
},{
name:"road_us60",path:"https://ets2map.com/mapicons/ats/road/road_us60.png"
},{
name:"road_us70",path:"https://ets2map.com/mapicons/ats/road/road_us70.png"
},{
name:"road_az98",path:"https://ets2map.com/mapicons/ats/road/road_az98.png"
},{
name:"road_az77",path:"https://ets2map.com/mapicons/ats/road/road_az77.png"
},{
name:"road_us89",path:"https://ets2map.com/mapicons/ats/road/road_us89.png"
},{
name:"road_az64",path:"https://ets2map.com/mapicons/ats/road/road_az64.png"
},{
name:"road_is19",path:"https://ets2map.com/mapicons/ats/road/road_is19.png"
},{
name:"road_az90",path:"https://ets2map.com/mapicons/ats/road/road_az90.png"
},{
name:"road_us180",path:"https://ets2map.com/mapicons/ats/road/road_us180.png"
},{
name:"road_az89",path:"https://ets2map.com/mapicons/ats/road/road_az89.png"
},{
name:"road_is17",path:"https://ets2map.com/mapicons/ats/road/road_is17.png"
},{
name:"road_us93",path:"https://ets2map.com/mapicons/ats/road/road_us93.png"
},{
name:"road_az303",path:"https://ets2map.com/mapicons/ats/road/road_az303.png"
},{
name:"road_az66",path:"https://ets2map.com/mapicons/ats/road/road_az66.png"
},{
name:"road_us93alt",path:"https://ets2map.com/mapicons/ats/road/road_us93alt.png"
},{
name:"road_us50",path:"https://ets2map.com/mapicons/ats/road/road_us50.png"
},{
name:"road_us6",path:"https://ets2map.com/mapicons/ats/road/road_us6.png"
},{
name:"road_nv375",path:"https://ets2map.com/mapicons/ats/road/road_nv375.png"
},{
name:"road_nv376",path:"https://ets2map.com/mapicons/ats/road/road_nv376.png"
},{
name:"road_nv305",path:"https://ets2map.com/mapicons/ats/road/road_nv305.png"
},{
name:"road_nv140",path:"https://ets2map.com/mapicons/ats/road/road_nv140.png"
},{
name:"road_us82",path:"https://ets2map.com/mapicons/ats/road/road_us82.png"
},{
name:"road_us62",path:"https://ets2map.com/mapicons/ats/road/road_us62.png"
},{
name:"road_nm529",path:"https://ets2map.com/mapicons/ats/road/road_nm529.png"
},{
name:"road_is25",path:"https://ets2map.com/mapicons/ats/road/road_is25.png"
},{
name:"road_us84",path:"https://ets2map.com/mapicons/ats/road/road_us84.png"
},{
name:"road_us285",path:"https://ets2map.com/mapicons/ats/road/road_us285.png"
},{
name:"road_us54",path:"https://ets2map.com/mapicons/ats/road/road_us54.png"
},{
name:"road_us380",path:"https://ets2map.com/mapicons/ats/road/road_us380.png"
},{
name:"road_us550",path:"https://ets2map.com/mapicons/ats/road/road_us550.png"
},{
name:"road_us491",path:"https://ets2map.com/mapicons/ats/road/road_us491.png"
},{
name:"road_or78",path:"https://ets2map.com/mapicons/ats/road/road_or78.png"
},{
name:"road_us20",path:"https://ets2map.com/mapicons/ats/road/road_us20.png"
},{
name:"road_or140",path:"https://ets2map.com/mapicons/ats/road/road_or140.png"
},{
name:"road_us197",path:"https://ets2map.com/mapicons/ats/road/road_us197.png"
},{
name:"road_ca_r139",path:"https://ets2map.com/mapicons/ats/road/road_ca_r139.png"
},{
name:"road_or39",path:"https://ets2map.com/mapicons/ats/road/road_or39.png"
},{
name:"road_or58",path:"https://ets2map.com/mapicons/ats/road/road_or58.png"
},{
name:"road_us199",path:"https://ets2map.com/mapicons/ats/road/road_us199.png"
},{
name:"road_us2",path:"https://ets2map.com/mapicons/ats/road/road_us2.png"
},{
name:"road_wa20",path:"https://ets2map.com/mapicons/ats/road/road_wa20.png"
},{
name:"road_is90",path:"https://ets2map.com/mapicons/ats/road/road_is90.png"
},{
name:"road_wa155",path:"https://ets2map.com/mapicons/ats/road/road_wa155.png"
},{
name:"road_us12",path:"https://ets2map.com/mapicons/ats/road/road_us12.png"
},{
name:"missing",path:"https://ets2map.com/mapicons/missing.png"
}];myforeach(e,function(a){
var t=e[a];images_ats[t.name]=new Image,images_ats[t.name].src=t.path
})
}

function find_image(a,e){
    return"ets2"==e?a in images?images[a]:images.missing:a in images_ats?images_ats[a]:images_ats.missing
}

function Poi(a,e,t,n){
this.set=function(a,e,t,n){
if(this.size=1,this.distance=1,this.xscale=1,this.yscale=1,null!=a&&null!=e&&(this.x=a,this.y=e),null!=t&&(this.name=t),null!=n)if(this.type=n,this.type.includes("business_"))this.fillStyle="#96201A",this.shape="image",this.xscale=4,this.yscale=1,"business_road_quarry"==this.type&&(this.xscale=1,this.yscale=1);else if(this.type.includes("road_"))this.fillStyle="#ffffff",this.shape="road",this.xscale=2,this.yscale=2;else switch(this.type){
case"city":this.size=2,this.distance=2,this.shape="text_city";break;case"country":this.size=3,this.distance=3,this.shape="text";break;case"fuel":case"parking":case"service":this.shape="image";break;case"garage":this.shape="image",this.xscale=1.5,this.yscale=1.5;break;case"recruitment":case"train":case"port":this.shape="image";break;default:this.fillStyle="#ff0000"
}
},this.set(a,e,t,n),this.draw=function(a){
var e=!1;if(3==this.distance&&zoom>.03?e=!0:2==this.distance&&zoom>.05?e=!0:1==this.distance&&zoom>.5&&(e=!0),e){
var t=coordToScreen(this.x,this.y,0,0),n=t.x,s=t.y,o=10*zoom,i=o*zoom,r=10;a.fillStyle=this.fillStyle,n>0&&n<screenWidth&&s>0&&s<screenHeight&&("circle"==this.shape?(a.beginPath(),a.arc(n,s,o,0,2*Math.PI),a.fill()):"square"==this.shape?(a.beginPath(),a.rect(n-o/2,s-o/2,o,o),a.fill()):"image"==this.shape?"ATS"===isGame?a.drawImage(find_image(this.type,"ats"),n-o*this.xscale/2,s-o/2,o*this.xscale,o*this.yscale):"PROMODS"===isGame||a.drawImage(find_image(this.type,"ets2"),n-o*this.xscale/2,s-o/2,o*this.xscale,o*this.yscale):"speed"==this.shape?(a.beginPath(),a.arc(n,s,o/2,0,2*Math.PI),a.fill(),"ATS"===isGame?a.drawImage(find_image(this.type,"ats"),n-o*this.xscale/2,s-o*this.yscale/2,o*this.xscale,o*this.yscale):"PROMODS"===isGame||a.drawImage(find_image(this.type,"ets2"),n-o*this.xscale/2,s-o*this.yscale/2,o*this.xscale,o*this.yscale)):"road"==this.shape?"ATS"===isGame?a.drawImage(find_image(this.type,"ats"),n-o*this.xscale/2,s-o*this.yscale/2,o*this.xscale,o*this.yscale):"PROMODS"===isGame||a.drawImage(find_image(this.type,"ets2"),n-o*this.xscale/2,s-o*this.yscale/2,o*this.xscale,o*this.yscale):"square_sign"==this.shape?(a.beginPath(),a.rect(n-o/2,s-o/2,o,o),i=o*zoom,a.font=i+"px Verdana",r=a.measureText(this.name).width,a.textBaseline="middle",a.fillText(this.name,t.x-Math.floor(r/2),t.y),a.textBaseline="alphabetic",a.fill()):"text_city"==this.shape?(a.globalAlpha=1*zoom*2,i=o*this.size/zoom+Math.floor(o*this.size),a.font=i+"px Verdana",r=a.measureText(this.name).width,a.textBaseline="middle",a.fillStyle=document.getElementById("city_name_color").value,a.fillText(this.name,t.x-Math.floor(r/2),t.y),a.textBaseline="alphabetic",a.globalAlpha=1):"text"==this.shape&&(a.globalAlpha=1/zoom/2,i=o*this.size/zoom+Math.floor(o*this.size),a.font=i+"px Verdana",r=a.measureText(this.name).width,a.textBaseline="middle",a.fillStyle=document.getElementById("country_name_color").value,a.fillText(this.name,t.x-Math.floor(r/2),t.y),a.textBaseline="alphabetic",a.globalAlpha=1))
}
},this.isClicked=function(a,e){
var t=!1,n=coordToScreen(this.x,this.y,0,0),s=a-n.x,o=e-n.y;return s*s+o*o<100&&(t=!0),t
}
}

function Truck(a,e,t,n,s,o,i,r){
this.set=function(a,e){
null!=a&&null!=e&&(this.x=a,this.y=e),null!=t&&(this.name=t),this.direction=90,this.speed=0,this.xvel=0,this.yvel=0,this.lastx=this.x,this.lasty=this.y,this.drawx=this.x,this.drawy=this.y,this.rot=0,this.rotvel=0,this.oldrot=0,this.drawrot=0,this.TS=null,this.prevTS=null,this.initialTS=null,this.initialTSTime=null,this.TSTime=null,this.hauling=null,null!=s&&(this.r=s),null!=n&&(this.s=n)
},this.set(a,e,t),this.etsname=o,this.mp_id=i,this.p_id=r,this.lastTimeUpdated=(new Date).getTime(),this.prevTimeUpdated=(new Date).getTime(),this.isActive=!0,this.draw=function(a){
if(this.isActive&&(zoom>.25||truckClicked==this.name)){
var e=1e3*(this.prevTS-this.initialTS)+this.initialTSTime
var t=1e3*(this.TS-this.initialTS)+this.initialTSTime
var n=(new Date).getTime()-t
var s=t-e;
0==s && (s=1);
var o=this.lastx + this.xvel*n/s
var i=this.lasty + this.yvel*n/s;
this.drawx=.95*this.drawx+.05*o
this.drawy=.95*this.drawy+.05*i
this.drawrot=this.oldrot+this.rotvel*n/s;
var r=coordToScreen(this.drawx,this.drawy-15,0,0)
var p=r.x
var c=r.y
var m=6*zoom;
if(p>0 && p<screenWidth && c>0 && c<screenHeight &&
    (truckClicked==this.name ? a.fillStyle="#00CC00" : a.fillStyle=(Mike_IsCSGmember(this) ? "#CC0000" : document.getElementById("truck_color").value),a.save(),a.translate(p,c),a.rotate(this.drawrot+4.71238898025),a.translate(-m/2,-m/2),document.getElementById("truck_box").checked&&(a.beginPath(),a.rect(0,-m,m,2*m),a.fill()),document.getElementById("truck_face").checked&&a.drawImage(images.truck,0,0,m,m),a.restore(),zoom>document.getElementById("truck_vis_range").value||truckClicked==this.name)){
a.font="18px Verdana",a.fillStyle=(Mike_IsCSGmember(this) ? "#CC0000" : document.getElementById("player_name_color").value);
var d="";
document.getElementById("name_show_id").checked&&(d=" ("+this.p_id+") [" + GetSpeedOF(this.mp_id, this.drawx, this.drawy) + " km/h]");
var l="";
document.getElementById("name_show").checked&&(l=this.etsname);
var _=l+d;a.fillText(_,r.x-a.measureText(_).width/2,r.y-25)
}
}
},this.update=function(){
(new Date).getTime()-this.lastTimeUpdated>15e3&&(this.isActive=!1)
},this.isClicked=function(a,e){
var t=!1;if(this.isActive){
var n=coordToScreen(this.drawx,this.drawy,0,0),s=a-n.x,o=e-n.y;s*s+o*o<100&&(t=!0)
}return t
}
}

function background(a){
if(tiles=[],a||(truckClicked=null,zoom=1),"ATS"===isGame){
a||(cameraX=-75395,cameraY=24180);for(var e=-121;e<=-14;e+=27)for(var t=-78;t<=56;t+=27)tiles[tiles.length]=new Tile(1e3*e+offsetX+13e3,1e3*t+offsetY+13e3,"https://tiles.ets2map.com/tiles/v2/ats/"+e+"_"+t+"_4.png",4);for(e=-121;e<=-14;e+=9)for(t=-78;t<=56;t+=9)tiles[tiles.length]=new Tile(1e3*e+offsetX+4e3,1e3*t+offsetY+4e3,"https://tiles.ets2map.com/tiles/v2/ats/"+e+"_"+t+"_3.png",3);for(e=-121;e<=-14;e+=3)for(t=-78;t<=56;t+=3)tiles[tiles.length]=new Tile(1e3*e+offsetX+1e3,1e3*t+offsetY+1e3,"https://tiles.ets2map.com/tiles/v2/ats/"+e+"_"+t+"_2.png",2);for(e=-121;e<=-14;e++)for(t=-78;t<=56;t++)tiles[tiles.length]=new Tile(1e3*e+offsetX,1e3*t+offsetY,"https://tiles.ets2map.com/tiles/v2/ats/"+e+"_"+t+".png",1)
}else if("PROMODS"===isGame){
a||(cameraX=-39821.83,cameraY=-11478.67);for(e=-100;e<=142;e+=27)for(t=-184;t<=112;t+=27)tiles[tiles.length]=new Tile(1e3*e+offsetX+13e3,1e3*t+offsetY+13e3,"https://krashnz.com/ets2map/v2/promods/"+e+"_"+t+"_4.png",4);for(e=-100;e<=142;e+=9)for(t=-184;t<=112;t+=9)tiles[tiles.length]=new Tile(1e3*e+offsetX+4e3,1e3*t+offsetY+4e3,"https://krashnz.com/ets2map/v2/promods/"+e+"_"+t+"_3.png",3);for(e=-100;e<=142;e+=3)for(t=-184;t<=112;t+=3)tiles[tiles.length]=new Tile(1e3*e+offsetX+1e3,1e3*t+offsetY+1e3,"https://krashnz.com/ets2map/v2/promods/"+e+"_"+t+"_2.png",2);for(e=-100;e<=142;e++)for(t=-184;t<=112;t++)tiles[tiles.length]=new Tile(1e3*e+offsetX,1e3*t+offsetY,"https://krashnz.com/ets2map/v2/promods/"+e+"_"+t+".png",1)
}else{
a||(cameraX=-29835,cameraY=-4325);for(e=-74;e<=87;e+=27)for(t=-78;t<=83;t+=27)tiles[tiles.length]=new Tile(1e3*e+offsetX+13e3,1e3*t+offsetY+13e3,"https://tiles.ets2map.com/tiles/v2/ets2/"+e+"_"+t+"_4.png",4);for(e=-74;e<=87;e+=9)for(t=-78;t<=83;t+=9)tiles[tiles.length]=new Tile(1e3*e+offsetX+4e3,1e3*t+offsetY+4e3,"https://tiles.ets2map.com/tiles/v2/ets2/"+e+"_"+t+"_3.png",3);for(e=-74;e<=87;e+=3)for(t=-78;t<=83;t+=3)tiles[tiles.length]=new Tile(1e3*e+offsetX+1e3,1e3*t+offsetY+1e3,"https://tiles.ets2map.com/tiles/v2/ets2/"+e+"_"+t+"_2.png",2);for(e=-74;e<=87;e++)for(t=-78;t<=83;t++)tiles[tiles.length]=new Tile(1e3*e+offsetX,1e3*t+offsetY,"https://tiles.ets2map.com/tiles/v2/ets2/"+e+"_"+t+".png",1)
}getTruckData(),pois=[],request("ATS"===isGame?"https://ets2map.com/locations_ats.min.json?v=164bfc7a":"PROMODS"===isGame?"https://ets2map.com/locations_promods.min.json?v=2516f108":"https://ets2map.com/locations_ets2.min.json?v=1e3cd556",processPoIResponse)
}

function toggleHeatmap(){
document.getElementById("heatmap").checked?(displayHeatmap=!1,heatmap.setData({
data:[]
})):displayHeatmap=!0
}

function initHeatmap(){
heatmap=h337.create({
container:document.getElementById("box"),maxOpacity:.2,minOpacity:.05
})
}

function findPlayer(a,e,t,n){
debug&&console.log("findPlayer",a,e,t,n),truckClicked=null,clearInterval(playerCheck),n!==serverID&&setServer(n),cameraX=e,cameraY=t,zoom<=1&&(zoom=1.1);var s=0;playerCheck=setInterval(function(){
console.log("Looking for player..."),s>=10&&(clearInterval(playerCheck),console.log("Unable to find player!",a)),myforeach(trucks,function(e){
var t=trucks[e];t.p_id==a&&t.s==n&&(truckClicked=a,clearInterval(playerCheck),document.getElementById("player_search").value="",search(""),console.log("Found player!",a))
}),s++
},1e3)
}function GoToCoordinate(a,e,t){
cameraX=a,cameraY=e,zoom=t
}function zoomIn(){
zoom+=zoom>=.1?.1:.01
}function zoomOut(){
zoom-=zoom>.2?.1:.01,-1!=Math.sign(zoom)&&0!=Math.sign(zoom)||(zoom=.01)
}function init(){
c=document.getElementById("myCanvas"),elemLeft=c.offsetLeft,elemTop=c.offsetTop,ctx=c.getContext("2d"),setServer(50),trucks=[],stats=[],resize(),images_load(),initHeatmap(),c.addEventListener("mousedown",mouseDown),c.addEventListener("mouseup",mouseUp),c.addEventListener("mousemove",mouseOver),c.addEventListener("mousewheel",mouseWheel,!1),c.addEventListener("wheel",mouseWheel,!1),c.addEventListener("DOMMouseScroll",mouseWheel,!1),c.addEventListener("touchstart",touchHandler,!0),c.addEventListener("touchmove",touchHandler,!0),c.addEventListener("touchend",touchHandler,!0),c.addEventListener("touchcancel",touchHandler,!0),document.getElementById("heatmap").addEventListener("change",toggleHeatmap),$(function(){
toggleHeatmap()
})
}function run(){
currentZoomLevel=getCurrentZoomLevel(),isClicking[1]||isClicking[0]||(cameraX-=xVel*=.75,cameraY-=yVel*=.75),ctx.fillStyle=document.getElementById("map_color").value,ctx.globalAlpha=1,ctx.fillRect(0,0,screenWidth,screenHeight),zoom>.25&&(new Date).getTime()-lastJSONPullTime>2e3&&(getTruckData(),lastJSONPullTime=(new Date).getTime()),null!=poiClicked&&(cameraX=.9*cameraX+.1*pois[poiClicked].x,cameraY=.9*cameraY+.1*pois[poiClicked].y),null!=truckClicked&&(cameraX=.9*cameraX+.1*trucks[truckClicked].drawx,cameraY=.9*cameraY+.1*trucks[truckClicked].drawy,ctx.fillStyle="#f0f0f0",ctx.font="12px Verdana");for(var a=0;a<tiles.length;a++)tiles[a].draw(ctx);var e=[];if(null!=trucks&&myforeach(trucks,function(a){
if(trucks[a].update((new Date).getTime()-lastUpdateTime),trucks[a].draw(ctx),displayHeatmap&&trucks[a].isActive&&zoom>.25){
var t=coordToScreen(trucks[a].drawx,trucks[a].drawy-15,0,0),n=70*zoom,s={
x:Math.floor(t.x),y:Math.floor(t.y),value:50,radius:n
};e.push(s)
}
}),displayHeatmap){
var t={
max:100,min:0,data:e
};heatmap.setData(t)
}null!=pois&&myforeach(pois,function(a){
pois[a].draw(ctx)
}),null!=truckClicked&&debug&&(ctx.font="20px Arial,Helvetica,sans-serif",ctx.fillStyle="#000000",ctx.fillText("x: "+Math.round(100*trucks[truckClicked].drawx)/100,260,c.offsetHeight-160),ctx.fillText("y: "+Math.round(100*trucks[truckClicked].drawy)/100,260,c.offsetHeight-130)),debug&&(ctx.font="20px Arial,Helvetica,sans-serif",ctx.fillStyle="#000000",ctx.fillText("x: "+Math.round(100*cameraX)/100,260,c.offsetHeight-80),ctx.fillText("y: "+Math.round(100*cameraY)/100,260,c.offsetHeight-50),ctx.fillText("z: "+Math.round(100*zoom)/100,260,c.offsetHeight-20)),debugCenter&&(ctx.strokeStyle="rgba(0, 0, 0, 0.2)",ctx.beginPath(),ctx.moveTo(screenWidth/2+100,screenHeight/2),ctx.lineTo(screenWidth/2-100,screenHeight/2),ctx.stroke(),ctx.moveTo(screenWidth/2,screenHeight/2+100),ctx.lineTo(screenWidth/2,screenHeight/2-100),ctx.stroke()),displayUserDetails(),lastUpdateTime=(new Date).getTime()
}function fetchUser(a,e){
$.ajax({
dataType:"json",url:"https://truckersmp.krashnz.com/player/"+a,success:function(a){
e(a)
}
})
}

function displayUserDetails(){
if(null==truckClicked||fetchingPlayerData)previousClicked=null,document.getElementById("playerClicked").innerHTML="",hideDiv("playerView");else{
var a=trucks[truckClicked];a.isActive&&previousClicked!=a.mp_id?(fetchingPlayerData=1,fetchUser(a.mp_id,function(a){
previousClicked=a.tmp_id;var e="#8bc34a";switch(a.group){
case"Player":e="#8bc34a";break;case"Developer":e="#673ab7";break;case"Game Moderator":e="#f44336";break;case"Community Manager":e="#e64a19";break;case"Support":e="#f06292";break;case"Retired Team Member":e="#009689";break;case"Project Manager":e="#9575cd";break;case"Community Moderator":e="#0097a7";break;case"Support Manager":e="#ec407a";break;case"Community Moderation Manager":e="#00838f";break;case"Vice Project Manager":e="#9575cd";break;case"Media Team":e="#ff9800";break;case"Media Manager":e="#ff8f00";break;case"Trial Game Moderator":e="#ff5252";break;case"Trial Support":e="#f48fb1";break;case"Game Moderator Leader":e="#ff1744";break;case"Retired Legend":e="#009688";break;case"Game Manager":e="#d32f2f";break;case"Translator":e="#00e5ff";break;case"Social Media Team Member":e="#c0ca33";break;case"Trial Game Mod Observer":e="#ff8a80";break;case"Event Team":e="#1e88e5";break;case"Add-On Manager":e="#7e57c2";break;case"Add-On Team":e="#b388ff";break;case"Event Manager":e="#1565c0";break;case"Human Resources":e="#ce93d8";break;case"Senior Human Resources":e="#ba68c8";break;case"Senior Community Manager":e="#bf360c";break;case"Senior Game Manager":e="#b71c1c";break;case"Game Moderator Trainer ":e="#ff1744";break;case"Community Contributor":e="#1b5e20";break;case"Translation Manager":e="#00b8d4";break;case"Senior Community Moderation Manager":e="#006064";break;default:e="#8bc34a"
}document.getElementById("playerClicked").innerHTML='<img class="player-avatar" src="'+a.avatar+'" alt="'+a.username+'"><div class="player-name">'+a.username+'</div><div class="player-id"><a target="_blank" href="https://truckersmp.com/user/'+a.tmp_id+'">'+a.tmp_id+'</a></div><div class="player-rank" style="color: '+e+';">'+a.group+"</div>",fetchingPlayerData=0,showDiv("playerView")
})):previousClicked==a.mp_id?showDiv("playerView"):(document.getElementById("playerClicked").innerHTML="",hideDiv("playerView"))
}
}

function mouseDown(a){
tap(a.pageX,a.pageY,0)
}

function mouseUp(a){
untap(a.pageX,a.pageY,0)
}

function mouseOver(a){
drag(a.pageX,a.pageY,0)
}

function mouseWheel(a){
a=window.event||a;var e=Math.max(-1,Math.min(1,a.wheelDelta||-a.detail));(zoom*=1+e/20)<.05&&(zoom=.05),zoom>10&&(zoom=10)
}

function tap(a,e,t){
truckClicked=null,poiClicked=null,isClicking[t]=!0
console.log(screenToCoord(a,e,t))
}

function untap(a,e,t){
var n=a-elemLeft,s=e-elemTop;isClicking&&!isDragging&&0==t&&(truckClicked=null,null!=trucks&&myforeach(trucks,function(a){
trucks[a].isClicked(n,s)&&(truckClicked=a)
}),null!=pois&&myforeach(pois,function(a){
pois[a].isClicked(n,s)&&(poiClicked=a)
})),isDragging=!1,isClicking[t]=!1,mXOld[t]=null,mYOld[t]=null
}

function drag(a,e,t){
var n=a-elemLeft,s=e-elemTop;if(isClicking[t])if(isDragging=!0,isClicking[1]){
if(isClicking[0]&&isClicking[1]&&null!=mXOld[0]&&null!=mYOld[0]&&null!=mXOld[1]&&null!=mYOld[1]){
var o=mXOld[0]-mXOld[1],i=mYOld[0]-mYOld[1],r=o,p=i;0==t?(r=n-mXOld[1],p=s-mYOld[1]):1==t&&(r=mXOld[0]-n,p=mYOld[0]-s);var c=Math.sqrt(o*o+i*i),m=Math.sqrt(r*r+p*p)/c;isNaN(m)||0==m||(zoom*=m)
}
}else null!=mXOld[t]&&null!=mYOld[t]&&(cameraX-=(n-mXOld[t])*imageCoords/tileSize/zoom,cameraY-=(s-mYOld[t])*imageCoords/tileSize/zoom,xVel=4*(n-mXOld[t])*imageCoords/tileSize/zoom,yVel=4*(s-mYOld[t])*imageCoords/tileSize/zoom);else{
var d=screenToCoord(n,s,0);mouseX=d.x,mouseY=d.y
}mXOld[t]=n,mYOld[t]=s
}

function touchHandler(a){
for(var e=a.changedTouches,t=0;t<e.length;t++)null!=e[t]&&("touchstart"==a.type&&tap(e[t].clientX,e[t].clientY,e[t].identifier),"touchmove"==a.type&&drag(e[t].clientX,e[t].clientY,e[t].identifier),"touchend"==a.type&&untap(e[t].clientX,e[t].clientY,e[t].identifier));a.preventDefault()
}

function coordToScreen(a,e,t,n,s){
null==s&&(s=!0);var o=cameraX,i=cameraY;"ETS2"===isGame&&(i<-.14*o-10040&&o<-30100&&(o=.75*o-8337,i=.75*i-1e3),e<-.14*a-10040&&s&&a<-30100&&(a=.75*a-8337,e=.75*e-1e3));var r=[];return r.x=a*tileSize/imageCoords*zoom+screenWidth/2-o/(imageCoords/tileSize)*zoom-t/2*zoom,r.y=e*tileSize/imageCoords*zoom+screenHeight/2-i/(imageCoords/tileSize)*zoom-n/2*zoom,r
}

function screenToCoord(a,e,t){
null==t&&(t=!0);
var n=cameraX,s=cameraY;
"ETS2"===isGame&&s<-.14*n-10040&&n<-30100&&(n=.75*n-8337,s=.75*s-1e3);
var o=[];
return o.x=(a+n/(imageCoords/tileSize)*zoom-screenWidth/2)/(tileSize/imageCoords*zoom),o.y=(e+s/(imageCoords/tileSize)*zoom-screenHeight/2)/(tileSize/imageCoords*zoom),"ETS2"===isGame&&o.y<-.14*o.x-10040&&t&&o.x<-30100&&(o.x=(o.x+8337)/.75,o.y=(o.y+1e3)/.75),o
}


function viewPoi(a){
cameraX=pois[a].x,cameraY=pois[a].y,truckClicked=null
}

function setServer(a,e){
serverID=a,trucks=[];var t=document.getElementsByClassName("active");t[0]&&(t[0].className="server");var n=document.getElementById("server_"+serverID);n&&(n.className="server active"),8==serverID||9==serverID||10==serverID?(isGame="ATS",background(e)):50==serverID||51==serverID||52==serverID?(isGame="PROMODS",background(e)):(isGame="ETS2",background(e)),debug&&console.log("isGame: "+isGame,"Server: "+a)
}

function getTruckData(){
var a=screenToCoord(-25,-25),e=screenToCoord(screenWidth+25,screenHeight+25);request("https://tracker.ets2map.com/v3/area?x1="+Math.round(a.x)+"&y1="+Math.round(e.y)+"&x2="+Math.round(e.x)+"&y2="+Math.round(a.y)+"&server="+serverID,processTruckResponse)
}

function processTruckResponse(a){
var e=[],t=[];myforeach(a.Data,function(e){
var n=a.Data[e];t[n.PlayerId]=n
}),myforeach(t,function(a){
if(e[e.length]=a,null==trucks[a])trucks[a]=new Truck(t[a].X,t[a].Y,a,t[a].ServerId,t[a].Heading,t[a].Name,t[a].MpId,t[a].PlayerId);else if(trucks[a].prevTimeUpdated=trucks[a].lastTimeUpdated,trucks[a].lastTimeUpdated=(new Date).getTime(),trucks[a].TS!=t[a].Time){
for(trucks[a].lastx=trucks[a].x,trucks[a].lasty=trucks[a].y,trucks[a].x=t[a].X,trucks[a].y=t[a].Y,trucks[a].s=t[a].ServerId,trucks[a].direction=t[a].Heading,trucks[a].etsname=t[a].Name,trucks[a].isActive=!0,trucks[a].prevTS=trucks[a].TS,trucks[a].TS=t[a].Time,trucks[a].TSTime=(new Date).getTime(),null==trucks[a].initialTS&&null!=trucks[a].prevTS&&(trucks[a].initialTS=trucks[a].TS,trucks[a].initialTSTime=(new Date).getTime()),trucks[a].xvel=trucks[a].x-trucks[a].lastx,trucks[a].yvel=trucks[a].y-trucks[a].lasty,trucks[a].xvel*trucks[a].xvel+trucks[a].yvel*trucks[a].yvel>25e4&&(trucks[a].lastx=trucks[a].x,trucks[a].lasty=trucks[a].y,trucks[a].xvel=0,trucks[a].yvel=0,trucks[a].drawx=trucks[a].x,trucks[a].drawy=trucks[a].y),trucks[a].oldrot=trucks[a].rot,0==trucks[a].yvel&&0==trucks[a].xvel||(trucks[a].rot=Math.atan2(trucks[a].yvel,trucks[a].xvel)),trucks[a].rotvel=trucks[a].rot-trucks[a].oldrot;trucks[a].rotvel>=Math.PI;)trucks[a].rotvel-=2*Math.PI;for(;trucks[a].rotvel<-Math.PI;)trucks[a].rotvel+=2*Math.PI
}
}),myforeach(trucks,function(a){
-1==e.indexOf(a)&&(trucks[a].isActive=!1)
})
}

function processPoIResponse(a){
pois=[],processPois(a)
}

function processPois(a,e,t){
null==e&&(e=""),null==t&&(t=0),myforeach(a,function(n){
if(pois[pois.length]=new Poi(a[n].x,a[n].y,a[n].name,a[n].type),pois[pois.length-1].search=e+" "+pois[pois.length-1].name,pois[pois.length-1].depth=t,null!=a[n].pois){
var s=pois.length-1;if(processPois(a[n].pois,pois[pois.length-1].search,t+1),pois.length>s+1)for(var o=s+1;o<pois.length;o++)pois[s].search+=pois[o].search
}
})
}

function request(a,e){
for(var t=0;null!=xmlHttp[t];)t++;xmlHttp[t]=new XMLHttpRequest,xmlHttp[t].onreadystatechange=routeResponse,xmlHttp[t].func=e,xmlHttp[t].open("GET",a,!0),xmlHttp[t].send(null)
}

function routeResponse(){
if(4==this.readyState&&200==this.status)if("Not found"==this.responseText);else{
var response=eval("("+this.responseText+")");this.func(response)
}xmlHttp[this.reqId]=null
}

function myforeach(a,e){
for(var t in a)a.hasOwnProperty(t)&&/^0$|^[1-9]\d*$/.test(t)&&t<=4294967294&&e(t)
}

function start(){
init(),intervalId&&window.clearInterval(intervalId),intervalId=window.setInterval("run()",1e3/30)
}

function resize(){
var a=document.documentElement.offsetWidth,e=document.documentElement.offsetHeight,t=document.getElementById("box");t.style.width=a-1+"px",t.style.height=e-1+"px";var n=document.getElementById("canvascontainer");if(n.style.width=a-1+"px",n.style.height=e-1+"px",c.height=n.offsetHeight,c.width=n.offsetWidth,null!=document.getElementsByClassName("heatmap-canvas")[0]){
var s=heatmap._renderer.canvas;$(s).remove(),heatmap=null,initHeatmap()
}screenWidth=c.offsetWidth,screenHeight=c.offsetHeight
}window.onresize=function(){
resize()
},start();





/*

-------------------- GET x,y of something (click, truck, ...)

from a tap() event, send args to a screenToCoord() and get the .x and .y

in a truck object (like in Mike_IsCSGmember() ) , you have .drawx and .drawy ( and .drawrot )





*/


var fakeTruck = [
    {
        mp_id : 111,
        x: -41368.44864745899,
        y: -11908.842068827531,
        etsname : "111",
        name : "111"
    },
    {
        mp_id : 222,
        x: -41112.346206482594,
        y: -11848.81805922369,
        etsname : "222",
        name : "222"
    },
    {
        mp_id : 333,
        x: -40288.01647458984,
        y: -11812.803653461386,
        etsname : "333",
        name : "333"
    },
    {
        mp_id : 444,
        x: -39071.52987994715,
        y: -11868.82606242497,
        etsname : "444",
        name : "444"
    },
    {
        mp_id : 555,
        x: -40356.043685474215,
        y: -12465.06455782313,
        etsname : "555",
        name : "555"
    }
]


var Mike = {
    CSG : {
        members : [111, 222, 333, 444, 555],
        convoy : {
            lead : 0,
            tail : 0,
            pilots : [],
            RRU : []
        },
        onGame : [],
        inConvoyPublic : []
    },
    listed : [],
    debug : []
}

function Mike_IsCSGmember (name){
    if(Mike.listed.includes(name.mp_id) == false){
        Mike.listed.push(name.mp_id)
        console.log(name.etsname + " (" + name.name + ") MPID : " + name.mp_id)
    }

    if(Mike.CSG.members.includes(name.mp_id) && Mike.CSG.onGame[name.mp_id] == undefined){
        Mike.CSG.onGame[name.mp_id] = name
    }

    if(Mike.debug.includes(name.name)){ console.log(name) }

    return Mike.CSG.members.includes(name.mp_id);
}

function Vdist (x1, y1, x2, y2) {
    return Math.sqrt( Math.pow( x2 - x1, 2 ) + Math.pow( y2 - y1, 2 ) )
}








function Is_a_loop_somewhere (trucks){
    /*let temp0 = {
        "111":{
            "mp_id":111,
            "link1":222,
            "link2":555
        },
        "222":{
            "mp_id":222,
            "link1":111,
            "link2":333
        },
        "333":{
            "mp_id":333,
            "link1":555,
            "link2":222
        },
        "555":{
            "mp_id":555,
            "link1":333,
            "link2":111
        }
    }
    
    444 is missing because 111,222,333,555 are forming a LOOP !
    */


    // By observing this example, we can see the first, most important, fact about a LOOP : every mp_id have 2 link

    let is_looped = true

    for (const k in trucks) {
        if (trucks.hasOwnProperty(k)) {
            const el = trucks[k];
            if(el == undefined || el.link2 == undefined){ is_looped = false }
        }
    }

    return is_looped

}

function make_a_console_rendering (ALL, actual, render_text){
    // if link1 is already in final text

    if( ( ALL["" + actual].link1 != undefined && render_text.includes(ALL["" + actual].link1) == false ) && ( render_text.includes(ALL["" + actual].link2) || ALL["" + actual].link2 == undefined ) ){

        render_text = render_text + " <-> " + ALL["" + actual].link1

        return make_a_console_rendering(ALL, ALL["" + actual].link1, render_text)

    } else if( ( ALL["" + actual].link2 != undefined && render_text.includes(ALL["" + actual].link2) == false ) && ( render_text.includes(ALL["" + actual].link1) || ALL["" + actual].link1 == undefined ) ){

        render_text = render_text + " <-> " + ALL["" + actual].link2
        
        return make_a_console_rendering(ALL, ALL["" + actual].link2, render_text)

    } else {

        return render_text

    }
}



/*

setInterval(function () {
    //Mike.CSG.inConvoyPublic = []
    
    // step 1 : find distance between every trucks of CSG

    let Distances = {}

    Mike.CSG.onGame.forEach(truckCSG_A => {

        if(truckCSG_A == undefined){ return false }
        
        Distances["" + truckCSG_A.mp_id] = {}

        Mike.CSG.onGame.forEach(truckCSG_B => {

            if(truckCSG_B == undefined){ return false }

            if(truckCSG_B.mp_id !== truckCSG_A.mp_id){
                Distances["" + truckCSG_A.mp_id]["" + truckCSG_B.mp_id] = Vdist(truckCSG_A.x, truckCSG_A.y, truckCSG_B.x, truckCSG_B.y)
            }

        });

    });

    // step 2 : order theses distance ( ASC )

    let group = {}
    let groupSize = 0

    for (const truck_A in Distances) {
        if (Distances.hasOwnProperty(truck_A)) {
            
            for (const truck_B in Distances[truck_A]) {
                if (Distances[truck_A].hasOwnProperty(truck_B)) {
                    
                    const dist = Distances[truck_A][truck_B]

                    if(group["" + truck_A + "-" + truck_B] == undefined && group["" + truck_B + "-" + truck_A] == undefined){
                        group["" + truck_A + "-" + truck_B] = dist
                        groupSize = groupSize + 1
                    }
                }
            }
        }
    }

    let Odrered = []

    while (Odrered.length < groupSize){

        let nearest = ["000-000", 9999999999999]

        for (const grName in group) {
            if (group.hasOwnProperty(grName)) {
                const dist = group[grName];
                
                if(dist < nearest[1]){
                    nearest = [grName, dist]
                }

            }
        }

        Odrered.push(nearest)

        group[nearest[0]] = 9999999999999

    }


    // step 3 : etablish link between truck

    let Trucks = {}

    Odrered.forEach(el => {
        if(el != undefined){

            let tr_A = el[0].split("-")[0]
            let tr_B = el[0].split("-")[1]

            if( Trucks[tr_A] != undefined && Trucks[tr_A].link2 != undefined ){ return false; }
            if( Trucks[tr_B] != undefined && Trucks[tr_B].link2 != undefined ){ return false; }

            if( Trucks[tr_A] == undefined ){
                Trucks[tr_A] = {
                    mp_id : Number(tr_A),
                    link1 : Number(tr_B),
                    link2 : undefined
                }
            } else {
                Trucks[tr_A].link2 = Number(tr_B)
            }

            if( Trucks[tr_B] == undefined ){
                Trucks[tr_B] = {
                    mp_id : Number(tr_B),
                    link1 : Number(tr_A),
                    link2 : undefined
                }
            } else {
                Trucks[tr_B].link2 = Number(tr_A)
            }

            // cancel if we make a LOOP 
            if( Is_a_loop_somewhere(Trucks) ){
                if(Trucks[tr_A].link2 == undefined){
                    Trucks[tr_A] = undefined
                } else {
                    Trucks[tr_A].link2 = undefined
                }

                if(Trucks[tr_B].link2 == undefined){
                    Trucks[tr_B] = undefined
                } else {
                    Trucks[tr_B].link2 = undefined
                }
            }

        }
    });

    // step 5 : render the result

    let rendering = 0

    for (const id_s in Trucks) {
        if (Trucks.hasOwnProperty(id_s)) {
            const el = Trucks[id_s];
            if(el.link2 == undefined){
                rendering = el.mp_id
                break;
            }
        }
    }

    console.log( make_a_console_rendering(Trucks, rendering, "" + rendering) )
    
    Mike.CSG.onGame = []

}, 510000)

*/

// simulate 5 trucks in Paris
/*
setInterval(() => {
    fakeTruck.forEach(el => {
        Mike_IsCSGmember(el)
    });
}, 1000)
*/

function UpdateCSG_ID (){
    Mike.CSG.members = []
    for (let i = 1; i < 12; i++) {
        if( Number(document.getElementById("TID_" + i).value) > 0 ){
            Mike.CSG.members.push(Number(document.getElementById("TID_" + i).value))
        }

        switch (i) {
            case 1:
                Mike.CSG.convoy.lead = Number(document.getElementById("TID_" + i).value) || 0
                break;
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                Mike.CSG.convoy.pilots[i - 2] = Number(document.getElementById("TID_" + i).value) || 0
                break;
            case 8:
                Mike.CSG.convoy.tail = Number(document.getElementById("TID_" + i).value) || 0
                break;
            case 9:
            case 10:
            case 11:
                Mike.CSG.convoy.RRU[i - 9] = Number(document.getElementById("TID_" + i).value) || 0
                break;
            default:
                break;
        }
    }
}


let TrucksSpeed = {}

function GetSpeedOF(mpid, x, y){
    if(TrucksSpeed["" + mpid] == undefined ){
        TrucksSpeed["" + mpid] = {
            lastPos : [x, y],
            lastTime : Date.now(),
            lastResult : 0,
            update : 1
        }
    } else {
        TrucksSpeed["" + mpid].update = TrucksSpeed["" + mpid].update + 1
        let inTime = Date.now() - TrucksSpeed["" + mpid].lastTime

        if(inTime > 2900){
            let parcourus = Vdist(TrucksSpeed["" + mpid].lastPos[0], TrucksSpeed["" + mpid].lastPos[1], x, y)

            let toRet = Math.floor((parcourus / (inTime/1000)) * 3.6)
            if(toRet <= 130 || inTime >= 6000){
                TrucksSpeed["" + mpid] = {
                    lastPos : [x, y],
                    lastTime : Date.now(),
                    lastResult : TrucksSpeed["" + mpid].update + " | " + toRet,
                    update : 1
                }
            }
        }
    }

    return TrucksSpeed["" + mpid].lastResult

    /*
    return Math.floor((
        (Math.sqrt(TrucksSpeed["" + mpid].slot1[0] * TrucksSpeed["" + mpid].slot1[0] + TrucksSpeed["" + mpid].slot1[1] * TrucksSpeed["" + mpid].slot1[1]) * 1.8) +
        (Math.sqrt(TrucksSpeed["" + mpid].slot2[0] * TrucksSpeed["" + mpid].slot2[0] + TrucksSpeed["" + mpid].slot2[1] * TrucksSpeed["" + mpid].slot2[1]) * 1.8) +
        (Math.sqrt(TrucksSpeed["" + mpid].slot3[0] * TrucksSpeed["" + mpid].slot3[0] + TrucksSpeed["" + mpid].slot3[1] * TrucksSpeed["" + mpid].slot3[1]) * 1.8)) / 3
    )
    */
}



/**
 * 
 * ***************************** A truck object :
 *
    {
        TS: 1571661571              TS : TimeStamp
        TSTime: 1571661572614
        direction: 1.1781197
        draw: function draw()
        drawrot: -2.749256953701672
        drawx: -38921.509793730234          draw : coordinate of map
        drawy: -12247.465585161488
        etsname: "SWEDEN POWER"             Truckers MP Name, can be changed every month
        hauling: null                       Never seen someone with a hauling != null
        initialTS: 1571661471
        initialTSTime: 1571661472436
        isActive: true
        isClicked: function isClicked()
        lastTimeUpdated: 1571661572614
        lastx: -38913
        lasty: -12244
        mp_id: 1326224                      Truckers MP ID
        name: "261"                         Server ID, change every reconnect
        oldrot: -2.7403638545849445
        p_id: 261                           Server ID,but as a Int, not String
        prevTS: 1571661569
        prevTimeUpdated: 1571661570555
        r: -0.7782141
        rot: -2.7492525093742772
        rotvel: -0.008888654789332762
        s: 50
        set: function set()
        speed: 0                            Seem unused (look at velocity, example is in movement)
        update: function update()
        x: -38942
        xvel: -29                           or maybe these one for x and y ?
        y: -12256                           also have velocity, maybe useful later
        yvel: -12
    }
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

