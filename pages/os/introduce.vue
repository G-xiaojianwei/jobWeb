<template>
	<view>
		<view class="container">
			<view class="title">企业介绍</view>
			<view>
				<editor id="editor" class="ql-container"  @ready="onEditorReady" v-model="val"></editor>
			</view>
				<button class="btn" @click="handleUpdate">更新</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cInfo:{},
				title:"",
				val:""
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
							_this.cInfo=res.data;
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
		},
		methods:{
			onEditorReady(e) {
				let _this=this;
				// #ifdef APP-PLUS || H5 ||MP-WEIXIN
				uni.createSelectorQuery().select('#editor').context((res) => {
					uni.getStorage({
					    key: 'companyInfo',
					    success: function (res) {
					        _this.cInfo=JSON.parse(res.data);
					    }
					});
				  this.editorCtx = res.context;
				  this.editorCtx.setContents({
					html:_this.cInfo.introduce,
					success: (res) => {
						console.log(res);
					},
					fail: (err) => {
						console.log(err);
					}
				})
				}).exec()
				// #endif
			},
			handleUpdate(){
				let _this=this;
				uni.request({
					url: `http://123.57.187.184/zpw/os/update/updateIntroduce.php`, 
					method:"POST",
					data:{
						id:_this.cInfo.id,
						introduce:_this.val.detail.text
					},
					success: (res) => {
						if(res.data==1){
							uni.showToast({
							    title: '企业简介已更新',
							    duration: 2000
							});
						}
					}
				});
			}
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
	.ql-container{
		border: 1px solid #F1F2F6;
		padding:0 10px;
		box-sizing: border-box;
	}
	.btn{
		margin-top: 20px;
		width: 100px;
	}
	.btn:hover{
		color: #fff;
		background-color: #4CD964;
	}
</style>
