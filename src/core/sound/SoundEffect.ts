export class SoundEffect {
  public assetPath: string;

  // tslint:disable-next-line
  private _player: HTMLAudioElement;

  public constructor(assetPath: string, loop: boolean) {
    this._player = new Audio(assetPath);
    this._player.loop = loop;
  }

  public get loop(): boolean {
    return this._player.loop;
  }

  public set loop(value: boolean) {
    this._player.loop = value;
  }

  // componentWillUnmount() ?? (/Mats 09-02-2019)
  // https://reactjs.org/docs/react-component.html  (/Mats 09-02-2019)
  // https://www.reddit.com/r/reactjs/comments/6o4nn8/a_thumb_rule_when_to_deconstruct_thisprops_in_the/ (/Mats 09-02-2019)

  /* noman_land
   * My rule of thumb is that if you're using a prop more than once or you're using more than one prop,
   * then destructure. Otherwise don't bother, unless destructuring is necessary for readability or
   * to make a line short enough to fit under 100 characters. (/Mats 09-02-2019)
   */

  /*
   * TODO: find out if it is necessary to have a deconstructor
   *
   * public destroy(): void {
   *    this._player = undefined;
   * }
   *
   */

  // TODO: check if it should be a Promise (public play(): Promise<void>)
  // https://www.youtube.com/watch?v=s6SH72uAn3Q (/Mats 09-02-2019)
  // https://www.youtube.com/watch?v=DgxTkd43VZ0 (/Mats 09-02-2019)

  public play(): void {
    if (!this._player.paused) {
      this.stop();
    }

    this._player.play();
  }

  public pause(): void {
    this._player.pause();
  }

  public stop(): void {
    this._player.pause();
    this._player.currentTime = 0;
  }
}
