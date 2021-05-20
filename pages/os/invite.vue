<template>
	<view>
		<view class="container">
			<view class="title">面试邀请</view>
			<view class="cont">
				<view class="cont-item"><span>岗位名称</span><span>邀请人</span><span>邀请内容</span><span>邀请时间</span><span>操作</span></view>
				<view class="cont-item" v-for="(item,index) in inviteArr"><span>{{item.title}}</span><span>{{item.name}}</span><span>{{item.cont}}</span><span>{{timeTrans(item.time)}}</span><span><i class="icon-sc"></i></span></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				inviteArr:[],
				companyInfo:[]
			}
		},
		methods:{
			timeTrans(date){
			    var date = new Date(date*1000);
			    var Y = date.getFullYear() + '-';
			    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
			    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
			    return Y+M+D+h+m+s;
			}
		},
		mounted() {
			let _this=this;
			uni.getStorage({
				key: 'companyInfo',
				success: function (res) {
					_this.companyInfo=JSON.parse(res.data);
					uni.request({
					    url: `http://123.57.187.184/zpw/os/query/queryInviteJobs.php`,
						data:{
							qid:_this.companyInfo.id
						},
					    success: (res) => {
							_this.inviteArr=res.data;
					    }
					});
				}
			});
		}
	}
</script>

<style>
	.container{
		width: 1000px;
		box-sizing: border-box;
		padding: 20px;
		box-shadow: 0 0 5px 2px rgba(0,0,0,.1);
	}
	.title{
		text-align: center;
		padding: 20px 0;
		font-weight: bold;
	}
	.cont-item{
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px 0;
		border: 1px solid #F1F2F6;
		border-bottom:none;
		transition: .5s all;
	}
	.cont-item:hover{
		background-color: #F1F1F1;
	}
	.cont-item:nth-child(1) span:hover{
		color: #000000;
	}
	.cont-item span:hover{
		color: #09BB07;
	}
	.cont-item span:last-child:hover{
		color: #000;
	}
	.cont-item span em:hover{
		color: #09BB07;
	}
	.cont-item:last-child{
		border-bottom: 1px solid #F1F2F6;
	}
	
	.cont-item span{
		flex: 6;
		text-align: center;
		border-right: 1px solid #F1F2F6;
	}
	.cont-item span:nth-child(2){
		flex: 3;
	}
	.cont-item span:last-child{
		flex: 1;
		border-right: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.cont-item span em{
		font-style: normal;
		flex: 1;
		margin: 0 10px;
		padding: 4px 0;
		box-sizing: border-box;
		text-align: center;
		font-size: 14px;
	}
.icon-sc{
		display: inline-block;
		width: 20px;
		height: 20px;
		background-image: url(../../static/img/shanchu1.png);
		background-size: 100% 100%;
	}
.icon-sc:hover{background-image: url(../../static/img/ac-shanchu1.png);}
</style>
