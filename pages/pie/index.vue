<template>
	<view class="container"><uni-chart :option="opt" /></view>
</template>

<script>
export default {
	data() {
		return {
			opt: {
				legend: {
					top: 'bottom'
				},
				series: [
					{
						name: 'Nightingale Chart',
						type: 'pie',
						radius: [50, 250],
						center: ['50%', '50%'],
						roseType: 'area',
						itemStyle: {
							borderRadius: 8
						},
						data: [
							{ value: 40, name: 'rose 1' },
							{ value: 38, name: 'rose 2' },
							{ value: 32, name: 'rose 3' },
							{ value: 30, name: 'rose 4' },
							{ value: 28, name: 'rose 5' },
							{ value: 26, name: 'rose 6' },
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
