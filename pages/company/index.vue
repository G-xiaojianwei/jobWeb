<template>
	<view class="container">
		<view class="header">全部企业</view>
		<view class="citem" v-for="(item,index) in company" @click="handleToCompanyDetail(item)"><span><i class="icon-qy"></i>{{item.name}}</span><span><i class="icon-jty"></i></span></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				company:[]
			}
		},
		methods: {
			handleToCompanyDetail(v){
				uni.navigateTo({
				    url: `/pages/comdetail/index?id=${v.id}`
				});
			}
		},
		mounted() {
			let _this=this;
			uni.request({
			    url: `http://123.57.187.184/zpw/os/query/queryCompany.php`, 
				 data:{
					 qid:9999999
				 },
			    success: (res) => {
					console.log(res)
					_this.company=res.data.filter(item=>item.aut==1);
			    }
			});
		}
	}
</script>

<style>
.container{
	padding: 40rpx;
	box-sizing: border-box;
	padding-top: 100rpx;
}
.header{
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	position: fixed;
	left: 0;
	top: 0;
	background-color: #fff;
	border-bottom: 1px solid #F1F2F6;
	text-align: center;
	font-weight: bold;
}
.citem{
	padding: 40rpx 20rpx;
	margin-bottom: 40rpx;
	box-sizing: border-box;
	border-bottom: 1px solid #F1F2F6;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.citem span{
	flex: 1;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.citem span:last-child{
	text-align: right;
}
.icon-qy{
	display: inline-block;
	vertical-align: middle;
	width: 70rpx;
	height: 70rpx;
	background-image: url(../../static/img/qy.png);
	background-size: 100% 100%;
	margin-right: 20rpx;
}
.icon-jty{
	display: inline-block;
	vertical-align: middle;
	width: 70rpx;
	height: 70rpx;
	background-image: url(../../static/img/jty.png);
	background-size: 100% 100%;
	margin-right: 10rpx;
}
</style>
