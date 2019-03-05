import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Console, IMessage } from './Console';


export interface IConsoleState {
    messages: IMessage[]
}

export default class ConsoleState extends React.Component<{}, IConsoleState> {

    public static childContextTypes = {
        Log: PropTypes.func
    };

    constructor(props: any) {
        super(props);

        this.Log = this.Log.bind(this);

        this.state = {
            messages: []
        }
    }

    public componentDidMount() {
        this.Log('Flappy Bird (Team Gearbox Engine build #205)');
    }

    public getChildContext() {
        return {
            Log: this.Log
        };
    }

    public Log(text: string) {
        this.setState(prevState => ({
            messages: [...prevState.messages, { body: text, date: new Date() }]
        }));
    }

    public render() {
        const defaultStyles: React.CSSProperties = {
            height: '100%',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%'
        };

        return (
            <div style={defaultStyles}>{this.props.children}
                <div>
                    <Console messages={this.state.messages} />
                </div>
            </div>
        );
    }
}