<template>
	<view>
		<view class="title">面试邀请</view>
		<view class="cont">
			<view v-for="(item,index) in inviteArr" class="cont-item">
				<view><span>面试岗位：</span>{{item.title}}</view>
				<view><span>面试公司：</span>{{item.enterprise}}</view>
				<view><span>邀请内容：</span>{{item.cont}}</view>
			</view>
		</view>
		<view class="no">没有更多了哟</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inviteArr:[]
			}
		},
		methods: {
			
		},
		mounted() {
			let _this=this;
			uni.request({
			    url: `http://123.57.187.184/zpw/php/query/queryInviteJobs.php?uid=${_this.$mp.query.uid}`, 
			    success: (res) => {
					_this.inviteArr=res.data;
			    }
			});
		}
	}
</script>

<style>
.title{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	background: #fff;
	padding: 25rpx 20rpx;
	box-sizing: border-box;
	text-align: center;
	color: #4CD964;
	font-size: 36rpx;
	border-bottom: 1rpx solid #eee;
}
.cont{
	padding:120rpx 20rpx 20rpx;
}
.cont-item{
	padding: 20rpx;
	border-bottom: 1rpx solid #F1F2F6;
	font-size: 26rpx;
	box-shadow: 0 1rpx 4rpx 2rpx rgba(0,0,0,.05);
	margin-bottom: 20rpx;
	border-radius: 10rpx;
}
.cont-item view{
	padding: 10rpx 0;
}
.cont-item view span{
	font-weight: bold;
}
.no{
	padding: 20rpx;
	text-align: center;
	font-size: 24rpx;
}
</style>
