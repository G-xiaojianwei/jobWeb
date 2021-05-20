<template>
	    <view>
	        <!-- 搜索板块 -->
			<view class="header">
				<view class="search">
					<view>
						<input type="text" placeholder="请输入内容" focus><i></i>
					</view>
					<view><button>搜索</button></view>
				</view>
				<view class="classfiy">
					<view @click="jobOpen=true">{{i}} <i></i></view>
					<view @click="postOpen=true">{{of}} <i></i></view>
					<view @click="salaryOpen=true">{{s}} <i></i></view>
					<view @click="moreOpen=true">更多 <i></i></view>
				</view>
			</view>
			<!-- 工作显示-->
			<view class="job-info">
				<postItem :jobs="jobsArr" @childFun="dateilFun"></postItem>
			</view>
			<!-- 工作区域模态框 -->
			<view class="job-model" v-if="jobOpen" >
				<view class="job-show">
					<view class="job-title">工作区域<span @click="handleChangeJob(false)">x</span></view>
					<view class="job-cont">
						<view class="job-cont-item">
							<view class="job-item-title">工作区域</view>
							<view class="job-item-cont">
								<view @click="handleJobsArea('全重庆')" :class="'全重庆'==i?'active':''">全重庆</view>
								<view v-for="(item,index) in jobsAreaArr" :key="index" :class="item.name==i?'active':''" @click="handleJobsArea(item.name)">{{item.name}}</view>
							</view>
						</view>
					</view>
					<view class="submit">
						<button @click="handleChangeJob(false)">确定</button>
					</view>
				</view>
			</view>
			<!-- 职位分类 -->
			<view class="job-model" v-if="postOpen">
				<view class="job-show">
					<view class="job-title">职位分类<span @click="handleChangePost(false)">x</span></view>
					<view class="post-info">
							<!-- 联排 -->
								<view class="main-list">
									<ul>
										<li :class="o=='全部职位'?'act':''" @click="handleChangeLeft('全部职位',0)">全部</li>
										<li v-for="(item,index) in postClassLeft" :key="index" @click="handleChangeLeft(item.name,item)" :class="o==item.name?'act':''">{{item.name}}</li>
									</ul>
								</view>
								<view class="aux-list">
									<ul>
										<li :class="of=='全部职位'?'act':''" @click="handleChangeRight('全部职位')">全部</li>
										<li v-for="(item,index) in postClassRight" :key="index" :class="of==item.name?'act':''" @click="handleChangeRight(item.name)">{{item.name}}</li>
									</ul>
								</view>
					</view>
					<view class="submit">
						<button @click="handleChangePost(false)">确定</button>
					</view>
				</view>
			</view>
			<!-- 薪资范围模态框 -->
			<view class="job-model" v-if="salaryOpen">
				<view class="job-show">
					<view class="job-title">薪资范围<span @click="handleChangeSalary(false)">x</span></view>
					<view class="job-cont">
						<view class="job-cont-item">
							<view class="job-item-title">薪资范围</view>
							<view class="job-item-cont">
								<view v-for="(item,index) in salaryArr" :key="index" @click="handleSalary(item.name)" :class="s==item.name?'active':''">{{item.name}}</view>
							</view>
						</view>
					</view>
					<view class="submit">
						<button @click="handleChangeSalary(false)">确定</button>
					</view>
				</view>
			</view>
			<!-- 更多模态框 -->
			<view class="job-model" v-if="moreOpen">
				<view class="job-show">
					<view class="job-title">更多<span @click="handleChangeMore(false)">x</span></view>
					<view class="job-cont">
						<view class="job-cont-item">
							<view class="job-item-title">福利待遇</view>
							<view class="job-item-cont">
								<view v-for="(item,index) in welfareArr" :key="index" @click="handleWelfare(item.name)" :class="w == item.name?'active':''">{{item.name}}</view>
							</view>
						</view>
						<view class="job-cont-item">
							<view class="job-item-title">工作年限</view>
							<view class="job-item-cont">
								<view v-for="(item,index) in jobTimeArr" :key="index" @click="handleJobTime(item.name)" :class="j == item.name?'active':''">{{item.name}}</view>
							</view>
						</view>
						<view class="job-cont-item">
							<view class="job-item-title">学历要求</view>
							<view class="job-item-cont">
								<view v-for="(item,index) in eduArr" :key="index" @click="handleEdu(item.name)" :class="e == item.name?'active':''">{{item.name}}</view>
							</view>
						</view>
					</view>
					<view class="submit">
						<button @click="handleChangeMore(false)">确定</button>
					</view>
				</view>
			</view>
	    </view>
</template>

<script>
	import postItem from "../../components/postItem.vue"
	export default {
		data() {
			return {
				jobOpen:false,
				postOpen:false,
				salaryOpen:false,
				moreOpen:false,
				jobsArr:[],
				jobsAreaArr:[],
				postClassArr:[],
				postClassLeft:[],
				postClassRight:[],
				salaryArr:[],
				welfareArr:[],
				jobTimeArr:[],
				eduArr:[],
				i:"工作区域",
				o:"全部职位",
				of:"全部职位",
				s:"薪资范围",
				w:"不限",
				e:"不限",
				j:"不限"
			}
		},
		onLoad() {

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
			getDataFun(){
				let _this=this;
				uni.request({
				    url: 'http://123.57.187.184/zpw/php/query/queryWhereJobs.php', 
					method:"GET",
					data:{
						area:this.i,
						classify:this.o,
						classifyChild:this.of,
						edu:this.e,
						workTime:this.j
					},
				    success: (res) => {
						let dataArr=[];
						switch(_this.s){
							case "薪资范围":
							dataArr=res.data;
							case "不限":
							dataArr=res.data;
							break;
							case "1千以下":
							dataArr=res.data.filter(item=>item.endPrice<=1000);
							break;
							case "1千-2千":
							dataArr=res.data.filter(item=> item.endPrice<=2000 && item.startPrice>=1000);
							break;
							case "2千-5千":
							dataArr=res.data.filter(item=> item.endPrice<=5000 && item.startPrice>=2000);
							break;
							case "5千-8千":
							dataArr=res.data.filter(item=> item.endPrice<=8000 && item.startPrice>=5000);
							break;
							case "8千-1.2万":
							dataArr=res.data.filter(item=> item.endPrice<=12000 && item.startPrice>=8000);
							break;
							case "1.2千-2万":
							dataArr=res.data.filter(item=> item.endPrice<=20000 && item.startPrice>=12000);
							break;
							case "2万以上":
							dataArr=res.data.filter(item=> item.startPrice>=20000);
							break;
							case "面议":
							dataArr=res.data;
							break;
						}
						console.log(dataArr)
						if(_this.w!=="不限"){
							_this.jobsArr=dataArr.filter(item=>item.tag.indexOf(_this.w)!==-1);
						}else{
							_this.jobsArr=dataArr;
						}
				    }
				});
			},
			handleChangeMore(v){
				this.moreOpen=v;
				this.getDataFun();
			},
			handleChangeJob(v){
				this.jobOpen=v;
				this.getDataFun();
			},
			handleChangePost(v){
				this.postOpen=v;
				this.getDataFun();
			},
			handleChangeSalary(v){
				this.salaryOpen=v;
				this.getDataFun();
			},
			handleWelfare(v){
				this.w=v;
			},
			handleJobTime(v){
				this.j=v;
			},
			handleEdu(v){
				this.e=v;
			},
			handleChangeLeft(v,i){
				this.of="全部职位";
				this.o=v;
				if(i==0){
					this.postClassRight=this.postClassArr.filter(item=>item.sid!=0);
					return;
				}
				this.postClassRight=this.postClassArr.filter(item=>item.sid==i.id);
			},
			handleSalary(v){
				this.s=v;
			},
			handleChangeRight(v){
				this.of=v;
			},
			handleJobsArea(v){
				this.i=v;
			}
		},
		mounted() {
			// 获取职位信息
			uni.request({
			    url: 'http://123.57.187.184/zpw/php/query/queryJobs.php', 
			    success: (res) => {
			        this.jobsArr=res.data;
			    }
			});
			// 获取职位区域信息
			uni.request({
			    url: 'http://123.57.187.184/zpw/php/query/queryJobsArea.php', 
			    success: (res) => {
			        this.jobsAreaArr=res.data;
			    }
			});
			// 获取职位类别
			uni.request({
			    url: 'http://123.57.187.184/zpw/php/query/queryPostClass.php', 
			    success: (res) => {
			        this.postClassArr=res.data;
					this.postClassLeft=this.postClassArr.filter(item=>item.sid==0);
					this.postClassRight=this.postClassArr.filter(item=>item.sid==1);
			    }
			});
			// 获取薪资范畴
			uni.request({
			    url: 'http://123.57.187.184/zpw/php/query/querySalary.php', 
			    success: (res) => {
			        this.salaryArr=res.data;
			    }
			});
			// 更多
			uni.request({
			    url: 'http://123.57.187.184/zpw/php/query/queryWelfare.php', 
			    success: (res) => {
			        this.welfareArr=res.data;
			    }
			});
			// 工作年限
			uni.request({
			    url: 'http://123.57.187.184/zpw/php/query/queryJobTime.php', 
			    success: (res) => {
			        this.jobTimeArr=res.data;
			    }
			});
			// 学历
			uni.request({
			    url: 'http://123.57.187.184/zpw/php/query/queryEdu.php', 
			    success: (res) => {
			        this.eduArr=res.data;
			    }
			});
		}
	}
</script>

<style>
.header{
	position:fixed;
	width: 100%;
	padding-bottom: 10rpx;
	border-bottom: 1rpx solid #eee;
	z-index: 9;
	background: #fff;
}
.search{
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10rpx 20rpx;
	box-sizing: border-box;
}
.search view:nth-child(1){
	width: 80%;
	height: 70rpx;
	background: #f1f2f6;
	margin-right: 20rpx;
	border-radius: 10rpx;
}
.search view:nth-child(1) input{
	width: 100%;
	height: 100%;
	padding-left: 40rpx;
	box-sizing: border-box;
} 
.search view:nth-child(2){
	width: 20%;
	text-align: center;
}
.search view:nth-child(2) button{
	width: 100%;
	height: 70rpx;
	line-height: 70rpx;
	margin: 0;
	font-size: 30rpx;
	color: #fff;
	background-color: #4CD964;
}
.classfiy{
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20rpx 0;
}
.classfiy view{
	flex: 1;
	text-align: center;
	font-size: 28rpx;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.classfiy view i{
	width: 20rpx;
	height: 20rpx;
	margin-left: 10rpx;
	margin-bottom: 5rpx;
	display: inline-block;
	vertical-align: middle;
	background: url(../../static/img/xl.png);
	background-size: 100% 100%;
}
.job-info{
	padding: 20rpx;
	padding-top: 180rpx;
}
.job-model{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 9999;
	background-color: rgba(0,0,0,.5);
}
.job-show{
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 70%;
	background: #fff;
	padding: 20rpx;
	box-sizing: border-box;
}
.job-title{
	text-align: center;
	padding: 20rpx;
	box-sizing: border-box;
	font-size: 40rpx;
	background: #fff;
}
.job-title span{
	float: right;
	width: 50rpx;
	height: 50rpx;
}
.job-cont{
	position: absolute;
	width: 100%;
	height: 88%;
	left: 0;
	bottom: 0;
	overflow-y: scroll;
}
.job-cont-item{
	padding-bottom: 120rpx;
}
.job-item-title{
	font-weight: bold;
	padding: 20rpx;
}
.job-item-cont{
	display: flex;
	flex-wrap: wrap;
	justify-content: left;
	align-items: center;
}
.job-item-cont view{
	width: 27.6%;
	background: #F1F2F6;
	margin: 10rpx;
	padding:20rpx 10rpx;
	text-align: center;
	font-size: 26rpx;
	border-radius: 10rpx;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.submit{
	width: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
	padding: 20rpx;
	box-sizing: border-box;
	background: #fff;
}
.submit button{
	background: #4CD964;
	color: #fff;
}
.post-info{
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
}
.post-info ul{
	list-style: none;
	padding: 0;
	padding-bottom: 200rpx;
}
.post-info .main-list{
	flex: 1;
	overflow-y: scroll;
}
.post-info li{
	background: #F1F2F6;
	height: 50rpx;
	padding: 20rpx 20rpx 20rpx 40rpx;
}
.post-info .aux-list{
	flex: 1;
	overflow-y: scroll;
}
.post-info .main-list li.act{
	color: #000;
	background: #fff;
}
.post-info .aux-list li{
	background: #fff;
}
.post-info .aux-list li.act{
	color: #4CD964;
}
.active{
	color: #fff;
	background: #4CD964 !important;
}
</style>
