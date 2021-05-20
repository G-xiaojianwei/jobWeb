<template>
	<!-- 招聘信息 -->
	<view>
		<view class="container" v-if="jobName==''">
			<view class="title">招聘信息</view>
			<view class="cont">
				<view class="cont-item"><span>岗位名称</span><span>投递人数</span><span>操作</span></view>
				<view class="cont-item" v-for="(item,index) in jobsArr"><span>{{item.title}}</span><span @click="handleDelivery(item.id,item.title)">{{showNum(item.id)}}</span><span><em><i class="icon-bj"></i></em><em @click="handleDelete(item,index)"><i class="icon-sc"></i></em></span></view>
			</view>
		</view>
		<view class="container" v-if="jobName!==''">
			<view class="title">求职简历<i class="icon-gb" @click="handleClearOff"></i></view>
			<view class="cont">
				<view class="cont-item"><span>岗位名称</span><span>求职人名称</span><span>操作</span></view>
				<view class="cont-item" v-for="(item,index) in basicArr"><span>{{jobName}}</span><span>{{item.name}}</span><span><em><i class="icon-ck" @click="handleLookInfo(item.uid)"></i></em><em><i class="icon-yq" @click="handleInvitation(item.uid)"></i></em></span></view>
			</view>
		</view>
		<view class="main-model" v-if="basicOpen">
			<view class="main-container">
				<view class="main-title">求职简历<i class="icon-gb" @click="basicOpen=false" style="margin-right: 10px;"></i></view>
				<view class="basic-info">
					<view class="basic-title">基础信息</view>
					<view class="basci-cont">
						<view class="left">
							<view><span>姓名:</span><span>{{basic.name}}</span></view>
							<view><span>性别：</span><span>{{basic.sex=='man'?'男':'女'}}</span></view>
							<view><span>出生年月：</span><span>{{basic.birth}}</span></view>
							<view><span>婚姻状况：</span><span>{{basic.marriage=='0'?'保密':basic.marriage=='1'?'已婚':'未婚'}}</span></view>
							<view><span>最高学历：</span><span>{{basic.education}}</span></view>
							<view><span>工作年限：</span><span>{{basic.experience}}</span></view>
							<view><span>联系电话：</span><span>{{basic.phone}}</span></view>
						</view>
						<view class="right">
							<image :src="'http://123.57.187.184/zpw/img/'+basic.imgurl" mode=""></image>
						</view>
					</view>
				</view>
				<view class="basic-info">
					<view class="basic-title">教育经历</view>
					<view class="basci-edu">
						<view class="edu-item">
							<span>毕业时间</span>
							<span>学院名称</span>
							<span>学历</span>
						</view>
						<view class="edu-item" v-for="(item,index) in eduArr">
							<span>{{item.end}}</span>
							<span>{{item.sname}}</span>
							<span>{{item.education}}</span>
						</view>
					</view>
				</view>
				<view class="basic-info">
					<view class="basic-title">工作经历</view>
					<view class="basci-edu">
						<view class="edu-item">
							<span>工作时间</span>
							<span>就职公司</span>
							<span>就职岗位</span>
							<span>主要职责</span>
						</view>
						<view class="edu-item" v-for="(item,index) in jobArr">
							<span>{{item.s}}-{{item.end}}</span>
							<span>{{item.cname}}</span>
							<span>{{item.oname}}</span>
							<span>{{item.workcont}}</span>
						</view>
					</view>
				</view>
				<view class="basic-info">
					<view class="basic-title">项目经历</view>
					<view class="basci-edu">
						<view class="edu-item">
							<span>工作时间</span>
							<span>项目名称</span>
							<span>就职岗位</span>
							<span>主要职责</span>
						</view>
						<view class="edu-item" v-for="(item,index) in ProjectArr">
							<span>{{item.s}}-{{item.end}}</span>
							<span>{{item.cname}}</span>
							<span>{{item.oname}}</span>
							<span>{{item.cont}}</span>
						</view>
					</view>
				</view>
				<view class="basic-info">
					<view class="basic-title">自我描述</view>
					<view class="basci-edu">
						<view style="padding: 20px;">
							{{selfArr.cont}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="yaoqin-model" v-if="yaoqin">
			<view class="yaoqin-cont">
				<view class="yaoqin-title">面试邀请</view>
				<view class="cont-info">
					<view><span>邀请人：</span><span>{{basic.name}}</span></view>
					<view><span>邀请职位：</span><span>{{jobName}}</span></view>
					<view><span>邀请内容：</span><span><textarea v-model="yaoqinCont"></textarea></span></view>
					<view><button @click="setInvite">发送</button><button @click="yaoqin=false">取消</button></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				jobsArr:[],
				deliveryArr:[],
				basicArr:[],
				basic:[],
				personal:{},
				jobArr:[],
				eduArr:[],
				ProjectArr:[],
				selfArr:{},
				jobName:"",
				basicOpen:false,
				yaoqin:false,
				yaoqinCont:"",
				jid:"",
				companyInfo:{}
			}
		},
		methods:{
			setInvite(){
				let _this=this;
				uni.request({
				  method: 'POST',
				  url: 'http://123.57.187.184/zpw/os/add/addInvite.php',
				  data: {
				    uid:_this.basic.uid,
				    jid:_this.jid,
					qid:_this.jobsArr[0].qid,
				    yaoqinCont:_this.yaoqinCont,
				  },
				  success(res) {
					  console.log(res,11)
					  if(res.data==200){
						  uni.showToast({
						      title: '成功发送邀请',
						      duration: 2000
						  });
						  _this.yaoqin=false;
					  }
				  }
				})
			},
			handleInvitation(i){
				let _this=this;
				uni.request({
				    url: `http://123.57.187.184/zpw/os/query/queryInvite.php`,
				    success: (res) => {
						if(res.data==""){
							this.yaoqin=true;
							this.basic=this.basicArr.filter(item=>item.uid==i)[0];
							return;
						}
						let invite=res.data.filter(item=>item.uid==i && item.jid==_this.jid);
						if(invite.length!==0){
							this.yaoqin=false;
							uni.showToast({
								title: '您已发送过邀请，请勿再次发送！',
								duration: 2000
							});
						}else{
							this.yaoqin=true;
							this.basic=this.basicArr.filter(item=>item.uid==i)[0];
						}
				    }
				});
			},
			handleLookInfo(i){
				let _this=this;
				this.selfArr={};
				this.basicOpen=true;
				this.basic=this.basicArr.filter(item=>item.uid==i)[0];
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
						_this.selfArr=res.data[0];
				    }
				});
			},
			handleClearOff(){
				this.jobName="";
				this.basicArr=[];
			},
			handleDelivery(v,n){
				let _this=this;
				_this.jobName=n;
				_this.jid=v;
				uni.request({
				  method: 'GET',
				  url: `http://123.57.187.184/zpw/os/query/queryBasic.php?jid=${v}`,
				  success(res) {
					_this.basicArr=res.data;
				  }
				});
			},
			showNum(v){
				let num=this.deliveryArr.filter(item=>item.jid==v);
				return num.length;
			},
			handleDelete(v,i){
				let _this=this;
			  var r = confirm("您确定要删除？");
			  if (r == true) {
				  uni.request({
					  method: 'GET',
					  url: `http://123.57.187.184/zpw/os/delete/deleteJobs.php?id=${v.id}`,
					  success(res) {
					  	if(res.data==""){
					  		alert("成功删除");
							_this.jobsArr.splice(i,1);
					  	}
					  }
				  });
			  } else {
				 
			  }
			}
		},
		mounted() {
		let _this=this;
			uni.getStorage({
				key: 'companyInfo',
				success: function (res) {
					_this.companyInfo=JSON.parse(res.data);
					uni.request({
					  method: 'GET',
					  url: 'http://123.57.187.184/zpw/os/query/queryJobs.php',
					  data:{
						  qid:_this.companyInfo.id
					  },
					  success(res) {
						  console.log(res)
					  	_this.jobsArr=res.data;
					  }
					})
					uni.request({
					  method: 'GET',
					  url: 'http://123.57.187.184/zpw/os/query/queryDelivery.php',
					  data:{
					  	qid:_this.companyInfo.id
					  },
					  success(res) {
						  if(res.data!==""){
					  	_this.deliveryArr=res.data;
						  }
					}
					})
				}
			});
			
		},
		computed:{
			
		}
	}
</script>

<style>
	.icon-bj,.icon-sc,.icon-ck,.icon-yq,.icon-gb{
		display: inline-block;
		width: 20px;
		height: 20px;
		background: url(../../static/img/bianji.png);
		background-size: 100% 100%;
	}
	.icon-bj:hover{background-image: url(../../static/img/ac-bianji.png);}
	.icon-gb{ float: right;border-radius: 50%; background-image: url(../../static/img/guanbi.png);}
	.icon-gb:hover{background-image: url(../../static/img/ac-guanbi.png);}
	.icon-sc{background-image: url(../../static/img/shanchu1.png);}
	.icon-sc:hover{background-image: url(../../static/img/ac-shanchu1.png);}
	.icon-ck{background-image: url(../../static/img/chakan.png);}
	.icon-ck:hover{background-image: url(../../static/img/ac-chakan.png);}
	.icon-yq{background-image: url(../../static/img/iconyq.png);}
	.icon-yq:hover{background-image: url(../../static/img/ac-iconyq.png);}
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
.main-model{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color:rgba(0,0,0,.8);
	
}
.main-container{
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 40px;
	margin: auto;
	width:650px;
	height:800px;
	padding: 20px;
	overflow-y: scroll;
	background-color: #fff;
}
.main-container::-webkit-scrollbar{width: 0px;}
.main-title{
	text-align: center;
	padding: 20px 0;
	font-size: 18px;
	letter-spacing: 1em;
	border-bottom: 1px solid #F1F2F6;
}
.basic-info{
	padding: 20px;
	padding-bottom: 0;
	box-sizing: border-box;
}
.basic-title{
	font-weight: bold;
	padding-bottom: 10px;
}
.basci-cont{
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #F1F2F6;
}
.basci-cont .left{
	flex: 8;
	display: flex;
	align-items: center;
	justify-content: left;
	flex-wrap: wrap;
} 
.basci-cont .left view{
	width: 50%;
	padding-left:20px;
	box-sizing: border-box;
	margin-bottom: 10px;
	font-size: 14px;
}
.basci-cont .right{
	flex: 2;
	height: 120px;
	border: 1px solid #000000;
}
.basci-cont .right image{
	width: 100%;
	height: 100%;
}
.basci-edu{

}
.edu-item{
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
}
.edu-item span{
	flex: 1;
	text-align: center;
	padding: 10px 0;
	border: 1px solid #F1F2F6;
	border-right: 0;
	border-bottom:0;
}
.edu-item:last-child span{
	border-bottom:1px solid #F1F2F6;
}
.edu-item span:last-child{
	border-right: 1px solid #F1F2F6;
}
.yaoqin-model{
	position: fixed;
	left: 0;
	top: 0;
	background: rgba(0,0,0,.7);
	width: 100%;
	height: 100%;
}
.yaoqin-cont{
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 600px;
	height: 600px;
	background: #fff;
	padding: 20px;
}
.yaoqin-title{
	padding: 20px 0;
	text-align: center;
	font-weight: bold;
}
.cont-info view{
	display: flex;
	align-items: center;
	justify-content: left;
	border: 1px solid #F1F2F6;
	border-bottom: 0;
	padding: 10px;
}
.cont-info view:last-child{
	border: 1px solid #F1F2F6;
}
.cont-info view span{
	flex: 2;
	text-align: left;
}
.cont-info view span:nth-child(2){
	flex: 8;
}
.cont-info view span textarea{
	width: 100%;
	height: 300px;
	border: 1px solid #F1F2F6;
	padding: 10px;
	box-sizing: border-box;
}
.cont-info view button{
	width: 70px;
	height: 30px;
	line-height: 30px;
	font-size: 14px;
}
.cont-info view button:hover{
	background-color: #393D49;
	color: #fff;
}
</style>
