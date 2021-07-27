<template>
	<view class="contents">
		<view class="data-list" v-for="(item,index) in list" v-if="list.length>0">
			<view class="list-head">{{dateArray[index]}}</view>
			<view class="list-center">
				<view class="list-item">
					<view class="item-lt">
						<image src="../../static/9.png"></image>
						<view>海温</view>
					</view>
					<view class="item-rt">
						{{item.el_hw}}°C
					</view>
				</view>

				<view class="list-item">
					<view class="item-lt">
						<image src="../../static/26.png"></image>
						<view>浪高</view>
					</view>
					<view class="item-rt">
						{{item.el_lg}}m
					</view>
				</view>
			</view>
			<view class="list-foot">{{item.unit}} {{item.release_date}} 发布</view>
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
				dateArray: [],
				list: []
			}
		},
		created() {
			uni.getStorage({
				key: 'reg',
				success: (res => {
					this.region = res.data.text;
					this.handDate();
				})
			});
		},
		methods: {
			handDate: function() {
				const date = new Date();
				// 获取今天日期
				let t_y = date.getFullYear();
				let t_m = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				let t_d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				let t_date = `今日(${t_y}-${t_m}-${t_d})`;
				// 获取明天日期
				date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
				let b_y = date.getFullYear();
				let b_m = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				let b_d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				let b_date = `明日(${b_y}-${b_m}-${b_d})`;
				// 获取后天日期
				date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
				let a_y = date.getFullYear();
				let a_m = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				let a_d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				let a_date = `后日(${a_y}-${a_m}-${a_d})`;

				this.dateArray = [t_date, b_date, a_date];

				this.getList();
			},
			getList: function() {
				this.http({
					url: this.urls.yuchang,
					data: {
						region: this.region
					}
				}).then(res => {
					this.list = res.data;

					console.log(res)
				}).catch(err => {

				});
			}
		}
	}
</script>

<style scoped>
	.contents {
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		background: #F0EFEF;
		overflow: hidden;
	}

	.data-list {
		width: 100%;
		border-radius: 20rpx;
		overflow: hidden;
		margin: 20rpx 0;
	}

	.list-head {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		color: #FFFFFF;
		font-size: 30rpx;
		background: #3160D9;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.list-center {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.list-item {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		color: #222222;
		font-size: 28rpx;
		border-bottom: 1px solid #F0EFEF;
		display: flex;
	}

	.item-lt {
		width: 30%;
		display: flex;
	}

	.item-lt image {
		width: 36rpx;
		height: 36rpx;
		align-self: center;
		margin-right: 10rpx;
	}

	.item-rt {
		width: 70%;
		text-align: right;
	}

	.list-foot {
		width: 100%;
		height: 68rpx;
		line-height: 68rpx;
		text-align: right;
		color: #999999;
		font-size: 20rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background-color: #fff;
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
