module.exports=function(t){var o={};function e(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,e),r.l=!0,r.exports}return e.m=t,e.c=o,e.d=function(t,o,n){e.o(t,o)||Object.defineProperty(t,o,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,o){if(1&o&&(t=e(t)),8&o)return t;if(4&o&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&o&&"string"!=typeof t)for(var r in t)e.d(n,r,function(o){return t[o]}.bind(null,r));return n},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},e.p="",e(e.s=10)}([function(t,o){t.exports=flarum.core.compat["components/Button"]},function(t,o){t.exports=flarum.core.compat["utils/Stream"]},,function(t,o){t.exports=flarum.core.compat.extend},function(t,o){t.exports=flarum.core.compat["components/LogInButtons"]},function(t,o){function e(o,n){return t.exports=e=Object.setPrototypeOf||function(t,o){return t.__proto__=o,t},t.exports.default=t.exports,t.exports.__esModule=!0,e(o,n)}t.exports=e,t.exports.default=t.exports,t.exports.__esModule=!0},function(t,o){t.exports=flarum.core.compat["components/Modal"]},function(t,o){t.exports=flarum.core.compat["components/LogInButton"]},function(t,o){t.exports=flarum.core.compat["utils/extractText"]},,function(t,o,e){"use strict";e.r(o);var n=e(3),r=e(4),s=e.n(r),i=(e(7),e(5));var a=e(6),l=e.n(a),u=e(0),c=e.n(u),p=(e(8),e(1)),d=e.n(p),f=function(t){var o,e;function n(){return t.apply(this,arguments)||this}e=t,(o=n).prototype=Object.create(e.prototype),o.prototype.constructor=o,i(o,e);var r=n.prototype;return r.oninit=function(o){this.sendingSms=!1,t.prototype.oninit.call(this,o),this.email=d()(this.attrs.email||""),this.code=d()(this.attrs.code||""),this.send_button_text="发送验证码",this.success=!1},r.className=function(){return"ForgotPasswordModal Modal--small"},r.title=function(){return"短信登录"},r.content=function(){var t=this;return m("div",{className:"Modal-body"},m("div",{className:"Form Form--centered"},m("div",{className:"Form-group"},m("input",{className:"FormControl",name:"email",type:"text",placeholder:"手机号",bidi:this.email,disabled:this.loading,autocomplete:"off"})),m("div",{className:"Form-group"},m("input",{className:"FormControl",name:"code",type:"text",placeholder:"验证码",style:"width:50%;float:left;",bidi:this.code,disabled:this.loading,autocomplete:"off"}),c.a.component({className:"Button Button--primary Button--block",type:"button",style:"width:45%;",onclick:function(){return t.sendSms()},disabled:this.sendingSms,loading:this.smsloading},this.send_button_text)),m("div",{className:"Form-group"},c.a.component({className:"Button Button--primary Button--block",type:"submit",loading:this.loading},"登录 / 注册"))))},r.sendSms=function(){var o=this;this.sendingSms=!0,this.smsloading=!0,t.prototype.onerror.call(this,""),app.request({method:"POST",url:app.forum.attribute("apiUrl")+"/sendsms",body:{phone:this.email(),code:this.code()},errorHandler:this.onerror.bind(this)}).then((function(){o.success=!0,o.alert=null,o.smsloading=!1,o.send_button_text="已发送",console.log(111)})).catch((function(){})).then(this.loaded.bind(this))},r.onsubmit=function(t){var o=this;t.preventDefault(),this.loading=!0,app.request({method:"POST",url:app.forum.attribute("apiUrl")+"/smslogin",body:{phone:this.email(),code:this.code()},errorHandler:this.onerror.bind(this)}).then((function(){o.alert=null,o.success=!0,o.alert=null,window.location.reload()})).catch((function(){})).then(this.loaded.bind(this))},r.onerror=function(o){o.alert.content=o.response,t.prototype.onerror.call(this,o),this.smsloading=!1,this.sendingSms=!1,this.loading=!1,console.log("err")},n}(l.a);app.initializers.add("march/oauth-sms",(function(){Object(n.extend)(s.a.prototype,"items",(function(t){t.add("steam",m(c.a,{className:"Button LogInButton--steam LogInButton",icon:"fas fa-mobile-alt",onclick:function(){return app.modal.show(f)}},"验证码登录"))}))}))}]);
//# sourceMappingURL=forum.js.map