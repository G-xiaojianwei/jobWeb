<template>
	<view>
		<!-- 返回 -->
		<view class="return">
			<i @click="handleBack">返回</i>
		</view>
		<!-- 招聘职位 -->
		<view class="header-top">
			<view>{{jobsScreen.title}}</view>
			<view>{{jobsScreen.endPrice}}-{{jobsScreen.startPrice}}元/{{jobsScreen.priceTime}}</view>
			<view><span v-for="(item,index) in tagArr" :key="index">{{item}}</span></view>
			<view><span>学历要求：{{jobsScreen.edu}}</span><span>工作年限：{{jobsScreen.workTime}}</span><span>联系人：{{jobsScreen.phoneName}}</span><span>人数：{{jobsScreen.num}}人</span></view>
		</view>
		<!-- 公司 -->
		<view class="header-cont">
			<i></i>{{jobsScreen.enterprise}}
		</view>
		<!-- 职位内容 -->
		<view class="cont">
			<view>职位内容：</view>
			<view v-for="(item,index) in contArr" :key="index" class="font-w">{{item}}</view>
		</view>
		<!-- 工作地址 -->
		<view class="header-cont" style="padding-bottom: 120rpx;">
			<i></i>{{jobsScreen.area}}-{{jobsScreen.local}}
		</view>
		<!-- 底部 -->
		<view class="bottom">
			<span @click="handleToHome">首页</span>
			<span @click="handleToPhone">电话</span>
			<span @click="handleToCart">消息</span>
			<span @click="sendResume">申请职位</span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jobsScreen:[],
				tagArr:[],
				dataInfo:{},
				contArr:[]
			}
		},
		methods: {
			handleToIndex(){
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
			},
			sendResume(){
				//获取到用户id,职位id,
				this.handleToIndex();
				if(this.dataInfo.uid!==undefined){
					uni.request({
					    url: `http://
123.57.187.184/zpw/php/add/addDelivery.php`, 
						method:"POST",
						data:{
							uid:this.dataInfo.uid,
							jid:this.jobsScreen.id,
							qid:this.jobsScreen.qid
						},
					    success: (res) => {
					        if(res.data==200){
								uni.showToast({
									icon:"success",
								    title: '简历已投递',
								    duration: 2000
								});
							}else if(res.data==100){
								uni.showToast({
									icon:"success",
								    title: '已投递，请勿多次操作',
								    duration: 2000
								});
							}
					    }
					});
				}
			},
			handleToCart(){
				let _this=this;
				uni.getStorage({
				    key: 'dataInfo',
				    success: function (res) {
						uni.navigateTo({
							    url: `/pages/chat/index?jid=${_this.jobsScreen.id}&uid=${_this.dataInfo.uid}&cid=${_this.jobsScreen.qid}&cname=${_this.jobsScreen.enterprise}&phoneName=${_this.jobsScreen.phoneName}&title=${_this.jobsScreen.title}&name=${_this.dataInfo.name}`
							})
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
			},
			handleToHome(){
				uni.reLaunch({
				    url: '/pages/index/index'
				});
			},
			handleToPhone(){
				this.handleToIndex();
				uni.makePhoneCall({
				    phoneNumber: this.jobsScreen.phone 
				});
			},
			handleBack(){
				uni.navigateBack({
				    delta: 2
				});
			}
		},
		mounted() {
			//获取个人信息，判断是否是登录用户
			let _this=this;
			uni.getStorage({
			    key: 'dataInfo',
			    success: function (res) {
					_this.dataInfo=JSON.parse(res.data);
					if(res.data!==""){
						// 获取职位信息
						uni.request({
						    url: `http://123.57.187.184/zpw/php/add/addHistory.php`, 
							method:"POST",
							data:{
								uid:JSON.parse(res.data).uid,
								jid:_this.$mp.query.id
							},
						    success: (res) => {
						        console.log(res)
						    }
						});
					}
			    }
			});
			// 获取职位信息
			uni.request({
			    url: `http://
123.57.187.184/zpw/php/query/queryJobs.php?id=${this.$mp.query.id}`, 
			    success: (res) => {
			        this.jobsScreen=res.data[0];
					this.tagArr=this.jobsScreen.tag.split("/");
					this.contArr=this.jobsScreen.cont.split(/\n/);
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
.header-top{
	padding: 160rpx 20rpx 50rpx;
	border-bottom: 1rpx solid #eee;
}
.header-top view:nth-child(1){
	font-size: 50rpx;
	margin-bottom: 20rpx;
}
.header-top view:nth-child(2){
	color: #FF0000;
	margin-bottom: 20rpx;
}
.header-top view:nth-child(3) span{
	padding:10rpx 20rpx;
	background: #F1F2F6;
	margin-right: 10rpx;
	font-size: 24rpx;
}
.header-top view:nth-child(4){
	padding-top: 30rpx;
}
.header-top view:nth-child(4) span{
	margin-right: 40rpx;
	font-size: 28rpx;
}
.header-cont{
	padding: 40rpx 20rpx;
	border-bottom: 1rpx solid #eee;
	border-top: 1rpx solid #eee;
}
.header-cont i{
	display: inline-block;
	vertical-align: middle;
	margin-right: 20rpx;
	width: 60rpx;
	height: 60rpx;
	background: url(../../static/img/gs.png);
	background-size: 100% 100%;
}
.cont{
	padding: 40rpx 20rpx;
}
.cont view{
	font-weight: bold;
	margin-bottom: 20rpx;
}
.bottom{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-top: 1rpx solid #eee;
	background: #fff;
}
.bottom span{
	flex: 1;
	height: 100%;
	line-height: 80rpx;
	text-align: center;
	border-left: 1rpx solid #eee;
}
.bottom span:nth-child(4){
	background: #4CD964;
	color: #fff;
	border-right: 1rpx solid #eee;
}
.font-w{
	font-weight: 100 !important;
	margin-bottom: 5rpx !important;
	font-size: 30rpx;
}
</style>
