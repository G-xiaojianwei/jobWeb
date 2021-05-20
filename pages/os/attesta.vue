<template>
	<view>
		<view class="container">
			<view class="title">企业认证</view>
			<view v-if="aut==0">
				*请提交资料进行企业认证<button class="btn1" @click="aut=3">点击认证</button>
			</view>
			<view v-if="aut==3">
				<p>*营业执照</p>
				<view class="yyzz">
					<view @click="handleUpFile" :style="bgImg==''?'../../static/img/add.png':'background-image: url(http://123.57.187.184/zpw/img/'+bgImg+')'"></view>
					<view> <img src="../../static/img/yyzz.png" alt=""> </view>
				</view>
				<button class="btn2" @click="handleUp">提交资料</button>
			</view>
			<view v-if="aut==2">
				*资料审核中，请等待！
			</view>
			<view v-if="aut==1">
				*审核通过！
			</view>
			<view v-if="aut==4">
				*审核被驳回，驳回原因：{{cInfo.reason}}，请重新提交资料<button class="btn1" @click="aut=3">点击认证</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				bgImg:"",
				cInfo:{},
				aut:0
			}
		},
		methods:{
			handleUp(){
				let _this=this;
				uni.getStorage({
				    key: 'companyInfo',
				    success: function (res) {
				        _this.cInfo=JSON.parse(res.data);
						if(_this.bgImg!==""){
							uni.request({
							    url: `http://123.57.187.184/zpw/os/update/updateAttesta.php`, 
								method:"POST",
								data:{
									 id:_this.cInfo.id,
									 img:_this.bgImg,
									 aut:2
								},
							    success: (res) => {
									if(res.data==1){
										uni.showModal({
										    title: '提示',
										    content: '资料提交成功！',
										    success: function (res) {
										    }
										});
										_this.aut=2;
									}
							    }
							});
						}
				    }
				});
				
			},
			handleUpFile(){
				let _this=this;
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: 'http://123.57.187.184/zpw/os/add/file.php', //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
				            name: 'myfile',
				            formData: {
				                'user': 'test'
				            },
				            success: (uploadFileRes) => {
				                _this.bgImg=uploadFileRes.data+".png";
				            }
				        });
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
							 qid: _this.cInfo.id
						 },
					    success: (res) => {
							console.log(res)
							_this.cInfo=res.data;
							console.log(res.data)
							_this.aut=_this.cInfo.aut;
							uni.setStorage({
							    key: 'companyInfo',
							    data: JSON.stringify(res.data),
							    success: function () {
							        console.log('success2');
							    }
							});
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
	.btn1{
		width: 80px;
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		float: right;
		background-color: #09BB07;
		color: #fff;
		display: inline-block;
		vertical-align: middle;
	}
	.yyzz{
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40px 0;
	}
	.yyzz view{
		flex:30%;
		height: 500px;
		margin:0 40px;
	}
	.yyzz view img{
		width: 100%;
		height: 100%;
	}
	.yyzz view:nth-child(1){
		border: 1px solid #F1F2F6;
		background-image: url(../../static/img/add.png);
		background-size: 100% 100%;
	}
	.btn2{
		width: 100px;
	}
</style>
