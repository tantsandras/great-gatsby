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

class DragUfo {
  constructor(ctx, image) {
    ctx.drawImage(
      image,
      ufoPosition.x - image.width / 12,
      ufoPosition.y - image.height / 12,
      image.height / 6,
      image.width / 6
    )
  }
}

const preShake = ctx => {
  ctx.save()
  let dx = Math.random() * 4
  let dy = Math.random() * 4
  ctx.translate(dx, dy)
}
const postShake = ctx => {
  ctx.restore()
}

class Comet {
  constructor(x, y) {
    const drawComet = (comet, ctx) => {
      ctx.drawImage(comet, x, y, comet.height / 18, comet.width / 6)
    }

    this.cometFall = (comet, ctx) => {
      y += 12
      drawComet(comet, ctx)
    }

    this.hitsShip = () => {
      if (
        mouse.x - x < 50 &&
        mouse.x - x > -50 &&
        mouse.y - y < 50 &&
        mouse.y - y > -50
      ) {
        return true
      }
      return false
    }
  }
}

class StarFall {
  constructor(x, y) {
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
      y += 10
      drawFallingStar(fallingStar, ctx)
    }
  }
}

class Star {
  constructor(x, y, radius, color) {
    const draw = ctx => {
      ctx.beginPath()
      ctx.arc(x, y, radius, Math.PI * 2, false)
      ctx.shadowBlur = 100
      ctx.shadowColor = "silver"
      ctx.fillStyle = color
      ctx.fill()
    }

    this.update = ctx => {
      y += 10
      draw(ctx)
    }
  }
}

class Canvas2 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      gameover: false,
      starArray: Array.from({ length: 15 }).map(
        () =>
          new Star(
            Math.random() * (window.innerWidth - 10 * 2) + 10,
            0,
            2,
            "white"
          )
      ),
      starFallArray: Array.from({ length: 4 }).map(
        () =>
          new StarFall(Math.random() * (window.innerWidth - 10 * 2) + 10, -100)
      ),
      cometArray: Array.from({ length: 1 }).map(
        () => new Comet(Math.random() * (window.innerWidth - 10 * 2) + 10, -100)
      ),
      pointCounter: 0,
    }
  }

  componentDidMount() {
    const stars = setInterval(() => {
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
      this.state.starFallArray.push(
        new StarFall(Math.random() * (window.innerWidth - 10 * 2) + 10, -100)
      )
    }, 100)

    const fall = setInterval(() => {
      this.state.starArray.push(
        new Star(
          Math.random() * (window.innerWidth - 10 * 2) + 10,
          0,
          2,
          "white"
        )
      )
      this.state.starFallArray.push(
        new StarFall(Math.random() * (window.innerWidth - 10 * 2) + 10, -100)
      )
      this.state.starFallArray.push(
        new StarFall(Math.random() * (window.innerWidth - 10 * 2) + 10, -100)
      )
    }, 300)

    const comets = setInterval(() => {
      this.state.cometArray.push(
        new Comet(Math.random() * (window.innerWidth - 10 * 2) + 10, -100)
      )
      this.state.cometArray.push(
        new Comet(Math.random() * (window.innerWidth - 10 * 2) + 10, -100)
      )
    }, 400)

    const points = setInterval(() => {
      this.setState({ pointCounter: (this.state.pointCounter += 10) })
    }, 1000)

    this.updateCanvas(stars, fall, comets, points)
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  updateCanvas(stars, fall, comets, points) {
    const animate = () => {
      if (this.state.gameover) {
        clearInterval(stars)
        clearInterval(fall)
        clearInterval(comets)
        clearInterval(points)
        return
      }

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

      ctx.font = "2vw Arial"
      ctx.strokeStyle = "white"
      ctx.textAlign = "center"
      ctx.strokeText(
        "POINTS:" + this.state.pointCounter,
        this.refs.canvas.width / 6,
        this.refs.canvas.height / 8
      )

      const image = document.getElementById("source")
      new DragUfo(ctx, image)

      const fallingStar = document.getElementById("fallingStar")

      this.state.starFallArray.forEach(element => {
        element.fall(fallingStar, ctx)
      })

      const comet = document.getElementById("comet")

      this.state.cometArray.forEach(element => {
        preShake(ctx)
        element.cometFall(comet, ctx)
        if (element.hitsShip()) {
          this.setState({ gameover: true })
        }
        postShake(ctx)
      })

      this.state.starArray.forEach(element => {
        element.update(ctx)
      })
    }

    animate()
  }

  render() {
    if (this.state.gameover) {
      return (
        <div
          style={{
            background: `black`,
            color: `white`,
          }}
        >
          <h1
            style={{
              fontFamily: `Arial`,
              fontSize: `3em`,
              textAlign: `center`,
              paddingTop: `4em`,
            }}
          >
            GAME OVER{" "}
          </h1>{" "}
          <br />
          <h1
            style={{
              fontFamily: `Arial`,
              fontSize: `2em`,
              textAlign: `center`,
              paddingTop: `1em`,
            }}
          >
            POINTS EARNED: {this.state.pointCounter}
          </h1>
          <div
            style={{
              width: `100%`,
              height: `0`,
              paddingBottom: `39%`,
              position: `relative`,
              textAlign: `center`,
            }}
          >
            <img
              src={"https://media.giphy.com/media/7FglzG1vIz4sYjEq5L/giphy.gif"}
              style={{ position: `absolute`, margin: `0 auto`, width: `20%` }}
              alt={"alien"}
            />
          </div>
        </div>
      )
    }
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
