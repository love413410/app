<template>
	<view class="content">
		<view class="head" catchtouchmove="ture">
			<view class="head-nav">
				<scroll-view class="scroll-nav" scroll-x="true">
					<view class="scroll-item" :class="img1==12?'scroll-add':''" @click="scrollAdd" data-key="img1"
						data-val="12" data-idx="1">
						<view>
							<image :src="`../../static/${img1}.png`"></image><!-- 12、13 -->
							<text>近岸</text>
						</view>
					</view>
					<view class="scroll-item" :class="img2==14?'scroll-add':''" @click="scrollAdd" data-key="img2"
						data-val="14" data-idx="2">
						<view>
							<image :src="`../../static/${img2}.png`"></image><!-- 14、15 -->
							<text>海岛</text>
						</view>
					</view>
					<view class="scroll-item" :class="img3==16?'scroll-add':''" @click="scrollAdd" data-key="img3"
						data-val="16" data-idx="3">
						<view>
							<image :src="`../../static/${img3}.png`"></image><!-- 16、17 -->
							<text>浴场</text>
						</view>
					</view>
					<view class="scroll-item" :class="img4==18?'scroll-add':''" @click="scrollAdd" data-key="img4"
						data-val="18" data-idx="4">
						<view>
							<image :src="`../../static/${img4}.png`"></image><!-- 18、19 -->
							<text>航线</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="head-reg">
				<view class="reg-lt" data-url="../region/index" @click="rouTo">
					<image src="../../static/1.png"></image>
					<view class="head-regs">{{region}}</view>
					<image class="head-img" src="../../static/2.png"></image>
				</view>
				<picker class="reg-rt" @change="bindPickerChange" :value="index" :range="array" v-if="idx==1">
					<view class="pick-view">
						<view>{{array[index]}}</view>
						<image class="head-img" src="../../static/2.png"></image>
					</view>
				</picker>
			</view>
		</view>
		<!-- <view class="temp-box"> -->
			<jinan :stage="stage" home v-if="idx==1"></jinan>
			<haidao v-else-if="idx==2"></haidao>
			<yuchang v-else-if="idx==3"></yuchang>
			<hangxian v-else></hangxian>
		<!-- </view> -->
		
	</view>
</template>

<script>
	import jinan from "../../component/jinan/index.vue";
	import haidao from "../../component/haidao/index.vue";
	import yuchang from "../../component/yuchang/index.vue";
	import hangxian from "../../component/hangxian/index.vue";

	export default {
		components: {
			jinan,
			haidao,
			yuchang,
			hangxian
		},
		data() {
			return {
				idx: 1,
				array: ['24小时预报', '48小时预报', '72小时预报'],
				index: 0,
				img1: 12,
				img2: 15,
				img3: 17,
				img4: 19,
				region:"",
				stage: 24,
			}
		},
		onShow(){
			uni.getStorage({
				key: 'reg',
				success: (res => {
					this.region = res.data.text;
				})
			});
		},
		methods: {
			scrollAdd: function(e) {
				let key = e.currentTarget.dataset.key;
				let val = e.currentTarget.dataset.val;
				let idx = e.currentTarget.dataset.idx;
				this.idx = idx;
				this.img1 = 13;
				this.img2 = 15;
				this.img3 = 17;
				this.img4 = 19;
				this[key] = val;
			},
			bindPickerChange: function(e) {
				let idx = e.detail.value;
				let stage = idx == 0 ? 24 : idx == 1 ? 48 : 72;
				this.index = idx;
				this.stage = stage;
			},
			rouTo: function(e) {
				let url = e.currentTarget.dataset.url;
				uni.navigateTo({
					url: url
				})
			}
		}
	};
</script>

<style scoped>
	.content {
		padding-top: 180rpx;
		box-sizing: border-box;
	}

	/*#ifdef H5*/
	/* .content {
		padding-top: 170rpx;
		box-sizing: border-box;
	} */

	/*#endif*/

	.head {
		width: 100%;
		height: 180rpx;
		background-color: #F0EFEF;
		overflow: hidden;
		position: fixed;
		left: 0;
		top: var(--window-top);
		z-index: 9999;
	}

	.head-nav {
		width: 100%;
		height: 90rpx;
		padding: 15rpx 25rpx;
		box-sizing: border-box;
	}

	.scroll-nav {
		width: 100%;
		white-space: nowrap;
	}

	.scroll-nav .scroll-item {
		display: inline-block;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border: 2rpx solid #3160D9;
		padding: 0 20rpx;
		box-sizing: border-box;
		border-radius: 30rpx;
		color: #3160D9;
		font-size: 28rpx;
		margin-right: 20rpx;
	}

	.scroll-item>view {
		display: flex;
	}

	.scroll-nav image {
		width: 36rpx;
		height: 36rpx;
		align-self: center;
		margin-right: 8rpx;
	}

	.scroll-nav .scroll-add {
		color: #FFFFFF;
		background: #3160D9;
		border: 2rpx solid #3160D9;
		box-sizing: border-box;
	}

	.head-reg {
		width: 100%;
		height: 80rpx;
		padding: 0 25rpx;
		box-sizing: border-box;
		background-color: #fff;
		display: flex;
	}

	.reg-lt {
		width: 50%;
		display: flex;
	}

	.reg-lt image {
		width: 25rpx;
		height: 35rpx;
		align-self: center;
	}

	.reg-lt .head-regs {
		height: 80rpx;
		line-height: 80rpx;
		color: #3160D9;
		font-size: 28rpx;
		margin: 0 12rpx;
	}

	.reg-lt .head-img {
		width: 14rpx;
		height: 26rpx;
	}

	.reg-rt {
		width: 50%;
		height: 80rpx;
		line-height: 80rpx;
		margin-left: 20rpx;
		color: #222222;
		font-size: 28rpx;
	}

	.reg-rt .pick-view {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	.reg-rt .head-img {
		width: 14rpx;
		height: 26rpx;
		align-self: center;
		margin-left: 12rpx;
	}
	/* .temp-box{
		width: 100%;
		margin-top: 10rpx;
	} */
</style>
