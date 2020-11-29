<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="iconfont icon-jianhao" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
		</transition>
		<div class="cart_count" v-if="food.count">{{food.count}}</div>
		<div class="iconfont icon-jiahao" @click.stop="updateFoodCount(true)"></div>
	</div>
</template>

<script>
	export default {
		props:{
			food: Object
		},
		methods:{
			updateFoodCount(isAdd) {
				this.$store.dispatch('updateFoodCount', {isAdd, food: this.food})
			}
		}
	}
</script>

<style lang="less" scoped>
	.cartcontrol{
		font-size: 0;
		.icon-jianhao{
			display: inline-block;
			padding: 5px;
			line-height: 20px;
			font-size: 20px;
			color: #02A774;
		}
		.cart_count{
			display: inline-block;
			vertical-align: top;
			width: 12px;
			padding-top: 6px;
			line-height: 24px;
			text-align: center;
			font-size: 10px;
			color: rgb(147, 153, 159);
		}
		.icon-jiahao{
			display: inline-block;
			padding: 5px;
			line-height: 20px;
			color: #02A774;
			font-size: 20px;
		}
		.move-enter-active,&.move-leave-active{
			transition: all .3s;
		}
		.move-enter, .move-leave-to{
			opacity: 0;
			transform: translateX(15px) rotate(180deg);
		}
	}
</style>