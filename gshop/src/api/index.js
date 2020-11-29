/* 
	包含多个请求函数的模块
 */
import ajax from './ajax'
const BASE_URL = '/api'

// 根据经纬度(坐标)获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// 获取菜品分类列表
export const reqCategorys = () => ajax(BASE_URL + '/index_category')
// 根据经纬度获取商户列表
export const reqShops = ({latitude, longitude}) => ajax(BASE_URL + '/shops', {latitude, longitude})
// 根据经纬度和名字搜索商户列表
export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL + '/search_shops', {geohash, keyword})
// 获取一次性验证码

// 用户名密码登录
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE_URL + '/login_pwd', {name, pwd, captcha}, 'POST')
// 发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL + '/sendcode', {phone})
// 手机号验证码登录
export const reqSmsLogin = (phone, code) => ajax(BASE_URL + '/login_sms', {phone, code}, 'POST')
// 根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')
// 用户退出登录
export const reqLogout = () => ajax(BASE_URL + '/logout')


// 使用mock.js拦截Ajax请求，模拟接口数据，不需要配置代理
// 获取商家信息
export const reqShopInfo = () => ajax('/info')
// 获取商家评价信息
export const reqShopRatings = () => ajax('/ratings')
// 获取商家商品信息
export const reqShopGoods = () => ajax('/goods')