(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-invite-index"],{"1a2c":function(t,e,n){"use strict";var i=n("3005"),a=n.n(i);a.a},"20d6":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".title[data-v-e6de90d6]{position:fixed;left:0;top:0;width:100%;background:#fff;padding:%?25?% %?20?%;-webkit-box-sizing:border-box;box-sizing:border-box;text-align:center;color:#4cd964;font-size:%?36?%;border-bottom:%?1?% solid #eee}.cont[data-v-e6de90d6]{padding:%?120?% %?20?% %?20?%}.cont-item[data-v-e6de90d6]{padding:%?20?%;border-bottom:%?1?% solid #f1f2f6;font-size:%?26?%;-webkit-box-shadow:0 %?1?% %?4?% %?2?% rgba(0,0,0,.05);box-shadow:0 %?1?% %?4?% %?2?% rgba(0,0,0,.05);margin-bottom:%?20?%;-webkit-border-radius:%?10?%;border-radius:%?10?%}.cont-item uni-view[data-v-e6de90d6]{padding:%?10?% 0}.cont-item uni-view span[data-v-e6de90d6]{font-weight:700}.no[data-v-e6de90d6]{padding:%?20?%;text-align:center;font-size:%?24?%}",""]),t.exports=e},3005:function(t,e,n){var i=n("20d6");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("5486c2dc",i,!0,{sourceMap:!1,shadowMode:!1})},"428b":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{inviteArr:[]}},methods:{},mounted:function(){var t=this;uni.request({url:"http://123.57.187.184/zpw/php/query/queryInviteJobs.php?uid=".concat(t.$mp.query.uid),success:function(e){t.inviteArr=e.data}})}};e.default=i},"6ce2":function(t,e,n){"use strict";n.r(e);var i=n("9037"),a=n("e51a");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("1a2c");var r,d=n("f0c5"),u=Object(d["a"])(a["default"],i["b"],i["c"],!1,null,"e6de90d6",null,!1,i["a"],r);e["default"]=u.exports},9037:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-view",{staticClass:"title"},[t._v("面试邀请")]),n("v-uni-view",{staticClass:"cont"},t._l(t.inviteArr,(function(e,i){return n("v-uni-view",{staticClass:"cont-item"},[n("v-uni-view",[n("span",[t._v("面试岗位：")]),t._v(t._s(e.title))]),n("v-uni-view",[n("span",[t._v("面试公司：")]),t._v(t._s(e.enterprise))]),n("v-uni-view",[n("span",[t._v("邀请内容：")]),t._v(t._s(e.cont))])],1)})),1),n("v-uni-view",{staticClass:"no"},[t._v("没有更多了哟")])],1)},o=[]},e51a:function(t,e,n){"use strict";n.r(e);var i=n("428b"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a}}]);