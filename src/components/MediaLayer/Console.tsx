import * as React from 'react';


export interface IMessage {
    date: Date;
    body: string;
}

export class Console extends React.Component<any> {
    /*
    public static contextTypes = {
        body: PropTypes.string,
        timestamp: PropTypes.string
    };*/

    constructor(props: any) {
        super(props);
    };

    // tslint:disable-line  
    public render() {
        const consoleStyle: React.CSSProperties = {
            alignContent: 'left',
            backgroundColor: 'gray',
            display: 'table-cell',
            height: '200px',
            left: 0,
            overflow: 'scroll',
            position: 'absolute',
            scale: "50%",
            top: 0,
            verticalAlign: 'bottom',
            width: '20%'
        }
        const showConsole = this.props.body.map((text: any, key: number) => {
            return <div key={key} style = 
            {{maxHeight: '200px', overflow: 'auto', verticalAlign: 'bottom', fontSize: '20px', textAlign: 'left'}}>{text}</div>
        })
        /*const showConsole = this.props.messages.map((text, key) => {
            return <div key = { key } style = {{ textAlign: 'left', fontSize: '20px' }
        }> { text } < /div>
        });*/

    return(
            <div style= {consoleStyle}>{showConsole}</div>
        );
      };
};