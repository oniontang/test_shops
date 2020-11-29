<template>
	<div class="star" :class="'star-'+size">
		<span class="star_item" v-for="(sc,index) in starClass" :class="sc" :key='index'></span>
	</div>
</template>

<script>
	const CLASS_ON = 'on'
	const CLASS_HALF = 'half'
	const CLASS_OFF = 'off'
	export default {
		props:{ //父子组件之间数据传输
			score: Number,
			size: Number
		},
		computed:{
			starClass(){
				const {score} = this
				const scs = []
				// 在数组scs里面添加多个‘on’
				// Math.floor()向下取整
				const scoreInt = Math.floor(score)
				for(let i = 0; i<scoreInt; i++ ){
					scs.push(CLASS_ON)
				}
				// 在数组scs中添加0-1个‘half’
				if((score-scoreInt)*10>=5){
					scs.push(CLASS_HALF)
				}
				// 在数组scs中添加n个‘off’
				while(scs.length<5){
					scs.push(CLASS_OFF)
				}
				return scs
			}
		}
	}
</script>

<style lang="less" scoped>
	// less变量设置，通过媒介查询判断使用2倍图还是3倍图
	.bg-image(@url){
		background-image: ~"url(@{url}_2x.png)";
		@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
			background-image: ~"url(@{url}_3x.png)";
		}
	}
	.star{
		float: left;
		font-size: 0;
		.star_item{
			display: inline-block;
			background-repeat: no-repeat;
		}
	}
	.star-48{
		.star_item{
			width: 20px;
			height: 20px;
			margin-right: 22px;
			background-size: 20px 20px;
			&:last-child{
				margin-right: 0;
			}
		}
		.on{
			.bg-image('../../assets/img/star/star48_on');
		}
		.half{
			.bg-image('../../assets/img/star/star48_half');
		}
		.off{
			.bg-image('../../assets/img/star/star48_off');
		}
	}
	.star-36{
		.star_item{
			width: 15px;
			height: 15px;
			margin-right: 6px;
			background-size: 15px 15px;
			&:last-child{
				margin-right: 0;
			}
		}
		.on{
			.bg-image('../../assets/img/star/star36_on');
		}
		.half{
			.bg-image('../../assets/img/star/star36_half');
		}
		.off{
			.bg-image('../../assets/img/star/star36_off');
		}
	}
	.star-24{
		.star_item{
			width: 10px;
			height: 10px;
			margin-right: 3px;
			background-size: 10px 10px;
			&:last-child{
				margin-right: 0;
			}
		}
		.on{
			.bg-image('../../assets/img/star/star24_on');
		}
		.half{
			.bg-image('../../assets/img/star/star24_half');
		}
		.off{
			.bg-image('../../assets/img/star/star24_off');
		}
	}
</style>