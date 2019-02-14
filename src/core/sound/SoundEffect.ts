export class SoundEffect {
  public assetPath: string;

  // tslint:disable-next-line
  private _player: HTMLAudioElement;

  public constructor(assetPath: string, loop: boolean) {
    this._player = new Audio(assetPath);
    this._player.loop = loop;

    /*
    // Throw exception
    // tslint:disable-next-line
    if (this._player.duration == NaN ) {
      throw this._player.duration;
    }
    */
  }

  public get loop(): boolean {
    return this._player.loop;
  }

  public set loop(value: boolean) {
    this._player.loop = value;
  }

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
