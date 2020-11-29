<template>
	<div class="msite">
		<TopHeader :title="address.name">
			<span class="header_search" slot="search">
				<i class="iconfont icon-iconfind"></i>
			</span>
			<router-link class="header_login" slot="login" :to="userInfo._id?'/msite':'/login'">
				<span class="header_login_text" v-if="!userInfo._id">登录 | 注册</span>
				<span class="header_login_text" v-else>
					<i class="iconfont icon-yonghu"></i>
				</span>
			</router-link>
		</TopHeader>
		<!-- 首页导航菜单 -->
		<nav class="msite_nav">
			<!-- swiper 容器 -->
			<van-swipe class="swiper-container" :autoplay="3000" :loop="false" indicator-color="#999" v-if="categorys.length">
				<van-swipe-item class="swiper-wrapper" v-for="(categorys,index) in categorysArr" :key="index">
					<div class="swiper-slide">
						<span class="link_to_food" v-for="(category,index) in categorys" :key="index">
							<div class="food_container">
								<img :src="imgUrl+category.image_url" alt="">
							</div>
							<span>{{category.title}}</span>
						</span>
					</div>
				</van-swipe-item>
			</van-swipe>
			<img src="../../assets/img/msite_back.svg" alt="back" v-else>
		</nav>
		<!-- 商品列表 -->
		<div class="msite_shop_list">
			<div class="shop_header">
				<i class="iconfont icon-fujinjihuo shop_icon"></i>
				<span class="shop_header_title">附近商家</span>
			</div>
			<ShopList />
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import TopHeader from '../../components/TopHeader/TopHeader.vue'
	import ShopList from '../../components/ShopList/ShopList.vue'
	export default {
		data() {
			return {
				imgUrl: 'https://fuss10.elemecdn.com'
			}
		},
		mounted() {
			this.$store.dispatch('getCategorys')
			this.$store.dispatch('getShops')
		},
		computed: {
			...mapState(['address', 'categorys','userInfo']),
			// 根据categorys一维数组生成一个二维数组,小数组中元素个数最大为8个
			categorysArr() {
				const {
					categorys
				} = this
				const arr = []
				// 小数组（最大长度8）
				let minArr = []
				//遍历categorys
				categorys.forEach(c => {
					// 判断当前小数组是否已经满了，创建一个新的小数组
					if (minArr.length === 8) {
						minArr = []
					}
					// 如果minArr是空的，
					if (minArr.length === 0) {
						arr.push(minArr)
					}
					// 将当前分类保存到小数组中
					minArr.push(c)
				})
				return arr
			}
		},
		components: {
			TopHeader,
			ShopList
		}
	}
</script>

<style lang="less" scoped>
	.msite {
		width: 100%;

		.msite_nav {
			border-bottom: 1px solid #E4E4E4;
			padding-top: 50px;
			height: 200px;
			background-color: #FFFFFF;

			.swiper-container {
				width: 100%;
				height: 100%;

				.swiper-wrapper {
					width: 100%;
					height: 100%;

					.swiper-slide {
						display: flex;
						justify-content: center;
						align-items: flex-start;
						flex-wrap: wrap;
						height: 100%;

						.link_to_food {
							width: 25%;
							padding-bottom: 10px;

							.foot_container {
								display: block;
								width: 100%;
								text-align: center;
								font-size: 0;
							}

							img {
								margin: 5px 25%;
								display: inline-block;
								width: 50px;
								height: 50px;
							}

							span {
								display: block;
								width: 100%;
								text-align: center;
								font-size: 13px;
								color: #666666;
							}
						}
					}

					.swiper-pagination {
						>span.swiper-pagination-bullet-active {
							background-color: #02A774;
						}
					}
				}
			}
		}

		.msite_shop_list {
			border-top: 1px solid #E4E4E4;
			margin-top: 10px;
			background-color: #FFFFFF;

			.shop_header {
				padding: 10px 10px 0;

				.shop_icon {
					margin-left: 5px;
					color: #999999;
				}

				.shop_header_title {
					color: #999999;
					font-size: 14px;
					line-height: 20px;
				}
			}
		}
	}
</style>
