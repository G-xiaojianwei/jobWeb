<template>
	<view class="container">
		<view class="title">{{company.name}}</view>
		<view class="companyj">企业简介：<p>{{company.introduce}}</p></view>
		<view>
			<view class="title" style="text-align: left;">招聘岗位</view>
			<view>
				<postItem :jobs="jobs" @childFun="dateilFun"></postItem>
			</view>
		</view>
	</view>
</template>

<script>
	import postItem from "../../components/postItem.vue"
	export default {
		data() {
			return {
				company:{},
				jobs:[]
			}
		},
		methods: {
			dateilFun(i){
				uni.navigateTo({
				    url: `/pages/detail/index?id=${i}`
				});
			},
		},
		components:{
			postItem
		},
		onShow() {
			let _this=this;
			uni.request({
			    url: `http://123.57.187.184/zpw/php/query/queryCompany.php?qid=${_this.$mp.query.id}`, 
			    success: (res) => {
					_this.company=res.data;
			    }
			});
			uni.request({
			    url: `http://123.57.187.184/zpw/php/query/queryJobsCompany.php?id=${_this.$mp.query.id}`, 
			    success: (res) => {
					_this.jobs=res.data;
			    }
			});
		}
	}
</script>

<style>
	.container{
		padding: 20rpx 40rpx;
		box-sizing: border-box;
	}
.title{
	padding:20rpx;
	box-sizing: border-box;
	text-align: center;
	font-weight: bold;
	border-bottom: 1px solid #F1F2F6;
}
.companyj{
	padding:40rpx 20rpx;
	box-sizing:border-box;
	font-weight: bold;
}
.companyj p{
	text-indent: 2em;
	font-size: 30rpx;
	margin-top: 20rpx;
	font-weight: 100;
}
</style>
