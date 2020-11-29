<template>
	<div class="shop_goods">
		<div class="goods">
			<div class="menu_wrapper">
				<ul>
					<li class="menu_item" :class="{current: index === currentIndex}" v-for="(foodType, index) in goods" :key="index" @click="clickMenuItem(index)">
						<span class="menu_item_text">
							<img class="menu_item_icon" v-if="foodType.icon" :src="foodType.icon" alt="">
							{{foodType.name}}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods_wrapper">
				<ul ref="foodsUl">
					<li class="food_list_hook" v-for="(foodList, index) in goods" :key="index">
						<h3 class="title">{{foodList.name}}</h3>
						<ul>
							<li class="food_item" v-for="(food, index) in foodList.foods" :key="index">
								<div class="food_item_icon">
									<img width="80" height="80" :src="food.icon" alt="">
								</div>
								<div class="food_item_content">
									<h3 class="content_name">{{food.name}}</h3>
									<span class="content_decs">{{food.description}}</span>
									<div class="content_extra">
										<span class="count">月售{{food.sellCount}}份</span>
										<span>好评率{{food.rating}}%</span>
									</div>
									<div class="content_price">
										<span class="now">{{food.price}}￥</span>
										<span v-if="food.oldPrice" class="old">{{food.oldPrice}}￥</span>
									</div>
									<div class="content_wrapper">
										<CartControl :food="food"/>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import {mapState} from 'vuex'
	import CartControl from '../../../components/CartControl/CartControl.vue'
	export default {
		data() {
			return {
				scrollY: 0, // 菜单右侧滑动的Y轴坐标
				tops: [], // 所有右侧food<li>列表top组成的数组
				value: ''
			}
		},
		mounted() {
			this.$store.dispatch('getShopGoods', () => {
				this.$nextTick(() => {
					this._initScroll()
					this._initTops()
				})
			})
		},
		computed:{
			...mapState(['goods']),
			// 计算当前分类的index，在初始和数据发生变化时触发
			currentIndex() {
				// 得到条件数据
				const {scrollY, tops} = this
				// 根据条件计算数据
				const index = tops.findIndex((top,index) => {
					// 返回值逻辑：scrollY大于等于使用findIndex查找到的元素位置值（下标值），同时还要小于整个tops数组的长度
					return scrollY >= top && scrollY < tops[index+1]
				})
				return index
			}
		},
		methods:{
			// 初始化scrollY
			_initScroll() {
				new BScroll('.menu_wrapper', {
					click: true
				})
				this.foodsScroll = new BScroll('.foods_wrapper', {
					probeType: 2,
					click: true
				})
				
				// 给食物列表绑定scroll监听
				this.foodsScroll.on('scroll', ({x, y}) => {
					this.scrollY = Math.abs(y)
				})
				// 惯性滑动后触发
				this.foodsScroll.on('scrollEnd', ({x, y}) => {
					this.scrollY = Math.abs(y)
				})
			},
			// 初始化tops
			_initTops() {
				// 1.初始化tops
				const tops = []
				let top = 0
				tops.push(top)
				// 2.收集
				// 找到所有分类的li
				const lis = this.$refs.foodsUl.children
				Array.prototype.slice.call(lis).forEach(li => {
					top += li.clientHeight
					tops.push(top)
				})
				// 3.更新数据
				this.tops = tops
			},
			// 让右侧列表滑动到对应位置
			clickMenuItem(index) {
				// 得到目标位置的Y坐标，并立即更新点击的分类
				const scrollY = this.tops[index]
				this.scrollY = scrollY
				this.foodsScroll.scrollTo(0,-scrollY,300)
			}
			// 显示点击的food
			// showFood (food) {
			// 	// 设置food
			// 	this.food = food
			// 	// 显示food组件(调用子组件对象的方法)
			// 	this.$refs.food.toggleIsShow()
			// }
		},
		components:{
			CartControl
		}
	}
</script>

<style lang="less" scoped>
	.shop_goods{
		width: 100%;
		.goods{
			display: flex;
			width: 100%;
			background-color: #FFF;
			overflow: hidden;
			position: absolute;
			top: 250px;
			bottom: 46px;
			.menu_wrapper{
				flex: 0 0 80px;
				width: 80px;
				background-color: #F3F5F7;
				.menu_item{
					display: table;
					height: 54px;
					width: 56px;
					padding: 0 12px;
					line-height: 14px;
					.menu_item_text{
						font-size: 12px;
						width: 56px;
						display: table-cell;
						vertical-align: middle;
					}
					.menu_item_icon{
						display: inline-block;
						vertical-align: top;
						width: 12px;
						height: 12px;
						margin-right: 2px;
						background-size: 12px 12px;
						background-repeat: no-repeat;
					}
				}
				.current{
					position: relative;
					z-index: 10;
					margin-top: -1px;
					background-color: #FFFFFF;
					color: #02A774;
					font-weight: 700;
				}
			}
			.foods_wrapper{
				flex: 1;
				.title{
					padding-left: 14px;
					height: 20px;
					line-height: 20px;
					border-left: 2px solid #D9DDE1;
					font-size: 12px;
					color: #93999F;
					background-color: #F3F5F7;
				}
				.food_item{
					display: flex;
					margin: 18px;
					padding-bottom: 18px;
					border-bottom: 1px solid #F3F5F7;
					.food_item_icon{
						flex: 0 0 57px;
						margin-right: 10px;
					}
					.food_item_content{
						flex: 1;
						position: relative;
						.content_name{
							margin: 2px 0 8px 0;
							height: 14px;
							line-height: 14px;
							font-size: 14px;
							color: #07111B;
						}
						.content_decs, .content_extra{
							line-height: 20px;
							font-size: 10px;
							color: #93999F;
						}
						.content_decs{
							line-height: 12px;
							margin-bottom: 8px;
						}
						.content_extra{
							.count{
								margin-right: 8px;
							}
						}
						.content_price{
							font-weight: 700;
							line-height: 24px;
							.now{
								margin-right: 8px;
								font-size: 14px;
								color: #F01414;
							}
							.old{
								margin-right: 8px;
								font-size: 10px;
								color: #93999F;
								text-decoration: line-through;
							}
						}
						.content_wrapper{
							position: absolute;
							right: 0;
							bottom: -3px;
						}
					}
				}
				.food_item:last-child{
					border: none;
					margin-bottom: 0;
				}
			}
		}
	}
</style>