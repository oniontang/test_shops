<template>
	<div class="search">
		<TopHeader title="搜索" />
		<div class="search_form">
			<input type="search" class="search_input" placeholder="请输入需要搜索的内容">
			<input type="submit" class="search_submit">
		</div>
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
	.search{
		width: 100%;
		height: 100%;
		overflow: auto;
		.header{
			background-color: #02A774;
			position: fixed;
			z-index: 100;
			width: 100%;
			height: 45px;
			left: 0;
			top: 0;
			.header_title{
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 50%;
				text-align: center;
				.header_title_text{
					font-size: 20px;
					color: #FFFFFF;
					display: block;
				}
			}
		}
		.search_form{
			margin-top: 45px;
			background-color: #FFFFFF;
			padding: 8px;
			display: flex;
			justify-content: space-between;
			input{
				height: 35px;
				padding: 0 4px;
				border-radius: 2px;
				font-weight: bold;
				outline: none;
			}
			.search_input{
				width: 80%;
				border: 4px solid #F2F2F2;
				font-size: 14px;
				color: #333333;
				background-color: #F2F2F2;
			}
			.search_submit{
				width: 18%;
				border: 4px solid #02A774;
				font-size: 16px;
				color: #FFFFFF;
				background-color: #02A774;
			}
		}
	}
</style>