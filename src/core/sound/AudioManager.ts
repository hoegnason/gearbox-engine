import { SoundEffect } from './SoundEffect';

export class AudioManager {

    public static loadSoundFile(name: string, assetPath: string, loop: boolean): void {
        
        AudioManager._soundEffects.set(name, new SoundEffect(assetPath, loop));
    }

    public static playSound(name: string): void {

        const soundEffect = AudioManager._soundEffects.get(name);

        if (null != soundEffect) {
            soundEffect.play();
        }
    }

    public static pauseSound(name: string): void {

        const soundEffect = AudioManager._soundEffects.get(name);

        if (null != soundEffect) {
            soundEffect.pause();
        }
    }

    public static pauseAll(): void {

        this._soundEffects.forEach((soundEffect: SoundEffect) => {
            soundEffect.pause();
        });
    }

    public static stopSound(name: string): void {

        const soundEffect = AudioManager._soundEffects.get(name);
        
        if (null != soundEffect) {
            soundEffect.stop();
        }
    }

    public static stopAll(): void {

        this._soundEffects.forEach((soundEffect: SoundEffect) => {
            soundEffect.stop();
        });
    }

    // tslint:disable-next-line
    private static _soundEffects = new Map<string, SoundEffect>();
}
