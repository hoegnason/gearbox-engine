import * as React from 'react';
import { Link } from 'react-router-dom'


class GameSelection extends React.Component {

    public render() {

        return (

            <div style={this.getBodyStyle()}>
                <h1 style={this.getH1Style()}>Team Gearbox</h1>
                <h2 style={this.getH2Style()}>Game Engine</h2>
                <h3 style={this.getH3Style()}>Games</h3>
                <p style={this.getPStyle()}><Link style={this.getLinkStyle()} to='/flappybird'>FlappyBird</Link></p>
                <p style={this.getPStyle()}><Link style={this.getLinkStyle()} to='/boxgame'>Box Game</Link></p>
            </div>

        );
    }

    private getBodyStyle(): React.CSSProperties {
        return {
            backgroundColor: '#ffc',
            color: 'black',
            fontFamily: 'arial, helvetica, sans-serif',
            fontSize: '14px',
            height: '100%',
            margin: '20px',
            padding: '0'
        }
    }

    private getH1Style(): React.CSSProperties {
        return {
            backgroundColor: '#900',
            borderBottomColor: '#c00',
            borderBottomStyle: 'solid',
            borderBottomWidth: '0.5em',
            color: '#ffc',
            fontSize: '2em',
            fontStyle: 'italic',
            letterSpacing: '0.5em',
            margin: 0,
            marginBottom: '7px',
            padding: '4px',
            textAlign: 'center'
        }
    }

    private getH2Style(): React.CSSProperties {
        return {
            borderBottomColor: '#c00',
            borderBottomStyle: 'solid',
            borderBottomWidth: '0.3em',
            color: '#111',
            fontSize: '1.5em',
            fontStyle: 'italic',
            letterSpacing: '0.3em',
            margin: '0',
            padding: '4px',
            paddingLeft: '14px',
            textAlign: 'center'
        }
    }

    private getH3Style(): React.CSSProperties {
        return {
            color: '#111',
            fontSize: '1.25em',
            marginLeft: '20px',
            textAlign: 'left'
        }
    }

    private getPStyle(): React.CSSProperties {
        return {
            lineHeight: '6px',
            marginLeft: '20px',
            textAlign: 'left'

        }
    }

    private getLinkStyle(): React.CSSProperties {
        return {
            textAlign: 'left',
            textDecoration: 'none'
        }
    }
}

export default GameSelection;