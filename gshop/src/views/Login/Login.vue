<template>
	<div class="login">
		<span class="return" @click="$router.back()">
			<i class="iconfont icon-ai207"></i>
		</span>
		<section class="login_logo">
			<h2 class="login_logo_img">唐小厨外卖</h2>
			<div class="login_logo_title">
				<span :class="{on: loginWay}" @click="loginWay=true">短信登录</span>
				<span :class="{on: !loginWay}" @click="loginWay=false">密码登录</span>
			</div>
		</section>
		<section class="login_content">
			<!-- 验证码登录 -->
			<div :class="{on: !loginWay}">
				<div class="form_msg_mobile">
					<input type="tel" maxlength="11" placeholder="请输入手机号" v-model="phone">
					<button :disabled="!rightPhone" class="get_verifcode" :class="{right_phone: rightPhone}" @click.prevent="getCode">
						{{codeTime>0 ? `已发送${codeTime}s`:'获取验证码'}}
					</button>
				</div>
				<div class="form_msg_code">
					<input type="tel" maxlength="6" placeholder="请输入验证码" v-model="code">
				</div>
				<div class="form_msg_hite">
					温馨提示：未注册唐小厨外卖帐号的手机号，登录时将自动注册，且代表您已同意
					<a href="javascript:;">《用户服务协议》</a>
				</div>
			</div>
			<div :class="{on: loginWay}">
				<div class="form_msg_mobile">
					<input type="text" maxlength="11" placeholder="请输入账户名/手机号" v-model="name">
				</div>
				<div class="form_msg_pwd">
					<input type="text" maxlength="8" placeholder="请输入密码" v-if="showPwd" v-model="pwd">
					<input type="password" maxlength="8" placeholder="请输入密码" v-else v-model="pwd">
					<div class="switch_botton" :class="showPwd ?'onshow':'off'" @click="showPwd=!showPwd">
						<div class="switch_circle" :class="{right:showPwd}"></div>
						<span class="switch_text">{{showPwd ? '显示': '隐藏'}}</span>
					</div>
				</div>
				<div class="form_msg_code">
					<input type="tel" maxlength="6" placeholder="请输入验证码" v-model="captcha">
					<img class="get_verifcode" src="http://localhost:4000/captcha" @click="getCaptcha" alt="captcha" ref="captcha">
				</div>
			</div>
			<button class="login_submit" @click="login">登 录</button>
			<span class="about_us" @click="overlayShow=true">关于我们</span>
		</section>
		<van-overlay :show="overlayShow" @click="overlayShow = false">
			<div class="about_us_msg">
				
			</div>
		</van-overlay>
	</div>
</template>

<script>
	import {Toast, Overlay} from 'vant'
	import {reqPwdLogin,reqSendCode,reqSmsLogin} from '../../api'
	export default {
		data() {
			return {
				loginWay: true, // true为短信登陆，false为密码登陆
				phone: '', //手机号
				code: '',
				codeTime: 0, // 验证码倒计时
				showPwd: false, // 是否显示密码
				name: '',
				pwd: '', // 密码
				captcha: '', // 图形验证码
				overlayShow: false // 遮罩层
			}
		},
		computed:{
			rightPhone(){
				return /^1[3-9][0-9]{9}$/.test(this.phone)
			}
		},
		methods:{
			async getCode(){ // 异步获取短信验证码
				if(!this.codeTime){
					// 实现倒计时功能
					this.codeTime = 60
					this.intervalId = setInterval(()=>{
						this.codeTime--
						if(this.codeTime <= 0){
							clearInterval(this.intervalId)
						}
					},1000)
					// 发送ajax请求,获取短信验证码
					const res = await reqSendCode(this.phone)
					if(res.code === 1){
						// 请求失败，显示错误提示，停止计时器
						Toast.fail(res.msg)
						if(this.codeTime){
							this.codeTime = 0
							clearInterval(this.intervalId)
						}
					}
				}
			},
			async login() {
				let res
				if(this.loginWay){ // 短信验证码登录
					const { rightPhone, phone, code } = this
					if(!this.phone){
						Toast.fail('手机号码不能为空')
						return
					}else if(!this.rightPhone){ // 验证6位短信验证码
						Toast.fail('号码格式错误')
						return
					}else if(!/^\d{6}$/.test(code)){ // 验证6位短信验证码
						Toast.fail('验证码错误')
						return
					}
					// 发送短信登录ajax请求
					res = await reqSmsLogin(phone,code)
					console.log(res)
				}else{ //用户名，密码登录
					const {name,pwd,captcha} = this
					if(!this.name){
						Toast.fail('用户名不能为空')
						return
					}else if(!this.pwd){
						Toast.fail('密码不能为空')
						return
					}else if(!this.captcha){
						Toast.fail('验证码不能为空')
						return
					}
					// 发送账号密码登录ajax请求
					res = await reqPwdLogin({name,pwd,captcha})
					console.log(res)
				}
				// 停止计时
				if(this.codeTime){
					this.codeTime = 0
					clearInterval(this.intervalId)
				}
				// 处理ajax请求返回结果数据
				if(res.code === 0){
					const user = res.data
					// 保存user到veux中的state、跳转个人中心
					this.$store.dispatch('saveUser',user)
					this.$router.replace('/profile')
				}else{
					// 调用下面getCaptcha方法，获取新的图形验证码
					this.getCaptcha()
					Toast.fail(res.msg)
				}
			},
			getCaptcha() { // 获取新的图片验证码
				// 使用$refs方法在用户输入登录信息错误的时候进行自动更新验证码
				this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+Date.now()
			}
		}
	}
</script>

<style lang="less" scoped>
	.login{
		width: 100%;
		height: 100vh;
		background-color: #02A774;
		padding-top: 120px;
		box-sizing: border-box;
		.return{
			position: absolute;
			top: 45px;
			left: 30px;
			color: #FFFFFF;
			i{
				font-size: 20px;
			}
		}
		.login_logo{
			width: 50%;
			margin: 0 auto;
			text-align: center;
			color: #FFFFFF;
			.login_logo_img{
				font-size: 40px;
				font-weight: bold;
			}
			.login_logo_title{
				padding-top: 20px;
				text-align: center;
				span{
					font-size: 16px;
					line-height: 30px;
					padding: 5px 10px;
				}
				.on{
					color: #EE9900;
					font-weight: 700;
					border-bottom: 2px solid #EE9900;
				}
			}
		}
		.login_content{
			width: 80%;
			margin: 0 auto;
			margin-top: 20px;
			.on{
				display: none;
			}
			input{
				width: 100%;
				height: 100%;
				padding-left: 10px;
				box-sizing: border-box;
				outline: 0;
				border: 1px solid #DDDDDD;
				border-radius: 5px;
			}
			.form_msg_mobile{
				position: relative;
				height: 45px;
				font-size: 15px;
				background-color: #FFFFFF;
				border-radius: 5px;
			}
			.form_msg_pwd{
				position: relative;
				height: 45px;
				font-size: 15px;
				background-color: #FFFFFF;
				margin-top: 10px;
				border-radius: 5px;
				.switch_botton{
					font-size: 12px;
					border: 1px solid #ddd;
					border-radius: 8px;
					transition: background-color .3s, border-color .3s;
					padding: 0 6px;
					width: 30px;
					height: 16px;
					line-height: 16px;
					color: #FFF;
					position: absolute;
					top: 50%;
					right: 10px;
					transform: translateY(-50%);
				}
				.off{
					background-color: #FFF;
					.switch_text{
						font-size: 10px;
						float: right;
						color: #DDD;
					}
				}
				.onshow{
					background-color: #02A774;
				}
				.switch_circle{
					position: absolute;
					top: -1px;
					left: -1px;
					width: 16px;
					height: 16px;
					border-radius: 50%;
					border: 1px solid #DDD;
					background-color: #FFF;
					box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
					transition: transform .3s;
				}
				.right{
					transform: translateX(30px);
				}
			}
			.form_msg_code{
				position: relative;
				margin-top: 10px;
				height: 45px;
				width: 100%;
			}
			.get_verifcode{
				position: absolute;
				right: 10px;
				top: 50%;
				transform: translateY(-50%);
				font-size: 14px;
				line-height: 45px;
				background: transparent;
				border: none;
				color: #CCCCCC;
			}
			.right_phone{
				color: #000;
			}
			img{
				width: 30%;
			}
			.form_msg_hite{
				margin-top: 12px;
				color: #333333;
				font-size: 12px;
				line-height: 20px;
				a{
					color: #EAEAEA;
				}
			}
			.login_submit{
				width: 100%;
				height: 45px;
				background-color: #FFFFFF;
				border: none;
				border-radius: 5px;
				color: #02A774;
				font-size: 18px;
				font-weight: bold;
				margin-top: 15px;
			}
			.about_us{
				width: 100%;
				text-align: center;
				font-size: 15px;
				color: #EAEAEA;
				display: block;
				margin-top: 15px;
			}
		}
		.about_us_msg{
			width: 80%;
			margin: 0 auto;
			height: 500px;
			background-color: #FFFFFF;
			margin-top: 100px;
		}
	}
</style>