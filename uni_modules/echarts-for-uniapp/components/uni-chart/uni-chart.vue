<template>
  <!-- #ifdef APP-VUE || H5 -->
  <view v-if="systemInfo.deviceType === 'pc'" :id="canvasId" class="uni-canvas" @click="emits('click', $event)" />
  <view
    v-else
    :id="canvasId"
    class="uni-canvas"
    @click="emits('click', $event)"
    @touchstart="touchStart"
    @touchmove.stop="touchMove"
    @touchend="touchEnd"
  />
  <!-- #endif -->

  <!-- #ifdef MP-WEIXIN || MP-QQ -->
  <canvas
    type="2d"
    :id="canvasId"
    class="uni-canvas"
    :canvas-id="canvasId"
    @click="emits('click', $event)"
    @touchstart="touchStart"
    @touchmove.stop="touchMove"
    @touchend="touchEnd"
  />
  <!-- #endif -->
</template>

<script>
// #ifdef VUE3
import '../../static/echarts.min.js'
// #endif

// #ifdef VUE2 || MP-WEIXIN
const echarts = require('../../static/echarts.min.js')
// #endif

import { UniCanvas } from './uni-canvas.js'

let chart

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
      systemInfo: uni.getSystemInfoSync(),
    }
  },
  mounted() {
    // console.log(uni.getSystemInfoSync())
    this.$nextTick(() => {
      this.registerPreprocessor()
      // #ifdef APP-VUE || H5
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
    // renderH5
    renderH5() {
      const canvasNode = document.getElementById(this.canvasId)
      chart = echarts.init(canvasNode)
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
          canvasNode.width = canvasNode.width * this.systemInfo.pixelRatio
          canvasNode.height = canvasNode.height * this.systemInfo.pixelRatio
          ctx.scale(this.pixelRatio, this.pixelRatio)
          const canvas = new UniCanvas(ctx, canvasNode)
          echarts.setPlatformAPI({ createCanvas: () => canvas })
          chart = echarts.init(canvas, '', {
            width: canvasNode.width,
            height: canvasNode.width,
            devicePixelRatio: this.pixelRatio
          })
          chart.setOption(this.$props.option)
        })
        .exec()
    },
    // event
    wrapTouch(event) {
      for (let i = 0; i < event.touches.length; ++i) {
        const touch = event.touches[i]
        touch.offsetX = touch.x
        touch.offsetY = touch.y
      }
      return event
    },
    touchStart(e) {
      if (chart && e.touches.length > 0) {
        const touch = e.touches[0]
        const handler = chart.getZr().handler
        handler.dispatch('mousedown', {
          zrX: touch.x,
          zrY: touch.y,
          preventDefault: () => {},
          stopPropagation: () => {}
        })
        handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y,
          preventDefault: () => {},
          stopPropagation: () => {}
        })
        handler.processGesture(this.wrapTouch(e), 'start')
        this.$emit('touchStart', e)
      }
    },
    touchMove(e) {
      if (chart && e.touches.length > 0) {
        var touch = e.touches[0]
        var handler = chart.getZr().handler
        handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y,
          preventDefault: () => {},
          stopImmediatePropagation: () => {},
          stopPropagation: () => {}
        })
        handler.processGesture(this.wrapTouch(e), 'change')
        this.$emit('touchMove', e)
      }
    },
    touchEnd(e) {
      if (chart) {
        const touch = e.changedTouches ? e.changedTouches[0] : {}
        var handler = chart.getZr().handler
        handler.dispatch('mouseup', {
          zrX: touch.x,
          zrY: touch.y,
          preventDefault: () => {},
          stopImmediatePropagation: () => {},
          stopPropagation: () => {}
        })
        handler.dispatch('click', {
          zrX: touch.x,
          zrY: touch.y,
          preventDefault: () => {},
          stopImmediatePropagation: () => {},
          stopPropagation: () => {}
        })
        handler.processGesture(this.wrapTouch(e), 'end')
        this.$emit('touchEnd', e)
      }
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
<style>
.uni-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
