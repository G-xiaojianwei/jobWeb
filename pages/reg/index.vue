<template>
	<view>
		<!-- 返回 -->
		<view class="return" @click="handleBack">
			<i>返回</i>
		</view>
		<!-- 标题 -->
		<view class="title">
			请选择您的账号类型
		</view>
		<!-- 个人账号 -->
		<view class="reg-item" @click="handleToReg(0)">
			<view>
				<img src="/static/img/qz.png" alt="">
			</view>
			<view>
				<view>注册个人账号</view>
				<view>我是求职者，我要找工作</view>
			</view>
		</view>
		<!-- 企业账号 -->
		<view class="reg-item" @click="handleToReg(1)">
			<view>
				<img src="/static/img/qz.png" alt="">
			</view>
			<view>
				<view>注册企业账号</view>
				<view>我是企业，我要招人</view>
			</view>
		</view>
		<view class="login">
			已有账号？<span @click="handleToLogin">去登录</span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			handleToLogin(){
				uni.navigateTo({
					url:"/pages/login/index"
				})
			},
			handleBack(){
				uni.navigateBack({
				    delta: 2
				});
			},
			handleToReg(v){
				if(v==0){
					uni.navigateTo({
						url:"../personal/index"
					})
					
				}else if(v==1){
					uni.navigateTo({
						url:"../creg/index"
					})
				}
			}
		}
	}
</script>

<style>
.return{
	padding: 20rpx;
}
.title{
	font-weight: bold;
	font-size: 50rpx;
	text-align: center;
	padding:80rpx 0 40rpx;
	box-sizing: border-box;
}
.reg-item{
	width: 80%;
	margin: 0 auto;
	margin-bottom: 40rpx;
	padding: 50rpx 0;
	background-color: #F1F2F6;
	display: flex;
	align-items: center;
	justify-content: center;
}
.reg-item>view{
	flex: 3;
	text-align: center;
}
.reg-item>view img{
	width: 50%;
}
.reg-item>view:nth-child(2){
	flex: 7;
	font-size: 28rpx;
	text-align: left;
	color: #666;
}
.reg-item>view:nth-child(2) view:nth-child(1){
	font-size: 34rpx;
	font-weight: bold;
	color: #000;
	margin-bottom: 10rpx;
}
.login{
	text-align: right;
	padding: 20rpx;
	box-sizing: border-box;
	font-size: 28rpx;
}
.login span{
	color: #4CD964;
	text-decoration: underline;
}
</style>
