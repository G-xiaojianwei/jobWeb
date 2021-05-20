<template>
	<!-- 招聘信息 -->
	<view>
		<view class="container">
			<view class="title">招聘信息录入</view>
			<view class="cont">
				<view>岗位名称</view>
				<view><input type="text" placeholder="请输入岗位名称" v-model="sname"></view>
			</view>
			<view class="cont">
				<view>计薪方式</view>
				<view>
					<select v-model="priceA" id="">
						<option :value="item" v-for="(item,index) in priceArr" :key="index">{{item}}</option>
					</select>
				</view>
			</view>
			<view class="cont">
				<view>最低薪资</view>
				<view><input type="text" placeholder="例:1000" v-model="endPrice"></view>
			</view>
			<view class="cont">
				<view>最高薪资</view>
				<view>
					<input type="text" placeholder="例:6000" v-model="startPrice">
				</view>
			</view>
			<view class="cont">
				<view>招聘人数</view>
				<view><input type="text" placeholder="例:10" v-model="num"></view>
			</view>
			<view class="cont">
				<view>公司地址</view>
				<view>
					<select v-model="area">
						<option :value="item.name" v-for="(item,index) in jobsAreaArr" :key="index">{{item.name}}</option>
					</select>
					<input class="company" type="text" placeholder="请输入详细地址" v-model="local">
				</view>
			</view>
			<view class="cont">
				<view>联系人</view>
				<view><input type="text" placeholder="请输入姓名" v-model="phoneName"></view>
			</view>
			<view class="cont">
				<view>联系电话</view>
				<view><input type="text" placeholder="请输入联系电话" v-model="phone"></view>
			</view>
			<view class="cont">
				<view>福利待遇</view>
				<view><span class="welfare" v-for="(item,index) in welfareArr"><checkbox name="reading" @click="handleChangeCheckbox(index)" v-if="item.name!=='不限'" />{{item.name!=='不限'?item.name:''}}</span></view>
			</view>
			<view class="cont">
				<view>工资年限</view>
				<view>
					<select v-model="workTime" id="">
						<option :value="item.name" v-for="(item,index) in JobTimeArr" :key="index">{{item.name}}</option>
					</select>
				</view>
			</view>
			<view class="cont">
				<view>学历要求</view>
				<view>
					<select v-model="edu" id="">
						<option :value="item.name" v-for="(item,index) in EduArr" :key="index">{{item.name}}</option>
					</select>
				</view>
			</view>
			<view class="cont">
				<view>职位类别</view>
				<view>
					<select v-model="left" id="">
						<option :value="item.name" v-for="(item,index) in postClassLeft" :key="index">{{item.name}}</option>
					</select>
					<select v-model="right" id="">
						<option :value="item.name" v-for="(item,index) in postClassRight" :key="index">{{item.name}}</option>
					</select>
				</view>
			</view>
			<view class="cont">
				<view>是否急聘</view>
				<view>
					<select v-model="state" id="">
					  <option value="0">否</option>
					  <option value="1">是</option>
					</select>
				</view>
			</view>
			<view class="cont">
				<view>岗位要求</view>
				<view>
					<editor id="editor" class="ql-container" :placeholder="placeholder" @ready="onEditorReady" v-model="editorVal"></editor>
				</view>
			</view>
			<button @click="handleActionA">提交</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				dd:"",
				placeholder: `1、负责……
2、负责……
3、负责……`,
				editorVal:"",
				sname:"",//招聘岗位
				// enterprise:"",//公司名称
				endPrice:"",//最低薪资
				startPrice:"",//最高薪资
				cont:"",//岗位要求
				local:"",//地址
				phone:"",//联系电话
				phoneName:"",//联系人
				state:"0",//是否急聘
				workTime:"不限",//工作年龄
				edu:"不限",//学历
				left:"市场销售",//职位类别1
				right:"销售经理",//职位类别2
				area:"万州区",//工作地区，
				priceA:"月",//计新方式
				num:"",//招聘人数
				welfareArr:[],
				JobTimeArr:[],
				EduArr:[],
				postClassArr:[],
				postClassLeft:[],
				postClassRight:[],
				jobsAreaArr:[],
				priceArr:["年","月","日","小时"],
				companyInfo:{}
			}
		},
		methods:{
			onEditorReady() {
				// #ifdef MP-BAIDU
				this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editorId');
				// #endif

				// #ifdef APP-PLUS || H5 ||MP-WEIXIN
				uni.createSelectorQuery().select('#editor').context((res) => {
				  this.editorCtx = res.context
				}).exec()
				// #endif
			},
			handleChangeCheckbox(i){
				this.welfareArr[i].checkboxed=!this.welfareArr[i].checkboxed;
			},
			handleActionA(){
				let _this=this;
				if(_this.companyInfo.aut!=="1"){
					uni.showModal({
						title: '提示',
						content: '您还未认证，请先企业认证！',
						success: function (res) {
							uni.navigateTo({
								url: `/pages/os/index?id=${_this.companyInfo.id}`
							});
						}
					});
					return;
				}
				let editorVal=this.editorVal.mp.detail.text;
				let _tag="";
				this.welfareArr.filter(item=>{
					if(item.checkboxed==true){
						_tag+=item.name+"/";
					}
				})
				let _tags=_tag.substring(0,_tag.length-1);
				uni.request({
				  method: 'POST',
				  url: 'http://123.57.187.184/zpw/os/add/addRecruit.php',
				  data: {
				    qid:_this.companyInfo.id,
				    sname:_this.sname,
				    state:_this.state,
				    startPrice:_this.startPrice,
				    endPrice:_this.endPrice,
				    phone:_this.phone,
				    tag: _tags,
					cont:editorVal,
				    enterprise:_this.companyInfo.name,
				    local:_this.local,
				    area:_this.area,
				    workTime:_this.workTime,
				    classify:_this.left,
				    classifyChild:_this.right,
				    edu:_this.edu,
				    phoneName:_this.phoneName,
					priceTime:_this.priceA,
					num:_this.num
				  },
				  success(res) {
					  if(res.data==200){
						  uni.showToast({
						      title: '创建成功',
						      duration: 2000
						  });
					  }
				  }
				})
			}
		},
		watch:{
			left:function(i){
				let items=this.postClassLeft.filter(item=>item.name==i);
				this.postClassRight=this.postClassArr.filter(item=>item.sid==items[0].id);
				this.right=this.postClassRight[0].name;
			}
		},
		mounted() {
			let _this=this;
			//福利待遇
			uni.request({
				url: `http://123.57.187.184/zpw/php/query/queryWelfare.php`, 
				success: (res) => {
					_this.welfareArr=res.data;
					for(let i=0;i<_this.welfareArr.length;i++){
						_this.welfareArr[i].checkboxed=false;
					}
				}
			});
			  // 工龄
			  uni.request({
			  	url: `http://123.57.187.184/zpw/php/query/queryJobTime.php`, 
			  	success: (res) => {
			  		_this.JobTimeArr=res.data;
			  	}
			  });
			  // 学历要求
			  uni.request({
			  	url: `http://123.57.187.184/zpw/php/query/queryEdu.php`, 
			  	success: (res) => {
			  		_this.EduArr=res.data;
			  	}
			  });

			  // 职位类别
			  uni.request({
			  	url: `http://123.57.187.184/zpw/php/query/queryPostClass.php`, 
			  	success: (res) => {
			  		_this.postClassArr=res.data;
			  		_this.postClassLeft=_this.postClassArr.filter(item=>item.sid==0);
			  		_this.postClassRight=_this.postClassArr.filter(item=>item.sid==1);
			  	}
			  });
			  // 学历要求
			  uni.request({
			  	url: `http://123.57.187.184/zpw/php/query/queryJobsArea.php`, 
			  	success: (res) => {
			  		 _this.jobsAreaArr=res.data;
			  	}
			  });
			  uni.getStorage({
			  	key: 'companyInfo',
			  	success: function (res) {
			  		_this.companyInfo=JSON.parse(res.data);
					if(_this.companyInfo.aut!=="1"){
						console.log(_this.companyInfo)
						uni.showModal({
						    title: '提示',
						    content: '您还未认证，请先企业认证！',
						    success: function (res) {
								uni.navigateTo({
									url: `/pages/os/index?id=${_this.companyInfo.id}`
								});
							}
						});
						
						
					}
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
	font-size: 20px;
}
.cont{
	display: flex;
	width: 100%;
	margin-bottom: 20px;
}
.cont view:nth-child(1){
	width: 10%;
	display: inline-block;
	padding: 10px;
}
.cont view:nth-child(2){
	width: 90%;
}
.cont view:nth-child(2) input{
	border: 1px solid #F1F2F6;
	padding: 10px;
}
.cont view:nth-child(2) select{
	width: 100px;
	padding: 12px;
	border: 1px solid #F1F2F6;
	margin-right: 10px;
}
.company{
	display: inline-block;
	vertical-align: middle;
	width: 713px;
}
.welfare{
	display: inline-block;
	margin-right: 10px;
	margin-top: 10px;
	font-size: 14px;
}
editor{
	border: 1px solid #F1F2F6;
	padding: 0 10px;
}
button{
	width: 20%;
}
</style>
