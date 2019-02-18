import * as React from "react";

export default class Menu extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const menuStyle: React.CSSProperties = {
      alignContent: "center",
      backgroundColor: "#949494"
    }

    const showMenu = () => {
      return (
        <div style={{width: `${100 * this.context.scale}px`, height: `${100 * this.context.scale}px`, zIndex: 9999999, backgroundColor: 'black'}} >
          <ul>
            <li>newgame</li>
          </ul>
        </div>
      )
    }

    return <div style={menuStyle}>{showMenu}</div>
  }
}
