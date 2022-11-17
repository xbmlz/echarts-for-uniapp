# 在 uni-app 中使用 Apache ECharts

本项目是 [Apache ECharts](https://github.com/apache/echarts) 的uni-app版本，支持 [Vue.js](https://vuejs.org/) 2/3，以及使用的示例。

开发者可以通过熟悉的 ECharts 配置方式，快速开发图表，满足各种可视化需求.

## 快速开始

### 方式一: 使用 uni_modules 安装（推荐）

使用 `uni_modules` 方式安装组件库，可以直接通过插件市场导入，通过右键菜单快速更新组件，不需要引用、注册，直接在页面中使用 `echarts-for-uniapp` 组件。[点击安装 echarts-for-uniapp 组件库](https://ext.dcloud.net.cn/plugin?id=)

### 方式二: 使用 npm 安装

在 `vue-cli` 项目中可以使用 `npm` 安装 `echarts-for-uniapp` 库 ，或者直接在 `HBuilderX` 项目中使用 `npm` 。（不推荐后一种方式）

```bash
npm i echarts-for-uniapp
```

> **注意**
> cli 项目默认是不编译 `node_modules` 下的组件的，导致条件编译等功能失效 ，导致组件异常
> 需要在根目录创建 `vue.config.js` 文件 ，增加 `echarts-for-uniapp` 包的编译即可正常
> ```javascript
> // vue.config.js
> module.exports = {
> 	transpileDependencies:['echarts-for-uniapp']
> }
> // 如果是vue3 + vite, 修改 vite.config.js 或 vite.config.ts
> export default defineConfig({
>   optimizeDeps: ['echarts-for-uniapp']
> })
> ```

### 创建图表

```vue
<template>
  <view class="content">
    <uni-chart :option="option" />
  </view>
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

```


这对于所有 ECharts 图表都是通用的，用户只需要修改上面 `option` 的内容，即可改变图表。`option` 的使用方法参见 [ECharts 配置项文档](https://echarts.apache.org/zh/option.html)。对于不熟悉 ECharts 的用户，可以参见 [5 分钟上手 ECharts](https://echarts.apache.org/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts) 教程。

完整的例子请参见 [xbmlz/echarts-for-uniapp](https://github.com/xbmlz/echarts-for-uniapp) 项目。


### 支持平台

| Vue2 | Vue3 |
| --- | --- |
| ✔️ | ✔️ |

| APP-VUE | APP-NVUE | 小程序 | WEB/H5 |
| --- | --- | --- | --- |
| ✔️ | ❌ | ✔ | ✔ |

### 参数

| 参数名 | 类型 | 默认值 | 描述 |
| :--: | :--: | :--: | :-- |
| width | Number | 750 | 画布宽度, 单位rpx或px |
| height | Number | 500 | 画布高度, 单位rpx或px |
| option | Object |  | [ECharts Option](https://echarts.apache.org/zh/option.html) |
| theme | Object|String |  | [Eharts Theme](https://echarts.apache.org/handbook/zh/concepts/style/) |


### 事件

| 事件名 | 参数 | 返回数据 | 描述 |
| --- | --- | --- | --- |
| click |  | event | 点击 |
| touchstart |  | event | 按下 |
| touchmove |  | event | 移动 |
| touchend |  | event | 松开 |
| mousedown |  | event | 按下 |
| mousemove |  | event | 移动 |
| mouseup |  | event | 松开 |

### 文件太大怎么办？

本项目默认提供的 ECharts 文件是最新版本的包含所有组件文件。可以下载不同版本的 [ECharts](https://github.com/apache/echarts/blob/master/dist/) 进行替换。建议调试时使用未压缩版本，发布时使用压缩版本，否则文件会太大无法发布。

发布时，如果对文件大小要求更高，可以在 [ECharts 在线定制](https://echarts.apache.org/zh/builder.html)网页下载仅包含必要组件的包，并且选择压缩。

下载的文件放在 `uni_modules/echarts-for-uniapp/static/echarts.esm.min.js`，**注意一定需要重命名为 `echarts.esm.min.js`**。

此外，还可考虑使用微信小程序的[分包策略](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/independent.html)