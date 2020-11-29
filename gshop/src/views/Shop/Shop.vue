<template>
	<div class="shop">
		<ShopHeader/>
		<div class="tab">
			<div class="tab_item">
				<router-link class="tab_item_text" replace to="/shop/goods">点餐</router-link>
				<router-link class="tab_item_text" replace to="/shop/ratings">评价</router-link>
				<router-link class="tab_item_text" replace to="/shop/info">商家</router-link>
			</div>
		</div>
		<router-view />
	</div>
</template>

<script>
	import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'
	export default {
		mounted() {
			this.$store.dispatch('getShopInfo')
		},
		components:{
			ShopHeader
		}
	}
</script>

<style lang="less" scoped>
	.shop{
		width: 100%;
		.tab{
			margin-top: 6.25rem;
			.tab_item{
				width: 80%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				.tab_item_text{
					flex: 1;
					font-size: 14px;
					text-align: center;
					padding-bottom: 5px;
					color: #4d555d;
				}
				.router-link-active{
					color: #EE9900;
					border-bottom: 3px solid #EE9900;
				}
			}
		}
	}
</style>