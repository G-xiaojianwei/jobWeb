(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-reg-index"],{3145:function(i,e,n){"use strict";var t;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return t}));var a=function(){var i=this,e=i.$createElement,n=i._self._c||e;return n("v-uni-view",[n("v-uni-view",{staticClass:"return",on:{click:function(e){arguments[0]=e=i.$handleEvent(e),i.handleBack.apply(void 0,arguments)}}},[n("i",[i._v("返回")])]),n("v-uni-view",{staticClass:"title"},[i._v("请选择您的账号类型")]),n("v-uni-view",{staticClass:"reg-item",on:{click:function(e){arguments[0]=e=i.$handleEvent(e),i.handleToReg(0)}}},[n("v-uni-view",[n("img",{attrs:{src:"/static/img/qz.png",alt:""}})]),n("v-uni-view",[n("v-uni-view",[i._v("注册个人账号")]),n("v-uni-view",[i._v("我是求职者，我要找工作")])],1)],1),n("v-uni-view",{staticClass:"reg-item",on:{click:function(e){arguments[0]=e=i.$handleEvent(e),i.handleToReg(1)}}},[n("v-uni-view",[n("img",{attrs:{src:"/static/img/qz.png",alt:""}})]),n("v-uni-view",[n("v-uni-view",[i._v("注册企业账号")]),n("v-uni-view",[i._v("我是企业，我要招人")])],1)],1),n("v-uni-view",{staticClass:"login"},[i._v("已有账号？"),n("span",{on:{click:function(e){arguments[0]=e=i.$handleEvent(e),i.handleToLogin.apply(void 0,arguments)}}},[i._v("去登录")])])],1)},c=[]},"3a1f":function(i,e,n){var t=n("24fb");e=t(!1),e.push([i.i,".return[data-v-7c9c56f9]{padding:%?20?%}.title[data-v-7c9c56f9]{font-weight:700;font-size:%?50?%;text-align:center;padding:%?80?% 0 %?40?%;-webkit-box-sizing:border-box;box-sizing:border-box}.reg-item[data-v-7c9c56f9]{width:80%;margin:0 auto;margin-bottom:%?40?%;padding:%?50?% 0;background-color:#f1f2f6;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.reg-item>uni-view[data-v-7c9c56f9]{-webkit-box-flex:3;-webkit-flex:3;flex:3;text-align:center}.reg-item>uni-view img[data-v-7c9c56f9]{width:50%}.reg-item>uni-view[data-v-7c9c56f9]:nth-child(2){-webkit-box-flex:7;-webkit-flex:7;flex:7;font-size:%?28?%;text-align:left;color:#666}.reg-item>uni-view:nth-child(2) uni-view[data-v-7c9c56f9]:nth-child(1){font-size:%?34?%;font-weight:700;color:#000;margin-bottom:%?10?%}.login[data-v-7c9c56f9]{text-align:right;padding:%?20?%;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:%?28?%}.login span[data-v-7c9c56f9]{color:#4cd964;text-decoration:underline}",""]),i.exports=e},"5d49":function(i,e,n){"use strict";n.r(e);var t=n("3145"),a=n("68fa");for(var c in a)"default"!==c&&function(i){n.d(e,i,(function(){return a[i]}))}(c);n("ec7e");var o,r=n("f0c5"),u=Object(r["a"])(a["default"],t["b"],t["c"],!1,null,"7c9c56f9",null,!1,t["a"],o);e["default"]=u.exports},"68fa":function(i,e,n){"use strict";n.r(e);var t=n("b52c"),a=n.n(t);for(var c in t)"default"!==c&&function(i){n.d(e,i,(function(){return t[i]}))}(c);e["default"]=a.a},b52c:function(i,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{}},methods:{handleToLogin:function(){uni.navigateTo({url:"/pages/login/index"})},handleBack:function(){uni.navigateBack({delta:2})},handleToReg:function(i){0==i?uni.navigateTo({url:"../personal/index"}):1==i&&uni.navigateTo({url:"../creg/index"})}}};e.default=t},ec7e:function(i,e,n){"use strict";var t=n("ffa8"),a=n.n(t);a.a},ffa8:function(i,e,n){var t=n("3a1f");"string"===typeof t&&(t=[[i.i,t,""]]),t.locals&&(i.exports=t.locals);var a=n("4f06").default;a("026c2026",t,!0,{sourceMap:!1,shadowMode:!1})}}]);