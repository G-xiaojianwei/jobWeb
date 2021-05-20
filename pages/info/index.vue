<template>
	<view>
		<view class="title">消息列表</view>
		<view class="cont">
			<view class="cont-item" v-for="(item,index) in chatArr" @click="handleToCart(item)">
				<span>{{item.cname}}|{{item.title}}</span><span>{{timeTrans(item.time)}}</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataInfo:{},
				chatArr:[]
			}
		},
		methods: {
			timeTrans(date){
			    var date = new Date(date*1000);
			    var Y = date.getFullYear() + '-';
			    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
			    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
			    return Y+M+D;
			},
			handleToCart(item){
				uni.navigateTo({
				    url: `/pages/chat/index?jid=${item.jid}&uid=${this.dataInfo.uid}&cid=${item.cid}&cname=${item.cname}&phoneName=${item.phoneName}&title=${item.title}&name=${this.dataInfo.name}`
				})
			}
		},
		onShow() {
			let _this=this;
			//先获取用户信息
			uni.getStorage({
			    key: 'dataInfo',
			    success: function (res) {
			        _this.dataInfo=JSON.parse(res.data);
					uni.request({
					    url: `http://123.57.187.184/zpw/php/query/queryChatItem.php`, 
						 data:{
							 uid:_this.dataInfo.uid
						 },
					    success: (res) => {
							_this.chatArr=res.data;
					    }
					});
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
.title{
	text-align: center;
	font-weight: bold;
	padding:20rpx 40rpx;
	box-sizing: border-box;
	border-bottom: 1rpx solid #F1F2F6;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	background: #fff;
}
.cont{
	padding:120rpx 0 0;
	box-sizing: border-box;
}
.cont-item{
	border-top: 1rpx solid #F1F2F6;
	padding:40rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
}
.cont-item:last-child{
	border-bottom: 1rpx solid #F1F2F6;
}
.cont-item span{
	flex: 7;
	font-size: 28rpx;
}
.cont-item span:nth-child(2){
	flex: 3;
	text-align: center;
	border-left: 1rpx solid #F1F2F6;
	font-size: 24rpx;
}
</style>
