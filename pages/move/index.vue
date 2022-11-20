<template>
	<view class="move-container">
		<uni-chart :option="opt" />
		<view class="text">
			<text>这是一个展示页面不被图表阻塞的例子</text>
			<text>在图表区域（红色边框）之外可以滚动</text>
		</view>
		<view class="text">
			<text>这是一个展示页面不被图表阻塞的例子</text>
			<text>在图表区域（红色边框）之外可以滚动</text>
		</view>
		<view class="text">
			<text>这是一个展示页面不被图表阻塞的例子</text>
			<text>在图表区域（红色边框）之外可以滚动</text>
		</view>
		<view class="text">
			<text>这是一个展示页面不被图表阻塞的例子</text>
			<text>在图表区域（红色边框）之外可以滚动</text>
		</view>
		<view class="text">
			<text>这是一个展示页面不被图表阻塞的例子</text>
			<text>在图表区域（红色边框）之外可以滚动</text>
		</view>
		<view class="text">
			<text>这是一个展示页面不被图表阻塞的例子</text>
			<text>在图表区域（红色边框）之外可以滚动</text>
		</view>
		<view class="text">
			<text>这是一个展示页面不被图表阻塞的例子</text>
			<text>在图表区域（红色边框）之外可以滚动</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			opt: {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					data: ['热度', '正面', '负面']
				},
				grid: {
					left: 20,
					right: 20,
					bottom: 15,
					top: 40,
					containLabel: true
				},
				xAxis: [
					{
						type: 'value',
						axisLine: {
							lineStyle: {
								color: '#999'
							}
						},
						axisLabel: {
							color: '#666'
						}
					}
				],
				yAxis: [
					{
						type: 'category',
						axisTick: { show: false },
						data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
						axisLine: {
							lineStyle: {
								color: '#999'
							}
						},
						axisLabel: {
							color: '#666'
						}
					}
				],
				series: [
					{
						name: '热度',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'inside'
							}
						},
						data: [300, 270, 340, 344, 300, 320, 310]
					},
					{
						name: '正面',
						type: 'bar',
						stack: '总量',
						label: {
							normal: {
								show: true
							}
						},
						data: [120, 102, 141, 174, 190, 250, 220]
					},
					{
						name: '负面',
						type: 'bar',
						stack: '总量',
						label: {
							normal: {
								show: true,
								position: 'left'
							}
						},
						data: [-20, -32, -21, -34, -90, -130, -110]
					}
				]
			}
		}
	}
}
</script>

<style>
.move-container {
	width: 100%;
	min-height: 500px;
}

.move-container .text {
	margin-bottom: 20px;
}

.move-container text {
	margin: 10px;
	display: block;
}
uni-chart {
	width: 70%;
	height: 300px;
	margin: 20px 15%;
	border: 1px solid red;
	display: block;
}
</style>
