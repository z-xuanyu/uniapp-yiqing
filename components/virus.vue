<template>
	<view class="virus-page">
		<view class="loadiing" v-if="!loading">
			<view class="cu-load load-modal">
				<image src="https://ncov.zhouxuanyu.com/logo.png" mode="widthFix"></image>
				<view class="text-sm text-bold">加载中...</view>
			</view>
		</view>
		<view v-else>
			<!-- 顶部导航 -->
			<cu-custom bgColor="bg-blue" :isBack="false"><block slot="content">病毒知识</block></cu-custom>
			<!-- 标题 -->
			<view class="padding-sm bg-blue margin-lr-sm margin-top-sm radius shadow">
				<view class="title text-bold">什么是新型冠状病毒？</view>
				<view class="padding-tb-sm text-white">
					此次流行的新型冠状病毒WHO命名为2019-nCoV。哪些人容易感染新型冠状病毒？传播的途径是什么的？什么情况下属于可疑暴露？什么情况下属于亲密接触？
				</view>
			</view>
			<!-- 病毒知识 -->
			<view class="cu-bar margin-top-sm margin-lr-sm radius shadow bg-white">
				<view class="action sub-title">
					<text class="text-xl text-bold text-blue">病毒知识</text>
					<text class="bg-gradual-blue" style="width: 3rem;"></text>
				</view>
			</view>
			<!-- 列表 -->
			<view class="cu-card article" v-for="(item, index1) in data" :key="index1">
				<view class="cu-item shadow">
					<view class="title">
						<view class="text-cut">{{ item.title }}</view>
					</view>
					<view class="content">
						<image :src="item.imgUrl" mode="aspectFill"></image>
						<view class="desc">
							<view class="text-content">{{ item.description }}</view>
							<view>
								<view class="cu-tag bg-red light sm round">病毒</view>
								<view class="cu-tag bg-green light sm round">流感</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="fanhu-container">
				<!-- 防护知识 -->
				<view class="cu-bar margin-top-sm margin-lr-sm radius shadow bg-white">
					<view class="action sub-title">
						<text class="text-xl text-bold text-blue">防护知识</text>
						<text class="bg-gradual-blue" style="width: 3rem;"></text>
					</view>
				</view>
				<!-- 防护知识列表 -->
				<view class="cu-card article" v-for="(item, index2) in recommendListr" :key="index2">
					<view class="cu-item shadow padding-top-sm">
						<view class="content">
							<image :src="item.imgUrl" mode="aspectFill"></image>
							<view class="desc">
								<view class="text-content fanghu">{{ item.title }}</view>
								<view>
									<view class="cu-tag bg-red light sm round">病毒</view>
									<view class="cu-tag bg-green light sm round">流感</view>
								</view>
							</view>
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
			data: [], //病毒知识数据
			recommendListr: [], //防护列表数据
			loading: false
		};
	},
	created() {
		this.getData();
	},
	methods: {
		getData() {
			uni.request({
				method: 'GET',
				url: 'http://121.42.14.221:3002/WikiList',
				success: res => {
					this.data = res.data.result.slice(1);
				}
			});
			// 获取防护知识数据
			uni.request({
				method: 'GET',
				url: 'http://121.42.14.221:3002/fanghu',
				success: res => {
					setTimeout(() => {
						this.loading = true;
					}, 500);
					this.recommendListr = res.data;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.virus-page {
	padding-bottom: 120upx;
}
.cu-card > .cu-item {
	margin-bottom: 0;
}
</style>
