import Mock from 'mockjs'
import data from './data.json'

// 返回goods接口数据
Mock.mock('/goods', {code: 0, data: data.goods})
// 返回ratings接口数据
Mock.mock('/ratings', {code: 0, data: data.ratings})
// 返回info接口数据
Mock.mock('/info', {code: 0, data: data.info})