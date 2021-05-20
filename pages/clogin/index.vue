<template>
	<view>
		<view class="bg">
			<view class="bg-madel">
				<view class="title">企业登录</view>
				<view class="phone"><input type="text" placeholder="请输入电话号码" v-model="phone"></view>
				<view class="pwd"><input type="password" value="" placeholder="请输入密码" v-model="pwd" /></view>
				<view class="code">
					<input type="text" placeholder="验证码" v-model="code" class="codes"><i class="icon-code"></i>
					<canvas canvas-id="firstCanvas" id="firstCanvas" @click="handleSetCanvas"></canvas>
				</view>
				<view class="btn"><button @click="handleClogin">登录</button></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:"",
				pwd:"",
				code:"",
				codes:"",
				img:"../../static/img/codes.png"
			}
		},
		onReady: function (e) {
		       this.handleSetCanvas()
		   },
		methods: {
			handleSetCanvas(){
				var context = uni.createCanvasContext('firstCanvas')
				this.codes=Math.round(Math.random()*10000);
				if(this.codes<=999){
					this.codes=Math.round(Math.random()*10000);
				}else{
					let a=String(this.codes).split("").join(" ");
					context.setStrokeStyle(this.color16())
					context.fillStyle="#ffffff";
					context.fillRect(0,0,100,40);
					context.fillStyle="#000000";
					context.rect(0, 0, 100, 40)
					context.font="24px Arial"
					context.fillText(a,13,28)
					context.drawImage(this.img,0,0);
					context.stroke()
					context.draw()
				}
				
			},
			color16(){//十六进制颜色随机
				var r = Math.floor(Math.random()*256);
				var g = Math.floor(Math.random()*256);
				var b = Math.floor(Math.random()*256);
				var color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
				return color;
			},
			handleClogin(){
				let _this=this;
				if(this.code==this.codes){
					uni.request({
					    url: `http://123.57.187.184/zpw/os/query/queryCompany.php`, 
						 data:{
							 phone:_this.phone,
							 pwd:_this.pwd,
							 qid:0
						 },
					    success: (res) => {
							if(res.data==""){
								uni.showModal({
								    title: '错误提示',
								    content: '请正确输入登录信息',
								});
								_this.codes=Math.round(Math.random()*10000);
								return;
							}
							if(res.data.id!==0){
								uni.navigateTo({
								    url: `/pages/os/index?id=${res.data.id}`
								});
							}
					    }
					});
				}else{
					uni.showModal({
					    title: '提示',
					    content: '验证码错误，请重新输入！',
					    success: function (res) {
					    }
					});
				}
				
			}
		}
	}
</script>

<style>
	canvas{
		display: inline-block;
		vertical-align: middle;
		margin-left: 20px;
		width: 100px;
		height: 40px;
		font-style:inherit;
		background:url(../../static/img/djsx.png);
		background-size: 100% 100%;
	}
.bg{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: url(../../static/img/bg.jpg);
	background-size: 100% 100%;
}
.bg-madel{
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	margin: auto;
	width: 500px;
	height: 350px;
	background-color: rgba(255,255,255,.8);
	border-radius: 10px;
	padding: 40px 100px;
	box-sizing: border-box;
}
.title{
	text-align: center;
	padding: 0 0 20px;
	font-size: 20px;
}
.phone input{
	padding: 8px 10px;
	width: 100%;
	height: 40px;
	line-height: 40px;
	border: 1px solid rgba(0,0,0,.3);
	box-sizing: border-box;
}
.phone{
	margin-bottom: 20px;
}
.pwd input{
	padding: 8px 10px;
	width: 100%;
	border: 1px solid rgba(0,0,0,.3);
	box-sizing: border-box;
	height: 40px;
	line-height: 40px;
}
.pwd,.code{
	margin-bottom: 20px;
}
.codes{
	width: 155px !important; 
	display: inline-block;
	vertical-align: middle;
	border: none;
	padding: 8px 10px;
	border: 1px solid rgba(0,0,0,.3);
}
</style>
