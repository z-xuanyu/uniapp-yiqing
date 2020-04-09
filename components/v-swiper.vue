<template>
	<view class="v-swiper">
		<!-- 标题 -->
		<view class="cu-bar bg-white">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue">{{ title }}</text>
				<text class="bg-blue" style="width: 2rem;" v-if="title == '全国'"></text>
				<text class="bg-blue" style="width: 5rem;" v-else></text>
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="swiper-container">
			<swiper class="screen-swiper" :circular="true" :current="cardCur" :autoplay="true" @change="handleChange" interval="5000" duration="500">
				<swiper-item v-for="(item, index) in TrendChart" :key="index"><image :src="item.imgUrl" mode="aspectFill"></image></swiper-item>
			</swiper>
			<!-- dot_title -->
			<view class="dot-title flex justify-between align-center text-center padding-sm padding-top-xl bg-white">
				<view
					class="flex-sub radius padding-lr-xs "
					:class="cardCur == index ? 'bg-blue light' : ''"
					v-for="(item, index) in dotTitle"
					:key="index"
					@tap="handleActive(index)"
				>
					{{ item.title }}
				</view>
			</view>
			<!-- pre next 轮播图切换 -->
			<view class="pre bg-grey flex justify-center align-center" @tap="hanglePre"><text class="cuIcon-back"></text></view>
			<view class="next bg-grey flex justify-center align-center" @tap="handleNext"><text class="cuIcon-right"></text></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		TrendChart: {
			type: Array
		},
		dotTitle: {
			type: Array
		},
		title: {
			type: String,
			default: '湖北/非湖北'
		}
	},
	data() {
		return {
			cardCur: 0 //轮播图初始化状态
		};
	},
	methods: {
		handleChange(e) {
			this.cardCur = e.detail.current;
		},
		// 轮播图点击切换状态
		handleActive(index) {
			this.cardCur = index;
		},
		//轮播图pre事件
		hanglePre() {
			this.cardCur--;
			if (this.cardCur < 0) {
				this.cardCur = this.TrendChart.length;
			}
		},
		// 轮播图next事件
		handleNext() {
			this.cardCur++;
			console.log(this.TrendChart.length)
			if (this.cardCur > this.TrendChart.length - 1) {
				this.cardCur = 0;
			}
		}
	}
};
</script>

<style scoped lang="scss">
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
</style>
