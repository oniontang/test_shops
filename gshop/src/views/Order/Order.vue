<template>
	<div class="order">
		<TopHeader title="订单列表" />
		<section class="order_no_login" v-if="!$store.state.userInfo._id">
			<img src="../../assets/img/person.png" alt="">
			<h3>登录后查看我的订单</h3>
			<button @click="$router.push('/login')">立即登录</button>
		</section>
		<section class="no_order">
			<span class="iconfont icon-meiyoudingdan-01"></span>
			<span class="no_order_item">您还没有订单哦~</span>
		</section>
	</div>
</template>

<script>
	import TopHeader from '../../components/TopHeader/TopHeader.vue'
	export default {
		components:{
			TopHeader
		}
	}
</script>

<style lang="less" scoped>
	.order{
		width: 100%;
		height: 100%;
		overflow: auto;
		.order_no_login{
			padding-top: 140px;
			width: 60%;
			margin: 0 auto;
			text-align: center;
			img{
				display: block;
				width: 100%;
				height: 30%;
			}
			h3{
				padding: 10px 0;
				font-size: 17px;
				color: #6A6A6A;
			}
			button{
				display: inline-block;
				background-color: #02A774;
				font-size: 14px;
				color: #FFFFFF;
				border: 0;
				outline: none;
				border-radius: 5px;
				padding: 10px 20px;
			}
		}
		.no_order{
			width: 80%;
			margin: 0 auto;
			margin-top: 50%;
			text-align: center;
			display: flex;
			flex-flow: column;
			color: #02A774;
			.iconfont{
				font-size: 50px;
			}
			.no_order_item{
				font-size: .7rem;
				margin-top: 1rem;
			}
		}
	}
</style>