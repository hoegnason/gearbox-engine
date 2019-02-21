import * as React from "react";
import './styl.css';
// import { Link } from 'react-router'
// import Modal from './modal';


export default class Menu extends React.Component<any> {
  public menuStyle: React.CSSProperties = {
      
    backgroundColor: "black",
    height: '100%',
    position: "absolute",
    width: '100%',
    zIndex: 99999999
  }


  public newGame = () => {
    // tslint:disable-next-line:no-console
    console.log('The link.');
    alert("I was clicked");
    return (
          <div style={this.menuStyle}>Mad</div>
      );
  };

  public render() {

    const showMenu = () => {
      return (
        <div className="container center">
        <nav className="menu">
            <h1 className="menu__logo">Epic Co.</h1>

            <div className="menu__right">
                <ul className="menu__list">
                    <li className="menu__list-item"><a className="menu__link menu__link--active" href="#">Home</a></li>
                    <li className="menu__list-item"><a className="menu__link" href="#">About</a></li>
                    <li className="menu__list-item"><a className="menu__link" href="#">Portfolio</a></li>
                    <li className="menu__list-item"><a className="menu__link" onClick={this.newGame}></a></li>
                </ul>

                <button className="menu__search-button"/>
            </div>
        </nav>
        </div>
      )
    }
    return <div style={this.menuStyle}>{showMenu()}</div>
  }
}