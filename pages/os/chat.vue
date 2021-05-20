<template>
	<view>
		<view class="container">
			<view class="title">消息列表</view>
			<view class="cont">
				<view class="cont-item"><span>岗位名称</span><span>咨询人</span><span>咨询内容</span><span>咨询时间</span><span>操作</span></view>
				<view class="cont-item" v-for="(item,index) in chatArr"><span>{{item.title}}</span><span>{{item.name}}</span><span>{{item.cont}}</span><span>{{timeTrans(item.time)}}</span><span @click="handleHun(item)">回复</span></view>
			</view>
			<view class="cont-model" v-if="offchat">
				<view class="model">
					<view class="title">消息框 <i class="offGo" @click="handleOff">关闭</i></view>
					<view class="model-cont">
						<view v-for="(item,index) in chatSArr">
							<p class="time-c">{{timeTrans(item.time)}}</p>
							<p class="namep" :style="item.uc==1?'':'text-align:right;'"><span :class="item.uc==1?'nameleft':'nameright'">{{item.uc==1?item.name:item.phoneName}}</span><span class="namecont">{{item.cont}}</span></p>
						</view>
					</view>
					<view class="input-cont">
						<span><input type="text" v-model="chat"></span><span><button @click="handleAddInfo">发送</button></span>
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
				chatArr:[],
				offchat:false,
				chatSArr:[],
				chat:"",
				chatItem:{},
				load:""
			}
		},
		methods:{
			handleOff(){
				this.load="";
				this.offchat=false;
			},
			handleHun(v){
				this.offchat=true;
				this.chatItem=v;
				this.load=1;
				let _this=this;
				uni.request({
				    url: `http://123.57.187.184/zpw/php/query/queryChat.php`, 
					 data:{
						 jid:_this.chatItem.jid,
						 uid:_this.chatItem.uid,
						 cid:_this.chatItem.cid
					 },
				    success: (res) => {
						_this.chatSArr=res.data;
				    }
				});
				let load=setInterval(function(){
					uni.request({
					    url: `http://123.57.187.184/zpw/php/query/queryChat.php`, 
						 data:{
							 jid:_this.chatItem.jid,
							 uid:_this.chatItem.uid,
							 cid:_this.chatItem.cid
						 },
					    success: (res) => {
							_this.chatSArr=res.data;
					    }
					});
					console.log(_this.load)
					if(_this.load!==1){
						clearTimeout(load);
					}
				},10000)
			},
			timeTrans(date){
			    var date = new Date(date*1000);
			    var Y = date.getFullYear() + '-';
			    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
			    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
			    return Y+M+D+h+m+s;
			},
			handleAddInfo(){
				let _this=this;
				if(_this.chat!==""){
					uni.request({
					    url: `http://123.57.187.184/zpw/php/add/addChat.php`, 
						method:"POST",
						data:{
							 jid:_this.chatSArr[0].jid,
							 uid:_this.chatSArr[0].uid,
							 cid:_this.chatSArr[0].cid,
							 name:_this.chatSArr[0].name,
							 cname:_this.chatSArr[0].cname,
							 phoneName:_this.chatSArr[0].phoneName,
							 title:_this.chatSArr[0].title,
							 cont:_this.chat,
							 uc:0
						 },
					    success: (res) => {
							_this.chatSArr=res.data;
							_this.chat="";
					    }
					});
				}
			},
			handleScreen(v,ide){
				let items=[];
				let datas=v;
				for(let j=0;j<datas.length;j++){
					let ids=datas[j][ide];
					if(items[ids]==undefined){
						items[ids]=[];
						items[ids].push(datas[j]);
					}else if(items[ids][0][ide]==ids){
						items[ids].push(datas[j]);
					}
				}
				return items;
			}
		},
		mounted() {
			let _this=this;
			uni.getStorage({
				key: 'companyInfo',
				success: function (res) {
					_this.companyInfo=JSON.parse(res.data);
				}
			});
			let arrC=[];
			uni.request({
			    url: `http://123.57.187.184/zpw/os/query/queryChatItem.php`, 
				 data:{
					 cid:_this.companyInfo.id
				 },
			    success: (res) => {
					let datas=res.data;
					// _this.chatArr=res.data;
					//先晒选出对话的岗位
					let arrAll={};
					let arr=_this.handleScreen(datas,"jid");
					arr.filter((item,i)=>{
						let items=_this.handleScreen(item,"uid")
						arrAll[i]=items;
					})
					for(let i in arrAll) {
						for(let j in arrAll[i]){
							_this.chatArr.push(arrAll[i][j][arrAll[i][j].length-1]);
						}
					}
			    }
			});
		},
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
	.cont-item span:nth-child(3){
		max-width: 200px;
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
.cont-model{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.7);
	z-index: 100;
}
.model{
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 800px;
	height: 600px;
	background: #fff;
}
.model .title{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	background: #F1F2F6;
}
.model .input-cont{
	display: flex;
	align-items: center;
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 80px;
	padding:10px 40px;
	box-sizing: border-box;
	background: #fff;
}
.input-cont span{
	flex: 8;
	height: 70%;
}
.input-cont span input{
	width: 100%;
	height: 100%;
	border: 1rpx solid #F1F2F6;
}
.input-cont span:last-child{
	flex: 2;
}
.input-cont span:last-child button{
	height: 100%;
	width: 100%;
	margin-left: 10px;
}
.model .model-cont{
	height: 100%;
	padding:60px 40px 90px;
	box-sizing: border-box;
	overflow-y: scroll;
}
.namep{
	padding: 10px 0;
}
.time-c{
		text-align: center;
		padding: 20px 0;
	}
.namep .nameleft{
	margin-right: 10px;
}
.nameright{
	float: right;
	margin-left: 10px;
}
.namecont{
	padding: 20px;
	background: #F1F2F6;
	border-radius: 10px;
}
.offGo{
	position:absolute;
	right: 20px;
}
</style>
