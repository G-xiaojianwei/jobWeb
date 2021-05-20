<template>
	<view class="container">
		<view class="title">{{noticeArr.title}}</view>
		<view class="tip">{{noticeArr.time}}</view>
		<view class="cont">{{noticeArr.cont}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticeArr:{}
			}
		},
		methods: {
			
		},
		mounted() {
			let _this=this;
			uni.request({
			    url: `http://123.57.187.184/zpw/php/query/queryNotice.php?id=${_this.$mp.query.id}`, 
			    success: (res) => {
					console.log(res.data[0])
			        _this.noticeArr=res.data[0];
			    }
			});
		}
	}
</script>

<style>
.container{
	padding: 20rpx;
	box-sizing: border-box;
}
.container .title{
	text-align: center;
	font-weight: bold;
	padding: 20rpx 0;
}
.container .tip{
	font-size: 24rpx;
	color: #666;
	text-align: center;
	padding:0 0 20rpx;
	border-bottom: 1rpx solid #F1F2F6;
}
.container .cont{
	padding: 20rpx 0;
	text-indent: 2em;
}
</style>
