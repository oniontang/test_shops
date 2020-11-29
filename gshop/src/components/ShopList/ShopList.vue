<template>
	<div class="shop_container">
		<ul class="shop_list" v-if="shops.length">
			<li class="shop_li" v-for="(shop, index) in shops" :key="index" @click="$router.push('./shop')">
				<div class="shop_left">
					<img class="shop_img" src="../../assets/img/food.jpg" alt="">
				</div>
				<div class="shop_right">
					<section class="shop_detail_title">
						<h4 class="shop_title ellipsis">{{shop.name}}</h4>
						<ul class="shop_detail_ul">
							<li class="supports" v-for="(support,index) in shop.supports" :key="index">
								{{support.icon_name}}
							</li>
						</ul>
					</section>
					<section class="shop_rating_order">
						<section class="shop_rating_order_left">
							<div class="rating_section">
								<!-- <van-rate v-model="shop.rating" color="#ffd21e" :size="15" allow-half void-icon="star"/> -->
								<Star :score="shop.rating" :size="24"/>
								<span>{{shop.rating}}</span>
							</div>
							<div class="order_section">月售{{shop.recent_order_num}}单</div>
						</section>
						<section class="shop_rating_order_right">
							<span class="delivery_style delivery_right">{{shop.delivery_mode.text}}</span>
						</section>
					</section>
					<section class="shop_distance">
						<span class="shop_delivery_msg">
							<span>满{{shop.float_minimum_order_amount}}起送</span>
							<span class="segmentation"> / </span>
							<span>{{shop.piecewise_agent_fee.tips}}</span>
							<span class="distance">距离{{shop.distance}}</span>
						</span>
					</section>
				</div>
			</li>
		</ul>
		<ul v-else>
			<li v-for="(item,index) in 6" :key="index">
				<img src="../../assets/img/shop_back.svg" alt="">
			</li>
		</ul>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import Star from '../Star/Star.vue'
	export default {
		data(){
			return{
				shopImgUrl: 'http://owoccema2.bkt.clouddn.com/show/MintShop/'
			}
		},
		computed:{
			...mapState(['shops'])
		},
		components:{
			Star
		}
	}
</script>

<style lang="less" scoped>
	.shop_container{
		margin-bottom: 50px;
		.shop_li {
			border-bottom: 1px solid #E4E4E4;
			width: 100%;
			display: flex;
			box-sizing: border-box;
			padding: 5px;
			.shop_left {
				box-sizing: border-box;
				width: 90px;
				height: 80px;
				padding-right: 10px;
				.shop_img {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
			.shop_right {
				width: calc(100% - 110px);
				.shop_detail_title {
					width: 100%;
					display: flex;
					.shop_title {
						width: 73%;
						color: #333333;
						font-size: 16px;
						line-height: 16px;
						font-weight: 700;
					}
					.shop_title::before {
						content: '品牌';
						display: inline-block;
						font-size: 11px;
						line-height: 11px;
						color: #333333;
						background-color: #FFD930;
						padding: 2px;
						border-radius: 2px;
						margin-right: 5px;
					}
					.shop_detail_ul {
						margin-top: 3px;
						width: 25%;
						display: flex;
						.supports {
							font-size: 10px;
							color: #999999;
							border: 1px solid #F1F1F1;
							padding: 0 2px;
							border-radius: 2px;
							letter-spacing: 4px;
							text-align: center;
						}
					}
				}
				.shop_rating_order {
					width: 100%;
					margin-top: 15px;
					margin-bottom: 15px;
					display: flex;
					.shop_rating_order_left {
						color: #FF9A0D;
						width: 75%;
						display: flex;
						.rating_section {
							font-size: 15px;
							color: #FF6000;
							margin-left: 4px;
						}
						.order_section {
							font-size: 10px;
							color: #666666;
							transform: scale(0.8);
						}
					}
					.shop_rating_order_right {
						font-size: 0;
						.delivery_style {
							transform-origin: 35px 0;
							transform: scale(.7);
							display: inline-block;
							font-size: 12px;
							padding: 1px;
							border-radius: 2px;
						}
						.delivery_left {
							color: #FFFFFF;
							margin-right: -10px;
							background-color: #02A774;
							border: 1px solid #02A774;
						}
						.delivery_right {
							color: #02A774;
							border: 1px solid #02A774;
						}
					}
				}
				.shop_distance {
					width: 100%;
					font-size: 13px;
					.shop_delivery_msg {
						transform-origin: 0;
						transform: scale(.9);
						color: #666666;
					}
					.segmentation {
						color: #CCCCCC;
					}
					.distance{
						float: right;
					}
				}
			}
		}
	}
</style>
