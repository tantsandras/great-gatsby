import React from "react"

function Circle(x, y, dx, dy, radius, color) {

const draw = ctx => {
    ctx.beginPath()
    ctx.arc(x, y, radius, Math.PI * 2, false)
    ctx.strokeStyle = color;
    ctx.stroke()
  }

    this.update = (ctx) => {
    if (x + radius > window.innerWidth || x - radius < 0) {
      dx = -dx
    }
    if (y + radius > window.innerHeight || y - radius < 0) {
        dy = -dy
    }
    x += dx
    y += dy

    draw(ctx);
  }
}

class Canvas extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      circleArray: Array.from({ length: 100 }).map(
        () =>
          new Circle(
            Math.random() * (window.innerWidth - 5 * 2) + 5,
            Math.random() * (window.innerHeight - 5 * 2) + 5,
            Math.random() - 0.5,
            Math.random() - 0.5,
            5,
            "#" + (((1 << 24) * Math.random()) | 0).toString(16)
          )
      ),
    }
  }

  componentDidMount() {
    const ctx = this.refs.canvas.getContext("2d")

    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  updateCanvas() {
    const animate = () => {
      const ctx = this.refs.canvas.getContext("2d")
      requestAnimationFrame(animate)

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      this.state.circleArray.forEach(element => {
        element.update(ctx)
      })
    }

    animate()
  }

  render() {
    return (
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref="canvas"
      />
    )
  }
}
export default Canvas
