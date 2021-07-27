<template>
	<view class="content">
		<view class="data-list" v-if="list.length>0">
			<view class="list-item" v-for="item in list" @click="navTo" :data-id="item.id">
				<view class="list-item-lt" :class="item.type==1 ? 'item-add' :''">
					<!-- <image src="../../static/l1.png"></image> -->
					<image :src="`../../static/l${is}.png`"></image>
				</view>
				<view class="list-item-rt">
					<view class="item-title">{{item.title}}</view>
					<view class="item-date">{{item.date}}</view>
				</view>
			</view>

			<!-- <view class="list-item" @click="navTo">
				<view class="list-item-lt item-add">
					<image src="../../static/l2.png"></image>
				</view>
				<view class="list-item-rt">
					<view class="item-title">海浪Ⅳ级警报（蓝色）</view>
					<view class="item-date">2021-05-07 10:00</view>
				</view>
			</view>

			<view class="list-item" @click="navTo">
				<view class="list-item-lt item-add">
					<image src="../../static/l3.png"></image>
				</view>
				<view class="list-item-rt">
					<view class="item-title">海浪Ⅳ级警报（蓝色）</view>
					<view class="item-date">2021-05-07 10:00</view>
				</view>
			</view>
			<view class="list-item" @click="navTo">
				<view class="list-item-lt item-add">
					<image src="../../static/l4.png"></image>
				</view>
				<view class="list-item-rt">
					<view class="item-title">海浪Ⅳ级警报（蓝色）</view>
					<view class="item-date">2021-05-07 10:00</view>
				</view>
			</view> -->
		</view>

		<!-- 无数据时显示 -->
		<view class="isView" v-if="list.length<=0">
			<image src="../../static/22.png"></image>
			<view>暂无数据</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is: null,
				region: "",
				pagenumber: 1,
				pagesize: 10,
				list: [],
				isBottom: true
			}
		},
		onLoad: function(option) {
			this.is = option.is;
			uni.getStorage({
				key: 'reg',
				success: (res => {
					this.region = res.data.text;
					this.list = [];
					this.getList();
				})
			});
		},
		onShow() {},
		onReachBottom: function() {
			let isBottom = this.isBottom;
			if (isBottom == false) {
				uni.showToast({
					title: '已经到底啦',
					icon: "none"
				})
				return false;
			};
			let pagenumber = this.pagenumber;
			pagenumber++
			this.pagenumber = pagenumber;
			this.getList();
		},
		methods: {
			getList: function() {
				this.http({
					url: this.urls.getArtList,
					data: {
						type: this.is,
						region: this.region,
						pagenumber: this.pagenumber,
						pagesize: this.pagesize
					}
				}).then(res => {
					let data = res.data;
					data.length <= 0 ? this.isBottom = false : this.list = [...this.list, ...data];
				}).catch(err => {

				});
			},
			navTo: function(e) {
				console.log(e)
				let id = e.currentTarget.dataset.id;
				let is = this.is;
				var url = is == 3 ? `../route/index?id=${id}` : `../text/index?id=${id}`;
				uni.navigateTo({
					url: url
				})
			}
		}
	};
</script>

<style scoped>
	.content {
		box-sizing: border-box;
		overflow: hidden;
	}

	.data-list {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #fff;
		margin-top: 20rpx;
	}

	.list-item {
		width: 100%;
		height: 120rpx;
		border-bottom: 1rpx solid #E5E5E5;
		display: flex;
	}

	.list-item-lt {
		width: 64rpx;
		height: 64rpx;
		border-radius: 10rpx;
		overflow: hidden;
		background-color: #B6B9C1;
		align-self: center;
		display: flex;
		justify-content: center;
	}

	.item-add {
		background-color: #3160D9;
	}

	.list-item-lt image {
		width: 32rpx;
		height: 32rpx;
		align-self: center;
	}

	.list-item-rt {
		padding: 30rpx 0;
		box-sizing: border-box;
		margin-left: 30rpx;
	}

	.item-title {
		color: #222222;
		font-size: 28rpx;
		line-height: 37rpx;
	}

	.item-date {
		color: #999999;
		font-size: 20rpx;
		line-height: 26rpx;
	}

	/* 无数据时显示 */
	.isView {
		width: 100%;
		color: #C3C7D1;
		font-size: 28rpx;
		padding-top: 210rpx;
		box-sizing: border-box;
	}

	.isView image {
		display: block;
		width: 200rpx;
		height: 120rpx;
		margin: 0 auto;
	}

	.isView view {
		text-align: center;
		margin-top: 20rpx;
	}
</style>
