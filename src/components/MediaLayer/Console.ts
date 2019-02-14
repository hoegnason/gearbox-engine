export interface IMessage {
    date: Date;
    body: string;
}

export class Console {
    private messages: IMessage[] = [{date: new Date(), body: "Hetta er ein message!"}];

    public Log(inputtext: string): void {

        // tslint:disable-next-line
        // console.log(new Date(), inputtext);

        this.messages.push({date: new Date(), body: inputtext});
    }

    public getLogToRender(): IMessage[] {
        return this.messages
     }

    public getLog(): string[] {
        return this.messages.map((message) => {
            return( message.date.getUTCHours() + ":" + message.date.getUTCMinutes() + ":"
             + message.date.getUTCSeconds() + "  -  " + message.body );
        });
    }
};