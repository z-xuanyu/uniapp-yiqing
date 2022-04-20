<template>
	<view class="map-page">
		<!-- loadiing -->
		<view class="loadiing" v-show="!loadiing">
			<view class="cu-load load-modal">
				<image src="https://ncov.zhouxuanyu.com/logo.png" mode="widthFix"></image>
				<view class="gray-text">加载中...</view>
			</view>
		</view>
		<view v-show="loadiing">
			<!-- 顶部导航 -->
			<cu-custom bgColor="bg-blue" :isBack="false"><block slot="content">疫情地图</block></cu-custom>
			<!-- banner -->
			<image src="https://img1.dxycdn.com/2020/0314/863/3401956761707181858-2.png" mode="widthFix" style="width: 100%;"></image>
			<!-- 数据标题 -->
			<view class="data-statement flex justify-between">
				<view class="statement-title">
					<view class="padding-top-xs padding-left-xs text-xl text-black text-bold">全国疫情状况</view>
					<view class="padding-left-xs padding-bottom-xs text-sm text-gray">截至 2020-02-08 17:22:44</view>
				</view>
				<view class="explain text-sm padding-top-xs padding-right-xs text-gray text-bold" @tap="showModal" data-target="Modal">数据说明</view>
			</view>
			<!-- 数据说明 -->
			<view class="cu-modal" :class="modalName == 'Modal' ? 'show' : ''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">数据说明</view>
						<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
					</view>
					<view class="padding-sm">
						<view class="padding-xs">0. 数据爬取自【腾讯新闻】,在原有基础上增加了“省”一级的疫情地图。(仅供学习研究，</view>
						<view>以下内容为腾讯数据声明：</view>
						<view class="padding-xs">1. 全部数据来源于国家卫健委、各省卫健委以及权威媒体报道。</view>
						<view>2. 腾讯新闻的统计方法如下：</view>
						<view class="padding-xs">a. 国家卫健委公布数据时，全国总数与国家卫健委保持一致。</view>
						<view class="padding-xs">b. 各省卫健委陆续公布数据，如果各省数据总和已经超过之前国家卫健委总数，则切换为直接使用各省数据总和。</view>
						<view class="padding-xs">
							3.
							国家卫健委及各省卫健委公布数据的发布时间和统计时间段各不相同，比如国家卫健委公布了最新全国数据，而各省还没有公布各自最新数据，故而会在部分时段出现国家总数不等于分省数据之和。
						</view>
						<button class="cu-btn bg-blue margin-tb-sm lg" @tap="hideModal">确认</button>
					</view>
				</view>
			</view>
			<!-- 数据列表 -->
			<view class="flex">
				<view class="flex-sub radius margin-xs radius shadow" v-for="(item, index) in dataed" :key="index">
					<view class="num flex justify-center padding-tb-xs text-xl text-bold light" :class="item.bgColor">{{ item.num }}</view>
					<view class="tag flex text-black padding-bottom-xs justify-center text-sm text-bold">{{ item.title }}</view>
					<view class="top flex align-center text-xs justify-center">
						<view class="text-grey">较昨天</view>
						<view class="text-red">+{{ item.num_sub }}</view>
					</view>
				</view>
			</view>
			<!-- 地图 -->
			<view class="map-title bg-blue radius padding-xs margin-xs shadow">疫情地图</view>
			<view class="map-container">
				<view class="qiun-charts">
					<!--#ifdef MP-ALIPAY -->
					<canvas
						canvas-id="canvasMap"
						id="canvasMap"
						class="charts"
						:width="cWidth * pixelRatio"
						:height="cHeight * pixelRatio"
						:style="{ width: cWidth + 'px', height: cHeight + 'px' }"
						@touchstart="touchMap"
					></canvas>
					<!--#endif-->
					<!--#ifndef MP-ALIPAY -->
					<canvas canvas-id="canvasMap" id="canvasMap" class="charts" @touchstart="touchMap"></canvas>
					<!--#endif-->
				</view>
			</view>
			<view class="text-gray text-sm padding-sm">在地图中点击省份可跳转到相应省份的疫情地图，并查看该省相关的实时动态</view>
			<!-- 全国疫情分析图 -->
			<v-swiper :TrendChart="quanguoTrendChart" title="全国" :dotTitle="qunguoDotTitle"></v-swiper>
			<!-- 湖北疫情分析图 -->
			<v-swiper :TrendChart="hbFeiHbTrendChart" :dotTitle="hbDotTitle"></v-swiper>
			<!-- 疫情数据列表 -->
			<view class="city-list">
				<!-- 地区标题 -->
				<view class="cu-bar bg-white">
					<view class="action sub-title">
						<text class="text-xl text-bold text-blue">疫情地区数据</text>
						<text class="bg-blue" style="width: 6rem;"></text>
					</view>
				</view>
				<!-- 地区列表 -->
				<view class="flex justify-between padding-xs">
					<view class="text-center basis-sm padding-sm text-sm text-black" :class="item.bgColor" v-for="(item, index) in areaTitle" :key="index">{{ item.name }}</view>
				</view>
				<view class="list" v-for="(item, index) in areaTableData" :key="index">
					<view class="flex text-center justify-between text-bold sm-border padding-lr-xs padding-bottom-xs">
						<view class="bg-cyan padding-xs basis-sm" @tap="handleShow(index)">
							<text class="margin-right-xs" :class="item.isShowCities ? 'cuIcon-triangledownfill' : 'cuIcon-triangleupfill'"></text>
							<text>{{ item.provinceShortName }}</text>
						</view>
						<view class="basis-sm padding-xs">{{ item.currentConfirmedCount }}</view>
						<view class="basis-sm padding-xs">{{ item.confirmedCount }}</view>
						<view class="basis-sm padding-xs">{{ item.deadCount }}</view>
						<view class="basis-sm padding-xs">{{ item.curedCount }}</view>
					</view>
					<!-- 市级一下列表 -->
					<view class="cityes" v-if="item.isShowCities">
						<view class="padding-lr-xs" v-for="(cities, index1) in item.cities" :key="index1">
							<view class="flex justify-between padding-bottom-xs text-center">
								<view class="basis-sm text-cyan flex justify-end">
									<text>{{ cities.cityName }}</text>
									<text class="cuIcon-right"></text>
								</view>
								<view class="basis-sm">{{ cities.currentConfirmedCount }}</view>
								<view class="basis-sm">{{ cities.confirmedCount }}</view>
								<view class="basis-sm">{{ cities.deadCount }}</view>
								<view class="basis-sm">{{ cities.curedCount }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uCharts from './u-charts/u-charts.js';
import vSwiper from './v-swiper.vue';
import { getStatistics, getCities } from "../api/index.js"
let _self;
let canvaMap = null;
export default {
	components: {
		vSwiper
	},
	data() {
		return {
			cardCur: 0,
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			textarea: '',
			modalName: null, //dialog 弹出层
			loadiing: false,
			hbDotTitle: [{ title: '新增确诊' }, { title: '确诊' }, { title: '死亡/治愈' }, { title: '病死率' }, { title: '治愈率' }],
			qunguoDotTitle: [{ title: '新增疑似/新增确诊' }, { title: '确诊/疑似' }, { title: '死亡/治愈' }, { title: '病死率/治愈率' }],
			quanguoTrendChart: [], //全国的疫情走势图
			hbFeiHbTrendChart: [], //湖北的疫情走势图
			dataed: [
				{ bgColor: 'bg-red', title: '确诊病例', num: 37254, num_sub: 2657 },
				{ bgColor: 'bg-yellow', title: '疑似人数', num: 37254, num_sub: 2657 },
				{ bgColor: 'bg-grey', title: '死亡人数', num: 37254, num_sub: 2657 },
				{ bgColor: 'bg-green', title: '治愈人数', num: 37254, num_sub: 2657 }
			],
			areaTableData: [], //数据
			areaTitle: [
				{ name: '地区', bgColor: 'bg-cyan' },
				{ name: '现存确诊', bgColor: 'bg-red' },
				{ name: '累计确诊', bgColor: 'bg-pink' },
				{ name: '死亡', bgColor: 'bg-grey' },
				{ name: '治愈', bgColor: 'bg-green' }
			]
		};
	},
	created() {
		this.getData();
		this.getTableData();
		_self = this;
		//#ifdef MP-ALIPAY
		uni.getSystemInfo({
			success: function(res) {
				if (res.pixelRatio > 1) {
					//正常这里给2就行，如果pixelRatio=3性能会降低一点
					//_self.pixelRatio =res.pixelRatio;
					_self.pixelRatio = 2;
				}
			}
		});
		//#endif
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(750);
		this.getServerData();
	},
	methods: {
		async getData() {
		    const res = await getStatistics();
			this.dataed[0].num = res.confirmedCount; //现确诊数
			this.dataed[0].num_sub = res.confirmedIncr; //较比昨天增长数
			this.dataed[1].num = res.suspectedCount; //疑诊数
			this.dataed[1].num_sub = res.suspectedIncr; //较比昨天疑诊增加数
			this.dataed[2].num = res.deadCount; //死亡数
			this.dataed[2].num_sub = res.deadIncr; //较昨天死亡增加数
			this.dataed[3].num = res.curedCount; //治愈人数
			this.dataed[3].num_sub = res.curedIncr; //较比昨天治愈人数增长数
			// 走势图
			this.quanguoTrendChart = res.quanguoTrendChart; //全国疫情走势图
			this.hbFeiHbTrendChart = res.hbFeiHbTrendChart; //湖北疫情走势图
			this.loadiing = true;
		},
		// 显示数据说明的弹出层
		showModal(e) {
			this.modalName = e.currentTarget.dataset.target;
		},
		// 关闭数据说明的弹出层
		hideModal() {
			this.modalName = null;
		},
		handleShow(index) {
			this.areaTableData[index].isShowCities = !this.areaTableData[index].isShowCities;
		},
		// 请求获取疫情地区表单数据
		async getTableData() {
			const res = await getCities();
			console.log(res, 5544441)
			res.newslist.map(item => {
				item.isShowCities = false;
				return item;
			});
			this.areaTableData = res.newslist;
		},
		// 获取疫情地球数据
		async getServerData() {
			let cMap = { series: [] };
			await uni.request({
				url: 'https://www.zhouxuanyu.com/map.json',
				dataType: 'json',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				success: async function(res) {
					cMap.series = res.data.features;
					
					const citiesData = await getCities();
					let datas = citiesData.newslist;
					let series = cMap.series.map(province => {
						for (var i = 0; i < datas.length; i++) {
							if (datas[i].provinceName === province.properties.name) {
								return { ...province, ...datas[i] };
							}
						}
						return province;
					});
					cMap.series = series;
					_self.$nextTick(() => {
						_self.showMap('canvasMap', cMap);
					});
				},
				fail: () => {
					_self.tips = '网络错误，小程序端请检查合法域名';
				}
			});
		},
		showMap(canvasId, chartData) {
			console.log('ucharts初始化成功');
			canvaMap = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'map',
				fontSize: 10,
				padding: [0, 0, 0, 0],
				legend: {
					show: false
				},
				// colors: ['#f59e83','#ffffff', '#4f070d', '#e55a4e', '#fdebcf', '#cb2a2f'],
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				series: chartData.series,
				dataLabel: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					map: {
						border: true,
						borderWidth: 1,
						borderColor: '#666666',
						fillOpacity: 1
					}
				},
				enableMarkLine: true,
				animation: true
			});
		},
		touchMap(e) {
			console.log(canvaMap);
			canvaMap.showToolTip(e, {
				format: function(item) {
					return `${item.properties.name}: 确诊${item.confirmedCount}人`;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.map-page {
	padding-bottom: 100upx;
	.qiun-charts {
		width: 750upx;
		height: 700upx;
		background-color: #ffffff;
		.charts {
			width: 750upx;
			height: 700upx;
			background-color: #ffffff;
		}
	}
	.swiper-container {
		position: relative;
		.pre {
			position: absolute;
			top: 35%;
			left: 10upx;
			width: 60upx;
			height: 60upx;
			border-radius: 50%;
		}
		.next {
			position: absolute;
			top: 35%;
			right: 10upx;
			width: 60upx;
			height: 60upx;
			border-radius: 50%;
		}
	}
}
</style>
