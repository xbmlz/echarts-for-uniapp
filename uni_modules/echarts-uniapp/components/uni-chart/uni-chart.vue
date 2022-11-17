<template>
  <view>
    <!-- #ifdef H5 -->
    <view :id="canvasId" :style="{ width: `${width}rpx`, height: `${height}rpx` }" />
    <!-- #endif -->

    <!-- #ifdef MP-WEIXIN || MP-QQ -->
    <canvas type="2d" :id="canvasId" :canvas-id="canvasId" :style="{ width: `${width}rpx`, height: `${height}rpx` }" />
    <!-- #endif -->
  </view>
</template>

<script>
import * as echarts from '../../static/echarts.esm.min.js'
import { UniCanvas } from './uni-canvas.js'

export default {
  name: 'uni-chart',
  props: {
    width: {
      type: Number,
      default: 750
    },
    height: {
      type: Number,
      default: 500
    },
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
      deviceType: uni.getSystemInfoSync().deviceType,
      sdkVersion: uni.getSystemInfoSync().SDKVersion
    }
  },
  mounted() {
    this.registerPreprocessor()
    this.$nextTick(() => {
      // #ifdef H5
      this.renderH5()
      // #endif

      // #ifdef MP-WEIXIN || MP-QQ
      this.renderMpWeixin()
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
    // renderH5 TODO
    renderH5() {
      const canvasNode = document.getElementById(this.canvasId)
      const chart = echarts.init(canvasNode)
      chart.setOption(this.$props.option)
    },
    // render mp-weixin
    renderMpWeixin() {
      const query = uni.createSelectorQuery().in(this)
      query
        .select(`#${this.canvasId}`)
        .node(res => {
          const canvasNode = res.node

          const ctx = canvasNode?.getContext('2d')
          canvasNode.width = canvasNode.width * this.pixelRatio
          canvasNode.height = canvasNode.height * this.pixelRatio
          ctx.scale(this.pixelRatio, this.pixelRatio)

          const canvas = new UniCanvas(ctx, canvasNode)
          echarts.setPlatformAPI({ createCanvas: () => canvas })
          const chart = echarts.init(canvas, '', {
            width: uni.upx2px(this.$props.width),
            height: uni.upx2px(this.$props.height),
            devicePixelRatio: this.pixelRatio
          })
          chart.setOption(this.$props.option)
        })
        .exec()
    },
    // utils
    compareVersion(v1, v2) {
      v1 = v1.split('.')
      v2 = v2.split('.')
      const len = Math.max(v1.length, v2.length)

      while (v1.length < len) {
        v1.push('0')
      }
      while (v2.length < len) {
        v2.push('0')
      }

      for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i])
        const num2 = parseInt(v2[i])
        if (num1 > num2) {
          return 1
        } else if (num1 < num2) {
          return -1
        }
      }
      return 0
    }
  }
}
</script>
