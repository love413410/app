<template>
	<view class="content">
		<view class="date-list" v-if="list.length>0">
			<view class="date-item" v-for="item in list">
				<view class="item-title">
					<!-- <view>2021-06-25</view>
					<view class="date-time">预报:2021-06-21</view> -->
					预报:{{item.prediction_date}}
				</view>
				<view class="item-center">
					<view>
						<image src="../../static/8.png"></image>
						<text>{{item.el_lg}}m</text>
					</view>
					<view>
						<image src="../../static/9.png"></image>
						<text>{{item.el_hw}}°C</text>
					</view>
					<view>
						<image src="../../static/10.png"></image>
						<text>{{item.el_sc}}km</text>
					</view>
					<view>
						<image src="../../static/11.png"></image>
						<text>{{item.el_tq}}</text>
					</view>
				</view>
				<view class="item-foot">
					{{item.unit}} {{item.release_date}} 发布
				</view>
			</view>
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
				region: "",
				pagenumber: 1,
				pagesize: 10,
				list: [],
				is: true
			}
		},
		onShow() {

		},
		onLoad() {
			uni.getStorage({
				key: 'reg',
				success: (res => {
					this.region = res.data.text;
					this.getList();
				})
			});
		},
		onReachBottom: function() {
			let is = this.is;
			if (is == false) {
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
					url: this.urls.dataList,
					data: {
						region: this.region,
						pagenumber: this.pagenumber,
						pagesize: this.pagesize
					}
				}).then(res => {
					let data = res.data;
					data.length <= 0 ? this.is = false : this.list = [...this.list, ...data];
				}).catch(err => {

				});
			}
		}
	}
</script>

<style scoped>
	.date-list {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		overflow: hidden;
	}

	.date-item {
		width: 100%;
		border-radius: 20rpx;
		overflow: hidden;
		background: #FFFFFF;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		margin-bottom: 20rpx;
	}

	.item-title {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: right;
		color: #FFFFFF;
		font-size: 30rpx;
		background-color: #3160D9;
		padding: 0 30rpx;
		box-sizing: border-box;
		/* display: flex; */
	}

	.item-title view {
		width: 50%;
	}

	.item-title .date-time {
		text-align: right;
		font-size: 20rpx;
	}

	.item-center {
		background-color: #fff;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
	}

	.item-center view {
		width: 50%;
		height: 80rpx;
		line-height: 80rpx;
		color: #222222;
		font-size: 28rpx;
		display: flex;
	}

	.item-center image {
		align-self: center;
		width: 36rpx;
		height: 36rpx;
		margin-right: 14rpx;
	}

	.item-foot {
		height: 50rpx;
		line-height: 50rpx;
		text-align: right;
		color: #999999;
		font-size: 20rpx;
		border-top: 1rpx solid #E5E5E5;
		padding: 0 25rpx;
		box-sizing: border-box;
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
