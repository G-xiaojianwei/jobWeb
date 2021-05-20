<template>
	<view class="top">
		<!-- 返回 -->
		<view class="return">
			<i @click="handleBack">返回</i>
			基本信息
		</view>
		<!-- 列表 -->
		<view class="list1">
			<view><span>生活照</span></view>
			<view><img :src="'http://123.57.187.184/zpw/img/'+dataInfo.imgurl" alt=""></view>
		</view>
		<view class="list1">
			<view><span>姓名</span></view>
			<view><input type="text" v-model="name"></view>
		</view>
		<view class="list1">
			<view><span>性别</span></view>
			<view>	
			<select id="" v-model="sex"><option value="man" >男</option><option value="wman" >女</option></select>	
			</view>
		</view>
		<view class="list1">
			<view><span>婚姻状态</span></view>
			<view>
			<select name="" id="" v-model="marriage"><option value="0" >保密</option><option value="1" >已婚</option><option value="2" >未婚</option></select>	
			</view>
		</view>
		<view class="list1">
			<view><span>出生年月</span></view>
			<view><input type="text" placeholder="格式:2020年11月11日" v-model="birth"></view>
		</view>
		<view class="list1">
			<view><span>最高学历</span></view>
			<view>
			<select name="" id="" v-model="education">
				<option value="高中以下" >高中以下</option>
				<option value="高中" >高中</option>
				<option value="中专/技校" >中专/技校</option>
				<option value="大专" >大专</option>
				<option value="本科" >本科</option>
				<option value="硕士" >硕士</option>
				<option value="博士" >博士</option>
				<option value="MBA/EMBA" >MBA/EMBA</option>
				</select>	
			</view>
		</view>
		<view class="list1">
			<view><span>工作经验</span></view>
			<view>
			<select name="" id="" v-model="experience">
				<option value="应届生" >应届生</option>
				<option value="1年" >1年</option>
				<option value="2年" >2年</option>
				<option value="3年" >3年</option>
				<option value="3-5年" >3-5年</option>
				<option value="5-10年" >5-10年</option>
				<option value="10年以上" >10年以上</option>
				<option value="无经验" >无经验</option>
				</select>		
			</view>
		</view>
		<view class="list1">
			<view><span>公开程度</span></view>
			<view>
			<select name="" id="" v-model="open"><option value="0">不公开</option><option value="1">公开</option></select>	
			</view>
		</view>
		<button class="btn" @click="handleUpdateBasic">完成</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataInfo:[],
				name:"",
				sex:"man",
				marriage:"",
				birth:"",
				education:"",
				experience:"",
				open:0
			}
		},
		methods: {
			handleBack(){
				uni.navigateBack({
				    delta: 2
				});
			},
			handleUpdateBasic(){
				let _this=this;
				uni.request({
					url:"http://123.57.187.184/zpw/php/update/updateBasic.php",
					method:"POST",
					data:{
						id:_this.dataInfo.id,
						name:_this.name,
						sex:_this.sex,
						marriage:_this.marriage,
						birth:_this.birth,
						education:_this.education,
						experience:_this.experience,
						open:_this.open
					},
					success(res) {
						if(res.data==1){
							uni.showToast({
								icon:"success",
							    title: '更新成功',
							    duration: 2000
							});
							uni.getStorage({
							    key: 'dataInfo',
							    success: function (res) {
							        let dataA=JSON.parse(res.data);
									dataA.name=_this.name;
									dataA.open=_this.open;
									uni.setStorageSync('dataInfo',JSON.stringify(dataA));
									console.log(11)
									uni.reLaunch({
									    url: '/pages/my/index'
									});
							    }
							});
						}
					}
				})
			}
			
		},
		mounted() {
			// 获取个人信息
			let _this=this;
			uni.request({
			    url: `http://123.57.187.184/zpw/php/query/queryInfo.php?id=${_this.$mp.query.id}`, 
			    success: (res) => {
			        _this.dataInfo=res.data[0];
					_this.name=res.data[0].name;
					_this.sex=res.data[0].sex;
					_this.marriage=res.data[0].marriage;
					_this.birth=res.data[0].birth;
					_this.education=res.data[0].education;
					_this.experience=res.data[0].experience;
					_this.open=res.data[0].open;
			    }
			});
		}
	}
</script>

<style>
	.top{
		padding-top: 100rpx;
	}
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
.list1{
	padding: 10rpx 20rpx;
	height: 80rpx;
	line-height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-top: 1rpx solid #eee;
}
.list1:last-child{
	border-bottom: 1rpx solid #eee;
}
.list1 view:nth-child(1){
	flex: 3;
}
.list1 view:nth-child(2){
	flex: 7;
	line-height: 100%;
	line-height: 100rpx;
}
.list1 view:nth-child(2) img{
	float: right;
	width: 80rpx;
	height: 100%;
}
.list1 view:nth-child(2) input{
	width: 100%;
	height: 100%;
	background: #F1F2F6;
	text-align: center;
}
.btn{
	margin: 40rpx 20rpx 0;
	background: #4CD964;
	color: #fff;
}
select{
	width: 100%;
	height: 100%;
}
</style>
