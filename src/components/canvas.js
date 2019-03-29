import React from "react"
import Background from "../images/space.jpg"
import ufo from "../images/ufo.png"
import { Link } from "gatsby"

let mouse = {
  x: undefined,
  y: undefined,
}
    let ufoPosition = {
      x: window.innerHeight / 2,
      y: window.innerWidth /2 
    }

window.addEventListener("mousemove", event => {
  mouse.x = event.x
  mouse.y = event.y

    ufoPosition.x = mouse.x
    ufoPosition.y = mouse.y
})


function DragUfo(ctx, image) {
  ctx.drawImage(image, ufoPosition.x, ufoPosition.y, image.height / 6, image.width / 6);
}


const maxRadius = 20

function Circle(x, y, dx, dy, radius, color) {
  let minRadius = radius

  const draw = ctx => {
    ctx.beginPath()
    ctx.arc(x, y, radius, Math.PI * 2, false)
    ctx.shadowBlur = 30
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

const colorArray = [
  "#eeccdd",
  "#eecc88",
  "#ddbbbb",
  "#bb9977",
  "#bb99aa",
  "#8899aa",
  "#ffffff",
  "ffeef5",
  "#aeeeee",
]

class Canvas extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      circleArray: Array.from({ length: 800 }).map(
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
    }
  }

  componentDidMount() {

    this.refs.canvas.style.background = `url('${Background}') no-repeat center center fixed`

    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  updateCanvas() {

    const animate = () => {
      const ctx = this.refs.canvas.getContext("2d")
      requestAnimationFrame(animate)

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);


      const image = document.getElementById('source');
      new DragUfo(ctx, image);

      // ctx.drawImage(image, this.refs.canvas.width / 2, this.refs.canvas.height / 2, image.height / 6, image.width / 6);

      ctx.font = "10vw Arial"
      ctx.textAlign = "center"
      ctx.strokeText(
        "SPACE EXPLORER",
        this.refs.canvas.width / 2,
        this.refs.canvas.height / 2
      )

      this.state.circleArray.forEach(element => {
        element.update(ctx)
      })
    }

    animate()
  }

  render() {
    return (
      <div>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref="canvas"
      />
      <div style={{display: `none`}}>
      <img id={"source"}
          src={ufo}
          alt={"ufo"}
          />
    </div>
    </div>
    )
  }
}
export default Canvas
