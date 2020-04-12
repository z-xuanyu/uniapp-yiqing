<template>
	<view class="rumor-page">
		<view class="loadiing" v-if="!loading">
			<view class="cu-load load-modal">
				<image src="https://ncov.zhouxuanyu.com/logo.png" mode="widthFix"></image>
				<view class="text-sm text-bold">加载中...</view>
			</view>
		</view>
		<view v-else>
			<!-- 顶部导航 -->
			<cu-custom bgColor="bg-blue" :isBack="false"><block slot="content">辟谣</block></cu-custom>
			<!-- bannere -->
			<image src="https://img1.dxycdn.com/2020/0314/863/3401956761707181858-2.png" mode="widthFix" style="width: 100%;"></image>
			<!-- 最新辟谣 -->
			<view class="cu-bar margin-top-sm margin-lr-sm radius shadow bg-white">
				<view class="action sub-title">
					<text class="text-xl text-bold text-blue">最新辟谣</text>
					<text class="bg-gradual-blue" style="width: 3rem;"></text>
				</view>
			</view>
			<!-- 列表数据 -->
			<view class="padding-sm margin-sm radius shadow bg-blue position-relative" v-for="(item, index) in dataList" :key="index">
				<view class="text-xxl text-white padding-sm text-bold">{{ item.title }}</view>
				<view class="padding-sm margin-lr-sm bg-white radius">
					<view class="margin-bottom-xs text-blue text-bold">{{ item.mainSummary }}</view>
					<view class="margin-bottom-xs text-blue text-sm" v-show="item.isShow">{{ item.body }}</view>
					<view class="flex justify-end align-center text-gray" @tap="cardContentShow(index)">
						<text class="text-xs">{{ item.isShow ? '收起详情' : '展开详情' }}</text>
						<text :class="item.isShow ? 'cuIcon-fold' : 'cuIcon-unfold'"></text>
					</view>
				</view>
				<!-- 分享 -->
				<view class="flex justify-end btn-group bg-blue padding-lr-sm padding-top-sm">
					<button class="cu-btn bg-red round sm shadow">
						<text class="cuIcon-share margin-right-xs"></text>
						<text>分享</text>
					</button>
				</view>
				<image v-if="item.rumorType == 0" src="http://assets.dxycdn.com/gitrepo/ncov-mobile/dist/static/false@3x.02069c64.png" mode="widthFix"></image>
				<image v-if="item.rumorType == 1" src="http://assets.dxycdn.com/gitrepo/ncov-mobile/dist/static/true@3x.d2f5c6ba.png" mode="widthFix"></image>
				<image v-if="item.rumorType == 2" src="http://assets.dxycdn.com/gitrepo/ncov-mobile/dist/static/unknown@3x.7636fb34.png" mode="widthFix"></image>
			</view>
			<!-- 底部查看谣言排行榜 -->
			<view class="flex justify-between">
				<view class="flex-sub padding-sm margin-left-sm">
					<button class="round bg-orange light shadow text-bold text-ssm">
						<text>我要曝光谣言</text>
						<text class="cuIcon-right"></text>
					</button>
				</view>
				<view class="flex-sub padding-sm margin-right-sm">
					<button class="round bg-blue light shadow text-bold text-ssm">
						<text>查看谣言排行榜</text>
						<text class="cuIcon-right"></text>
					</button>
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
			dataList: []
		};
	},
	created() {
		this.getData();
	},
	methods: {
		getData() {
			uni.request({
				method: 'GET',
				url: 'http://121.42.14.221:3002/RumorList',
				success: res => {
					setTimeout(() => {
						this.loading = true;
					}, 500);
					res.data.map(item => {
						item.isShow = false;
						return item;
					});
					this.dataList = res.data;
					console.log(this.dataList);
				}
			});
		},
		cardContentShow(index) {
			this.dataList[index].isShow = !this.dataList[index].isShow;
		}
	}
};
</script>

<style lang="scss" scoped>
.rumor-page {
	padding-bottom: 120upx;
	.position-relative {
		position: relative;
		image {
			position: absolute;
			top: 0;
			right: 0;
			width: 140upx;
			height: 140upx;
		}
	}
	.text-ssm {
		font-size: 30upx;
	}
}
</style>
