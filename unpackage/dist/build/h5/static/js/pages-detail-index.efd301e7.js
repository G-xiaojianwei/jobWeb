(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-detail-index"],{"1de5":function(e,t,n){"use strict";e.exports=function(e,t){return t||(t={}),e=e&&e.__esModule?e.default:e,"string"!==typeof e?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),t.hash&&(e+=t.hash),/["'() \t\n]/.test(e)||t.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e)}},"22a0":function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a}));var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",[n("v-uni-view",{staticClass:"return"},[n("i",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.handleBack.apply(void 0,arguments)}}},[e._v("返回")])]),n("v-uni-view",{staticClass:"header-top"},[n("v-uni-view",[e._v(e._s(e.jobsScreen.title))]),n("v-uni-view",[e._v(e._s(e.jobsScreen.endPrice)+"-"+e._s(e.jobsScreen.startPrice)+"元/"+e._s(e.jobsScreen.priceTime))]),n("v-uni-view",e._l(e.tagArr,(function(t,a){return n("span",{key:a},[e._v(e._s(t))])})),0),n("v-uni-view",[n("span",[e._v("学历要求："+e._s(e.jobsScreen.edu))]),n("span",[e._v("工作年限："+e._s(e.jobsScreen.workTime))]),n("span",[e._v("联系人："+e._s(e.jobsScreen.phoneName))]),n("span",[e._v("人数："+e._s(e.jobsScreen.num)+"人")])])],1),n("v-uni-view",{staticClass:"header-cont"},[n("i"),e._v(e._s(e.jobsScreen.enterprise))]),n("v-uni-view",{staticClass:"cont"},[n("v-uni-view",[e._v("职位内容：")]),e._l(e.contArr,(function(t,a){return n("v-uni-view",{key:a,staticClass:"font-w"},[e._v(e._s(t))])}))],2),n("v-uni-view",{staticClass:"header-cont",staticStyle:{"padding-bottom":"120rpx"}},[n("i"),e._v(e._s(e.jobsScreen.area)+"-"+e._s(e.jobsScreen.local))]),n("v-uni-view",{staticClass:"bottom"},[n("span",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.handleToHome.apply(void 0,arguments)}}},[e._v("首页")]),n("span",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.handleToPhone.apply(void 0,arguments)}}},[e._v("电话")]),n("span",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.handleToCart.apply(void 0,arguments)}}},[e._v("消息")]),n("span",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.sendResume.apply(void 0,arguments)}}},[e._v("申请职位")])])],1)},o=[]},"22b8":function(e,t,n){"use strict";n("99af"),n("ac1f"),n("1276"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{jobsScreen:[],tagArr:[],dataInfo:{},contArr:[]}},methods:{handleToIndex:function(){var e=this;uni.getStorage({key:"dataInfo",success:function(t){e.dataInfo=JSON.parse(t.data)},fail:function(e){""==e.data&&uni.navigateTo({url:"/pages/login/index"})}})},sendResume:function(){this.handleToIndex(),void 0!==this.dataInfo.uid&&uni.request({url:"http://\n123.57.187.184/zpw/php/add/addDelivery.php",method:"POST",data:{uid:this.dataInfo.uid,jid:this.jobsScreen.id,qid:this.jobsScreen.qid},success:function(e){200==e.data?uni.showToast({icon:"success",title:"简历已投递",duration:2e3}):100==e.data&&uni.showToast({icon:"success",title:"已投递，请勿多次操作",duration:2e3})}})},handleToCart:function(){var e=this;uni.getStorage({key:"dataInfo",success:function(t){uni.navigateTo({url:"/pages/chat/index?jid=".concat(e.jobsScreen.id,"&uid=").concat(e.dataInfo.uid,"&cid=").concat(e.jobsScreen.qid,"&cname=").concat(e.jobsScreen.enterprise,"&phoneName=").concat(e.jobsScreen.phoneName,"&title=").concat(e.jobsScreen.title,"&name=").concat(e.dataInfo.name)})},fail:function(e){""==e.data&&uni.navigateTo({url:"/pages/login/index"})}})},handleToHome:function(){uni.reLaunch({url:"/pages/index/index"})},handleToPhone:function(){this.handleToIndex(),uni.makePhoneCall({phoneNumber:this.jobsScreen.phone})},handleBack:function(){uni.navigateBack({delta:2})}},mounted:function(){var e=this,t=this;uni.getStorage({key:"dataInfo",success:function(e){t.dataInfo=JSON.parse(e.data),""!==e.data&&uni.request({url:"http://123.57.187.184/zpw/php/add/addHistory.php",method:"POST",data:{uid:JSON.parse(e.data).uid,jid:t.$mp.query.id},success:function(e){console.log(e)}})}}),uni.request({url:"http://\n123.57.187.184/zpw/php/query/queryJobs.php?id=".concat(this.$mp.query.id),success:function(t){e.jobsScreen=t.data[0],e.tagArr=e.jobsScreen.tag.split("/"),e.contArr=e.jobsScreen.cont.split(/\n/)}})}};t.default=a},"5faa":function(e,t,n){"use strict";n.r(t);var a=n("22a0"),i=n("e662");for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("835a");var d,r=n("f0c5"),s=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"be916350",null,!1,a["a"],d);t["default"]=s.exports},"7a92":function(e,t,n){e.exports=n.p+"static/img/gs.53357840.png"},"835a":function(e,t,n){"use strict";var a=n("9f1e"),i=n.n(a);i.a},"9f1e":function(e,t,n){var a=n("f6db");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("7c3a9568",a,!0,{sourceMap:!1,shadowMode:!1})},e662:function(e,t,n){"use strict";n.r(t);var a=n("22b8"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},f6db:function(e,t,n){var a=n("24fb"),i=n("1de5"),o=n("7a92");t=a(!1);var d=i(o);t.push([e.i,".return[data-v-be916350]{position:fixed;left:0;top:0;background:#fff;width:100%;padding:%?20?%;text-align:center;border-bottom:%?20?% solid #f1f2f6}.return i[data-v-be916350]{float:left}.header-top[data-v-be916350]{padding:%?160?% %?20?% %?50?%;border-bottom:%?1?% solid #eee}.header-top uni-view[data-v-be916350]:nth-child(1){font-size:%?50?%;margin-bottom:%?20?%}.header-top uni-view[data-v-be916350]:nth-child(2){color:red;margin-bottom:%?20?%}.header-top uni-view:nth-child(3) span[data-v-be916350]{padding:%?10?% %?20?%;background:#f1f2f6;margin-right:%?10?%;font-size:%?24?%}.header-top uni-view[data-v-be916350]:nth-child(4){padding-top:%?30?%}.header-top uni-view:nth-child(4) span[data-v-be916350]{margin-right:%?40?%;font-size:%?28?%}.header-cont[data-v-be916350]{padding:%?40?% %?20?%;border-bottom:%?1?% solid #eee;border-top:%?1?% solid #eee}.header-cont i[data-v-be916350]{display:inline-block;vertical-align:middle;margin-right:%?20?%;width:%?60?%;height:%?60?%;background:url("+d+");background-size:100% 100%}.cont[data-v-be916350]{padding:%?40?% %?20?%}.cont uni-view[data-v-be916350]{font-weight:700;margin-bottom:%?20?%}.bottom[data-v-be916350]{position:fixed;left:0;bottom:0;width:100%;height:%?80?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;border-top:%?1?% solid #eee;background:#fff}.bottom span[data-v-be916350]{-webkit-box-flex:1;-webkit-flex:1;flex:1;height:100%;line-height:%?80?%;text-align:center;border-left:%?1?% solid #eee}.bottom span[data-v-be916350]:nth-child(4){background:#4cd964;color:#fff;border-right:%?1?% solid #eee}.font-w[data-v-be916350]{font-weight:100!important;margin-bottom:%?5?%!important;font-size:%?30?%}",""]),e.exports=t}}]);