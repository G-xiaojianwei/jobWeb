<template>
	<view >
		<view class="post-item" v-for="(item,index) in jobs" :key="index" @click="getUpdate(item.id)">
			<p><span>{{item.title}}</span><span>{{item.state == 1 ? "急聘" :''}}</span></p>
			<p><span>{{item.endPrice}}-{{item.startPrice}}元/{{item.priceTime}}</span><span>{{item.time | timeSetFun}}</span></p>
			<p><span v-for="(item,index) in tagArr(item.tag)" :key="index" v-show="item!==''">{{item}}</span></p>
			<p>{{item.enterprise}}<span>{{item.aut == 1 ? "认证" :""}}</span></p>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:["jobs"],
		methods:{
			getUpdate(i){
				this.$emit("childFun",i);
			},
			tagArr(tag){
				return tag.split("/").slice(0,4);
			}
		},
		computed:{
			
		},
		filters:{
			timeSetFun(t){
				var timestamp = (Date.parse(new Date()))/1000;//计算当前时间戳 (毫秒级)
				 var date1 =timestamp; //开始时间
				var date2 = Number(t); //结束时间
				// var date3 = date2.getTime() - date1.getTime(); //时间差的毫秒数
				var date3 =  (date1-date2)*1000; //时间差的毫秒数
				//计算出相差天数
				var days = Math.floor(date3 / (24 * 3600 * 1000));
				//计算出小时数
				var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
				var hours = Math.floor(leave1 / (3600 * 1000));
				//计算相差分钟数
				var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
				var minutes = Math.floor(leave2 / (60 * 1000));
				//计算相差秒数
				var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
				var seconds = Math.round(leave3 / 1000);
				if(days==0){
					if(hours==0){
						if(minutes==0){
							return seconds+'秒前'
						}else{
							return minutes+"分钟前"
						}
					}else{
						return hours+'小时前'
					}
				}else{
					return days+"天前"
				}
			}
		}
	}
</script>

<style>
	 .post-item{
		width: 100%;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #eee;
	}
	 .post-item:last-child{
		border-bottom: none;
	}
	 .post-item p{
		display: flex;
		align-items: center;
		justify-content: center;
		margin:20rpx 0rpx;
	}
	 .post-item p span:nth-child(1){
		flex: 8;
	}
	 .post-item p:nth-child(1) span:nth-child(1){
		font-weight: bold;
	}
	 .post-item p:nth-child(2) span:nth-child(1){
		font-size: 28rpx;
		color: red;
	}
	 .post-item p span:nth-child(2){
		flex: 2;
		text-align: right;
		font-size: 24rpx;
		color: #666;
	}
	 .post-item p:nth-child(3), .post-item p:nth-child(4){
		display: block;
	}
	 .post-item p:nth-child(3) span{
		color: #666;
		font-size: 24rpx;
		text-align: left;
		padding:5rpx 10rpx;
		margin-right: 10rpx;
		background: #eee;
	}
	 .post-item p:nth-child(4){
		font-size: 28rpx;
	}
	 .post-item p:nth-child(4) span{
		padding:2rpx 10rpx;
		margin-left: 10rpx;
		color: #ac6f09;
		background:rgba(240,173,61,.5);
		font-size: 24rpx;
	}
</style>
