
import React from 'react';


interface IModalProps {
  show: boolean;
}

export default class Modal extends React.Component<IModalProps> {
  
      // The modal "window"
      public modalStyle: React.CSSProperties = {
        backgroundColor: '#fff',
        borderRadius: 5,
        margin: '0 auto',
        maxWidth: 500,
        minHeight: 300,
        padding: 30
      }

      public gt() {
        this.setState({
          show: false
        });
    }

    public render() {
    // Render nothing if the "show" prop is false
    if(!(this.props as any).show) {
      return null;
    }

    // The gray background
    /* const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    }; */
    
    return (
      <div style={this.modalStyle}>
        <div style={this.modalStyle}>
          {this.props.children}

          <div className="footer">
            <button onClick={this.gt}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}
