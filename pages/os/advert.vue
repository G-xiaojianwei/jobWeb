<template>
	<view>
		<view class="container">
			<view class="title">广告管理</view>
			<view class="btn" @click="onOff=true"><i class="icon-add"></i>添加广告</view>
			<view class="cont">
				<view><span>广告名称</span><span>图片</span><span>操作</span></view>
				<view v-for="(item,index) in advertArr"><span>{{item.title}}</span><span> <image :src="'http://123.57.187.184/zpw/img/'+item.imgurl"></image> </span><span><i class="icon-sc" @click="handleDelete(item.id,index)"></i></span></view>
			</view>
			<view class="model-add" v-if="onOff">
				<view class="add-top">
					<view class="add-title">添加广告</view>
					<view class="add-item"><span>广告名称:</span><span><input type="text" placeholder="请输入名称" v-model="title"></span></view>
					<view class="add-item"><span>广告图片:</span><span><i @click="handleUpFile" >{{bgImg==''?'点击上传':''}}<image v-if="bgImg!==''" :src="'http://123.57.187.184/zpw/img/'+bgImg+'.png'" mode=""></image></i><em>请上传355px*150px的图片</em></span></view>
					<view class="add-item"><span>跳转链接:</span><span><input type="text" placeholder="请输入链接" v-model="link"></span></span></view>
					<view class="add-item"><button @click="handleAddAdvert">提交</button><button @click="onOff=false">取消</button></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				advertArr:[],
				bgImg:"",
				title:"",
				link:"",
				onOff:false
			}
		},
		methods:{
			handleDelete(v,i){
				let _this=this;
				uni.request({
					url:"http://123.57.187.184/zpw/os/delete/deleteAdvert.php",
					method:"GET",
					data:{
						id:v
					},
					success(res) {
						if(res.data==''){
							_this.advertArr.splice(i,1);
						}
					}
				})
			},
			handleAddAdvert(){
				let _this=this;
				if(this.title!=='' || this.bgImg!==''){
					uni.request({
						url:"http://123.57.187.184/zpw/os/add/addAdvert.php",
						method:"POST",
						data:{
							title:_this.title,
							imgurl:_this.bgImg+'.png',
							links:_this.link
						},
						success(res) {
							if(res.data==200){
								uni.showToast({
									icon:"success",
								    title: '添加成功',
								    duration: 2000
								});
								_this.onOff=false;
								uni.request({
								    url: 'http://123.57.187.184/zpw/php/query/queryAdvert.php', 
								    success: (res) => {
								        _this.advertArr=res.data;
								    }
								});
							}
						}
					})
				}
				
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
				                _this.bgImg=uploadFileRes.data;
				            }
				        });
				    }
				});
			}
		},
		mounted() {
			// 获取广告图
			uni.request({
			    url: 'http://123.57.187.184/zpw/php/query/queryAdvert.php', 
			    success: (res) => {
			        this.advertArr=res.data;
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
	.icon-add{
		display: inline-block;
		width: 20px;
		height: 20px;
		background-image: url(../../static/img/add.png);
		background-size: 100% 100%;
		vertical-align: middle;
		margin-bottom: 2px;
		margin-right: 5px;
	}
	
	.btn{
		padding: 5px 20px;
		background-color: #F1F2F6;
		border-radius: 20px;
		display: inline-block;
		margin: 0 20px;
	}
	.btn:hover{
		color: #fff;
		background-color: #09BB07;
	}
	.btn:hover .icon-add{background-image: url(../../static/img/ac-add.png);}
	.icon-sc{
			display: inline-block;
			vertical-align: middle;
			width: 20px;
			height: 20px;
			background-image: url(../../static/img/shanchu1.png);
			background-size: 100% 100%;
		}
	.icon-sc:hover{background-image: url(../../static/img/ac-shanchu1.png);}
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
	.model-add{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.7);
	}
	.add-top{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 800px;
		height: 500px;
		background-color: #FFFFFF;
	}
	.add-title{
		padding: 20px;
		text-align: center;
		font-weight: bold;
	}
	.add-item{
		padding: 20px 100px 0px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: left;
	}
	.add-item span{
		flex: 2;
	}
	.add-item span:last-child{
		flex: 8;
	}
	.add-item span input{
		border: 1px solid #F1F2F6;
		padding:10px 20px;
		height: 40px;
		box-sizing: border-box;
	}
	.add-item span i{
		display: inline-block;
		width: 400px;
		height: 200px;
		background: #F1F2F6;
		text-align: center;
		line-height: 200px;
		font-style: normal;
	}
	.add-item span i image{
		width: 100%;
		height: 100%;
	}
	.add-item span em{
		display: inline-block;
		font-style: normal;
		font-size: 12px;
		width: 80px;
		height: 40px;
	}
	.add-item button{
		width: 70px;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
	}
	.add-item button:hover{
		background: #4CD964;
		color: #fff;
	}
</style>
