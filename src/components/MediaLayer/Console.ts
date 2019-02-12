export interface IMessage {
    date: Date;
    body: string;
}

export class Console {
    private messages: IMessage[] = [];

    public Log(inputtext: string): void {

        // tslint:disable-next-line
        console.log(new Date(), inputtext);

        this.messages.push({date: new Date(), body: inputtext});
    }

    public getLog(): string[] {
        return this.messages.map((stamp, text) => {
            return stamp + ": " + text;
        });
    }
};