import React from "react"

const circ = (props) => {
    const {ctx, x, y, radius, startAngle, endAngle, drawCounterClockwise} = props;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, drawCounterClockwise);
    ctx.strokeStyle = "#"+((1<<24)*Math.random()|0).toString(16);
    return ctx.stroke();
}

class Canvas extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');


    const animate = () => {

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        let radius = 10;
        let z =  Math.random() * window.innerWidth;
        let w = Math.random() * window.innerHeight;
        let dx = (Math.random() - 0.5);
        let dy = (Math.random() - 0.5);

        if (z + radius > window.innerWidth || z - radius < 0) {
           dx = -dx;
        }
            if (w + radius > window.innerHeight || w - radius < 0) {
                dy = -dy;
            }
        circ({ctx, x: z += dx, y: w += dy , radius: radius, startAngle: 0, endAngle: Math.PI * 2, drawCounterClockwise: false});

        }

        setInterval(() => { requestAnimationFrame(animate); }, 3000);
        

    }

    render() {
      return (
        <canvas
          width={window.innerWidth}
          height={window.innerHeight}
          ref="canvas"
            />
      );
    }
  }
export default Canvas 