<template>
	<view class="real-data-page">
		<view class="loadiing" v-if="!loading">
			<view class="cu-load load-modal">
				<image src="https://ncov.zhouxuanyu.com/logo.png" mode="widthFix"></image>
				<view class="gray-text">加载中...</view>
			</view>
		</view>
		<view v-if="loading">
			<!-- 顶部导航 -->
			<cu-custom bgColor="bg-blue" :isBack="false"><block slot="content">实时数据</block></cu-custom>
			<image src="https://img1.dxycdn.com/2020/0314/863/3401956761707181858-2.png" mode="widthFix" style="width: 100%;"></image>
			<!-- 实时播放 -->
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-titles text-blue"></text>
					<text class="text-xl text-bold">实时播报</text>
				</view>
			</view>
			<!-- 列表 -->
			<view class="cu-timeline">
				<view class="cu-item" v-for="(item, index) in newData" :key="index">
					<view class="content">
						<view class="cu-capsule radius">
							<view class="cu-tag bg-blue">{{ item.pubDateStr }}</view>
							<view class="cu-tag line-blue">2-10 10:38</view>
						</view>
						<view class="margin-top-xs">
							<view class="title text-black text-bold">{{ item.title }}</view>
							<view class="text-sm text-gray">{{ item.summary }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			newData: [] //数据
		};
	},
	created() {
		this.getData();
	},
	methods: {
		getData() {
			uni.request({
				method: 'GET',
				url: 'http://121.42.14.221:3002/Timeline',
				success: res => {
					setTimeout(() => {
						this.loading = true
					}, 500);
					this.newData = res.data;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.real-data-page {
	padding-bottom: 100upx;
}
.cu-timeline > .cu-item::before {
	color: #0081ff;
}
.cu-timeline > .cu-item::after {
	background-color: #0081ff;
	width: 4upx;
	border-radius: 100%;
}
</style>
