<template>
	<div class="header">
		<slot name="search"></slot>
		<span class="header_title">
			<span class="header_title_text ellipsis">{{title}}</span>
		</span>
		<slot name="login"></slot>
	</div>
</template>

<script>
	export default {
		props:{
			title: String
		}
	}
</script>

<style lang="less" scoped>
	.header{
		background-color: #02A774;
		position: fixed;
		z-index: 100;
		width: 100%;
		height: 45px;
		left: 0;
		top: 0;
		.header_search{
			position: absolute;
			left: 15px;
			top: 50%;
			transform: translateY(-50%);
			width: 10%;
			height: 50%;
			.icon-iconfind{
				font-size: 25px;
				color: #FFFFFF;
			}
		}
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
		.header_login{
			font-size: 14px;
			color: #FFFFFF;
			position: absolute;
			right: 15px;
			top: 50%;
			transform: translateY(-50%);
			.header_login_text{
				color: #FFFFFF;
			}
		}
	}
</style>