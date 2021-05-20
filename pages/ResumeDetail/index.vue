<template>
	<view>
		<!-- 返回 -->
		<view class="return">
			<i @click="handleBack">返回</i>
			简历详情
		</view>
		<!-- 基本信息 -->
		<view class="info1">
			<view>
				<p @click="handleToBasic">{{dataInfo.name}} <i class="icon-bj"></i></p>
				<p>基本信息未完善</p>
			</view>
			<view @click="handleUpHeader">
				<img v-if="bgImg==''"  :src="'http://123.57.187.184/zpw/img/'+dataInfo.imgurl" alt="">
				<img v-else :src="'http://123.57.187.184/zpw/img/'+bgImg" alt="">
			</view>
		</view>
		<!-- 求职意向 -->
		<view class="intention">
			<view class="intention-1">
				<span>求职意向</span>
				<select v-model="val" class = "selectType" @change="selectTypeChange" ref="addRequestState">
					<option value="请选择">请选择</option>
					<option value="我目前正在职，考虑换个工作">我目前正在职，考虑换个工作</option>
					<option value="我目前已离职，可快速到岗">我目前已离职，可快速到岗</option>
					<option value="我暂时不想找工作">我暂时不想找工作</option>
					<option value="我是应届生">我是应届生</option>
				</select> 
			</view>
		</view>
		<!-- 工作经历 -->
		<view class="job">
			<view><span>工作经历</span><em @click="handleAddJob">添加</em></view>
			<view class="job-cont">
				<span v-if="jobArr.length==0">无</span>
				<view class="item" v-for="(item,index) in jobArr" :key="index">
					<view>{{item.cname}} <em @click="handleDeleteJob(item.id,index)">删除</em></view>
					<view>{{item.oname}}</view>
					<view>{{item.s}}-{{item.end}}</view>
					<view>{{item.workcont}}</view>
				</view>
			</view>
		</view>
		<!-- 工作经历 -->
		<view class="job">
			<view><span>教育经历</span><em @click="eduOpen=true">添加</em></view>
			<view class="job-cont">
				<span v-if="eduArr.length==0">无</span>
				<view class="item" v-for="(item,index) in eduArr" :key="index">
					<view>{{item.sname}} <em @click="handleDeleteEdu(item.id,index)">删除</em></view>
					<view>{{item.education}}</view>
					<view>{{item.s}}-{{item.end}}</view>
				</view>
			</view>
		</view>
		<!-- 工作经历 -->
		<view class="job">
			<view><span>项目经历</span><em @click="projectOpen=true">添加</em></view>
			<view class="job-cont">
				<span v-if="ProjectArr.length==0">无</span>
				<view class="item" v-for="(item,index) in ProjectArr" :key="index">
					<view>{{item.cname}} <em @click="handleDeleteProject(item.id,index)">删除</em></view>
					<view>{{item.oname}}</view>
					<view>{{item.s}}-{{item.end}}</view>
					<view>{{item.cont}}</view>
				</view>
			</view>
		</view>
		<!-- 工作经历 -->
		<view class="job">
			<view><span>自我描述</span><em @click="selfOpen=true" v-if="selfArr.length==0">添加</em></view>
			<view class="job-cont">
				<span v-if="selfArr.length==0">无</span>
				<view class="item" v-for="(item,index) in selfArr" :key="index">
					<view>{{item.cont}} <em @click="handleDeleteSelf(item.id,index)">删除</em></view>
				</view>
			</view>
		</view>
		<view class="job-model-cont" v-if="jobOpen">
			<view class="model-cont-a">
				<view class="title">工作经历</view>
				<view class="cont-list">
					<span>公司名称</span>
					<input type="text" v-model="jobItem.cname">
				</view>
				<view class="cont-list">
					<span>职位名称</span>
					<input type="text" placeholder="格式:前端工程师" v-model="jobItem.oname">
				</view>
				<view class="cont-list">
					<span>开始时间</span>
					<input type="text" placeholder="格式:2020年1月" v-model="jobItem.start">
				</view>
				<view class="cont-list">
					<span>结束时间</span>
					<input type="text" placeholder="格式:2020年4月" v-model="jobItem.end">
				</view>
				<view class="cont-list">
					<span>工作内容</span>
					<textarea value="" placeholder="1.负责……
2.负责……" v-model="jobItem.cont" />
					
				</view>
				<view class="btn"><button @click="jobOpen=false">取消</button><button @click="handleAddjobData">完成</button></view>
			</view>
		</view>
		<!-- 工作经历模态框 -->
		<view class="job-model-cont" v-if="projectOpen">
			<view class="model-cont-a">
				<view class="title">项目经历</view>
				<view class="cont-list">
					<span>项目名称</span>
					<input type="text" v-model="ProjectItem.cname">
				</view>
				<view class="cont-list">
					<span>职位名称</span>
					<input type="text" placeholder="格式:前端工程师" v-model="ProjectItem.oname">
				</view>
				<view class="cont-list">
					<span>开始时间</span>
					<input type="text" placeholder="格式:2020年1月" v-model="ProjectItem.start">
				</view>
				<view class="cont-list">
					<span>结束时间</span>
					<input type="text" placeholder="格式:2020年4月" v-model="ProjectItem.end">
				</view>
				<view class="cont-list">
					<span>项目内容</span>
					<textarea value="" v-model="ProjectItem.cont" placeholder="1.负责……
2.负责……" />
				</view>
				<view class="btn"><button @click="projectOpen=false">取消</button><button @click="handleAddProjectData">完成</button></view>
			</view>
		</view>
		<!-- 工作经历模态框 -->
		<view class="job-model-cont"  v-if="eduOpen">
			<view class="model-cont-a" style="height: 50%;">
				<view class="title">教育经历</view>
				<view class="cont-list">
					<span>学校名称</span>
					<input type="text" v-model="eduItem.sname">
				</view>
				<view class="cont-list">
					<span>最高学历</span>
					<input type="text" placeholder="格式:大专" v-model="eduItem.education">
				</view>
				<view class="cont-list">
					<span>入学时间</span>
					<input type="text" placeholder="格式:2015年9月" v-model="eduItem.s">
				</view>
				<view class="cont-list">
					<span>毕业时间</span>
					<input type="text" placeholder="格式:2019年7月" v-model="eduItem.end">
				</view>
				<view class="btn"><button @click="handleClearEdu">取消</button><button @click="handleAddEdu">完成</button></view>
			</view>
		</view>
		<!-- 工作经历模态框 -->
		<view class="job-model-cont" v-if="selfOpen">
			<view class="model-cont-a" style="height: 50%;">
				<view class="title">自我描述</view>
				<view class="cont-list">
					<span>描述内容</span>
					<textarea value="" placeholder="请输入描述内容" v-model="selfCont" />
				</view>
				<view class="btn"><button @click="selfOpen=false">取消</button><button @click="handleAddSelf">完成</button></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
					val:"请选择",
					jobOpen:false,
					eduOpen:false,
					projectOpen:false,
					selfOpen:false,
					selfCont:"",
					jobItem:{
							cname:"",
							oname:"",
							start:"",
							end:"",
							cont:""
						},
					jobArr:[],
					eduItem:{
							sname:"",
							education:"",
							s:"",
							end:""
						},
					eduArr:[],
					ProjectItem:{
							cname:"",
							oname:"",
							start:"",
							end:"",
							cont:""
						},
					ProjectArr:[],
					selfArr:[],
					dataInfo:{},
					bgImg:""
			}
		},
		methods: {
			handleToBasic(){
				let _this=this;
				uni.navigateTo({
					url:`/pages/basicdetail/index?id=${_this.dataInfo.uid}`
				})
			},
			handleUpHeader(){
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
								if(uploadFileRes.data!=="上传失败"){
									let _this=this;
									uni.request({
									    url: `http://123.57.187.184/zpw/php/update/updateHeaderImg.php`, 
										method:"POST",
										 data:{
											 uid:_this.dataInfo.uid,
											 img:_this.bgImg,
										 },
									    success: (res) => {
											if(res.data=="1"){
												uni.getStorage({
												    key: 'dataInfo',
												    success: function (res) {
												        let dataA=JSON.parse(res.data);
														dataA.imgurl=_this.bgImg;
														uni.setStorageSync('dataInfo',JSON.stringify(dataA));
												    }
												});
											}
									    }
									});
								}
				            }
				        });
				    }
				});
			},
			handleBack(){
				uni.navigateBack({
				    delta: 2
				});
			},
			handleAddJob(){
				this.jobOpen=true;
			},
			handleAddjobData(){
				if(this.jobItem.cname!=="" && this.jobItem.cname !=="" && this.jobItem.start !=="" && this.jobItem.end !== "" && this.jobItem.cont!==""){
					uni.request({
					    url: `http://123.57.187.184/zpw/php/add/addJobCont.php`, 
						method:"post",
						header: {
						        'content-type': 'application/x-www-form-urlencoded'
						    },
						data:{
							 uid:this.dataInfo.uid,
							 cname:this.jobItem.cname,
							 oname:this.jobItem.oname,
							 start:this.jobItem.start,
							 end:this.jobItem.end,
							 workcont:this.jobItem.cont
						 },
					    success: (res) => {
							if(res.data==200){
								this.jobItem={
										cname:"",
										oname:"",
										start:"",
										end:"",
										cont:""
									},
								this.jobOpen=false;
								//查询出数据
								let _this=this;
								uni.request({
								    url: `http://123.57.187.184/zpw/php/query/queryJobCont.php?uid=${_this.dataInfo.uid}`, 
								    success: (res) => {
										_this.jobArr=res.data;
								    }
								});
							}else{
								alert("保存失败，请重新输入");
							}
					    }
					});
				}else{
					alert("请全部输入")
				}
			},
			handleDeleteJob(v,i){
				uni.request({
				    url: `http://123.57.187.184/zpw/php/delete/deleteJobItem.php`, 
					 data:{
						 id:v
					 },
				    success: (res) => {
						if(res.data==""){
							this.jobArr.splice(i,1)
						}
				    }
				});
			},
			handleClearEdu(){
				this.eduOpen=false;
				this.eduItem={
							sname:"",
							education:"",
							s:"",
							end:""
						};
			},
			handleAddEdu(){
				if(this.eduItem.sname!=="" && this.eduItem.education !=="" && this.eduItem.s !=="" && this.eduItem.end !== ""){
					uni.request({
					    url: `http://123.57.187.184/zpw/php/add/addEdu.php`, 
						method:"post",
						header: {
						        'content-type': 'application/x-www-form-urlencoded'
						    },
						data:{
							 uid:this.dataInfo.uid,
							 sname:this.eduItem.sname,
							 education:this.eduItem.education,
							 s:this.eduItem.s,
							 end:this.eduItem.end,
						 },
					    success: (res) => {
							if(res.data==200){
								this.eduItem={
									sname:"",
									education:"",
									s:"",
									end:""
								};
								this.eduOpen=false;
								//查询出数据
								let _this=this;
								uni.request({
								    url: `http://123.57.187.184/zpw/php/query/queryEduCont.php?uid=${_this.dataInfo.uid}`, 
								    success: (res) => {
										_this.eduArr=res.data;
								    }
								});
							}else{
								alert("保存失败，请重新输入");
							}
					    }
					});
				}else{
					alert("请全部输入")
				}
			},
			handleDeleteEdu(v,i){
				uni.request({
				    url: `http://123.57.187.184/zpw/php/delete/deleteEduItem.php`, 
					 data:{
						 id:v
					 },
				    success: (res) => {
						if(res.data==""){
							this.eduArr.splice(i,1)
						}
				    }
				});
			},
			handleAddProjectData(){
				if(this.ProjectItem.cname!=="" && this.ProjectItem.oname !=="" && this.ProjectItem.start !=="" && this.ProjectItem.end !== "" && this.ProjectItem.cont!==""){
					uni.request({
					    url: `http://123.57.187.184/zpw/php/add/addProjectCont.php`, 
						method:"post",
						header: {
						        'content-type': 'application/x-www-form-urlencoded'
						    },
						data:{
							 uid:this.dataInfo.uid,
							 cname:this.ProjectItem.cname,
							 oname:this.ProjectItem.oname,
							 start:this.ProjectItem.start,
							 end:this.ProjectItem.end,
							 cont:this.ProjectItem.cont
						 },
					    success: (res) => {
							console.log(res)
							if(res.data==200){
								this.ProjectItem={
										cname:"",
										oname:"",
										start:"",
										end:"",
										cont:""
									},
								this.projectOpen=false;
								//查询出数据
								let _this=this;
								uni.request({
								    url: `http://123.57.187.184/zpw/php/query/queryProjectCont.php?uid=${_this.dataInfo.uid}`, 
								    success: (res) => {
										_this.ProjectArr=res.data;
								    }
								});
							}else{
								alert("保存失败，请重新输入");
							}
					    }
					});
				}else{
					alert("请全部输入")
				}
			},
			handleDeleteProject(v,i){
				uni.request({
				    url: `http://123.57.187.184/zpw/php/delete/deleteProjectItem.php`, 
					 data:{
						 id:v
					 },
				    success: (res) => {
						if(res.data==""){
							this.ProjectArr.splice(i,1)
						}
				    }
				});
			},
			handleAddSelf(){
				if(this.selfCont!==""){
					uni.request({
					    url: `http://123.57.187.184/zpw/php/add/addSelf.php`, 
						method:"post",
						header: {
						        'content-type': 'application/x-www-form-urlencoded'
						    },
						data:{
							 uid:this.dataInfo.uid,
							 cont:this.selfCont
						 },
					    success: (res) => {
							console.log(res)
							if(res.data==200){
								this.selfOpen=false;
								//查询数据
								let _this=this;
								uni.request({
								    url: `http://123.57.187.184/zpw/php/query/querySelf.php?uid=${_this.dataInfo.uid}`, 
								    success: (res) => {
										_this.selfArr=res.data;
								    }
								});
							}else{
								alert("保存失败，请重新输入");
							}
					    }
					});
				}
			},
			handleDeleteSelf(v,i){
				uni.request({
				    url: `http://123.57.187.184/zpw/php/delete/deleteSelfItem.php`, 
					 data:{
						 id:v
					 },
				    success: (res) => {
						if(res.data==""){
							this.selfArr.splice(i,1)
						}
				    }
				});
			},
			selectTypeChange(){
				 let index = this.$refs.addRequestState.value
				 this.val=index;
				 //更改求职状态
				 if(this.val==0){
					 return;
				 }
				 let _this=this;
				 uni.request({
				     url: `http://123.57.187.184/zpw/php/update/updateInten.php`, 
					 data:{
						 uid:_this.dataInfo.uid,
						 val:index
					 },
				     success: (res) => {
				 		console.log(res)
				     }
				 });
			}
		},
		mounted() {
			let _this=this;
			let i=_this.$mp.query.id;
			console.log(this.$mp.query.id)
			console.log(_this.$mp)
			uni.request({
			    url: `http://123.57.187.184/zpw/php/query/queryInfo.php?id=${i}`, 
			    success: (res) => {
			        _this.dataInfo=res.data[0];
					_this.val=res.data[0].intention;
					console.log(_this.dataInfo)
			    }
			});
			uni.request({
			    url: `http://123.57.187.184/zpw/php/query/queryJobCont.php?uid=${i}`, 
				method:"GET",
			    success: (res) => {
					_this.jobArr=res.data;
			    }
			});
			//查询教育数据
			uni.request({
			    url: `http://123.57.187.184/zpw/php/query/queryEduCont.php?uid=${i}`, 
			    success: (res) => {
					_this.eduArr=res.data;
			    }
			});
			//查询项目数据
			uni.request({
			    url: `http://123.57.187.184/zpw/php/query/queryProjectCont.php?uid=${i}`, 
			    success: (res) => {
					_this.ProjectArr=res.data;
			    }
			});
			//查询描述数据
			uni.request({
			    url: `http://123.57.187.184/zpw/php/query/querySelf.php?uid=${i}`, 
			    success: (res) => {
					// console.log(res)
					_this.selfArr=res.data;
			    }
			});
		}
	}
</script>	

<style>
	.item{
		padding:20rpx 0;
		border-bottom: 1rpx solid #ccc;
		background: #F1F2F6;
		padding: 20rpx;
	}
	.item view{
		margin-top: 10rpx;
	}
	.item view:nth-child(1){
		color: #000;
		font-weight: bold;
	}
	.item view:nth-child(2){
		font-size: 28rpx;
	}
	.item view:nth-child(3){
		font-size: 24rpx;
	}
	.item em{
		background: #4CD964 !important;
		color: #fff !important;
	}
.return{
	position: fixed;
	left: 0;
	top: 0;
	background: #fff;
	width: 100%;
	padding: 20rpx;
	text-align: center;
}
.return i{
	float: left;
}
.info1{
	margin-top: 40rpx;
	display: flex;
	padding:50rpx 20rpx 20rpx;
	border-bottom: 1rpx solid #eee;
}
.info1 view:nth-child(1){
	flex: 7;
}
.info1 view:nth-child(1) p:nth-child(1){
	font-size: 50rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
}
.info1 view:nth-child(1) p:nth-child(2){
	color: #666;
}
.info1 view:nth-child(2){
	flex: 3;
}
.info1 view:nth-child(2) img{
	width: 70%;
	height: 85%;
}
.icon-bj{
	display: inline-block;
	vertical-align: middle;
	margin-left: 20rpx;
	width: 40rpx;
	height: 40rpx;
	background: url(../../static/img/bj.png);
	background-size: 100% 100%;
}
.intention{
	display: block;
	padding:0 20rpx;
	height: 100rpx;
	line-height: 100rpx;
	border-bottom: 1rpx solid #eee;
}
.intention-1 span:nth-child(1){
	font-weight: bold;
}
.intention-1 select{
	float: right;
	margin-top: 33rpx;
}
.inte{
	float: right;
	color: #666;
	font-size: 24rpx;
}
.jt{
	float: right;
	display: inline-block;
	vertical-align: middle;
	transform: rotateZ(45deg);
	margin-top: 37rpx;
	width: 25rpx;
	height: 25rpx;
	border: 1rpx solid #666;
	border-left:transparent ;
	border-bottom:transparent ;
}
.job{
	padding: 20rpx;
	border-bottom: 1rpx solid #eee;
}
.job view:nth-child(1) span{
	font-weight: bold;
}
.job em{
	float: right;
	width: 120rpx;
	height: 50rpx;
	line-height: 50rpx;
	font-size: 24rpx;
	background: #F1F2F6;
	text-align: center;
}
.job-cont{
	padding: 40rpx 0;
	color: #666;
}
.job-model-cont{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.6);
}
.model-cont-a{
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
	padding: 20rpx;
	box-sizing: border-box;
	width: 80%;
	height: 70%;
	background: #fff;
}
.model-cont-a .title{
	text-align: center;
	padding: 20rpx 0;
	font-weight: bold;
}
.model-cont-a view{
	margin-top:20rpx;
}
.cont-list span{
	width: 30%;
	height: 80rpx;
	text-align: center;
}
.cont-list input{
	display: inline-block;
	margin-left: 5%;
	vertical-align: middle;
	width: 65%;
	height: 70rpx;
	border: 1rpx solid #eee;
	padding: 20rpx;
	box-sizing: border-box;
}
textarea{
	margin-top: 20rpx;
	width: 100%;
	height: 200rpx;
	border: 1rpx solid #eee;
	padding: 20rpx;
	box-sizing: border-box;
}
.btn{
	text-align: center;
}
.btn button{
	display: inline-block;
	vertical-align: middle;
	margin:0 20rpx;
	width: 40%;
}
</style>
