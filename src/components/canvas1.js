import React from "react"
import Background from "../images/space.jpg"
import ufo from "../images/ufo.png"
import { Link } from "gatsby"
import { PlayLink } from "./styled"

let mouse = {
  x: undefined,
  y: undefined,
}

class DragUfo {
  constructor(ctx, image) {
    ctx.drawImage(
      image,
      mouse.x - image.width / 12,
      mouse.y - image.height / 12,
      image.height / 6,
      image.width / 6
    )
  }
}

const maxRadius = 40

class Circle {
  constructor(x, y, dx, dy, radius, color) {
    let minRadius = radius

    const draw = ctx => {
      ctx.beginPath()
      ctx.arc(x, y, radius, Math.PI * 2, false)
      ctx.shadowBlur = 40
      ctx.shadowColor = "white"
      ctx.fillStyle = color
      ctx.fill()
    }

    this.update = ctx => {
      if (x + radius > window.innerWidth || x - radius < 0) {
        dx = -dx
      }
      if (y + radius > window.innerHeight || y - radius < 0) {
        dy = -dy
      }
      x += dx
      y += dy

      if (
        mouse.x - x < 50 &&
        mouse.x - x > -50 &&
        mouse.y - y < 50 &&
        mouse.y - y > -50
      ) {
        if (radius < maxRadius) {
          radius += 1
        }
      } else if (radius > minRadius) {
        radius -= 1
      }

      draw(ctx)
    }
  }
}

const colorArray = [
  "#eeccdd",
  "#eecc88",
  "#ddbbbb",
  "#bb9977",
  "#bb99aa",
  "#8899aa",
  "#ffffff",
  "#aeeeee",
]

class Canvas extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      circleArray: [],
      width: undefined,
      height: undefined,
    }

    this.onMouseMove = event => {
      mouse.x = event.x
      mouse.y = event.y
    }
  }

  componentDidMount() {

    window.addEventListener("mousemove", this.onMouseMove)

    this.setState({
      circleArray: Array.from({ length: 1200 }).map(
        () =>
          new Circle(
            Math.random() * (window.innerWidth - 10 * 2) + 10,
            Math.random() * (window.innerHeight - 10 * 2) + 10,
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() * 3 + 1,
            colorArray[Math.floor(Math.random() * colorArray.length)]
          )
      ),
      width: window.innerWidth,
      height: window.innerHeight,
    })

    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.onMouseMove)

    this.animate = () => {}
  }

  updateCanvas() {
    this.animate = () => {
      const ctx = this.refs.canvas.getContext("2d")
      requestAnimationFrame(() => this.animate())

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      ctx.font = "10vw Arial"
      ctx.strokeStyle = "#000d1a"
      ctx.textAlign = "center"
      ctx.strokeText(
        "SPACE EXPLORER",
        this.refs.canvas.width / 2,
        this.refs.canvas.height / 2
      )

      this.state.circleArray.forEach(element => {
        element.update(ctx)
      })

      const image = document.getElementById("source")
      new DragUfo(ctx, image)
    }

    this.animate()
  }

  render() {
    return (
      <div>
        <Link to="/gamerules-page/">
          <PlayLink>Play</PlayLink>
        </Link>
        <canvas
          width={this.state.width}
          height={this.state.height}
          ref="canvas"
          style={{background: `url('${Background}') no-repeat center center fixed`}}
        />
        <div style={{ display: `none` }}>
          <img id={"source"} src={ufo} alt={"ufo"} />
        </div>
      </div>
    )
  }
}
export default Canvas
