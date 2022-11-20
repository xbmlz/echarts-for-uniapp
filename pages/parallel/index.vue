<template>
	<view class="container"><uni-chart :option="opt" /></view>
</template>

<script>
export default {
	data() {
		return {
			opt: {
				parallelAxis: [
					{ dim: 0, name: 'Price' },
					{ dim: 1, name: 'Net Weight' },
					{ dim: 2, name: 'Amount' },
					{
						dim: 3,
						name: 'Score',
						type: 'category',
						data: ['Excellent', 'Good', 'OK', 'Bad']
					}
				],
				parallel: {
					left: 40,
					right: 80,
					top: 50,
					bottom: 20,
					parallelAxisDefault: {
						axisLine: {
							lineStyle: {
								color: '#999'
							}
						},
						axisLabel: {
							color: '#666'
						},
						nameTextStyle: {
							color: '#666'
						}
					}
				},
				series: {
					type: 'parallel',
					lineStyle: {
						width: 4
					},
					data: [
						[12.99, 100, 82, 'Good'],
						[9.99, 80, 77, 'OK'],
						[20, 120, 60, 'Excellent'],
						[3.2, 40, 70, 'OK']
					]
				}
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
