<template>
	<view>
		<view class="title">已投递职位</view>
		<view class="cont">
			<postItem :jobs="historyArr" @childFun="dateilFun" />
		</view>
		<view class="no">没有更多了哟</view>
	</view>
</template>

<script>
	import postItem from "../../components/postItem.vue"
	export default {
		data() {
			return {
				historyArr:[]
			}
		},
		components:{
			postItem
		},
		methods: {
			dateilFun(i){
				uni.navigateTo({
				    url: `/pages/detail/index?id=${i}`
				});
			},
		},
		mounted() {
			let _this=this;
			uni.request({
			    url: `http://123.57.187.184/zpw/php/query/queryDelivery.php?id=${_this.$mp.query.id}`, 
			    success: (res) => {
					res.data.sort(function(i1,i2){
					  return i2.time-i1.time;
					});
					this.historyArr=res.data;
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
.no{
	padding: 20rpx;
	border-top: 1rpx solid #eee;
	text-align: center;
	font-size: 24rpx;
}
</style>
