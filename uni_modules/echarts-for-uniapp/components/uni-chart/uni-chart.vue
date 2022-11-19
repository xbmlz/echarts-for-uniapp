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
    v-if="useNewCanvas"
    type="2d"
    :id="canvasId"
    class="uni-canvas"
    :canvas-id="canvasId"
    @click="emits('click', $event)"
    @touchstart="touchStart"
    @touchmove.stop="touchMove"
    @touchend="touchEnd"
  />
  <canvas
    v-else
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
    forceUseOldCanvas: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: ''
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
      systemInfo: uni.getSystemInfoSync(),
      useNewCanvas: true
    }
  },
  onReady() {
    this.registerPreprocessor()
    // #ifdef APP-VUE || H5
    this.initH5()
    // #endif

    // #ifdef MP-WEIXIN || MP-QQ
    this.initMiniProgram()
    // #endif
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
    // init H5 app-vue
    initH5() {
      const canvasNode = document.getElementById(this.canvasId)
      chart = echarts.init(canvasNode, this.$props.theme)
      chart.setOption(this.$props.option)
    },
    // init mini program
    initMiniProgram() {
      const version = this.systemInfo.SDKVersion
      console.log(`当前基础库版本为: ${version}`)

      const oldVersion = '1.9.91'
      const baseVersion = '2.9.0'

      let canUseNewCanvas = this.compareVersion(version, baseVersion) >= 0

      if (this.$props.forceUseOldCanvas) {
        if (canUseNewCanvas) console.warn('开发者强制使用旧canvas,建议关闭')
        canUseNewCanvas = false
      }
      this.useNewCanvas = canUseNewCanvas && !this.forceUseOldCanvas
      if (this.useNewCanvas) {
        // 2.9.0 可以使用 <canvas type="2d"></canvas>
        console.log(`基础库版本大于${baseVersion}，开始使用<canvas type="2d"/>`)
        this.initNewCanvas()
      } else {
        const isValid = this.compareVersion(version, oldVersion) >= 0
        if (!isValid) {
          console.error(`基础库版本过低，需大于等于 ${oldVersion}。`)
          return
        } else {
          console.warn(`建议将基础库调整大于等于${baseVersion}版本。升级后绘图将有更好性能`)
          this.initOldCanvas()
        }
      }
    },
    // initNewCanvas
    initNewCanvas() {
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
          chart = echarts.init(canvas, this.$props.theme, {
            width: canvasNode.width,
            height: canvasNode.width,
            devicePixelRatio: this.pixelRatio
          })
          chart.setOption(this.$props.option)
        })
        .exec()
    },
    // initOldCanvas
    initOldCanvas() {
      // 1.9.91 <= sdkVersion < 2.9.0：原来的方式初始化
      const ctx = uni.createCanvasContext(`#${this.canvasId}`, this)
      const canvas = new UniCanvas(ctx)
      echarts.setPlatformAPI({ createCanvas: () => canvas })
      const query = uni.createSelectorQuery().in(this)
      query
        .select(`#${this.canvasId}`)
        .boundingClientRect(res => {
          // 微信旧的canvas不能传入dpr
          const pixelRatio = 1
          const canvasWidth = res.width
          const canvasHeight = res.height

          console.log(canvasWidth, canvasHeight)
          chart = echarts.init(canvas, this.$props.theme, {
            width: canvasWidth,
            height: canvasHeight,
            devicePixelRatio: pixelRatio
          })
          chart.setOption(this.$props.option)
        })
        .exec()
    },
    // init
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
