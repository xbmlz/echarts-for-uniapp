export class UniCanvas {

	constructor(ctx, canvasNode) {
		this.ctx = ctx
		this.chart = {}
		this.canvasNode = canvasNode
		if (!canvasNode) {
			this._initStyle(ctx)
		}
		this._initEvent()
	}

	getContext(contextType) {
		if (contextType === '2d') {
			return this.ctx
		}
	}

	setChart(chart) {
		this.chart = chart
	}

	attachEvent() {
		// noop
	}

	detachEvent() {
		// noop
	}

	addEventListener() {
		// noop
	}
	
	removeEventListener() {
		// noop
	}

	_initCanvas(zrender, ctx) {
		zrender.util.getContext = () => {
			return ctx
		}
		zrender.util.$override('measureText', (text, font) => {
			ctx.font = font || '12px sans-serif'
			return ctx.measureText(text)
		})
	}

	_initStyle(ctx) {
		ctx.createCircularGradient = (x, y, r) => {
			return ctx.createCircularGradient(x, y, r)
		}
	}

	_initEvent() {
		this.event = {}
		const eventNames = [{
				wxName: 'touchStart',
				ecName: 'mousedown',
			},
			{
				wxName: 'touchMove',
				ecName: 'mousemove',
			},
			{
				wxName: 'touchEnd',
				ecName: 'mouseup',
			},
			{
				wxName: 'touchEnd',
				ecName: 'click',
			},
		]

		eventNames.forEach((name) => {
			this.event[name.wxName] = (e) => {
				const touch = e.touches[0]
				this.chart.getZr().handler.dispatch(name.ecName, {
					zrX: name.wxName === 'tap' ? touch.clientX : touch.x,
					zrY: name.wxName === 'tap' ? touch.clientY : touch.y,
					preventDefault: () => {},
					stopImmediatePropagation: () => {},
					stopPropagation: () => {},
				})
			}
		})
	}

	get width() {
		if (this.canvasNode) return this.canvasNode.width
		return 0
	}

	set width(w) {
		if (this.canvasNode) this.canvasNode.width = w
	}

	get height() {
		if (this.canvasNode) return this.canvasNode.height
		return 0
	}

	set height(h) {
		if (this.canvasNode) this.canvasNode.height = h
	}
}
