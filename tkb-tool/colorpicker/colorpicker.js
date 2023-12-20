// ===Colorjoe===
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):e.colorjoe=n()}(this,function(){"use strict";"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;function e(e,n){return e(n={exports:{}},n.exports),n.exports}var p=e(function(e,n){e.exports=function(){function r(e,n){e?(t(e,n,"touchstart","touchmove","touchend"),t(e,n,"mousedown","mousemove","mouseup")):console.warn("drag is missing elem!")}return r.xyslider=function(e){var n=i(e.class||"",e.parent),t=i("pointer",n);return i("shape shape1",t),i("shape shape2",t),i("bg bg1",n),i("bg bg2",n),r(n,a(e.cbs,t)),{background:n,pointer:t}},r.slider=function(e){var n=i(e.class,e.parent),t=i("pointer",n);return i("shape",t),i("bg",n),r(n,a(e.cbs,t)),{background:n,pointer:t}},r;function a(e,t){var n={};for(var r in e)n[r]=a(e[r]);function a(n){return function(e){e.pointer=t,n(e)}}return n}function i(e,n){return t="div",r=e,a=n,i=document.createElement(t),r&&(i.className=r),a.appendChild(i),i;var t,r,a,i}function t(r,e,n,a,i){var t,o,u,s=(e=(t=e)?{begin:t.begin||p,change:t.change||p,end:t.end||p}:{begin:function(e){o={x:e.elem.offsetLeft,y:e.elem.offsetTop},u=e.cursor},change:function(e){d(e.elem,"left",o.x+e.cursor.x-u.x+"px"),d(e.elem,"top",o.y+e.cursor.y-u.y+"px")},end:p}).begin,l=e.change,f=e.end;c(r,n,function(n){var t=function(e){var n=Array.prototype.slice,t=n.apply(arguments,[1]);return function(){return e.apply(null,t.concat(n.apply(arguments)))}}(g,l,r);c(document,a,t),c(document,i,function e(){h(document,a,t),h(document,i,e),g(f,r,n)}),g(s,r,n)})}function c(e,n,t){var r=!1;try{var a=Object.defineProperty({},"passive",{get:function(){r=!0}});window.addEventListener("testPassive",null,a),window.removeEventListener("testPassive",null,a)}catch(e){}e.addEventListener(n,t,!!r&&{passive:!1})}function h(e,n,t){e.removeEventListener(n,t,!1)}function d(e,n,t){e.style[n]=t}function p(){}function g(e,n,t){t.preventDefault();var r,a,i,o={x:(r=n.getBoundingClientRect()).left,y:r.top},u=n.clientWidth,s=n.clientHeight,l={x:(i=t,(i.touches?i.touches[i.touches.length-1]:i).clientX),y:(a=t,(a.touches?a.touches[a.touches.length-1]:a).clientY)},f=(l.x-o.x)/u,c=(l.y-o.y)/s;e({x:isNaN(f)?0:f,y:isNaN(c)?0:c,cursor:l,elem:n,e:t})}}()}),a=e(function(e,n){e.exports=function(){function c(e){if(Array.isArray(e)){if("string"==typeof e[0]&&"function"==typeof c[e[0]])return new c[e[0]](e.slice(1,e.length));if(4===e.length)return new c.RGB(e[0]/255,e[1]/255,e[2]/255,e[3]/255)}else if("string"==typeof e){var n=e.toLowerCase();c.namedColors[n]&&(e="#"+c.namedColors[n]),"transparent"===n&&(e="rgba(0,0,0,0)");var t=e.match(p);if(t){var r=t[1].toUpperCase(),a=h(t[8])?t[8]:parseFloat(t[8]),i="H"===r[0],o=t[3]?100:i?360:255,u=t[5]||i?100:255,s=t[7]||i?100:255;if(h(c[r]))throw new Error("color."+r+" is not installed.");return new c[r](parseFloat(t[2])/o,parseFloat(t[4])/u,parseFloat(t[6])/s,a)}e.length<6&&(e=e.replace(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i,"$1$1$2$2$3$3"));var l=e.match(/^#?([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/i);if(l)return new c.RGB(parseInt(l[1],16)/255,parseInt(l[2],16)/255,parseInt(l[3],16)/255);if(c.CMYK){var f=e.match(new RegExp("^cmyk\\("+d.source+","+d.source+","+d.source+","+d.source+"\\)$","i"));if(f)return new c.CMYK(parseFloat(f[1])/100,parseFloat(f[2])/100,parseFloat(f[3])/100,parseFloat(f[4])/100)}}else if("object"==typeof e&&e.isColor)return e;return!1}var u=[],h=function(e){return void 0===e},e=/\s*(\.\d+|\d+(?:\.\d+)?)(%)?\s*/,d=/\s*(\.\d+|100|\d?\d(?:\.\d+)?)%\s*/,p=new RegExp("^(rgb|hsl|hsv)a?\\("+e.source+","+e.source+","+e.source+"(?:,"+/\s*(\.\d+|\d+(?:\.\d+)?)\s*/.source+")?\\)$","i");c.namedColors={},c.installColorSpace=function(a,i,e){function n(e,r){var n={};for(var t in n[r.toLowerCase()]=function(){return this.rgb()[r.toLowerCase()]()},c[r].propertyNames.forEach(function(t){var e="black"===t?"k":t.charAt(0);n[t]=n[e]=function(e,n){return this[r.toLowerCase()]()[t](e,n)}}),n)n.hasOwnProperty(t)&&void 0===c[e].prototype[t]&&(c[e].prototype[t]=n[t])}(c[a]=function(e){var r=Array.isArray(e)?e:arguments;i.forEach(function(e,n){var t=r[n];if("alpha"===e)this._alpha=isNaN(t)||1<t?1:t<0?0:t;else{if(isNaN(t))throw new Error("["+a+"]: Invalid color: ("+i.join(",")+")");"hue"===e?this._hue=t<0?t-Math.floor(t):t%1:this["_"+e]=t<0?0:1<t?1:t}},this)}).propertyNames=i;var r=c[a].prototype;for(var t in["valueOf","hex","hexa","css","cssa"].forEach(function(e){r[e]=r[e]||("RGB"===a?r.hex:function(){return this.rgb()[e]()})}),r.isColor=!0,r.equals=function(e,n){h(n)&&(n=1e-10),e=e[a.toLowerCase()]();for(var t=0;t<i.length;t+=1)if(Math.abs(this["_"+i[t]]-e["_"+i[t]])>n)return!1;return!0},r.toJSON=function(){return[a].concat(i.map(function(e){return this["_"+e]},this))},e)if(e.hasOwnProperty(t)){var o=t.match(/^from(.*)$/);o?c[o[1].toUpperCase()].prototype[a.toLowerCase()]=e[t]:r[t]=e[t]}return r[a.toLowerCase()]=function(){return this},r.toString=function(){return"["+a+" "+i.map(function(e){return this["_"+e]},this).join(", ")+"]"},i.forEach(function(t){var e="black"===t?"k":t.charAt(0);r[t]=r[e]=function(n,e){return void 0===n?this["_"+t]:e?new this.constructor(i.map(function(e){return this["_"+e]+(t===e?n:0)},this)):new this.constructor(i.map(function(e){return t===e?n:this["_"+e]},this))}}),u.forEach(function(e){n(a,e),n(e,a)}),u.push(a),c},c.pluginList=[],c.use=function(e){return-1===c.pluginList.indexOf(e)&&(this.pluginList.push(e),e(c)),c},c.installMethod=function(n,t){return u.forEach(function(e){c[e].prototype[n]=t}),this},c.installColorSpace("RGB",["red","green","blue","alpha"],{hex:function(){var e=(65536*Math.round(255*this._red)+256*Math.round(255*this._green)+Math.round(255*this._blue)).toString(16);return"#"+"00000".substr(0,6-e.length)+e},hexa:function(){var e=Math.round(255*this._alpha).toString(16);return"#"+"00".substr(0,2-e.length)+e+this.hex().substr(1,6)},css:function(){return"rgb("+Math.round(255*this._red)+","+Math.round(255*this._green)+","+Math.round(255*this._blue)+")"},cssa:function(){return"rgba("+Math.round(255*this._red)+","+Math.round(255*this._green)+","+Math.round(255*this._blue)+","+this._alpha+")"}});var n=function(a){a.installColorSpace("XYZ",["x","y","z","alpha"],{fromRgb:function(){var e=function(e){return.04045<e?Math.pow((e+.055)/1.055,2.4):e/12.92},n=e(this._red),t=e(this._green),r=e(this._blue);return new a.XYZ(.4124564*n+.3575761*t+.1804375*r,.2126729*n+.7151522*t+.072175*r,.0193339*n+.119192*t+.9503041*r,this._alpha)},rgb:function(){var e=this._x,n=this._y,t=this._z,r=function(e){return.0031308<e?1.055*Math.pow(e,1/2.4)-.055:12.92*e};return new a.RGB(r(3.2404542*e+-1.5371385*n+-.4985314*t),r(-.969266*e+1.8760108*n+.041556*t),r(.0556434*e+-.2040259*n+1.0572252*t),this._alpha)},lab:function(){var e=function(e){return.008856<e?Math.pow(e,1/3):7.787037*e+4/29},n=e(this._x/95.047),t=e(this._y/100),r=e(this._z/108.883);return new a.LAB(116*t-16,500*(n-t),200*(t-r),this._alpha)}})},t=function(c){c.installColorSpace("HSV",["hue","saturation","value","alpha"],{rgb:function(){var e,n,t,r=this._hue,a=this._saturation,i=this._value,o=Math.min(5,Math.floor(6*r)),u=6*r-o,s=i*(1-a),l=i*(1-u*a),f=i*(1-(1-u)*a);switch(o){case 0:e=i,n=f,t=s;break;case 1:e=l,n=i,t=s;break;case 2:e=s,n=i,t=f;break;case 3:e=s,n=l,t=i;break;case 4:e=f,n=s,t=i;break;case 5:e=i,n=s,t=l}return new c.RGB(e,n,t,this._alpha)},hsl:function(){var e,n=(2-this._saturation)*this._value,t=this._saturation*this._value,r=n<=1?n:2-n;return e=r<1e-9?0:t/r,new c.HSL(this._hue,e,n/2,this._alpha)},fromRgb:function(){var e,n=this._red,t=this._green,r=this._blue,a=Math.max(n,t,r),i=Math.min(n,t,r),o=a-i,u=0===a?0:o/a,s=a;if(0===o)e=0;else switch(a){case n:e=(t-r)/o/6+(t<r?1:0);break;case t:e=(r-n)/o/6+1/3;break;case r:e=(n-t)/o/6+2/3}return new c.HSV(e,u,s,this._alpha)}})},r=function(r){r.use(t),r.installColorSpace("HSL",["hue","saturation","lightness","alpha"],{hsv:function(){var e,n=2*this._lightness,t=this._saturation*(n<=1?n:2-n);return e=n+t<1e-9?0:2*t/(n+t),new r.HSV(this._hue,e,(n+t)/2,this._alpha)},rgb:function(){return this.hsv().rgb()},fromRgb:function(){return this.hsv().hsl()}})};return c.use(n).use(function(a){a.use(n),a.installColorSpace("LAB",["l","a","b","alpha"],{fromRgb:function(){return this.xyz().lab()},rgb:function(){return this.xyz().rgb()},xyz:function(){var e=function(e){var n=Math.pow(e,3);return.008856<n?n:(e-16/116)/7.87},n=(this._l+16)/116,t=this._a/500+n,r=n-this._b/200;return new a.XYZ(95.047*e(t),100*e(n),108.883*e(r),this._alpha)}})}).use(t).use(r).use(function(u){u.installColorSpace("CMYK",["cyan","magenta","yellow","black","alpha"],{rgb:function(){return new u.RGB(1-this._cyan*(1-this._black)-this._black,1-this._magenta*(1-this._black)-this._black,1-this._yellow*(1-this._black)-this._black,this._alpha)},fromRgb:function(){var e=this._red,n=this._green,t=this._blue,r=1-e,a=1-n,i=1-t,o=1;return e||n||t?(o=Math.min(r,Math.min(a,i)),r=(r-o)/(1-o),a=(a-o)/(1-o),i=(i-o)/(1-o)):o=1,new u.CMYK(r,a,i,o,this._alpha)}})}).use(function(e){e.namedColors={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgrey:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",grey:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370d8",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"d87093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"639",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"}}).use(function(e){e.installMethod("clearer",function(e){return this.alpha(isNaN(e)?-.1:-e,!0)})}).use(function(e){e.use(r),e.installMethod("darken",function(e){return this.lightness(isNaN(e)?-.1:-e,!0)})}).use(function(e){e.use(r),e.installMethod("desaturate",function(e){return this.saturation(isNaN(e)?-.1:-e,!0)})}).use(function(t){function e(){var e=this.rgb(),n=.3*e._red+.59*e._green+.11*e._blue;return new t.RGB(n,n,n,e._alpha)}t.installMethod("greyscale",e).installMethod("grayscale",e)}).use(function(e){e.use(r),e.installMethod("lighten",function(e){return this.lightness(isNaN(e)?.1:e,!0)})}).use(function(u){u.installMethod("mix",function(e,n){e=u(e).rgb();var t=2*(n=1-(isNaN(n)?.5:n))-1,r=this._alpha-e._alpha,a=((t*r==-1?t:(t+r)/(1+t*r))+1)/2,i=1-a,o=this.rgb();return new u.RGB(o._red*a+e._red*i,o._green*a+e._green*i,o._blue*a+e._blue*i,o._alpha*n+e._alpha*(1-n))})}).use(function(n){n.installMethod("negate",function(){var e=this.rgb();return new n.RGB(1-e._red,1-e._green,1-e._blue,this._alpha)})}).use(function(e){e.installMethod("opaquer",function(e){return this.alpha(isNaN(e)?.1:e,!0)})}).use(function(e){e.use(r),e.installMethod("rotate",function(e){return this.hue((e||0)/360,!0)})}).use(function(e){e.use(r),e.installMethod("saturate",function(e){return this.saturation(isNaN(e)?.1:e,!0)})}).use(function(e){e.installMethod("toAlpha",function(e){var n=this.rgb(),t=e(e).rgb(),r=new e.RGB(0,0,0,n._alpha),a=["_red","_green","_blue"];return a.forEach(function(e){n[e]<1e-10?r[e]=n[e]:n[e]>t[e]?r[e]=(n[e]-t[e])/(1-t[e]):n[e]>t[e]?r[e]=(t[e]-n[e])/t[e]:r[e]=0}),r._red>r._green?r._red>r._blue?n._alpha=r._red:n._alpha=r._blue:r._green>r._blue?n._alpha=r._green:n._alpha=r._blue,n._alpha<1e-10||(a.forEach(function(e){n[e]=(n[e]-t[e])/n._alpha+t[e]}),n._alpha*=r._alpha),n})})}()}),g=n(b,"div");function b(e,n,t){var r=document.createElement(e);return r.className=n,t.appendChild(r),r}function n(e){var n=Array.prototype.slice,t=n.apply(arguments,[1]);return function(){return e.apply(null,t.concat(n.apply(arguments)))}}function t(e,n,t){return Math.min(Math.max(e,n),t)}var v={clamp:t,e:b,div:g,partial:n,labelInput:function(e,n,t,r){var a="colorPickerInput"+Math.floor(1001*Math.random()),i=g(e,t);return{label:(c=n,h=i,d=a,p=b("label","",h),p.innerHTML=c,d&&p.setAttribute("for",d),p),input:(o="text",u=i,s=r,l=a,f=b("input","",u),f.type=o,s&&(f.maxLength=s),l&&f.setAttribute("id",l),s&&(f.maxLength=s),f)};var o,u,s,l,f;var c,h,d,p},X:function(e,n){e.style.left=t(100*n,0,100)+"%"},Y:function(e,n){e.style.top=t(100*n,0,100)+"%"},BG:function(e,n){e.style.background=n}};var r={currentColor:function(e){var n=v.div("currentColorContainer",e),t=v.div("currentColor",n);return{change:function(e){v.BG(t,e.cssa())}}},fields:function(e,t,n){var r=n.space,a=n.limit||255,i=0<=n.fix?n.fix:0,o=(""+a).length+i;o=i?o+1:o;var u=r.split(""),s="A"==r[r.length-1];if(r=s?r.slice(0,-1):r,["RGB","HSL","HSV","CMYK"].indexOf(r)<0)return console.warn("Invalid field names",r);var l=v.div("colorFields",e),f=u.map(function(e){e=e.toLowerCase();var n=v.labelInput("color "+e,e,l,o);return n.input.onblur=c,n.input.onkeydown=h,n.input.onkeyup=d,{name:e,e:n}});function c(){t.done()}function h(e){e.ctrlKey||e.altKey||!/^[a-zA-Z]$/.test(e.key)||e.preventDefault()}function d(){var n=[r];f.forEach(function(e){n.push(e.e.input.value/a)}),s||n.push(t.getAlpha()),t.set(n)}return{change:function(n){f.forEach(function(e){e.e.input.value=(n[e.name]()*a).toFixed(i)})}}},hex:function(e,r,n){var t=v.labelInput("hex",n.label||"",e,7);return t.input.value="#",t.input.onkeyup=function(e){var n=e.keyCode||e.which,t=e.target.value;t=function(e,n,t){for(var r=e,a=e.length;a<n;a++)r+=t;return r}(t="#"==t[0]?t:"#"+t,7,"0"),13==n&&r.set(t)},t.input.onblur=function(e){r.set(e.target.value),r.done()},{change:function(e){t.input.value="#"==t.input.value[0]?"#":"",t.input.value+=e.hex().slice(1)}}},alpha:function(e,t){var n=p.slider({parent:e,class:"oned alpha",cbs:{begin:r,change:r,end:function(){t.done()}}});function r(e){var n=v.clamp(e.y,0,1);v.Y(e.pointer,n),t.setAlpha(1-n)}return{change:function(e){v.Y(n.pointer,1-e.alpha())}}},close:function(e,n,t){var r=v.e("a",t.class||"close",e);r.href="#",r.innerHTML=t.label||"Close",r.onclick=function(e){e.preventDefault(),n.hide()}}},y=function(r){return e=s,(n=[r.init,r.xy,r.z]).map(e).filter(l).length!=n.length?console.warn("colorjoe: missing cb"):function(e,n,t){return function(e){if(!e.e)return console.warn("colorjoe: missing element");var n=(t=e.e,"string"==typeof t?document.getElementById(e.e):e.e);var t;n.className="colorPicker";var r=e.cbs,a=p.xyslider({parent:n,class:"twod",cbs:{begin:i,change:i,end:h}});function i(e){l=r.xy(l,{x:v.clamp(e.x,0,1),y:v.clamp(e.y,0,1)},a,o),c()}var o=p.slider({parent:n,class:"oned",cbs:{begin:u,change:u,end:h}});function u(e){l=r.z(l,v.clamp(e.y,0,1),a,o),c()}var s=m(e.color),l=r.init(s,a,o),f={change:[],done:[]};function c(e){e=_(e)?e:[];for(var n,t=f.change,r=0,a=t.length;r<a;r++)n=t[r],-1==e.indexOf(n.name)&&n.fn(l)}function h(){if(!s.equals(l)){for(var e=0,n=f.done.length;e<n;e++)f.done[e].fn(l);s=l}}var d={e:n,done:function(){return h(),this},update:function(e){return c(e),this},hide:function(){return n.style.display="none",this},show:function(){return n.style.display="",this},get:function(){return l},set:function(e){var n=this.get();return l=r.init(m(e),a,o),n.equals(l)||this.update(),this},getAlpha:function(){return l.alpha()},setAlpha:function(e){return l=l.alpha(e),this.update(),this},on:function(e,n,t){return"change"==e||"done"==e?f[e].push({name:t,fn:n}):console.warn('Passed invalid evt name "'+e+'" to colorjoe.on'),this},removeAllListeners:function(e){if(e)f[e]=[];else for(var n in f)f[n]=[];return this}};return function(e,u,n){if(n){var s,l,f,c=v.div("extras",e);n.forEach(function(e,n){_(e)?(l=e[0],f=1<e.length?e[1]:{}):(l=e,f={});var t,r,a,i=l in y.extras?y.extras[l]:null;if(i)for(var o in s=i(c,(r=l+n,(a=function(e){var n={};for(var t in e)n[t]=e[t];return n}(t=u)).update=function(){t.update([r])},a),f))u.on(o,s[o],l)})}}(n,d,e.extras),c(),d}({e:e,color:n,cbs:r,extras:t})};var e,n};for(var i in y.rgb=y({init:function(e,n,t){var r=a(e).hsv();return this.xy(r,{x:r.saturation(),y:1-r.value()},n,t),this.z(r,r.hue(),n,t),r},xy:function(e,n,t){return v.X(t.pointer,n.x),v.Y(t.pointer,n.y),e.saturation(n.x).value(1-n.y)},z:function(e,n,t,r){return v.Y(r.pointer,n),o(t.background,n),e.hue(n)}}),y.hsl=y({init:function(e,n,t){var r=a(e).hsl();return this.xy(r,{x:r.hue(),y:1-r.saturation()},n,t),this.z(r,1-r.lightness(),n,t),r},xy:function(e,n,t,r){return v.X(t.pointer,n.x),v.Y(t.pointer,n.y),o(r.background,n.x),e.hue(n.x).saturation(1-n.y)},z:function(e,n,t,r){return v.Y(r.pointer,n),e.lightness(1-n)}}),y.extras={},y.registerExtra=function(e,n){e in y.extras&&console.warn('Extra "'+e+'"has been registered already!'),y.extras[e]=n},r)y.registerExtra(i,r[i]);function o(e,n){v.BG(e,new a.HSV(n,1,1).cssa())}function m(e){if(!u(e))return a("#000");if(e.isColor)return e;var n=a(e);return n||(u(e)&&console.warn("Passed invalid color to colorjoe, using black instead"),a("#000"))}function _(e){return"[object Array]"===Object.prototype.toString.call(e)}function u(e){return void 0!==e}function s(e){return"function"==typeof e}function l(e){return e}return y});


// ===Color Picker===
let typesColor = ["hex","rgba","hsla","hwba"]
function hexToRgba(hex) {
    if (!hex.startsWith("#")) hex = "#".concat(hex);
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    let a=1;
    if (hex.length>7)
      a = parseFloat(parseInt(hex.slice(-2), 16) / 255).toFixed(2);
    return {r:r,g:g,b:b,a:a,rgba:`rgba(${r}, ${g}, ${b}, ${a})`, rgb:{r,g,b}}
}

function hexToHsla(color) {
    const rgba = hexToRgba(color)
    let { r, g, b } = rgba.rgb;
    r/=255;
    g/=255;
    b/=255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);
    h = Math.round(360*h);
    return { h:h, s:s, l:l, a:rgba.a ,hsla:`rgba(${h}, ${s}%, ${l}%, ${rgba.a})`};
}

function rgbaToHex(rgba) {
    if (rgba["a"] === 1) {
      const r = Math.round(rgba.r).toString(16).padStart(2, "0");
      const g = Math.round(rgba.g).toString(16).padStart(2, "0");
      const b = Math.round(rgba.b).toString(16).padStart(2, "0");
      return `#${r}${g}${b}`;
    } else {
      const r = Math.round(rgba.r).toString(16).padStart(2, "0");
      const g = Math.round(rgba.g).toString(16).padStart(2, "0");
      const b = Math.round(rgba.b).toString(16).padStart(2, "0");
      console.log("Hex",`#${r}${g}${b}`,rgba.a);
      return addAlpha(`#${r}${g}${b}`,rgba.a);
    }
}

function hexToHwba(color) {
    const rgba = hexToRgba(color);
    const rgb = rgba.rgb;
    
    const w = (Math.min(rgb.r/255,rgb.g/255,rgb.b/255)*100).toFixed();
    const b = ((1 - Math.max(rgb.r/255,rgb.g/255,rgb.b/255))*100).toFixed();
    const h = (hexToHsla(color).h).toFixed();
    return { h:h, w:w, b:b, a:rgba.a ,hwba:`hwba(${h}, ${w}, ${b}, ${rgba.a})`};
}


  

function addAlpha(hex, opacity) {
    if (opacity==1) return hex;
    if (opacity==0) return hex+"00";
    let _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    if(hex.length>7) return hex.substring(0,7)+_opacity.toString(16).toUpperCase()
    return hex + _opacity.toString(16).toUpperCase();
}

function stringToRgba(rgbaString){
    rgbaString = rgbaString.trim()
    const i = rgbaString.indexOf("(")
    const values = rgbaString.substring(i+1, rgbaString.length-1).split(",");
    if (values.length < 3 || values.length > 4) {
    throw new Error("Invalid number of rgba values");
    }
    const red = parseInt(values[0].trim());
    const green = parseInt(values[1].trim());
    const blue = parseInt(values[2].trim());
    
    const alpha = (values.length<4)?1 : parseFloat(values[3].trim());
    return { r: red, g: green, b: blue, a: alpha };
}

function toHex(color){
    
    if (color.indexOf("rgb")!=-1) return rgbaToHex(stringToRgba(color));
    return color;
}
class ColorPicker {
    
    constructor() {
        
        
        this.root = document.createElement("div");
        this.root.className = "colorPickerDialog";
        this.root.innerHTML  = `
            <i class="fa-solid fa-xmark close"></i>
            <div class="colorjoe"></div>
            
            <div class="config">
                <div class="opacity">
                    <div class="viewcolor"></div>
                    <div class="handle"></div>
                </div>
                <div>
                    <div class="config-title">Chọn màu</div>
                    <div style="display:flex;align-items: center;margin-bottom:15px">
                        <div class="selected-color-text">
                            <div class="groupInput" group=1>
                                <input class="inputColorCode"\>
                                <span>HEX</span>
                            </div>
                            <div class="groupInput" group=2>
                                <input class="inputColorCode"\>
                                <span>R</span>
                            </div>
                            <div class="groupInput" group=2>
                                <input class="inputColorCode"\>
                                <span>G</span>
                            </div>
                            <div class="groupInput" group=2>
                                <input class="inputColorCode"\>
                                <span>B</span>
                            </div>
                            <div class="groupInput" group=2>
                                <input class="inputColorCode"\>
                                <span>A</span>
                            </div>
                            <div class="groupInput" group=3>
                                <input class="inputColorCode"\>
                                <span>H</span>
                            </div>
                            <div class="groupInput" group=3>
                                <input class="inputColorCode"\>
                                <span>S</span>
                            </div>
                            <div class="groupInput" group=3>
                                <input class="inputColorCode"\>
                                <span>L</span>
                            </div>
                            <div class="groupInput" group=3>
                                <input class="inputColorCode"\>
                                <span>A</span>
                            </div>
                            <div class="groupInput" group=4>
                                <input class="inputColorCode"\>
                                <span>H</span>
                            </div>
                            <div class="groupInput" group=4>
                                <input class="inputColorCode"\>
                                <span>W</span>
                            </div>
                            <div class="groupInput" group=4>
                                <input class="inputColorCode"\>
                                <span>B</span>
                            </div>
                            <div class="groupInput" group=4>
                                <input class="inputColorCode"\>
                                <span>A</span>
                            </div>
                        </div>
                        <div class="changeTypeColor">
                            <i class="fa-solid fa-up-down"></i>
                        </div>
                    </div>
                    <div class="selected-color"></div>
                    <div class="config-title"></div>
                    <div class="groupSavedColor">
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                    </div>
                    <div class="groupSavedColor">
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                    </div>
                    <div class="groupSavedColor">
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                        <div class="saved-color"></div>
                    </div>
                </div>
            </div>
        `
        document.body.append(this.root)
        this.opacitycolor = document.querySelector(".opacity .viewcolor");
        this.pointer = document.querySelector(".opacity .handle");
        this.opacity = 1;
        this.colorjoe = colorjoe.rgb(this.root.querySelector(".colorPickerDialog .colorjoe"));
        this.selectedColor = null;
        this.opening  =null;
        this.type = 1;
        this.last_saved_color=0;
        this.defaultColor="#ffffff"

        this.f = function(){

        }  
        this.colorjoe.show();
        
  
        this.colorjoe.on("change", color => {
            
            this.setSelectedColor(color.hex());
        });
        this.savedColorsEle = this.root.querySelectorAll(".saved-color");
        this.savedColorsEle.forEach((el) => {
            this.setSavedColor(el, '#ffffff');
  
            el.addEventListener("click", () => {
                this.setSelectedColor(el.color);
  
                
            });
        });

        const close = this.root.querySelector(".close")
        close.addEventListener("click",()=>{
            this.close()
        })

        const opacity = document.querySelector(".opacity");
        const pointer = this.pointer;
        let top = opacity.getBoundingClientRect().top;
        
        let pointerHeight = (pointer.clientHeight+4)/2;
        
        let opacityHeight = opacity.clientHeight-pointerHeight;

        pointer.style.top = -parseInt(pointerHeight)+"px";
        this.pointerDefaultY = -parseInt(pointerHeight)+"px";

        let mousedown=false;

        opacity.addEventListener("click",(event)=>{
            let y = event.clientY-top;
                if(y>200) y=200;
                if (y<0) y=0;
                let py = (y-pointerHeight);
                if (py<=0) py = -parseInt(pointerHeight);
                if (py>=opacityHeight) py = opacityHeight;

                pointer.style.top=py+"px";
                this.opacity = (1-y/200);
                this.setTextColor(this.selectedColor)
                this.root.querySelector(".selected-color").style.background = addAlpha(this.selectedColor,this.opacity);
        })

        this.root.addEventListener("mousemove",(event)=>{
            if (mousedown){
                let y = event.clientY-top;
                if(y>200) y=200;
                if (y<0) y=0;
                let py = (y-pointerHeight);
                if (py<=0) py = -parseInt(pointerHeight);
                if (py>=opacityHeight) py = opacityHeight;

                pointer.style.top=py+"px";
                this.opacity = (1-y/200);
                this.setTextColor(this.selectedColor)
                this.root.querySelector(".selected-color").style.background = addAlpha(this.selectedColor,this.opacity);
            }
        })

        this.root.addEventListener("mouseup",(event)=>{
            mousedown=false;
        })
        
        this.inputsColor={}
        const groups = this.root.querySelectorAll(".groupInput")
        groups.forEach((group)=>{
            let g = parseInt(group.getAttribute("group"));

            if (!this.inputsColor[g]) this.inputsColor[g]=[group.querySelector("input")]
            else 
                this.inputsColor[g].push(group.querySelector("input"));

            group.querySelector("input").addEventListener("blur",(e)=>{
                switch (g){
                    case 2:
                        this.opacity = parseFloat(this.inputsColor[g][3].value).toFixed(2)
                        console.log(Number(this.inputsColor[g][3].value));
                        this.setSelectedColor(`rgba(${this.inputsColor[g][0].value}, ${this.inputsColor[g][1].value}, ${this.inputsColor[g][2].value}, ${this.opacity})`)
                        console.log(`rgba(${this.inputsColor[g][0].value}, ${this.inputsColor[g][1].value}, ${this.inputsColor[g][2].value}, ${this.inputsColor[g][3].value})`);
                        break;
                    case 3:
                        color = `rgba(${this.inputsColor[g][0].value}, ${this.inputsColor[g][1].value}, ${this.inputsColor[g][2].value}, ${this.inputsColor[g][3].value})`
                        break;
                    case 4:
                        color = `rgba(${this.inputsColor[g][0].value}, ${this.inputsColor[g][1].value}, ${this.inputsColor[g][2].value}, ${this.inputsColor[g][3].value})`
                        break;
                    default:
                        this.opacity = hexToRgba(e.target.value).a
                        this.setSelectedColor(e.target.value)
                        break;
                        
                }
                
                //this.setSelectedColor(color)
            })
        })

        this.showContentColor()

        this.setSelectedColor("#ffffff")

       
        



        
        


        dragElement(this.root);

        function dragElement(elmnt) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            let allow = ["config","config-title","colorPickerDialog","colorPicker"]
            if (document.getElementById(elmnt.id + "header")) {
                /* if present, the header is where you move the DIV from:*/
                document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
            } else {
                /* otherwise, move the DIV from anywhere inside the DIV:*/
                elmnt.onmousedown = dragMouseDown;
            }

            function dragMouseDown(e) {
                if (e.target=="span"||allow.includes(e.target.className)){
                    e = e || window.event;
                
                    e.preventDefault();
                    // get the mouse cursor position at startup:
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    document.onmouseup = closeDragElement;
                    // call a function whenever the cursor moves:
                    document.onmousemove = elementDrag;
                }
                
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                if (elmnt.offsetTop - pos2>0 && elmnt.offsetTop - pos2<window.innerHeight-elmnt.clientHeight)
                    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                if (elmnt.offsetLeft - pos1>0 && elmnt.offsetLeft - pos1<window.innerWidth- elmnt.clientWidth)
                    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                
                top = opacity.getBoundingClientRect().top;
                
        
                elmnt.style.cursor = "pointer"
            }

            function closeDragElement() {
                /* stop moving when mouse button is released:*/
                document.onmouseup = null;
                document.onmousemove = null;
                elmnt.style.cursor = "default"
            }
        }

        

        

        

        opacity.addEventListener("mousedown",(event)=>{
            mousedown=true;
        })


        document.querySelector(".changeTypeColor").addEventListener("click",()=>{
            this.type++;
            if (this.type>typesColor.length) this.type = 1;
            this.showContentColor();
            this.setTextColor(this.selectedColor)
        })

        this.addEventListenerForColorPicker()
        
        
  
        
    }

    checkSavedColor(){
        for (let sv of this.savedColorsEle){
            if (sv.color==this.selectedColor) return false
        }
        return true;
    }

    close(){
        this.root.style.visibility = "hidden";
        if (this.checkSavedColor()) {
            this.setSavedColor(this.savedColorsEle[this.last_saved_color],this.selectedColor)

        }
        this.opening.setAttribute("default",addAlpha(this.selectedColor,this.opacity));
        eval(this.f+"('"+addAlpha(this.selectedColor,this.opacity)+"')");
        
    }

    dispose(){
        document.body.removeChild(this.root)
    }

    show(element,f){
        this.root.style.visibility = "visible"
        this.opening=element;
        this.f = f;
        this.setSelectedColor(this.defaultColor)
    }

    setTextColor(color){
        switch (this.type){
            
            case 2:
                const rgba = hexToRgba(addAlpha(color,this.opacity))
                this.inputsColor[2][0].value=rgba.r;
                this.inputsColor[2][1].value=rgba.g;
                this.inputsColor[2][2].value=rgba.b;
                this.inputsColor[2][3].value=rgba.a;
                break;
            case 3:
                const hsla = hexToHsla(addAlpha(color,this.opacity))
                this.inputsColor[3][0].value=hsla.h;
                this.inputsColor[3][1].value=hsla.s+"%";
                this.inputsColor[3][2].value=hsla.l+"%";
                this.inputsColor[3][3].value=hsla.a;
                break;
            case 4:
                const hwba = hexToHwba(addAlpha(color,this.opacity))
                this.inputsColor[4][0].value=hwba.h;
                this.inputsColor[4][1].value=hwba.w+"%";
                this.inputsColor[4][2].value=hwba.b+"%";
                this.inputsColor[4][3].value=hwba.a;
                break;
            default:
                this.inputsColor[1][0].value= addAlpha(color,this.opacity);
        }
        
    }

    showContentColor(){
        if (this.type>1){
            this.root.querySelector(".opacity").style.width = "40px"
        }
        else this.root.querySelector(".opacity").style.width = "20px"

        this.root.querySelectorAll(".groupInput").forEach((group)=>{
            if (this.type!=group.getAttribute("group"))
                group.style.display = "none"
            else
                group.style.display = "inline-block"
        })
        
    }
  
    setSelectedColor(color, skipCjUpdate = false) {
        color=toHex(color)
        this.selectedColor = color;
        this.root.querySelector(".selected-color").style.background = addAlpha(color,this.opacity);
        this.setOpacityColor(color,this.opacity);
        this.setTextColor(color)
        if (!skipCjUpdate) {
            if (color.length>7)
                this.colorjoe.set(color.slice(0,7));
            else this.colorjoe.set(color);
            
        }
    }
  
    setSavedColor(element, color) {
        element.style.background = color;
        element.color = color;
        this.last_saved_color++;
        if (this.last_saved_color==this.savedColorsEle.length)this.last_saved_color=0;
    }

    setOpacityColor(color,opacity=1){
        this.opacitycolor.style.background="linear-gradient(to bottom, "+color +" 0%,transparent 100%)"
        this.pointer.style.top = ((1-opacity)*200-4)+"px";
    }

    addEventListenerForColorPicker(){
        try{
            let colorPickers  = document.querySelectorAll("[color-picked='true']");
            colorPickers.forEach((color)=>{
                let d_color = color.getAttribute("default");
                if (d_color) this.defaultColor = d_color
                else this.defaultColor = "#ffffff";
                //color.style.backgroundColor = this.defaultColor
                color.addEventListener("click",()=>{
                    this.show(color,color.getAttribute("close"))
                })
          })
        }catch{
            console.log("Not Exists Color Picker");
        }
    }
  }
const style = document.createElement("style")
style.innerHTML = `
#rgbValue, #hslaValue {
    float: right;
}

.cj-container {
    overflow: auto;
}

#showPicker {
    float: left;
}

.colorPicker .extras {
    float: right;
    margin: 0.5em;
}

.colorPicker .extras .currentColorContainer {
    overflow: hidden;
}

.colorPicker .extras .currentColor {
    float: right;
    width: 65px;
    height: 30px;
    border: 1px solid #BBB;
    -moz-border-radius: .3em;
    border-radius: .3em;
}

.colorPicker .extras .colorFields {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
}

.colorPicker .extras .color {
    text-align: right;
}

.colorPicker .extras .colorFields input {
    width: 40px;
    margin-left: 0.5em;
}

.colorPicker .extras .hex {
    float: right;
}

.colorPicker .extras .hex input {
    width: 60px;
}

.colorPicker .twod {
    float: left;
    margin: 0.5em;
}

/* main dimensions */
.colorPicker .twod, .colorPicker .twod .bg {
    width: 200px;
    height: 200px;
}
.colorPicker .oned, .colorPicker .oned .bg {
    height: 200px;
    
}
.colorPicker .oned, .colorPicker .oned .bg, .colorPicker .oned .pointer .shape {
    width: 20px;
}

.colorPicker .twod .bg {
    position: absolute;
    

    /* These seem to cause issues in some browsers, careful!
    border: 1px solid #BBB;
    -moz-border-radius: .3em;
    border-radius: .3em;
    */
}
.colorPicker .twod .pointer {
    position: relative;
    z-index: 2;
    width: 8px;
}
.colorPicker .twod .pointer .shape {
    position: absolute;
}
.colorPicker .twod .pointer .shape1 {
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border: 2px solid black;
    -moz-border-radius: 5px;
    border-radius: 5px;
}
.colorPicker .twod .pointer .shape2 {
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    border: 2px solid white;
    -moz-border-radius: 4px;
    border-radius: 4px;
}

.colorPicker .oned {
    float: left;
    margin: 0.5em;
    
}

.colorPicker .oned .bg {
    border: 1px solid #BBB;
    /*
    -moz-border-radius: .3em;
    border-radius: .3em;
    */
}
.colorPicker .oned .pointer {
    position: relative;
    z-index: 2;
}
.colorPicker .oned .pointer .shape {
    position: absolute;
    margin-left: -1px;
    margin-top: -4px;
    height: 5px;
    border: 2px solid black;
    -moz-border-radius: 5px;
    border-radius: 5px;
}
/* gradients, tweak as needed based on which browsers you want to support */
.colorPicker .oned .bg {
    background: -moz-linear-gradient(top,  #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 66%, #ff00ff 83%, #ff0000 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ff0000), color-stop(17%,#ffff00), color-stop(33%,#00ff00), color-stop(50%,#00ffff), color-stop(66%,#0000ff), color-stop(83%,#ff00ff), color-stop(100%,#ff0000));
    background: -webkit-linear-gradient(top,  #ff0000 0%,#ffff00 17%,#00ff00 33%,#00ffff 50%,#0000ff 66%,#ff00ff 83%,#ff0000 100%);
    background: -o-linear-gradient(top,  #ff0000 0%,#ffff00 17%,#00ff00 33%,#00ffff 50%,#0000ff 66%,#ff00ff 83%,#ff0000 100%);
    background: linear-gradient(to bottom,  #ff0000 0%,#ffff00 17%,#00ff00 33%,#00ffff 50%,#0000ff 66%,#ff00ff 83%,#ff0000 100%);
}

.colorPicker .twod .bg1 {
    z-index: 0;
    background: -moz-linear-gradient(left,  rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
    background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(255,255,255,1)), color-stop(100%,rgba(255,255,255,0)));
    background: -webkit-linear-gradient(left,  rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
    background: -o-linear-gradient(left,  rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
    background: linear-gradient(to right,  rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
}
.colorPicker .twod .bg2 {
    z-index: 1;
    background: -moz-linear-gradient(top,  rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0)), color-stop(100%,rgba(0,0,0,1)));
    background: -webkit-linear-gradient(top,  rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
    background: -o-linear-gradient(top,  rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
    background: linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
}

#hslPicker .twod .bg1 {
    background: -moz-linear-gradient(left,  #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 66%, #ff00ff 83%, #ff0000 100%);
    background: -webkit-gradient(linear, left top, right top, color-stop(0%,#ff0000), color-stop(17%,#ffff00), color-stop(33%,#00ff00), color-stop(50%,#00ffff), color-stop(66%,#0000ff), color-stop(83%,#ff00ff), color-stop(100%,#ff0000));
    background: -webkit-linear-gradient(left, #ff0000 0%,#ffff00 17%,#00ff00 33%,#00ffff 50%,#0000ff 66%,#ff00ff 83%,#ff0000 100%);
    background: -o-linear-gradient(left, #ff0000 0%,#ffff00 17%,#00ff00 33%,#00ffff 50%,#0000ff 66%,#ff00ff 83%,#ff0000 100%);
    background: linear-gradient(to right, #ff0000 0%,#ffff00 17%,#00ff00 33%,#00ffff 50%,#0000ff 66%,#ff00ff 83%,#ff0000 100%);
}

#hslPicker .twod .bg2 {
    background: -moz-linear-gradient(top,  rgba(0,0,0,0) 0%, rgba(127,127,127,1) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0)), color-stop(100%,rgba(127,127,127,1)));
    background: -webkit-linear-gradient(top,  rgba(0,0,0,0) 0%,rgba(127,127,127,1) 100%);
    background: -o-linear-gradient(top,  rgba(0,0,0,0) 0%,rgba(127,127,127,1) 100%);
    background: linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(127,127,127,1) 100%);
}

#hslPicker .oned .bg {
    z-index: 1;
    background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,1)), color-stop(50%,rgba(0,0,0,0)), color-stop(100%,rgba(0,0,0,1)));
    background: -webkit-linear-gradient(top,  rgba(255,255,255,1) 0%,rgba(0,0,0,0),rgba(0,0,0,1) 100%);
    background: -o-linear-gradient(top,  rgba(255,255,255,1) 0%,rgba(0,0,0,0) 50%,rgba(0,0,0,1) 100%);
    background: linear-gradient(to bottom,  rgba(255,255,255,1) 0%,rgba(0,0,0,0) 50%,rgba(0,0,0,1) 100%);
}

#hslPicker .extras {
    width: 100px;
}

#hslPicker .oned.alpha {
    margin: 0;
}

#hslPicker .oned.alpha .bg {
    background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 100%); /* FF3.6+ */
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,1)), color-stop(100%,rgba(0,0,0,1))); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(0,0,0,1) 100%); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(0,0,0,1) 100%); /* Opera 11.10+ */
    background: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(0,0,0,1) 100%); /* W3C */
}

.colorPickerDialog {
    display: flex;
    width: 500px;
    padding: 10px;
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    right: 10px;
    top:10px;
    position: fixed;
    z-index: 1000000;
    visibility: hidden;
    user-select: none;
}

.colorPicker {
    background: none;
    border: none;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.colorPicker .oned {
    margin-right: 0;
}

.config {
    flex-grow: 1;
    display: flex;
    padding: 5px 0;
    padding-left: 10px;
    align-items: center;
}

.config-title {
    text-align: center;
    padding: 15px 0;
    font-family: sans-serif;
    font-weight: bold;
}

.selected-color-text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: monospace;
    font-size: 1.2em;
    flex: 8;
    height: 100%;
    padding-left: 5px;
}

.selected-color-text input{
    width: 100%;
    height: 100%;
    text-align: center;
    outline: 0;
    border: 1px solid rgba(86, 86, 87, 0.342);
    padding: 3px 0;
}

.selected-color-text input:focus {
    border: 1px solid rgba(86, 86, 87, 0.781);
  }

.changeTypeColor{
    display: flex;
    flex: 2;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.changeTypeColor:hover{
    color: #5e4e4e;
}

.selected-color,
.saved-color {
    border: 1px solid #eeeeee;
    border-radius: 3px;
    cursor: pointer;
    width: 100%;
    height: 20px;
    margin-left: 3px;
    aspect-ratio: 1/1;
}

.saved-color:not(:last-of-type) {
    margin-bottom: 5px;
}

.groupSavedColor{
    display: flex;
    width: 100%;
    justify-content: space-around;
    height: 20px;
    margin-bottom: 3px;
}

.colorPickerDialog .close{
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: transparent;
    cursor: pointer;
}

.colorPickerDialog .opacity {
    position: relative;
    width: 20px;
    height: 200px;
    background-color: #ccc;
    border: 1px solid #000;
    margin-right: 10px;
    cursor: pointer;
  }

.viewcolor{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background: linear-gradient(to bottom, rgb(0, 0, 0) 0%,transparent 100%);
}
  
.opacity .handle {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 4px;
    background-color: transparent;
    
    border-radius: 100px;
    border: 2px solid #000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

}

.opacity .handle::after {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 24px;
    height: 4px;
    cursor: pointer;
    border-radius: 100px;
    background-color: #ffffff;
    opacity: 0.5;

}

.colorPickerDialog .groupInput{
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    margin-right: 3px;
    flex:1;
}

.colorPickerDialog .groupInput span{
    color: #6b6b6b7e;
    font-weight: bold;
}
 `
document.body.append(style)




