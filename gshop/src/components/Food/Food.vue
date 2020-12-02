<template>
	<transition name='fade'>
		<div class="s_food" v-if="isShow">
			<div class="food_content">
				<div class="image_header">
					<img v-lazy="food.image">
					<p class="foodpanel_desc">{{food.info}}</p>
					<div class="back">
						<i class="iconfont icon-ai207 icon-arrow_left" @click="toggleIsShow"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell_count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol_wrapper">
						<CartControl :food="food"/>
					</div>
				</div>
			</div>
			<div class="food_cover" @click="toggleIsShow"></div>
		</div>
	</transition>
</template>

<script>
	import CartControl from '../CartControl/CartControl.vue'
	export default {
		data() {
			return {
				isShow: false
			}
		},
		props: {
			food: Object
		},
		methods: {
			toggleIsShow() {
				this.isShow = !this.isShow
			}
		},
		components: {
			CartControl
		}
	}
</script>

<style lang="less" scoped>
	.s_food {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 50px;
		z-index: 101;
		width: 100%;
		.food_content{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 80%;
			height: 65%;
			z-index: 66;
			background-color: #FFFFFF;
			border-radius: 5px;
			.image_header{
				position: relative;
				width: 100%;
				height: 0;
				padding-top: 100%;
				img{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
				.foodpanel_desc{
					font-size: 10px;
					color: #DDDDDD;
					letter-spacing: 0;
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					padding: 0 10px 10px;
				}
				.back{
					position: absolute;
					top: 10px;
					left: 0;
					.icon-arrow_left{
						display: block;
						padding: 10px;
						font-size: 20px;
						color: #FFFFFF;
					}
				}
			}
			.content{
				position: relative;
				padding: 18px;
				.title{
					line-height: 14px;
					margin-bottom: 8px;
					font-size: 14px;
					font-weight: 700;
					color: #07111B;
				}
				.detail{
					margin-bottom: 18px;
					line-height: 10px;
					height: 10px;
					font-size: 0;
					.sell_count,
					.rating{
						font-size: 10px;
						color: #93999F;
					}
					.sell_count{
						margin-right: 12px;
					}
				}
				.pirce{
					font-weight: 700;
					line-height: 24px;
					.new{
						margin-right: 8px;
						font-size: 14px;
						color: #F01414;
					}
					.old{
						text-decoration: line-through;
						font-size: 10px;
						color: #93999F;
					}
				}
				.cartcontrol_wrapper{
					position: absolute;
					right: 12px;
					bottom: 12px;
				}
				.buy{
					position: absolute;
					position: absolute;
					right: 18px;
					bottom: 18px;
					z-index: 10;
					height: 24px;
					line-height: 24px;
					padding: 0 12px;
					box-sizing: border-box;
					border-radius: 12px;
					font-size: 10px;
					color: #FFFFFF;
					background: #00A0DC;
				}
			}
		}
		.food_cover{
			position: absolute;
			top: 0;
			right: 0;
			bottom: -48px;
			left: 0;
			z-index: 55;
			background-color: rgba(0,0,0,.5);
		}
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: .5s;
		opacity: 0;
	}
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>
