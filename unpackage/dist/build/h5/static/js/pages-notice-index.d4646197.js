(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-notice-index"],{"1d82":function(t,n,e){"use strict";var i;e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return i}));var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"container"},[e("v-uni-view",{staticClass:"title"},[t._v(t._s(t.noticeArr.title))]),e("v-uni-view",{staticClass:"tip"},[t._v(t._s(t.noticeArr.time))]),e("v-uni-view",{staticClass:"cont"},[t._v(t._s(t.noticeArr.cont))])],1)},c=[]},4150:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={data:function(){return{noticeArr:{}}},methods:{},mounted:function(){var t=this;uni.request({url:"http://123.57.187.184/zpw/php/query/queryNotice.php?id=".concat(t.$mp.query.id),success:function(n){console.log(n.data[0]),t.noticeArr=n.data[0]}})}};n.default=i},4262:function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,".container[data-v-701c1bc0]{padding:%?20?%;-webkit-box-sizing:border-box;box-sizing:border-box}.container .title[data-v-701c1bc0]{text-align:center;font-weight:700;padding:%?20?% 0}.container .tip[data-v-701c1bc0]{font-size:%?24?%;color:#666;text-align:center;padding:0 0 %?20?%;border-bottom:%?1?% solid #f1f2f6}.container .cont[data-v-701c1bc0]{padding:%?20?% 0;text-indent:2em}",""]),t.exports=n},5981:function(t,n,e){"use strict";var i=e("7314"),r=e.n(i);r.a},"72ed":function(t,n,e){"use strict";e.r(n);var i=e("1d82"),r=e("9319");for(var c in r)"default"!==c&&function(t){e.d(n,t,(function(){return r[t]}))}(c);e("5981");var o,a=e("f0c5"),u=Object(a["a"])(r["default"],i["b"],i["c"],!1,null,"701c1bc0",null,!1,i["a"],o);n["default"]=u.exports},7314:function(t,n,e){var i=e("4262");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var r=e("4f06").default;r("2150b9dd",i,!0,{sourceMap:!1,shadowMode:!1})},9319:function(t,n,e){"use strict";e.r(n);var i=e("4150"),r=e.n(i);for(var c in i)"default"!==c&&function(t){e.d(n,t,(function(){return i[t]}))}(c);n["default"]=r.a}}]);