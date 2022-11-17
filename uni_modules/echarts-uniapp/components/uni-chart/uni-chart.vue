<template>
  <!-- #ifdef H5 -->
  <view :id="canvasId" />
  <!-- #endif -->
</template>

<script>
import * as echarts from '../static/echarts.esm.js'
import { UniCanvas } from './uni-canvas.js'

export default {
  name: 'uni-chart',
  props: {
    option: {
      type: Object,
      require: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      canvasId: `uni-canvas-${Date.now()}`,
      pixelRatio: uni.getSystemInfoSync().pixelRatio,
      deviceType: uni.getSystemInfoSync().deviceType
    }
  },
  mounted() {
    this.registerPreprocessor()
    console.log(this.deviceType)
    this.$nextTick(() => {
      // #ifdef H5
      this.renderH5()
      // #endif
    })
  },
  methods: {
    // register echarts preprocessor
    registerPreprocessor() {
      echarts.registerPreprocessor(option => {
        if (option && option.series) {
          if (option.series.length > 0) {
            option.series.forEach(series => {
              series.progressive = 0
            })
          } else if (typeof option.series === 'object') {
            option.series.progressive = 0
          }
        }
      })
    },
    // renderH5
    renderH5() {
      const canvasNode = document.getElementById(this.canvasId)
      const chart = echarts.init(canvasNode)
      chart.setOption(this.$props.option)
    }
  }
}
</script>

<style scoped>
uni-canvas {
  width: 100%;
  height: 100%;
}
</style>
