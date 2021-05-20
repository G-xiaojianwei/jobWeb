<template>
	<view class="container">
		<view class="title">职位管理</view>
		<view class="add" @click="tipAdd">新增职位类型<i class="icon-add"></i></view>
		<view>
			<view>
				<view class="left" v-for="(item,index) in postClassLeft">
					<view class="left-title">{{item.name}}</view>
					<view class="right" v-for="(item2,index2) in postClassRight(item.id)">
						<view><span>{{item.name}}</span><span>{{item2.name}}</span><span><em @click="handleDelete(item2.id,index2)">删除</em></span></view>
					</view>
				</view>
			</view>
		</view>
		<view class="model-cont" v-show="open==1">
			<view class="cc" v-if="os==0"><button @click="handleop(1)">大类</button><button @click="handleop(2)">子类</button></view>
			<view class="cont" v-if="os==1">
				<view class="dl" v-if="opena==1">
					<view class="title">大类添加</view>
					<view><input type="text" placeholder="请输入内容" v-model="dlcont"></view>
					<view><button @click="handleAddTop(1)">提交</button></view>
				</view>
				<view class="zl" v-if="opena==2">
					<view class="title">子类添加</view>
					<view class="lb">
					<select v-model="dl">
						<option :value="item.id" v-for="(item,index) in postClassLeft">{{item.name}}</option>
					</select>
					</view>
					<view>
						<input type="text" placeholder="请输入子类" v-model="zlcont">
					</view>
					<view><button @click="handleAddTop(2)">提交</button></view>
				</view>
				<i class="gb" @click="handleoff">关闭</i>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				postClassArr:[],
				postClassLeft:[],
				dl:"1",
				dlcont:"",
				zlcont:"",
				open:0,
				opena:1,
				os:0
			}
		},
		methods:{
			handleDelete(v,i){
				let _this=this;
				console.log(v,i)
				uni.showModal({
				    title: '提示',
				    content: '您确定要删除么？',
				    success: function (res) {
				        if (res.confirm) {
				            uni.request({
				                url: `http://123.57.187.184/zpw/os/delete/deletePostclass.php`, 
				            	 data:{
				            		 id:v,
				            	 },
				                success: (res) => {
				            		if(res.data==""){
										uni.showToast({
										    title: '删除成功，请刷新',
										    duration: 2000
										});
				            		}
				            		
				                }
				            });
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
			},
			postClassRight(i){
				return this.postClassArr.filter(item=>item.sid==i);
			},
			tipAdd(){
				this.open=1;
				
			},
			handleop(v){
				this.os=1;
				this.opena=v;
			},
			handleoff(){
				this.open=0;
				this.opena=0;
			},
			handleAddTop(i){
				let _this=this;
				if(i==1){
					uni.request({
					    url: `http://123.57.187.184/zpw/os/add/addPostclass.php`, 
						method:"POST",
						 data:{
							 name:_this.dlcont,
							 sid:0,
						 },
					    success: (res) => {
							if(res.data==200){
								uni.showToast({
								    title: '添加成功',
								    duration: 2000
								});
								setTimeout(function(){
									_this.open=0;
									_this.opena=0;
								},2000)
							}
							
					    }
					});
				}else{
					uni.request({
					    url: `http://123.57.187.184/zpw/os/add/addPostclass.php`, 
						method:"POST",
						 data:{
							 name:_this.zlcont,
							 sid:_this.dl,
						 },
					    success: (res) => {
							if(res.data==200){
								uni.showToast({
								    title: '添加成功',
								    duration: 2000
								});
								setTimeout(function(){
									this.open=0;
									this.opena=0;
								},2000)
							}
					    }
					});
				}
			}
		},
		mounted() {
			// 获取职位类别
			uni.request({
			    url: 'http://123.57.187.184/zpw/php/query/queryPostClass.php', 
			    success: (res) => {
					console.log(res)
			        this.postClassArr=res.data;
					this.postClassLeft=this.postClassArr.filter(item=>item.sid==0);
			    }
			});
		}
	}
</script>

<style>
	.container{
		width: 1000px;
		overflow-y: scroll;
		box-sizing: border-box;
		padding: 20px;
		box-shadow: 0 0 5px 2px rgba(0,0,0,.1);
	}
	.container::-webkit-scrollbar{
		width: 0;
	}
	.title{
		text-align: center;
		padding: 20px 0;
		font-weight: bold;
	}
	.add{
		display: inline-block;
		padding:5px 10px;
		background: #4CD964;
		border-radius: 20px;
		color: #fff;
		font-size: 14px;
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
		margin-left: 5px;
	}
	.add:hover .icon-add{background-image: url(../../static/img/ac-add.png);}
	.left-title{
		text-align: center;
	}
	.right{
		border: 1px solid #F1F2F6;
		padding:10px 20px;
		box-sizing: border-box;
		margin: 10px 0;
	}

	.right view{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.right view span{
		flex: 1;
		text-align: center;
	}
	.model-cont{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.7);
	}
	.cont{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 500px;
		height: 400px;
		background: #fff;
	}
	.dl input{
		border: 1px solid #F1F2F6;
		width: 50%;
		padding: 10px;
		margin:0 auto;
		margin-top: 50px;
	}
	.cont button{
		width: 50%;
		margin-top: 50px;
	}
	.cc{
		width: 200px;
		height: 150px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
	}
	.cc button{
		flex: 1;
		height: 50px;
		margin-left: 10px;
	}
	.cc button:nth-child(1){
		margin-left: 0;
	}
	.lb{
		width: 100%;
		text-align: center;
	}
	.lb select{
		margin-top: 50px;
		width: 50%;
		padding: 10px;
	}
	.zl input{
		width: 48%;
		margin: 50px auto;
		padding: 10px;
		border: 1px solid #F1F2F6;
	}
	.gb{
		position: absolute;
		right: 10px;
		top: 10px;
	}
</style>
