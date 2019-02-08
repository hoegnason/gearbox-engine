import { SoundEffect } from './SoundEffect';

export class AudioManager {

    public static loadSoundFile(name: string, assetPath: string, loop: boolean): void {
        AudioManager._soundEffects[name] = new SoundEffect(assetPath, loop);
    }

    public static playSound(name: string): void {
        if (AudioManager._soundEffects[name] !== undefined) {
            AudioManager._soundEffects[name].play();
        }
    }

    public static pauseSound(name: string): void {
        if (AudioManager._soundEffects[name] !== undefined) {
            AudioManager._soundEffects[name].pause();
        }
    }

    public static pauseAll(): void {
        for (let sfx in AudioManager._soundEffects) {
            AudioManager._soundEffects[sfx].pause();
        }
    }

    public static stopSound(name: string): void {
        if (AudioManager._soundEffects[name] !== undefined) {
            AudioManager._soundEffects[name].stop();
        }
    }

    public static stopAll(): void {
        for (let sfx in AudioManager._soundEffects) {
            AudioManager._soundEffects[sfx].stop();
        }
    }

    private static _soundEffects: { [name: string]: SoundEffect } = {};
}