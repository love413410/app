<template>
	<view class="content">
		<view class="head">
			<view class="head-lt" data-url="../region/index" @click="toRou">
				<image src="../../static/1.png"></image>
				<view class="head-reg">{{region}}</view>
				<image class="head-img" src="../../static/2.png"></image>
			</view>
		</view>

		<view class="nav-list">
			<view class="nav-item" @click="rouTo" data-is="1">
				<image src="../../static/27.png"></image>
				<view class="nav-text">海浪</view>
			</view>
			<view class="nav-item" @click="rouTo" data-is="2">
				<image src="../../static/28.png"></image>
				<view class="nav-text">风暴潮</view>
			</view>
			<view class="nav-item" @click="rouTo" data-is="4">
				<image src="../../static/34.png"></image>
				<view class="nav-text">海洋预警</view>
			</view>
			<!-- <view class="nav-item" @click="rouTo" data-is="5">
				<image src="../../static/34.png"></image>
				<view class="nav-text">测试页面</view>
			</view> -->
			<!-- #ifdef APP-PLUS -->
			<!-- <view class="nav-item" @click="rouTo" data-is="3">
				<image src="../../static/29.png"></image>
				<view class="nav-text">台风路径</view>
			</view> -->
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				region: "",
			}
		},
		onShow() {
			uni.getStorage({
				key: 'reg',
				success: (res => {
					this.region = res.data.text;
				})
			});
		},
		methods: {
			rouTo: function(e) {
				let is = e.currentTarget.dataset.is;
				var url = is == 5 ? '../test/index' : `../list/index?is=${is}`;
				uni.navigateTo({
					url: url
				})
				// let is = e.currentTarget.dataset.is;
				// uni.navigateTo({
				// 	url: '../list/index?is=' + is,
				// })
			},
			toRou: function(e) {
				let url = e.currentTarget.dataset.url;
				uni.navigateTo({
					url: url,
					success: function(res) {
						console.log(res)
					},
					error: function(err) {
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style scoped>
	.content {
		padding-top: 80rpx;
		box-sizing: border-box;
	}

	/*#ifdef H5*/
	.content {
		padding-top: var(--window-top);
		box-sizing: border-box;
	}

	/*#endif*/


	.head {
		width: 100%;
		height: 80rpx;
		padding: 0 25rpx;
		box-sizing: border-box;
		display: flex;
		background-color: #fff;
		position: fixed;
		left: 0;
		top: var(--window-top);
		z-index: 22;
	}

	.head-lt {
		width: 100%;
		display: flex;
	}

	.head-lt image {
		width: 25rpx;
		height: 35rpx;
		align-self: center;
	}

	.head-lt .head-reg {
		height: 80rpx;
		line-height: 80rpx;
		color: #3160D9;
		font-size: 28rpx;
		margin: 0 12rpx;
	}

	.head-lt .head-img {
		width: 14rpx;
		height: 26rpx;
	}

	.nav-list {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.nav-item {
		width: 100%;
		height: 270rpx;
		background: rgba(0, 0, 0, 0.1);
		border-radius: 20rpx;
		overflow: hidden;
		margin: 20rpx 0;
		position: relative;
	}

	.nav-item image {
		width: 100%;
		height: 100%;
	}

	.nav-item .nav-text {
		color: #3160D9;
		font-size: 30rpx;
		font-weight: bold;
		position: absolute;
		left: 20rpx;
		bottom: 20rpx;
		background: rgba(255, 255, 255, 0.6);
		border-radius: 10rpx;
		padding: 9rpx 25rpx;
		box-sizing: border-box;
	}
</style>
