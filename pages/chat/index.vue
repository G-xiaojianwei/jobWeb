<template>
	<view class="container">
		<view class="top">{{cartInfo.title}}</view>
		<view class="bottom">
			<span><input type="text" v-model="chat"></span>
			<span><button @click="handleToAdd">发送</button></span>
		</view>
		<view class="center">
			<view v-for="(item,index) in chatArr">
				<i class="date-time">{{timeTrans(item.time)}}</i>
				<p :style="item.uc==0?'text-align:left':'text-align:right'"><span :class="item.uc==0?'cenname':'cennames'">{{item.uc==0?item.phoneName:item.name}}</span><span class="cen-cont">{{item.cont}}</span></p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartInfo:{},
				chatArr:[],
				chat:"",
				load:""
			}
		},
		methods: {
			timeTrans(date){
			    var date = new Date(date*1000);
			    var Y = date.getFullYear() + '-';
			    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
			    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
			    return Y+M+D+h+m+s;
			},
			handleToAdd(){
				let _this=this;
				if(_this.chat!==""){
					uni.request({
					    url: `http://123.57.187.184/zpw/php/add/addChat.php`, 
						method:"POST",
						data:{
							 jid:_this.cartInfo.jid,
							 uid:_this.cartInfo.uid,
							 cid:_this.cartInfo.cid,
							 name:_this.cartInfo.name,
							 cname:_this.cartInfo.cname,
							 phoneName:_this.cartInfo.phoneName,
							 title:_this.cartInfo.title,
							 cont:_this.chat,
							 uc:1
						 },
					    success: (res) => {
							_this.chatArr=res.data;
							_this.chat="";
					    }
					});
				}
			}
		},
		destroyed(){
			this.load="";
		},
		mounted() {
			// 进来第一件事，获取信息
			let _this=this;
			_this.load=1;
			_this.cartInfo=_this.$mp.query;
			// 先查询是否有与该公司的对话
			uni.request({
			    url: `http://123.57.187.184/zpw/php/query/queryChat.php`, 
				 data:{
					 jid:_this.cartInfo.jid,
					 uid:_this.cartInfo.uid,
					 cid:_this.cartInfo.cid
				 },
			    success: (res) => {
					if(res.data==""){
						//添加第一条欢迎语
						uni.request({
						    url: `http://123.57.187.184/zpw/php/add/addChat.php`, 
							method:"POST",
							data:{
								 jid:_this.cartInfo.jid,
								 uid:_this.cartInfo.uid,
								 cid:_this.cartInfo.cid,
								 name:_this.cartInfo.name,
								 cname:_this.cartInfo.cname,
								 phoneName:_this.cartInfo.phoneName,
								 title:_this.cartInfo.title,
								 cont:`您好${_this.cartInfo.name},请问您想咨询什么问题呢？`,
								 uc:0
							 },
						    success: (res) => {
								_this.chatArr=res.data;
								console.log(_this.chatArr)
						    }
						});
					}else{
						_this.chatArr=res.data;
					}
			    }
			});
			let load=setInterval(function(){
				uni.request({
				    url: `http://123.57.187.184/zpw/php/query/queryChat.php`, 
					 data:{
						 jid:_this.cartInfo.jid,
						 uid:_this.cartInfo.uid,
						 cid:_this.cartInfo.cid
					 },
				    success: (res) => {
						_this.chatArr=res.data;
				    }
				});
				if(_this.load!==1){
					clearTimeout(load);
				}
			},10000)
			
		}
	}
</script>

<style>
.container{
	width: 100%;
	height: 100%;
}
.top{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	box-shadow: 0 0 5rpx 2rpx rgba(0,0,0,.1);
	background:#F1F2F6;
	text-align: center;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.bottom{
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	left: 0;
	bottom: 0;
	height: 100rpx;
	width: 100%;
	box-shadow: 0 0 5rpx 2rpx rgba(0,0,0,.1);
	background: #fff;
	padding:20rpx;
	box-sizing: border-box;
}
.bottom span{
	flex: 8;
	height: 100%;
}
.bottom span input{
	width: 100%;
	height: 100%;
	border: 1rpx solid #F1F2F6;
	padding: 0 20rpx;
	box-sizing: border-box;
	border-radius: 10rpx;
}
.bottom span:last-child{
	flex: 2;
	height: 100%;
	margin-left: 20rpx;
}
.bottom span:last-child button{
	width: 100%;
	height: 100%;
	font-size: 24rpx;
}
.center{
	width: 100%;
	height: 100%;
	padding: 140rpx 20rpx;
	box-sizing: border-box;
	overflow-y: scroll;
}
.center p{
	padding:40rpx 0rpx;
	/* border-bottom: 1rpx solid #F1F2F6; */
}
.center p .cenname{
	display: inline-block;
	vertical-align:top;
}
.center .cennames{
	float: right;
}
.center p .cen-cont{
	display: inline-block;
	vertical-align:top;
	font-size: 26rpx;
	max-width: 70%;
	background-color: #F1F2F6;
	padding: 20rpx;
	margin:0 20rpx;
	border-radius: 10rpx;
	line-height: 40rpx;
	text-align: justify;
}
.date-time{
	display: block;
	text-align: center;
	font-size: 24rpx;
	font-style: initial;
	padding: 20rpx 0;
}
</style>
