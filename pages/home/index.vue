<template>
	<view class="content">
		<view class="head">
			<!-- region -->
			<view class="head-lt" data-url="../region/index" @click="rouTo">
				<image src="../../static/1.png"></image>
				<view class="head-reg">{{region}}</view>
				<image class="head-img" src="../../static/2.png"></image>
			</view>
			<view class="head-rt">
				<view class="head-reg">{{times}}更新</view>
				<!-- <image src="../../static/3.png" @click="loadFn"></image> -->
			</view>
		</view>
		<view class="data">
			<view class="data-lt">
				<view class="data-el">
					<image src="../../static/4.png"></image>
					海浪
				</view>
				<view class="data-list">
					<text>最大值</text>
					<text>{{hl_max}}m</text>
				</view>
				<view class="data-list">
					<text>最大值</text>
					<text>{{hl_min}}m</text>
				</view>
			</view>

			<view class="data-ct">
				<view class="data-el">
					<image src="../../static/5.png"></image>
					海温
				</view>
				<view class="data-list">
					<text>最大值</text>
					<text>{{hw_max}}°C</text>
				</view>
				<view class="data-list">
					<text>最大值</text>
					<text>{{hw_min}}°C</text>
				</view>
			</view>

			<view class="data-rt">
				<view class="data-el">
					<image src="../../static/6.png"></image>
					水位
				</view>
				<view class="data-list">
					<text>最大值</text>
					<text>{{sw_max}}cm</text>
				</view>
				<view class="data-list">
					<text>最大值</text>
					<text>{{sw_min}}cm</text>
				</view>
			</view>
		</view>
		<jinan :stage="stage"></jinan>
		<view class="more" data-url="../homeItem/index" @click="rouTo">
			查看更多 >>
		</view>
		<view class="date-head">
			海洋预报
		</view>
		<view class="date-list">
			<view class="date-item" v-for="item in list">
				<view class="item-title">
					<!-- <view>测试</view>
					<view class="date-time">预报:{{item.prediction_date}}</view> -->
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

		<view class="more" data-url="../haidao/index" @click="rouTo" v-if="list.length>0">
			查看更多 >>
		</view>

	</view>
</template>

<script>
	import jinan from "../../component/jinan/index.vue";
	export default {
		components: {
			jinan
		},
		data() {
			return {
				region: null,
				stage: 24,
				date: null,
				times: "",
				hl_max: "",
				hl_min: "",
				hw_max: "",
				hw_min: "",
				sw_max: "",
				sw_min: "",
				list: []
			}
		},
		onLoad() {

		},
		onShow() {
			const date = new Date();
			// 获取今天日期
			let y = date.getFullYear();
			let m = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
			let d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
			let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();;
			let n = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();;

			this.date = `${y}-${m}-${d}`;
			this.times = `${m}-${d} ${h}:${n}`;
			uni.getStorage({
				key: 'reg',
				success: (res => {
					this.region = res.data.text;
					this.getData();
					this.getList();
				})
			});
			// this.getList();
		},
		methods: {
			getData: function() {
				this.http({
					url: this.urls.getElVal,
					data: {
						time: this.date,
						region: this.region
					}
				}).then(res => {
					var data = res.data;
					this.hl_max = data.hl_max;
					this.hl_min = data.hl_min;

					this.hw_max = data.hw_max;
					this.hw_min = data.hw_min;

					this.sw_max = data.sw_max;
					this.sw_min = data.sw_min;

				}).catch(err => {

				});
			},
			getList: function() {
				this.http({
					url: this.urls.dataList,
					data: {
						region: this.region,
						pagenumber: 1,
						pagesize: 3
					}
				}).then(res => {
					this.list = res.data;
				}).catch(err => {

				});
			},
			rouTo: function(e) {
				let url = e.currentTarget.dataset.url;
				uni.navigateTo({
					url: url
				})
			},
			loadFn: function() {
				// onLoad();
			}

		}
	}
</script>

<style scoped>
	.content {
		background-color: #F0EFEF;
	}

	.head {
		width: 100%;
		height: 80rpx;
		padding: 0 25rpx;
		box-sizing: border-box;
		display: flex;
		background-color: #fff;
	}

	.head-lt {
		width: 50%;
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

	.head-rt {
		width: 50%;
		display: flex;
		justify-content: flex-end;
	}

	.head-rt .head-reg {
		height: 80rpx;
		line-height: 80rpx;
		color: #3160D9;
		font-size: 28rpx;
	}

	.head-rt image {
		width: 42rpx;
		height: 34rpx;
		align-self: center;
		margin-left: 12rpx;
	}

	.data {
		width: 100%;
		margin-top: 10rpx;
		padding: 25rpx 20rpx 60rpx 20rpx;
		box-sizing: border-box;
		background: linear-gradient(130.4deg, #5CBBFF 31.26%, #3160D9 83.58%);
		display: flex;
		justify-content: space-between;
	}

	.data>view {
		flex: 1;
		height: 100%;
		margin: 0 10rpx;
	}

	.data-el {
		height: 70rpx;
		line-height: 70rpx;
		color: #fff;
		font-size: 32rpx;
		margin-bottom: 20rpx;
		display: flex;
	}

	.data-el image {
		width: 32rpx;
		height: 32rpx;
		margin: 0 10rpx;
		align-self: center;
	}

	.data .data-list {
		color: #fff;
		font-size: 24rpx;
		line-height: 32rpx;
		display: flex;
		justify-content: space-between;
	}

	/* 查看更多 */
	.more {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #3160D9;
	}

	.date-head {
		color: #222222;
		font-size: 30rpx;
		font-weight: bold;
		line-height: 80rpx;
		text-indent: 30rpx;
	}

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
</style>
