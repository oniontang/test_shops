<template>
	<div class="info">
		<div>
			<div class="info_section">
				<h3 class="section_title">配送信息</h3>
				<div class="activity">
					<div class="activity_item">
						<van-tag type="primary">{{info.description}}</van-tag>
						<span class="item_text">由商家配送提供配送，约{{info.deliveryTime}}分钟送达，距离{{info.distance}}</span>
					</div>
				</div>
				<span class="info_item">配送费约{{info.deliveryPrice}}</span>
			</div>
			<div class="info_section">
				<h3 class="section_title">活动与优惠</h3>
				<div class="activity">
					<div class="activity_item" v-for="(support, index) in info.supports" :key="index">
						<van-tag :type="supportType[support.type]">{{support.name}}</van-tag>
						<span class="item_text">{{support.content}}</span>
					</div>
				</div>
			</div>
			<div class="info_section">
				<h3 class="section_title">商铺照片</h3>
				<div class="pic_wrapper">
					<ul class="pic_list" ref="picsUl">
						<li class="pic_list_item" v-for="(pic, index) in info.pics" :key="index">
							<img width="100%" height="100%" :src="pic" alt="">
						</li>
					</ul>
				</div>
			</div>
			<div class="info_section">
				<h3 class="section_title">商铺信息</h3>
				<ul class="details">
					<li>
						<span class="bold">品类</span>
						<span>{{info.category}}</span>
					</li>
					<li>
						<span class="bold">商家电话</span>
						<span>{{info.phone}}</span>
					</li>
					<li>
						<span class="bold">地址</span>
						<span>{{info.address}}</span>
					</li>
					<li>
						<span class="bold">营业时间</span>
						<span>{{info.workTime}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import {Tag} from 'vant'
	import BScroll from 'better-scroll'
	import {mapState} from 'vuex'
	export default {
		data(){
			return{
				supportType: ['success','danger','warning']
			}
		},
		computed:{
			...mapState(['info'])
		},
		mounted() {
			if(!this.info.pics) {
				return
			}
			// 有数据创建滑动
			this._initScroll()
		},
		methods:{
			_initScroll() {
				new BScroll('.info')
				const ul = this.$refs.picsUl
				const liWidth = 120
				const space = 6
				const count = this.info.pics.length
				ul.style.width = (liWidth + space) * count - space + 'px'
				new BScroll('.pic_wrapper',{
					scrollX: true // 水平滑动
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.info{
		position: absolute;
		top: 250px;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		overflow: hidden;
		.info_section{
			width: 100%;
			padding: 10px;
			box-sizing: border-box;
			background-color: #FFFFFF;
			border-bottom: 10px solid #F3F5F7;
			.section_title{
				font-size: 1rem;
				font-weight: 700;
				color: #07111B;
			}
			.info_item{
				font-size: 14px;
				line-height: 2rem;
			}
			.activity{
				margin-top: 10px;
				.activity_item{
					display: flex;
					margin-bottom: 5px;
					.item_text{
						line-height: 16px;
						font-size: 12px;
						margin-left: 15px;
					}
				}
			}
			.pic_wrapper{
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
				margin-top: 15px;
				.pic_list{
					font-size: 0;
					.pic_list_item{
						display: inline-block;
						margin-right: 6px;
						width: 120px;
						height: 90px;
					}
					.pic_list_item:last-child{
						margin: none;
					}
				}
			}
			.details{
				margin-top: 10px;
				li{
					display: flex;
					padding: 5px 0;
					border-bottom: 1px solid #E3E5E7;
					padding-right: 10px;
					font-size: 14px;
				}
				li:last-child{
					border: none;
				}
				.bold{
					font-weight: 700;
					width: 25%;
				}
			}
		}
		.info_section:last-child{
			border: none;
		}
	}
</style>