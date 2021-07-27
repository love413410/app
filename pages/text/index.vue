<template>
	<view class="text">
		<view class="title">{{title}}</view>
		<view class="sub-title">
			<text class="item">{{time}}</text>
			<text>{{unit}}</text>
		</view>
		<view class="text-center">
			<rich-text :nodes="content"></rich-text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: "",
				time: "",
				unit: "",
				content: ""
			}
		},
		onLoad: function(option) {
			this.id = option.id;
			this.getHtml();
		},
		methods: {
			getHtml: function() {
				this.http({
					url: this.urls.getHtml,
					data: {
						id: this.id
					}
				}).then(res => {
					this.title = res.title;
					this.time = res.time;
					this.unit = res.unit;
					this.content = res.content;
				}).catch(err => {

				});
			}
		}
	}
</script>

<style scoped>
	.text {
		padding: 0 60rpx 120rpx 60rpx;
		background: #fff;
		overflow: hidden;
	}

	.title {
		color: #222222;
		font-size: 30rpx;
		font-weight: bold;
		text-align: center;
		margin: 45rpx 0rpx;
	}

	.sub-title {
		color: #999999;
		font-size: 20rpx;
		text-align: center;
		margin-bottom: 30rpx;
	}

	.sub-title .item {
		margin-right: 40rpx;
	}

	.text-center {
		color: #333333;
		font-size: 24rpx;
		line-height: 46rpx;
		text-indent: 48rpx;
	}
</style>
