import * as React from 'react';


export interface IMessage {
    date: Date;
    body: string;
}

interface IConsoleProps {
    messages: IMessage[]
}

export class Console extends React.Component<IConsoleProps, {}> {
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
        if (this.props.messages != null) {

            const ConsoleArray = [...this.props.messages];

            ConsoleArray.reverse();

            // const showConsole: any[] = [];
            
            const showConsole = ConsoleArray.map((message: IMessage, key: number) => {
                return (
                    <div key={key} style=
                        {{
                            fontSize: '20px',
                            maxHeight: '200px',
                            overflow: 'auto',
                            textAlign: 'left',
                            verticalAlign: 'bottom',
                        }}>
                        {message.date.toTimeString().split(' ')[0] + ' ' + message.body}</div>)
            })

            if (!((window as any).debug)) {
                consoleStyle.display = 'none';
            } else {
                consoleStyle.display = 'block';
            }

            return (
                <div style={consoleStyle}>{showConsole}</div>
            );
        }
        else { return null; }

    };
};