<template>
	<view class="panel">
		<view class="chart-with-img" v-for="chart in charts" :key="chart.id">
			<image mode="aspectFit" :src="`../../static/icons/${chart.id}.png`" @click="open(chart.id)"></image>
			{{ chart.name }}
		</view>
		<view class="chart-without-img" v-for="chart in chartsWithoutImg" :key="chart.id">
			<button @click="open(chart.id)">{{ chart.name }}</button>
		</view>
	</view>
</template>

<script>
export default {
	onShareAppMessage() {
		return {
			title: 'ECharts 可以在 uni-app 中使用啦！',
			path: '/pages/index/index',
			success: function() {},
			fail: function() {}
		}
	},
	data() {
		return {
			charts: [
				{
					id: 'bar',
					name: '柱状图'
				},
				{
					id: 'scatter',
					name: '散点图'
				},
				{
					id: 'pie',
					name: '饼图'
				},
				{
					id: 'line',
					name: '折线图'
				},
				{
					id: 'funnel',
					name: '漏斗图'
				},
				{
					id: 'gauge',
					name: '仪表盘'
				},
				{
					id: 'k',
					name: 'K 线图'
				},
				{
					id: 'radar',
					name: '雷达图'
				},
				{
					id: 'heatmap',
					name: '热力图'
				},
				{
					id: 'tree',
					name: '树图'
				},
				{
					id: 'treemap',
					name: '矩形树图'
				},
				{
					id: 'sunburst',
					name: '旭日图'
				},
				{
					id: 'map',
					name: '地图'
				},
				{
					id: 'graph',
					name: '关系图'
				},
				{
					id: 'boxplot',
					name: '箱型图'
				},
				{
					id: 'parallel',
					name: '平行坐标图'
				},
				{
					id: 'sankey',
					name: '桑基图'
				},
				{
					id: 'themeRiver',
					name: '主题河流图'
				}
			],
			chartsWithoutImg: [
				{
					id: 'lazyLoad',
					name: '延迟加载图表'
				},
				{
					id: 'multiCharts',
					name: '一个页面中多个图表'
				},
				{
					id: 'move',
					name: '页面不阻塞滚动'
				},
				{
					id: 'saveCanvas',
					name: '保存 Canvas 到本地文件'
				},
				{
					id: 'themeColor',
					name: '多主题色'
				}
			]
		}
	},
	methods: {
		open(id) {
			uni.navigateTo({
				url: `../${id}/index`
			})
		}
	}
}
</script>

<style>
.panel {
	display: block;
	margin-top: 10px;
}

.panel .chart-with-img {
	display: inline-block;
	width: 25%;
	margin: 10px 4%;
	text-align: center;
}

.chart-with-img image {
	box-sizing: border-box;
	width: 100%;
	height: 100px;
	padding: 20px;
	background-color: #f3f3f3;
	border: 1px solid #eee;
	display: block;
	margin: 0 auto;
	margin-bottom: 10px;
}

.chart-without-img {
	display: block;
	width: 92%;
	margin: 10px 4%;
	border: none;
	border-radius: 0;
}

.chart-without-img button {
	text-align: left;
}
</style>
