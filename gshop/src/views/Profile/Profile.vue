<template>
	<div class="profile">
		<TopHeader title="个人中心"/>
		<section class="profile_section">
			<section class="profile_login_user">
				<div class="user_img">
					<img src="../../assets/img/1.png" alt="">
				</div>
				<router-link class="user_msg" :to="userInfo._id?'/profile':'/login'">
					<section class="user_msg_name" v-if="!userInfo.phone">{{userInfo.name || '注册/登录'}}</section>
					<section class="user_msg_mobile">
						<i class="iconfont icon-shouji54"></i>
						{{userInfo.phone || '暂未绑定手机号'}}
					</section>
				</router-link>
			</section>
			<section class="profile_user_score">
				<section class="score_list">
					<span class="account number">00.0 元</span>
					<span class="item">我的余额</span>
				</section>
				<section class="score_list">
					<span class="coupon number">0 张</span>
					<span class="item">我的优惠</span>
				</section>
				<section class="score_list">
					<span class="score number">0 分</span>
					<span class="item">个人积分</span>
				</section>
			</section>
			<section class="profile_list">
				<section class="list list_border">
					<i class="iconfont icon-dingdan1"></i>
					<span>我的订单</span>
					<i class="iconfont icon-qianjin"></i>
				</section>
				<section class="list list_border">
					<i class="iconfont icon-jifenguizeguankong"></i>
					<span>积分商城</span>
					<i class="iconfont icon-qianjin"></i>
				</section>
				<section class="list">
					<i class="iconfont icon-filedicon_memberco"></i>
					<span>我的会员</span>
					<i class="iconfont icon-qianjin"></i>
				</section>
			</section>
			<section class="profile_list">
				<section class="list">
					<i class="iconfont icon-xinbaniconshangchuan-"></i>
					<span>客服中心</span>
					<i class="iconfont icon-qianjin"></i>
				</section>
			</section>
			<section class="profile_logout">
				<button class="logout" v-if="userInfo._id" @click="logout">退出登录</button>
			</section>
		</section>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import {Dialog,Toast} from 'vant'
	import TopHeader from '../../components/TopHeader/TopHeader.vue'
	export default {
		computed:{
			...mapState(['userInfo'])
		},
		methods:{
			logout(){
				Dialog.confirm({
					title: '确认退出吗？'
				}).then(()=>{
					this.$store.dispatch('logout')
					Toast('退出成功')
				}).catch(()=>{
					Toast('取消退出')
				})
			}
		},
		components:{
			TopHeader
		}
	}
</script>

<style lang="less" scoped>
	.profile{
		width: 100%;
		.profile_section{
			width: 100%;
			padding-top: 45px;
			.profile_login_user{
				width: 100%;
				background-color: #02A774;
				border-radius: 0px 0px 15px 15px;
				display: flex;
				padding: 10px 0px;
				.user_img{
					width: 5rem;
					height: 5rem;
					padding: 0 3%;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.user_msg{
					color: #FFFFFF;
					.user_msg_name{
						font-size: 20px;
						line-height: 50px;
					}
					.user_msg_mobile{
						font-size: 15px;
					}
				}
			}
			.profile_user_score{
				width: 100%;
				display: flex;
				padding: 10px 0;
				background-color: #FFFFFF;
				.score_list{
					display: flex;
					flex-flow: column;
					text-align: center;
					width: 33.33%;
					.number{
						line-height: 1.8rem;
						font-size: 17px;
					}
					.item{
						font-size: 13px;
					}
					.account{
						color: #ffaa00;
					}
					.coupon{
						color: #eb3323;
					}
					.score{
						color: #02A774;
					}
				}
			}
			.profile_list{
				width: 100%;
				background-color: #FFFFFF;
				margin-top: 10px;
				.list{
					width: 96%;
					margin: 0 auto;
					height: 40px;
					display: flex;
					line-height: 40px;
					font-size: 16px;
					color: #999999;
					justify-content: space-between;
					padding-right: 10px;
					box-sizing: border-box;
					span{
						width: 90%;
					}
				}
				.list_border{
					border-bottom: 1px solid #CCCCCC;
				}
			}
			.profile_logout{
				width: 96%;
				margin: 0 auto;
				margin-top: 30px;
				.logout{
					width: 100%;
					height: 40px;
					background-color: #FFAA00;
					color: #FFFFFF;
					text-align: center;
					border: none;
					border-radius: 8px;
				}
			}
		}
	}
</style>