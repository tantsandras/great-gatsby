import PropTypes from "prop-types"
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

        setInterval(function(){ 
            
            circ({ctx, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, radius: 30, startAngle: 0, endAngle: Math.PI * 2, drawCounterClockwise: false});
            }, 2000);

    
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