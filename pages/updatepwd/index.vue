<template>
	<view>
		<!-- 返回 -->
		<view class="return">
			<i @click="handleBack">返回</i>
			修改密码
		</view>
		<view class="cont">
			<view class="list"><span>手机号</span><span><input type="text" placeholder="请输入手机号" v-model="phone"></span></view>
			<view class="list"><span>新密码</span><span><input type="text" placeholder="请输入新密码" v-model="pwd"></span></view>
			<view class="list"><span>验证码</span><span><input type="text" placeholder="输入验证码" v-model="code"></span></view>
			<view class="list"><button @click="handleUpdate">提交</button></view>
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
				dataInfo:{}
			}
		},
		methods: {
			handleBack(){
				uni.reLaunch({
					url:"/pages/my/index"
				});
			},
			handleUpdate(){
				let _this=this;
				console.log(_this.dataInfo.uid)
				uni.request({
				    url: `http://123.57.187.184/zpw/php/update/updatePwd.php`, 
					method:"POST",
					 data:{
						 uid:_this.dataInfo.uid,
						 phone:_this.phone,
						 pwd:_this.pwd
					 },
				    success: (res) => {
						if(res.data==""){
							uni.showToast({
							    title: '密码修改成功',
							    duration: 2000
							});
							setTimeout(function(){
								uni.reLaunch({
									url:"/pages/my/index"
								})
							},2000)
						}
				    }
				});
			}
		},
		mounted() {
			let _this=this;
			uni.getStorage({
			    key: 'dataInfo',
			    success: function (res) {
			        _this.dataInfo=JSON.parse(res.data);
			    },
				fail(res) {
					if(res.data==""){
						//跳转到登录界面
						uni.navigateTo({
						    url: '/pages/login/index'
						});
					}
				}
			});
		}
	}
</script>

<style>
.return{
	position: fixed;
	left: 0;
	top: 0;
	background: #fff;
	width: 100%;
	padding: 20rpx;
	text-align: center;
	border-bottom: 20rpx solid #F1F2F6;
}
.return i{
	float: left;
}
.cont{
	padding:120rpx;
	box-sizing: border-box;
}
.list{
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 30rpx 0;
}
.list span{
	flex: 3;
}
.list span:nth-child(2){
	flex: 7;
}
.list span input{
	width: 100%;
	height: 100%;
	border: 1rpx solid #F1F2F6;
}
.list button{
	width: 100%;
}
</style>
