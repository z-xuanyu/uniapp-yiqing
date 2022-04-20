import request from "../utils/http/request.js"

// 疫情整体统计信息
export function getStatistics() {
	return request.get('Statistics');
}

// 请求获取疫情地区表单数据
export function getCities() {
	return request.get('cities')
}

// 取疫情按时间线获取事件
export function getTimeline() {
	return request.get('Timeline')
}

// 获取疫情最新辟谣信息
export function getRumorList() {
	return request.get('RumorList')
}

// 获取疫情百科知识信息
export function getWikiList() {
	return request.get('WikiList')
}

// 获取疫情防护知识信息
export function getFanghuData() {
	return request.get('fanghu')
}