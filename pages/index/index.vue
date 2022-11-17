<template>
  <view class="content"><uni-chart :option="option" class="chart" /></view>
</template>

<script>
export default {
  data() {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }
    }
  }
}
</script>

<style>
.content {
  margin: 0;
  padding: 0;
}
.chart {
  height: 375px;
}
</style>
