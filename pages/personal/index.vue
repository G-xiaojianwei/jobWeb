<template>
	<view>
		<!-- 返回 -->
		<view class="return" @click="handleBack">
			<i>返回</i>
		</view>
		<!-- 标贴 -->
		<view class="personal-title">
			<view>注册个人账号</view>
			<view>请填写注册信息</view>
		</view>
		<!-- 注册信息 -->
		<view class="code">
			<input type="text" placeholder="请输入手机号" v-model="phone" @blur="phoneTest"><i class="icon-phone"></i><span v-if="phoneS==4" ></span><span v-if="phoneS==0" style="color: #4CD964;">正确</span><span style="color: red;" v-if="phoneS==2">请正确填写</span><span v-if="phoneS==1" style="color: red;">请填写手机号</span>
		</view>
		<view class="code">
			<input type="text" placeholder="请输入密码" v-model="pwd"><i class="icon-code"></i><span></span>
		</view>
		<view class="code">
			<input type="text" placeholder="再次输入密码" v-model="pwd2" @blur="pwdTest"><i class="icon-code"></i><span v-if="pwdS==0"></span><span style="color: #4CD964;" v-if="pwdS==2">正确</span><span v-if="pwdS==1" style="color: red;">错误</span>
		</view>
		<view class="code">
			<input type="text" placeholder="请输入验证码" v-model="code"><i class="icon-code"></i><span class="codes" @click="handleGetCode">{{yzm}}</span>
		</view>
		<view class="reg">
			<button @click="handleReg">立即注册</button>
		</view>
		<view class="xy">
			注册即代表阅读并同意<span>《招聘协议》</span>及<span>《隐私政策》</span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:"",
				phoneS:4,
				pwd:"",
				pwd2:"",
				pwdS:0,
				code:"",
				getCode:"",
				yzm:"获取验证码"
			}
		},
		methods: {
			handleBack(){
				uni.navigateBack({
					delta: 2
				});
			},
			handleGetCode(){
				let _this=this;
				if(_this.yzm=="获取验证码"){
					if(_this.phone==""){
						uni.showModal({
						    title: '提示',
						    content: '请输入手机号',
						    success: function (res) {
						        
						    }
						});
						return;
					}
					let t=60;
					let items=setInterval(function(){
						_this.yzm=`请${t}s后重新获取`;
						if(t==0){
							_this.yzm=`获取验证码`;
							clearInterval(items);
						}
						t--;
					},1000)
					uni.request({
					    url: 'http://123.57.187.184/zpw/sms/SendTemplateSMS.php', 
						method:"GET",
					    data:{
					        phone:_this.phone,
					    },
					    success: (res) => {
							_this.getCode=res.data;
					    }
					});
				}
			},
			pwdTest(){
				if(this.pwd2==""){
					this.pwdS=0;
				}else if(this.pwd2!==this.pwd){
					this.pwdS=1
				}else if(this.pwd2==this.pwd){
					this.pwdS=2;
				} 
			},
			phoneTest() {
				var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;    //11位手机号码正则
				if (this.phone=="") {
					this.phoneS=1;
					return ;
				} else if (!reg_tel.test(this.phone)) {
					this.phoneS=2;
					this.phone="";
					return;
				}else if (reg_tel.test(this.phone)){
					this.phoneS=0;
				}
			},
			handleReg(){
				//判断
				var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;    //11位手机号码正则
				if (this.phone=="") {
					this.phoneS=1;
					uni.showModal({
					    title: '提示',
					    content: '请输入手机号',
					    success: function (res) {
					        
					    }
					});
					return ;
				} else if (!reg_tel.test(this.phone)) {
					this.phoneS=2;
					this.phone="";
					return;
				}
				if(this.pwd==""){
					uni.showModal({
					    title: '提示',
					    content: '请输入密码',
					    success: function (res) {
					        
					    }
					});
					return;
					}
				if(this.pwd2!==this.pwd){return;}
				// if(this.code!=this.getCode){
				// 	uni.showModal({
				// 	    title: '提示',
				// 	    content: '验证码错误，请重新输入',
				// 	    success: function (res) {
					        
				// 	    }
				// 	});
				// 	return;
				// }
				let _this=this;
				uni.request({
				    url: 'http://123.57.187.184/zpw/php/add/addPersonal.php', 
					method:"POST",
				    data:{
				        phone:_this.phone,
						pwd:_this.pwd
				    },
				    success: (res) => {
						console.log(res)
						if(res.data!==200 && res.data!==""){
							//已经注册过
							uni.showModal({
							    title: '提示',
							    content: '您已经注册，去登录吧！',
							    success: function (res) {
							        if (res.confirm) {
							           uni.navigateTo({
							               url: '/pages/login/index'
							           });
							        } else if (res.cancel) {
							            
							        }
							    }
							});
						}else if(res.data==200){
							//注册成功
							uni.showModal({
							    title: '提示',
							    content: '注册成功，去登录吧！',
							    success: function (res) {
							        if (res.confirm) {
							           uni.navigateTo({
							               url: '/pages/login/index'
							           });
							        } else if (res.cancel) {
							            
							        }
							    }
							});
						}else{
							//注册失败
						}
				    }
				});
					
			}
		}
	}
</script>

<style>
.return{
	padding: 20rpx;
}
.personal-title{
	padding: 60rpx;
}
.personal-title view:nth-child(1){
	font-size: 50rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
}
.personal-title view:nth-child(2){
	color: #666;
	font-size: 26rpx;
}
.phone,.code{
	position: relative;
	padding: 30rpx 80rpx;
	height: 80rpx;
}
.phone input,.code input{
	width: 100%;
	height: 100%;
	background: #F1F2F6;
	padding:0 0 0 60rpx;
	box-sizing: border-box;
}
.reg{
	width: 100%;
	height: 100%;
	padding: 90rpx;
	box-sizing: border-box;
}
.reg button{
	width: 100%;
	height: 100%;
}
.code input{
	padding-right: 260rpx;
}
.code span{
	position: absolute;
	right: 130rpx;
	top: 50rpx;
	color: #666;
}
.icon-phone{
	position: absolute;
	left: 87rpx;
	top: 45rpx;
	width: 50rpx;
	height: 50rpx;
	background: url(../../static/img/phone.png);
	background-size: 100% 100%;
}
.icon-code{
	position: absolute;
	left: 87rpx;
	top: 45rpx;
	width: 50rpx;
	height: 50rpx;
	background: url(../../static/img/code.png);
	background-size: 100% 100%;
}
.xy{
	padding: 90rpx;
	font-size: 26rpx;
}
.xy span{
	color: #4CD964;
}
.codes{
	font-size: 28rpx;
}
</style>
