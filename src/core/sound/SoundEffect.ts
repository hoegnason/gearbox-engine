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
