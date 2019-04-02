import React from "react"
import ufo from "../images/ufo.png"
import fallingStar from "../images/comet.png"
import comet from "../images/bigComet.png"

let mouse = {
  x: undefined,
  y: undefined,
}
let ufoPosition = {
  x: window.innerHeight / 2,
  y: window.innerWidth / 2,
}
window.addEventListener("mousemove", event => {
  mouse.x = event.x
  mouse.y = event.y

  ufoPosition.x = mouse.x
  ufoPosition.y = mouse.y
})

function DragUfo(ctx, image) {
  ctx.drawImage(
    image,
    ufoPosition.x - image.width / 12,
    ufoPosition.y - image.height / 12,
    image.height / 6,
    image.width / 6
  )
}

const preShake = (ctx) => {
  ctx.save();
  let dx = Math.random()*4;
  let dy = Math.random()*4;
  ctx.translate(dx, dy);  
}
const postShake = (ctx) => {
  ctx.restore();
}

function Comet(x, y) {

  const drawComet = (comet, ctx) => {
    ctx.drawImage(
    comet,
    x,
    y,
    comet.height / 18,
    comet.width / 6
      )
    }

    this.cometFall = (comet, ctx) => {
      y += 16
      drawComet(comet, ctx)
    }

}


function StarFall(x, y) {

  const drawFallingStar = (fallingStar, ctx) => {
    ctx.drawImage(
    fallingStar,
    x,
    y,
    fallingStar.height / 20,
    fallingStar.width / 8
      )
    }

    this.fall = (fallingStar, ctx) => {
      y += 14
      drawFallingStar(fallingStar, ctx)
    }

}

function Star(x, y, radius, color) {
  
  const draw = ctx => {
    ctx.beginPath()
    ctx.arc(x, y, radius, Math.PI * 2, false)
    ctx.shadowBlur = 100;
    ctx.shadowColor = "silver";
    ctx.fillStyle = color
    ctx.fill()
  }

  this.update = ctx => {
  
      y += 14
      draw(ctx)
  }
}

class Canvas2 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      starArray: Array.from({ length: 15 }).map(
        () =>
          new Star(
            Math.random() * (window.innerWidth - 10 * 2) + 10,
            0,
            2,
            "white"
          )
      ),
      starFallArray: Array.from({ length: 1 }).map(
        () => 
        new StarFall(
          Math.random() * (window.innerWidth - 10 * 2) + 10,
          -100
        )
      ),
      cometArray: Array.from({ length: 1 }).map(
        () => 
        new Comet(
          Math.random() * (window.innerWidth - 10 * 2) + 10,
          -100
        )
      )
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.state.starArray.push(
        new Star(
          Math.random() * (window.innerWidth - 10 * 2) + 10,
          0,
          2,
          "white"
        )
      )

      this.state.starArray.push(
        new Star(
          Math.random() * (window.innerWidth - 10 * 2) + 10,
          0,
          2,
          "white"
        )
      )
    }, 100)

    setInterval(() => {
      this.state.starFallArray.push(
        new StarFall(
          Math.random() * (window.innerWidth - 10 * 2) + 10,
          -100
        )
      )
      this.state.starFallArray.push(
        new StarFall(
          Math.random() * (window.innerWidth - 10 * 2) + 10,
          -100
        )
      )
    }, 300)


    setInterval(() => {
      this.state.cometArray.push(
        new Comet(
          Math.random() * (window.innerWidth - 10 * 2) + 10,
          -100
        )
      )
    }, 500)


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

      ctx.font = "10vw Arial"
      ctx.strokeStyle = "#000d1a"
      ctx.textAlign = "center"
      ctx.strokeText(
        "SPACE EXPLORER",
        this.refs.canvas.width / 2,
        this.refs.canvas.height / 2
      )

      const image = document.getElementById("source")
      new DragUfo(ctx, image)

      const fallingStar = document.getElementById("fallingStar");

      this.state.starFallArray.forEach(element => {
        element.fall(fallingStar, ctx)
      })

      const comet = document.getElementById("comet");

      this.state.cometArray.forEach(element => {
        preShake(ctx);
        element.cometFall(comet, ctx)
        postShake(ctx);
      })

      this.state.starArray.forEach(element => {
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
          style={{ background: `black` }}
        />
        <div style={{ display: `none` }}>
          <img id={"source"} src={ufo} alt={"ufo"} />
        </div>
        <div style={{ display: `none` }}>
          <img id={"fallingStar"} src={fallingStar} alt={"falling star"} />
        </div>
        <div style={{ display: `none` }}>
          <img id={"comet"} src={comet} alt={"comet"} />
        </div>
      </div>
    )
  }
}
export default Canvas2
