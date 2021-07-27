<template>
	<view class="content">
		<view class="head">
			<!-- <view hover-class="none" url="../region/region" class="head-lt"> -->
			<image src="../../static/1.png"></image>
			<view class="head-reg">余姚近岸海域</view>
			<image class="head-img" src="../../static/2.png"></image>
			<!-- </view> -->
		</view>

		<view class="map-box">
			<view class="map-head">
				<view class="map-head-lt">
					25日16时-26日04时
				</view>
				<view class="map-head-rt">
					<image src="../../static/23.png"></image>
					<view>固定地图</view>
				</view>
			</view>

			<view class="map-center">
				<map id="myMap" class="myMap" scale="5" min-scale="4" max-scale="6" enable-satellite
					:latitude="latitude" :longitude="longitude" :polygons="polygon">
				</map>
			</view>
			<view class="map-foot">
				国家海洋预报台 06-22 08:50 发布
			</view>
		</view>

		<view class="data-list">
			<view class="list-item">
				<view class="list-item-lt">
					<image src="../../static/9.png"></image>
					<view>海温</view>
				</view>
				<view class="list-item-rt">
					16.5 ～ 23.9°C
				</view>
			</view>
			<view class="list-item">
				<view class="list-item-lt">
					<image src="../../static/24.png"></image>
					<view>海温</view>
				</view>
				<view class="list-item-rt">
					16.5 ～ 23.9°C
				</view>
			</view>
			<view class="list-item">
				<view class="list-item-lt">
					<image src="../../static/25.png"></image>
					<view>海温</view>
				</view>
				<view class="list-item-rt">
					16.5 ～ 23.9°C
				</view>
			</view>
			<view class="list-item">
				<view class="list-item-lt">
					<image src="../../static/8.png"></image>
					<view>海温</view>
				</view>
				<view class="list-item-rt">
					16.5 ～ 23.9°C
				</view>
			</view>
			<view class="list-item">
				<view class="list-item-lt">
					<image src="../../static/26.png"></image>
					<view>海温</view>
				</view>
				<view class="list-item-rt">
					16.5 ～ 23.9°C
				</view>
			</view>
		</view>


		<view class="deta-list">
			<view class="deta-list-head">第1天（2021-06-25）</view>
			<view class="deta-list-text">
				06月26日08时至l」06月27日08时，渤海、黄海有0.7到1.5米的轻浪到中浪；东海、钓鱼岛附近海域、台湾以东洋面、巴士海峡、南海北部、中部有1.3到2.2米的中浪区；台湾海峡有0.8到1.5米的轻浪到中浪；南海南部0.5到1.2米的轻浪；北部湾有1.0到1.8米的轻浪到中浪；日本海有0.5到1米的轻浪；日本以南洋面有2到3米的中浪到大浪区；日本以东洋面有1.3到2米的中浪区；菲律宾以东至关岛附近洋面有0.8到1.5米的轻浪到中浪；受今年第5号强热带风暴“蔷琵”的影响，北纬27.6度，东经140.3度洋面附近有4到7米的巨浪到狂浪区。
			</view>
		</view>

		<view class="deta-list">
			<view class="deta-list-head">第2天（2021-06-25）</view>
			<view class="deta-list-text">
				06月26日08时至l」06月27日08时，渤海、黄海有0.7到1.5米的轻浪到中浪；东海、钓鱼岛附近海域、台湾以东洋面、巴士海峡、南海北部、中部有1.3到2.2米的中浪区；台湾海峡有0.8到1.5米的轻浪到中浪；南海南部0.5到1.2米的轻浪；北部湾有1.0到1.8米的轻浪到中浪；日本海有0.5到1米的轻浪；日本以南洋面有2到3米的中浪到大浪区；日本以东洋面有1.3到2米的中浪区；菲律宾以东至关岛附近洋面有0.8到1.5米的轻浪到中浪；受今年第5号强热带风暴“蔷琵”的影响，北纬27.6度，东经140.3度洋面附近有4到7米的巨浪到狂浪区。
			</view>
		</view>

		<view class="deta-list">
			<view class="deta-list-head">第3天（2021-06-25）</view>
			<view class="deta-list-text">
				06月26日08时至l」06月27日08时，渤海、黄海有0.7到1.5米的轻浪到中浪；东海、钓鱼岛附近海域、台湾以东洋面、巴士海峡、南海北部、中部有1.3到2.2米的中浪区；台湾海峡有0.8到1.5米的轻浪到中浪；南海南部0.5到1.2米的轻浪；北部湾有1.0到1.8米的轻浪到中浪；日本海有0.5到1米的轻浪；日本以南洋面有2到3米的中浪到大浪区；日本以东洋面有1.3到2米的中浪区；菲律宾以东至关岛附近洋面有0.8到1.5米的轻浪到中浪；受今年第5号强热带风暴“蔷琵”的影响，北纬27.6度，东经140.3度洋面附近有4到7米的巨浪到狂浪区。
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: 36,
				longitude: 121.40,
				polygon: [{
					points: [{
							longitude: 121.40,
							latitude: 36
						},
						{
							longitude: 123.40,
							latitude: 36
						},
						{
							longitude: 123.40,
							latitude: 40
						},
						{
							longitude: 121.40,
							latitude: 40
						}
					],
					strokeWidth: 2,
					strokeColor: "#CC9900",
				}],
				markers: []
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped>
	.content {
		padding-top: 80rpx;
		padding-right: 30rpx;
		padding-left: 30rpx;
		box-sizing: border-box;
	}

	/*#ifdef H5*/
	.content {
		padding-top: var(--window-top);
		padding-right: 30rpx;
		padding-left: 30rpx;
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
		z-index: 999;
	}

	.head-lt {
		width: 100%;
		display: flex;
	}

	.head image {
		width: 25rpx;
		height: 35rpx;
		align-self: center;
	}

	.head .head-reg {
		height: 80rpx;
		line-height: 80rpx;
		color: #3160D9;
		font-size: 28rpx;
		margin: 0 12rpx;
	}

	.head .head-img {
		width: 14rpx;
		height: 26rpx;
	}

	.map-box {
		width: 100%;
		box-shadow: 0px 4rpx 4rpx rgba(0, 0, 0, 0.25);
		border-radius: 20rpx;
		margin-top: 30rpx;
		overflow: hidden;
	}

	.map-head {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		background: #3160D9;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
	}

	.map-head-lt {
		width: 50%;
		color: #FFFFFF;
		font-size: 30rpx;
	}

	.map-head-rt {
		width: 50%;
		display: flex;
		color: #FFFFFF;
		font-size: 20rpx;
		justify-content: flex-end;
	}

	.map-head-rt image {
		width: 24rpx;
		height: 24rpx;
		align-self: center;
		margin-right: 6rpx;
	}

	.map-center {
		width: 100%;
		height: 510rpx;
	}

	.map-center .myMap {
		width: 100%;
		height: 510rpx;
	}

	.map-foot {
		width: 100%;
		height: 68rpx;
		line-height: 68rpx;
		color: #999999;
		font-size: 20rpx;
		text-align: right;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.data-list {
		width: 100%;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 0 25rpx;
		box-sizing: border-box;
		margin-top: 20rpx;
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

	.list-item-lt {
		width: 30%;
		display: flex;
	}

	.list-item-lt image {
		width: 36rpx;
		height: 36rpx;
		align-self: center;
		margin-right: 15rpx;
	}

	.list-item-rt {
		width: 70%;
		text-align: right;
	}

	/* 文本介绍 */
	.deta-list {
		width: 100%;
		box-shadow: 0px 4rpx 4rpx rgba(0, 0, 0, 0.25);
		border-radius: 20rpx;
		overflow: hidden;
		margin: 30rpx 0;
	}

	.deta-list-head {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-indent: 30rpx;
		color: #FFFFFF;
		font-size: 30rpx;
		background: #3160D9;
		border-radius: 20px 20px 0px 0px;
	}

	.deta-list-text {
		width: 100%;
		color: #333333;
		font-size: 24rpx;
		line-height: 46rpx;
		text-indent: 48rpx;
		padding: 30rpx;
		box-sizing: border-box;
		background: #fff;
	}
</style>
