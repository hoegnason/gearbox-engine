import * as React from "react";

export default class Menu extends React.Component<any> {

  public render() {
    const menuStyle: React.CSSProperties = {
      backgroundColor: "black",
      width: '100%'
    }
    const newGame = () => {
        return (
            <div>New Game</div>
        )
    }

    const showMenu = () => {
      return (
        <div style={{align: 'center', width: `${100 * this.context.scale}px`, height: `${100 * this.context.scale}px`, zIndex: 9999, backgroundColor: 'black'}} > 
          <ul>
            <li>{newGame()}</li>
            <li>Highscore</li>
          </ul>
        </div>
      )
    }

    return <div style={menuStyle}>{showMenu()}</div>
  }
}
