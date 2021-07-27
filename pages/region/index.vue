<template>
	<view class="contents">
		<view class="reg-head">当前区域</view>
		<view class="reg-desc">
			<view>
				<image src="../../static/1.png"></image>
				{{text}}
			</view>
		</view>

		<view class="reg-head">所有区域</view>
		<view class="reg-foot">
			<view class="reg-foot-left">请选择地区:</view>
			<view class="reg-foot-right">
				<picker mode="multiSelector" :value="regIdx" :range="regArray" range-key="text" @change="regPickFn"
					@columnchange="regChangeFn">
					<view class="uni-input">
						{{regText}}
					</view>
				</picker>
			</view>
		</view>
		<view class="reg-foot">
			<view class="reg-foot-left">请选择海域:</view>
			<view class="reg-foot-right">
				<picker mode="selector" :value="seaIndex" :range="seaArray" range-key="text" @change="seaPickFn">
					<view class="uni-input">
						{{seaText}}
					</view>
				</picker>
			</view>
		</view>

		<view class="reg-head">热门搜索</view>
		<scroll-view scroll-y class="reg-list">
			<view class="reg-item" v-for="item in sArray" @click="takeFn" :data-item="item"> {{item.text}}</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: "",
				pid: null,
				cid: null,
				did: null,
				pArray: [],
				cArray: [],
				regArray: [],
				regIdx: [0, 0],
				regText: "",
				seaArray: [],
				seaIndex: 0,
				seaText: "",
				sArray: []
			}
		},
		methods: {
			// 获取一级区域
			getPid: function() {
				this.http({
					url: this.urls.getReg1
				}).then(res => {
					var pArray = res.data;
					this.pid = pArray.length > 0 ? pArray[0].value : '';
					this.pArray = pArray;
					this.getCid();
				}).catch(err => {
					uni.showToast({
						title: '获取位置列表失败',
						icon: "error"
					});
				});
			},
			// 获取二级区域
			getCid: function() {
				this.http({
					url: this.urls.getReg2,
					data: {
						id: this.pid
					}
				}).then(res => {
					var cArray = res.data;
					this.cid = cArray.length > 0 ? cArray[0].value : '';
					this.cArray = cArray;
					var regArray = [this.pArray, this.cArray];
					var regIdx = this.regIdx;
					this.regArray = regArray;
					var regText = `${regArray[0][regIdx[0]].text},${regArray[1][regIdx[1]].text}`;
					this.regText = regText;

					this.getDid();
				}).catch(err => {
					uni.showToast({
						title: '获取位置列表失败',
						icon: "error"
					});
				});
			},
			getDid: function() {
				this.http({
					url: this.urls.getReg3,
					data: {
						id: this.cid
					}
				}).then(res => {
					var dArray = res.data;
					this.did = dArray.length > 0 ? dArray[0].value : '';
					this.seaText = dArray.length > 0 ? dArray[0].text : '未知';
					this.seaArray = dArray;
				}).catch(err => {
					uni.showToast({
						title: '获取位置列表失败',
						icon: "error"
					});
				});
			},
			// 选择地区完成后
			regPickFn: function(e) {
				var regIdx = e.detail.value;
				var regArray = this.regArray;
				var regText = `${regArray[0][regIdx[0]].text},${regArray[1][regIdx[1]].text}`;
				this.regText = regText;
				this.cid = this.cArray[regIdx[1]].value;
				this.http({
					url: this.urls.getReg3,
					data: {
						id: this.cid
					}
				}).then(res => {
					var dArray = res.data;
					this.did = dArray.length > 0 ? dArray[0].value : '';
					this.seaText = dArray.length > 0 ? dArray[0].text : '未知';
					this.seaArray = dArray;
					this.setStorage({
						text: this.seaText,
						value: this.cid
					});
				}).catch(err => {
					uni.showToast({
						title: '获取位置列表失败',
						icon: "error"
					});
				});
			},
			// 选择海域完成后
			seaPickFn: function(e) {
				let idx = e.detail.value;
				let reg = this.seaArray[idx];
				this.text = reg.text;
				this.setStorage(reg);
				// uni.setStorage({
				// 	key: 'reg',
				// 	data: reg,
				// 	success: function(res) {
				// 		console.log('默认位置存储成功');
				// 	}
				// });
			},
			//选择某一列后
			regChangeFn: function(e) {
				let idx = Number(e.detail.column); //取得几级地区
				let val = e.detail.value; //地区的下标
				this.regIdx[idx] = val;
				switch (idx) {
					case 0:
						this.pid = this.pArray[val].value;
						this.http({
							url: this.urls.getReg2,
							data: {
								id: this.pid
							}
						}).then(res => {
							var cArray = res.data;
							this.cid = cArray.length > 0 ? cArray[0].value : '';
							this.cArray = cArray;
							var regArray = [this.pArray, this.cArray];
							var regIdx = this.regIdx;
							this.regArray = regArray;
						}).catch(err => {
							uni.showToast({
								title: '获取位置列表失败',
								icon: "error"
							});
						});
						break;
					default:
						console.log("默认")
				}
			},
			//存储
			setStorage: function(data) {
				this.text = data.text;
				console.log(data)
				uni.setStorage({
					key: 'reg',
					data: data,
					// data: {
					// 	text: "珠江口内湾",
					// 	value: 1
					// },
					success: function(res) {
						console.log('默认位置存储成功');
					}
				});
			},
			// 获取热门搜索
			getHotFn: function() {
				this.http({
					url: this.urls.searches
				}).then(res => {
					this.sArray = res.data;
				}).catch(err => {

				});
			},
			takeFn: function(val) {
				let item = val.currentTarget.dataset.item;
				this.text = item.text;
				this.setStorage(item);
			}
		},
		onShow() {
			this.getPid();
			this.getHotFn();
			uni.getStorage({
				key: 'reg',
				success: (res => {
					this.text = res.data.text || "未知";
				})
			});
		}
	};
</script>

<style scoped>
	.contents {
		overflow: hidden;
	}

	.reg-head {
		height: 40rpx;
		line-height: 40rpx;
		color: #222222;
		font-size: 30rpx;
		font-weight: bold;
		margin: 40rpx 0;
		padding: 0 20rpx;
		box-sizing: border-box;
		/* margin-bottom: 60rpx; */
	}

	.reg-desc {
		width: auto;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 10px;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;

	}

	.reg-desc>view {
		color: #555555;
		font-size: 26rpx;
		/* background: #F6F6F6; */
		background: #fff;
		border-radius: 10rpx;
		padding: 0 22rpx;
		box-sizing: border-box;
		display: flex;
	}

	.reg-desc image {
		width: 25rpx;
		height: 35rpx;
		align-self: center;
		margin-right: 12rpx;
	}

	.reg-list {
		height: 300rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.reg-item {
		display: inline-block;
		height: 60rpx;
		line-height: 60rpx;
		color: #222222;
		font-size: 26rpx;
		border-radius: 10rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		background: #fff;
		margin-right: 10rpx;
		margin-bottom: 20rpx;
	}

	.reg-foot {
		width: 100%;
		height: 80rpx;
		white-space: nowrap;
		font-size: 14px;
		/* height: 600rpx; */
		margin-bottom: 10rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		background-color: #fff;
		display: flex;
		align-items: center;
	}

	.reg-foot-left {
		padding: 0 20rpx;
	}
</style>
