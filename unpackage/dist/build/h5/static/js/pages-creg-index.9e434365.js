(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-creg-index"],{"0361":function(t,e,n){t.exports=n.p+"static/img/code.702d3d31.png"},1215:function(t,e,n){"use strict";n.r(e);var i=n("36e8"),o=n("68d0");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("3b78");var s,d=n("f0c5"),c=Object(d["a"])(o["default"],i["b"],i["c"],!1,null,"0346937b",null,!1,i["a"],s);e["default"]=c.exports},"1aeb":function(t,e,n){var i=n("33ad");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("4d462a16",i,!0,{sourceMap:!1,shadowMode:!1})},"1de5":function(t,e,n){"use strict";t.exports=function(t,e){return e||(e={}),t=t&&t.__esModule?t.default:t,"string"!==typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},"33ad":function(t,e,n){var i=n("24fb"),o=n("1de5"),a=n("d351"),s=n("0361");e=i(!1);var d=o(a),c=o(s);e.push([t.i,".return[data-v-0346937b]{padding:%?20?%}.personal-title[data-v-0346937b]{padding:%?60?%}.personal-title uni-view[data-v-0346937b]:nth-child(1){font-size:%?50?%;font-weight:700;margin-bottom:%?10?%}.personal-title uni-view[data-v-0346937b]:nth-child(2){color:#666;font-size:%?26?%}.phone[data-v-0346937b],.code[data-v-0346937b]{position:relative;padding:%?30?% %?80?%;height:%?80?%}.phone uni-input[data-v-0346937b],.code uni-input[data-v-0346937b]{width:100%;height:100%;background:#f1f2f6;padding:0 0 0 %?60?%;-webkit-box-sizing:border-box;box-sizing:border-box}.reg[data-v-0346937b]{width:100%;height:100%;padding:%?90?%;-webkit-box-sizing:border-box;box-sizing:border-box}.reg uni-button[data-v-0346937b]{width:100%;height:100%}.code uni-input[data-v-0346937b]{padding-right:%?260?%}.code span[data-v-0346937b]{position:absolute;right:%?130?%;top:%?50?%;color:#666}.icon-phone[data-v-0346937b]{position:absolute;left:%?87?%;top:%?45?%;width:%?50?%;height:%?50?%;background:url("+d+");background-size:100% 100%}.icon-code[data-v-0346937b]{position:absolute;left:%?87?%;top:%?45?%;width:%?50?%;height:%?50?%;background:url("+c+");background-size:100% 100%}.xy[data-v-0346937b]{padding:%?90?%;font-size:%?26?%}.xy span[data-v-0346937b]{color:#4cd964}.codes[data-v-0346937b]{font-size:%?28?%}",""]),t.exports=e},"36e8":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-view",{staticClass:"return",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.handleBack.apply(void 0,arguments)}}},[n("i",[t._v("返回")])]),n("v-uni-view",{staticClass:"personal-title"},[n("v-uni-view",[t._v("注册企业账号")]),n("v-uni-view",[t._v("请填写注册信息")])],1),n("v-uni-view",{staticClass:"code"},[n("v-uni-input",{attrs:{type:"text",placeholder:"请输入手机号"},on:{blur:function(e){arguments[0]=e=t.$handleEvent(e),t.phoneTest.apply(void 0,arguments)}},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}}),n("i",{staticClass:"icon-phone"}),4==t.phoneS?n("span"):t._e(),0==t.phoneS?n("span",{staticStyle:{color:"#4CD964"}},[t._v("正确")]):t._e(),2==t.phoneS?n("span",{staticStyle:{color:"red"}},[t._v("请正确填写")]):t._e(),1==t.phoneS?n("span",{staticStyle:{color:"red"}},[t._v("请填写手机号")]):t._e()],1),n("v-uni-view",{staticClass:"code"},[n("v-uni-input",{attrs:{type:"text",placeholder:"请输入公司名称"},model:{value:t.cname,callback:function(e){t.cname=e},expression:"cname"}}),n("i",{staticClass:"icon-phone"})],1),n("v-uni-view",{staticClass:"code"},[n("v-uni-input",{attrs:{type:"text",placeholder:"请输入密码"},model:{value:t.pwd,callback:function(e){t.pwd=e},expression:"pwd"}}),n("i",{staticClass:"icon-code"}),n("span")],1),n("v-uni-view",{staticClass:"code"},[n("v-uni-input",{attrs:{type:"text",placeholder:"再次输入密码"},on:{blur:function(e){arguments[0]=e=t.$handleEvent(e),t.pwdTest.apply(void 0,arguments)}},model:{value:t.pwd2,callback:function(e){t.pwd2=e},expression:"pwd2"}}),n("i",{staticClass:"icon-code"}),0==t.pwdS?n("span"):t._e(),2==t.pwdS?n("span",{staticStyle:{color:"#4CD964"}},[t._v("正确")]):t._e(),1==t.pwdS?n("span",{staticStyle:{color:"red"}},[t._v("错误")]):t._e()],1),n("v-uni-view",{staticClass:"code"},[n("v-uni-input",{attrs:{type:"text",placeholder:"请输入验证码"},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),n("i",{staticClass:"icon-code"}),n("span",{staticClass:"codes",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.handleGetCode.apply(void 0,arguments)}}},[t._v(t._s(t.yzm))])],1),n("v-uni-view",{staticClass:"reg"},[n("v-uni-button",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.handleReg.apply(void 0,arguments)}}},[t._v("立即注册")])],1),n("v-uni-view",{staticClass:"xy"},[t._v("注册即代表阅读并同意"),n("span",[t._v("《招聘协议》")]),t._v("及"),n("span",[t._v("《隐私政策》")])])],1)},a=[]},"3b78":function(t,e,n){"use strict";var i=n("1aeb"),o=n.n(i);o.a},"68d0":function(t,e,n){"use strict";n.r(e);var i=n("ed6e"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},d351:function(t,e){t.exports="data:image/png;base64,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"},ed6e:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{phone:"",phoneS:4,pwd:"",pwd2:"",pwdS:0,code:"",cname:"",getCode:"",yzm:"获取验证码"}},methods:{handleBack:function(){uni.navigateBack({delta:2})},handleGetCode:function(){var t=this;if("获取验证码"==t.yzm){if(""==t.phone)return void uni.showModal({title:"提示",content:"请输入手机号",success:function(t){}});var e=60,n=setInterval((function(){t.yzm="请".concat(e,"s后重新获取"),0==e&&(t.yzm="获取验证码",clearInterval(n)),e--}),1e3);uni.request({url:"http://123.57.187.184/zpw/sms/SendTemplateSMS.php",method:"GET",data:{phone:t.phone},success:function(e){t.getCode=e.data},fail:function(t){console.log(t)}})}},pwdTest:function(){""==this.pwd2?this.pwdS=0:this.pwd2!==this.pwd?this.pwdS=1:this.pwd2==this.pwd&&(this.pwdS=2)},phoneTest:function(){var t=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;if(""!=this.phone)return t.test(this.phone)?void(t.test(this.phone)&&(this.phoneS=0)):(this.phoneS=2,void(this.phone=""));this.phoneS=1},handleReg:function(){var t=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;if(""==this.phone)return this.phoneS=1,void uni.showModal({title:"提示",content:"请输入手机号",success:function(t){}});if(!t.test(this.phone))return this.phoneS=2,void(this.phone="");if(""!=this.pwd){if(this.pwd2==this.pwd){var e=this;uni.request({url:"http://123.57.187.184/zpw/php/add/addCompany.php",method:"POST",data:{phone:e.phone,name:e.cname,pwd:e.pwd},success:function(t){console.log(t,11),200!==t.data&&""!==t.data||200==t.data?uni.showModal({title:"提示",content:"您已经注册，去浏览器登录吧！"}):uni.showModal({title:"提示",content:"注册失败"})}})}}else uni.showModal({title:"提示",content:"请输入密码",success:function(t){}})}}};e.default=i}}]);