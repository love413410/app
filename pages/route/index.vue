<template>
	<view>
		<map style="width: 100%; height: 520rpx;" scale="5" min-scale="4" max-scale="6" enable-satellite
			:latitude="latitude" :longitude="longitude" :polyline="polygon" :markers="markers"></map>
		<view class="map-data">
			<view class="data-item">
				<view class="item-key" @click="navTo">风力</view>
				<view class="item-val">4级</view>
			</view>
			<view class="data-item">
				<view class="item-key">风力</view>
				<view class="item-val">4级</view>
			</view>
			<view class="data-item">
				<view class="item-key">风力</view>
				<view class="item-val">4级</view>
			</view>
		</view>
		<view class="t_name">
			<text>{{name_TF}}</text>移动速度(1H/km)
		</view>
		<view class="charts-box">
			<qiunDataCharts type="line" canvas2d canvasId="bhCharts" :opts="option" :chartData="chartData"
				:ontouch="true" :animation="isNo" @complete="complete" @getIndex="getIndex" />
		</view>
	</view>
</template>

<script>
	import qiunDataCharts from "../../components/qiun-data-charts/qiun-data-charts.vue";
	// import uCharts from '@/components/u-charts/config-ucharts.js';
	export default {
		components: {
			qiunDataCharts
		},
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
							latitude: 32
						},
						{
							longitude: 121.40,
							latitude: 32
						}, {
							longitude: 121.40,
							latitude: 35
						}
					],
					width: 1,
					color: "#3366FF",
					dottedLine:true
				}],
				markers: [{
					longitude: 121.40,
					latitude: 36,
					iconPath: '../../static/z1.png',
					width: 20,
					height: 20,
					anchor: {
						x: .5,
						y: .5
					}
				}, {
					longitude: 123.40,
					latitude: 36,
					iconPath: '../../static/z1.png',
					width: 20,
					height: 20,
					anchor: {
						x: .5,
						y: .5
					}
				}, {
					longitude: 123.40,
					latitude: 32,
					iconPath: '../../static/z1.png',
					width: 20,
					height: 20,
					anchor: {
						x: .5,
						y: .5
					}
				}, {
					longitude: 121.40,
					latitude: 32,
					iconPath: '../../static/z1.png',
					width: 20,
					height: 20,
					anchor: {
						x: .5,
						y: .5
					}
				}, {
					longitude: 121.40,
					latitude: 35,
					iconPath: '../../static/z1.png',
					width: 20,
					height: 20,
					anchor: {
						x: .5,
						y: .5
					}
				}],
				id: null, //台风ID
				name_TF: "测试",
				isNo: true,
				option: {
					"type": "line",
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
							"fontSize": 10
						}],
					},
					"legend": {
						"show": false
					},
					"extra": {
						"line": {
							"type": "curve",
							"width": 1
						},
					}
				},
				chartData: {}
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.initCharts();
		},
		methods: {
			navTo:function(){
				console.log("11")
				uni.navigateTo({
					url:"https://www.baidu.com/"
				})
			},
			initCharts: function() {
				this.chartData = {
					"categories": [
						"2016", "2017", "2018", "2019", "2020", "2021"
					],
					"series": [{
						"name": "台风",
						"data": [{
								"value": 35,
								"text": "台风名称",
								"position": "118°E/19.5°N",
								"grade": "11级",
								"dir": "南东南",
								"time": "2021-07-22 16:l0",
								"type": "热带气压(TD)"
							}, {
								"value": 8,
								"text": "台风名称",
								"position": "118°E/19.5°N",
								"grade": "11级",
								"dir": "南东南",
								"time": "2021-07-22 16:l0",
								"type": "热带气压(TD)"
							}, {
								"value": 25,
								"text": "台风名称",
								"position": "118°E/19.5°N",
								"grade": "11级",
								"dir": "南东南",
								"time": "2021-07-22 16:l0",
								"type": "热带气压(TD)"
							}, {
								"value": 37,
								"text": "台风名称",
								"position": "118°E/19.5°N",
								"grade": "11级",
								"dir": "南东南",
								"time": "2021-07-22 16:l0",
								"type": "热带气压(TD)"
							}, {
								"value": 4,
								"text": "台风名称",
								"position": "118°E/19.5°N",
								"grade": "11级",
								"dir": "南东南",
								"time": "2021-07-22 16:l0",
								"type": "热带气压(TD)"
							}, {
								"value": 20,
								"text": "台风名称",
								"position": "118°E/19.5°N",
								"grade": "11级",
								"dir": "南东南",
								"time": "2021-07-22 16:l0",
								"type": "热带气压(TD)"
							},
						]
						// "data": [35, 8, 25, 37, 4, 20]
					}]
				};
			},
			//监听第一次渲染完成,只是为了修改动画
			complete: function(e) {
				this.isNo = false;
			},
			getIndex: function(e) {
				let idx = e.currentIndex.index;
				if (idx > -1) {
					let dataItem = this.chartData.series[0].data[idx];
					let textList = [
						{text: dataItem.text,color: '#2fc25b'},
						{text: '台风类型：' + dataItem.type,color: null},
						{text: '出现时间：' + dataItem.time,color: null},
						{text: '当前位置：' + dataItem.position,color: null},
						{text: '台风风力：' + dataItem.grade,color: null},
						{text: '移动方向：' + dataItem.dir,color: null},
						{text: '移动速度：1H/' + dataItem.value+'km',color: null},
					];
					this.option = {
						"type": "line",
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
								"fontSize": 10
							}],
						},
						"legend": {
							"show": false
						},
						"extra": {
							"line": {
								"type": "curve",
								"width": 1
							},
						},
						tooltip: {
							index: idx,
							offset: {
								x: e.opts.chartData.xAxisPoints[idx] + e.opts.chartData.xAxisData.eachSpacing / 2,
								y: e.event.y,
							},
							textList: textList
						},
						update: true
					}
				}
			}
		}
	}
</script>


<style scoped>
	.map-data {
		margin-top: 10rpx;
		background-color: #fff;
	}

	.data-item {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 14px;
		padding: 0 30rpx;
		border-bottom: 1px solid #F0EFEF;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.t_name {
		height: 80rpx;
		line-height: 80rpx;
		text-indent: 20rpx;
		font-size: 30rpx;
		background-color: #f1f7ff;
	}

	.t_name text {
		color: #0093f1;
		margin-right: 10rpx;
	}

	.charts-box {
		width: 100%;
		height: 500rpx;
		background-color: #fff;
	}
</style>
