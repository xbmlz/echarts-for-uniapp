<template>
	<view class="container"><uni-chart :option="opt" /></view>
</template>

<script>
export default {
	data() {
		return {
			opt: {
				backgroundColor: '#ffffff',
				xAxis: {
					show: false
				},
				yAxis: {
					show: false
				},
				radar: {
					// shape: 'circle',
					indicator: [
						{
							name: '食品',
							max: 500
						},
						{
							name: '玩具',
							max: 500
						},
						{
							name: '服饰',
							max: 500
						},
						{
							name: '绘本',
							max: 500
						},
						{
							name: '医疗',
							max: 500
						},
						{
							name: '门票',
							max: 500
						}
					]
				},
				series: [
					{
						name: '预算 vs 开销',
						type: 'radar',
						data: [
							{
								value: [430, 340, 500, 300, 490, 400],
								name: '预算'
							},
							{
								value: [300, 430, 150, 300, 420, 250],
								name: '开销'
							}
						]
					}
				]
			}
		}
	}
}
</script>

<style>
uni-chart {
	width: 100%;
	height: 60%;
}
</style>
