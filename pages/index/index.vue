<template>
	    <view>
	        <!-- 头部搜索 -->
			<view class="header-show">
				<view class="search">
					<input type="text" placeholder="请输入搜索内容" @focus="handleFocus">
					<i class="icon-search"></i>
				</view>
			</view>
			<!-- 广告部位 -->
			<swiper class="swiper-ad" indicator-color="rgba(255,255,255,.5)" indicator-active-color="#fff"  autoplay="true" interval="2000" duration="500"  circular="true" indicator-dots="true">
				<swiper-item v-for="(item,index) in advertArr" :key="index" @click="handleToNotices(item)">
					<view class="swiper-item uni-bg-red">
						<img :src="'http://123.57.187.184/zpw/img/'+item.imgurl" alt="">
					</view>
				</swiper-item>
			</swiper>
			<!-- 分类导航栏 -->
			<view class="class-nav">
				<view v-for="(item,index) in classifyArr" :key="index">
					<p><img :src="'http://123.57.187.184/zpw/img/'+item.imgurl" alt=""></p>
					<p>{{item.name}}</p>
				</view>
			</view>
			<!-- 公告信息 -->
			<view class="notice">
				<view class="title"><img src="../../static/img/notice.png" alt=""></view>
				<view class="center">
					<swiper class="swiper-notice" autoplay="true" interval="2000" :duration="500" vertical="true" circular="true">
						<swiper-item v-for="(item,index) in noticeArr" :key="index" @click="handleToNotice(item.id)">
							<view class="swiper-item uni-bg-red">{{item.title}}</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="more">更多</view>
			</view>
			<!-- 职位展示 -->
			<view class="post">
				<view class="nav"><span :class="state==0?'act':''" @click="updataState">急聘</span><span :class="state==1?'act':''" @click="updateNewJobs">最新</span></view>
				<view class="post-cont">
					<postItem :jobs="jobsScreen" @childFun="dateilFun"></postItem>
				</view>
			</view>
			<!-- 版权展示 -->
			<view class="copy">
				版权所有@新疆七牛网络科技有限公司
			</view>
	    </view>
</template>

<script>
	import postItem from "../../components/postItem.vue"
	export default {
		data() {
			return {
				state:0,
				advertArr:[],
				classifyArr:[],
				jobsArr:[],
				jobsScreen:[],
				noticeArr:[]
			}
		},
		onLoad() {

		},
		components:{
			postItem
		},
		computed:{
			
		},
		methods: {
			handleFocus(){
				uni.reLaunch({
					url: `/pages/post/index`
				});
			},
			handleToNotices(v){
				uni.navigateTo({
				    url:v.link
				});
			},
			handleToNotice(i){
				uni.navigateTo({
				    url: `/pages/notice/index?id=${i}`
				});
			},
			dateilFun(i){
				uni.navigateTo({
				    url: `/pages/detail/index?id=${i}`
				});
			},
			updateNewJobs(){
				this.state=1;
				this.jobsScreen=this.jobsArr;
			},
			updataState(){
				this.state=0;
				this.jobsScreen=this.jobsArr.filter(item=>item.state == 1)
			}
		},
		mounted() {
			this.state=0;
			// 获取广告图
			uni.request({
			    url: 'http://123.57.187.184/zpw/php/query/queryAdvert.php', 
			    success: (res) => {
			        this.advertArr=res.data;
			    }
			});
			// 获取分类
			uni.request({
			    url: 'http://123.57.187.184/zpw/php/query/queryClassify.php', 
			    success: (res) => {
			        this.classifyArr=res.data;
			    }
			});
			// 获取职位信息
			uni.request({
			    url: 'http://123.57.187.184/zpw/php/query/queryJobs.php', 
			    success: (res) => {
			        this.jobsArr=res.data;
					//筛选出急聘
					this.jobsScreen=this.jobsArr.filter(item=>item.state == 1)
			    }
			});
			uni.request({
			    url: 'http://123.57.187.184/zpw/php/query/queryNotice.php', 
			    success: (res) => {
					console.log(res)
			        this.noticeArr=res.data;
			    }
			});
		}
	}
</script>

<style>
	.header-show{
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20rpx;
	}
	.search{
		position: relative;
		flex: 8;
		height: 100%;
		background-color: #f1f2f6;
		border-radius: 5rpx;
	}
	.search input{
		width: 100%;
		height: 100%;
		padding:0rpx 20rpx 0 70rpx ;
		box-sizing: border-box;
		border-radius: 10rpx;
	}
	.icon-search{
		display: block;
		position: absolute;
		left: 18rpx;
		top: 18rpx;
		width: 40rpx;
		height: 40rpx;
		background: url(../../static/img/search.png);
		background-size: 100% 100%;
	}
	.icon-gw{
		display: block;
		width: 50rpx;
		height: 50rpx;
		margin-left: 65rpx;
		background: url(../../static/img/gw.png);
		background-size: 100% 100%;
	}
	.change{
		flex: 2;
		text-align: right;
		font-size: 22rpx;
		color: #4CD964;
	}
	.swiper-ad{
		padding: 20rpx;
	}
	.swiper-ad swiper-item{
		border-radius: 20rpx; 
	}
	.swiper-ad .swiper-item{
		width: 100%;
		height: 100%;
		border-radius: 20rpx; 
	}
	.swiper-ad swiper-item img{
		width: 100%;
		height: 100%;
	}
	.class-nav{
		display: flex;
		flex-wrap:wrap;
		align-items:center;
		justify-content: flex-start;
		padding-bottom: 40rpx;
		border-bottom: 1rpx solid #eee;
	}
	.class-nav view{
		flex:20%;
		text-align: center;
		font-size: 24rpx;
		margin-top: 20rpx;
	}
	.class-nav view p img{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}
	.notice{
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 20rpx solid #f1f2f6;
	}
	.notice .title{
		flex: 25%;
		text-align: center;
		border-right: 1rpx solid #eee;
	}
	.notice .title img{
		width:70%;
	}
	.notice .center{
		flex: 65%;
	}
	.notice .more{
		flex: 10%;
		border-left: 1rpx solid #eee;
		font-size: 24rpx;
		color: #666;
		padding-left: 20rpx;
	}
	.notice .center .swiper-notice{
		height: 80rpx;
		line-height: 80rpx;
		width: 90%;
		margin: 0 auto;
	}
	.notice .center .swiper-notice swiper-item{
		height: 100%;
		width: 100%;
	}
	.notice .center .swiper-notice .swiper-item{
		height: 100%;
		width: 100%;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		font-size: 24rpx;
	}
	.post{
		padding: 20rpx;
	}
	.post .nav{
		width:100%;
		margin: 0 auto;
		border-bottom: 1rpx solid #eee;
		font-size: 28rpx;
		color: #666;		
		padding-bottom: 10rpx;
	}
	.post .nav span{
		margin-right: 20rpx;
		padding-bottom: 10rpx;
	}
	.post .nav span.act{
		color: #000;
		border-bottom: 4rpx solid #4CD964;
	}
	.copy{
		width: 100%;
		height: 200rpx;
		text-align: center;
		line-height: 200rpx;
		font-size: 24rpx;
		background: #f1f2f6;
		color: #666;
	}
</style>
