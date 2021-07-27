<template>
	<view class="contents">
		<view class="nav-list">
			<view class="nav-item">
				<view :class="img1==8 ? 'nav-add' :''" @click="navAdd" data-key="img1" data-val="8" data-idx="1">
					<image :src="`../../static/${img1}.png`"></image>
					<text>海浪</text>
				</view>
			</view>
			<view class="nav-item">
				<view :class="img2==9 ? 'nav-add' :''" @click="navAdd" data-key="img2" data-val="9" data-idx="2">
					<image :src="`../../static/${img2}.png`"></image>
					<text>海温</text>
				</view>
			</view>
			<view class="nav-item">
				<view :class="img3==30 ? 'nav-add' :''" @click="navAdd" data-key="img3" data-val="30" data-idx="3">
					<image :src="`../../static/${img3}.png`"></image>
					<text>水位</text>
				</view>
			</view>
		</view>

		<view class="nav-center">
			<qiunDataCharts :type="type" canvas2d canvasId="bhCharts" :opts="option" :chartData="chartData"
				:ontouch="true" />
		</view>

		<view class="data-list" v-if="home">
			<view class="data-head">
				<view>{{date}}</view>
				<view>{{unit}}</view>
			</view>
			<scroll-view scroll-x class="scroll-nav">
				<view class="list-head">
					<view class="head-item">时间</view>
					<view class="head-item">浪高(m) </view>
					<view class="head-item"> 浪向</view>
					<view class="head-item">浪周期(s)</view>
					<view class="head-item"> 海温(°C) </view>
					<view class="head-item"> 天文潮(cm) </view>
					<view class="head-item">增水(cm) </view>
					<view class="head-item">潮位(cm)</view>
				</view>
				<view class="list-center">
					<view class="center-item" v-for="item in list">
						<view>{{item.time}}</view>
						<view>{{item.el_lg}}</view>
						<view>{{item.el_lx}}</view>
						<view>{{item.el_lzq}}</view>
						<view>{{item.el_hw}}</view>
						<view>{{item.el_twc}}</view>
						<view>{{item.el_zs}}</view>
						<view>{{item.el_cw}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import qiunDataCharts from "../../components/qiun-data-charts/qiun-data-charts.vue";
	export default {
		components: {
			qiunDataCharts
		},
		props: {
			stage: {
				type: Number,
				default: ""
			},
			home: {
				type: Boolean,
				value: false
			},
		},
		watch: {
			stage: function(n, o) {
				this.stage = n;
				this.getLineFn();
				this.getList();
			}
		},
		data() {
			return {
				region: "",
				idx: 1,
				img1: 8,
				img2: 20,
				img3: 21,
				type: "area",
				chartData: {},
				option: {},
				min: 0,
				max: 0,
				list: [],
				date: "",
				unit: "",
				timeout: null
			}
		},
		methods: {
			navAdd: function(e) {
				const _this = this;
				var key = e.currentTarget.dataset.key;
				var val = e.currentTarget.dataset.val;
				var idx = e.currentTarget.dataset.idx;
				idx == 3 ? this.type = "line" : this.type = "area";
				this.idx = idx;
				this.img1 = 31;
				this.img2 = 20;
				this.img3 = 21;
				this[key] = val;
				clearTimeout(this.timeout);
				this.timeout = setTimeout(function() {
					return _this.getLineFn();
				}, 500);
			},
			getLineFn: function() {
				this.http({
					url: this.urls.line,
					data: {
						type: this.idx,
						region: this.region,
						stage: this.stage
					}
				}).then(res => {
					var idx = this.idx;
					this.max = Math.round(res.max * 1.2);
					let mul = res.min <= 0 ? 1.2 : 0.8;
					this.min = Math.floor(res.min * mul);
					var format = "hailang";
					if (idx == 1) {
						format = "hailang";
					} else if (idx == 2) {
						format = "haiwen";
					} else {
						format = "shuiwei";
					};
					for (var i = 0; i < res.data.series.length; i++) {
						res.data.series[i].format = format
					};
					var chartData = JSON.parse(JSON.stringify(res.data));
					this.chartData = chartData;
					idx == 3 ? this.hand_sw() : this.hand_hl();
				}).catch(err => {

				});
			},
			// 海浪和海温的图形报表
			hand_hl: function() {
				var _this = this;
				let option = {
					"type": "area",
					"color": ["#3160D9"],
					"dataLabel": false,
					// "dataPointShape": false,
					"enableScroll": true,
					"canvasId": "bhCharts",
					"xAxis": {
						"axisLineColor": "#4E4E4E",
						"boundaryGap": "justify",
						"labelCount": 6,
						"fontSize": 10,
						"itemCount": 6
					},
					"yAxis": {
						"gridType": "dash",
						"dashLength": 4,
						"data": [{
							"axisLineColor": "#4E4E4E",
							"min": _this.min,
							"max": _this.max,
						}],
					},
					"extra": {
						"area": {
							"type": "curve",
							"opacity": 0.3,
							"width": 1,
							"gradient": false
						},
						"tooltip": {
							"gridType": "dash"
						}
					}
				};
				this.option = option;
				// this.data = {
				// 	categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
				// 	series: [{
				// 		name: "目标值1",
				// 		data: [35, 36, 31, 33, 13, 34]
				// 	}]
				// }
			},
			//水位的图形报表
			hand_sw: function() {
				var _this = this;
				let option = {
					"type": "line",
					"dataLabel": false,
					"enableScroll": true,
					"xAxis": {
						"disableGrid": true,
						"axisLineColor": "#4E4E4E",
						"labelCount": 6,
						"fontSize": 10,
						"itemCount": 4,
					},
					"yAxis": {
						"gridType": "dash",
						"dashLength": 4,
						"data": [{
							"axisLineColor": "#4E4E4E",
							"boundaryGap": "center",
							"labelCount": 6,
							"fontSize": 10,
							"min": _this.min,
							"max": _this.max,
						}]
					},
					"extra": {
						"area": {
							"type": "curve",
							"width": 1
						},
						"tooltip": {
							"gridType": "dash"
						}
					}
				};
				this.option = option;
				// this.data = {
				// 	categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
				// 	series: [{
				// 			name: "目标值1",
				// 			data: [35, 36, 31, 33, 13, 34]
				// 		},
				// 		{
				// 			name: "目标值2",
				// 			data: [40, 46, 42, 40, 48, 42]
				// 		},
				// 		{
				// 			name: "目标值3",
				// 			data: [26, 56, 34, 28, 39, 48]
				// 		}
				// 	]
				// }
			},
			//获取下半部分数据
			getList: function() {
				this.http({
					url: this.urls.jinan,
					data: {
						region: this.region,
						pagenumber: 1,
						pagesize: this.stage
					}
				}).then(res => {
					this.unit = res.unit;
					this.date = res.release_date;
					this.list = res.data;
				}).catch(err => {

				});
			}
		},
		created() {
			uni.getStorage({
				key: 'reg',
				success: (res => {
					this.region = res.data.text;
					this.getLineFn();
					this.getList();
				})
			});
		}
	}
</script>

<style scoped>
	.contents {
		overflow: hidden;
	}

	.nav-list {
		width: 100%;
		height: 90rpx;
		background: #FFFFFF;
		display: flex;
	}

	.nav-list .nav-item {
		flex: 1;
		height: 90rpx;
	}

	.nav-item>view {
		display: flex;
		height: 90rpx;
		line-height: 90rpx;
		color: #C4C4C4;
		font-size: 32rpx;
		justify-content: center;
	}

	.nav-item>.nav-add {
		color: #3160D9;
		font-size: 32rpx;
	}

	.nav-item image {
		width: 36rpx;
		height: 36rpx;
		align-self: center;
		margin-right: 10rpx;
	}

	.nav-center {
		width: 100%;
		height: 500rpx;
		background-color: #fff;
		margin-top: 1px;
	}

	.data-head {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 25rpx;
		box-sizing: border-box;
		color: #222222;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
	}

	.scroll-nav {
		width: 100%;
		white-space: nowrap;
	}

	.list-head {
		height: 80rpx;
	}

	.head-item {
		display: inline-block;
		width: 120rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 22rpx;
		padding: 0 15rpx;
		background-color: #3160D9;
	}

	.center-item>view {
		display: inline-block;
		width: 120rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #222222;
		font-size: 20rpx;
		padding: 0 15rpx;
		background-color: #fff;
	}

	.center-item:nth-child(2n)>view {
		background-color: #F1F3F6;
	}
</style>
