<template>
	<view>
		<view class="container">
			<view class="title">认证管理</view>
			<view class="cont">
				<view><span>公司名称</span><span>营业执照</span><span>审核状态</span><span>操作</span></view>
				<view v-for="(item,index) in company"><span>{{item.name}}</span><span><image :src="'http://123.57.187.184/zpw/img/'+item.img" mode=""></image></span><span>{{item.aut==0?"还未提交认证资料":item.aut==1?"已审核":item.aut==2?"资料审核中":"已驳回"}}</span><span class="cz"><em @click="handleAttesta(item)">去审核</em><em>删除</em></span></view>
			</view>
			<view class="model-cont" v-if="open">
				<view class="cont-item">
					<img :src="'http://123.57.187.184/zpw/img/'+imgShow" alt="">
					<input type="text" placeholder="请输入审核结果" v-model="reason">
					<view>
						<button @click="handleAgree(1)">同意审核</button>
						<button @click="handleAgree(4)">驳回审核</button>
						<button @click="open=false">取消审核</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				imgShow:"",
				cInfo:{},
				item:{},
				company:[],
				aut:0,
				reason:"",
				open:false
			}
		},
		methods:{
			handleAttesta(v){
				this.imgShow=v.img;
				this.open=true;
				this.item=v;
			},
			handleAgree(i){
				let _this=this;
				uni.showModal({
				    title: '提示',
				    content: '请再次确认是否审核完毕，确认无法更改！',
				    success: function (res) {
				        if (res.confirm) {
				            uni.request({
				                url: `http://123.57.187.184/zpw/os/update/updateAttestaMsg.php`, 
								method:"POST",
				            	 data:{
				            		 id:_this.item.id,
				            		 aut:i,
				            		 reason:_this.reason
				            	 },
				                success: (res) => {
				            		console.log(res)
									_this.open=false;
				                }
				            });
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		},
		mounted() {
			let _this=this;
			uni.getStorage({
			    key: 'companyInfo',
			    success: function (res) {
			        _this.cInfo=JSON.parse(res.data);
					uni.request({
					    url: `http://123.57.187.184/zpw/os/query/queryCompany.php`, 
						 data:{
							 qid:9999999
						 },
					    success: (res) => {
							_this.company=res.data;
							_this.imgShow=res.data[1].img;
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
	.cont{
		padding: 20px;
	}
	.cont view{
		display: flex;
		border: 1px solid #F1F2F6;
		border-bottom:0;
		padding: 10px;
	}
	.cont view:last-child{
		border-bottom: 1px solid #F1F2F6;
	}
	.cont view span{
		border-right: 1px solid #F1F2F6;
		text-align: center;
		flex: 1;
		height: 50px;
		line-height: 50px;
	}
	.cont view span image{
		width: 50px;
		height: 50px;
	}
	.cont view span:last-child{
		border-right: 0;
	}
	.cz{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.cz em{
		font-style: normal;
		flex: 1;
		text-align: center;
	}
	.model-cont{
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: rgba(0,0,0,.7);
	}
	.model-cont .cont-item{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 500px;
		height: 780px;
		background: #fff;
		padding:20px 50px;
		text-align: center;
	}
	.model-cont .cont-item img{
		width: 100%;
		height: 80%;
		margin: 0 auto 20px;
	}
	.model-cont .cont-item view{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.model-cont .cont-item view button{
		flex: 1;
		margin: 0 10px;
	}
	.model-cont .cont-item view button:nth-child(1):hover{
		color: #fff;
		background-color: #4CD964;
	}
	.model-cont .cont-item view button:nth-child(2):hover{
		color: #fff;
		background-color: #FF0000;
	}
	.model-cont .cont-item view button:nth-child(3):hover{
		color: #fff;
		background-color: #F1F2F6;
	}
	.model-cont .cont-item input{
		width: 100%;
		padding: 10px 0;
		border: 1px solid #F1F2F6;
		margin-bottom: 20px;
	}
</style>
