!function(t){function e(n){if(i[n])return i[n].exports;var o=i[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){"use strict";var n=i(11),o=i(3),a=i(2);n.addListeners({load:function(){o.init([i(22),i(23),i(20),i(21),i(19)])},done:function(){o.navigate("pageMain")},keydown:function(t){t.code===a.back&&o.back()}})},function(t,e,i){/**
	 * @module stb/component
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
"use strict";function n(t){var e,i,s=this;if(this.$node=null,this.$body=null,this.page=null,this.parent=null,this.children=[],t=t||{},"object"!=typeof t)throw"wrong config type";if(o.call(this,t.data),void 0!==t.$node){if(!(t.$node instanceof Node))throw"wrong config.$node type";this.$node=t.$node}else this.$node=document.createElement("div");if(void 0!==t.$body){if(!(t.$body instanceof Node))throw"wrong config.$body type";this.$body=t.$body}else this.$body=this.$node;if(void 0!==t.$content){if(!(t.$content instanceof Node))throw"wrong config.$content type";this.$body.appendChild(t.$content)}if(this.$node.classList.add("component"),void 0!==t["class"]){if("string"!=typeof t["class"]||0===t["class"].length)throw"wrong config.class type or empty value";this.$node.classList.add(t["class"])}if(void 0!==t.parent){if(!(t.parent instanceof n))throw"wrong config.parent type";t.parent.add(this)}if(void 0!==t.page){if(!(t.page instanceof n))throw"wrong config.page type";this.page=t.page}if(void 0!==t.events&&this.addListeners(t.events),this.id=t.id||this.$node.id||"id"+a++,t.children){if(!Array.isArray(t.children))throw"wrong config.children type";for(e=0,i=t.children.length;i>e;e++)this.add(t.children[e])}this.$node.addEventListener("click",function(t){0===t.button&&(s.focus(),s.emit("click")),1===t.button,t.stopPropagation()}),this.$node.component=this.$body.component=this,this.$node.title="component "+this.constructor.name+"."+this.id+" (outer)",this.$body.title="component "+this.constructor.name+"."+this.id+" (inner)"}var o=i(7),a=0;n.prototype=Object.create(o.prototype),n.prototype.constructor=n,n.prototype.add=function(t){var e;for(e=0;e<arguments.length;e++){if(t=arguments[e],!(t instanceof n))throw"wrong child type";this.children.push(t),t.parent=this,t.page=this.page,void 0!==t.$node&&null===t.$node.parentNode&&this.$body.appendChild(t.$node),this.emit("add",{item:t})}},n.prototype.remove=function(){this.parent&&(this.page.activeComponent===this&&(this.blur(),this.parent.focus()),this.parent.children.splice(this.parent.children.indexOf(this),1)),this.clear(),this.removeAllListeners(),this.$node.parentNode.removeChild(this.$node),this.emit("remove")},n.prototype.focus=function(){var t=this.page.activeComponent;return this.page&&this!==t?(t&&t.blur(),this.page.activeComponent=t=this,t.$node.classList.add("focus"),t.emit("focus"),!0):!1},n.prototype.blur=function(){return this.page&&this===this.page.activeComponent?(this.$node.classList.remove("focus"),this.page.activeComponent=null,this.emit("blur"),!0):!1},t.exports=n},function(t){"use strict";t.exports={back:8,num1:49,num2:50,num3:51,num4:52,num5:53,num6:54,num7:55,num8:56,num9:57,num0:48,"delete":46,channelPrev:1009,channelNext:9,ok:13,exit:27,up:38,down:40,left:37,right:39,pageUp:33,pageDown:34,end:35,home:36,volumeUp:107,volumeDown:109,f1:112,f2:113,f3:114,f4:115,refresh:116,frame:117,phone:119,set:120,tv:121,menu:122,web:123,mic:2032,rewind:2066,forward:2070,app:2076,usbMounted:2080,usbUnmounted:2081,playPause:2082,stop:2083,power:2085,record:2087,info:2089,mute:2192,clock:2032,audio:2071,keyboard:2076}},function(t,e,i){/**
	 * @module stb/router
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
"use strict";var n,o=i(7);n=new o,n.current=null,n.history=[],n.pages=[],n.ids={},n.init=function(t){var e,i,n;if(void 0!==t){if(!Array.isArray(t))throw"wrong pages type";for(this.pages=[],this.pages=t,e=0,i=t.length;i>e;e++)n=t[e],this.ids[n.id]=n,n.active&&(this.current=n);return this.emit("init",{pages:t}),!0}return!1},n.parse=function(t){var e={name:"",data:[]};return e.data=t.split("/").map(decodeURIComponent),e.name=e.data.shift().slice(1),e},n.stringify=function(t,e){return e=Array.isArray(e)?e:[],t=encodeURIComponent(t),e=e.map(encodeURIComponent),e.unshift(t),e.join("/")},n.show=function(t,e){return t&&!t.active?(t.$node.classList.add("active"),t.active=!0,this.current=t,t.emit("show",{page:t,data:e}),!0):!1},n.hide=function(t){return t&&t.active?(t.$node.classList.remove("active"),t.active=!1,this.current=null,t.emit("hide",{page:t}),!0):!1},n.navigate=function(t,e){var i=this.current,n=this.ids[t];if(!n||"object"!=typeof n)throw"wrong pageTo type";if(!("active"in n))throw'missing field "active" in pageTo';return n&&!n.active?(location.hash=this.stringify(t,e),this.hide(this.current),this.show(n,e),this.emit("navigate",{from:i,to:n}),this.history.push(n),!0):!1},n.back=function(){var t,e;return this.history.length>1&&(t=this.history.pop(),e=this.history[this.history.length-1],e&&!e.active)?(location.hash=e.id,this.hide(this.current),this.show(e),this.emit("navigate",{from:t,to:e}),!0):!1},t.exports=n},function(t,e,i){/**
	 * @module stb/ui/page
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
"use strict";function n(t){this.active=!1,this.activeComponent=null,t=t||{},o.call(this,t),this.$node.classList.add("page"),this.active=this.$node.classList.contains("active"),null===this.$node.parentNode&&document.body.appendChild(this.$node),this.page=this}var o=i(1);n.prototype=Object.create(o.prototype),n.prototype.constructor=n,t.exports=n},function(t,e,i){/**
	 * @module stb/ui/button
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
"use strict";function n(t){var e=this;t=t||{},o.call(this,t),this.$node.classList.add("button"),this.$body.innerHTML=t.value||this.constructor.name+"."+this.id,t.icon&&(e.$node.classList.add("icon"),e.$node.classList.add("icon-"+t.icon)),this.addListener("keydown",function(t){13===t.code&&e.emit("click")}),this.addListener("click",function(){e.$node.classList.add("click"),setTimeout(function(){e.$node.classList.remove("click")},200)})}var o=i(1);n.prototype=Object.create(o.prototype),n.prototype.constructor=n,t.exports=n},function(t,e,i){/**
	 * @module stb/ui/panel
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
"use strict";function n(t){t=t||{},o.call(this,t),this.$node.classList.add("panel")}var o=i(1);n.prototype=Object.create(o.prototype),n.prototype.constructor=n,t.exports=n},function(t){/**
	 * @module stb/emitter
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
"use strict";function e(){this.events={}}e.prototype={addListener:function(t,e){if(2!==arguments.length)throw"wrong arguments number";if("string"!=typeof t||0===t.length)throw"wrong or empty name";if("function"!=typeof e)throw"wrong callback type";t&&"function"==typeof e&&(this.events[t]=this.events[t]||[],this.events[t].push(e))},once:function(t,e){var i=this;if(2!==arguments.length)throw"wrong arguments number";if("string"!=typeof t||0===t.length)throw"wrong or empty name";if("function"!=typeof e)throw"wrong callback type";t&&"function"==typeof e&&(this.events[t]=this.events[t]||[],this.events[t].push(function n(o){e(o),i.removeListener(t,n)}))},addListeners:function(t){var e;if(1!==arguments.length)throw"wrong arguments number";if("object"!=typeof t)throw"wrong callbacks type";if(0===Object.keys(t).length)throw"no callbacks given";if("object"==typeof t)for(e in t)t.hasOwnProperty(e)&&this.addListener(e,t[e])},removeListener:function(t,e){if(2!==arguments.length)throw"wrong arguments number";if("string"!=typeof t||0===t.length)throw"wrong or empty name";if("function"!=typeof e)throw"wrong callback type";Array.isArray(this.events[t])&&(this.events[t]=this.events[t].filter(function(t){return t!==e}),0===this.events[t].length&&delete this.events[t])},removeAllListeners:function(t){if(0!==arguments.length&&("string"!=typeof t||0===t.length))throw"wrong or empty name";if(0===arguments.length)this.events={};else if(t){if(void 0!==this.events[t])throw"event is not removed";delete this.events[t]}},emit:function(t,e){var i,n=this.events[t];if(arguments.length<1)throw"wrong arguments number";if("string"!=typeof t||0===t.length)throw"wrong or empty name";if(void 0!==n){if(!Array.isArray(n))throw"wrong event type";for(i=0;i<n.length;i++){if("function"!=typeof n[i])throw"wrong event callback type";n[i](e)}}}},t.exports=e},function(t){/**
	 * @module stb/dom
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
"use strict";var e={};e.tag=function(t,e){var i,n,o=null;if(t){if(o=document.createElement(t),e&&"object"==typeof e)for(n in e)o[n]=e[n];for(i=2;i<arguments.length;i++)arguments[i]&&o.appendChild("object"==typeof arguments[i]?arguments[i]:document.createTextNode(arguments[i]))}return o},e.fragment=function(t){var e,i=document.createDocumentFragment();for(e=0;e<arguments.length;e++)t=arguments[e],t&&i.appendChild("object"==typeof t?t:document.createTextNode(t));return i},e.add=function(t){var e;if(t instanceof Node){for(e=1;e<arguments.length;e++)arguments[e]&&t.appendChild("object"==typeof arguments[e]?arguments[e]:document.createTextNode(arguments[e]));return t}return null},e.remove=function(){var t,e=0;for(t=0;t<arguments.length;t++)arguments[t]&&arguments[t].parentNode&&arguments[t].parentNode.removeChild(arguments[t])===arguments[t]&&e++;return arguments.length>0&&e===arguments.length},t.exports=e},function(t,e,i){/**
	 * @module stb/ui/modal.box
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
"use strict";function n(t){var e;t=t||{},o.call(this,t),this.$node.classList.add("modalBox"),e=this.$body,e.appendChild(a.tag("div",{className:"cell"},this.$body=a.tag("div",{className:"content"},"qwe")))}var o=i(10),a=i(8);n.prototype=Object.create(o.prototype),n.prototype.constructor=n,t.exports=n},function(t,e,i){/**
	 * @module stb/ui/modal
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
"use strict";function n(t){t=t||{},o.call(this,t),this.$node.classList.add("modal")}var o=i(1);n.prototype=Object.create(o.prototype),n.prototype.constructor=n,t.exports=n},function(t,e,i){/**
	 * @module stb/app
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
"use strict";var n,o,a=i(12),s=i(3);i(13),n=new a({debug:!1,host:!0,screen:null,time:{init:+new Date,load:0,done:0}}),n.setScreen=function(t){t.availHeight=t.height-(t.availTop+t.availBottom),t.availWidth=t.width-(t.availLeft+t.availRight),window.moveTo(0,0),window.resizeTo(t.width,t.height),o&&document.head.removeChild(o),o=document.createElement("link"),o.rel="stylesheet",o.href="css/"+t.height+".css",document.head.appendChild(o),this.data.screen=t},n.setScreen(i(24)[screen.height]),window.addEventListener("load",function(t){var e;n.data.time.load=t.timeStamp,n.emit(t.type,t),s.pages.forEach(function(e){e.emit(t.type,t)}),location.hash&&(e=s.parse(location.hash),s.navigate(e.name,e.data)),n.data.time.done=+new Date,n.emit("done",t)}),window.addEventListener("unload",function(t){s.pages.forEach(function(e){e.emit(t.type,t)})}),window.addEventListener("error",function(t){}),window.addEventListener("keydown",function(t){var e=s.current;0!==t.keyCode&&(t.code=t.keyCode,t.shiftKey&&(t.code+=1e3),t.altKey&&(t.code+=2e3),e&&(e.activeComponent&&e.activeComponent!==e&&e.activeComponent.emit(t.type,t),t.stop||e.emit(t.type,t)),t.stop||n.emit(t.type,t))}),window.addEventListener("click",function(t){}),window.addEventListener("contextmenu",function(t){n.data.debug||t.preventDefault()}),t.exports=n},function(t,e,i){/**
	 * @module stb/model
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
"use strict";function n(t){if(void 0!==t&&"object"!=typeof t)throw"wrong data type";o.call(this),this.data=t||{}}var o=i(7);n.prototype=Object.create(o.prototype),n.prototype.constructor=n,n.prototype.idName="id",n.prototype.clear=function(){var t=this.data;if("object"!=typeof t)throw"wrong data type";return Object.keys(t).length>0?(this.data={},this.emit("clear",{data:t}),!0):!1},n.prototype.init=function(t){if("object"!=typeof t)throw"wrong data type";return t?(this.clear(),this.data=t,this.emit("init",{data:t}),!0):!1},n.prototype.has=function(t){if("object"!=typeof this.data)throw"wrong this.data type";return this.data.hasOwnProperty(t)},n.prototype.get=function(t){if("object"!=typeof this.data)throw"wrong this.data type";return this.data[t]},n.prototype.set=function(t,e){var i=t in this.data,n={name:t,curr:e};if("object"!=typeof this.data)throw"wrong this.data type";return i?(n.prev=this.data[t],e!==n.prev?(this.data[t]=e,this.emit("change",n),!0):!1):(this.data[t]=e,this.emit("change",n),!0)},n.prototype.unset=function(t){var e,i=t in this.data;if("object"!=typeof this.data)throw"wrong this.data type";return i?(e={name:t,prev:this.data[t]},delete this.data[t],this.emit("change",e),!0):!1},t.exports=n},function(){/**
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
"use strict";if(!("classList"in document.documentElement)){var t=Array.prototype,e=t.indexOf,i=t.slice,n=t.push,o=t.splice,a=t.join;window.DOMTokenList=function(t){if(this._element=t,t.className!==this._classCache){if(this._classCache=t.className,!this._classCache)return;var e,i=this._classCache.replace(/^\s+|\s+$/g,"").split(/\s+/);for(e=0;e<i.length;e++)n.call(this,i[e])}},window.DOMTokenList.prototype={add:function(t){this.contains(t)||(n.call(this,t),this._element.className=i.call(this,0).join(" "))},contains:function(t){return-1!==e.call(this,t)},item:function(t){return this[t]||null},remove:function(t){var n=e.call(this,t);-1!==n&&(o.call(this,n,1),this._element.className=i.call(this,0).join(" "))},toString:function(){return a.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},Object.defineProperty(Element.prototype,"classList",{get:function(){return new window.DOMTokenList(this)}})}},function(t,e,i){/**
	 * @module stb/ui/check.box
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
"use strict";function n(t){var e=this;t=t||{},this.value=!!t.value,o.call(this,t),this.$node.classList.add("checkBox"),this.value&&this.$node.classList.add("checked"),this.addListeners({click:function(){e.check(!e.value)},keydown:function(t){t.code===a.ok&&e.check(!e.value)}})}var o=i(1),a=i(2);n.prototype=Object.create(o.prototype),n.prototype.constructor=n,n.prototype.check=function(t){return this.value!==t?(this.value=!this.value,this.$node.classList.toggle("checked"),this.emit("check",{value:this.value}),!0):!1},t.exports=n},function(t,e,i){/**
	 * @module stb/ui/grid
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
"use strict";function n(t){var e,i,n,s,r=this;if(this.activeItem=null,this.activeIndex=0,this.data=[],this.type=0,this.size=5,this.render=this.defaultRender,t=t||{},o.call(this,t),this.$node.classList.add("grid"),void 0!==t.data){if(!Array.isArray(t.data))throw"wrong config.data type";this.data=t.data}if(void 0!==t.render){if("function"!=typeof t.render)throw"wrong config.render type";this.render=t.render}for(this.$body=document.createElement("table"),this.$node.appendChild(this.$body),e=0;e<this.data.length;e++){for(n=this.$body.insertRow(),i=0;i<this.data[e].length;i++){s=n.insertCell(-1),s.x=i,s.y=e,s.className="cell";var c=this.data[e][i];"object"==typeof c?(s.innerHTML=c.value,s.colSpan=c.colSpan||1,s.rowSpan=c.rowSpan||1):s.innerHTML=c}this.$body.appendChild(n)}this.activeItem=this.$body.rows[0].cells[0],this.$body.rows[0].cells[0].classList.add("focus"),this.addListener("keydown",function(t){switch(t.code){case a.up:break;case a.down:break;case a.right:r.focusItem(r.activeItem.nextSibling);break;case a.left:r.focusItem(r.activeItem.previousSibling)}t.code===a.pageUp&&(r.focusItem(r.$body.firstChild),r.activeIndex=r.activeItem.index),t.code===a.pageDown&&(r.focusItem(r.$body.lastChild),r.activeIndex=r.activeItem.index)}),this.$body.addEventListener("mousewheel",function(t){var e=t.wheelDeltaY>0;r.emit("keydown",{code:e?a.up:a.down})})}var o=i(1),a=i(2);n.prototype=Object.create(o.prototype),n.prototype.constructor=n,n.prototype.TYPE_VERTICAL=1,n.prototype.TYPE_HORIZONTAL=2,n.prototype.moveNext=function(){},n.prototype.movePrev=function(){},n.prototype.renderPage=function(){},n.prototype.defaultRender=function(t,e){t.innerHTML=e},n.prototype.focusItem=function(t){var e=this.activeItem;if(void 0!==t&&e!==t){if(!(t instanceof Node))throw"wrong $item type";if(void 0!==e){if(!(e instanceof Node))throw"wrong $prev type";e.classList.remove("focus")}return this.activeItem=t,t.classList.add("focus"),this.emit("move",{prev:e,curr:t}),!0}return!1},n.prototype.focusNext=function(){return this.activeItem!==this.$body.lastChild?(this.activeIndex++,this.focusItem(this.activeItem.nextSibling)):!1},n.prototype.focusPrev=function(){return this.activeItem!==this.$body.firstChild?(this.activeIndex--,this.focusItem(this.activeItem.previousSibling)):!1},t.exports=n},function(t,e,i){/**
	 * @module stb/ui/list
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
"use strict";function n(t){var e,i,n=this,s=0;if(this.activeItem=null,this.activeIndex=0,this.data=[],this.type=this.TYPE_VERTICAL,this.size=5,this.render=this.defaultRender,t=t||{},o.call(this,t),void 0!==t.size){if(Number(t.size)!==t.size)throw"config.size must be a number";this.size=t.size}if(void 0!==t.type){if(Number(t.type)!==t.type)throw"config.type must be a number";this.type=t.type}if(this.$node.classList.add("list"),void 0!==t.data){if(!Array.isArray(t.data))throw"wrong config.data type";this.data=t.data}if(void 0!==t.render){if("function"!=typeof t.render)throw"wrong config.render type";this.render=t.render}for(this.type===this.TYPE_HORIZONTAL&&this.$node.classList.add("horizontal"),e=0;e<this.size;e++)i=document.createElement("div"),i.index=e,i.className="item",void 0!==this.data[e]&&(this.render(i,this.data[e]),i.addEventListener("click",function(){n.activeIndex=this.index,n.focusItem(this)})),this.$body.appendChild(i);null===this.activeItem&&(this.activeItem=this.$body.firstChild,this.activeItem.classList.add("focus")),this.addListener("keydown",function(t){(t.code===a.up&&n.type===n.TYPE_VERTICAL||t.code===a.left&&n.type===n.TYPE_HORIZONTAL)&&n.activeIndex>0&&(s--,n.focusPrev()||(n.$body.insertBefore(n.$body.lastChild,n.$body.firstChild),n.render(n.$body.firstChild,n.data[n.activeIndex-1]),n.$body.firstChild.index=n.activeIndex-1,n.focusPrev())),(t.code===a.down&&n.type===n.TYPE_VERTICAL||t.code===a.right&&n.type===n.TYPE_HORIZONTAL)&&n.activeIndex<n.data.length-1&&(s++,n.focusNext()||(n.$body.appendChild(n.$body.firstChild),n.render(n.$body.lastChild,n.data[n.activeIndex+1]),n.$body.lastChild.index=n.activeIndex+1,n.focusNext())),t.code===a.pageUp&&(n.focusItem(n.$body.firstChild),n.activeIndex=n.activeItem.index),t.code===a.pageDown&&(n.focusItem(n.$body.lastChild),n.activeIndex=n.activeItem.index)}),this.$body.addEventListener("mousewheel",function(t){var e=t.wheelDeltaY>0;n.emit("keydown",{code:e?a.up:a.down})})}var o=i(1),a=i(2);n.prototype=Object.create(o.prototype),n.prototype.constructor=n,n.prototype.TYPE_VERTICAL=1,n.prototype.TYPE_HORIZONTAL=2,n.prototype.moveNext=function(){},n.prototype.movePrev=function(){},n.prototype.renderPage=function(){},n.prototype.defaultRender=function(t,e){t.innerHTML=e},n.prototype.focusItem=function(t){var e=this.activeItem;if(void 0!==t&&e!==t){if(!(t instanceof Node))throw"wrong $item type";if(void 0!==e){if(!(e instanceof Node))throw"wrong $prev type";e.classList.remove("focus")}return this.activeItem=t,t.classList.add("focus"),this.emit("move",{prev:e,curr:t}),!0}return!1},n.prototype.focusNext=function(){return this.activeItem!==this.$body.lastChild?(this.activeIndex++,this.focusItem(this.activeItem.nextSibling)):!1},n.prototype.focusPrev=function(){return this.activeItem!==this.$body.firstChild?(this.activeIndex--,this.focusItem(this.activeItem.previousSibling)):!1},t.exports=n},function(t,e,i){/**
	 * @module stb/ui/modal.message
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
"use strict";function n(t){t=t||{},o.call(this,t),this.$node.classList.add("modalMessage"),this.$body.appendChild(a.tag("div",{className:"cell"},this.$header=a.tag("div",{className:"header"},this.constructor.name),this.$body=a.tag("div",{className:"content"},this.constructor.name),this.$footer=a.tag("div",{className:"footer"},this.constructor.name)))}var o=i(9),a=i(8);n.prototype=Object.create(o.prototype),n.prototype.constructor=n,t.exports=n},function(t,e,i){/**
	 * @module stb/ui/progress.bar
	 * @author Igor Zaporozhets <deadbyelpy@gmail.com>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
"use strict";function n(t){if(t=t||{},this.max=100,this.min=0,this.value=0,this.step=1,void 0!==t.max){if(Number(t.max)!==t.max)throw"config.max value must be a number";this.max=t.max}if(void 0!==t.min){if(Number(t.min)!==t.min)throw"config.min value must be a number";this.min=t.min}if(void 0!==t.value){if(Number(t.value)!==t.value)throw"config.value must be a number";if(t.value>this.max)throw"config.value more than config.maximum";if(t.value<this.min)throw"config.value less than config.minimum";this.value=t.value}void 0===t.$body&&(t.$body=document.createElement("div")),this.step=Math.abs(this.max-this.min)/100,o.call(this,t),this.$node.classList.add("progressBar"),this.$body.className="value",this.$node.appendChild(this.$body),this.$body.style.width=Math.abs(this.min-this.value)/this.step+"%"}var o=i(1);n.prototype=Object.create(o.prototype),n.prototype.constructor=n,n.prototype.set=function(t){var e=this.value;if(this.value!==t&&t<=this.max&&t>=this.min){if(Number(t)!==t)throw"value must be a number";return this.value=t,t=Math.abs(this.min-this.value)/this.step,t>=100?(t=100,this.value=this.max,this.emit("complete",{value:this.value})):0>t&&(t=0,this.value=this.min),this.$body.style.width=t+"%",this.emit("change",{value:this.value,prevValue:e}),!0}return!1},t.exports=n},function(t,e,i){"use strict";{var n="pageButton",o=document.getElementById(n),a=i(4),s=i(5),r=i(6),c=new a({$node:o}),d=i(3);i(2)}c.addListener("load",function(){var t,e,i=new r;c.add(i),i.add(new r({$node:document.getElementById("pageButtonTitle")})),i.add(t=new r),t.add(e=new s({icon:"back",value:"page Base",events:{click:function(){d.navigate("pageMain")}}})),e.focus()}),c.addListener("show",function(t){}),c.addListener("keydown",function(){}),t.exports=c},function(t,e,i){"use strict";{var n="pageGrid",o=document.getElementById(n),a=i(4),s=i(5),r=i(6),c=i(15),d=new a({$node:o}),h=i(3);i(2)}d.addListener("load",function(){var t,e,i,n,o=new r;d.add(o),o.add(new r({$node:document.getElementById("pageGridTitle")})),o.add(t=new r),t.add(e=new s({icon:"back",value:"page Base",events:{click:function(){h.navigate("pageMain")}}})),e.focus(),o.add(i=new r),i.add(n=new c({data:[[1,2,3,4,5],[6,{value:"789",colSpan:3},10],[{value:"11<br>21",rowSpan:2},12,13,14,{value:"15<br>25",rowSpan:2}],[22,23,24],[{value:"26-30",colSpan:5}]],render:function(t,e){t.innerHTML="["+e+"]"}})),n.focus()}),d.addListener("show",function(t){}),d.addListener("keydown",function(){}),t.exports=d},function(t,e,i){"use strict";{var n="pageHelp",o=document.getElementById(n),a=i(4),s=i(5),r=i(6),c=new a({$node:o}),d=i(3);i(2)}c.addListener("load",function(){var t,e,i=new r;c.add(i),i.add(new r({$node:document.getElementById("pageHelpTitle")})),i.add(t=new r),t.add(e=new s({icon:"back",value:"page Base",events:{click:function(){d.navigate("pageMain")}}})),e.focus()}),c.addListener("show",function(t){}),c.addListener("keydown",function(){}),t.exports=c},function(t,e,i){/**
	 * Loading page implementation.
	 *
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
"use strict";var n="pageInit",o=i(4),a=new o({$node:document.getElementById(n)});t.exports=a},function(t,e,i){"use strict";var n="pageMain",o=document.getElementById(n),a=i(10),s=i(9),r=i(17),c=i(6),d=i(5),h=i(14),u=i(18),l=i(16),p=i(4),f=new p({$node:o}),v=i(3),m=i(2);f.addListener("load",function(){var t,e,i,n,o,p=new c({content:"a2"}),y=new c;f.add(y),y.add(new c({$node:document.getElementById("pageMainTitle")})),y.add(i=new c),i.add(new d({icon:"menu",value:"page Button",events:{click:function(){v.navigate("pageButton")}}}),new d({icon:"menu",value:"page Grid",events:{click:function(){v.navigate("pageGrid")}}}),new d({icon:"menu",value:"page Help",events:{click:function(){v.navigate("pageHelp")}}})),y.add(p),y.add(e=new d({content:"b1",value:"Show modal"})),e.addListener("click",function(){y.add(e=new d({icon:"small",value:"Show modal"}))}),e.focus(),p.addListener("keydown",function(e){49===e.code&&(t=new a,y.add(t),t.focus()),50===e.code&&(t=new s,y.add(t),t.focus()),51===e.code&&(t=new r,y.add(t),t.focus()),32===e.code&&(t=new r,y.add(t),t.focus(),t.addListener("keydown",function(e){27===e.code&&t.remove(),32===e.code&&v.navigate("pageHelp")}))}),p.add(new h),p.add(new h({value:!0})),y.add(i=new c),i.add(n=new l({data:[34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55],render:function(t,e){t.innerHTML="["+e+"]"}})),n.focus(),y.add(i=new c),i.add(n=new l({data:[34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],type:l.prototype.TYPE_HORIZONTAL})),y.add(i=new c),i.add(o=new u({value:50,events:{keydown:function(t){t.code===m.right&&o.set(o.value+1),t.code===m.left&&o.set(o.value-1)}}}))}),f.addListener("keydown",function(){}),t.exports=f},function(t){/**
	 * Application geometry options for js/less.
	 *
	 * @author Stanislav Kalashnik <sk@infomir.eu>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */
"use strict";t.exports={480:{height:480,width:720,availTop:24,availBottom:24,availRight:32,availLeft:48},576:{height:576,width:720,availTop:24,availBottom:24,availRight:28,availLeft:54},720:{height:720,width:1280,availTop:10,availBottom:10,availRight:10,availLeft:10},1080:{height:1080,width:1920,availTop:15,availBottom:15,availRight:15,availLeft:15}}}]);