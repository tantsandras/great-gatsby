import React from "react"
import { Link } from "gatsby"
import { GamesRulesLink } from "./styled"

class GameModal extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const modal = (
      <div
        className="modal"
        style={{
          margin: `0 auto`,
          padding: `8em 8em 16.5em 8em`,
          fontFamily: `Arial`,
          fontSize: `2em`,
          color: `white`,
          lineHeight: `1.5em`,
        }}
      >
        Your flying saucer is going into supersonic speed to get you to all of
        the corners of space in record time! Make sure you don't collide with
        any comets.
        <Link to="/page-2/">
          <GamesRulesLink>Understood!</GamesRulesLink>
        </Link>
      </div>
    )
    return (
      <div
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ background: `black` }}
      >
        <div className="rules">{modal}</div>
      </div>
    )
  }
}
export default GameModal
