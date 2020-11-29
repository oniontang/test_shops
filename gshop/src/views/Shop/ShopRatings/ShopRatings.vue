<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{info.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{info.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<Star :score="info.serviceScore" :size="36" />
						<span class="score">{{info.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<Star :score="info.foodScore" :size="36" />
						<span class="score">{{info.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{info.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<div class="split"></div>
			<div class="ratingselect">
				<div class="rating-type border-1px">
					<span class="block positive" :class="{active: selectType==2}" @click="setSelectType(2)">
						全部<span class="count">{{ratings.length}}</span>
					</span>
					<span class="block positive" :class="{active: selectType==0}" @click="setSelectType(0)">
						满意<span class="count">{{positiveSize}}</span>
					</span>
					<span class="block negative" :class="{active: selectType==1}" @click="setSelectType(1)">
						不满意<span class="count">{{ratings.length-positiveSize}}</span>
					</span>
				</div>
				<div class="switch" :class="{on: onlyShowText}" @click="toggleOnlyShowText">
					<span class="iconfont icon-xuanzhong"></span>
					<span class="text">只看有内容的评价</span>
				</div>
			</div>
			<div class="rating-wrapper">
				<ul>
					<li class="rating-item" v-for="(rating,index) in filterRatings" :key="index">
						<div class="avatar">
							<img width="28" height="28" :src="rating.avatar" />
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<Star :score="rating.score" :size="24" />
								<span class="delivery">送达时间{{rating.deliveryTime||'0'}}分钟</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend">
								<span class="iconfont" :class="rating.rateType? 'icon-thumb_up' : 'icon-thumb_down'"></span>
								<span class="item" v-for="(recommend,index) in rating.recommends" :key="index">
									{{recommend}}
								</span>
							</div>
							<div class="time">{{rating.rateTime | date-format}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import {
		mapState,
		mapGetters
	} from 'vuex'
	import Star from '../../../components/Star/Star.vue'
	export default {
		data() {
			return {
				onlyShowText: true, // 是否只显示有内容的
				selectType: 2, // 选择的评价类型：0-满意，1-不满意，2-全部
			}
		},
		mounted() {
			this.$store.dispatch('getShopRatings', () => {
				this.$nextTick(() => {
					new BScroll(this.$refs.ratings, {
						click: true
					})
				})
			})
		},
		computed: {
			...mapState(['info', 'ratings']),
			...mapGetters(['positiveSize']),
			filterRatings() { // 评论分类过滤
				// 得到相关数据
				const {
					ratings,
					onlyShowText,
					selectType
				} = this
				// 产生一个新数组
				return ratings.filter(rating => {
					const {
						rateType,
						text
					} = rating
					/*
					  条件1. 
					    selectType: 0/1/2
					    rateType: 0/1
					    selectType==2 || selectType==rateType
					  条件2.
					    onlyShowText: T/F
					    text: 有值/没值
					    !onlyShowText || text.length>0
					*/
					return (selectType == 2 || selectType == rateType) && (!onlyShowText || text.length > 0)
				})
			}
		},
		methods: {
			setSelectType(type) {
				this.selectType = type
			},
			toggleOnlyShowText() {
				this.onlyShowText = !this.onlyShowText
			}
		},
		components: {
			Star
		}
	}
</script>

<style lang="less" scoped>
	.ratings {
		position: absolute;
		top: 250px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		background-color: #FFFFFF;
		.overview {
			display: flex;
			padding: 15px 0;
			.overview-left {
				flex: 0 0 137px;
				padding: 6px 0;
				width: 137px;
				border-right: 1px solid rgba(7, 17, 27, 0.1);
				text-align: center;
				@media only screen and (max-width: 320px) {
					flex: 0 0 120px;
					width: 120px;
				}
				.score {
					margin-bottom: 6px;
					line-height: 28px;
					font-size: 24px;
					color: rgb(255, 153, 0);
				}
				.title {
					margin-bottom: 8px;
					line-height: 12px;
					font-size: 12px;
					color: rgb(7, 17, 27);
				}
				.rank {
					line-height: 10px;
					font-size: 10px;
					color: rgb(147, 153, 159);
				}
			}
			.overview-right {
				flex: 1;
				padding: 6px 0 6px 10px;
				@media only screen and (max-width: 320px) {
					padding-left: 6px;
				}
				.score-wrapper{
					margin-bottom: 5px;
					.title{
						font-size: 12px;
						line-height: 12px;
						margin-bottom: 8px;
						color: #07111B;
					}
					.score{
						font-size: 10px;
						line-height: 10px;
						margin-bottom: 8px;
						color: #07111B;
					}
					.star{
						display: inline-block;
						margin: 0 15px;
						vertical-align: top;
					}
				}
				.delivery-wrapper{
					font-size: 0;
					padding: 0 15px;
					.title{
						line-height: 18px;
						font-size: 12px;
						color: #07111B;
					}
					.delivery{
						margin-left: 15px;
						font-size: 12px;
						color: #07111B;
					}
				}
			}
		}
		.split{
			width: 100%;
			height: 15px;
			background-color: #F3F5F7;
		}
		.ratingselect{
			.rating-type{
				padding: 5px 0;
				margin: 0 15px;
				.block{
					display: inline-block;
					padding: 5px 10px;
					margin-right: 5px;
					line-height: 12px;
					border-radius: 2px;
					font-size: 12px;
					color: #4D555D;
					background-color: #CCCCCC;
				}
				.active{
					background-color: #02A774;
					color: #FFFFFF;
				}
			}
			.switch{
				padding: 5px 15px;
				line-height: 24px;
				border-bottom: 1px solid #DEDEDE;
				color: rgb(147,153,159);
				font-size: 0;
			}
			.on{
				.icon-xuanzhong{
					color: #02A774;
				}
			}
			.icon-xuanzhong{
				display: inline-block;
				vertical-align: top;
				margin-right: 5px;
				font-size: 18px;
			}
			.text{
				display: inline-block;
				vertical-align: top;
				font-size: 15px;
			}
		}
		.rating-wrapper{
			padding: 0 15px;
			.rating-item{
				display: flex;
				padding: 15px 0;
				border-bottom: 1px solid #DEDEDE;
				.avatar{
					flex: 0 0 28px;
					width: 28px;
					margin-right: 12px;
					img{
						border-radius: 2px;
					}
				}
				.content{
					position: relative;
					flex: 1;
					.name{
						margin-bottom: 4px;
						line-height: 12px;
						font-size: 10px;
						color: #07111B;
					}
					.star-wrapper{
						margin-bottom: 6px;
						font-size: 0;
						.star{
							display: inline-block;
							margin-right: 6px;
							vertical-align: top;
						}
						.delivery{
							display: inline-block;
							vertical-align: top;
							height: 12px;
							line-height: 12px;
							font-size: 10px;
							color: #07111B;
						}
					}
					.text{
						font-size: 10px;
						line-height: 12px;
						color: #07111B;
						margin-bottom: 5px;
					}
					.recommend{
						font-size: 10px;
						.item{
							display: inline-block;
							margin: 0 5px 3px 0;
							font-size: 9px;
							padding: 0 5px;
							border: 1px solid #CCCCCC;
							border-radius: 2px;
							color: #07111B;
							background-color: #FFFFFF;
							line-height: 1rem;
						}
					}
					.time{
						position: absolute;
						top: 0;
						right: 0;
						line-height: 12px;
						font-size: 10px;
						color: #07111B;
					}
				}
			}
		}
	}
</style>
