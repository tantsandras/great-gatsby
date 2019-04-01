import React from "react"
import ufo from "../images/ufo.png"

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
        ctx.drawImage(image, ufoPosition.x - (image.width / 12), ufoPosition.y - (image.height / 12), image.height / 6, image.width / 6);
      }

      function Star(x, y, radius, color) {

        const draw = ctx => {
            ctx.beginPath()
            ctx.arc(x, y, radius, Math.PI * 2, false)
            ctx.shadowBlur = 30
            ctx.shadowColor = "white"
            ctx.fillStyle = color
            ctx.fill()
          }

        this.update = ctx => {

            if(y + radius > ufoPosition.y) {
                console.log("game over")
            } else {    
              y += 1;
            }
            draw(ctx);
        }

      }
        

class Canvas2 extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        starArray: Array.from({ length: 20 }).map(
          () =>
            new Star(
              Math.random() * (window.innerWidth - 10 * 2) + 10,
              0,
              2,
              "white"
            )
        ),
      }
  
    }
  
    componentDidMount() {
  
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
  
        ctx.font = "10vw Arial"
        ctx.strokeStyle = "#000d1a";
        ctx.textAlign = "center"
        ctx.strokeText(
          "SPACE EXPLORER",
          this.refs.canvas.width / 2,
          this.refs.canvas.height / 2
        )

        
      this.state.starArray.forEach(element => {
        element.update(ctx)
      })

      const image = document.getElementById('source');
      new DragUfo(ctx, image);
      }

      animate();
  
    }
  
    render() {
      return (
        <div>
        <canvas
          width={window.innerWidth}
          height={window.innerHeight}
          ref="canvas"
          style={{background: `black`}}
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
  export default Canvas2
  