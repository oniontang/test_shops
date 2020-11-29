/* 
	封装ajax请求函数
	返回值：Promise对象(异步返回的数据是:response.data)
 */
import axios from 'axios'
export default function ajax(url='', data={}, type='GET'){
	return new Promise(function(resolve, reject){
		// 执行异步Ajax请求
		let promise
		if(type === 'GET'){
			// 准备Url,query参数
			let dataStr = '' // 数据拼接字符串
			Object.keys(data).forEach(key => {
				dataStr += key + '=' + data[key] + '&'
			})
			if(dataStr !== ''){
				dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
				url = url + '?' +dataStr
			}
			//发送GET请求
			promise = axios.get(url)
		}else{
			// 发送POST请求
			promise = axios.post(url, data)
		}
		promise.then(response => {
			//成功调用resolve
			resolve(response.data)
		}).catch(error => {
			//失败调用reject
			reject(error)
		})
	})
}