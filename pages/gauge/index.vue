<template>
	<view class="container"><uni-chart :option="opt" /></view>
</template>

<script>
export default {
	data() {
		return {
			opt: {
				tooltip: {
					formatter: '{a} <br/>{b} : {c}%'
				},
				series: [
					{
						name: 'Pressure',
						type: 'gauge',
						progress: {
							show: true
						},
						detail: {
							valueAnimation: true,
							formatter: '{value}'
						},
						data: [
							{
								value: 50,
								name: 'SCORE'
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
