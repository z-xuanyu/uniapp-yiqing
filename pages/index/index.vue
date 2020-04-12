<template>
	<view class="pages">
		<v-map v-if="PageCur == 'map'"></v-map>
		<real v-if="PageCur == 'real'"></real>
		<rumor v-if="PageCur == 'rumor'"></rumor>
		<virus v-if="PageCur == 'virus'"></virus>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="map">
				<view class="cuIcon-cu-image"><image :src="'../../static/tabbar_img/map' + [PageCur == 'map' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'map' ? 'text-blue' : 'text'">疫情地图</view>
			</view>
			<view class="action" @click="NavChange" data-cur="real">
				<view class="cuIcon-cu-image"><image :src="'../../static/tabbar_img/real' + [PageCur == 'real' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'real' ? 'text-blue' : 'text'">实时疫情</view>
			</view>
			<view class="action" @click="NavChange" data-cur="rumor">
				<view class="cuIcon-cu-image"><image :src="'../../static/tabbar_img/rumor' + [PageCur == 'rumor' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'rumor' ? 'text-blue' : 'text'">权威辟谣</view>
			</view>
			<view class="action" @click="NavChange" data-cur="virus">
				<view class="cuIcon-cu-image"><image :src="'../../static/tabbar_img/virus' + [PageCur == 'virus' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'virus' ? 'text-blue' : 'text'">病毒知识</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			PageCur: 'map' //首页默认状态
		};
	},
	methods: {
		// tabbar 底部导航
		NavChange(e) {
			this.PageCur = e.currentTarget.dataset.cur;
		}
	}
};
</script>

<style lang="scss" scoped>
.text {
	color: #707070;
}
.text-active {
	color: #d4237a;
}
</style>
