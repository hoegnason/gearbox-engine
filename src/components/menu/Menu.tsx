import * as React from "react";
// import Dialog from './Dialog';
import Modal from './modal';

import './styl.css';
// import { Link } from 'react-router'


export default class Menu extends React.Component<any> {

  public state = {
    show: true
  };

  public showModal = () => {
    this.setState({ show:true })
  }

  public hideModal = () => {
    this.setState({ show:false })
  }

  public render(){
    return (
      <section className="Info">
        <div className="InfoTitle">
          <h1>Okkurt</h1>
          <p>
            teyst
      </p>
        </div>
        <div >
          <div onClick={this.showModal}>
            <Modal >
                <p style={{color: "#000000"}}>Modal</p>
                <p>Data</p>
            </Modal>
            <p>VISION</p>
         
          </div>

          <div className="BoxRight">
            <p>VALUE</p>
          
          </div>
        </div>
      </section>
  )
  }

 /* public menuStyle: React.CSSProperties = {
      
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
                    <li className="menu__list-item"><a className="menu__link" onClick={this.newGame}></a></li>
                </ul>

                <button className="menu__search-button"/>
            </div>
        </nav>
        </div>
      )
    }
    return <div style={this.menuStyle}>{showMenu()}</div>
  } */
}