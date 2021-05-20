<template>
	<view>
		<!-- 返回 -->
		<view class="return" @click="handleBack">
			<i>返回</i>
		</view>
		<!-- 标贴 -->
		<view class="personal-title">
			<view>登录个人账号</view>
			<view>请填写登录信息</view>
		</view>
		<!-- 注册信息 -->
		<view class="phone">
			<input type="text" placeholder="请输入手机号" v-model="phone"><i class="icon-phone"></i>
		</view>
		<view class="code">
			<input type="password" placeholder="请输入密码" v-model="pwd"><i class="icon-code"></i>
		</view>
		<view class="code">
			<input type="text" placeholder="请输入验证码" v-model="code" class="codes"><i class="icon-code"></i>
			<canvas canvas-id="firstCanvas" id="firstCanvas" @touchstart="handleSetCanvas"></canvas>
		</view>
		<view class="reg">
			<button @click="handleLogin">登录</button>
			<button @click="handleReg">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:"",
				pwd:"",
				code:"",
				codes:"",
				img:"../../static/img/codes.png"
			}
		},
		 onReady: function (e) {
		        this.handleSetCanvas()
		    },
		methods: {
			handleBack(){
				uni.navigateBack({
				    delta: 2
				});
			},
			handleSetCanvas(){
				var context = uni.createCanvasContext('firstCanvas')
				this.codes=Math.round(Math.random()*10000);
				if(this.codes<=999){
					this.codes=Math.round(Math.random()*10000);
				}else{
					let a=String(this.codes).split("").join(" ");
					context.setStrokeStyle(this.color16())
					context.fillStyle="#ffffff";
					context.fillRect(0,0,100,40);
					context.fillStyle="#000000";
					context.rect(0, 0, 100, 40)
					context.font="24px Arial"
					context.fillText(a,13,28)
					context.drawImage(this.img,0,0);
					context.stroke()
					context.draw()
				}
				
			},
			color16(){//十六进制颜色随机
				var r = Math.floor(Math.random()*256);
				var g = Math.floor(Math.random()*256);
				var b = Math.floor(Math.random()*256);
				var color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
				return color;
			},
			handleLogin(){
				// 判断
				let _this=this;
				if(this.phone!=="" && this.pwd!==""){
					uni.request({
						url:"http://123.57.187.184/zpw/php/query/queryPersonal.php",
						data:{
							phone:_this.phone,
							pwd:_this.pwd
						},
						success(res) {
							if(res.data!==0){
								uni.reLaunch({
								    url: `/pages/my/index?id=${res.data}`
								});
							}else{
								uni.showModal({
								    title: '提示',
								    content: '手机号或密码输入错误，请重新输入！',
								    success: function (res) {
								    }
								});
								_this.codes=Math.round(Math.random()*10000);
							}
						}
					})
				}
			},
			handleReg(){
				uni.navigateTo({
				    url: `/pages/reg/index`
				});
			}
		},
		mounted() {
		 let w = window.innerWidth;
		 if(w>700){
			 uni.navigateTo({
			     url: `/pages/clogin/index`
			 });
			}
		}
	}
</script>

<style>
canvas{
	display: inline-block;
	vertical-align: middle;
	margin-left: 20rpx;
	width: 100px;
	height: 40px;
	font-style:inherit;
	background:url(../../static/img/djsx.png);
	background-size: 100% 100%;
}

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
	margin-bottom: 20rpx;
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
.codes{
	width: 170px !important; 
	display: inline-block;
	vertical-align: middle;
}
</style>
