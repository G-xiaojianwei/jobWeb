<template>
	<view>
		<view class="container">
			<view class="left">
				<view class="left-title">职场新派</view>
				<view>
					<ul>
						<li :class="item==actOpen?'act':''" v-for="(item,index) in mainArr" @click="handleChange(item)">{{item}}<i></i></li>
					</ul>
				</view>
			</view>
			<view class="main">
				<recruitList v-if="actOpen=='招聘管理'" />
				<recruit v-if="actOpen=='添加招聘'" />
				<invite v-if="actOpen=='面试邀请'" />
				<advert v-if="actOpen=='广告管理'" v-show="i==1" />
				<classify v-if="actOpen=='分类管理'" v-show="i==1" />
				<notice v-if="actOpen=='公告管理'" v-show="i==1" />
				<chat v-if="actOpen=='消息管理'" />
				<position v-if="actOpen=='职位管理'" v-show="i==1" />
				<attesta v-if="actOpen=='企业认证'" />
				<attestaMsg v-if="actOpen=='认证管理'" />
				<introduce v-if="actOpen=='企业介绍'" />
			</view>
			<view class="top">
				<view class="top-right"><span>{{companyInfo.name}}<view class="update-pwd" @click="on=true">修改密码</view></span><span @click="handleOut">退出</span></view>
				<view class="pwd-model" v-if="on">
					<view>修改密码</view>
					<view><input type="text" placeholder="输入新密码" v-model="newpwd"></view>
					<view><button @click="handleUpdate">点击修改</button></view>
					<i @click="on=false">X</i>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import recruit from "./recruit.vue"
	import recruitList from "./recruitList.vue"
	import invite from "./invite.vue"
	import classify from "./classify.vue"
	import advert from "./advert.vue"
	import notice from "./notice.vue"
	import chat from "./chat.vue"
	import position from "./position.vue"
	import attesta from "./attesta.vue"
	import attestaMsg from "./attestaMsg.vue"
	import introduce from "./introduce.vue"
	export default{
		data(){
			return{
				mainArr:["招聘管理","添加招聘","面试邀请","广告管理","分类管理","职位管理","公告管理","消息管理","认证管理"],
				actOpen:"招聘管理",
				i:1,
				companyInfo:{},
				on:false,
				newpwd:"",
				cInfo:{}
			}
		},
		methods:{
			handleOut(){
				uni.clearStorage();
				uni.navigateTo({
					url: `/`
				});
			},
			handleChange(v){
				this.actOpen=v;
			},
			handleUpdate(){
				let _this=this;
				uni.getStorage({
				    key: 'companyInfo',
				    success: function (res) {
				        _this.cInfo=JSON.parse(res.data);
						uni.request({
						    url: `http://123.57.187.184/zpw/os/update/updatePwd.php`, 
							method:"POST",
							data:{
								 id:_this.cInfo.id,
								 pwd:_this.newpwd,
							},
						    success: (res) => {
								if(res.data==1){
									uni.showModal({
									    title: '提示',
									    content: '修改成功！',
									    success: function (res) {
									    }
									});
									_this.on=false;
									_this.newpwd="";
								}
						    }
						});
				    }
				});
			}
		},
		components:{
			recruit,
			recruitList,
			invite,
			classify,
			advert,
			notice,
			chat,
			position,
			attesta,
			attestaMsg,
			introduce
		},
		mounted() {
			let _this=this;
			_this.i=_this.$mp.query.id;
			if(_this.i==1){
				_this.mainArr=["招聘管理","添加招聘","面试邀请","广告管理","分类管理","职位管理","公告管理","消息管理","认证管理"];
			}else{
				_this.mainArr=["招聘管理","添加招聘","面试邀请","消息管理","企业认证","企业介绍"];
			}
			uni.request({
			    url: `http://123.57.187.184/zpw/os/query/queryCompany.php`, 
				 data:{
					 qid:_this.i
				 },
			    success: (res) => {
					_this.companyInfo=res.data;
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
	}
</script>

<style>
.container{
	  height:100% !important;
}
.container::before{
	content:"";
	display: table;
}
.left{
  width:200px;
  background-color:#393D49!important;
  position:fixed;
  top:0;
  left:0;
  height:100% !important;
  z-index: 10;
}
.main{
  background-color:#fff;
  width: 100%;
  position:absolute;
  top:0;
  left:200px;
  padding:80px 20px 20px;
  box-sizing: border-box;
  height:100% !important;
}
.top{
  width:100%;
  height: 60px;
  background-color:#23262E;
  position:fixed;
  top:0;
  left:0;
  padding-left: 200px;
  box-sizing: border-box;
}
.left-title{
	width: 100%;
	height: 60px;
	line-height: 60px;
	background: #23262E;
	text-align: center;
	color: #09BB07;
}
.left ul{
	padding: 0;
}
.left ul li{
	position: relative;
	list-style: none;
	width: 100%;
	height: 50px;
	line-height: 50px;
	color: #fff;
	text-align: left;
	padding:0 20px;
	box-sizing: border-box;
	transition: .5s all;
}
.left ul li i{
	transition: .5s all;
	position: absolute;
	left: 0;
	top: 0;
	width: 5px;
	height:100%;
	opacity: 0;
	background: #09BB07;
}
.left ul li:hover{
	background: #535866;
}
.left ul li:hover i{
	opacity: 1;
}
.left ul li.act{
	background: #535866;	
}
.left ul li.act i{
	opacity: 1;
}
.top-right{
	float: right;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-right: 20px;
}
.top-right span{
	height: 60px;
	line-height: 60px;
	width: 80px;
	text-align: center;
	color: #fff;
	box-sizing: border-box;
}
.top-right span:hover{
	border-bottom: 4px solid #09BB07;
}
.update-pwd{
	opacity: 0;
	position: absolute;
	right: 100px;
	top: 60px;
	width: 100px;
	height: 50px;
	color: #000000;
	border-radius: 5px;
	background: #FFFFFF;
	font-size: 14px;
	box-shadow: 0 0 5px 2px rgba(0,0,0,.1);
}
.top-right span:nth-child(1):hover .update-pwd{
	opacity: 1;
}
.update-pwd:hover{
	color: #09BB07;
}
.pwd-model{
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
	padding: 20px;
	border-radius: 5px;
	width: 300px;
	height: 100px;
	background: #FFFFFF;
	box-shadow: 0 0 5px 2px rgba(0,0,0,.1);
}
.pwd-model view:nth-child(1){
	text-align: center;
}
.pwd-model view:nth-child(2) input{
	border: 1px solid #F1F2F6;
	margin: 10px auto;
	padding: 5px 10px;
	width: 80%;
}
.pwd-model view:nth-child(3) button{
	width: 100px;
	height: 30px;
	line-height: 30px;
	font-size: 14px;
}
.pwd-model i{
	position: absolute;
	right: 12px;
	top: 5px;
	font-style: initial;
	display: inline-block;
	width: 20px;
	text-align: center;
	border: 1px solid #F1F2F6;
}
</style>
