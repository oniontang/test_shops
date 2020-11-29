<template>
	<div class="shop_header">
		<nav class="shop_header_top">
			<img class="top_img" :src="info.bgImg" alt="">
			<span class="return_index" @click="$router.back()"><i class="iconfont icon-ai207"></i></span>
		</nav>
		<div class="shop_header_title">
			<div class="shop_img">
				<img :src="info.avatar" alt="">
			</div>
			<div class="shop_info_msg">
				<h3 class="msg_title">{{info.name}}</h3>
				<div class="msg_info">
					<span class="shop_detail">{{info.score}}分</span>
					<span class="shop_detail">{{info.description}}</span>
					<span class="shop_detail">配送约{{info.deliveryTime}}分钟</span>
					<span class="shop_detail">距离约{{info.distance}}</span>
				</div>
				<div class="msg_info prefer" v-if="info.supports">
					<span class="teb" :class="tebClass[info.supports[0].type]">{{info.supports[0].name}}</span>
					<span class="shop_detail">{{info.supports[0].content}}</span>
					<span class="shop_detail" @click="showPrefer = true">
						{{info.supports.length}}条优惠
						<i class="iconfont icon-xiala"></i>
					</span>
				</div>
				<van-action-sheet v-model="showPrefer" title="店铺优惠信息" :overlay="false" @click="showPrefer=false">
					<div class="prefer overlay" v-for="(supports, index) in info.supports" :key="index">
						<span class="teb" :class="tebClass[supports.type]">{{supports.name}}</span>
						<span class="shop_detail">{{supports.content}}</span>
					</div>
				</van-action-sheet>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import {ActionSheet} from 'vant'
	export default {
		data(){
			return{
				tebClass: ['teb_green','teb_orange','teb_red'],
				showPrefer: false
			}
		},
		computed:{
			...mapState(['info'])
		}
	}
</script>

<style lang="less" scoped>
	.shop_header{
		width: 100%;
		.shop_header_top{
			width: 100%;
			height: 120px;
			position: relative;
			.top_img{
				width: 100%;
				height: 100%;
				filter: blur(5px);
			}
			.return_index{
				position: absolute;
				top: 2.5rem;
				left: 30px;
				z-index: 9999;
				.iconfont{
					font-size: 30px;
					color: #FFFFFF;
				}
			}
		}
		.shop_header_title{
			width: 100%;
			position: absolute;
			top: 60px;
			.shop_img{
				width: 90px;
				height: 90px;
				margin-left: 50%;
				transform: translateX(-50%);
				img{
					width: 100%;
					height: 100%;
					border-radius: 0.5rem;
				}
			}
			.shop_info_msg{
				width: 100%;
				text-align: center;
				.msg_title{
					font-size: 1.1rem;
					line-height: 1.5rem;
					font-weight: bold;
				}
				.msg_info{
					font-size: .8rem;
					line-height: 1rem;
					color: #999999;
				}
				.shop_detail{
					padding: 0 5px;
					.icon-xiala{
						font-size: 12px;
					}
				}
				.prefer{
					display: flex;
					padding: 0 15px;
					// justify-content: space-between;
					.teb{
						font-size: 10px;
						color: #FFF;
						padding: 0 3px;
						border-radius: 2px;
					}
					.teb_green{
						background-color: #02A774;
					}
					.teb_red{
						background-color: #CC3333;
					}
					.teb_orange{
						background-color: #FF9900;
					}
				}
				.overlay{
					font-size: .8rem;
					padding: 5px;
				}
			}
		}
		.van-action-sheet{
			padding-bottom: 20px;
		}
	}
</style>