<template>
	<view>
		<!-- 头部信息 -->
		<view class="haeder">
			<view class="header-top">
				<view class="header-img"><img :src="'http://123.57.187.184/zpw/img/'+dataInfo.imgurl" alt=""></view>
				<view @click="handleEdit(dataInfo.id)">
					<p>{{dataInfo.name}}</p>
					<p>简历完整度10%</p>
				</view>
				<view @click="handleResume">编辑简历></view>
			</view>
			<view class="header-bottom">
				<view @click="handleDelivery">
					<p>{{resumeArr.length}}</p>
					<p>已投递</p>
				</view>
				<view @click="handleToInfo">
					<p>{{chatArr.length}}</p>
					<p>沟通过</p>
				</view>
				<view @click="handleInvite">
					<p>{{inviteArr.length}}</p>
					<p>面试邀请</p>
				</view>
				<view>
					<p>0</p>
					<p>收藏</p>
				</view>
			</view>
		</view>
		<!-- 刷新简历 -->
		<view class="reset">
			<view>求职服务</view>
			<view class="reset-jl" @click="refreshResume">
				<i class="icon-sx"></i>刷新简历<br><span>提升简历活跃度</span>
			</view>
		</view>
		<!-- 求职信息 -->
		<view class="ret">
			<view @click="handleHistory">
				<i class="icon-look"></i>浏览记录<em></em>
			</view>
			<view @click="handleSet">
				<i class="icon-zh"></i>账户设置<em></em>
			</view>
			<view>
				<i class="icon-zt"></i>简历状态<span>{{dataInfo.open == 0 ? '不公开' :'公开'}}</span><em></em>
			</view>
			<view @click="handleOut">
				<i class="icon-zt"></i>退出登录<em></em>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataInfo:{},
				resumeArr:[],
				inviteArr:[],
				chatArr:[]
			}
		},
		methods: {
			handleOut(){
				uni.removeStorage({
				    key: 'dataInfo',
				    success: function (res) {
				        uni.reLaunch({
				            url: `/pages/index/index`
				        });
				    }
				});
				
			},
			handleSet(){
				uni.reLaunch({
				    url: `/pages/updatepwd/index`
				});
			},
			handleToInfo(){
				uni.reLaunch({
				    url: `/pages/info/index`
				});
			},
			handleInvite(){
				let _this=this;
				uni.navigateTo({
				    url: `/pages/invite/index?uid=${_this.dataInfo.uid}`
				});
			},
			refreshResume(){
				uni.showToast({
					icon:"success",
				    title: '刷新成功',
				    duration: 2000
				});
			},
			handleEdit(){
				let _this=this;
				console.log(_this.dataInfo)
				uni.navigateTo({
				    url: `/pages/basicdetail/index?id=${_this.dataInfo.uid}`
				});
			},
			handleResume(){
				let _this=this;
				uni.navigateTo({
				    url: `/pages/ResumeDetail/index?id=${_this.dataInfo.uid}`
				});
			},
			handleHistory(){
				let _this=this;
				uni.navigateTo({
				    url: `/pages/history/index?id=${_this.dataInfo.uid}`
				});
			},
			handleDelivery(){
				let _this=this;
				uni.navigateTo({
				    url: `/pages/delivery/index?id=${_this.dataInfo.uid}`
				});
			},
			getResumeFun(v){
				this.resumeArr=[];
				let _this=this;
				uni.request({
				    url: `http://123.57.187.184/zpw/php/query/queryDelivery.php?id=${v}`, 
				    success: (res) => {
						_this.resumeArr=res.data;
						console.log(this.resumeArr)
				    }
				});
			},
			getInviteFun(v){
				this.inviteArr=[];
				let _this=this;
				uni.request({
				    url: `http://123.57.187.184/zpw/php/query/queryInviteJobs.php?uid=${v}`, 
				    success: (res) => {
						_this.inviteArr=res.data;
						console.log(_this.inviteArr)
				    }
				});
			}
		},
		onShow() {
			// 获取个人信息
			let _this=this;
			if(_this.$mp.query.id==undefined){
				uni.getStorage({
				    key: 'dataInfo',
				    success: function (res) {
				        _this.dataInfo=JSON.parse(res.data);
						_this.getResumeFun(_this.dataInfo.uid);
						_this.getInviteFun(_this.dataInfo.uid);
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
			}else{
				uni.request({
				    url: `http://123.57.187.184/zpw/php/query/queryInfo.php?id=${_this.$mp.query.id}`, 
					method:"POST",
				    success: (res) => {
						if(res.data==0){
							uni.request({
							    url: `http://123.57.187.184/zpw/php/add/addInfo.php?id=${_this.$mp.query.id}`, 
							    success: (res) => {
								_this.dataInfo=res.data[0];
								_this.getResumeFun(res.data[0].uid);
								_this.getInviteFun(res.data[0].uid);
								uni.request({
								    url: `http://123.57.187.184/zpw/php/query/queryChatItem.php`, 
									 data:{
										 uid:_this.dataInfo.uid
									 },
								    success: (res) => {
										_this.chatArr=res.data;
								    }
								});
								uni.setStorage({
								    key: 'dataInfo',
								    data: JSON.stringify(_this.dataInfo),
								    success: function () {
								        console.log('success2');
								    }
								});
							    }
							});
						}else{
							_this.dataInfo=res.data[0];
							_this.getResumeFun(res.data[0].uid);
							_this.getInviteFun(res.data[0].uid);
							uni.request({
							    url: `http://123.57.187.184/zpw/php/query/queryChatItem.php`, 
								 data:{
									 uid:_this.dataInfo.uid
								 },
							    success: (res) => {
									_this.chatArr=res.data;
							    }
							});
							uni.setStorage({
							    key: 'dataInfo',
							    data: JSON.stringify(_this.dataInfo),
							    success: function () {
							        console.log('success1');
							    }
							});
							console.log(res.data)
						}
				    }
				});
			}
			console.log(this.dataInfo)
		}
	}
</script>

<style>
.haeder{
	width: 100%;
	background: #F1F2F6;
}
.haeder .header-top{
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 100rpx 0 60rpx 0;
}
.haeder .header-top view{
	flex: 1;
	text-align: center;
}

.haeder .header-top view img{
	width: 50%;
}
.haeder .header-top view:nth-child(2){
	text-align: left;
	font-size: 26rpx;
}
.haeder .header-top view:nth-child(2) p:nth-child(1){
	font-size: 45rpx;
	margin-bottom:20rpx ;
}
.haeder .header-top view:nth-child(3){
	font-size: 28rpx;
	color: #4CD964;
}
.header-bottom{
	display: flex;
	align-items: center;
	justify-content: center;
}
.header-bottom view{
	flex: 1;
	text-align: center;
	font-size: 24rpx;
	padding-bottom: 40rpx;
}
.header-bottom view p:nth-child(1){
	margin-bottom: 10rpx;
} 
.header-img img{
	width:100%;
	height:126rpx;
	border-radius:50%;
	border: 10rpx solid rgba(255,255,255,.8);
}
.ret{
	margin-top: 60rpx;
}
.ret view{
	position: relative;
	width: 90%;
	height: 100rpx;
	line-height: 100rpx;
	border-top:1rpx solid #eee ;
	margin: 0 auto;
	padding-left:60rpx ;
	box-sizing: border-box;
}
.ret view:nth-child(3){
	border-bottom:1rpx solid #eee ;
}
.ret view:nth-child(3) span{
	float: right;
	margin-right: 60rpx;
	font-size: 28rpx;
	color: #666;
}
.icon-look{
	position: absolute;
	left: 8rpx;
	top: 30rpx;
	width: 45rpx;
	height: 45rpx;
	background: url(../../static/img/look.png);
	background-size: 100% 100%;
}
.icon-zt{
	position: absolute;
	left: 8rpx;
	top: 30rpx;
	width: 45rpx;
	height: 45rpx;
	background: url(../../static/img/zt.png);
	background-size: 100% 100%;
}
.icon-zh{
	position: absolute;
	left: 8rpx;
	top: 30rpx;
	width: 45rpx;
	height: 45rpx;
	background: url(../../static/img/zh.png);
	background-size: 100% 100%;
}
.icon-sx{
	display: inline-block;
	vertical-align: middle;
	margin-right: 10rpx;
	width: 55rpx;
	height: 45rpx;
	background: url(../../static/img/sx.png);
	background-size: 100% 100%;
}
em{
	position: absolute;
	right: 0;
	top: 0;
	display: block;
	width: 30rpx;
	height: 30rpx;
	transform: rotateZ(45deg) translateY(45rpx);
	border: 1rpx solid #7a7e83;
	border-left: none;
	border-bottom: none;
}
.reset{
	padding: 50rpx;
	padding-bottom: 0;
}
.reset-jl{
	display: inline-block;
	margin: 20rpx;
	margin-top: 40rpx;
	padding: 30rpx;
	border-radius: 10rpx;
	text-align: center;
	box-shadow: 0 0 10rpx 5rpx rgba(0,0,0,.05);
}
.reset-jl span{
	display: block;
	font-size: 24rpx;
	margin-top: 10rpx;
	padding-top: 10rpx;
	border-top: 1rpx solid #eee;
}
</style>
